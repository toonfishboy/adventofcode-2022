import { readLines } from "../helper";
import {join} from "path";

export async function runTask1(){
    const lines = await readLines(join(__dirname, "example.txt"));
    const stackIndex = lines.findIndex(line => !isNaN(parseInt(line.trim()[0])));
    const stackDefinition = lines[stackIndex];
    const stackPositions: number[] = [];
    stackDefinition.split("").forEach((char, index) => {
        const value = parseInt(char);
        if(!isNaN(value) && value > 0)
            stackPositions.push(value);
    });
    const stacks: string[][] = [];
    console.log(lines);
    stackPositions.forEach((position,index) => {
        if(!stacks[index])
            stacks[index] = [];
        lines.slice(0, stackIndex).forEach(line => {
           stacks[index].push(line[position]);
        });
    });
    console.log(stacks);
}

export async function runTask2(){
    const lines = await readLines(join(__dirname, "input.txt"));
}
