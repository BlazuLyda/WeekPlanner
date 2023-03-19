import {ClientError} from "../../helpers/errors.js";
import User from "../models/User.js";

const userDAO = {}

// Dataset manipulation methods
userDAO.getAll = async () => {
    return User.find().exec()
}

// Singular methods throw error if nothing is found or modified
userDAO.getOne = async (id) => {
    const userData = await User.findById(id).exec();
    if (!userData) {
        throw new ClientError(`User with id ${id} does not exist`, 404)
    }
    return userData
}

userDAO.getByEmail = async (email) => {
    const userData = await User.findOne({ email: email }).exec();
    if (!userData) {
        throw new ClientError(`User with email ${email} does not exist`, 404)
    }
    return userData
}

userDAO.addUser = async (name, email, password) => {
    const newUser = new User({
        name: name,
        email: email,
        password: password
    });
    await newUser.save()
    return newUser
}

userDAO.update = async (id, name, email, password) => {
    const updatedUser = await User.findByIdAndUpdate(id, {
        name: name,
        email: email,
        password: password
    }, {
        new: true // gets the updated document
    }).exec()

    if (!updatedUser) {
        throw new ClientError(`User with id ${id} does not exist`, 404)
    }
    return updatedUser
}

userDAO.save = async (userObject) => {
    await userObject.save()
}

userDAO.delete = async (id) => {
    User.findByIdAndDelete(id)
}

export default userDAO



