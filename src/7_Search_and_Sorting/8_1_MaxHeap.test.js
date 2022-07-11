class MaxHeap {
  // Down to top;
  // insertion always should be down to top and then heap it
  // complete tree, insertion should be left as possible
  insert(list, value) {
    list.push(value);
    let n = list.length - 1;
    let i = n;

    while (true) {
      let parent = Math.floor((i + 1) / 2 - 1);

      console.log(parent, i, list[parent] < list[i]);
      if (list[parent] < list[i]) {
        this.swap(list, parent, i);
        i = parent;
      } else {
        break;
      }
    }

    return list;
  }

  // We can't delete any specific node on here
  // Deletion should be root node.
  // top to down
  deletion(list) {
    let n = list.length - 1;
    this.swap(list, 0, n);
    n--;

    this.heapify(list, 0, n);
    return list;
  }

  heapify(list, parent, n) {
    let left = parent * 2 + 1;
    let right = left + 1;
    let largest = parent;

    // console.log('=>', parent, left, right);
    if (left && left <= n && list[largest] < list[left]) {
      largest = left;
    }

    if (right && right <= n && list[largest] < list[right]) {
      largest = right;
    }

    if (largest !== parent) {
      this.swap(list, largest, parent);
      this.heapify(list, largest, n);
    }
  }

  // will sorted array deleting one by
  sort(list) {
    let n = list.length - 1;

    while (n > 1) {
      this.swap(list, 0, n);
      n--;
      this.heapify(list, 0, n);
      console.log(list);
    }

    return list;
  }

  swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

describe('Max Heap', () => {
  let mh;

  beforeEach(() => {
    mh = new MaxHeap();
  });

  test('Insertion', () => {
    const array = [70, 50, 40, 45, 35, 39, 16, 10, 9];

    let expected = [70, 60, 40, 45, 50, 39, 16, 10, 9, 35];
    let res = mh.insert(array, 60);
    expect(res).toEqual(expected);
    expect(res[0]).toEqual(70); // first value should be max
    expect(mh.insert(array, 5)).toEqual([...expected, 5]);
  });

  test('Sort', () => {
    let arr = [70, 60, 40, 45, 50, 39, 16, 10, 9, 35, 5];
    let res = mh.sort(arr);

    console.log(res);
    expect(res).toEqual([9, 5, 10, 16, 35, 39, 40, 45, 50, 60, 70]);
  });
});
