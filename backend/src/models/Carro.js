import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const carroSchema = new Schema({
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    require: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

export default model('carros', carroSchema);
