import UserDAO from "../model/User.js";
import { ClientError } from "../helpers/errors.js";
import bcrypt from "bcrypt";

const sessionController = {}

sessionController.authUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return next(new ClientError("Unauthorized access", 401));
    }
    const user = await UserDAO.getOne(req.session.userId)
      .catch(() => { throw new ClientError("Unauthorized access", 401)})
    next()

  } catch (err) {
    next(err)
  }
}

sessionController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserDAO.getByEmail(email)
      .catch(() => { throw new ClientError("Invalid user password combination", 401) })

    if (!bcrypt.compareSync(password, user.password)) {
      return next(new ClientError("Invalid user password combination"), 401);
    }

    // Create new session
    req.session.userId = user._id;
    res.json({ message: "Logged in successfully" });

  } catch (err) {
    next(err)
  }
}

sessionController.logout = async (req, res, next) => {
  try {
    req.session.destroy()
    res.json({ message: "Logged out successfully" })
  } catch (err) {
    next(err)
  }
}

export default sessionController