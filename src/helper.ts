import { promises as fs } from 'fs';

export async function readLines(fileName: string): Promise<string[]> {
    const file = await fs.readFile(fileName)
    const content = file.toString().trim();
    return content.split(/\r?\n|\r/g);
}