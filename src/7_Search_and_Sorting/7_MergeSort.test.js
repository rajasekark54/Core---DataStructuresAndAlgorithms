/* 
merge sort 

Best and worst case - n(nlogn) 
*/

class MergeSort {
  constructor() {}

  mergeSort(list, lb, ub) {
    if (lb < ub) {
      let mid = Math.floor((lb + ub) / 2);
      this.mergeSort(list, lb, mid);
      this.mergeSort(list, mid + 1, ub);
      this.merge(list, lb, mid, ub);
    }
    return list;
  }

  merge(array, lb, mid, ub) {
    let result = [];
    let left = lb;
    let right = mid + 1;

    while (left <= mid && right <= ub) {
      if (array[left] < array[right]) {
        result.push(array[left]);
        left++;
      } else {
        result.push(array[right]);
        right++;
      }
    }

    while (left <= mid) {
      result.push(array[left]);
      left++;
    }

    while (right <= ub) {
      result.push(array[right]);
      right++;
    }

    for (const val of result) {
      array[lb] = val;
      lb++;
    }
  }
}

describe('Merge Sort', () => {
  test('1', () => {
    let ms = new MergeSort();

    let array = [15, 5, 24, 8, 1, 3, 16, 10, 20];
    let n = array.length - 1;

    let res = ms.mergeSort(array, 0, n);

    expect(ms.mergeSort(array, 0, n)).toEqual([1, 3, 5, 8, 10, 15, 16, 20, 24]);
    expect(ms.mergeSort([15, 5, 24], 0, 2)).toEqual([5, 15, 24]);
    expect(ms.mergeSort([15, 5], 0, 1)).toEqual([5, 15]);
  });
});
