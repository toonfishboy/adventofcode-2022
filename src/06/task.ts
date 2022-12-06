import {readLines} from "../helper";
import {join} from "path";

async function readMarker(markerLength: number){
    const lines = await readLines(join(__dirname, "input.txt"));
    const input = lines[0];
    let marker: string[] = [];
    for (let index = 0; index < input.length; index++) {
        const char = input[index];
        if (!marker.includes(char)) {
            marker.push(char);
            if (marker.length >= markerLength) {
                console.log(index + 1);
                break;
            }
        } else {
            const valueIndex = marker.indexOf(char);
            marker.splice(0, valueIndex + 1);
            marker.push(char);
        }
    }
    console.log(marker);
}

export async function runTask1() {
    await readMarker(4);
}

export async function runTask2() {
    await readMarker(14);
}