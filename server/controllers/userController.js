import User from "../model/User.js"
import bcrypt from "bcrypt"
import { redirect } from "@sveltejs/kit";
const salt = await bcrypt.genSalt(10)

export async function view(req, res) {
  const usersData = await User.getAll()
  res.json(usersData)
}

export async function find(req, res) {
  const id = req.params.id
  const userData = await User.getOne(id)
  res.json(userData)
}

export async function create(req, res) {
  const name = req.body.name
  const email = req.body.email
  const hashedPsw = await bcrypt.hash(req.body.password, salt)

  if (await User.getOne(email)) {
    throw new Error(`User with email ${email} already exists`)
  }
  const id = await User.addUser(name, email, hashedPsw)

  res.redirect(req.baseUrl + "/" + id);
}

export async function edit(req, res) {
  const id = req.params.id
  const name = req.body.name
  const email = req.body.email
  const psw = req.body.password
  const hashedPsw = psw !== undefined ? await bcrypt.hash(psw, salt) : undefined

  console.log(id, name, email, psw);

  if (email !== undefined && await User.findByEmail(email)) {
    throw new Error(`User with email ${email} already exists`)
  }
  await User.findByIdAndUpdate(id, { name:name, email:email, psw:hashedPsw })

  res.redirect(req.baseUrl + req.path);
}

export async function remove(req, res) {
  const id = req.params.id
  await User.findByIdAndDelete(id)
}