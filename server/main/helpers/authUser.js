import {ClientError} from "./errors.js";
import userDAO from "../data/daos/userDAO.js";

const authUser = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return next(new ClientError("Unauthorized access", 401));
        }
        const user = await userDAO.getOne(req.session.userId)
            .catch(() => { throw new ClientError("Unauthorized access", 401) })
        next()

    } catch (err) {
        next(err)
    }
}

export default authUser