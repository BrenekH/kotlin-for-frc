# Contributor Guidelines

## Dependencies

To run Kotlin For FRC, you will need:

* [Node.js](https://nodejs.org/en/download)
* NPM \(Included with Node.js install\)
* [Visual Studio Code](https://code.visualstudio.com/download)

After installing the above programs, clone the repo and run `npm install` inside the kotlin-for-frc directory.

It is recommended to use Visual Studio Code to develop Kotlin For FRC, because of the deep integration built into VSCode for developing extensions.

Those who are new to writing VSCode extensions should take a look at the official API docs [here](https://code.visualstudio.com/api).
They provide an excellent starting point for understanding the structure of VSCode extensions.

## Kotlin For FRC Structure

Each file has a specific purpose.

* extension.ts - The entry point for the extension. Registers commands and performs activation logic.
* commands.ts - Where most of the logic for commands reside.
* constants.ts - A file with constants that aren't specific to any file.
* file_generator.ts - Creates and shows files.
* preferences.ts - Manages the preferences that are stored in the `.kotlin-for-frc/kotlin-for-frc-preferences.json` file.
* compliance.ts - Ensures the GradleRIO version in the build.gradle file is correct and makes sure the Main.kt file is used and not Main.java.
* template_interpreter.ts - Reads the templates stored in the `src/templates` directory and adds in the variable data such as package and class names.
