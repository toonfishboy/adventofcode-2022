import {readLines} from "../helper";
import {join} from "path";

export async function runTask1() {
    const lines = await readLines(join(__dirname, "input.txt"));
    let hX = 0, hY = 0, tX = 0, tY = 0;
    let visited: string[] = ["0:0"];
    const getTPos = () => `${tX}:${tY}`;
    lines.forEach(line => {
        const [direction, count] = line.split(" ");
        for (let i = 0; i < parseInt(count); i++) {
            switch (direction) {
                case "R":
                    hX++;
                    break;
                case "U":
                    hY--;
                    break;
                case "L":
                    hX--;
                    break;
                case "D":
                    hY++;
                    break;
            }
            if (Math.abs(hX - tX) === 2 || Math.abs(hY - tY) === 2) {
                if (Math.abs(hX - tX) === 2) {
                    tX += hX > tX ? 1 : -1;
                    tY = hY;
                }
                if (Math.abs(hY - tY) === 2) {
                    tY += hY > tY ? 1 : -1;
                    tX = hX;
                }
                if (!visited.includes(getTPos()))
                    visited.push(getTPos());
            }
        }
    });
    console.log(visited.length);
}

type Pos = {
    x: number;
    y: number;
}

export async function runTask2() {
    const lines = await readLines(join(__dirname, "example.txt"));
    const knots: Pos[] = new Array(10).fill(0).map(_ => ({x: 0, y: 0}));
    const getTPos = (knot: Pos) => `${knot.x}:${knot.y}`;

    let visited: string[] = ["0:0"];
    lines.slice(0,2).forEach(line => {
        const [direction, count] = line.split(" ");
        for (let j = 0; j < parseInt(count); j++) {
            for (let i = knots.length - 1; i >= 0; i--) {
                if (i === 0) break;
                const knot1 = knots[i - 1];
                const knot2 = knots[i];
                if (i === knots.length - 1) {
                    switch (direction) {
                        case "R":
                            knot2.x++;
                            break;
                        case "U":
                            knot2.y--;
                            break;
                        case "L":
                            knot2.x--;
                            break;
                        case "D":
                            knot2.y++;
                            break;
                    }
                }
                if (Math.abs(knot2.x - knot1.x) === 2 || Math.abs(knot2.y - knot1.y) === 2) {
                    if (Math.abs(knot2.x - knot1.x) === 2) {
                        knot1.x += knot2.x > knot1.x ? 1 : -1;
                        knot1.y = knot2.y;
                    }
                    if (Math.abs(knot2.y - knot1.y) === 2) {
                        knot1.y += knot2.y > knot1.y ? 1 : -1;
                        knot1.x = knot2.x;
                    }
                    if (!visited.includes(getTPos(knot1)) && i === 1)
                        visited.push(getTPos(knot1));
                }
            }
        }
    });
    console.log(visited);
    console.log(visited.length);
}
