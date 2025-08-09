import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { BMAccountSchema } from './types';
import { BMAccount } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'bm.json');

export async function readBM(): Promise<BMAccount[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    return z.array(BMAccountSchema).parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn('bm.json not found, returning empty array.');
      return [];
    }
    console.error('Error reading bm.json:', error);
    throw error;
  }
}

export async function writeBM(data: BMAccount[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to bm.json:', error);
    throw error;
  }
}