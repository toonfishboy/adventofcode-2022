import {promises as fs} from 'fs';
import fetch from 'node-fetch';
import * as dotenv from "dotenv";
import {join} from 'path';

dotenv.config();

const year = process.env.YEAR ?? new Date().getFullYear();
const day = process.env.DAY ?? new Date().getDate();
const sessionId = process.env.SESSION_ID;
const dayDirectory = day < 10 ? `0${day}` : `${day}`;
const dayDirectoryPath = join(__dirname, dayDirectory);

const defaultTask = `import { readLines } from "../helper";
import {join} from "path";

export async function runTask1(){
    const lines = await readLines(join(__dirname, "input.txt"));
}

export async function runTask2(){
    const lines = await readLines(join(__dirname, "input.txt"));
}`

async function main() {
    let dir: string[];
    try {
        dir = await fs.readdir(dayDirectoryPath);
    } catch (_) {
        await fs.mkdir(dayDirectoryPath);
        dir = await fs.readdir(dayDirectoryPath);
    }

    const hasInput = dir.includes("input.txt");
    const hasTask = dir.includes("task.ts");

    if (!hasInput && sessionId) {
        const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
            headers: {
                "cookie": `session=${sessionId}`
            }
        });
        const text = await response.text();
        await fs.writeFile(`${dayDirectoryPath}/input.txt`, text);
    }

    if (!hasTask)
        await fs.writeFile(`${dayDirectoryPath}/task.ts`, defaultTask)


    const task = await import(`./${dayDirectory}/task.ts`);

    await task.runTask1();
    await task.runTask2();
}

main().then();