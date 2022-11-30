use chrono::{Datelike, Utc};
use reqwest::{cookie::Jar, Url};
use std::{
    fs::{self, ReadDir},
    sync::Arc,
};

mod argument_handler;
mod config_reader;
mod input_reader;

async fn create_input(year: i32, day: u32) -> Result<(), reqwest::Error> {
    let config = config_reader::ConfigReader::new("config.json");
    let mut session_id: &str = "";
    match config.read_parameter_string("sessionId") {
        Some(value) => session_id = &value,
        None => println!("SessiondId is not set. Inputs can't be downloaded."),
    }

    if session_id.len() == 0 {
        println!("Can't request input file when no sessionId is available");
        return Ok(());
    }

    let task_url = format!("https://adventofcode.com/{}/day/{}/input", year, day);
    let cookie = format!("session={}", session_id);
    let jar = Jar::default();
    jar.add_cookie_str(&cookie, &task_url.parse::<Url>().unwrap());

    let client = reqwest::Client::builder()
        .cookie_provider(Arc::new(jar))
        .build()
        .unwrap();

    let inputs = client.get(task_url).send().await?.text().await?;
    let day_directory = input_reader::get_day_directory_name(day);
    let file_path = format!("{}/input.txt", day_directory);

    fs::write(file_path, inputs).unwrap();

    return Ok(());
}

fn create_exercise(day: u32, file_name: &str) {
    let day_directory = input_reader::get_day_directory_name(day);
    let file_path = format!("{}/{}.rs", day_directory, file_name);

    let default_exercise = "mod input_reader
    pub fn run() {
        let reader = input_reader::InputReader();
        let lines = reader.read_lines();
    }";

    fs::write(file_path, default_exercise).unwrap();
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let argument_handler = argument_handler::ArguemntHandler::new();

    let year: i32;
    match argument_handler.get_argument("year") {
        Some(value) => year = value.parse::<i32>().unwrap(),
        None => {
            let now = Utc::now();
            year = now.year();
        }
    }

    let day: u32;
    match argument_handler.get_argument("day") {
        Some(value) => day = value.parse::<u32>().unwrap(),
        None => {
            let now = Utc::now();
            day = now.day();
        }
    }

    if day < 1 || day > 25 {
        println!(
            "The used day is {}. This is not an advents day. Please use a day between 1 and 25.",
            day
        );
        return Ok(());
    }

    let day_directory = input_reader::get_day_directory_name(day);
    let directory: ReadDir;

    match fs::read_dir(&day_directory) {
        Ok(value) => directory = value,
        Err(_why) => {
            println!("Day directory not found. Create Directory for day: {}", day);
            fs::create_dir(&day_directory).unwrap();
            directory = fs::read_dir(&day_directory).unwrap();
        }
    }

    let mut has_input: bool = false;
    let mut has_exercise1: bool = false;
    let mut has_exercise2: bool = false;
    for entry in directory {
        let entry = entry.unwrap();
        let path = entry.path();
        if !path.is_file() {
            continue;
        } else if entry.file_name() == "input.txt" {
            has_input = true;
        } else if entry.file_name() == "exercise1.rs" {
            has_exercise1 = true;
        } else if entry.file_name() == "exercise2.rs" {
            has_exercise2 = true;
        }
    }

    if !has_input {
        create_input(year, day).await?;
    }

    if !has_exercise1 {
        create_exercise(day, "exercise1");
    }

    if !has_exercise2 {
        create_exercise(day, "exercise2");
    }

    Ok(())
}
