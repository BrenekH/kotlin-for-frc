# Kotlin For FIRST Robotics Competition
[![Build Status](https://travis-ci.com/zPaw/kotlin-for-frc.svg?branch=master)](https://travis-ci.com/zPaw/kotlin-for-frc)

Kotlin for FRC is an unofficial companion extension to the official WPILib extension. It adds support for Kotlin so that FRC teams can program efficiently in their preferred JVM language.

## Features

* Easily convert Java projects created by WPILib to Kotlin ready ones
* Quickly and efficiently add the basic templates just like WPILib does for C++ and Java

## Requirements

* [WPILib](https://github.com/wpilibsuite/vscode-wpilib/releases) (2019 Version required)

## Known Issues

* None.....Yet

## Release Notes

### 1.1.1
* Fixed dependency issue that caused create new class/command here to stop working
* Fixed package auto-detection

### 1.1.0
#### Important!
* This version has been tested and approved on a robot. Use this to generate all projects going forward.
#### Changes:
* Changed Main.kt to Main.java to comply with static requirement of WPILib
* Changed main folder from kotlin to java to allow Main.java to interface with Gradle properly

### 1.0.0
* FULL RELEASE!
* Converted all templates to match WPILib templates for the 2019 FRC Season
* Implemented auto detection of package when creating new classes
* New scheme for creating new classes

### 0.4.0
* Addressed Issue #2 and added support for Iterative, Sample, and Timed Robot types

### 0.3.1
* Fixed security hole by removing flatmap-stream dependency