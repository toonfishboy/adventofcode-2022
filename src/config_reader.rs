use serde_json::Value;
use std::fs::File;
use std::io::Read;

pub struct ConfigReader {
    pub config_file: Value,
}

impl ConfigReader {
    pub fn new(file_name: &str) -> ConfigReader {
        let mut file: File;
        match File::open(file_name) {
            Err(why) => panic!("Error occured while trying to open {}. {}", file_name, why),
            Ok(result) => {
                file = result;
            }
        }
        let mut content = String::new();
        match file.read_to_string(&mut content) {
            Err(why) => panic!("Couldn't read {:?}: {}", file_name, why),
            Ok(_) => {}
        };
        let config_file: Value;
        match serde_json::from_str(&content) {
            Err(why) => panic!("Failed to parse config file as valid json. {}", why),
            Ok(value) => config_file = value,
        }

        ConfigReader {
            config_file: config_file,
        }
    }

    pub fn read_parameter(&self, parameter_name: &str) -> &Value {
        let value = &self.config_file[parameter_name];
        value
    }

    pub fn read_parameter_string(&self, parameter_name: &str) -> Option<&str> {
        let value = self.read_parameter(parameter_name);
        match value.as_str() {
            Some(result) => Some(result),
            None => None,
        }
    }

    pub fn read_parameter_array(&self, parameter_name: &str) -> Option<&Vec<Value>> {
        let value = self.read_parameter(parameter_name);
        match value.as_array() {
            Some(result) => Some(result),
            None => None,
        }
    }

    pub fn read_string_array(&self, parameter_name: &str) -> Option<Vec<&str>> {
        let values = self.read_parameter_array(parameter_name);
        match values {
            Some(array) => {
                let mut result: Vec<&str> = vec![];
                for element in array {
                    if element.is_string() {
                        result.push(element.as_str().unwrap());
                    }
                }
                Some(result)
            }
            None => None,
        }
    }
}
