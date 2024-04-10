class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  front() {
    if (this.isEmpty()) {
      return 'No elements in Queue';
    }
    return this.items[0];
  }

  printQueue() {
    let str = '';
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i].element + ' ';
    }
    return str;
  }
}

describe('Priority Queue', () => {
  let priorityQueue;

  beforeEach(() => {
    priorityQueue = new PriorityQueue();
  });

  test('Priority queue order', () => {
    priorityQueue.enqueue('Task 1', 2);
    priorityQueue.enqueue('Task 2', 1);
    priorityQueue.enqueue('Task 3', 3);
    priorityQueue.enqueue('Task 4', 2);

    const expected = [
      { element: 'Task 2', priority: 1 },
      { element: 'Task 1', priority: 2 },
      { element: 'Task 4', priority: 2 },
      { element: 'Task 3', priority: 3 },
    ];
    expect(priorityQueue.items).toEqual(expected);

    priorityQueue.dequeue();

    const remining = expected.slice(1);
    expect(priorityQueue.items).toEqual(remining);
  });
});
