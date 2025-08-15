import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL não encontrada.");
    return;
  }

  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
    console.log("Database Connected.");
  } catch (err: any) {
    console.error("Erro ao conectar ao banco:", err.message);
  }
};