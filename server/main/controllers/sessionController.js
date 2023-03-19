import {ClientError} from "../helpers/errors.js";
import bcrypt from "bcrypt";
import userDAO from "../data/daos/userDAO.js";

const sessionController = {}

sessionController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDAO.getByEmail(email)
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