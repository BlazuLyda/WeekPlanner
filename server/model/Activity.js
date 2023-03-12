import mongoose from "mongoose";

export const Background = {
  SKY: "SKY",
  AQUA: "AQUA",
  SUNNY: "SUNNY",
}

export const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in seconds
  startTime: { type: Number },
  background: { type: String, enum: Background, default: Background.SKY }
})

export const Activity = mongoose.model("Activity", activitySchema)