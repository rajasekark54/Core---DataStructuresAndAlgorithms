class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let node = new Node(value);

    if (!this.root) {
      this.root = node;
    } else {
      let current = this.root;

      if (!current.left) {
        current.left = node;
      } else if (!current.right) {
        current.right = node;
      }
    }
  }

  printResultData() {
    console.log(this.root);
  }
}

const tree = new BinaryTree();
tree.insert(2);
tree.printResultData();
tree.insert(4);
tree.printResultData();
tree.insert(3);
tree.printResultData();
