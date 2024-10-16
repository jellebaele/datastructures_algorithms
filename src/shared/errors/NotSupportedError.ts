export default class NotSupportedError extends Error {
  constructor(action: string) {
    super(`${action} is not supported.`);
  }
}
