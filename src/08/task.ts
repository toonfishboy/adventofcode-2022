import {readLines} from "../helper";
import {join} from "path";

async function getTreeGrid(fileName: string) {
    const lines = await readLines(join(__dirname, fileName));
    let grid: number[][] = []
    lines.forEach((line, index) => {
        grid.push([]);
        line.split("").forEach(char => grid[index].push(parseInt(char)));
    });
    return grid;
}

function getTreeRows(grid: number[][], i: number, j: number) {
    const values: number[][] = [[], [], [], []];
    for (let a = 0; a < grid.length; a++) {
        if (a < i)
            values[0] = [grid[a][j], ...values[0]];
        if (a > i)
            values[1].push(grid[a][j]);
    }
    for (let b = 0; b < grid[i].length; b++) {
        if (b < j)
            values[2] = [grid[i][b], ...values[2]];
        if (b > j)
            values[3].push(grid[i][b]);
    }
    return values;
}

export async function runTask1() {
    const grid = await getTreeGrid("input.txt");
    let trees = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[i].length - 1) {
                trees++;
                continue;
            }
            const tree = grid[i][j];
            const values: number[][] = getTreeRows(grid, i, j);
            const edge = values.find(value => Math.max(...value) < tree);
            if (edge)
                trees++;
        }
    }
    console.log(trees);
}

export async function runTask2() {
    const grid = await getTreeGrid("input.txt");
    const treeDistances: number[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[i].length - 1)
                continue;
            const tree = grid[i][j];
            const values: number[][] = getTreeRows(grid, i, j);

            const distances = values.map(value => {
                let distance = 0;
                for (let i = 0; i < value.length; i++) {
                    distance++;
                    if (value[i] >= tree) break;
                }
                return distance;
            });
            treeDistances.push(distances.reduce((result, value) => result * value, 1))
        }
    }
    console.log(Math.max(...treeDistances));
}