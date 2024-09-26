export default class NodeNotFoundError extends Error {
  constructor(nodeName: string) {
    super(`Node with name '${nodeName}' not found.`);
  }
}
