import { connectToDatabase, disconnectFromDatabase } from '../config/database';
import { Url, IUrl } from '../models/Url';

export async function runAdvancedExamples() {
  try {
    await connectToDatabase();
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
      const novaUrl = new Url(urlData);
      await novaUrl.save();
      console.log(`✅ Created: ${novaUrl.title} - ${novaUrl.url}`);
    }

    // Example 2: Find URLs by multiple tags
    const urlsTecnologia = await Url.find({ 
      tags: { $in: ['technology', 'development'] } 
    });
    console.log(`\n🔍 URLs with technology or development tags: ${urlsTecnologia.length}`);

    // Example 3: Find URLs created today
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const urlsHoje = await Url.find({
      createdAt: { $gte: hoje, $lt: amanha }
    });
    console.log(`📅 URLs created today: ${urlsHoje.length}`);

    // Example 4: Update description of a URL
    const urlParaAtualizar = await Url.findOne({ title: 'Google' });
    if (urlParaAtualizar) {
      urlParaAtualizar.description = 'Most popular search engine in the world - Updated';
      await urlParaAtualizar.save();
      console.log('✏️ Google description updated');
    }

    // Example 5: Remove tag from a URL
    const urlComTag = await Url.findOne({ title: 'GitHub' });
    if (urlComTag && urlComTag.tags) {
      const index = urlComTag.tags.indexOf('git');
      if (index > -1) {
        urlComTag.tags.splice(index, 1);
        await urlComTag.save();
        console.log('🗑️ Tag "git" removed from GitHub');
      }
    }

    // Example 6: Database statistics
    const totalUrls = await Url.countDocuments();
    const urlsComTags = await Url.countDocuments({ tags: { $exists: true, $ne: [] } });
    const urlsSemTags = await Url.countDocuments({ $or: [{ tags: { $exists: false } }, { tags: [] }] });

    console.log('\n📊 Database Statistics:');
    console.log(`   Total URLs: ${totalUrls}`);
    console.log(`   URLs with tags: ${urlsComTags}`);
    console.log(`   URLs without tags: ${urlsSemTags}`);

    // Example 7: Find URLs ordered by title
    const urlsOrdenadas = await Url.find().sort({ title: 1 });
    console.log('\n📋 URLs ordered by title:');
    urlsOrdenadas.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url.title} (${url.tags?.length || 0} tags)`);
    });

    // Example 8: Find URLs that contain certain words in description
    const urlsComPalavra = await Url.find({
      description: { $regex: /popular/i }
    });
    console.log(`\n🔍 URLs with word "popular" in description: ${urlsComPalavra.length}`);

    console.log('\n✅ All advanced examples executed successfully!');

  } catch (error) {
    console.error('❌ Error during advanced examples:', error);
  } finally {
    await disconnectFromDatabase();
  }
}

// Run advanced examples if this file is executed directly
if (require.main === module) {
  runAdvancedExamples().catch(console.error);
} 