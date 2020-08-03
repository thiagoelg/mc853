import { Model } from 'objection';

export default class BaseModel extends Model {
  id!: number;
  created_at!: string;
  updated_at!: string;
  status!: boolean;

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
}
