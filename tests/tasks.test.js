"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("../src/tasks");
describe('Task Management System', () => {
    // Sample data for testing
    const sampleTasks = [
        {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            status: 'pending',
            completed: false
        },
        {
            id: '2',
            title: 'Task 2',
            description: 'Description 2',
            status: 'in-progress',
            completed: false
        }
    ];
    const samplePriorityTasks = [
        {
            id: '3',
            title: 'Priority Task 1',
            description: 'Description 3',
            status: 'pending',
            completed: false,
            priority: 'high'
        },
        {
            id: '4',
            title: 'Priority Task 2',
            description: 'Description 4',
            status: 'pending',
            completed: false,
            priority: 'medium'
        }
    ];
    // Basic functionality tests
    describe('TaskManager', () => {
        let manager;
        beforeEach(() => {
            manager = new tasks_1.TaskManager();
            sampleTasks.forEach(task => manager.addTask(Object.assign({}, task)));
        });
        test('should add tasks correctly', () => {
            expect(manager.getAllTasks()).toHaveLength(2);
        });
        test('should remove tasks by id', () => {
            manager.removeTask('1');
            expect(manager.getAllTasks()).toHaveLength(1);
            expect(manager.getAllTasks()[0].id).toBe('2');
        });
        test('should update task status', () => {
            manager.updateTaskStatus('1', 'completed');
            const task = manager.getAllTasks().find(t => t.id === '1');
            expect(task === null || task === void 0 ? void 0 : task.status).toBe('completed');
            expect(task === null || task === void 0 ? void 0 : task.completed).toBe(true);
        });
        test('should filter tasks by status', () => {
            const pendingTasks = manager.filterByStatus('pending');
            expect(pendingTasks).toHaveLength(1);
            expect(pendingTasks[0].id).toBe('1');
        });
    });
    // You can add more test suites here for other components
    // of your task management system
});
