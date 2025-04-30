import type { NextRequest } from 'next/server';
import uploadRoute from '../route';
import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { jest } from '@jest/globals';

// Mock external dependencies
jest.mock('@vercel/blob', () => ({
  put: jest.fn().mockImplementation(() => Promise.resolve({ url: 'https://example.com/blob-url' })),
}));

jest.mock('@vercel/postgres', () => ({
  sql: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ command: 'INSERT', rowCount: 1, oid: null, rows: [], fields: [] })),
}));

describe('POST /api/upload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully upload a file and store team data', async () => {
    // Mock successful responses
    const mockBlobResponse = { url: 'https://example.com/blob-url' };
    const mockQueryResult = {
      command: 'INSERT',
      rowCount: 1,
      oid: null,
      rows: [],
      fields: [],
    };

    (put as jest.Mock).mockResolvedValue(mockBlobResponse);
    (sql as jest.Mock).mockResolvedValue(mockQueryResult);

    // Create mock request data
    const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const mockFormData = new FormData();
    mockFormData.append('file', mockFile);
    mockFormData.append('teamName', 'Test Team');

    // Create mock request
    const request = new Request('http://localhost:3000/api/upload', {
      method: 'POST',
      body: mockFormData,
    });

    const response = await uploadRoute(request as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.url).toBe('https://example.com/blob-url');

    // Verify the dependencies were called correctly
    expect(put).toHaveBeenCalledWith(expect.stringContaining('teams/Test Team-'), mockFile, { access: 'public' });

    // Verify SQL call was made with correct parameters
    const sqlCall = (sql as jest.Mock).mock.calls[0];
    const [query, ...params] = sqlCall;

    // The query is passed as a template literal array
    expect(query[0]).toContain('INSERT INTO teams');
    expect(query[0]).toContain('name');
    expect(query[0]).toContain('image_url');
    expect(params).toEqual(['Test Team', 'https://example.com/blob-url']);
  });

  it('should return 400 if file or team name is missing', async () => {
    const mockFormData = new FormData();
    mockFormData.append('file', new File([''], 'test.txt'));
    // Missing team name

    const request = new Request('http://localhost:3000/api/upload', {
      method: 'POST',
      body: mockFormData,
    });

    const response = await uploadRoute(request as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('File and team name are required');
  });

  it('should handle errors gracefully', async () => {
    // Mock blob put to throw an error
    (put as jest.Mock).mockRejectedValue(new Error('Upload failed'));

    const mockFormData = new FormData();
    mockFormData.append('file', new File([''], 'test.txt'));
    mockFormData.append('teamName', 'Test Team');

    const request = new Request('http://localhost:3000/api/upload', {
      method: 'POST',
      body: mockFormData,
    });

    const response = await uploadRoute(request as unknown as NextRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error uploading file');
  });
});
