/*
RBT is BST
Roughly hight balanced tree

Steps:
1. Tree Empty     - New Node as - Black
2. Tree Not Empty - New Node as - Red
   a) If parant black - exit 
   b) If parant red 
      Sibiling of parent (if node not exsist consider node as black)
        | - If Balck - Rotation with recolor
        | - If red   - recolor parent and it's sibiling
            - If GP not root node then recolor it 
*/

const COLOR = {
  BLACK: 'black',
  RED: 'red',
};

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.color = COLOR.RED;
    this.parent = null;
  }

  fillRed() {
    this.color = COLOR.RED;
  }

  fillBlack() {
    this.color = COLOR.BLACK;
  }

  isRed() {
    if (this.color === COLOR.RED) {
      return true;
    }

    return false;
  }

  getParent() {
    if (this.parent) {
      return this.parent;
    }

    return null;
  }

  getGrandParent() {
    if (this.getParent()) {
      return this.getParent().getParent();
    }

    return null;
  }

  isLeftPath() {
    if (this.getParent()?.left === this) {
      return true;
    }
    return false;
  }

  isRightPath() {
    if (this.getParent()?.right === this) {
      return true;
    }
    return false;
  }

  getSibiling() {
    let gp = this.getGrandParent();

    if (!gp) {
      return null;
    }

    if (this.getParent().isLeftPath()) {
      return this.getGrandParent().right;
    }

    return this.getGrandParent().left;
  }

  directionFromGP() {
    let pathOfChild = this.isLeftPath() ? 'Left' : 'Right';

    if (this.getParent().isLeftPath()) {
      return 'Left' + pathOfChild;
    } else {
      return 'Right' + pathOfChild;
    }
  }

  insertLeft(val) {
    this.left = new Node(val);
    this.left.parent = this;
    return this.left;
  }

  insertRight(val) {
    this.right = new Node(val);
    this.right.parent = this;
    return this.right;
  }

  addNew(val) {
    if (val === this.val) {
      // Avoid dublicate value
      return null;
    }

    if (this.val > val) {
      return !this.left ? this.insertLeft(val) : this.left.addNew(val);
    } else {
      return !this.right ? this.insertRight(val) : this.right.addNew(val);
    }
  }

  recolor() {
    if (this.color === COLOR.RED) {
      this.color = COLOR.BLACK;
    } else {
      this.color = COLOR.RED;
    }
  }
}

class RBT {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let newNode;
    if (!this.root) {
      this.root = new Node(val);
      newNode = this.root;
    } else {
      newNode = this.root.addNew(val);
    }

    // console.log('newNode ----->', newNode);
    this.balance(newNode);
  }

  balance(node) {
    if (node === this.root) {
      node.fillBlack();
      return true;
    }

    if (node.getParent().isRed()) {
      let uncle = node.getSibiling();

      if (uncle && uncle.isRed()) {
        node.getParent().fillBlack();
        uncle.fillBlack();
        let gp = node.getGrandParent();
        gp.fillRed(); // if it root, color will be changed on call recursive
        this.balance(gp);
      } else {
        console.log('red with sibiling black', node.val);
        let dir = node.directionFromGP();
        console.log('dir --->', dir);

        if (node.getParent().isLeftPath()) {
          if (dir === 'LeftLeft') {
            let gp = node.getGrandParent();
            this.rightRotation(gp);
          } else if (dir === 'LeftRight') {
            let tmp = node.getParent();
            tmp = this.leftRotation(tmp);
            this.rightRotation(tmp.parent);
          }

          //Recolor
          node.recolor();
          node.left.recolor();

          this.balance(node);
        } else {
          if (dir === 'RightRight') {
            let gp = node.getGrandParent();
            this.leftRotation(gp);
          } else if (dir === 'RightLeft') {
            let tmp = node.getParent();
            console.log(tmp);
            tmp = this.rightRotation(tmp);
            this.leftRotation(tmp.parent);
          }
          //Recolor
          node.recolor();
          node.left.recolor();

          this.balance(node);
        }
      }
    }
  }

  leftRotation(x) {
    let y = x.right;
    let tmp = y.left;

    console.log('))))))', x);
    if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.parent = x.parent;
    y.left = x;
    x.right = tmp;
    x.parent = y;
    return y;
  }

  rightRotation(x) {
    let y = x.left;
    let tmp = y.right;

    if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.parent = x.parent;
    y.right = x;
    x.left = tmp;
    x.parent = y;

    return y;
  }
}

let rbt = new RBT();
rbt.insert(10);
rbt.insert(18);
rbt.insert(7);
rbt.insert(15);
rbt.insert(16);
rbt.insert(30);
rbt.insert(25);
rbt.insert(40);
// rbt.insert(60);
// rbt.insert(2);
// rbt.insert(1);
// rbt.insert(70);
// rbt.insert(16);

console.log(rbt.root);
