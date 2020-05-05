import { Model } from 'objection';

export default class BaseModel extends Model {
  id!: number;
  createdAt!: string;
  updatedAt: string;
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }
}
