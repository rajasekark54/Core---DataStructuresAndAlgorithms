/*
We have to take care. Queue data structure, the insertion and deletion should be o(1)
*/

class QueueNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// by default it is singly linked list
class QueueUsingLinkedList {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(value) {
    let node = new QueueNode(value);

    if (this.front === null) {
      this.front = this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
  }

  dequeue() {
    if (this.front === this.rear) {
      this.front = this.rear = null;
    } else {
      this.front = this.front.next;
    }
  }

  peek() {
    if (this.front != null) {
      console.log("peek =>", this.front.data);
      return this.front.data;
    }
  }

  display() {
    let tmp = this.front;
    while (tmp != null) {
      console.log("Display ==>", tmp.data);
      tmp = tmp.next;
    }
  }
}

// let ll = new LinkedList();
// ll.enqueue(1);
// ll.enqueue(2);
// ll.enqueue(3);
// ll.enqueue(4);
// ll.enqueue(5);
// ll.peek();
// ll.dequeue();
// ll.dequeue();
// // ll.dequeue();
// // ll.dequeue();
// // ll.dequeue();
// ll.display();
