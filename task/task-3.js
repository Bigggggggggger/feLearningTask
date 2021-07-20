/**
 * 题目：数组中第 K 大的元素
 */
function kthNum(arr, k) {
  const len = arr.length;
  if (k > len) {
    return -1;
  }
  let p = partition(arr, 0, len - 1);
  while (p + 1 !== k) {
    if (p + 1 > k) {
      p = partition(arr, 0, p - 1);
    } else {
      p = partition(arr, p + 1, len - 1);
    }
  }
  return arr[p];
}

/**
 * 思路：利用快速排序的分区思想
 * 每次选取数组最后一个数为 分区点 pivot
 * 遍历数组，将比pivot小的放左边，大的放右边
 * 此时数组被分为 arr[0, p - 1] | arr[p] | arr[p + 1, n - 1]
 * 如果此时 p + 1 = k， 则说明 arr[p] 就是我们需要求解的元素
 * 如果 k > p + 1 则说明 第 k 大元素出现在 arr[p + 1, n - 1] 区间，反之亦然
 * ----------------------
 * 第一次需要对大小为 n 的数组执行分区操作，需要遍历 n 个元素
 * 第二次只需要对大小为 n/2 的数组执行分区操作，需要遍历 n/2 个元素
 * 以此类推直到区间缩小为 1
 * 总共需要 n + n/2 + n/4 + n/8 + ... + 1 = 2n -1
 * 故时间复杂度为O(n)
 */
function partition(arr, start, end) {
  let i = start;
  let pivot = arr[end];
  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i += 1;
    }
  }
  swap(arr, i, end);
  return i;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

const testArr = [3, 7, 9, 5, 6, 2];
const k = 4;
console.log(kthNum(testArr, k)); // 6
