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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBasicExamples = runBasicExamples;
const database_1 = require("../config/database");
const Url_1 = require("../models/Url");
function runBasicExamples() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield (0, database_1.connectToDatabase)();
            console.log('\n🚀 Starting URL model usage example...\n');
            // Example 1: Create a new URL
            const novaUrl = new Url_1.Url({
                url: 'https://www.google.com',
                description: 'Most popular search engine in the world',
                title: 'Google',
                tags: ['search', 'technology']
            });
            yield novaUrl.save();
            console.log('✅ URL created:', novaUrl.url);
            // Example 2: Create another URL
            const segundaUrl = new Url_1.Url({
                url: 'https://github.com',
                description: 'Source code hosting platform',
                title: 'GitHub',
                tags: ['development', 'code', 'git']
            });
            yield segundaUrl.save();
            console.log('✅ Second URL created:', segundaUrl.url);
            // Example 3: Find all URLs
            const todasUrls = yield Url_1.Url.find().sort({ createdAt: -1 });
            console.log('\n📋 All registered URLs:');
            todasUrls.forEach((url, index) => {
                var _a;
                console.log(`${index + 1}. ${url.title || 'No title'} - ${url.url}`);
                console.log(`   Description: ${url.description}`);
                console.log(`   Tags: ${((_a = url.tags) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'No tags'}`);
                console.log(`   Created at: ${url.createdAt.toLocaleString()}\n`);
            });
            // Example 4: Find URLs by tag
            const urlsDesenvolvimento = yield Url_1.Url.find({ tags: 'development' });
            console.log('🔍 URLs with "development" tag:', urlsDesenvolvimento.length);
            // Example 5: Add a new tag to an existing URL
            yield novaUrl.addTag('browser');
            console.log('🏷️ New tag added to Google');
            // Example 6: Find URL by specific URL
            const urlGoogle = yield Url_1.Url.findOne({ url: 'https://www.google.com' });
            if (urlGoogle) {
                console.log('🔍 URL found:', urlGoogle.title);
                console.log('   Updated tags:', urlGoogle.tags);
            }
            console.log('\n✅ All examples executed successfully!');
        }
        catch (error) {
            console.error('❌ Error during execution:', error);
        }
        finally {
            // Disconnect from MongoDB
            yield (0, database_1.disconnectFromDatabase)();
        }
    });
}
// Run basic examples if this file is executed directly
if (require.main === module) {
    runBasicExamples().catch(console.error);
}
