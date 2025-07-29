import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock the database and model modules
jest.mock('../../src/config/database', () => ({
  connectToDatabase: jest.fn(),
  disconnectFromDatabase: jest.fn(),
}));

jest.mock('../../src/models/Url', () => ({
  Url: jest.fn(),
}));

import { runBasicExamples } from '../../src/usecases/basicExamples';

describe('Basic Examples Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to database when runBasicExamples is called', async () => {
    const { connectToDatabase } = await import('../../src/config/database');
    
    await runBasicExamples();
    
    expect(connectToDatabase).toHaveBeenCalledTimes(1);
  });

  it('should disconnect from database after execution', async () => {
    const { disconnectFromDatabase } = await import('../../src/config/database');
    
    await runBasicExamples();
    
    expect(disconnectFromDatabase).toHaveBeenCalledTimes(1);
  });

  it('should handle errors during execution', async () => {
    const { connectToDatabase } = await import('../../src/config/database');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    (connectToDatabase as jest.Mock).mockRejectedValue(new Error('Connection failed'));
    
    await runBasicExamples();
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '❌ Error during execution:',
      expect.any(Error)
    );
    
    consoleErrorSpy.mockRestore();
  });

  it('should complete execution without throwing errors', async () => {
    await expect(runBasicExamples()).resolves.not.toThrow();
  });
}); 