import BaseModel from "./BaseModel";
import fs from "fs";
import { Pojo } from "objection";

export default class File extends BaseModel {
  name!: string;
  value: any;
  mime!: string;

  get $secureFields(): string[] {
    return ["value"];
  }

  static get tableName() {
    return "file";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "value"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 1024 },
        size: { type: "bigInteger" },
        mime: { type: "string", minLength: 1, maxLength: 256 },
        value: { type: "binary" },
        status: { type: "boolean" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" }
      },
    };
  }

  $formatJson(json: Pojo) {
    const jsonRaw = super.$formatJson(json);
    this.$secureFields.forEach((field) => {
      delete jsonRaw[field];
    });
    return jsonRaw;
  }

  static async newFile(file: Express.Multer.File) {
    const fileSizeInBytes = fs.statSync(file.path).size;
    if ((fileSizeInBytes / 1000000.0) > 3) {
      throw new Error("Arquivo muito grande, deve ser menor do que 3Mb")
    }
    const readFile = fs.readFileSync(file.path);
    if (!readFile) {
      throw new Error("Por favor envie um arquivo");
    }
    const encodedFile = Buffer.from(readFile.toString("base64"), 'base64');
    const newFile = await File.transaction(async (trx) => {
      const fileData = {
        name: file.originalname,
        size: fileSizeInBytes,
        mime: file.mimetype,
        value: encodedFile
      }
      return await File.query(trx).insert(fileData);
    });
    delete newFile.value;
    return newFile;
  }

  static async get(file_id: number) {
    return await File.getFile(file_id);
  }

  static async getFile(file_id: number) {
    const files = await File.query().select("id", "name", "mime", "value", "size")
      .where("id", "=", file_id)
      .where("status", true)
      .limit(1);
    if (!files.length) {
      throw new Error("Não foram econtrados usuários com esse email.");
    }
    return files[0] as File;
  }
}
