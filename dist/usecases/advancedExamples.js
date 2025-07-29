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
exports.runAdvancedExamples = runAdvancedExamples;
const database_1 = require("../config/database");
const Url_1 = require("../models/Url");
function runAdvancedExamples() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectToDatabase)();
            console.log('\n🔬 Advanced URL Model Examples\n');
            // Example 1: Create URLs with different scenarios
            const urlsExemplo = [
                {
                    url: 'https://stackoverflow.com',
                    description: 'Programmer community for questions and answers',
                    title: 'Stack Overflow',
                    tags: ['programming', 'community', 'development']
                },
                {
                    url: 'https://www.youtube.com',
                    description: 'Most popular video platform in the world',
                    title: 'YouTube',
                    tags: ['videos', 'entertainment', 'technology']
                },
                {
                    url: 'https://www.linkedin.com',
                    description: 'Professional social network',
                    title: 'LinkedIn',
                    tags: ['professional', 'networking', 'career']
                }
            ];
            for (const urlData of urlsExemplo) {
                const novaUrl = new Url_1.Url(urlData);
                yield novaUrl.save();
                console.log(`✅ Created: ${novaUrl.title} - ${novaUrl.url}`);
            }
            // Example 2: Find URLs by multiple tags
            const urlsTecnologia = yield Url_1.Url.find({
                tags: { $in: ['technology', 'development'] }
            });
            console.log(`\n🔍 URLs with technology or development tags: ${urlsTecnologia.length}`);
            // Example 3: Find URLs created today
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const amanha = new Date(hoje);
            amanha.setDate(amanha.getDate() + 1);
            const urlsHoje = yield Url_1.Url.find({
                createdAt: { $gte: hoje, $lt: amanha }
            });
            console.log(`📅 URLs created today: ${urlsHoje.length}`);
            // Example 4: Update description of a URL
            const urlParaAtualizar = yield Url_1.Url.findOne({ title: 'Google' });
            if (urlParaAtualizar) {
                urlParaAtualizar.description = 'Most popular search engine in the world - Updated';
                yield urlParaAtualizar.save();
                console.log('✏️ Google description updated');
            }
            // Example 5: Remove tag from a URL
            const urlComTag = yield Url_1.Url.findOne({ title: 'GitHub' });
            if (urlComTag && urlComTag.tags) {
                const index = urlComTag.tags.indexOf('git');
                if (index > -1) {
                    urlComTag.tags.splice(index, 1);
                    yield urlComTag.save();
                    console.log('🗑️ Tag "git" removed from GitHub');
                }
            }
            // Example 6: Database statistics
            const totalUrls = yield Url_1.Url.countDocuments();
            const urlsComTags = yield Url_1.Url.countDocuments({ tags: { $exists: true, $ne: [] } });
            const urlsSemTags = yield Url_1.Url.countDocuments({ $or: [{ tags: { $exists: false } }, { tags: [] }] });
            console.log('\n📊 Database Statistics:');
            console.log(`   Total URLs: ${totalUrls}`);
            console.log(`   URLs with tags: ${urlsComTags}`);
            console.log(`   URLs without tags: ${urlsSemTags}`);
            // Example 7: Find URLs ordered by title
            const urlsOrdenadas = yield Url_1.Url.find().sort({ title: 1 });
            console.log('\n📋 URLs ordered by title:');
            urlsOrdenadas.forEach((url, index) => {
                var _a;
                console.log(`   ${index + 1}. ${url.title} (${((_a = url.tags) === null || _a === void 0 ? void 0 : _a.length) || 0} tags)`);
            });
            // Example 8: Find URLs that contain certain words in description
            const urlsComPalavra = yield Url_1.Url.find({
                description: { $regex: /popular/i }
            });
            console.log(`\n🔍 URLs with word "popular" in description: ${urlsComPalavra.length}`);
            console.log('\n✅ All advanced examples executed successfully!');
        }
        catch (error) {
            console.error('❌ Error during advanced examples:', error);
        }
        finally {
            yield (0, database_1.disconnectFromDatabase)();
        }
    });
}
// Run advanced examples if this file is executed directly
if (require.main === module) {
    runAdvancedExamples().catch(console.error);
}
