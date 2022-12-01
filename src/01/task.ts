import {readLines} from "../helper";
import {join} from "path";

export async function runTask1(showResult = true) {
    const lines = await readLines(join(__dirname, "input.txt"));
    let currentIndex = 0;
    const calories: number[] = [];
    for (const line of lines) {
        if (line === "") currentIndex++
        else calories[currentIndex] = (calories[currentIndex] ?? 0) + parseInt(line);
    }
    if (showResult)
        console.log(Math.max(...calories));
    return calories;
}

export async function runTask2() {
    const calories = await runTask1(false);
    let maxCalories: number[] = [0, 0, 0];
    for (const calorie of calories) {
        const min = Math.min(...maxCalories);
        if (calorie < min) continue;
        const index = maxCalories.indexOf(min);
        if (index >= 0)
            maxCalories[index] = calorie;
    }
    console.log(maxCalories.reduce((r, v) => r + v));
}