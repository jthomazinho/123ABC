import { connectToDatabase, disconnectFromDatabase } from '../config/database';
import { Url, IUrl } from '../models/Url';

export async function runBasicExamples() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    console.log('\n🚀 Starting URL model usage example...\n');

    // Example 1: Create a new URL
    const novaUrl = new Url({
      url: 'https://www.google.com',
      description: 'Most popular search engine in the world',
      title: 'Google',
      tags: ['search', 'technology']
    });

    await novaUrl.save();
    console.log('✅ URL created:', novaUrl.url);

    // Example 2: Create another URL
    const segundaUrl = new Url({
      url: 'https://github.com',
      description: 'Source code hosting platform',
      title: 'GitHub',
      tags: ['development', 'code', 'git']
    });

    await segundaUrl.save();
    console.log('✅ Second URL created:', segundaUrl.url);

    // Example 3: Find all URLs
    const todasUrls = await Url.find().sort({ createdAt: -1 });
    console.log('\n📋 All registered URLs:');
    todasUrls.forEach((url, index) => {
      console.log(`${index + 1}. ${url.title || 'No title'} - ${url.url}`);
      console.log(`   Description: ${url.description}`);
      console.log(`   Tags: ${url.tags?.join(', ') || 'No tags'}`);
      console.log(`   Created at: ${url.createdAt.toLocaleString()}\n`);
    });

    // Example 4: Find URLs by tag
    const urlsDesenvolvimento = await Url.find({ tags: 'development' });
    console.log('🔍 URLs with "development" tag:', urlsDesenvolvimento.length);

    // Example 5: Add a new tag to an existing URL
    await novaUrl.addTag('browser');
    console.log('🏷️ New tag added to Google');

    // Example 6: Find URL by specific URL
    const urlGoogle = await Url.findOne({ url: 'https://www.google.com' });
    if (urlGoogle) {
      console.log('🔍 URL found:', urlGoogle.title);
      console.log('   Updated tags:', urlGoogle.tags);
    }

    console.log('\n✅ All examples executed successfully!');

  } catch (error) {
    console.error('❌ Error during execution:', error);
  } finally {
    // Disconnect from MongoDB
    await disconnectFromDatabase();
  }
}

// Run basic examples if this file is executed directly
if (require.main === module) {
  runBasicExamples().catch(console.error);
} 