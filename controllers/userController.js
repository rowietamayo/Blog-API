const bcrypt = require("bcrypt")
const User = require("../models/User.js")
const auth = require("../auth.js")
const { errorHandler } = auth

// user register
module.exports.register = async (req, res) => {
  const { email, username, password } = req.body

  if (!email.includes("@")) {
    return res.status(400).send({ error: "Email invalid" })
  }

  if (password.length < 8) {
    return res
      .status(400)
      .send({ error: "Password must be at least 8 characters" })
  }

  if (username.length < 3) {
    return res
      .status(400)
      .send({ error: "Username must be at least 3 characters" })
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).send({ error: "Email already in use" })
      }
      if (existingUser.username === username) {
        return res.status(400).send({ error: "Username already taken" })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    })

    await newUser.save()
    return res.status(201).send({ message: "Registered Successfully" })
  } catch (error) {
    errorHandler(error, req, res)
  }
}

// user login
module.exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).send({ success: false, message: "No Email Found" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) {
      return res.status(200).send({ access: auth.createAccessToken(user) })
    } else {
      return res
        .status(401)
        .send({ success: false, error: "Email and password do not match" })
    }
  } catch (err) {
    errorHandler(err, req, res)
  }
}
