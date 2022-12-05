import { promises as fs } from 'fs';

export async function readLines(fileName: string, trimContent = true): Promise<string[]> {
    const file = await fs.readFile(fileName)
    const content = trimContent ? file.toString().trim() : file.toString();
    return content.split(/\r?\n|\r/g);
}