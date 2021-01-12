# Kotlin for FRC Changelog


## [2021.1.2](https://github.com/BrenekH/kotlin-for-frc/tree/2021.1.2) (2021-01-11)

**Implemented enhancements:**

* Much smaller .vsix by removing README GIFs that link to the online version anyway


## [2021.1.1](https://github.com/BrenekH/kotlin-for-frc/tree/2021.1.1) (2021-01-06)

**Implemented enhancements:**

* Updated templates for the 2021 FRC season [\#60](https://github.com/BrenekH/kotlin-for-frc/issues/60)

* GradleRIO version is now pulled from plugins.gradle.org, ensuring robot code is up-to-date without a new extension release [\#41](https://github.com/BrenekH/kotlin-for-frc/issues/41)

* Kotlin for FRC settings are now handled through the native VSCode API instead of a custom JSON file \(`.kotlin-for-frc/kotlin-frc-preferences.json`\) [\#55](https://github.com/BrenekH/kotlin-for-frc/issues/55)
  * New settings:
    * `kotlinForFRC.gradleRioVersion.autoUpdate` - Whether or not to automatically update the Gradle RIO Version when the Kotlin for FRC extension is loaded.
    * `kotlinForFRC.changelog.showOnUpdate` - Whether or not to show the changelog when Kotlin for FRC has been updated.
    * `kotlinForFRC.simulate.javaHome` - Defines a custom JAVA_HOME for Kotlin for FRC to use when simulating FRC Kotlin code.

* Added new command: `Kotlin-FRC: Simulate FRC Kotlin Code` [\#63](https://github.com/BrenekH/kotlin-for-frc/issues/63)
  * This command just calls the `simulateJava` gradle task but is necessary because the WPILib extension also attempts to attach a debugger, but fails because there is no Java code to attach to.

* Templates are now configurable [\#30](https://github.com/BrenekH/kotlin-for-frc/issues/30)
  * Check the [wiki page](https://github.com/BrenekH/kotlin-for-frc/wiki/Custom-Templates) for more information on how to use them.

**Fixed bugs:**

* PIDCommand needs a wrapper in order to operate properly [\#35](https://github.com/BrenekH/kotlin-for-frc/issues/35)
  * The 2021 templates include examples of using the Kotlin types `DoubleSupplier`, `BiConsumer` and others needed to use the inline PID commands.
