# C394 Lab 01 - TypeScript Type aliases, interfaces, and generics  Lab

## Overview
In this lab, you will build a simple task management system using TypeScript. You'll practice working with interfaces, type aliases, and generics. You will also get exposure to creating a node.js application that uses TypeScript, and running a test suite using Jest.
This lab is designed to help you understand how to define and use TypeScript types effectively, and how to create reusable and flexible code using generics. 

## Learning Objectives
- Build and run a typescript based node.js application.
- Implement and use TypeScript interfaces
- Create and utilize type aliases for better code readability
- Apply generics to create flexible, reusable functions
- Run the Jest test environment to verify code correctness

## Prerequisites
- Basic knowledge of TypeScript syntax
- Familiarity with npm and package management
- Understanding of JavaScript functions and objects

## Recommended reading this before starting the lab
- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Totally typescript: Type Aliases, Literals, Narrowing](https://www.totaltypescript.com/books/total-typescript-essentials/unions-literals-and-narrowing)
- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

Also useful:
- [Introduction to NPM package manager](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager)
- [Running Typescript Code with NodeJs](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager)  Note: we this repository is already set up to run typescript code with nodejs using the transpiler method.
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## Setup Instructions
1. Accept the GitHub Classroom assignment link
2. Clone your new repository to your local machinef
3. Run `npm install` to install the dependencies
4. Run `npm test` to verify that the testing environment is working
   - **Note**: Tests should fail at this point - this is expected! Your task is to implement the required functionality to make them pass.

## Project Structure
The project is set up with the following structure:
- `src/`: Contains the TypeScript source files
  - [`tasks.ts`](src/tasks.ts): The is the main file where you will implement the task management system; containing all types, interfaces, functions, and classes. **this is where you will write your code and the only file you should need to modify in the repo**
  - [`index.ts`](src/index.ts): The entry point for the demo application that uses the task management system.  This will call your code.  You should not need to modify this file.
- `test/`: Contains the Jest test files.  You should not need to modify these files.

## Building, Running, and Testing Code

The following npm scripts are available to help you build, run, and test your code:
- `npm run build`: Compiles the TypeScript code, using the `tsconfig.json` configuration file to configure the TypeScript compiler (`tsc`).  It outputs the compiled JavaScript files to the `dist/` directory.
- `npm test`: Runs the Jest test environment to verify that the code is working correctly.  The tests are defined in the `test/` directory.
- `npm start`: Runs the demo application that uses the task management system using the compiled files in `/dist`.  This will call your code.  

You should not need to modify the scripts or contents of `package.json`,`tsconfig.json`, or `jest.config.js` to complete the lab.

## Tests

The lab includes a set of tests that verify the correctness of your implementation. You can run the tests using the `npm test` command. The tests are defined in the `test/` directory and are automatically run using the Jest testing framework.  There are two test files:
- [`tasks.test.ts`](./tests/tasks.tests.ts): This is a simple set of tests **make these pass first**.
- [`system.test.ts`](./tests/system.test.ts): This is a more comprehensive set of tests that will test your implementation more thoroughly.  This is the test that is used to grade the lab **make these pass second**.

## Lab Requirements

all this code should be written in the `tasks.ts` file.  **no other files should need to be modified for this lab**.

### Part 1: Define Type Structures
1. Create interfaces for different task types:
   - `BaseTask`: Define the common properties for all tasks (id, title, description, status, completed)
   - `PriorityTask`: Extend `BaseTask` with priority information
   - `RecurringTask`: Extend `BaseTask` with frequency information

2. Create type aliases for:
   - `TaskStatus`: Representing the status of a task ("pending", "in-progress", "completed")
   - `PriorityLevel`: Representing the priority level ("low", "medium", "high", "urgent")
   - `TaskFrequency`: Representing how often a task recurs ("daily", "weekly", "monthly")

### Part 2: Implement Generic Utilities
1. Create a generic `TaskManager<T extends BaseTask>` class that can:
   - Add tasks of type T
   - Remove tasks by id
   - Update task status
   - Filter tasks by status
   - Get all tasks

Carefully read the test files to understand the shape of the classes to be implemented

2. Implement a generic `filterTasks<T extends BaseTask>` function that can filter tasks based on a provided criteria function

3. Implement a generic `sortTasks<T extends BaseTask>` function that can sort tasks based on a provided comparison function

### Part 3: Create Concrete Class Implementations
1. Create a `RegularTaskManager` that extends `TaskManager<BaseTask>`
2. Create a `PriorityTaskManager` that extends `TaskManager<PriorityTask>` with additional methods to filter by priority

so you will have the following class hierarchy
```
             TaskManager
               /       \
RegularTaskManager PriorityTaskManager
```
### Part 4: Using the Task Management System

[`index.ts`](src/index.ts) contains a simple demo application that uses the task management system. You can run this file to test your implementation.   walk through the code to understand how the task management system is used and to help you implement the required functionality in the `tasks.ts` file.

## Sample Data
A sample JSON file (`sampleTasks.json`) is provided with example tasks of each type. You can use this to test your implementation.

## Running Your Code
- `npm run build` - Compiles the TypeScript code
- `npm test` - Runs all tests
- `npm start` - Runs the demo application with the sample data
  - You can specify a different file: `npm start -- path/to/your/tasks.json`
- `npm run grade` - Runs the grading script to check your implementation against the grading criteria

## Submission Requirements
To complete this lab, you must:
1. Implement all required interfaces, type aliases, and functions
2. Pass all the provided tests
3. Push your changes to your GitHub repository
4. Submit the link to your repository

## Grading Criteria
- Correct implementation of interfaces and type aliases (1)
- Proper use of generics (1)
- Functionality of task managers and utility functions (1)
- Passing all tests (1)
- Pushed to github; `npm grade` (`npm run build &  npm test pass & npm run start`) works without errors(1)

Good luck!