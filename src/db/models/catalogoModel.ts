import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICatalogo extends Document {
  id: number;
  slug: string;
  imagem: string;
  nome: string;
  descricao: string;
  tipo: string;
  produtor: string;
  pais: string;
  regiao: string;
  uva: string;
  cor: string;
  perfume: string;
  paladar: string;
  harmonizacao: string;
  temperatura: string;
  alcool: string;
  cliente: string;
  visivel: boolean;
}

const catalogoSchema: Schema<ICatalogo> = new Schema({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  imagem: { type: String, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  tipo: { type: String, required: true },
  produtor: { type: String, required: true },
  pais: { type: String, required: true },
  regiao: { type: String, required: true },
  uva: { type: String, required: true },
  cor: { type: String, required: true },
  perfume: { type: String, required: true },
  paladar: { type: String, required: true },
  harmonizacao: { type: String, required: true },
  temperatura: { type: String, required: true },
  alcool: { type: String, required: true },
  cliente: { type: String, required: true },
  visivel: { type: Boolean, required: true }
});

export const Catalogo: Model<ICatalogo> = mongoose.model<ICatalogo>("catalogo", catalogoSchema);