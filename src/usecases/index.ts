// Export all use cases
export { runBasicExamples } from './basicExamples';
export { runAdvancedExamples } from './advancedExamples';

// Main function to run all examples
export async function runAllExamples() {
  console.log('🎯 Running all URL model examples...\n');
  
  // Import and run basic examples
  const { runBasicExamples } = await import('./basicExamples');
  await runBasicExamples();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Import and run advanced examples
  const { runAdvancedExamples } = await import('./advancedExamples');
  await runAdvancedExamples();
  
  console.log('\n🎉 All examples completed successfully!');
}

// Run all examples if this file is executed directly
if (require.main === module) {
  runAllExamples().catch(console.error);
} 