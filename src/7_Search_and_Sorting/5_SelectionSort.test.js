/* 
selection sort 

Best case and worst case - o(n^2)
*/

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }

    if (min != i) {
      swap(arr, min, i);
    }
  }

  return arr;
}

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// const a = [7, 4, 10, 8, 3, 1];

describe('Selection Sort', () => {
  test('1', () => {
    expect(selectionSort([5, 4, 10, 1, 6, 2])).toEqual([1, 2, 4, 5, 6, 10]);
    expect(selectionSort([16, 14, 5, 6, 8])).toEqual([5, 6, 8, 14, 16]);
    expect(selectionSort([7, 4, 10, 8, 3, 1])).toEqual([1, 3, 4, 7, 8, 10]);
  });
});
