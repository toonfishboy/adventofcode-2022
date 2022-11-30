use std::fs::File;
use std::io::Read;

pub fn get_day_directory_name(day: u32) -> String {
    if day < 10 && day > 0 {
        return format!("src/day_0{}", day);
    } else {
        return format!("src/day_{}", day);
    }
}

pub struct InputReader {
    pub day: u32,
    pub input: String,
}

impl InputReader {
    pub fn new(day: u32) -> InputReader {
        let mut file: File;
        let day_directory = get_day_directory_name(day);
        let file_name = format!("{}/input.txt", day_directory);
        match File::open(&file_name) {
            Err(why) => panic!("Error occured while trying to open {}. {}", &file_name, why),
            Ok(result) => {
                file = result;
            }
        }
        let mut content = String::new();
        match file.read_to_string(&mut content) {
            Err(why) => panic!("Couldn't read {:?}: {}", file_name, why),
            Ok(_) => {}
        };

        InputReader {
            day,
            input: content,
        }
    }

    pub fn read_lines(&self) -> Vec<String> {
        let input_lines = self.input.split("\n");
        let mut lines: Vec<String> = vec![];
        for line in input_lines {
            lines.push(line.to_string());
        }
        lines
    }
}
