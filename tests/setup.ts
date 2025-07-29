// Test setup file
import { jest } from '@jest/globals';

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Mock MongoDB connection for tests
jest.mock('../src/config/database', () => ({
  connectToDatabase: jest.fn(),
  disconnectFromDatabase: jest.fn(),
}));

// Mock mongoose
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
  connection: {
    on: jest.fn(),
    db: {
      databaseName: 'test_db'
    }
  },
  model: jest.fn(),
  Schema: jest.fn().mockImplementation(() => ({
    index: jest.fn(),
    statics: {},
    methods: {},
    pre: jest.fn(),
  })),
})); 