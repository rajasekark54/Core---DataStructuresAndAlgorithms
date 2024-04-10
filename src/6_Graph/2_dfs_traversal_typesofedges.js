class Queue {
  constructor() {
    this.list = [];
  }

  enqueue(value) {
    return this.list.push(value);
  }

  dequeue() {
    return this.list.shift();
  }

  isEmpty() {
    return this.list.length > 0 ? false : true;
  }
}

class DFSEdges {
  constructor() {
    this.adjList = new Map();
    this.treesList = [];
    this.forwardList = [];
    this.backList = [];
    this.crossList = [];
    this.endTime = 0;
  }

  addVertex(v) {
    let prop = {
      child: [],
      appearTime: null,
      endTime: null,
      parent: null,
    };

    this.adjList.set(v, prop);
  }

  addEdge(v, w) {
    //directed graph
    this.adjList.get(v).child.push(w);
    this.adjList.get(w).parent = v;
  }

  dfs() {
    let startVertex = 'a';
    let traversed = {};

    this.dfsUtil(startVertex, traversed);
    console.log(traversed);
  }

  dfsUtil(vertex, traversed) {
    this.endTime++;

    if (traversed[vertex] !== true) {
      // console.log(vertex);
      traversed[vertex] = true;
      let node = this.adjList.get(vertex);
      node.appearTime = this.endTime;
      let child = node?.child;

      // console.log("   ", child);
      if (child && child.length > 0) {
        for (const v of child) {
          if (traversed[v] !== true) {
            this.tree(vertex, v);
            this.dfsUtil(v, traversed);
          } else {
            this.categorizeVerex(vertex, v);
          }
        }
      } else {
        node.endTime = ++this.endTime;
      }
    }
  }

  isPathfromXtoY(x, y, traversed = {}) {
    if (traversed[x] === true) {
      return;
    } else {
      traversed[x] = true;
    }

    let node = this.adjList.get(x);

    console.log('     ', x, y, node.child);
    for (const vertex of node.child) {
      if (vertex === y) {
        return true;
      } else {
        let isTrue = this.isPathfromXtoY(vertex, y, traversed);
        if (isTrue) {
          return isTrue;
        }
      }
    }

    return false;
  }

  isXappearsBeforeY(x, y) {
    let vertexXApearTime = this.adjList.get(x).appearTime;
    let vertexYApearTime = this.adjList.get(y).appearTime;

    if (vertexXApearTime < vertexYApearTime) {
      return true;
    }
    return false;
  }

  categorizeVerex(x, y) {
    console.log('++  ', x, y);
    let isAppear = this.isXappearsBeforeY(x, y);
    console.log('isAppear', isAppear);
    let isXYpath = this.isPathfromXtoY(x, y);
    console.log('isXYpath', isXYpath);
    let isYXpath = this.isPathfromXtoY(y, x);
    console.log('isYXpath', isYXpath);

    if (isAppear && isXYpath) {
      this.forward(x, y);
    } else if (isYXpath) {
      this.back(x, y);
    } else {
      this.cross(x, y);
    }
  }

  tree(x, y) {
    // console.log("x,y =>", x, y);
    if (x === null) {
      return null;
    }

    let xy = `(${x}, ${y})`;
    this.treesList.push(xy);
  }

  forward(x, y) {
    let xy = `(${x}, ${y})`;
    this.forwardList.push(xy);
  }

  back(x, y) {
    let xy = `(${x}, ${y})`;
    this.backList.push(xy);
  }

  cross(x, y) {
    let xy = `(${x}, ${y})`;
    this.crossList.push(xy);
  }
}

let de = new DFSEdges();
de.addVertex('a');
de.addVertex('b');
de.addVertex('c');
de.addVertex('d');
de.addVertex('e');
de.addVertex('f');
de.addVertex('g');
de.addVertex('l');
de.addVertex('h');
de.addVertex('i');
de.addVertex('j');
de.addVertex('k');
de.addVertex('m');

de.addEdge('a', 'b');
de.addEdge('a', 'f');
de.addEdge('b', 'c');
de.addEdge('c', 'e');
de.addEdge('c', 'd');
de.addEdge('d', 'b');
de.addEdge('d', 'e');
de.addEdge('f', 'g');
de.addEdge('g', 'l');
de.addEdge('g', 'h');
de.addEdge('g', 'm');
de.addEdge('h', 'k');
de.addEdge('h', 'i');
de.addEdge('h', 'f');
de.addEdge('k', 'l');
de.addEdge('k', 'm');
de.addEdge('m', 'h');
de.addEdge('m', 'i');
de.addEdge('i', 'j');
de.addEdge('i', 'd');

console.log(de.adjList);

de.dfs();
console.log('treesList', de.treesList);
console.log('forwardList', de.forwardList);
console.log('backList', de.backList);
console.log('crossList', de.crossList);
