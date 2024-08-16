export default class NotFoundError extends Error {
  constructor() {
    super('Element not found');
  }
}
