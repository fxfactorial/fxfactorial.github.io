extern crate pulldown_cmark;

use fxfactorial_blog::{cli_tools, page_builders};
use pulldown_cmark::{html, Options, Parser};
use std::ffi::OsStr;
use std::io::{Error, ErrorKind};
use std::{fs, io};

const SITE_GEN_DIR: &'static str = "site";

fn build_site() -> io::Result<()> {
    let mut entries = fs::read_dir("./blog-posts")?
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>()?;

    entries.sort();

    let index_md = std::path::Path::new("index.md");
    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);

    match fs::create_dir(SITE_GEN_DIR) {
        Err(ref e) if e.kind() == io::ErrorKind::AlreadyExists => {}
        Ok(_) => {}
        e => return e,
    };

    for each in entries {
        match each.to_str() {
            Some("./blog-posts/index.md") => {
                //
            }
            Some(_) => {
                let content = fs::read_to_string(each.join(&index_md))?;
                let parser = Parser::new_ext(&content, options);
                let mut html_output: String = String::with_capacity(content.len() * 3 / 2);
                html::push_html(&mut html_output, parser);
                let post = page_builders::build_post(html_output);
                match each.file_name().and_then(OsStr::to_str) {
                    None => {
                        return Err(Error::new(ErrorKind::Other, "could not get filename base"))
                    }
                    Some(s) => {
                        match fs::create_dir(format!("{}/{}", SITE_GEN_DIR, s)) {
                            Err(ref e) if e.kind() == io::ErrorKind::AlreadyExists => {}
                            Ok(_) => {}
                            e => return e,
                        };
                        let gen_path = std::path::Path::new(SITE_GEN_DIR)
                            .join(s)
                            .join("index.html");
                        println!("{}", gen_path.display());
                        fs::write(&gen_path, post)?;
                        cli_tools::run_tidy(&gen_path)
                    }
                }
            }
            _ => println!("{:?}", each),
        }
    }
    Ok(())
}

fn main() {
    match build_site() {
        Ok(_) => {
            // println!("Success case!");
        }
        Err(reason) => println!("Error: {:#?}", reason),
    }
}
