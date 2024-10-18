export default class NotFoundError extends Error {
  constructor(message = 'Element not found') {
    super(message);
  }
}
