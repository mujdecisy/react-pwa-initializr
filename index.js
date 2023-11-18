#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectNameKebab = process.argv[2];
if (!projectNameKebab) {
  console.error("Please provide a project name with kebab-case.");
  process.exit(1);
}
const projectNamePascal = projectNameKebab
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("");
const projectNameSpaces = projectNameKebab
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
const projectNameFirstLetter = projectNameKebab.slice(0,1).toUpperCase();

function createDirectoryContents(templatePath, projectPath) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      contents = contents.replace(/<<projectNameKebab>>/g, projectNameKebab);
      contents = contents.replace(/<<projectNamePascal>>/g, projectNamePascal);
      contents = contents.replace(/<<projectNameSpaces>>/g, projectNameSpaces);
      contents = contents.replace(/<<projectNameFirstLetter>>/g, projectNameFirstLetter);
      const writePath = path.join(projectPath, file);
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(projectPath, file));
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectPath, file)
      );
    }
  });
}

const projectRootPath = path.join(process.cwd(), projectNameKebab);
fs.mkdirSync(projectRootPath);

createDirectoryContents(path.join(__dirname, "template"), projectRootPath);
fs.rename(
  path.join(projectRootPath, "gitignore"),
  path.join(projectRootPath, ".gitignore"),
  () => {}
);
