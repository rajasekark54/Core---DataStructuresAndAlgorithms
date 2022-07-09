class Stack {
  constructor(size) {
    this.list = [];
    this.size = size;
    this.top = -1;
  }

  push(val) {
    if (this.top < this.size - 1) {
      this.list[++this.top] = val;
    } else {
      return 'Overflow';
    }
  }

  pop() {
    if (this.top < 0) {
      return 'Underflow';
    }

    return this.list[--this.top];
  }

  peek() {
    return this.top < 0 ? 'Empty List' : this.list[0];
  }

  traversal() {
    for (let i = 0; i <= this.top; i++) {
      console.log(this.list[i]);
    }
  }
}

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack(2);
  });

  test('push', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.list).toEqual([1, 2]);
    expect(stack.top).toEqual(1);

    expect(stack.push(3)).toEqual('Overflow');
  });

  test('pop', () => {
    stack.push(1);
    stack.pop();

    expect(stack.top).toEqual(-1);
    expect(stack.pop()).toEqual('Underflow');
  });

  test('peek', () => {
    expect(stack.peek()).toEqual('Empty List');

    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toEqual(1);
  });

  test('traversal', () => {
    stack.push(1);
    stack.push(2);
    stack.traversal();
  });
});
