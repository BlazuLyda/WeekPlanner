import User from "../model/User.js"
import { ClientError } from "../helpers/errors.js"

export async function view(req, res, next) {
  try {
    const usersData = await User.getAll()
    res.json(usersData)
  } catch (err) {
    next(err)
  }
}

export async function find(req, res, next) {
  const id = req.session.userId
  try {
    const userData = await User.getOne(id);
    res.json(userData);
  } catch (err) {
    next(err)
  }
}

export async function edit(req, res, next) {
  const id = req.query.id
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  try {
    if (email !== undefined && await User.getByEmail(email)) {
      return next(new ClientError(`User with email ${email} already exists`))
    }
    const updatedUser = await User.findByIdAndUpdate(id, { name: name, email: email, password: password })
    res.json({ message: "Account successfully updated", data: updatedUser })
  } catch (err) {
    next(err)
  }
}

export async function remove(req, res, next) {
  const id = req.query.id
  try {
    await User.findByIdAndDelete(id)
  } catch (err) {
    next(err)
  }
}

export async function create(req, res, next) {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  try {
    const sameEmailCount = await User.find({email: email}).count()
    if (sameEmailCount > 0) {
      return next(new ClientError(`User with email ${email} already exists`))
    }
    const newUser = await User.addUser(name, email, password)
    res.json({ message: "Account successfully created", data: newUser })
  } catch (err) {
    next(err)
  }
}