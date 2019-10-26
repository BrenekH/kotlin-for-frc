# Contributor Guidelines

This document contains most everything any developer would need to know to start developing Kotlin For FRC.

## Dependencies

To develop Kotlin For FRC, you will need:

* [Node.js](https://nodejs.org/en/download)
* NPM \(Included with default Node.js install\)
* [Visual Studio Code](https://code.visualstudio.com/download)

After installing the above programs, clone the repo and run `npm install` inside the kotlin-for-frc directory.

It is recommended to use Visual Studio Code to develop Kotlin For FRC, because of the deep integration built into VSCode for developing extensions.

Those who are new to writing VSCode extensions should take a look at the official API docs [here](https://code.visualstudio.com/api).
They provide an excellent starting point for understanding the structure of VSCode extensions.

## Kotlin For FRC Structure

Each file has a specific purpose.

* extension.ts - The entry point for the extension. Registers commands and performs activation logic.
* commands.ts - Where most of the logic for commands reside.
* constants.ts - A file with the constants for the project.
* file_generator.ts - Creates and shows files.
* preferences.ts - Manages the preferences that are stored in the `.kotlin-for-frc/kotlin-for-frc-preferences.json` file.
* compliance.ts - Ensures the GradleRIO version in the build.gradle file is correct and makes sure the Main.kt file is used and not Main.java.
* template_interpreter.ts - Reads the templates stored in the `src/templates` directory and adds in the variable data such as package and class names.

## Repository Structure

Kotlin For FRC uses a very similar branching method to the one described [here](https://nvie.com/posts/a-successful-git-branching-model/) with one key difference, the release branch also has an infinite lifetime.

### Branches

* master - The main branch of the repository. Should always have the newest stable release.
* release - A staging area for a new release. After develop is merged in, only bugfixes and stability improvements are committed to this branch.
* develop - Branch where all features and non-critical bugfixes are kept until the next release.
* feature branches - Feature branches are created by contributors on their own forks and machines. They stem from develop and merge back into develop when the feature is complete.
* bugfix branches - Similar to feature branches but they are often very small and merged very quickly. They fix any bugs that are in develop or the master branch.
* hotfix branches - Similar to bugfix branches but they are very severe issues. They typically stem from the master and are merged back into the master branch.

> Note: Severe issues are categorized by security holes or crashing extensions. Other bugs may be included in this definition if the need arises.

## Submitting a change

The first step to submitting a change to Kotlin For FRC, is to open up an issue on GitHub discussing what you want changed.
You should express your interest in making the change yourself if you so desire.
Creating an issue allows others to comment and help improve the ideas and changes that are being proposed.

Once your change is approved and the code is complete, you will need to submit a pull request.
A tutorial detailing how to contribute using the fork/pull request model can be found here.

Kotlin For FRC uses Travis CI, LGTM Code Analysis, and Codacy to ensure that all pull requests contribute quality code.
Any pull request will not be merged until these tools pass on the proposed code.
