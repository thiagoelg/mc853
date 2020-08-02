import BcryptJS from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Model, OrderByDirection, Pojo } from "objection";
import BaseModel from "./BaseModel";
import Permission from "./Permission";
import Role from "./Role";
import RolePermissions from "./RolePermissions";

export interface UserData {
  name: string;
  email: string;
  password: string;
  role_id?: number;
}

export interface UserQuery {
  orderBy: string;
}

export default class User extends BaseModel {
  name!: string;
  email!: string;
  password!: string;
  role_id!: number;
  role!: Role;
  permissions!: Array<Permission>;

  get $secureFields(): string[] {
    return ["password"];
  }

  $formatJson(json: Pojo) {
    const jsonRaw = super.$formatJson(json);
    this.$secureFields.forEach((field) => {
      delete jsonRaw[field];
    });
    return jsonRaw;
  }

  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.HasOneRelation,
        modelClass: Role,
        join: {
          from: "user.role_id",
          to: "role.id",
        },
      },
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: "user.role_id",
          through: {
            modelClass: RolePermissions,
            from: "role_permissions.role_id",
            to: "role_permissions.permission_id",
          },
          to: "permission.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],

      properties: {
        id: { type: "integer" },
        role_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        status: { type: 'boolean' },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      },
    };
  }

  static hashPassword(plainTextPassword: string) {
    return BcryptJS.hashSync(plainTextPassword, 10);
  }

  static async newUser(userData: UserData) {
    const defaultRole = await Role.getDefaultRole();
    userData.role_id = defaultRole.id;
    const user = await User.transaction(async (trx) => {
      userData.password = User.hashPassword(userData.password);
      return await User.query(trx).insert(userData);
    });
    delete user.password;
    return user;
  }

  static async listUsers(parameters: UserQuery) {
    try {
      const query = User.query().withGraphFetched("role").where("status", true);
      if (parameters.orderBy) {
        const [field, direction] = parameters.orderBy.split(" ");
        query.orderBy(field, direction as OrderByDirection);
      } else {
        query.orderBy(parameters.orderBy || "id", "asc");
      }
      return await query;
    } catch (error) {
      return error;
    }
  }

  static async listUsersByRole(role_id: number) {
    try {
      const query = User.query().where("status", true).where("role_id", role_id)
        .orderBy("id", "desc");

      return await query;
    } catch (error) {
      return error;
    }
  }

  static async get(id: number) {
    try {
      const query = User.query().findById(id).withGraphFetched("role");

      return await query;
    } catch (error) {
      return error;
    }
  }

  static async changeRoleId(data: { requester: User, user_id: number, role_id: number }) {
    try {

      const target_role = await Role.get(data.role_id);

      if (!target_role) throw new Error('Perfil não encontrado.');

      console.log(data.requester);

      if (target_role.level < data.requester.role.level) {
        throw new Error('Não tem permissão para associar este perfil.');
      }

      const query = User.query().patchAndFetchById(data.user_id, {
        role_id: data.role_id
      }).withGraphFetched("role").where("status", true);

      return await query;
    } catch (error) {
      return error;
    }
  }

  static async authenticate(email: string, password: string) {
    const query = User.query();
    query
      .select("id", "email", "name", "password")
      .where("email", "=", email)
      .where("status", true)
      .orderBy("id", "desc")
      .limit(1);
    const results = await query;
    if (!results.length) {
      throw new Error("Não foram econtrados usuários com esse email.");
    }
    const user = results[0];
    if (BcryptJS.compareSync(password, user.password)) {
      const token = jwt.sign(user.toJSON(), process.env.SECRET as string, {
        expiresIn: 60000,
      });
      return token;
    }
    throw new Error("Senha incorreta.");
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.token || "";
    try {
      const decoded_token = jwt.verify(token, process.env.SECRET as string) as any;

      const user = await User.query()
        .where("status", true)
        .findById(decoded_token?.id).withGraphFetched("role")
        .withGraphFetched("permissions") as User;

      req.body.decoded = {
        user,
        token: decoded_token,
        hasPermission: (permission: string) => (user?.permissions as Permission[]).some(p => p.short_name === permission)
      } as const;

      return next();
    } catch (error) {
      return res.status(401).send(error.toString());
    }
  }
}
