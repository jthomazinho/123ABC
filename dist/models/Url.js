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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// URL model schema
const urlSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: [true, 'URL is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'URL must start with http:// or https://'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot have more than 500 characters']
    },
    title: {
        type: String,
        trim: true,
        maxlength: [100, 'Title cannot have more than 100 characters']
    },
    tags: [{
            type: String,
            trim: true,
            lowercase: true
        }]
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'urls' // Collection name in MongoDB
});
// Indexes for better performance
urlSchema.index({ url: 1 }, { unique: true });
urlSchema.index({ tags: 1 });
urlSchema.index({ createdAt: -1 });
// Static method to find URLs by tag
urlSchema.statics.findByTag = function (tag) {
    return this.find({ tags: tag.toLowerCase() });
};
// Instance method to add tag
urlSchema.methods.addTag = function (tag) {
    if (!this.tags.includes(tag.toLowerCase())) {
        this.tags.push(tag.toLowerCase());
    }
    return this.save();
};
// Middleware to validate URL before saving
urlSchema.pre('save', function (next) {
    if (this.isModified('url')) {
        // Remove whitespace and normalize URL
        this.url = this.url.trim();
        if (!this.url.startsWith('http://') && !this.url.startsWith('https://')) {
            this.url = 'https://' + this.url;
        }
    }
    next();
});
// Export the model
exports.Url = mongoose_1.default.model('Url', urlSchema);
exports.default = exports.Url;
