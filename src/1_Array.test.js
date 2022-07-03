class Array {
  constructor() {
    this.list = [];
  }

  insertAtFirst(val) {
    for (let i = this.list.length; i > 0; i--) {
      this.list[i] = this.list[i - 1];
    }
    this.list[0] = val;
  }

  insertAtLast(val) {
    this.list[this.list.length] = val;
  }

  insertAtMiddle(val, pos) {
    if (pos === 0) {
      return this.insertAtFirst(val);
    }

    for (let i = this.list.length; i >= pos; i--) {
      this.list[i] = this.list[i - 1];
    }

    this.list[pos] = val;
  }

  deleteAtFirst() {
    let arr = [];

    for (let i = 1; i < this.list.length; i++) {
      arr[i - 1] = this.list[i];
    }

    this.list = arr;
  }

  deleteAtLast() {
    let arr = [];

    for (let i = 0; i < this.list.length - 1; i++) {
      arr[i] = this.list[i];
    }

    this.list = arr;
  }

  deleteAtPos(pos) {
    let arr = [];

    for (let i = 0; i < this.list.length; i++) {
      if (i === pos) {
        continue;
      }
      arr.push(this.list[i]);
    }
    this.list = arr;
  }

  traversal() {
    for (let i = 0; i < this.list.length; i++) {
      console.log(this.list[i]);
    }
  }
}

describe("Array", () => {
  let arr = new Array();

  test.only("insert at first", () => {
    arr.insertAtFirst(3);
    arr.insertAtFirst(2);
    arr.insertAtFirst(1);

    expect(arr.list).toEqual([1, 2, 3]);
  });

  test.only("insert at last", () => {
    arr.insertAtLast(4);

    expect(arr.list).toEqual([1, 2, 3, 4]);
  });

  test.only("insert at position", () => {
    arr.insertAtMiddle(3.5, 3);
    expect(arr.list).toEqual([1, 2, 3, 3.5, 4]);
  });

  test.only("delete at first", () => {
    arr.deleteAtFirst();
    expect(arr.list).toEqual([2, 3, 3.5, 4]);
  });

  test.only("delete at last", () => {
    arr.deleteAtLast();
    console.log(arr.list);
    expect(arr.list).toEqual([2, 3, 3.5]);
  });

  test.only("delete at position", () => {
    arr.deleteAtPos(1);
    console.log(arr.list);
    expect(arr.list).toEqual([2, 3.5]);
  });
});
