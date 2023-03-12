import mongoose from "mongoose";
import {Background} from "./Activity.js";

export const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    emoji: { type: String, required: true },
    startTime: { type: Number },
    background: { type: String, enum: Background, default: Background.SKY }
})

export const Task = mongoose.model("Task", taskSchema)