/* 
Binary Search

Best case - o(1) [search value wouble be at middle]
Avg case and worst case - o(logn)  [it is far better than o(n)]

it is better then linear search

the list should be ordered

Note: this case array should be sorted 
*/

function binarySearch(arr, data) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === data) {
      return `Element found at index ${mid}`;
    } else if (arr[mid] > data) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return 'Not found';
}

const array = [5, 9, 17, 23, 25, 45, 59, 63, 71, 89];

describe('Binary Search', () => {
  test('1', () => {
    expect(binarySearch(array, 25)).toEqual('Element found at index 4');
    expect(binarySearch(array, 63)).toEqual('Element found at index 7');
    expect(binarySearch(array, 5)).toEqual('Element found at index 0');
    expect(binarySearch(array, 89)).toEqual('Element found at index 9');
    expect(binarySearch(array, 100)).toEqual('Not found');
  });
});
