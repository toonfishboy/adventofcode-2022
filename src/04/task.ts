import { readLines } from "../helper";
import {join} from "path";

export async function runTask1(){
    const lines = await readLines(join(__dirname, "input.txt"));
    let count = 0;
    for (const line of lines){
        const [part1, part2] = line.split(",");
        const [a1, a2] = part1.split("-").map(v => parseInt(v))
        const [b1, b2] = part2.split("-").map(v => parseInt(v))
        if((a1 <= b1 && a2 >= b2)||(b1 <= a1 &&  b2 >= a2))
            count++;
    }
    console.log({count});
}

export async function runTask2(){
    const lines = await readLines(join(__dirname, "input.txt"));
    let count = 0;
    for (const line of lines){
        const [part1, part2] = line.split(",");
        const [a1, a2] = part1.split("-").map(v => parseInt(v))
        const [b1, b2] = part2.split("-").map(v => parseInt(v))
        if((a1 <= b1 && a2 >= b1) || (b1 <= a1 && b2 >= a1))
            count++;
    }
    console.log({count});
}
