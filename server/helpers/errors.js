export class ClientError extends Error {
  constructor(message = "Client error", code = 400) {
    super(message)
    this.code = code
  }
}

export class ServerError extends Error {
  constructor(message = "Server error", code = 500) {
    super(message)
    this.code = code
  }
}