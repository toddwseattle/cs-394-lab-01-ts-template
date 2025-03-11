/**
 * Task Management System
 * 
 * This file contains the types, interfaces, and implementations for a task management system.
 */

// ==========================================
// Type Aliases
// ==========================================

// Define the possible statuses for a task: TaskStatus, PriorityLevel, TaskFrequency
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

// Define the possible priority levels for a task
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

// Define the possible frequencies for a recurring task
export type TaskFrequency = 'daily' | 'weekly' | 'monthly';

// ==========================================
// Interfaces
// ==========================================

// interfaces for all tasks BaseTask, PriorityTask, RecurringTask
export interface BaseTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  completed: boolean;
}

// Interface for tasks with priority levels
export interface PriorityTask extends BaseTask {
  priority: PriorityLevel;
}

// Interface for recurring tasks
export interface RecurringTask extends BaseTask {
  frequency: TaskFrequency;
}

// ==========================================
// Task Manager Implementation
// ==========================================

// Generic TaskManager class
export class TaskManager<T extends BaseTask> {
  protected tasks: T[] = [];

  // Add a new task
  addTask(task: T): void {
    this.tasks.push(task);
  }

  // Remove a task by id
  removeTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  // Update task status
  updateTaskStatus(id: string, status: TaskStatus): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.status = status;
      task.completed = status === 'completed';
    }
  }

  // Filter tasks by status
  filterByStatus(status: TaskStatus): T[] {
    return this.tasks.filter(task => task.status === status);
  }

  // Get all tasks
  getAllTasks(): T[] {
    return [...this.tasks];
  }
}

// Specialized manager for regular tasks
export class RegularTaskManager extends TaskManager<BaseTask> {
  // You could add specialized methods here
}

// Specialized manager for priority tasks
export class PriorityTaskManager extends TaskManager<PriorityTask> {
  // Filter tasks by priority
  filterByPriority(priority: PriorityLevel): PriorityTask[] {
    return this.tasks.filter(task => task.priority === priority);
  }

  // Get urgent tasks
  getUrgentTasks(): PriorityTask[] {
    return this.filterByPriority('urgent');
  }
}

// ==========================================
// Generic Utility Functions: filterTasks, sortTasks
// ==========================================

// Generic function to filter tasks based on a criteria function
export function filterTasks<T extends BaseTask>(
  tasks: T[], 
  filterFn: (task: T) => boolean
): T[] {
  return tasks.filter(filterFn);
}

// Generic function to sort tasks based on a comparison function
export function sortTasks<T extends BaseTask>(
  tasks: T[],
  compareFn: (a: T, b: T) => number
): T[] {
  return [...tasks].sort(compareFn);
}