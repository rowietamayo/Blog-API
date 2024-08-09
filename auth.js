// [SECTION] Dependencies and Modules
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports.createAccessToken = (user) => {
  console.log(user)
  const data = {
    id: user._id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
  }

  return jwt.sign(data, process.env.JWT_SECRET_KEY, {})
}

// [SECTION] Token Verification

module.exports.verify = (req, res, next) => {
  console.log(req.headers.authorization)

  let token = req.headers.authorization

  if (typeof token === "undefined") {
    return res.send({ auth: "Failed. No Token" })
  } else {
    console.log(token)
    token = token.slice(7, token.length)
    console.log(token)

    // [SECTION] Token decryption

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedToken) {
      if (err) {
        return res.status(403).send({
          auth: "Failed",
          message: err.message,
        })
      } else {
        console.log("result from verify method:")
        console.log(decodedToken)

        req.user = decodedToken

        next()
      }
    })
  }
}

// [SECTION] Admin Verification

module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(403).send({
      auth: "Failed",
      message: "Action Forbidden",
    })
  }
}

// [SECTION] Error Handler
module.exports.errorHandler = (err, req, res, next) => {
  console.error(err)

  const errorMessage = err.message || "Internal Server Error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    error: {
      message: errorMessage,
      errorCode: err.code || "SERVER_ERROR",
      details: err.details || null,
    },
  })
}
