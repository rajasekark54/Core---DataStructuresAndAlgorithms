class Node {
  constructor(val) {
    this.val = val;
    this.prv = null;
    this.next = null;
  }
}

class DoublyCircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtFirst(val) {
    let node = new Node(val);

    if (!this.head) {
      this.head = this.tail = node;
      node.next = this.head;
      node.prv = this.head;
    } else {
      node.next = this.head;
      this.head.prv = node;
      this.head = node;
      node.prv = this.tail;
      this.tail.next = this.head;
    }
  }

  insertAtLast(val) {
    if (!this.head) {
      this.insertAtFirst(val);
      return;
    }

    let node = new Node(val);
    node.prv = this.tail;
    node.next = this.head;
    this.tail.next = node;
    this.tail = node;
    this.head.prv = this.tail;
  }

  insertAtPos(val, pos = null) {
    if (pos === 0) {
      this.insertAtFirst(val);
    } else if (!pos) {
      this.insertAtLast(val);
    }

    let node = new Node(val);
    let current = this.head;
    let previous;
    let count = 0;

    while (count < pos && (!previous || previous.next != this.head)) {
      previous = current;
      current = current.next;
      count++;
    }

    // insert at last if postion greater than current head length
    if (previous.next === this.head) {
      this.insertAtLast(val);
      return;
    }

    node.next = current;
    node.prv = previous;
    current.prv = node;
    previous.next = node;
  }

  deleteAtFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
    this.head.prv = this.tail;
    this.tail.next = this.head;
  }

  deleteAtLast() {
    if (!this.head || this.head === this.tail) {
      this.head = this.tail = null;
      return;
    }

    this.tail = this.tail.prv;
    this.tail.next = this.head;
    this.head.prv = this.tail;
  }

  deleteAtPos(pos) {
    if (!this.head) {
      return;
    } else if (pos === 0) {
      this.deleteAtFirst();
    }

    let current = this.head;
    let previous;
    let count = 0;

    while (count < pos && (!previous || previous.next !== this.head)) {
      previous = current;
      current = current.next;
      count++;
    }

    // delete last node if pos greater than current head length
    if (previous.next === this.head) {
      this.deleteAtLast();
      return;
    }

    previous.next = current.next;
    current.next.prv = this.head;

    // if deleted node is tail node the update it
    if (current === this.tail) {
      this.tail = previous;
    }
  }
}

describe('Singly Circular Linked List', () => {
  let dcll;

  beforeEach(() => {
    dcll = new DoublyCircularLinkedList();
  });

  test('Insert At First', () => {
    dcll.insertAtFirst(2);

    let node2 = new Node(2);
    node2.next = node2;
    node2.prv = node2;
    expect(dcll.head).toEqual(node2);

    dcll.insertAtFirst(1);
    let node1 = new Node(1);
    node1.next = node2;
    node2.next = node1;
    node2.prv = node1;
    node1.prv = node2;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node2);
  });

  test('Insert At Last', () => {
    dcll.insertAtLast(2);

    let node1 = new Node(2);
    node1.next = node1;
    node1.prv = node1;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node1);

    dcll.insertAtLast(1);
    let node2 = new Node(1);
    node1.next = node2;
    node2.next = node1;
    node1.prv = node2;
    node2.prv = node1;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node2);
  });

  test('Insert At Pos', () => {
    dcll.insertAtLast(1);
    dcll.insertAtPos(2, 1);

    let node1 = new Node(1);
    let node2 = new Node(2);
    node1.next = node2;
    node2.next = node1;
    node1.prv = node2;
    node2.prv = node1;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node2);

    dcll.insertAtPos(2.5, 1);
    let node3 = new Node(2.5);
    node1.next = node3;
    node3.prv = node1;
    node3.next = node2;
    node2.prv = node3;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node2);
  });

  test('Delete At First', () => {
    dcll.insertAtLast(1);
    dcll.insertAtLast(2);
    dcll.deleteAtFirst();

    let node1 = new Node(2);
    node1.next = node1;
    node1.prv = node1;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node1);
  });

  test('Delete At Last', () => {
    dcll.insertAtLast(1);
    dcll.insertAtLast(2);
    dcll.deleteAtLast();

    let node1 = new Node(1);
    node1.next = node1;
    node1.prv = node1;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node1);

    dcll.deleteAtLast();
    expect(dcll.head).toEqual(null);
    expect(dcll.tail).toEqual(null);
  });

  test('Delete At pos', () => {
    dcll.insertAtLast(1);
    dcll.insertAtLast(2);
    dcll.insertAtLast(3);
    dcll.deleteAtPos(1);

    let node1 = new Node(1);
    let node2 = new Node(3);
    node1.next = node2;
    node2.prv = node1;
    node2.next = node1;
    node1.prv = node2;

    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node2);

    dcll.deleteAtPos(1);
    node1.next = node1;
    node1.prv = node1;
    expect(dcll.head).toEqual(node1);
    expect(dcll.tail).toEqual(node1);
  });
});
