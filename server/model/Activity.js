import mongoose from "mongoose";

export enum Background {
  SKY = "SKY",
  AQUA = "AQUA",
  SUNNY = "SUNNY",
}

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in seconds
  startTime: { type: Date },
  background: { type: String, enum: Background, default: Background.SKY }
})

export const Activity = mongoose.model("Activity", activitySchema)