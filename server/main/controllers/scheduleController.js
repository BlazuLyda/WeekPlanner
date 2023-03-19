import scheduleDAO from "../data/daos/scheduleDAO.js";

const scheduleController = {}

scheduleController.allSchedules = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const schedules = await scheduleDAO.getAllSchedules(userId)
        res.json({ schedules: schedules })
    } catch (err) {
        next(err)
    }
}

scheduleController.oneSchedule = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const scheduleId = req.params.scheduleId
        const schedule = await scheduleDAO.getOneSchedule(userId, scheduleId)
        res.json({ schedule: schedule })
    } catch (err) {
        next(err)
    }
}


export default scheduleController