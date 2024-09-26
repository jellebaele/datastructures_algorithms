export default class VertexNotFoundError extends Error {
  constructor(vertexName: string) {
    super(`Vertex with name '${vertexName}' not found.`);
  }
}
