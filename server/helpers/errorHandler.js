export function errorHandler(err, req, res, next) {
  err.code = typeof err.code === "number" && err.code < 600 ? err.code : 500
  err.message = err.message || "Error"

  // Server side error
  if (err.code >= 500 && err.code <= 599) {
    console.log("Internal server error", err)
    err.message = "Internal server error"
  }

  res.status(err.code)
  res.json({message: err.message, code: err.code})
}