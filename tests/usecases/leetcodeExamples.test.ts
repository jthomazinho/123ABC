import { describe, it, expect, beforeEach } from '@jest/globals';
import { LeetCodeExamples, ListNode, TreeNode } from '../../src/usecases/leetcodeExamples';

describe('LeetCode Examples Tests', () => {
  beforeEach(() => {
    // Reset any state if needed
  });

  describe('Two Sum', () => {
    it('should find two numbers that add up to target', () => {
      const nums = [2, 7, 11, 15];
      const target = 9;
      const result = LeetCodeExamples.twoSum(nums, target);
      
      expect(result).toEqual([0, 1]);
    });

    it('should return empty array when no solution exists', () => {
      const nums = [1, 2, 3, 4];
      const target = 10;
      const result = LeetCodeExamples.twoSum(nums, target);
      
      expect(result).toEqual([]);
    });
  });

  describe('Valid Parentheses', () => {
    it('should return true for valid parentheses', () => {
      const validStrings = ['()', '()[]{}', '({[]})'];
      
      validStrings.forEach(str => {
        expect(LeetCodeExamples.isValidParentheses(str)).toBe(true);
      });
    });

    it('should return false for invalid parentheses', () => {
      const invalidStrings = ['(', ')', '([)]', '{[}'];
      
      invalidStrings.forEach(str => {
        expect(LeetCodeExamples.isValidParentheses(str)).toBe(false);
      });
    });
  });

  describe('Maximum Subarray', () => {
    it('should find maximum subarray sum', () => {
      const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const result = LeetCodeExamples.maxSubArray(nums);
      
      expect(result).toBe(6);
    });

    it('should handle single element array', () => {
      const nums = [5];
      const result = LeetCodeExamples.maxSubArray(nums);
      
      expect(result).toBe(5);
    });
  });

  describe('Binary Search', () => {
    it('should find target in sorted array', () => {
      const nums = [1, 3, 5, 7, 9, 11, 13, 15];
      const target = 7;
      const result = LeetCodeExamples.binarySearch(nums, target);
      
      expect(result).toBe(3);
    });

    it('should return -1 when target not found', () => {
      const nums = [1, 3, 5, 7, 9];
      const target = 4;
      const result = LeetCodeExamples.binarySearch(nums, target);
      
      expect(result).toBe(-1);
    });
  });

  describe('Climbing Stairs', () => {
    it('should calculate ways to climb stairs', () => {
      expect(LeetCodeExamples.climbStairs(1)).toBe(1);
      expect(LeetCodeExamples.climbStairs(2)).toBe(2);
      expect(LeetCodeExamples.climbStairs(3)).toBe(3);
      expect(LeetCodeExamples.climbStairs(4)).toBe(5);
    });
  });

  describe('Merge Sort', () => {
    it('should sort array correctly', () => {
      const unsorted = [64, 34, 25, 12, 22, 11, 90];
      const sorted = LeetCodeExamples.mergeSort([...unsorted]);
      
      expect(sorted).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should handle empty array', () => {
      const result = LeetCodeExamples.mergeSort([]);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const result = LeetCodeExamples.mergeSort([5]);
      expect(result).toEqual([5]);
    });
  });

  describe('Group Anagrams', () => {
    it('should group anagrams correctly', () => {
      const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
      const result = LeetCodeExamples.groupAnagrams(strs);
      
      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.arrayContaining(['eat', 'tea', 'ate']),
          expect.arrayContaining(['tan', 'nat']),
          expect.arrayContaining(['bat'])
        ])
      );
    });
  });

  describe('Fibonacci', () => {
    it('should calculate fibonacci numbers', () => {
      expect(LeetCodeExamples.fib(0)).toBe(0);
      expect(LeetCodeExamples.fib(1)).toBe(1);
      expect(LeetCodeExamples.fib(2)).toBe(1);
      expect(LeetCodeExamples.fib(3)).toBe(2);
      expect(LeetCodeExamples.fib(4)).toBe(3);
      expect(LeetCodeExamples.fib(5)).toBe(5);
    });
  });

  describe('ListNode', () => {
    it('should create ListNode with default values', () => {
      const node = new ListNode();
      expect(node.val).toBe(0);
      expect(node.next).toBe(null);
    });

    it('should create ListNode with custom values', () => {
      const nextNode = new ListNode(2);
      const node = new ListNode(1, nextNode);
      
      expect(node.val).toBe(1);
      expect(node.next).toBe(nextNode);
    });
  });

  describe('TreeNode', () => {
    it('should create TreeNode with default values', () => {
      const node = new TreeNode();
      expect(node.val).toBe(0);
      expect(node.left).toBe(null);
      expect(node.right).toBe(null);
    });

    it('should create TreeNode with custom values', () => {
      const leftNode = new TreeNode(1);
      const rightNode = new TreeNode(3);
      const node = new TreeNode(2, leftNode, rightNode);
      
      expect(node.val).toBe(2);
      expect(node.left).toBe(leftNode);
      expect(node.right).toBe(rightNode);
    });
  });

  describe('Min Stack', () => {
    it('should create min stack with correct operations', () => {
      const minStack = LeetCodeExamples.createMinStack();
      
      minStack.push(3);
      minStack.push(5);
      minStack.push(2);
      minStack.push(1);
      
      expect(minStack.getMin()).toBe(1);
      expect(minStack.top()).toBe(1);
      
      minStack.pop();
      expect(minStack.getMin()).toBe(2);
      expect(minStack.top()).toBe(2);
    });
  });

  describe('LRU Cache', () => {
    it('should create LRU cache with correct operations', () => {
      const cache = LeetCodeExamples.createLRUCache(2);
      
      cache.put(1, 1);
      cache.put(2, 2);
      
      expect(cache.get(1)).toBe(1);
      
      cache.put(3, 3);
      expect(cache.get(2)).toBe(-1); // Should be evicted
      
      expect(cache.get(3)).toBe(3);
    });
  });
}); 