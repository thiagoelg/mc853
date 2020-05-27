import { Model } from "objection";

export default class Permission extends Model {
  id!: number;
  name!: string;
  short_name!: string;

  static shortNames: { [key: string]: string } = {
    MANAGE_ROLES: "manage_roles",
    ASSIGN_ROLES: "assign_roles",
    MANAGE_USERS: "manage_users",
    MANAGE_FORMS: "manage_forms",
    MANAGE_FORM_FIELDS: "manage_form_fields",
    MANAGE_FORM_FIELD_TYPES: "manage_form_field_types",
    MANAGE_SOLICITATIONS: "manage_solicitations",
    ANSWER_SOLICITATION: "answer_solicitation",
    CREATE_SOLICITATION: "create_solicitation",
    REOPEN_SOLICITATION: "reopen_solicitation",
    ANSWER_SATISFACTION_SURVEY: "answer_satisfaction_survey"
  }

  static names: { [key: string]: string } = {
    MANAGE_ROLES: "Gerenciar perfis de acesso",
    ASSIGN_ROLES: "Atribuir perfis de acesso",
    MANAGE_USERS: "Gerenciar usuários",
    MANAGE_FORMS: "Gerenciar formulários",
    MANAGE_FORM_FIELDS: "Gerenciar campos de formulários",
    MANAGE_FORM_FIELD_TYPES: "Gerenciar tipos de campo de formulários",
    MANAGE_SOLICITATIONS: "Gerenciar solicitações",
    ANSWER_SOLICITATION: "Responder solicitações",
    CREATE_SOLICITATION: "Criar solicitações",
    REOPEN_SOLICITATION: "Solicitar reabertura de solicitações",
    ANSWER_SATISFACTION_SURVEY: "Avaliar atendimento"
  }

  static get tableName() {
    return "permission";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "short_name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 1024 },
        short_name: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async newPermission(name: string, shortName: string) {
    const permission = await Permission.transaction(async (trx) => {
      return await Permission.query(trx).insert({
        name,
        short_name: shortName,
      });
    });
    return permission;
  }

  static async listPermissions() {
    try {
      const query = Permission.query().orderBy("id", "asc");
      return await query;
    } catch (error) {
      return error;
    }
  }
}
