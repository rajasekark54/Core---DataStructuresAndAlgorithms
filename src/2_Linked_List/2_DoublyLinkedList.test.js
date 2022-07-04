class Node {
  constructor(val) {
    this.val = val;
    this.prv = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtFirst(val) {
    let node = new Node(val);

    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head.prv = node;
      this.head = node;
    }
  }

  insertAtLast(val) {
    if (!this.head) {
      this.insertAtFirst(val);
      return;
    }

    let node = new Node(val);
    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    node.prv = current;
    current.next = node;
  }

  insertAtPos(val, pos = 0) {
    if (pos === 0 || !this.head) {
      this.insertAtFirst(val);
      return;
    }

    let node = new Node(val);
    let current = this.head;
    let previous;
    let count = 0;

    while (count < pos) {
      previous = current;
      current = current.next;
      count++;
    }

    node.prv = previous;
    node.next = current;
    previous.next = node;
    if (current.prv) {
      current.prv = node;
    }
  }

  deleteAtFirst() {
    let current = this.head;
    if (!current || !current.next) {
      this.head = null;
      return;
    }

    current.next.prv = null;
    this.head = current.next;
  }

  deleteAtLast() {
    let current = this.head;
    if (!current || !current.next) {
      this.head = null;
      return;
    }

    let previous;
    while (current.next) {
      previous = current;
      current = current.next;
    }

    previous.next = null;
  }

  deleteAtPos(pos) {
    if (pos === 0) {
      this.deleteAtFirst();
      return;
    }

    let current = this.head;
    let previous;
    let count = 0;

    while (current.next && count < pos) {
      previous = current;
      current = current.next;
      count++;
    }

    previous.next = current.next;
    if (current.next) {
      current.next.prv = previous;
    }
  }

  traversal() {
    let current = this.head;

    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }
}

describe("Doubly Linked List", () => {
  test("Insert At First", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtFirst(2);
    dll.insertAtFirst(1);

    let node1 = new Node(1);
    let node2 = new Node(2);
    node1.next = node2;
    node2.prv = node1;

    expect(dll.head).toEqual(node1);
  });

  test("Insert At Last", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtLast(1);
    dll.insertAtLast(2);

    let node1 = new Node(1);
    let node2 = new Node(2);
    node1.next = node2;
    node2.prv = node1;

    expect(dll.head).toEqual(node1);
  });

  test("Insert At Last", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtPos(1);
    dll.insertAtLast(3);
    dll.insertAtPos(2, 1);

    let node1 = new Node(1);
    let node2 = new Node(2);
    let node3 = new Node(3);
    node1.next = node2;
    node2.prv = node1;
    node2.next = node3;
    node3.prv = node2;

    expect(dll.head).toEqual(node1);
  });

  test("Delete At First", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtLast(2);
    dll.deleteAtFirst();
    expect(dll.head).toEqual(null);

    dll.insertAtLast(1);
    dll.insertAtLast(2);
    dll.deleteAtFirst();

    let node1 = new Node(2);

    console.log(dll.head);
    expect(dll.head).toEqual(node1);
  });

  test("Delete At Last", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtLast(1);
    dll.insertAtLast(2);
    dll.deleteAtLast();

    let node1 = new Node(1);
    expect(dll.head).toEqual(node1);

    dll.deleteAtLast();
    expect(dll.head).toEqual(null);
  });

  test("Delete At Pos", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtLast(1);
    dll.insertAtLast(2);
    dll.deleteAtPos(1);

    let node1 = new Node(1);
    expect(dll.head).toEqual(node1);

    dll.insertAtLast(2);
    dll.insertAtLast(3);
    dll.deleteAtPos(1);

    let node2 = new Node(1);
    let node3 = new Node(3);
    node2.next = node3;
    node3.prv = node2;
    expect(dll.head).toEqual(node2);
  });

  test("Delete At Last", () => {
    let dll = new DoublyLinkedList();

    dll.insertAtLast(1);
    dll.insertAtLast(2);
    dll.insertAtLast(3);
    dll.traversal();
  });
});
