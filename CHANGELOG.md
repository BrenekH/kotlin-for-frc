# Kotlin for FRC Changelog

## [2022.1.2](https://github.com/BrenekH/kotlin-for-frc/releases/2022.1.2)

**Implemented enhancements:**

- Updated package versions to fix a security issue.

- Updated linter action to newest major version.

## [2022.1.1](https://github.com/BrenekH/kotlin-for-frc/releases/2022.1.1)

**Implemented enhancements:**

- Removed Old Command-based templates

- Updated templates to be compatible with 2022 WPILib

## [2021.8.1](https://github.com/BrenekH/kotlin-for-frc/releases/2021.8.1) (2021-08-30)

**Implemented enhancements:**

- Rewrote codebase to be more maintainable

- Use VS Code tasks for code simulation instead of a terminal.

- Better support for multiple workspace files

- Better support for virtual file systems

## [2021.5.1](https://github.com/BrenekH/kotlin-for-frc/releases/2021.5.1) (2021-05-09)

**Implemented enhancements:**

- Limited functionality in Untrusted Workspaces

- Disable KfF in Virtual Workspaces

- Upgrade `lodash` to mitigate possible security issue

## [2021.4.1](https://github.com/BrenekH/kotlin-for-frc/releases/2021.4.1) (2021-04-24)

**Implemented enhancements:**

- Just some various dependency upgrades to mitigate potential security issues

## [2021.2.1](https://github.com/BrenekH/kotlin-for-frc/releases/2021.2.1) (2021-02-16)

**Implemented enhancements:**

- Upgraded internal GradleRIO version to 2021.2.2

- Added the Scheduled Tags bot to GitHub repository for an enhanced deployment workflow [\#67](https://github.com/BrenekH/kotlin-for-frc/issues/67)

## [2021.1.2](https://github.com/BrenekH/kotlin-for-frc/releases/2021.1.2) (2021-01-11)

**Implemented enhancements:**

- Much smaller .vsix by removing README GIFs that link to the online version anyway

## [2021.1.1](https://github.com/BrenekH/kotlin-for-frc/releases/2021.1.1) (2021-01-06)

**Implemented enhancements:**

- Updated templates for the 2021 FRC season [\#60](https://github.com/BrenekH/kotlin-for-frc/issues/60)

- GradleRIO version is now pulled from plugins.gradle.org, ensuring robot code is up-to-date without a new extension release [\#41](https://github.com/BrenekH/kotlin-for-frc/issues/41)

- Kotlin for FRC settings are now handled through the native VSCode API instead of a custom JSON file \(`.kotlin-for-frc/kotlin-frc-preferences.json`\) [\#55](https://github.com/BrenekH/kotlin-for-frc/issues/55)

- Added new command: `Kotlin-FRC: Simulate FRC Kotlin Code` [\#63](https://github.com/BrenekH/kotlin-for-frc/issues/63)

- Templates are now configurable [\#30](https://github.com/BrenekH/kotlin-for-frc/issues/30)

**Fixed bugs:**

- PIDCommand needs a wrapper in order to operate properly [\#35](https://github.com/BrenekH/kotlin-for-frc/issues/35)

## [2020.2.1](https://github.com/BrenekH/kotlin-for-frc/releases/2020.2.1) (2020-02-22)

**Implemented enhancements:**

- Update to GradleRIO 2020.3.2

## [2020.1.1](https://github.com/BrenekH/kotlin-for-frc/releases/2020.1.1) (2020-01-06)

**Implemented enhancements:**

- New Command API [\#19](https://github.com/BrenekH/kotlin-for-frc/issues/19)
- Use github-changelog-generator for CHANGELOG.md [\#16](https://github.com/BrenekH/kotlin-for-frc/issues/16)

**Fixed bugs:**

- .kotlin-for-frc appears even when it's not needed [\#24](https://github.com/BrenekH/kotlin-for-frc/issues/24)

**Merged pull requests:**

- Development into release-2020.1.1 [\#32](https://github.com/BrenekH/kotlin-for-frc/pull/32) ([BrenekH](https://github.com/BrenekH))
- 2020 to development [\#31](https://github.com/BrenekH/kotlin-for-frc/pull/31) ([BrenekH](https://github.com/BrenekH))

## [1.5.0](https://github.com/BrenekH/kotlin-for-frc/releases/1.5.0) (2019-11-20)

**Implemented enhancements:**

- Update extension to use vscode.workspace.fs [\#17](https://github.com/BrenekH/kotlin-for-frc/issues/17)
- Remove Main.java to Main.kt [\#14](https://github.com/BrenekH/kotlin-for-frc/issues/14)

**Merged pull requests:**

- Release 1.5.0 into master [\#25](https://github.com/BrenekH/kotlin-for-frc/pull/25) ([BrenekH](https://github.com/BrenekH))
- Create CONTRIBUTING.md [\#21](https://github.com/BrenekH/kotlin-for-frc/pull/21) ([BrenekH](https://github.com/BrenekH))
- 2019 changelog merge into development branch [\#20](https://github.com/BrenekH/kotlin-for-frc/pull/20) ([BrenekH](https://github.com/BrenekH))

## 1.4.0 - 2019-06-30

- Faster extension loading times using webpack

- Actually started using the GradleRIO version updater method

- Increased the amount of the codebase covered by tests

## 1.3.0 - 2019-03-21

- When updating the GradleRIO version, the GradleRIO version is the only line that changes

- Added tests to ensure quality code

## 1.2.1 - 2019-01-22

- Changed gradle main class back to frc.robot.Main

- Added JvmStatic annotation to Main.kt

- Travis CI GitHub releases

## 1.2.0 - 2019-01-21

- Fixed Main.java not finding Robot class while linting

  - This means that Main.java is replaced by Main.kt

- Updating of GradleRio Version

- Under the hood abstraction

- New commands related to checking the integrity of the build.gradle and Main.kt files

- Travis CI integration

## 1.1.1 - 2019-01-08

- Fixed dependency issue that caused create new class/command here to stop working

- Fixed package auto-detection

## 1.1.0 - 2019-01-07

- Changed Main.kt to Main.java to comply with static requirement of WPILib

- Changed main folder from kotlin to java to allow Main.java to interface with Gradle properly

## 1.0.0 - 2019-01-04

- FULL RELEASE!

- Converted all templates to match WPILib templates for the 2019 FRC Season

- Implemented auto detection of package when creating new classes

- New scheme for creating new classes

- Added TODO for easier collection of ideas for extension development

## 0.4.0 - 2018-12-18

- Addressed Issue #2 and added support for Iterative, Sample, and Timed Robot types

## 0.3.1 - 2018-11-26

- Fixed security hole by removing flatmap-stream dependency

## 0.3.0 - 2018-11-26

- Added dialog box to clear confusion about when the conversion from Java to Kotlin was complete

## 0.2.1 - 2018-11-09

- Fixed bug where the extension would immediately crash

## 0.2.0 - 2018-11-08

- Added Icon

## 0.1.1 - 2018-11-07

- Housekeeping changes

## 0.1.0 - 2018-11-07

- Initial release
