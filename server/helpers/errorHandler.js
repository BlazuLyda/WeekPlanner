export function errorHandler(err, req, res, next) {
  const code = err instanceof Number && err < 600 ? err : 500
  const message = err.message || "Error"

  res.status(code)
  res.json({ code: code, message: message })
}