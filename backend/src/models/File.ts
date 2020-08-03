import BaseModel from "./BaseModel";
import fs from "fs";

export default class File extends BaseModel {
  name!: string;
  value!: any;
  mime!: string;

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

  static async getFile(file_id: number) {
    return await File.query().where('id', file_id).first();
  }
}
