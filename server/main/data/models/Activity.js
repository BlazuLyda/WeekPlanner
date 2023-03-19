import mongoose from "mongoose";

export const Background = {
  SKY: "sky",
  AQUA: "aqua",
  SUNNY: "sunny",
}

export const DaysOfWeek = {
  MONDAY: "mon",
  TUESDAY: "tue",
  WEDNESDAY: "wed",
  THURSDAY: "thu",
  FRIDAY: "fri",
  SATURDAY: "sat",
  SUNDAY: "sun"
}

export const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in seconds
  dayOfWeek: { type: String, enum: DaysOfWeek },
  startTime: { type: Number }, // in seconds
  background: { type: String, enum: Background, default: Background.SKY }
})

export const Activity = mongoose.model("Activity", activitySchema)