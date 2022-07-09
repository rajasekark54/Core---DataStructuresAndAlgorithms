class Queue {
  constructor(size) {
    this.size = size;
    this.list = [];
    this.front = -1;
    this.rear = -1;
  }

  enqueue(val) {
    if (this.rear >= this.size - 1) {
      return 'Overflow';
    } else if (this.front === -1 && this.rear === -1) {
      this.front = 0;
      this.rear = 0;
      this.list[this.rear] = val;
    } else {
      this.rear++;
      this.list[this.rear] = val;
    }
  }

  dequeue() {
    if (this.front === -1) {
      return 'Empty List';
    } else if (this.front === this.rear) {
      this.front = this.rear = -1;
    } else {
      this.front++;
    }
  }

  peek() {
    if (this.front === -1) {
      return 'Empty List';
    } else {
      return this.list[this.front];
    }
  }
}

describe('Queue', () => {
  test('enqueue', () => {
    let que = new Queue(3);

    que.enqueue(1);

    expect(que.list).toEqual([1]);
    expect(que.front).toEqual(0);
    expect(que.rear).toEqual(0);

    que.enqueue(2);
    que.enqueue(3);
    expect(que.list).toEqual([1, 2, 3]);
    expect(que.front).toEqual(0);
    expect(que.rear).toEqual(2);

    let res = que.enqueue(3);
    expect(res).toEqual('Overflow');
  });

  test('dequeue', () => {
    let que = new Queue(3);

    expect(que.dequeue()).toEqual('Empty List');
    que.enqueue(1);
    que.enqueue(2);
    expect(que.front).toEqual(0);
    expect(que.rear).toEqual(1);

    que.dequeue();
    expect(que.front).toEqual(1);
    expect(que.rear).toEqual(1);

    que.dequeue();
    expect(que.front).toEqual(-1);
    expect(que.rear).toEqual(-1);
  });

  test('peek', () => {
    let que = new Queue(3);

    que.enqueue(1);
    que.enqueue(2);
    expect(que.peek()).toEqual(1);
  });
});
