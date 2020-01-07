## 1.4.0 - 2019-06-30

* Faster extension loading times using webpack

* Actually started using the GradleRIO version updater method

* Increased the amount of the codebase covered by tests

## 1.3.0 - 2019-03-21

* When updating the GradleRIO version, the GradleRIO version is the only line that changes

* Added tests to ensure quality code

## 1.2.1 - 2019-01-22

* Changed gradle main class back to frc.robot.Main

* Added JvmStatic annotation to Main.kt

* Travis CI GitHub releases

## 1.2.0 - 2019-01-21

* Fixed Main.java not finding Robot class while linting
  * This means that Main.java is replaced by Main.kt

* Updating of GradleRio Version

* Under the hood abstraction

* New commands related to checking the integrity of the build.gradle and Main.kt files

* Travis CI integration

## 1.1.1 - 2019-01-08

* Fixed dependency issue that caused create new class/command here to stop working

* Fixed package auto-detection

## 1.1.0 - 2019-01-07

* Changed Main.kt to Main.java to comply with static requirement of WPILib

* Changed main folder from kotlin to java to allow Main.java to interface with Gradle properly

## 1.0.0 - 2019-01-04

* FULL RELEASE!

* Converted all templates to match WPILib templates for the 2019 FRC Season

* Implemented auto detection of package when creating new classes

* New scheme for creating new classes

* Added TODO for easier collection of ideas for extension development

## 0.4.0 - 2018-12-18

* Addressed Issue #2 and added support for Iterative, Sample, and Timed Robot types

## 0.3.1 - 2018-11-26

* Fixed security hole by removing flatmap-stream dependency

## 0.3.0 - 2018-11-26

* Added dialog box to clear confusion about when the conversion from Java to Kotlin was complete

## 0.2.1 - 2018-11-09

* Fixed bug where the extension would immediately crash

## 0.2.0 - 2018-11-08

* Added Icon

## 0.1.1 - 2018-11-07

* Housekeeping changes

## 0.1.0 - 2018-11-07

* Initial release
