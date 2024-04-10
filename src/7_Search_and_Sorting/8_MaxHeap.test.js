class MaxHeap {
  build(list) {
    let n = list.length;
    let parent = Math.floor(n / 2 - 1);

    for (let i = parent; i >= 0; i--) {
      this.heapify(list, i, n - 1);
    }

    return list;
  }

  heapify(array, parent, n) {
    let left = parent * 2 + 1;
    let right = left + 1;
    let largest = parent;

    if (left && left <= n && array[left] > array[largest]) largest = left;
    if (right && right <= n && array[right] > array[largest]) largest = right;

    if (parent !== largest) {
      this.swap(array, parent, largest);
      this.heapify(array, largest, n);
    }
  }

  swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  delete(array) {
    let n = array.length - 1;

    while (n >= 0) {
      this.swap(array, 0, n);
      n--;
      this.heapify(array, 0, n);
    }
    return array;
  }

  insert(array, value) {
    array.push(value);
    let n = array.length - 1;
    let i = n;

    while (true) {
      let parent = Math.floor((i + 1) / 2 - 1);

      if (array[parent] < array[i]) {
        this.swap(array, parent, i);
        i = parent;
      } else {
        break;
      }
    }

    return array;
  }
}

describe('Max Heap', () => {
  let heap;

  beforeEach(() => {
    heap = new MaxHeap();
  });

  test('Build', () => {
    const array = [70, 50, 40, 45, 35, 39, 16, 10, 9, 60];
    let expected = [70, 60, 40, 45, 50, 39, 16, 10, 9, 35];

    let res = heap.build(array);
    expect(res).toEqual(expected);
    expect(res[0]).toEqual(70); // first value should be max
  });

  test('Insertion', () => {
    const array = [70, 50, 40, 45, 35, 39, 16, 10, 9];

    let expected = [70, 60, 40, 45, 50, 39, 16, 10, 9, 35];
    let res = heap.insert(array, 60);
    expect(res).toEqual(expected);
    expect(res[0]).toEqual(70); // first value should be max
    expect(heap.insert(array, 5)).toEqual([...expected, 5]);
  });

  test('Sort', () => {
    const array = [70, 50, 40, 45, 35, 39, 16, 10, 9, 60];

    let res = heap.build(array);
    let sorted = heap.delete(res);
    expect(sorted).toEqual([9, 10, 16, 35, 39, 40, 45, 50, 60, 70]);
  });
});
