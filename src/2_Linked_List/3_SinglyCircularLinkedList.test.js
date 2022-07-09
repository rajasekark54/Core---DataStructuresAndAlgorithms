class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyCircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtFirst(val) {
    let node = new Node(val);

    if (!this.head) {
      this.head = this.tail = node;
      this.tail.next = this.head;
    } else {
      node.next = this.head;
      this.head = node;
      this.tail.next = this.head;
    }
  }

  insertAtLast(val) {
    if (!this.head) {
      this.insertAtFirst(val);
      return;
    }

    let node = new Node(val);
    this.tail.next = node;
    node.next = this.head;
    this.tail = node;
  }

  insertAtPos(val, pos = null) {
    if (pos === 0) {
      this.insertAtFirst(val);
    } else if (!pos) {
      this.insertAtLast(val);
    }

    let node = new Node(val);
    let current = this.head;
    let previuous;
    let count = 0;

    while (count < pos && (!previuous || previuous.next != this.head)) {
      previuous = current;
      current = current.next;
      count++;
    }

    // insert at last if postion greater than current head length
    if (previuous.next === this.head) {
      this.insertAtLast(val);
      return;
    }

    node.next = current;
    previuous.next = node;
  }

  deleteAtFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
    this.tail.next = this.head;
  }

  deleteAtLast() {
    if (!this.head) {
      return;
    }

    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      let current = this.head;

      while (current.next !== this.tail) {
        current = current.next;
      }

      current.next = this.tail.next;
      this.tail = current;
    }
  }

  deleteAtPos(pos) {
    if (!this.head) {
      return;
    } else if (pos === 0) {
      this.deleteAtFirst();
    }

    let current = this.head;
    let previuous;
    let count = 0;

    while (count < pos && (!previuous || previuous.next !== this.head)) {
      previuous = current;
      current = current.next;
      count++;
    }

    // delete last node if pos greater than current head length
    if (previuous.next === this.head) {
      this.deleteAtLast();
      return;
    }

    previuous.next = current.next;

    // if deleted node is tail node the update it
    if (current === this.tail) {
      this.tail = previuous;
    }
  }
}

describe('Singly Circular Linked List', () => {
  test('Insert At First', () => {
    let scll = new SinglyCircularLinkedList();

    scll.insertAtFirst(2);

    let node2 = new Node(2);
    node2.next = node2;
    expect(scll.head).toEqual(node2);

    scll.insertAtFirst(1);
    let node1 = new Node(1);
    node1.next = node2;
    node2.next = node1;
    expect(scll.head).toEqual(node1);
  });

  test('Insert At Last', () => {
    let scll = new SinglyCircularLinkedList();

    scll.insertAtLast(2);

    let node1 = new Node(2);
    node1.next = node1;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node1);

    scll.insertAtLast(1);
    let node2 = new Node(1);
    node1.next = node2;
    node2.next = node1;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node2);
  });

  test('Insert At Pos', () => {
    let scll = new SinglyCircularLinkedList();

    scll.insertAtLast(1);
    scll.insertAtPos(2, 1);

    let node1 = new Node(1);
    let node2 = new Node(2);
    node1.next = node2;
    node2.next = node1;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node2);

    scll.insertAtPos(2.5, 1);
    let node3 = new Node(2.5);
    node1.next = node3;
    node3.next = node2;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node2);
  });

  test('Delete At First', () => {
    let scll = new SinglyCircularLinkedList();

    scll.insertAtLast(1);
    scll.insertAtLast(2);
    scll.deleteAtFirst();

    let node1 = new Node(2);
    node1.next = node1;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node1);
  });

  test('Delete At Last', () => {
    let scll = new SinglyCircularLinkedList();

    scll.insertAtLast(1);
    scll.insertAtLast(2);
    scll.deleteAtLast();

    let node1 = new Node(1);
    node1.next = node1;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node1);

    scll.deleteAtLast();
    expect(scll.head).toEqual(null);
    expect(scll.tail).toEqual(null);
  });

  test('Delete At pos', () => {
    let scll = new SinglyCircularLinkedList();

    scll.insertAtLast(1);
    scll.insertAtLast(2);
    scll.insertAtLast(3);
    scll.deleteAtPos(1);

    let node1 = new Node(1);
    let node2 = new Node(3);
    node1.next = node2;
    node2.next = node1;

    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node2);

    scll.deleteAtPos(1);
    node1.next = node1;
    expect(scll.head).toEqual(node1);
    expect(scll.tail).toEqual(node1);
  });
});
