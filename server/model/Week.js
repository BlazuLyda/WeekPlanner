import mongoose from "mongoose";
import {activitySchema} from "./Activity.js";
import {taskSchema} from "./Task.js";


export const weekSchema = new mongoose.Schema({
    scheduleId: String,
    mon: { activities: [ activitySchema ], tasks: [ taskSchema ] },
    tue: { activities: [ activitySchema ], tasks: [ taskSchema ] },
    wed: { activities: [ activitySchema ], tasks: [ taskSchema ] },
    thu: { activities: [ activitySchema ], tasks: [ taskSchema ] },
    fri: { activities: [ activitySchema ], tasks: [ taskSchema ] },
    sat: { activities: [ activitySchema ], tasks: [ taskSchema ] },
    sun: { activities: [ activitySchema ], tasks: [ taskSchema ] }
})

export const Week = mongoose.model("Week", weekSchema)