import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock the usecases modules
jest.mock('../../src/usecases/basicExamples', () => ({
  runBasicExamples: jest.fn(),
}));

jest.mock('../../src/usecases/advancedExamples', () => ({
  runAdvancedExamples: jest.fn(),
}));

import { runAllExamples } from '../../src/usecases/index';

describe('Use Cases Index Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call both basic and advanced examples when runAllExamples is executed', async () => {
    const { runBasicExamples } = await import('../../src/usecases/basicExamples');
    const { runAdvancedExamples } = await import('../../src/usecases/advancedExamples');
    
    // Mock the functions to resolve successfully
    (runBasicExamples as jest.Mock).mockResolvedValue(undefined);
    (runAdvancedExamples as jest.Mock).mockResolvedValue(undefined);
    
    await runAllExamples();
    
    expect(runBasicExamples).toHaveBeenCalledTimes(1);
    expect(runAdvancedExamples).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when runBasicExamples throws', async () => {
    const { runBasicExamples } = await import('../../src/usecases/basicExamples');
    
    // Mock the function to throw an error
    (runBasicExamples as jest.Mock).mockRejectedValue(new Error('Basic examples failed'));
    
    await expect(runAllExamples()).rejects.toThrow('Basic examples failed');
  });

  it('should handle errors when runAdvancedExamples throws', async () => {
    const { runBasicExamples } = await import('../../src/usecases/basicExamples');
    const { runAdvancedExamples } = await import('../../src/usecases/advancedExamples');
    
    // Mock basic examples to succeed and advanced to fail
    (runBasicExamples as jest.Mock).mockResolvedValue(undefined);
    (runAdvancedExamples as jest.Mock).mockRejectedValue(new Error('Advanced examples failed'));
    
    await expect(runAllExamples()).rejects.toThrow('Advanced examples failed');
  });

  it('should log success message when all examples complete', async () => {
    const { runBasicExamples } = await import('../../src/usecases/basicExamples');
    const { runAdvancedExamples } = await import('../../src/usecases/advancedExamples');
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock both functions to resolve successfully
    (runBasicExamples as jest.Mock).mockResolvedValue(undefined);
    (runAdvancedExamples as jest.Mock).mockResolvedValue(undefined);
    
    await runAllExamples();
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '🎯 Running all URL model examples...\n'
    );
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\n🎉 All examples completed successfully!'
    );
    
    consoleLogSpy.mockRestore();
  });
}); 