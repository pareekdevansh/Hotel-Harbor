class ErrorResponse extends Error {
  constructor(message, status) {
    console.log("message from ErrorResponse constructor: ", message);
    super(message);
    this.status = status;
  }
}
module.exports = ErrorResponse;
