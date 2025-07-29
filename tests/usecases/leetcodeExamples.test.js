"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const leetcodeExamples_1 = require("../../src/usecases/leetcodeExamples");
(0, globals_1.describe)('LeetCode Examples Tests', () => {
    (0, globals_1.beforeEach)(() => {
        // Reset any state if needed
    });
    (0, globals_1.describe)('Two Sum', () => {
        (0, globals_1.it)('should find two numbers that add up to target', () => {
            const nums = [2, 7, 11, 15];
            const target = 9;
            const result = leetcodeExamples_1.LeetCodeExamples.twoSum(nums, target);
            (0, globals_1.expect)(result).toEqual([0, 1]);
        });
        (0, globals_1.it)('should return empty array when no solution exists', () => {
            const nums = [1, 2, 3, 4];
            const target = 10;
            const result = leetcodeExamples_1.LeetCodeExamples.twoSum(nums, target);
            (0, globals_1.expect)(result).toEqual([]);
        });
    });
    (0, globals_1.describe)('Valid Parentheses', () => {
        (0, globals_1.it)('should return true for valid parentheses', () => {
            const validStrings = ['()', '()[]{}', '({[]})'];
            validStrings.forEach(str => {
                (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.isValidParentheses(str)).toBe(true);
            });
        });
        (0, globals_1.it)('should return false for invalid parentheses', () => {
            const invalidStrings = ['(', ')', '([)]', '{[}'];
            invalidStrings.forEach(str => {
                (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.isValidParentheses(str)).toBe(false);
            });
        });
    });
    (0, globals_1.describe)('Maximum Subarray', () => {
        (0, globals_1.it)('should find maximum subarray sum', () => {
            const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
            const result = leetcodeExamples_1.LeetCodeExamples.maxSubArray(nums);
            (0, globals_1.expect)(result).toBe(6);
        });
        (0, globals_1.it)('should handle single element array', () => {
            const nums = [5];
            const result = leetcodeExamples_1.LeetCodeExamples.maxSubArray(nums);
            (0, globals_1.expect)(result).toBe(5);
        });
    });
    (0, globals_1.describe)('Binary Search', () => {
        (0, globals_1.it)('should find target in sorted array', () => {
            const nums = [1, 3, 5, 7, 9, 11, 13, 15];
            const target = 7;
            const result = leetcodeExamples_1.LeetCodeExamples.binarySearch(nums, target);
            (0, globals_1.expect)(result).toBe(3);
        });
        (0, globals_1.it)('should return -1 when target not found', () => {
            const nums = [1, 3, 5, 7, 9];
            const target = 4;
            const result = leetcodeExamples_1.LeetCodeExamples.binarySearch(nums, target);
            (0, globals_1.expect)(result).toBe(-1);
        });
    });
    (0, globals_1.describe)('Climbing Stairs', () => {
        (0, globals_1.it)('should calculate ways to climb stairs', () => {
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.climbStairs(1)).toBe(1);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.climbStairs(2)).toBe(2);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.climbStairs(3)).toBe(3);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.climbStairs(4)).toBe(5);
        });
    });
    (0, globals_1.describe)('Merge Sort', () => {
        (0, globals_1.it)('should sort array correctly', () => {
            const unsorted = [64, 34, 25, 12, 22, 11, 90];
            const sorted = leetcodeExamples_1.LeetCodeExamples.mergeSort([...unsorted]);
            (0, globals_1.expect)(sorted).toEqual([11, 12, 22, 25, 34, 64, 90]);
        });
        (0, globals_1.it)('should handle empty array', () => {
            const result = leetcodeExamples_1.LeetCodeExamples.mergeSort([]);
            (0, globals_1.expect)(result).toEqual([]);
        });
        (0, globals_1.it)('should handle single element array', () => {
            const result = leetcodeExamples_1.LeetCodeExamples.mergeSort([5]);
            (0, globals_1.expect)(result).toEqual([5]);
        });
    });
    (0, globals_1.describe)('Group Anagrams', () => {
        (0, globals_1.it)('should group anagrams correctly', () => {
            const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
            const result = leetcodeExamples_1.LeetCodeExamples.groupAnagrams(strs);
            (0, globals_1.expect)(result).toHaveLength(3);
            (0, globals_1.expect)(result).toEqual(globals_1.expect.arrayContaining([
                globals_1.expect.arrayContaining(['eat', 'tea', 'ate']),
                globals_1.expect.arrayContaining(['tan', 'nat']),
                globals_1.expect.arrayContaining(['bat'])
            ]));
        });
    });
    (0, globals_1.describe)('Fibonacci', () => {
        (0, globals_1.it)('should calculate fibonacci numbers', () => {
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.fib(0)).toBe(0);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.fib(1)).toBe(1);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.fib(2)).toBe(1);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.fib(3)).toBe(2);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.fib(4)).toBe(3);
            (0, globals_1.expect)(leetcodeExamples_1.LeetCodeExamples.fib(5)).toBe(5);
        });
    });
    (0, globals_1.describe)('ListNode', () => {
        (0, globals_1.it)('should create ListNode with default values', () => {
            const node = new leetcodeExamples_1.ListNode();
            (0, globals_1.expect)(node.val).toBe(0);
            (0, globals_1.expect)(node.next).toBe(null);
        });
        (0, globals_1.it)('should create ListNode with custom values', () => {
            const nextNode = new leetcodeExamples_1.ListNode(2);
            const node = new leetcodeExamples_1.ListNode(1, nextNode);
            (0, globals_1.expect)(node.val).toBe(1);
            (0, globals_1.expect)(node.next).toBe(nextNode);
        });
    });
    (0, globals_1.describe)('TreeNode', () => {
        (0, globals_1.it)('should create TreeNode with default values', () => {
            const node = new leetcodeExamples_1.TreeNode();
            (0, globals_1.expect)(node.val).toBe(0);
            (0, globals_1.expect)(node.left).toBe(null);
            (0, globals_1.expect)(node.right).toBe(null);
        });
        (0, globals_1.it)('should create TreeNode with custom values', () => {
            const leftNode = new leetcodeExamples_1.TreeNode(1);
            const rightNode = new leetcodeExamples_1.TreeNode(3);
            const node = new leetcodeExamples_1.TreeNode(2, leftNode, rightNode);
            (0, globals_1.expect)(node.val).toBe(2);
            (0, globals_1.expect)(node.left).toBe(leftNode);
            (0, globals_1.expect)(node.right).toBe(rightNode);
        });
    });
    (0, globals_1.describe)('Min Stack', () => {
        (0, globals_1.it)('should create min stack with correct operations', () => {
            const minStack = leetcodeExamples_1.LeetCodeExamples.createMinStack();
            minStack.push(3);
            minStack.push(5);
            minStack.push(2);
            minStack.push(1);
            (0, globals_1.expect)(minStack.getMin()).toBe(1);
            (0, globals_1.expect)(minStack.top()).toBe(1);
            minStack.pop();
            (0, globals_1.expect)(minStack.getMin()).toBe(2);
            (0, globals_1.expect)(minStack.top()).toBe(2);
        });
    });
    (0, globals_1.describe)('LRU Cache', () => {
        (0, globals_1.it)('should create LRU cache with correct operations', () => {
            const cache = leetcodeExamples_1.LeetCodeExamples.createLRUCache(2);
            cache.put(1, 1);
            cache.put(2, 2);
            (0, globals_1.expect)(cache.get(1)).toBe(1);
            cache.put(3, 3);
            (0, globals_1.expect)(cache.get(2)).toBe(-1); // Should be evicted
            (0, globals_1.expect)(cache.get(3)).toBe(3);
        });
    });
});
