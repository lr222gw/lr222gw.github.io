---
layout: project
title:  "CPPPC - C++ Project Configurator"
date:   2024-05-26
categories: project
image: "/docs/media/gui_demo.png"
demo: "/docs/media/library_import_showcase.mp4"
demotype: "video"
---


![Example Image]({{site.baseurl}}{{ page.permalink }}/docs/media/gui_demo.png)

# Overview
CPPPC, or the C++ Project Configurator, is a Python-based GUI application designed to simplify the setup process for CMake-based C++ projects. It streamlines project creation by generating essential files like the CMakeLists.txt and organizing directories. The tool aims to be user-friendly while offering flexibility in creating various types of C++ projects, whether they're libraries or executables. It provides options to specify project details, target properties, and even allows for the inclusion of external libraries fetched from GitHub (if they use CMake). One of its standout features is its ability to parse CMake libraries to gather target names and components, aiding in project configuration. Additionally, CPPPC offers a persistent cache for configuration data, making project setup smoother by remembering key information for each project.

## Demonstration 
<!-- ![Shows the add library feature; downloads a library and configures it.]({{site.baseurl}}{{ page.permalink }}/docs/media/library_import_showcase.gif) -->
{% include video.html src="/docs/media/library_import_showcase.mp4" %}
The gif above demonstrates the process of setting up a project that requires the SFML library through the graphical user interface (GUI).
 
1. The user adds a library through the GUI by providing a custom name and a path/GitHub-Url to the library
2. The user then clicks the `Configure Libraries` button which will start the download and after that begin parsing the library for keywords. It will also set up the required directory structure and copy libraries if needed.
3. The keywords *(CMake targets and components)* are presented in a new Windows which lets the user select which targets should be linked. 
4. When done the user closes the `Configure Library` window and clicks the `Create` button, which will generate the remaining parts of the project 

To demonstrate the file structure, there's a file explorer right of the CPPPC application that is used to open the generated CMakeLists.txt file. Just to be clear, neither the file explorer or the text viewer are part of CPPPC.

#### Generation and Parsing of CMake Libraries 
Due to the nature of how CMake libraries are set up, there is not an easy way to figure out how to include them in your project *(besides reading the docs. But that would require the use of AI, which this project, as of yet, has not leveraged)*. 

So how does CPPPC manage to learn about the library and what it should generate to include it in your project?<br>
*It doesn't*. Instead, it obtains data that is likely to be required for using it with another CMake project, which then will be presented to the user in the graphical interface; in other words, CPPPC relies on the user to select targets, components *(if the library is installed and makes use of them)* and/or include directories. Once these are specified by the user, CPPPC will create the project with the user's selected library configuration.

The question remains, how does CPPPC know which targets, include-directories, and components it should present to the user?<br>
It creates a dummy CMake project whose only purpose is to include the user-specified library,  and possibly generate \*config.cmake files from `config.cmake.in` files and print all data it can find about it. This dummy project is then configured with CMake using the `--find-debug` flag. This will output a lot of information that CPPPC will parse with regex to find the library-specific info.

But that's not all! The former process also provides CPPPC with the location information of the config files. All these files will then be parsed *(using regex)* for the same type of library information. Once this process is complete, CPPPC will have done all it can to figure out what the user needs to know about the library. 



{% plantuml %}
@startuml
!theme cyborg
skinparam backgroundColor #white
skinparam DefaultFontColor purple
actor User
participant CPPPC
participant CMake
participant "Dummy CMake Project" as DummyCMake


User -> CPPPC: Provide Library Name
activate CPPPC

create DummyCMake
CPPPC -> DummyCMake: Create Dummy CMake Project

CPPPC -> CMake: Execute CMake Command \nwith --debug-find flag
activate CMake
CMake -> DummyCMake: Configure

CMake --> CPPPC: CMake Output (Logs with Paths)
deactivate CMake

CPPPC -> DummyCMake: Cleanup
destroy DummyCMake

CPPPC -> CPPPC: Parse CMake Output for configfile \nPaths and library CMake variables
CPPPC -> CPPPC: Parse Config Files with Regex to \nRetrieve Targets and Components
CPPPC --> User: Present Targets and \nComponents in GUI
deactivate CPPPC

User -> CPPPC: Select Targets to Link
activate CPPPC
CPPPC -> CPPPC: Generate CMake Project with \nSelected Library Targets
CPPPC --> User: Get Configured \nCMake-Based Project
deactivate CPPPC

@enduml
{% endplantuml %}



#### Support for Components  🧩
Some CMake libraries have split up their functionalities into components. CPPPC does its best to figure out whether this is the case and will construct the necessary find_package arguments to the best of its ability. If CPPPC fails at identifying that components are needed, it will still let you configure it through the GUI.

#### Limitations ⚠️
The only supported libraries are CMake-based projects *(i.e. have a CMakeLists.txt in its root directory)*.
However, some work has been put into importing non-CMake projects but as of now, you'll have to do some manual adjustments in the generated CMake files for your project to be compilable.


### Feature - Persistent storage and caching
This update also introduces persistent storage which will help CPPPC remember specific user settings and data parsed from libraries. 
Currently, the only user setting that is remembered each time you run CPPPC is the `local library directory path` that can be set up when adding libraries. 

#### Cached library data
Due to the nature of how CMake libraries are set up, there is no easy way to figure out how to include them in your project. 
For CPPPC to do the best of its ability, it must first gain an understanding of how to set up each library the user requests. 
This process of parsing libraries can be somewhat lengthy *(especially on Windows)*, so to avoid wasting time it will cache the results and use that for each library rather than parsing it again *(for that specific project)*. 

Besides caching library targets and components CPPPC will also avoid redownloading libraries that already exist.

