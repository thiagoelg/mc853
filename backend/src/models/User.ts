import BaseModel from './BaseModel';
import BcryptJS from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OrderByDirection, Pojo } from 'objection';
import { Request, Response, NextFunction } from 'express';

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserQuery {
  orderBy: string
}

export default class User extends BaseModel {
  name!: string;
  email!: string;
  password!: string;

  get $secureFields(): string[] {
    return ['password']; 
  }

  $formatJson(json: Pojo) {
    const jsonRaw = super.$formatJson(json);
    this.$secureFields.forEach(field => {
      delete jsonRaw[field];
    });
    return jsonRaw;
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static hashPassword(plainTextPassword: string) {
    return BcryptJS.hashSync(plainTextPassword, 10);
  }

  static async newUser(userData: UserData) {
    const user = await User.transaction(async trx => {
      userData.password = User.hashPassword(userData.password);
      return await User.query(trx).insert(userData);
    });
    delete user.password;
    return user;
  }

  static async listUsers(parameters: UserQuery) {
    try {
      const query = User.query();
      if (parameters.orderBy) {
        const [field, direction] = parameters.orderBy.split(' ');
        query.orderBy(field, direction as OrderByDirection);
      } else {
        query.orderBy(parameters.orderBy || 'createdAt', 'desc');
      }
      return await query;
    } catch (error) {
      return error;
    }
  }

  static async authenticate(email: string, password: string) {
    const query = User.query();
    query.select('id', 'email', 'name', 'password')
      .where('email', '=', email)
      .orderBy('id', 'desc')
      .limit(1);
    const results = await query;
    console.log(results);
    if (!results.length) {
      throw new Error('No users found');
    }
    const user = results[0];
    if (BcryptJS.compareSync(password, user.password)) {
      const token = jwt.sign(user.toJSON(), process.env.SECRET as string, {
        expiresIn: 60000
      });
      return token;
    }
    return false;
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.token || '';
    try {
      const decoded = await jwt.verify(token, process.env.SECRET as string);
      req.body.decoded = decoded;
      return next();
    } catch (error) {
      return res.status(401).send(error.toString());
    }
  }
}
