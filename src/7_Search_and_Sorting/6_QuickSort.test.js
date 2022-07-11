/* 
  quick sort 

  Best and avg case - o(nlogn) [this is far better than bubble, insertion, selection sort algorithm] 
  worst case - o(n^2)
  */

class QuickSort {
  constructor() {}

  sort(list, lb, ub) {
    if (!lb && !ub) {
      lb = 0;
      ub = list.length - 1;
    }

    if (lb < ub) {
      let loc = this.partition(list, lb, ub);
      this.sort(list, lb, loc - 1);
      this.sort(list, loc + 1, ub);
    }

    // console.log('res --->', list);
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

const array = [7, 6, 10, 5, 9, 2, 1, 15, 7];

let qs = new QuickSort();
qs.sort(array);

describe('Quick Sort', () => {
  test('1', () => {
    let qs = new QuickSort();
    expect(qs.sort([5, 4, 10, 1, 6, 2])).toEqual([1, 2, 4, 5, 6, 10]);
    expect(qs.sort([16, 14, 5, 6, 8])).toEqual([5, 6, 8, 14, 16]);
    expect(qs.sort([7, 4, 10, 8, 3, 1])).toEqual([1, 3, 4, 7, 8, 10]);
    expect(qs.sort([7, 6, 10, 5, 9, 2, 1, 15, 7])).toEqual([
      1, 2, 5, 6, 7, 7, 9, 10, 15,
    ]);
  });
});
