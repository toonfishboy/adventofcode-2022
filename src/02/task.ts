import {readLines} from "../helper";
import {join} from "path";

export async function runTask1() {
    const lines = await readLines(join(__dirname, "input.txt"));
    let result = 0;
    for (const round of lines) {
        const [a, b] = round.split(" ");
        if (a === "A" && b === "X")
            result += 4;
        if (a === "A" && b === "Y")
            result += 8;
        if (a === "A" && b === "Z")
            result += 3;
        if (a === "B" && b === "X")
            result += 1;
        if (a === "B" && b === "Y")
            result += 5;
        if (a === "B" && b === "Z")
            result += 9;
        if (a === "C" && b === "X")
            result += 7;
        if (a === "C" && b === "Y")
            result += 2;
        if (a === "C" && b === "Z")
            result += 6;
    }
    console.log(`Result 1: ${result}`);
}

export async function runTask2() {
    const lines = await readLines(join(__dirname, "input.txt"));
    let result = 0;
    for (const round of lines) {
        const [a, b] = round.split(" ");
        if (a === "A" && b === "X")
            result += 3;
        if (a === "A" && b === "Y")
            result += 4;
        if (a === "A" && b === "Z")
            result += 8;
        if (a === "B" && b === "X")
            result += 1;
        if (a === "B" && b === "Y")
            result += 5;
        if (a === "B" && b === "Z")
            result += 9;
        if (a === "C" && b === "X")
            result += 2;
        if (a === "C" && b === "Y")
            result += 6;
        if (a === "C" && b === "Z")
            result += 7;
    }
    console.log(`Result 2: ${result}`);
}