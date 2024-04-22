class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.inOrderList = [];
    this.preOrderList = [];
    this.postOrderList = [];
  }

  /* insertHelperIterative(node, val) {
    let newNode = new Node(val);

    if (!node) return newNode;
    let current = node;

    while (current) {
      if (current.val < val) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      }
    }
    return node;
  } */

  insertHelperRecursive(node, val) {
    if (!node || node === null) {
      return new Node(val);
    }

    if (node.val < val) {
      node.right = this.insertHelperRecursive(node.right, val);
    } else if (node.val > val) {
      node.left = this.insertHelperRecursive(node.left, val);
    }

    return node;
  }

  insert(val) {
    // Approach 1
    this.root = this.insertHelperRecursive(this.root, val);

    //Approach 2
    // this.root = this.insertHelperIterative(this.root, val);
  }

  removeHelper(node, val) {
    if (!node) {
      return null;
    }

    if (node.val === val) {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        let tmpNode = this.findKthSmallestNode(node.right);
        node.val = tmpNode.val;
        node.right = this.removeHelper(node.right, tmpNode.val);
        return node;
      }
    } else if (node.val < val) {
      node.right = this.removeHelper(node.right, val);
    } else if (node.val > val) {
      node.left = this.removeHelper(node.left, val);
    }

    return node;
  }

  remove(val) {
    this.root = this.removeHelper(this.root, val);
  }

  findKthSmallestNode(node) {
    let current = node;

    while (current.left) {
      current = current.left;
    }

    return current;
  }

  //Left root right
  inOrderTraversalRecursive(node = this.root) {
    if (!node) {
      return true;
    }

    this.inOrderTraversalRecursive(node.left);
    this.inOrderList.push(node.val);
    this.inOrderTraversalRecursive(node.right);
  }

  /* inOrderTraversalIterative(currentNode = this.root) {
    if (!currentNode) return null;

    let stack = [];

    while (currentNode || stack.length) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      currentNode = stack.pop();
      this.inOrderList.push(currentNode.val);
      currentNode = currentNode.right;
    }
  } */

  //root Left right
  preOrderTraversalRecursive(node = this.root) {
    if (!node) {
      return null;
    }

    this.preOrderList.push(node.val);
    this.preOrderTraversalRecursive(node.left);
    this.preOrderTraversalRecursive(node.right);
  }

  /* preOrderTraversalIterative(currentNode = this.root) {
    let stack = [];

    stack.push(currentNode);
    while (stack.length) {
      currentNode = stack.pop();
      this.preOrderList.push(currentNode.val);

      if (currentNode.right) stack.push(currentNode.right);
      if (currentNode.left) stack.push(currentNode.left);
    }
  } */

  // left right root
  postOrderTraversalRecursive(node = this.root) {
    if (!node) {
      return null;
    }

    this.postOrderTraversalRecursive(node.left);
    this.postOrderTraversalRecursive(node.right);
    this.postOrderList.push(node.val);
  }

  /* postOrderTraversalIterative(currentNode = this.root) {
    if (!currentNode) return null;

    let stack = [currentNode];

    while (stack.length) {
      currentNode = stack.pop();
      this.postOrderList.unshift(currentNode.val);

      if (currentNode.left) {
        stack.push(currentNode.left);
      }

      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
  } */

  //BFS
  levelOrderTraversal() {
    if (!this.root) {
      return null;
    }

    let bfsList = [];
    let queue = [this.root];

    while (queue.length > 0) {
      let node = queue.shift();
      bfsList.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return bfsList;
  }
}

describe('BST', () => {
  test('Insert', () => {
    let bst = new BST();

    bst.insert(2);
    let node1 = new Node(2);
    expect(bst.root).toEqual(node1);

    bst.insert(1);
    bst.insert(3);

    let node2 = new Node(1);
    let node3 = new Node(3);

    node1.left = node2;
    node1.right = node3;

    expect(bst.root).toEqual(node1);
  });

  test('Delete', () => {
    let bst = new BST();

    bst.insert(8);
    bst.insert(3);
    bst.insert(10);
    bst.insert(1);
    bst.insert(6);
    bst.insert(4);
    bst.insert(7);

    bst.remove(3);

    let node1 = new Node(8);
    let node2 = new Node(4);
    let node3 = new Node(10);
    let node4 = new Node(1);
    let node5 = new Node(6);
    let node6 = new Node(7);

    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    node5.right = node6;

    expect(bst.root).toEqual(node1);

    bst.remove(7);
    node5.right = null;
    expect(bst.root).toEqual(node1);
  });

  test('Inorder PreOder PostOrder and Levelorder', () => {
    let bst = new BST();

    bst.insert(8);
    bst.insert(3);
    bst.insert(10);
    bst.insert(1);
    bst.insert(6);
    bst.insert(4);
    bst.insert(7);

    bst.inOrderTraversalRecursive();
    expect(bst.inOrderList).toEqual([1, 3, 4, 6, 7, 8, 10]);

    bst.preOrderTraversalRecursive();
    expect(bst.preOrderList).toEqual([8, 3, 1, 6, 4, 7, 10]);

    bst.postOrderTraversalRecursive();
    expect(bst.postOrderList).toEqual([1, 4, 7, 6, 3, 10, 8]);

    expect(bst.levelOrderTraversal()).toEqual([8, 3, 10, 1, 6, 4, 7]);
  });
});
