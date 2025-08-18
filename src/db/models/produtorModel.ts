import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProdutor extends Document {
  ordem: number;
  produtor: string;
  imagem: string;
  regiao: string;
  descricao: string;
}

const produtorSchema: Schema<IProdutor> = new Schema({
  ordem: { type: Number, required: true },
  produtor: { type: String, required: true },
  imagem: { type: String, required: true },
  regiao: { type: String, required: true },
  descricao: { type: String, required: true }
});

export const Produtor: Model<IProdutor> = mongoose.model<IProdutor>("Produtores", produtorSchema);