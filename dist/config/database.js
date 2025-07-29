"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urls_db';
// Connection options
const connectionOptions = {
    maxPoolSize: 10, // Maximum connections in pool
    serverSelectionTimeoutMS: 5000, // Server selection timeout
    socketTimeoutMS: 45000, // Socket operations timeout
    bufferCommands: false, // Disable command buffer
};
// Function to connect to MongoDB
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield mongoose_1.default.connect(MONGODB_URI, connectionOptions);
        console.log('✅ Successfully connected to MongoDB!');
        console.log(`📊 Database: ${((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.databaseName) || 'urls_db'}`);
    }
    catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
// Function to disconnect from MongoDB
const disconnectFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
    catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
    }
});
exports.disconnectFromDatabase = disconnectFromDatabase;
// Event listeners to monitor connection
mongoose_1.default.connection.on('connected', () => {
    console.log('🟢 Mongoose connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('🔴 Mongoose connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('🟡 Mongoose disconnected from MongoDB');
});
// Graceful shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.disconnectFromDatabase)();
    process.exit(0);
}));
exports.default = mongoose_1.default;
