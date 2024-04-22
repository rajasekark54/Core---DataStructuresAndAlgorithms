/* 
  quick sort 

  Best and avg case - o(nlogn) [this is far better than bubble, insertion, selection sort algorithm] 
  worst case - o(n^2)
  */

class QuickSort {
  constructor() {}

  sort(list, lb, ub) {
    if (lb < ub) {
      let loc = this.partition(list, lb, ub);
      this.sort(list, lb, loc - 1);
      this.sort(list, loc + 1, ub);
    }

    return list;
  }

  partition(list, lb, ub) {
    let pivot = list[lb];
    let start = lb;
    let end = ub;

    while (start < end) {
      while (list[start] <= pivot) {
        start++;
      }

      while (list[end] > pivot) {
        end--;
      }

      if (start < end) {
        this.swap(list, start, end);
      }
    }

    this.swap(list, lb, end);
    return end;
  }

  swap(a, s, e) {
    const tmp = a[e];
    a[e] = a[s];
    a[s] = tmp;
  }
}

describe('Quick Sort', () => {
  test('1', () => {
    let qs = new QuickSort();
    const array1 = [5, 4, 10, 1, 6, 2];
    expect(qs.sort(array1, 0, array1.length - 1)).toEqual([1, 2, 4, 5, 6, 10]);

    const array2 = [16, 14, 5, 6, 8];
    expect(qs.sort(array2, 0, array2.length - 1)).toEqual([5, 6, 8, 14, 16]);

    const array3 = [7, 4, 10, 8, 3, 1];
    expect(qs.sort(array3, 0, array3.length - 1)).toEqual([1, 3, 4, 7, 8, 10]);

    const array4 = [7, 6, 10, 5, 9, 2, 1, 15, 7];
    expect(qs.sort(array4, 0, array4.length - 1)).toEqual([
      1, 2, 5, 6, 7, 7, 9, 10, 15,
    ]);
  });
});
