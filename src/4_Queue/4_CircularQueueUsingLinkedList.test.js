class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    let node = new Node(value);
    if (this.rear === 0 && this.front === 0) {
      this.front = this.rear = node;
      this.rear.next = this.front;
    } else {
      this.rear.next = node;
      this.rear = node;
      this.rear.next = this.front;
    }
  }

  dequeue() {
    if (this.rear === 0 && this.front === 0) {
      console.log('Queue is empty');
    } else if (this.rear === this.front) {
      this.rear = this.front = 0;
    } else {
      this.front = this.front.next;
      this.rear.next = this.front;
    }
  }

  printDataResult() {
    console.log(this.front);
    console.log(this.rear);
  }

  display() {
    if (this.rear === 0 && this.front === 0) {
      console.log('Queue is empty');
    } else {
      let temp = this.front;

      while (temp.next !== this.front) {
        console.log(temp.value);
        temp = temp.next;
      }
      console.log(temp.value);
    }
  }

  peek() {
    if (this.rear === 0 && this.front === 0) {
      console.log('Queue is empty');
    } else {
      console.log('peek', this.front.value);
    }
  }
}

let list = new CircularLinkedList();
list.enqueue(1);
list.enqueue(2);
list.enqueue(3);
list.printDataResult();
list.dequeue();
list.printDataResult();
list.display();
list.peek();
