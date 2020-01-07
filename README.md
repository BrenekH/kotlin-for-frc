# Kotlin For FIRST Robotics Competition

[![Build Status](https://travis-ci.com/zPaw/kotlin-for-frc.svg?branch=master)](https://travis-ci.com/zPaw/kotlin-for-frc)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating/brenek.kotlin-for-frc.svg)](https://marketplace.visualstudio.com/items?itemName=brenek.kotlin-for-frc)

Kotlin for FRC is an unofficial companion extension to the official WPILib extension. It adds support for Kotlin so that FRC teams can program efficiently in their preferred JVM language.

## Features

* Easily convert Java projects created by WPILib to Kotlin ready ones
* Quickly and efficiently add the basic templates just like WPILib does for C++ and Java

## Requirements

* [WPILib](https://github.com/wpilibsuite/vscode-wpilib/releases) (2019 Version required)

## Known Issues

* None.....Yet

## Release Notes

### 1.5.0
* Fast-forwarded auto-show changelog from 2020
* Added Toggle Auto-Show Changelog, Show Changelog, and Reset Auto-Show Changelog commands
* Added contributing guidelines
* Added issue templates
* Fixed various security issues by updating dependencies

### 1.4.0

* Faster extension loading times using webpack

* Actually started using the GradleRIO version updater method

* Increased the amount of the codebase covered by tests

### 1.3.0

* When updating the GradleRIO version, the GradleRIO version is the only line that changes

* Added tests to ensure quality code

### 1.2.1

* Changed gradle main class back to frc.robot.Main

* Added JvmStatic annotation to Main.kt

* Travis CI GitHub releases

### 1.2.0

* Fixed Main.java not finding Robot class while linting
  * This means that Main.java is replaced by Main.kt
  
* Updating of GradleRio Version

* Under the hood abstraction

* New commands related to checking the integrity of the build.gradle and Main.kt files

* Travis CI integration

### 1.1.1

* Fixed dependency issue that caused create new class/command here to stop working

* Fixed package auto-detection

### 1.1.0

#### Important

* This version has been tested and approved on a robot. Use this to generate all projects going forward.

#### Changes

* Changed Main.kt to Main.java to comply with static requirement of WPILib

* Changed main folder from kotlin to java to allow Main.java to interface with Gradle properly

### 1.0.0

* FULL RELEASE!

* Converted all templates to match WPILib templates for the 2019 FRC Season

* Implemented auto detection of package when creating new classes

* New scheme for creating new classes
