"use strict";
// LeetCode Examples Module
// This module contains 25 main LeetCode problems organized by categories
// For future reference and learning purposes
Object.defineProperty(exports, "__esModule", { value: true });
exports.dijkstra = exports.quickSort = exports.createLRUCache = exports.hammingWeight = exports.fib = exports.createMinStack = exports.groupAnagrams = exports.mergeSort = exports.longestCommonPrefix = exports.reverse = exports.canJump = exports.subsets = exports.lengthOfLongestSubstring = exports.binarySearch = exports.topKFrequent = exports.numIslands = exports.maxProfit = exports.climbStairs = exports.isValidBST = exports.maxDepth = exports.mergeTwoLists = exports.reverseList = exports.maxSubArray = exports.isValidParentheses = exports.twoSum = exports.TreeNode = exports.ListNode = exports.LeetCodeExamples = void 0;
class LeetCodeExamples {
    // ===== ARRAYS & STRINGS =====
    /**
     * 1. Two Sum
     * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
     */
    static twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) {
                return [map.get(complement), i];
            }
            map.set(nums[i], i);
        }
        return [];
    }
    /**
     * 2. Valid Parentheses
     * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
     */
    static isValidParentheses(s) {
        const stack = [];
        const pairs = {
            ')': '(',
            '}': '{',
            ']': '['
        };
        for (const char of s) {
            if (char in pairs) {
                if (stack.pop() !== pairs[char])
                    return false;
            }
            else {
                stack.push(char);
            }
        }
        return stack.length === 0;
    }
    /**
     * 3. Maximum Subarray
     * Given an integer array nums, find the subarray with the largest sum, and return its sum.
     */
    static maxSubArray(nums) {
        let maxSum = nums[0];
        let currentSum = nums[0];
        for (let i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
    // ===== LINKED LISTS =====
    /**
     * 4. Reverse Linked List
     * Given the head of a singly linked list, reverse the list, and return the reversed list.
     */
    static reverseList(head) {
        let prev = null;
        let current = head;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }
    /**
     * 5. Merge Two Sorted Lists
     * Merge two sorted linked lists and return it as a sorted list.
     */
    static mergeTwoLists(l1, l2) {
        const dummy = new ListNode(0);
        let current = dummy;
        while (l1 && l2) {
            if (l1.val < l2.val) {
                current.next = l1;
                l1 = l1.next;
            }
            else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        current.next = l1 || l2;
        return dummy.next;
    }
    // ===== TREES =====
    /**
     * 6. Maximum Depth of Binary Tree
     * Given the root of a binary tree, return its maximum depth.
     */
    static maxDepth(root) {
        if (!root)
            return 0;
        return Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) + 1;
    }
    /**
     * 7. Validate Binary Search Tree
     * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
     */
    static isValidBST(root) {
        return this.isValidBSTHelper(root, -Infinity, Infinity);
    }
    static isValidBSTHelper(node, min, max) {
        if (!node)
            return true;
        if (node.val <= min || node.val >= max)
            return false;
        return this.isValidBSTHelper(node.left, min, node.val) &&
            this.isValidBSTHelper(node.right, node.val, max);
    }
    // ===== DYNAMIC PROGRAMMING =====
    /**
     * 8. Climbing Stairs
     * You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.
     */
    static climbStairs(n) {
        if (n <= 2)
            return n;
        let prev = 1, curr = 2;
        for (let i = 3; i <= n; i++) {
            const temp = curr;
            curr = prev + curr;
            prev = temp;
        }
        return curr;
    }
    /**
     * 9. Best Time to Buy and Sell Stock
     * You are given an array prices where prices[i] is the price of a given stock on the ith day.
     */
    static maxProfit(prices) {
        let minPrice = Infinity;
        let maxProfit = 0;
        for (const price of prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
    // ===== GRAPHS =====
    /**
     * 10. Number of Islands
     * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
     */
    static numIslands(grid) {
        if (!grid || grid.length === 0)
            return 0;
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === '1') {
                    this.dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    static dfs(grid, row, col) {
        const rows = grid.length;
        const cols = grid[0].length;
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }
        grid[row][col] = '0';
        this.dfs(grid, row + 1, col);
        this.dfs(grid, row - 1, col);
        this.dfs(grid, row, col + 1);
        this.dfs(grid, row, col - 1);
    }
    // ===== HEAPS & PRIORITY QUEUES =====
    /**
     * 11. Top K Frequent Elements
     * Given an integer array nums and an integer k, return the k most frequent elements.
     */
    static topKFrequent(nums, k) {
        const frequency = new Map();
        for (const num of nums) {
            frequency.set(num, (frequency.get(num) || 0) + 1);
        }
        const sorted = Array.from(frequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(([num]) => num);
        return sorted;
    }
    // ===== BINARY SEARCH =====
    /**
     * 12. Binary Search
     * Given an array of integers nums which is sorted in ascending order, and an integer target.
     */
    static binarySearch(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target)
                return mid;
            if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return -1;
    }
    // ===== SLIDING WINDOW =====
    /**
     * 13. Longest Substring Without Repeating Characters
     * Given a string s, find the length of the longest substring without repeating characters.
     */
    static lengthOfLongestSubstring(s) {
        const seen = new Set();
        let left = 0;
        let maxLength = 0;
        for (let right = 0; right < s.length; right++) {
            while (seen.has(s[right])) {
                seen.delete(s[left]);
                left++;
            }
            seen.add(s[right]);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
    // ===== BACKTRACKING =====
    /**
     * 14. Subsets
     * Given an integer array nums of unique elements, return all possible subsets (the power set).
     */
    static subsets(nums) {
        const result = [];
        this.backtrack(nums, 0, [], result);
        return result;
    }
    static backtrack(nums, start, path, result) {
        result.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            this.backtrack(nums, i + 1, path, result);
            path.pop();
        }
    }
    // ===== GREEDY =====
    /**
     * 15. Jump Game
     * You are given an integer array nums. You are initially positioned at the array's first index.
     */
    static canJump(nums) {
        let maxReach = 0;
        for (let i = 0; i < nums.length; i++) {
            if (i > maxReach)
                return false;
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }
    // ===== MATH =====
    /**
     * 16. Reverse Integer
     * Given a signed 32-bit integer x, return x with its digits reversed.
     */
    static reverse(x) {
        let result = 0;
        const isNegative = x < 0;
        x = Math.abs(x);
        while (x > 0) {
            result = result * 10 + x % 10;
            x = Math.floor(x / 10);
        }
        if (result > 2 ** 31 - 1)
            return 0;
        return isNegative ? -result : result;
    }
    // ===== STRING MANIPULATION =====
    /**
     * 17. Longest Common Prefix
     * Write a function to find the longest common prefix string amongst an array of strings.
     */
    static longestCommonPrefix(strs) {
        if (strs.length === 0)
            return '';
        let prefix = strs[0];
        for (let i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (prefix === '')
                    return '';
            }
        }
        return prefix;
    }
    // ===== SORTING =====
    /**
     * 18. Merge Sort Implementation
     * Sort an array using merge sort algorithm.
     */
    static mergeSort(arr) {
        if (arr.length <= 1)
            return arr;
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));
        return this.merge(left, right);
    }
    static merge(left, right) {
        const result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            }
            else {
                result.push(right[j]);
                j++;
            }
        }
        return result.concat(left.slice(i), right.slice(j));
    }
    // ===== HASH TABLES =====
    /**
     * 19. Group Anagrams
     * Given an array of strings strs, group the anagrams together.
     */
    static groupAnagrams(strs) {
        const groups = new Map();
        for (const str of strs) {
            const sorted = str.split('').sort().join('');
            if (!groups.has(sorted)) {
                groups.set(sorted, []);
            }
            groups.get(sorted).push(str);
        }
        return Array.from(groups.values());
    }
    // ===== STACKS & QUEUES =====
    /**
     * 20. Min Stack
     * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
     */
    static createMinStack() {
        const stack = [];
        const minStack = [];
        return {
            push: (val) => {
                stack.push(val);
                if (minStack.length === 0 || val <= minStack[minStack.length - 1]) {
                    minStack.push(val);
                }
            },
            pop: () => {
                const val = stack.pop();
                if (val !== undefined && val === minStack[minStack.length - 1]) {
                    minStack.pop();
                }
                return val;
            },
            top: () => stack[stack.length - 1],
            getMin: () => minStack[minStack.length - 1]
        };
    }
    // ===== RECURSION =====
    /**
     * 21. Fibonacci Number
     * The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence.
     */
    static fib(n) {
        if (n <= 1)
            return n;
        return this.fib(n - 1) + this.fib(n - 2);
    }
    // ===== BIT MANIPULATION =====
    /**
     * 22. Number of 1 Bits
     * Write a function that takes an unsigned integer and returns the number of '1' bits it has.
     */
    static hammingWeight(n) {
        let count = 0;
        while (n !== 0) {
            count += n & 1;
            n = n >>> 1;
        }
        return count;
    }
    // ===== DESIGN PATTERNS =====
    /**
     * 23. LRU Cache
     * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
     */
    static createLRUCache(capacity) {
        const cache = new Map();
        return {
            get: (key) => {
                if (cache.has(key)) {
                    const value = cache.get(key);
                    cache.delete(key);
                    cache.set(key, value);
                    return value;
                }
                return -1;
            },
            put: (key, value) => {
                if (cache.has(key)) {
                    cache.delete(key);
                }
                else if (cache.size >= capacity) {
                    const firstKey = cache.keys().next().value;
                    if (firstKey !== undefined) {
                        cache.delete(firstKey);
                    }
                }
                cache.set(key, value);
            }
        };
    }
    // ===== ADVANCED ALGORITHMS =====
    /**
     * 24. Quick Sort Implementation
     * Sort an array using quick sort algorithm.
     */
    static quickSort(arr) {
        if (arr.length <= 1)
            return arr;
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
    }
    /**
     * 25. Dijkstra's Algorithm
     * Find shortest path in a weighted graph.
     */
    static dijkstra(graph, start) {
        const n = graph.length;
        const distances = new Array(n).fill(Infinity);
        const visited = new Array(n).fill(false);
        distances[start] = 0;
        for (let i = 0; i < n; i++) {
            let minDistance = Infinity;
            let minIndex = -1;
            for (let j = 0; j < n; j++) {
                if (!visited[j] && distances[j] < minDistance) {
                    minDistance = distances[j];
                    minIndex = j;
                }
            }
            if (minIndex === -1)
                break;
            visited[minIndex] = true;
            for (let j = 0; j < n; j++) {
                if (graph[minIndex][j] > 0 && distances[minIndex] + graph[minIndex][j] < distances[j]) {
                    distances[j] = distances[minIndex] + graph[minIndex][j];
                }
            }
        }
        return distances;
    }
}
exports.LeetCodeExamples = LeetCodeExamples;
// Helper classes for LeetCode problems
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}
exports.ListNode = ListNode;
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
exports.TreeNode = TreeNode;
// Export individual functions for easy access
exports.twoSum = LeetCodeExamples.twoSum, exports.isValidParentheses = LeetCodeExamples.isValidParentheses, exports.maxSubArray = LeetCodeExamples.maxSubArray, exports.reverseList = LeetCodeExamples.reverseList, exports.mergeTwoLists = LeetCodeExamples.mergeTwoLists, exports.maxDepth = LeetCodeExamples.maxDepth, exports.isValidBST = LeetCodeExamples.isValidBST, exports.climbStairs = LeetCodeExamples.climbStairs, exports.maxProfit = LeetCodeExamples.maxProfit, exports.numIslands = LeetCodeExamples.numIslands, exports.topKFrequent = LeetCodeExamples.topKFrequent, exports.binarySearch = LeetCodeExamples.binarySearch, exports.lengthOfLongestSubstring = LeetCodeExamples.lengthOfLongestSubstring, exports.subsets = LeetCodeExamples.subsets, exports.canJump = LeetCodeExamples.canJump, exports.reverse = LeetCodeExamples.reverse, exports.longestCommonPrefix = LeetCodeExamples.longestCommonPrefix, exports.mergeSort = LeetCodeExamples.mergeSort, exports.groupAnagrams = LeetCodeExamples.groupAnagrams, exports.createMinStack = LeetCodeExamples.createMinStack, exports.fib = LeetCodeExamples.fib, exports.hammingWeight = LeetCodeExamples.hammingWeight, exports.createLRUCache = LeetCodeExamples.createLRUCache, exports.quickSort = LeetCodeExamples.quickSort, exports.dijkstra = LeetCodeExamples.dijkstra;
