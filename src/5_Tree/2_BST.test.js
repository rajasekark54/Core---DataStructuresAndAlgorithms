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

  insertHelper(node, val) {
    if (!node || node === null) {
      return new Node(val);
    }

    if (node.val < val) {
      node.right = this.insertHelper(node.right, val);
    } else if (node.val > val) {
      node.left = this.insertHelper(node.left, val);
    }

    return node;
  }

  insert(val) {
    this.root = this.insertHelper(this.root, val);
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
    } else {
      if (node.val < val) {
        node.right = this.removeHelper(node.right, val);
      } else if (node.val > val) {
        node.left = this.removeHelper(node.left, val);
      }
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
  inOrder(node = this.root) {
    if (!node) {
      return true;
    }

    this.inOrder(node.left);
    this.inOrderList.push(node.val);
    this.inOrder(node.right);
  }

  //root Left right
  preOrder(node = this.root) {
    if (!node) {
      return null;
    }

    this.preOrderList.push(node.val);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  // left right root
  postOrder(node = this.root) {
    if (!node) {
      return null;
    }

    this.postOrder(node.left);
    this.postOrder(node.right);
    this.postOrderList.push(node.val);
  }

  //BFS
  levelOrder() {
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

    bst.inOrder();
    expect(bst.inOrderList).toEqual([1, 3, 4, 6, 7, 8, 10]);

    bst.preOrder();
    expect(bst.preOrderList).toEqual([8, 3, 1, 6, 4, 7, 10]);

    bst.postOrder();
    expect(bst.postOrderList).toEqual([1, 4, 7, 6, 3, 10, 8]);

    expect(bst.levelOrder()).toEqual([8, 3, 10, 1, 6, 4, 7]);
  });
});
