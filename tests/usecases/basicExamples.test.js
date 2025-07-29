"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock the database and model modules
globals_1.jest.mock('../../src/config/database', () => ({
    connectToDatabase: globals_1.jest.fn(),
    disconnectFromDatabase: globals_1.jest.fn(),
}));
globals_1.jest.mock('../../src/models/Url', () => ({
    Url: globals_1.jest.fn(),
}));
const basicExamples_1 = require("../../src/usecases/basicExamples");
(0, globals_1.describe)('Basic Examples Tests', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('should connect to database when runBasicExamples is called', () => __awaiter(void 0, void 0, void 0, function* () {
        const { connectToDatabase } = yield Promise.resolve().then(() => __importStar(require('../../src/config/database')));
        yield (0, basicExamples_1.runBasicExamples)();
        (0, globals_1.expect)(connectToDatabase).toHaveBeenCalledTimes(1);
    }));
    (0, globals_1.it)('should disconnect from database after execution', () => __awaiter(void 0, void 0, void 0, function* () {
        const { disconnectFromDatabase } = yield Promise.resolve().then(() => __importStar(require('../../src/config/database')));
        yield (0, basicExamples_1.runBasicExamples)();
        (0, globals_1.expect)(disconnectFromDatabase).toHaveBeenCalledTimes(1);
    }));
    (0, globals_1.it)('should handle errors during execution', () => __awaiter(void 0, void 0, void 0, function* () {
        const { connectToDatabase } = yield Promise.resolve().then(() => __importStar(require('../../src/config/database')));
        const consoleErrorSpy = globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
        connectToDatabase.mockRejectedValue(new Error('Connection failed'));
        yield (0, basicExamples_1.runBasicExamples)();
        (0, globals_1.expect)(consoleErrorSpy).toHaveBeenCalledWith('❌ Error during execution:', globals_1.expect.any(Error));
        consoleErrorSpy.mockRestore();
    }));
    (0, globals_1.it)('should complete execution without throwing errors', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, globals_1.expect)((0, basicExamples_1.runBasicExamples)()).resolves.not.toThrow();
    }));
});
