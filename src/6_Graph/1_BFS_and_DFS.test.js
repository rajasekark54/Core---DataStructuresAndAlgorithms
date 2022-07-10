class Queue {
  constructor() {
    this.list = [];
  }

  enqueue(val) {
    this.list.push(val);
  }

  dequeue() {
    if (this.list.leength < 0) {
      return 'Empty';
    }

    return this.list.shift();
  }
}

class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    this.adjList.set(vertex, []);
  }

  addEdge(vertex, edge) {
    //Directed
    this.adjList.get(vertex).push(edge);

    //undirected graoh
    this.adjList.get(edge).push(vertex);
  }

  bfs(startNode) {
    if (!startNode) {
      const [firstNode] = this.adjList.keys();
      startNode = firstNode;
    }

    let bfsList = [];
    let queue = new Queue();

    queue.enqueue(startNode);
    let visited = { [startNode]: true };

    while (queue.list.length > 0) {
      let vertex = queue.dequeue();
      bfsList.push(vertex);

      const edges = this.adjList.get(vertex);

      for (let vertex of edges) {
        if (!visited[vertex]) {
          visited[vertex] = true;
          queue.enqueue(vertex);
        }
      }
    }

    return bfsList;
  }

  dfs(startNode) {
    if (!startNode) {
      const [firstNode] = this.adjList.keys();
      startNode = firstNode;
    }

    let dfsList = [];
    let visited = { [startNode]: true };
    this.dfsHelper(dfsList, visited, startNode);
    return dfsList;
  }

  dfsHelper(list, visited, vertex) {
    list.push(vertex);
    let edges = this.adjList.get(vertex);
    console.log(vertex, edges);

    for (const vertex of edges) {
      if (!visited[vertex]) {
        visited[vertex] = true;
        this.dfsHelper(list, visited, vertex);
      }
    }
  }
}

describe('Graph', () => {
  let graph = new Graph();

  beforeEach(() => {
    let vertices = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (const val of vertices) {
      graph.addVertex(val);
    }

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'D');
    graph.addEdge('A', 'E');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'F');
    graph.addEdge('D', 'E');
    graph.addEdge('E', 'F');
  });

  test('BFS', () => {
    let bfs = ['A', 'B', 'D', 'E', 'C', 'F'];
    expect(graph.bfs()).toEqual(bfs);
  });

  test('BFS', () => {
    let bfs = ['E', 'A', 'D', 'F', 'B', 'C'];
    expect(graph.bfs('E')).toEqual(bfs);
  });

  test('DFS', () => {
    let bfs = ['A', 'B', 'C', 'F', 'E', 'D'];
    expect(graph.dfs()).toEqual(bfs);
  });
});
