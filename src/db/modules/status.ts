import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStatus extends Document {
  online: boolean;
}

const StatusSchema: Schema<IStatus> = new Schema({
  online: { type: Boolean, required: true }
});

export const Status: Model<IStatus> = mongoose.model<IStatus>("Status", StatusSchema);