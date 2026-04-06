/**
 * Task Management System
 * 
 * This file contains the types, interfaces, and implementations for a task management system.
 * Comments give hints on what needs to be implemented.
 */

// ==========================================
// Type Aliases
// ==========================================

// Define the possible statuses for a task: TaskStatus, PriorityLevel, TaskFrequency
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';
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

export interface PriorityTask extends BaseTask {
  priority: PriorityLevel;
}

export interface RecurringTask extends BaseTask {
  frequency: TaskFrequency;
}

// ==========================================
// Task Manager Implementation
// ==========================================

// Generic TaskManager class
export class TaskManager<T extends BaseTask> {
  protected tasks: T[] = [];

  addTask(task: T): void {
    this.tasks.push(task);
  }

  removeTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  getAllTasks(): T[] {
    return this.tasks;
  }

  updateTaskStatus(id: string, status: TaskStatus): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      task.completed = status === 'completed';
    }
  }

  filterByStatus(status: TaskStatus): T[] {
    return this.tasks.filter(task => task.status === status);
  }
}

// Specialized class RegularTaskManager
export class RegularTaskManager extends TaskManager<BaseTask> {}

// Specialized PriorityTaskManager
export class PriorityTaskManager extends TaskManager<PriorityTask> {
  filterByPriority(priority: PriorityLevel): PriorityTask[] {
    return this.tasks.filter(task => task.priority === priority);
  }

  getUrgentTasks(): PriorityTask[] {
    return this.filterByPriority('urgent');
  }
}

// ==========================================
// Generic Utility Functions: filterTasks, sortTasks
// ==========================================

export function filterTasks<T>(tasks: T[], criteria: (task: T) => boolean): T[] {
  return tasks.filter(criteria);
}

export function sortTasks<T>(tasks: T[], compareFn: (a: T, b: T) => number): T[] {
  return [...tasks].sort(compareFn);
}

