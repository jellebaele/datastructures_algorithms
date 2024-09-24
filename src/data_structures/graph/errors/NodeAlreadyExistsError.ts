export default class NodeAlreadyExistsError extends Error {
  constructor(nodeName: string) {
    super(`Node with name '${nodeName} already exists.`);
  }
}
