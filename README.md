# Kotlin for FIRST Robotics Competition

[![Node.js CI](https://github.com/zPaw/kotlin-for-frc/workflows/Node.js%20CI/badge.svg?branch=master&event=push)](https://github.com/zPaw/kotlin-for-frc/actions)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating/brenek.kotlin-for-frc.svg)](https://marketplace.visualstudio.com/items?itemName=brenek.kotlin-for-frc)

Kotlin for FRC is an unofficial companion extension to the WPILib extension. It adds various support features so that FRC teams can program effectively in Kotlin using Visual Studio Code.

## Features

* Easily convert new Java projects created by WPILib to Kotlin ones

![Convert Demo](https://raw.githubusercontent.com/zPaw/kotlin-for-frc/master/images/convertDemo.gif)

* Quickly generate code files from templates just like WPILib does for C++ and Java

![New Command Demo](https://raw.githubusercontent.com/zPaw/kotlin-for-frc/master/images/newCommandDemo.gif)

* Simulate Kotlin code in the FRC Sim GUI

![Simulate Kotlin Code Demo](https://raw.githubusercontent.com/zPaw/kotlin-for-frc/master/images/simulateDemo.gif)

## Known Issues

* Any existing code in the project gets deleted when converting to a Kotlin project
  * This will never be fixed because Kotlin for FRC's conversion tool is meant to be used on a fresh project, not one already worked in. If you need a tool to convert Java code to Kotlin code, try [try.kotlinlang.org](https://try.kotlinlang.org)'s Convert from Java feature.

## Contributing

Kotlin for FRC uses [GitHub Discussions](https://github.com/zPaw/kotlin-for-frc/discussions) to talk and ask questions and [GitHub Issues](https://github.com/zPaw/kotlin-for-frc/issues) to track bugs and features.

Developer information, including project structure and dependencies, can be found in [CONTRIBUTING.md](https://github.com/zPaw/kotlin-for-frc/blob/master/CONTRIBUTING.md).
