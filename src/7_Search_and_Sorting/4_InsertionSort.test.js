/* 
insertion sort 

Best case - o(n) [if array already sorted]
worst case - o(n^2) [the given array is desc, then converting it to asc order ]
*/

function insertionSort(list) {
  for (let i = 1; i < list.length; i++) {
    let tmp = list[i];
    let j = i - 1;

    while (j >= 0 && list[j] > tmp) {
      list[j + 1] = list[j];
      j--;
    }

    list[j + 1] = tmp;
  }

  return list;
}

describe('Insertion Sort', () => {
  test('1', () => {
    expect(insertionSort([5, 4, 10, 1, 6, 2])).toEqual([1, 2, 4, 5, 6, 10]);
    expect(insertionSort([16, 14, 5, 6, 8])).toEqual([5, 6, 8, 14, 16]);
  });
});
