import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock the usecases module
jest.mock('../src/usecases/basicExamples', () => ({
  runBasicExamples: jest.fn(),
}));

// Import the main function
import { main } from '../src/index';

describe('Index Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call runBasicExamples when main is executed', async () => {
    const { runBasicExamples } = await import('../src/usecases/basicExamples');
    
    // Mock the function to resolve successfully
    (runBasicExamples as jest.Mock).mockResolvedValue(undefined);
    
    await main();
    
    expect(runBasicExamples).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when runBasicExamples throws', async () => {
    const { runBasicExamples } = await import('../src/usecases/basicExamples');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock the function to throw an error
    (runBasicExamples as jest.Mock).mockRejectedValue(new Error('Test error'));
    
    await main();
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '❌ Error running basic examples:',
      expect.any(Error)
    );
    
    consoleErrorSpy.mockRestore();
  });

  it('should log success message when runBasicExamples completes', async () => {
    const { runBasicExamples } = await import('../src/usecases/basicExamples');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock the function to resolve successfully
    (runBasicExamples as jest.Mock).mockResolvedValue(undefined);
    
    await main();
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '🎯 URL Management System - Basic Examples\n'
    );
    
    consoleLogSpy.mockRestore();
  });
}); 