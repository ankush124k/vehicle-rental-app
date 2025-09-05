/**
 * A custom error class to handle specific HTTP status codes throughout the application.
 * This allows service-layer functions to specify what the HTTP response code should be
 * when an error is thrown.
 */
class ServiceError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ServiceError;
