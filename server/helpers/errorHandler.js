export function errorHandler(err, req, res, next) {
  const code = err instanceof Number && err < 600 ? err : 500
  const message = err.message || "Error"

  // Server side error
  if (code >= 500 && code <= 599) console.log(err)

  res.status(code)
  res.json({ code: code, message: message })
}