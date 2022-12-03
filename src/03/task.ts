import { readLines } from "../helper";
import {join} from "path";

function getStringValues(values: string[]){
    return values.map(char => {
        const byte = char.charCodeAt(0);
        return char === char.toLowerCase() ? byte - 96: byte - 38;
    }).reduce((a,b) => a + b);
}

export async function runTask1(){
    const lines = await readLines(join(__dirname, "input.txt"));
    const items:string[] = [];
    for(const line of lines){
        const half = line.length/2;
        const part1 = line.slice(0, half);
        const part2 = line.slice(half);
        for(const char of part1.split("")){
            if(part2.includes(char)){
                items.push(char);
                break;
            }
        }
    }
    const result = getStringValues(items);
    console.log(result);
}

export async function runTask2(){
    const lines = await readLines(join(__dirname, "input.txt"));
    const badges: string[][] = [];
    lines.forEach((line,index) => {
        if(index % 3 === 0)
            badges.push([]);
        const lastBadge = badges[badges.length -1];
        lastBadge.push(line);
    });
    const values:string[] = [];
    badges.forEach(badge => {
        for (const char of badge[0].split("")){
            if(badge.slice(1).filter(line => !line.includes(char)).length === 0) {
                values.push(char);
                break;
            }
        }
    });
    const result = getStringValues(values);
    console.log(result);
}
