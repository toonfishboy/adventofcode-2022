import { promises as fs } from 'fs';
import { join } from 'path';

export async function readLines(dirName: string): Promise<string[]> {
    const file = await fs.readFile(join(dirName, "input.txt"))
    const content = file.toString().trim();
    const lines = content.split("\n");
    return lines;
}