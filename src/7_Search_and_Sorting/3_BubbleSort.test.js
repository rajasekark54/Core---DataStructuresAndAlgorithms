/* 
Bubble sort 

Best case - o(n) [if it is sorted on 1st iterations]
   - one iteration on outer for loop o(1)
   - (n-1) iteration on inner for loop 
   - overall o(n) 
worst case - o(n^2) [if we are sorting it from asc to desc]
   - one iteration on outer for loop (n-1)
   - iteration on inner for loop (n-1)
   - overall (n-1) * (n-1) = o(n^2) (polynomial)

*/

function bubbleSort(list) {
  let n = list.length;
  let isArrSorted;

  for (let i = 0; i < n - 1; i++) {
    isArrSorted = true;
    for (let j = 0; j < n - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1);
        isArrSorted = false;
      }
    }

    if (isArrSorted) {
      break;
    }
  }
  return list;
}

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
const array = [15, 16, 6, 8, 5];

describe('Bubble Sort', () => {
  test('1', () => {
    expect(bubbleSort([15, 16, 6, 8, 5])).toEqual([5, 6, 8, 15, 16]);
    expect(bubbleSort([16, 14, 5, 6, 8])).toEqual([5, 6, 8, 14, 16]);
  });
});
