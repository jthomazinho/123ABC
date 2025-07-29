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
// Mock the usecases module
globals_1.jest.mock('../src/usecases/basicExamples', () => ({
    runBasicExamples: globals_1.jest.fn(),
}));
// Import the main function
const index_1 = require("../src/index");
(0, globals_1.describe)('Index Tests', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('should call runBasicExamples when main is executed', () => __awaiter(void 0, void 0, void 0, function* () {
        const { runBasicExamples } = yield Promise.resolve().then(() => __importStar(require('../src/usecases/basicExamples')));
        // Mock the function to resolve successfully
        runBasicExamples.mockResolvedValue(undefined);
        yield (0, index_1.main)();
        (0, globals_1.expect)(runBasicExamples).toHaveBeenCalledTimes(1);
    }));
    (0, globals_1.it)('should handle errors when runBasicExamples throws', () => __awaiter(void 0, void 0, void 0, function* () {
        const { runBasicExamples } = yield Promise.resolve().then(() => __importStar(require('../src/usecases/basicExamples')));
        const consoleErrorSpy = globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
        // Mock the function to throw an error
        runBasicExamples.mockRejectedValue(new Error('Test error'));
        yield (0, index_1.main)();
        (0, globals_1.expect)(consoleErrorSpy).toHaveBeenCalledWith('❌ Error running basic examples:', globals_1.expect.any(Error));
        consoleErrorSpy.mockRestore();
    }));
    (0, globals_1.it)('should log success message when runBasicExamples completes', () => __awaiter(void 0, void 0, void 0, function* () {
        const { runBasicExamples } = yield Promise.resolve().then(() => __importStar(require('../src/usecases/basicExamples')));
        const consoleLogSpy = globals_1.jest.spyOn(console, 'log').mockImplementation(() => { });
        // Mock the function to resolve successfully
        runBasicExamples.mockResolvedValue(undefined);
        yield (0, index_1.main)();
        (0, globals_1.expect)(consoleLogSpy).toHaveBeenCalledWith('🎯 URL Management System - Basic Examples\n');
        consoleLogSpy.mockRestore();
    }));
});
