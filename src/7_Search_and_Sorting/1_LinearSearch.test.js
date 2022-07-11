/* 
Linear Search

Best case - o(n) [search value wouble be at first position]
Avg case - o(logn) [search value wouble be around midle]
worst case - o((n+1)/2) [suppose search value at last index, We need iterate all or n times ]
   => summetion of all cases / no.of cases
       1 + 2 + 3 + ......n                 n(n+1)      n+1
    =  ------------------- = formula =>    ------ =>  -----
               n                             2n         2
*/

function linearSearch(arr, val) {
  for (const key in arr) {
    if (arr[key] === val) {
      return `Element found index at ${key}`;
    }
  }

  return 'Not Found';
}

const array = [15, 5, 20, 35, 2, 42, 67, 17];

describe('Linear Search', () => {
  test('1', () => {
    expect(linearSearch(array, 5)).toEqual('Element found index at 1');
    expect(linearSearch(array, 67)).toEqual('Element found index at 6');
    expect(linearSearch(array, 100)).toEqual('Not Found');
  });
});
