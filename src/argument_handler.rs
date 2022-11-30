use std::collections::HashMap;
use std::env;

pub struct ArguemntHandler {
    pub args: Vec<String>,
    pub arg_map: HashMap<String, String>,
}

impl ArguemntHandler {
    pub fn new() -> ArguemntHandler {
        let args: Vec<String> = env::args().collect();

        let mut arg_map: HashMap<String, String> = HashMap::new();

        for argument in args.as_slice() {
            let entry: Vec<&str> = argument.split("=").collect();
            let key = entry[0];
            if !key.starts_with("--") {
                continue;
            }
            let map_key: Vec<&str> = key.split("--").collect();
            arg_map.insert(map_key[1].to_string(), entry[1].to_string());
        }

        ArguemntHandler { args, arg_map }
    }
    pub fn get_argument(&self, name: &str) -> Option<&String> {
        self.arg_map.get(name)
    }
}
