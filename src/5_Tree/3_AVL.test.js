class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
    this.height = 1;
    this.bf = 0;
  }

  heightOfLeft() {
    if (!this.left) {
      return 0;
    }

    return this.left.height;
  }

  heightOfRight() {
    if (!this.right) {
      return 0;
    }

    return this.right.height;
  }

  directionOfChild() {
    if (this.heightOfLeft() > this.heightOfRight()) {
      return 'Left';
    }
    return 'Right';
  }

  directionOfGrandChild() {
    let dir = this.directionOfChild();

    if (dir === 'Left') {
      dir += this.left.directionOfChild();
    } else {
      dir += this.right.directionOfChild();
    }

    return dir;
  }
}

class AVL {
  constructor() {
    this.root = null;
  }

  updateHeightAndBF(node) {
    let heightLeft = node.heightOfLeft();
    let heightRight = node.heightOfRight();
    node.height = 1 + Math.max(heightLeft, heightRight);
    node.bf = heightLeft - heightRight;
  }

  insert(val) {
    this.root = this.insertHelper(this.root, val);
  }

  insertHelper(node, val) {
    if (!node) {
      return new Node(val);
    }

    if (node.val < val) {
      node.right = this.insertHelper(node.right, val);
    } else {
      node.left = this.insertHelper(node.left, val);
    }

    this.updateHeightAndBF(node);

    if (node.bf > 1 || node.bf < -1) {
      node = this.balanceFactor(node);
    }
    return node;
  }

  remove(val) {
    this.root = this.removeHelper(this.root, val);
  }

  removeHelper(node, val) {
    if (!node) {
      return node;
    }

    if (node.val === val) {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        let tmp = this.kthHightestNode(node.left);
        node.val = tmp.val;
        node.left = this.removeHelper(node.left, tmp.val);
      }
    } else {
      if (node.val < val) {
        node.right = this.removeHelper(node.right, val);
      } else {
        node.left = this.removeHelper(node.left, val);
      }
    }

    this.updateHeightAndBF(node);
    if (node.bf > 1 || node.bf < -1) {
      node = this.balanceFactor(node);
    }
    return node;
  }

  kthHightestNode(node) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  leftRotation(x) {
    let y = x.right;
    let tmp = y.left;
    y.left = x;
    x.right = tmp;

    x.height = 1 + Math.max(x.heightOfLeft(), x.heightOfRight());
    x.bf = x.heightOfLeft() - x.heightOfRight();

    y.height = 1 + Math.max(y.heightOfLeft(), y.heightOfRight());
    y.bf = y.heightOfLeft() - y.heightOfRight();

    return y;
  }

  rightRotation(x) {
    let y = x.left;
    let tmp = y.right;
    y.right = x;
    x.left = tmp;

    x.height = 1 + Math.max(x.heightOfLeft(), x.heightOfRight());
    x.bf = x.heightOfLeft() - x.heightOfRight();

    y.height = 1 + Math.max(y.heightOfLeft(), y.heightOfRight());
    y.bf = y.heightOfLeft() - y.heightOfRight();

    return y;
  }

  balanceFactor(node) {
    let dir = node.directionOfGrandChild();

    if (node.bf < -1) {
      if (dir === 'RightRight') {
        node = this.leftRotation(node);
      } else if (dir === 'RightLeft') {
        node.right = this.rightRotation(node.right);
        node = this.leftRotation(node);
      }
    }

    if (node.bf > 1) {
      if (dir === 'LeftLeft') {
        node = this.rightRotation(node);
      } else if ('LeftRight') {
        node.left = this.leftRotation(node.left);
        node = this.rightRotation(node);
      }
    }

    return node;
  }
}

describe('AVL Tree', () => {
  let avl;
  let node1;
  let node2;
  let node3;

  beforeEach(() => {
    avl = new AVL();
    node1 = new Node(2);
    node2 = new Node(1);
    node3 = new Node(3);

    node1.left = node2;
    node1.right = node3;

    node1.height = 2;
    node1.bf = 0;
    node2.height = 1;
    node2.bf = 0;
    node3.height = 1;
    node3.bf = 0;
  });

  test('Insert (RR - L rotaion)', () => {
    avl.insert(1);
    avl.insert(2);
    avl.insert(3);

    expect(avl.root).toEqual(node1);
  });

  test('Insert (LL - R rotaion)', () => {
    avl.insert(3);
    avl.insert(2);
    avl.insert(1);

    expect(avl.root).toEqual(node1);
  });

  test('Insert (RL - L -> R and L rotaion)', () => {
    avl.insert(1);
    avl.insert(3);
    avl.insert(2);

    expect(avl.root).toEqual(node1);
  });

  test('Insert (RL - L -> R and L rotaion)', () => {
    avl.insert(3);
    avl.insert(1);
    avl.insert(2);

    expect(avl.root).toEqual(node1);
  });
});

// with heavy load
// let avl = new AVL();
// avl.insert(14);
// avl.insert(17);
// avl.insert(11);
// avl.insert(7);
// avl.insert(53);
// avl.insert(4);
// avl.insert(13);
// avl.insert(12);
// avl.insert(8);
// avl.insert(60);
// avl.insert(19);
// avl.insert(16);
// avl.insert(20);
// console.log(avl.root);

// console.log('++++++delete++++++++');
// avl.remove(8);
// avl.remove(7);
// avl.remove(11);
// avl.remove(14);
// avl.remove(17);

// console.log(avl.root);
