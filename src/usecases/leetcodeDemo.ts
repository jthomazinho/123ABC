// LeetCode Examples Demo
// This file demonstrates how to use the LeetCode examples module

import { LeetCodeExamples, ListNode, TreeNode } from './leetcodeExamples';

export function demonstrateLeetCodeExamples() {
  console.log('🧮 LeetCode Examples Demonstration\n');

  // Example 1: Two Sum
  console.log('1. Two Sum Example:');
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = LeetCodeExamples.twoSum(nums, target);
  console.log(`   Input: nums = [${nums}], target = ${target}`);
  console.log(`   Output: [${result}]\n`);

  // Example 2: Valid Parentheses
  console.log('2. Valid Parentheses Example:');
  const parentheses = "()[]{}";
  const isValid = LeetCodeExamples.isValidParentheses(parentheses);
  console.log(`   Input: "${parentheses}"`);
  console.log(`   Output: ${isValid}\n`);

  // Example 3: Maximum Subarray
  console.log('3. Maximum Subarray Example:');
  const subarrayNums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const maxSum = LeetCodeExamples.maxSubArray(subarrayNums);
  console.log(`   Input: [${subarrayNums}]`);
  console.log(`   Output: ${maxSum}\n`);

  // Example 4: Binary Search
  console.log('4. Binary Search Example:');
  const sortedNums = [1, 3, 5, 7, 9, 11, 13, 15];
  const searchTarget = 7;
  const searchIndex = LeetCodeExamples.binarySearch(sortedNums, searchTarget);
  console.log(`   Input: nums = [${sortedNums}], target = ${searchTarget}`);
  console.log(`   Output: ${searchIndex}\n`);

  // Example 5: Longest Substring Without Repeating Characters
  console.log('5. Longest Substring Without Repeating Characters Example:');
  const substring = "abcabcbb";
  const maxLength = LeetCodeExamples.lengthOfLongestSubstring(substring);
  console.log(`   Input: "${substring}"`);
  console.log(`   Output: ${maxLength}\n`);

  // Example 6: Climbing Stairs
  console.log('6. Climbing Stairs Example:');
  const stairs = 5;
  const ways = LeetCodeExamples.climbStairs(stairs);
  console.log(`   Input: n = ${stairs}`);
  console.log(`   Output: ${ways}\n`);

  // Example 7: Merge Sort
  console.log('7. Merge Sort Example:');
  const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
  const sortedArray = LeetCodeExamples.mergeSort([...unsortedArray]);
  console.log(`   Input: [${unsortedArray}]`);
  console.log(`   Output: [${sortedArray}]\n`);

  // Example 8: Group Anagrams
  console.log('8. Group Anagrams Example:');
  const anagrams = ["eat", "tea", "tan", "ate", "nat", "bat"];
  const grouped = LeetCodeExamples.groupAnagrams(anagrams);
  console.log(`   Input: [${anagrams.map(s => `"${s}"`)}]`);
  console.log(`   Output: ${JSON.stringify(grouped)}\n`);

  // Example 9: Min Stack
  console.log('9. Min Stack Example:');
  const minStack = LeetCodeExamples.createMinStack();
  minStack.push(3);
  minStack.push(5);
  minStack.push(2);
  minStack.push(1);
  console.log(`   Stack operations: push(3), push(5), push(2), push(1)`);
  console.log(`   Current min: ${minStack.getMin()}`);
  console.log(`   Top element: ${minStack.top()}\n`);

  // Example 10: Fibonacci
  console.log('10. Fibonacci Example:');
  const fibNumber = 8;
  const fibResult = LeetCodeExamples.fib(fibNumber);
  console.log(`   Input: n = ${fibNumber}`);
  console.log(`   Output: ${fibResult}\n`);

  console.log('✅ All LeetCode examples demonstrated successfully!');
}

// Run demonstration if this file is executed directly
if (require.main === module) {
  demonstrateLeetCodeExamples();
} 