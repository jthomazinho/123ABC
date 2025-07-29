import { runBasicExamples } from './usecases';

async function main() {
  try {
    console.log('🎯 URL Management System - Basic Examples\n');
    await runBasicExamples();
  } catch (error) {
    console.error('❌ Error running basic examples:', error);
  }
}

// Run the main function
main().catch(console.error);