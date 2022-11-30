use chrono::{Datelike, Utc};
use reqwest::{cookie::{Jar}, Url};
use std::{fs::{self, ReadDir}, sync::Arc};

mod argument_handler;
mod config_reader;

fn get_day_directory_name(day: u32) -> String {
    if day < 10 && day > 0 {
        return format!("src/0{}", day);
    } else {
        return format!("src/{}", day);
    }
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

    let config = config_reader::ConfigReader::new("config.json");
    let mut session_id: &str = "";
    match config.read_parameter_string("sessionId") {
        Some(value) => session_id = &value,
        None => println!("SessiondId is not set. Inputs can't be downloaded."),
    }

    if day < 1 || day > 25 {
        println!(
            "The used day is {}. This is not an advents day. Please use a day between 1 and 25.",
            day
        );
        return Ok(());
    }

    let day_directory = get_day_directory_name(day);
    let directory: ReadDir;

    match fs::read_dir(&day_directory) {
        Ok(value) => directory = value,
        Err(_why) => {
            println!("Day directory not found. Create Directory for day: {}", day);
            fs::create_dir(&day_directory).unwrap();
            directory = fs::read_dir(&day_directory).unwrap();
        }
    }
    let task_url = format!("https://adventofcode.com/{}/day/{}/input", year, day);

    let cookie = format!("session={}", session_id);
    let jar = Jar::default();
    jar.add_cookie_str(&cookie, &task_url.parse::<Url>().unwrap());

    let client = reqwest::Client::builder().cookie_provider(Arc::new(jar)).build().unwrap();
    let task = client.get(task_url).send().await?.text().await?;

    println!("Body: {:?}", task);
    Ok(())
}
