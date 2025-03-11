/**
 * Entry point for the Task Management System
 * 
 * This file demonstrates how to use the task management system.
 * It accepts a file path to a JSON file containing tasks as a command-line argument.
 * 
 * Usage: ts-node src/index.ts <path-to-tasks-file>
 * Example: ts-node src/index.ts ./sampleTasks.json
 */

import fs from 'fs';
import path from 'path';
import {
  BaseTask,
  PriorityTask,
  RecurringTask,
  TaskManager,
  RegularTaskManager,
  PriorityTaskManager,
  filterTasks,
  sortTasks
} from './tasks';

// Type for the tasks file
interface TasksFile {
  regularTasks: BaseTask[];
  priorityTasks: PriorityTask[];
  recurringTasks: RecurringTask[];
}

// Function to load tasks from a JSON file
function loadTasksFromFile(filePath: string): TasksFile {
  try {
    // Resolve the path relative to the current directory
    const resolvedPath = path.resolve(filePath);
    // Read and parse the JSON file
    const fileContents = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(fileContents) as TasksFile;
  } catch (error) {
    console.error(`Error loading tasks from ${filePath}:`, error);
    // Return empty task lists if file can't be loaded
    return {
      regularTasks: [],
      priorityTasks: [],
      recurringTasks: []
    };
  }
}

// Main function to run the task management demo
function runTaskManagement(filePath: string) {
  console.log(`Task Management System - Loading from ${filePath}`);
  console.log("-------------------------------------------------");

  // Load tasks from the specified file
  const { regularTasks, priorityTasks, recurringTasks } = loadTasksFromFile(filePath);

  // Create task managers
  const regularManager = new RegularTaskManager();
  const priorityManager = new PriorityTaskManager();
  const recurringManager = new TaskManager<RecurringTask>();

  // Add tasks to managers
  regularTasks.forEach(task => regularManager.addTask(task));
  priorityTasks.forEach(task => priorityManager.addTask(task));
  recurringTasks.forEach(task => recurringManager.addTask(task));

  // Display task statistics
  console.log("\nTask Statistics:");
  console.log(`Regular Tasks: ${regularManager.getAllTasks().length}`);
  console.log(`Priority Tasks: ${priorityManager.getAllTasks().length}`);
  console.log(`Recurring Tasks: ${recurringManager.getAllTasks().length}`);

  // Demonstrate task management
  console.log("\nTask Status Breakdown:");
  console.log(`Pending: ${regularManager.filterByStatus('pending').length}`);
  console.log(`In Progress: ${regularManager.filterByStatus('in-progress').length}`);
  console.log(`Completed: ${regularManager.filterByStatus('completed').length}`);

  // Show priority breakdown
  console.log("\nPriority Breakdown:");
  console.log(`Urgent: ${priorityManager.filterByPriority('urgent').length}`);
  console.log(`High: ${priorityManager.filterByPriority('high').length}`);
  console.log(`Medium: ${priorityManager.filterByPriority('medium').length}`);
  console.log(`Low: ${priorityManager.filterByPriority('low').length}`);

  // Example operations
  console.log("\nDemonstrating Task Operations:");
  
  // Find and mark a task as in-progress
  const pendingTasks = regularManager.filterByStatus('pending');
  if (pendingTasks.length > 0) {
    const taskId = pendingTasks[0].id;
    console.log(`Moving task ${taskId} to in-progress...`);
    regularManager.updateTaskStatus(taskId, 'in-progress');
  }

  // Find a high priority task
  const highPriorityTasks = priorityManager.filterByPriority('high');
  if (highPriorityTasks.length > 0) {
    console.log("\nHigh Priority Tasks That Need Attention:");
    highPriorityTasks.forEach(task => {
      console.log(`- ${task.title}: ${task.description}`);
    });
  }

  // Using generic utility functions
  console.log("\nTasks Sorted by Title:");
  const allTasks = [...regularManager.getAllTasks(), ...priorityManager.getAllTasks()];
  const sortedTasks = sortTasks(allTasks, (a, b) => a.title.localeCompare(b.title));
  sortedTasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.title}`);
  });

  // Filter tasks containing a specific keyword
  const keyword = "report";
  console.log(`\nTasks Containing "${keyword}":`);
  const keywordTasks = filterTasks(allTasks, task => 
    task.title.toLowerCase().includes(keyword) || 
    task.description.toLowerCase().includes(keyword)
  );
  
  if (keywordTasks.length > 0) {
    keywordTasks.forEach(task => {
      console.log(`- ${task.title}`);
    });
  } else {
    console.log("No tasks found with that keyword.");
  }
}

// Get the file path from command line arguments
const filePath = process.argv[2] || './sampleTasks.json';

// Run the task management system
runTaskManagement(filePath);