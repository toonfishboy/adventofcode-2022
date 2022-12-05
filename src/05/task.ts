import {readLines} from "../helper";
import {join} from "path";

async function getStacks(){
    const lines = await readLines(join(__dirname, "input.txt"), false);
    const values = lines.filter(line => !!line);
    const stackIndex = values.findIndex(line => !isNaN(parseInt(line.trim()[0])));
    const stackDefinition = values[stackIndex];
    const stackPositions: number[] = [];
    stackDefinition.split("").forEach((char, index) => {
        const value = parseInt(char);
        if (!isNaN(value) && value > 0)
            stackPositions.push(index);
    });
    const stacks: string[][] = [];
    stackPositions.forEach((position, index) => {
        if (!stacks[index])
            stacks[index] = [];
        values.slice(0, stackIndex).forEach(line => {
            stacks[index].push(line[position] ?? "");
        });
    });
    const editStacks = stacks.map(stack => stack.filter(v => !!v.trim()));
    return {values, editStacks, stackIndex};
}

export async function runTask1() {
   const {values, stackIndex, editStacks} = await getStacks();
    values.slice(stackIndex + 1).forEach((value, index) => {
        const [count, start, end] = value.match(/\d+/g).map(v => parseInt(v));
        const take = editStacks[start - 1].splice(0, count).reverse();
        editStacks[end - 1] = [...take, ...editStacks[end - 1]]
    });
    const result = editStacks.map(stack => stack[0]).join("");
    console.log(result);
}

export async function runTask2() {
    const {values, stackIndex, editStacks} = await getStacks();
    values.slice(stackIndex + 1).forEach((value, index) => {
        const [count, start, end] = value.match(/\d+/g).map(v => parseInt(v));
        const take = editStacks[start - 1].splice(0, count);
        editStacks[end - 1] = [...take, ...editStacks[end - 1]]
    });
    const result = editStacks.map(stack => stack[0]).join("");
    console.log(result);
}
