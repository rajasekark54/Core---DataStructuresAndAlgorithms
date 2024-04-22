class CircularQueue {
  constructor(size) {
    this.list = [];
    this.size = size;
    this.front = -1;
    this.rear = -1;
  }

  nextIndex(prop) {
    return (prop + 1) % this.size;
  }

  enqueue(val) {
    let nextIndex = this.nextIndex(this.rear);

    if (nextIndex === this.front) {
      return 'Overflow';
    } else if (this.front === -1 && this.rear === -1) {
      this.front = this.rear = 0;
      this.list[this.rear] = val;
    } else {
      this.rear = nextIndex;
      this.list[this.rear] = val;
    }
  }

  dequeue() {
    if (this.front === -1 && this.rear === -1) {
      return 'Underflow';
    } else if (this.front === this.rear) {
      this.front = this.rear = -1;
    } else {
      this.front = this.nextIndex(this.front);
    }
  }

  traversal() {
    if (this.front === -1 && this.rear === -1) {
      console.log('Empty List');
    } else {
      let i = this.front;
      while (i != this.rear) {
        console.log(this.list[i]);
        i = this.nextIndex(i);
      }
    }
  }
}

describe('Circular Queue', () => {
  let que;

  beforeEach(() => {
    que = new CircularQueue(3);
  });

  test('Enqueue', () => {
    que.enqueue(1);
    que.enqueue(2);
    que.enqueue(3);

    expect(que.front).toEqual(0);
    expect(que.rear).toEqual(que.size - 1);
  });

  test('Dequeue', () => {
    que.enqueue(1);
    que.enqueue(2);
    que.enqueue(3);
    que.dequeue();

    expect(que.front).toEqual(1);
    expect(que.rear).toEqual(que.size - 1);

    que.enqueue(4);
    expect(que.front).toEqual(1);
    expect(que.rear).toEqual(0);

    que.dequeue();
    que.dequeue();
    expect(que.front).toEqual(0);
    expect(que.rear).toEqual(0);
    que.dequeue();
    expect(que.front).toEqual(-1);
    expect(que.rear).toEqual(-1);
    expect(que.dequeue()).toEqual('Underflow');
  });

  test('Traversal', () => {
    que.enqueue(1);
    que.enqueue(2);
    que.enqueue(3);
    que.dequeue();
    que.enqueue(4);

    que.traversal();
  });
});
