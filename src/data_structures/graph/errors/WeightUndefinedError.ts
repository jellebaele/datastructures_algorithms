export default class WeightUndefinedError extends Error {
  constructor() {
    super('Weight needs to be defined.');
  }
}
