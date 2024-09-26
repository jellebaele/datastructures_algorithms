export default class VertexAlreadyExistsError extends Error {
  constructor(vertexName: string) {
    super(`Vertex with name '${vertexName} already exists.`);
  }
}
