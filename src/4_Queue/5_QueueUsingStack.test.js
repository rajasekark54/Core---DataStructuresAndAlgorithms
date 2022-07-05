/*
Implementing Queue using stack
  Queue - FIFI
  Stack - FILO, in stack we can't dequeue the first item directly. So here we are going to maintain two stacks. 
        stack 1 for push operation 
        stack 2 for deque 
        stack 2 - we copy data from stack1 and deque it. once dequeue done then we will move the stack 2 to stack 1 
  
  Queue using stack - we need two 
*/

class QueueStack {
  constructor(size) {
      this.stack1 = [];
      this.stack2 = [];
      this.top1 = -1;
      this.top2 = -1;
      this.size = size;
  }

  enqueue(val) {
      if (this.top1 >= this.size) {
          console.log('Over flow');
      } else {
          this.push1(val);
      }
  }

  dequeue() {
      if (this.top1 === -1) {
          console.log('Empty queue');
      } else {
          this.stack2 = [];
          for (let i = this.top1; i >= 0; i--) {
              this.stack2.push(this.pop1());
              this.top2++;
          }

          this.stack1 = [];
          for (let i = this.top2 - 1; i >= 0; i--) {
              this.stack1.push(this.pop2());
              this.top1++;
          }
      }
  }

  display() {
      if (this.top1 === -1) {
          console.log('Empty queue');
      } else {
          for (let i = 0; i <= this.top1; i++) {
              console.log(this.stack1[i]);
          }
      }
  }

  push1(val) {
      this.top1++;
      this.stack1[this.top1] = val;
  }

  push2(val) {
      this.top2++;
      this.stack2[this.top2] = val;
  }

  pop1() {
      return this.stack1[this.top1--];
  }

  pop2() {
      return this.stack2[--this.top2];
  }

  printResultData() {
      console.log(this.top1, JSON.stringify(this.stack1), this.top2, JSON.stringify(this.stack2));
  }
}

let queueStack = new QueueStack(5);
queueStack.enqueue(2);
queueStack.enqueue(1);
queueStack.enqueue(-1);
queueStack.printResultData();
queueStack.dequeue();
queueStack.printResultData();
queueStack.display();
