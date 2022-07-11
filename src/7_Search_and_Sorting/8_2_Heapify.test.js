class Heapify {
  constructor() {}

  build(list) {
    let n = list.length;
    let parent = Math.floor(n / 2 - 1);

    for (let i = parent; i >= 0; i--) {
      this.heapify(list, i, n - 1);
    }

    return list;
  }

  delete(list) {
    let n = list.length - 1;

    while (n > 0) {
      this.swap(list, 0, n);
      n--;
      this.heapify(list, 0, n);
      console.log(list);
    }

    return list;
  }

  heapify(list, parent, n) {
    let left = parent * 2 + 1;
    let right = left + 1;
    let largest = parent;

    if (left && left <= n && list[largest] < list[left]) {
      largest = left;
    }

    if (right && right <= n && list[largest] < list[right]) {
      largest = right;
    }

    if (largest !== parent) {
      this.swap(list, parent, largest);
      this.heapify(list, largest, n);
    }
  }

  swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

describe('Max Heap', () => {
  let heap;

  beforeEach(() => {
    heap = new Heapify();
  });

  test('Build', () => {
    const array = [70, 50, 40, 45, 35, 39, 16, 10, 9, 60];
    let expected = [70, 60, 40, 45, 50, 39, 16, 10, 9, 35];

    let res = heap.build(array);
    expect(res).toEqual(expected);
    expect(res[0]).toEqual(70); // first value should be max
  });

  test('Sort', () => {
    const array = [70, 50, 40, 45, 35, 39, 16, 10, 9, 60];

    let res = heap.build(array);
    let sorted = heap.delete(res);
    expect(sorted).toEqual([9, 10, 16, 35, 39, 40, 45, 50, 60, 70]);
  });
});
