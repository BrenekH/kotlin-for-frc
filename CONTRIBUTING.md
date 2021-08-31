# Kotlin for FRC Contributor Guidelines

This document contains most everything any developer would need to know to start developing Kotlin for FRC, also abbreviated KfF.

## Dependencies

To develop Kotlin for FRC, you will need:

- [Node.js](https://nodejs.org/en/download)
- NPM \(Included with default Node.js install\)
- [Visual Studio Code](https://code.visualstudio.com/download)

After installing the above software, clone the repo and run `npm install` inside the kotlin-for-frc directory.

It is recommended to use Visual Studio Code to develop Kotlin for FRC, because of the deep integration built into VSCode for developing extensions.

Those who are new to writing VSCode extensions should take a look at the official [API docs](https://code.visualstudio.com/api).
They provide an excellent starting point for understanding the structure of VSCode extensions.

## Kotlin for FRC Code Structure

- `src`
  - `commands` - Code related to the commands contributed by KfF.
  - `fileManipulation` - Code related to creating and reading files and working with the file system. Mostly just abstractions to make working with the VSCode API a little bit easier to use.
  - `templates` - Code related to reading and replacing items in templates.
    - `frc-kotlin` - Where the templates are actually stored
  - `test` - Unit testing files
  - `util` - Miscellaneous utilities grouped into files based on what they do.
  - `extension.ts` - The entry point for the extension. Mostly handles startup and teardown logic.
  - `constants.ts` - Constants for the project.
- `testing-workspace` - Directory used for unit tests

## Repository Structure

Kotlin for FRC uses a branching model created by Vincent Driessen described on his website [here](https://nvie.com/posts/a-successful-git-branching-model/).

### Branches

- `master` - The main branch of the repository. Should always have the newest stable release.
- `development` - Branch where all features and non-critical bugfixes are kept until the next release.
- release - Staging branches. Only bugfixes and stability improvements are committed to these branches.
- feature branches - Feature branches are created by contributors on their own forks and machines. They stem from `development` and merge back into `development` when the feature is complete.
- bugfix branches - Similar to feature branches but they are often very small and merged very quickly. They fix any bugs that are in `develop` or `master`.
- hotfix branches - Similar to bugfix branches but they are very severe issues. They typically stem from the `master` and are merged back into `master` as well as into `development`.

> Note: Severe issues are categorized by security holes or crashing extensions. Other bugs may be included in this definition if the need arises.

## Submitting a change

The first step to submitting a change to Kotlin for FRC, is to open up an issue on GitHub discussing what you want changed.
You should express your interest in making the change yourself if you so desire.
Creating an issue allows others to comment and help improve the ideas and changes that are being proposed.

Once your change is approved and the code is complete, you will need to submit a pull request.
A tutorial detailing how to contribute using the fork/pull request model can be found [here](https://reflectoring.io/github-fork-and-pull/).

Kotlin for FRC uses GitHub Actions and LGTM Code Analysis to ensure that pull requests contribute quality code.
Any pull request will not be merged until these tools pass on the proposed code.
