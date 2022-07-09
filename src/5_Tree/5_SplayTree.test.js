/*
The most frequently accessed elements would be near to root after splaying. So searching would take less time. 

Dis-advantages:
 - It is not strictly balanced. It is roughly balanced. So it may be skewed. So that time searching would be o(n). 
*/

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  getParent() {
    if (!this.parent) {
      return null;
    }
    return this.parent;
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

  getDirection() {
    let dir = '';

    if (this.getGrandParent()) {
      if (this.getParent().isLeftPath()) {
        dir = 'Left';
      } else {
        dir = 'Right';
      }
    }

    let res = this.isLeftPath() ? dir + 'Left' : dir + 'Right';

    return res;
  }
}

class SplayTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
    } else {
      let current = this.root;
      let previous;

      while (current) {
        previous = current;

        if (current.val > val) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      newNode.parent = previous;
      if (previous.val > val) {
        previous.left = newNode;
      } else {
        previous.right = newNode;
      }
    }

    // if (val !== 17) {
    this.splay(newNode);
    // }
  }

  getCurrentOrNearestVal(val) {
    if (!this.root) {
      return null;
    }

    let current = this.root;
    let previous;

    while (current) {
      previous = current;

      if (current.val === val) {
        break;
      } else if (current.val < val) {
        current = current.right;
      } else if (current.val > val) {
        current = current.left;
      } else {
        break;
      }
    }

    return {
      current,
      previous,
    };
  }

  search(val) {
    if (!this.root) {
      return null;
    }

    let { previous } = this.getCurrentOrNearestVal(val);

    console.log(val, 'current or nearest serach val ---->', previous.val);
    this.splay(previous);
  }

  remove(val) {
    if (!this.root) {
      return null;
    }
    this.root = this.removeNode(this.root, val);
    this.search(val);
  }

  removeNode(current, val) {
    console.log('current ---->', current);
    if (!current) {
      return current;
    }
    if (current.val === val) {
      console.log('-------', val);

      if (!current.left && !current.right) {
        // No Children
        return null;
      } else if (!current.left) {
        //One Children
        return current.right;
      } else if (!current.right) {
        //One Children
        return current.left;
      } else {
        // Two Children
        // get inorder successor, smallest in right subtree
        let temp = this.kthSmallestNode(current.right);
        current.val = temp.val;

        current.right = this.removeNode(current.right, temp.val);

        return current;
      }
    } else {
      if (val < current.val) {
        console.log(current.val, '--1--', current.val);
        current.left = this.removeNode(current.left, val);
        if (current.left) {
          current.left.parent = current;
        }
        return current;
      } else {
        console.log(current.val, '----', val);

        current.right = this.removeNode(current.right, val);
        if (current.right) {
          current.right.parent = current;
        }
        return current;
      }
    }
  }

  kthSmallestNode(node) {
    console.log('--', node);
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  splay(node) {
    if (!node.parent) {
      this.root = node;
      return;
    }

    let dir = node.getDirection();
    let p = node.getParent();
    let gp = node.getGrandParent();

    console.log(node.val, dir);

    if (dir === 'Left') {
      this.root = this.rightRotation(p);
      this.splay(node);
    } else if (dir === 'Right') {
      this.root = this.leftRotation(p);
      this.splay(node);
    } else if (dir === 'RightRight') {
      this.root = this.leftRotation(gp);
      this.root = this.leftRotation(p);
      this.splay(node);
    } else if (dir === 'LeftLeft') {
      this.root = this.rightRotation(gp);
      this.root = this.rightRotation(p);
      this.splay(node);
    } else if (dir === 'RightLeft') {
      this.root = this.rightRotation(p);
      this.root = this.leftRotation(gp);
      this.splay(node);
    } else if (dir === 'LeftRight') {
      this.root = this.leftRotation(p);
      this.root = this.rightRotation(gp);
      this.splay(node);
    }
  }

  rightRotation(x) {
    let y = x.left;
    let tmp = y?.right;

    if (x.parent) {
      if (x.parent.right === x) {
        x.parent.right = y;
      } else {
        x.parent.left = y;
      }
    }

    y.parent = x.parent;
    y.right = x;
    x.parent = y;

    x.left = tmp;

    if (x.left) {
      x.left.parent = x;
    }
    return y;
  }

  leftRotation(x) {
    let y = x.right;
    let tmp = y?.left;

    if (x.parent) {
      if (x.parent.left === x) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }

    y.parent = x.parent;
    y.left = x;
    x.parent = y;
    x.right = tmp;

    if (x.right) {
      x.right.parent = x;
    }
    return y;
  }
}

let st = new SplayTree();
st.insert(15);
st.insert(10);
st.insert(17);
st.insert(7);
st.insert(13);
st.insert(16);

console.log('\nAfter Insertion', st.root);
console.log(st.root);

console.log('\nSearch');
st.search(8);
st.search(15);
// console.log(st.root);

console.log('\n Delete');
st.remove(7);
// st.delete(14);
// st.delete(16);
// st.delete(20);
// st.delete(17);

console.log(st.root);
