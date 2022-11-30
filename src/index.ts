import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import * as dotenv from "dotenv";
import { join } from 'path';

console.log(__filename);

dotenv.config();

const year = process.env.YEAR ?? new Date().getFullYear();
const day = process.env.DAY ?? new Date().getDate();
const sessionId = process.env.SESSION_ID;
const dayDirectory = day < 10 ? `0${day}` : `${day}`;
const dayDirectoryPath = join(__dirname, dayDirectory);

const defaultTask = `import { readLines } from "../helper";

async function run(){
    const lines = await readLines(__dirname);
    console.log(lines);
}

export default run;`

async function main() {
    let dir: string[] = []
    try {
        dir = await fs.readdir(dayDirectoryPath);
    } catch (_) {
        await fs.mkdir(dayDirectoryPath);
        dir = await fs.readdir(dayDirectoryPath);
    }

    let hasInput = false;
    let hasTask1 = false;
    let hasTask2 = false

    dir.forEach(file => {
        if (file === "input.txt")
            hasInput = true;
        if (file === "task1.ts")
            hasTask1 = true;
        if (file === "task2.ts")
            hasTask2 = true;
    });

    if (!hasInput && sessionId) {
        const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
            headers: {
                "cookie": `session=${sessionId}`
            }
        });
        const text = await response.text();
        await fs.writeFile(`${dayDirectoryPath}/input.txt`, text);
    }

    if (!hasTask1) {
        await fs.writeFile(`${dayDirectoryPath}/task1.ts`, defaultTask)
    }
    if (!hasTask2) {
        await fs.writeFile(`${dayDirectoryPath}/task2.ts`, defaultTask)
    }

    const { default: task1 } = await import(`./${dayDirectory}/task1.ts`);
    const { default: task2 } = await import(`./${dayDirectory}/task2.ts`);

    task1();
    task2();
}

main();