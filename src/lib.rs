pub mod page_builders {
    pub fn build_post(html_from_markdown: String) -> String {
        format!(
            r#"<!DOCTYPE html>
<html lang="en">
  <meta
    charset="utf-8"
    content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
    name="viewport"
  />
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans"
      rel="stylesheet"
      crossorigin="anonymous"
    />

    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
      rel="stylesheet"
      crossorigin="anonymous"
    />

    <style>
      * {{
        margin: 0;
        padding: 0;
      }}
    </style>
<body>
{}
</body>
"#,
            html_from_markdown
        )
    }

    pub fn build_homepage(html_from_markdown: String, git_commit_hash: String) -> String {
        format!(
            r#"
        format!(
            r#"
<!DOCTYPE html>
<html lang="en">
  <meta
    charset="utf-8"
    content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
    name="viewport"
  />
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans"
      rel="stylesheet"
      crossorigin="anonymous"
    />

    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
      rel="stylesheet"
      crossorigin="anonymous"
    />

    <style>
      * {{
        margin: 0;
        padding: 0;
      }}
    </style>
<body>
<title>{}</title>
{}
</body>
"#,
            git_commit_hash, html_from_markdown
        )
    }
}

pub mod cli_tools {
    pub fn git_hash() -> std::string::String {
        // git describe --always --long --dirty
        let output = std::process::Command::new("git")
            .args(&["describe", "--always", "--long"])
            .output()
            .expect("git command failed - very odd");
        match String::from_utf8(output.stdout) {
            Ok(s) => s,
            _ => "".to_string(),
        }
    }
    pub fn run_tidy(path: &std::path::Path) {
        //let output = Command::new("tidy")
    }
}
