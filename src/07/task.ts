import {readLines} from "../helper";
import {join} from "path";

type File = {
    size: number;
    name: string;
}

type Directory = {
    name: string;
    directories: Directory[];
    files: File[];
}

export async function runTask1() {
    const lines = await readLines(join(__dirname, "input.txt"));

    let directories: Directory = {
        name: "/",
        directories: [],
        files: []
    };
    let path: string | undefined = "";
    let displayContent = false;

    const findDirectory = () => {
        const paths = path.split(":").slice(1);
        let currentDirectory: Directory = directories;
        paths.forEach(route => {
            const nextIndex = currentDirectory.directories.findIndex(dir => dir.name === route);
            currentDirectory = currentDirectory.directories[nextIndex];
        });
        return currentDirectory;
    }

    const addDirectory = (dirName: string) => {
        const currentDirectory = findDirectory();
        currentDirectory.directories.push({name: dirName, directories: [], files: []});
    };

    const addFile = (file: string) => {
        const [size, name] = file.split(" ");
        const currentDirectory = findDirectory();
        currentDirectory.files.push({size: parseInt(size), name});
    };

    for (const line of lines) {
        if (line.startsWith("$ cd")) {
            displayContent = false;
            const argument = line.split("$ cd")[1].trim();
            if (argument === "..")
                path = path.split(":").slice(0, -1).join(":");
            else
                path += argument === "/" ? "/" : `:${argument}`
        } else if (line.startsWith("$ ls")) {
            displayContent = true;
        } else if (displayContent) {
            if (line.startsWith("dir"))
                addDirectory(line.split(" ")[1].trim());
            else
                addFile(line);
        }
    }

    const pathResults: {path: string, size: number}[] = [];

    let resultSize = 0;
    const calcSize = (directories: Directory[], path: string): number => {
        return directories.map(dir => {
            const fileSize = dir.files.map(f => f.size).reduce((result, value) => result += value, 0);
            const nextPath = path === "" ? dir.name : `${path}:${dir.name}`
            const dirSize = calcSize(dir.directories, nextPath);
            const completeSize = fileSize + dirSize;
            pathResults.push({path: nextPath, size: completeSize});
            if (completeSize < 100000)
                resultSize += completeSize;
            return completeSize;
        }).reduce((result, value) => result + value, 0);
    };

    calcSize([directories], "");
    console.log(`Result 1: ${resultSize}`);
    const diskSize = 70000000;
    const maxSize = Math.max(...pathResults.map(r => r.size));
    const needed = 30000000 - (diskSize - maxSize);
    let deleteSize = diskSize;
    pathResults.map(r => r.size).forEach(size => {
      if(size < deleteSize && size > needed) deleteSize = size;
    });
    console.log({deleteSize, needed});
}

export async function runTask2() {
    const lines = await readLines(join(__dirname, "input.txt"));
}