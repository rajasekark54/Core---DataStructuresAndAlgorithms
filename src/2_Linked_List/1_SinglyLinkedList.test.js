/* ----------------Linked List--------------------- */
/*
  Operation of Linked List
  1.singly linked list
     Insertion - O(1)
     InsertAtPos = O(i)
     Deletion - O(n) [using tail node, It would be O(1)]
     DeleteAtPos = O(i)
     Traversal - O(n)
  2.doubly linked list
  3.singly circular linked list
  4.doubly circular linked list
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtFirst(val) {
    const node = new Node(val);

    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
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

    current.next = node;
  }

  insertAtPos(val, pos = 0) {
    if (pos === 0) {
      this.insertAtFirst(val);
      return;
    }

    let current = this.head;
    let previous;
    let count = 0;

    while (current && count < pos) {
      previous = current;
      current = current.next;
      count++;
    }

    let node = new Node(val);
    previous.next = node;
    node.next = current;
  }

  deleteAtFirst() {
    this.head = this.head ? this.head.next : null;
  }

  deleteAtLast() {
    let current = this.head;
    if (!current?.next) {
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

  deleteAtPos(pos = 0) {
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

    previous.next = current?.next;
  }
}

describe('Singly Linked List', () => {
  test('Insert At First', () => {
    let sll = new SinglyLinkedList();
    sll.insertAtFirst(3);
    sll.insertAtFirst(2);
    sll.insertAtFirst(1);

    let obj = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: null,
        },
      },
    };
    expect(sll.head).toEqual(obj);
  });

  test('Insert At Last', () => {
    let sll = new SinglyLinkedList();

    sll.insertAtLast(1);
    sll.insertAtLast(2);
    sll.insertAtLast(3);

    let obj = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: null,
        },
      },
    };
    expect(sll.head).toEqual(obj);
  });

  test('Insert At Pos', () => {
    let sll = new SinglyLinkedList();
    //[1, 2, 3, 4]

    sll.insertAtPos(1, 0);
    let obj = {
      val: 1,
      next: null,
    };
    expect(sll.head).toEqual(obj);

    sll.insertAtPos(3, 1);
    obj = {
      val: 1,
      next: {
        val: 3,
        next: null,
      },
    };
    expect(sll.head).toEqual(obj);

    sll.insertAtPos(2, 1);
    obj = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: null,
        },
      },
    };
    expect(sll.head).toEqual(obj);

    sll.insertAtPos(4, 10);
    obj = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: {
            val: 4,
            next: null,
          },
        },
      },
    };
    expect(sll.head).toEqual(obj);
  });

  test('Delete At First', () => {
    let sll = new SinglyLinkedList();
    sll.insertAtLast(1);
    sll.insertAtLast(2);
    sll.insertAtLast(3);
    sll.deleteAtFirst();

    let obj = {
      val: 2,
      next: {
        val: 3,
        next: null,
      },
    };
    expect(sll.head).toEqual(obj);
  });

  test('Delete At Last', () => {
    let sll = new SinglyLinkedList();
    sll.insertAtLast(1);
    sll.deleteAtLast();

    let obj = null;
    expect(sll.head).toEqual(obj);

    sll.insertAtLast(1);
    sll.insertAtLast(2);
    sll.insertAtLast(3);
    sll.deleteAtLast();

    obj = {
      val: 1,
      next: {
        val: 2,
        next: null,
      },
    };
    expect(sll.head).toEqual(obj);
  });

  test('Delete At Pos', () => {
    let sll = new SinglyLinkedList();
    sll.insertAtLast(1);
    sll.deleteAtPos(0);

    let obj = null;
    expect(sll.head).toEqual(obj);

    sll.insertAtLast(1);
    sll.insertAtLast(2);
    sll.deleteAtPos(1);

    obj = {
      val: 1,
      next: null,
    };
    expect(sll.head).toEqual(obj);

    sll.insertAtLast(2);
    sll.insertAtLast(3);
    sll.insertAtLast(4);
    sll.deleteAtPos(2);

    obj = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 4,
          next: null,
        },
      },
    };
    expect(sll.head).toEqual(obj);
  });
});
