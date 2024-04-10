/* 
shell sort
Time complexity, worst case o(n^2). It might be vary in best case. 
*/

class ShellSort {
  sort(a) {
    let n = a.length;
    let gap = Math.floor(n / 2);
    while (gap >= 1) {
      for (let j = gap; j < n; j++) {
        for (let i = j - gap; i >= 0; i - gap) {
          if (a[i] < a[i + gap]) {
            break;
          } else {
            this.swap(a, i, i + gap);
          }
        }
      }
      gap /= 2;
    }
    return a;
  }
  swap(a, i, j) {
    const tmp = a[j];
    a[j] = a[i];
    a[i] = tmp;
  }
}

describe('Max Heap', () => {
  let shellSort;

  beforeEach(() => {
    shellSort = new ShellSort();
  });

  test('sort', () => {
    const array = [2, 7, 9, 5, 23, 29, 15, 19, 31];
    let expected = [2, 5, 7, 9, 15, 19, 23, 29, 31];

    let res = shellSort.sort(array);
    expect(res).toEqual(expected);
  });
});
