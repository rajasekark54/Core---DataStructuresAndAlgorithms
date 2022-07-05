class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtFirst(val) {
    let node = new Node(val);

    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  deleteAtFirst() {
    if (!this.head) {
      return "Empty List";
    }

    this.head = this.head.next;
  }
}

describe("Stack using Linked List", () => {
  let sll = new LinkedList();

  test("Insert", () => {
    sll.insertAtFirst(2);
    sll.insertAtFirst(1);

    let node1 = new Node(1);
    let node2 = new Node(2);
    node1.next = node2;
    expect(sll.head).toEqual(node1);
  });

  test("Delete", () => {
    sll.deleteAtFirst();
    sll.deleteAtFirst();

    expect(sll.head).toEqual(null);
    expect(sll.deleteAtFirst()).toEqual("Empty List");
  });
});
