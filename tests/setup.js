"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Test setup file
const globals_1 = require("@jest/globals");
// Mock console methods to avoid cluttering test output
global.console = Object.assign(Object.assign({}, console), { log: globals_1.jest.fn(), error: globals_1.jest.fn(), warn: globals_1.jest.fn(), info: globals_1.jest.fn(), debug: globals_1.jest.fn() });
// Mock MongoDB connection for tests
globals_1.jest.mock('../src/config/database', () => ({
    connectToDatabase: globals_1.jest.fn(),
    disconnectFromDatabase: globals_1.jest.fn(),
}));
// Mock mongoose
globals_1.jest.mock('mongoose', () => ({
    connect: globals_1.jest.fn(),
    disconnect: globals_1.jest.fn(),
    connection: {
        on: globals_1.jest.fn(),
        db: {
            databaseName: 'test_db'
        }
    },
    model: globals_1.jest.fn(),
    Schema: globals_1.jest.fn().mockImplementation(() => ({
        index: globals_1.jest.fn(),
        statics: {},
        methods: {},
        pre: globals_1.jest.fn(),
    })),
}));
