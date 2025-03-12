import {
    BaseTask,
    PriorityTask,
    RecurringTask,
    TaskStatus,
    PriorityLevel,
    TaskFrequency,
    TaskManager,
    filterTasks,
    sortTasks,
    RegularTaskManager,
    PriorityTaskManager
  } from '../src/tasks';
  
  // Mock tasks for testing
  const mockBaseTasks: BaseTask[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', status: 'pending', completed: false },
    { id: '2', title: 'Task 2', description: 'Description 2', status: 'in-progress', completed: false },
    { id: '3', title: 'Task 3', description: 'Description 3', status: 'completed', completed: true }
  ];
  
  const mockPriorityTasks: PriorityTask[] = [
    { id: '1', title: 'Priority Task 1', description: 'Description 1', status: 'pending', completed: false, priority: 'low' },
    { id: '2', title: 'Priority Task 2', description: 'Description 2', status: 'in-progress', completed: false, priority: 'medium' },
    { id: '3', title: 'Priority Task 3', description: 'Description 3', status: 'completed', completed: true, priority: 'high' },
    { id: '4', title: 'Priority Task 4', description: 'Description 4', status: 'pending', completed: false, priority: 'urgent' }
  ];
  
  const mockRecurringTasks: RecurringTask[] = [
    { id: '1', title: 'Recurring Task 1', description: 'Description 1', status: 'pending', completed: false, frequency: 'daily' },
    { id: '2', title: 'Recurring Task 2', description: 'Description 2', status: 'in-progress', completed: false, frequency: 'weekly' },
    { id: '3', title: 'Recurring Task 3', description: 'Description 3', status: 'completed', completed: true, frequency: 'monthly' }
  ];
  
  // PART 1: Test interfaces and type aliases (25%)
  describe('Interfaces and Type Aliases', () => {
    // Test that interfaces are correctly defined
    test('BaseTask interface should define basic task properties', () => {
      const task: BaseTask = mockBaseTasks[0];
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('status');
      expect(task).toHaveProperty('completed');
    });
  
    test('PriorityTask interface should extend BaseTask with priority', () => {
      const task: PriorityTask = mockPriorityTasks[0];
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('status');
      expect(task).toHaveProperty('completed');
      expect(task).toHaveProperty('priority');
    });
  
    test('RecurringTask interface should extend BaseTask with frequency', () => {
      const task: RecurringTask = mockRecurringTasks[0];
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('status');
      expect(task).toHaveProperty('completed');
      expect(task).toHaveProperty('frequency');
    });
  
    // Test that type aliases are correctly defined
    test('TaskStatus should accept valid status values', () => {
      const validStatuses: TaskStatus[] = ['pending', 'in-progress', 'completed'];
      validStatuses.forEach(status => {
        const task: BaseTask = { ...mockBaseTasks[0], status };
        expect(task.status).toBe(status);
      });
    });
  
    test('PriorityLevel should accept valid priority values', () => {
      const validPriorities: PriorityLevel[] = ['low', 'medium', 'high', 'urgent'];
      validPriorities.forEach(priority => {
        const task: PriorityTask = { ...mockPriorityTasks[0], priority };
        expect(task.priority).toBe(priority);
      });
    });
  
    test('TaskFrequency should accept valid frequency values', () => {
      const validFrequencies: TaskFrequency[] = ['daily', 'weekly', 'monthly'];
      validFrequencies.forEach(frequency => {
        const task: RecurringTask = { ...mockRecurringTasks[0], frequency };
        expect(task.frequency).toBe(frequency);
      });
    });
  });
  
  // PART 2: Test generics (25%)
  describe('Generic Functions and Classes', () => {
    // Test TaskManager generic class
    test('TaskManager should work with BaseTask', () => {
      const manager = new TaskManager<BaseTask>();
      mockBaseTasks.forEach(task => manager.addTask(task));
      expect(manager.getAllTasks()).toHaveLength(3);
    });
  
    test('TaskManager should work with PriorityTask', () => {
      const manager = new TaskManager<PriorityTask>();
      mockPriorityTasks.forEach(task => manager.addTask(task));
      expect(manager.getAllTasks()).toHaveLength(4);
    });
  
    test('TaskManager should work with RecurringTask', () => {
      const manager = new TaskManager<RecurringTask>();
      mockRecurringTasks.forEach(task => manager.addTask(task));
      expect(manager.getAllTasks()).toHaveLength(3);
    });
  
    // Test filterTasks generic function
    test('filterTasks should filter BaseTask by criteria', () => {
      const pendingTasks = filterTasks(mockBaseTasks, task => task.status === 'pending');
      expect(pendingTasks).toHaveLength(1);
      expect(pendingTasks[0].id).toBe('1');
    });
  
    test('filterTasks should filter PriorityTask by criteria', () => {
      const highPriorityTasks = filterTasks(mockPriorityTasks, task => task.priority === 'high');
      expect(highPriorityTasks).toHaveLength(1);
      expect(highPriorityTasks[0].id).toBe('3');
    });
  
    // Test sortTasks generic function
    test('sortTasks should sort tasks based on comparison function', () => {
      const sortedTasks = sortTasks(mockBaseTasks, (a, b) => a.title.localeCompare(b.title));
      expect(sortedTasks[0].title).toBe('Task 1');
      expect(sortedTasks[1].title).toBe('Task 2');
      expect(sortedTasks[2].title).toBe('Task 3');
    });
  });
  
  // PART 3: Test functionality of task managers (25%)
  describe('Task Manager Functionality', () => {
    let regularManager: RegularTaskManager;
    let priorityManager: PriorityTaskManager;
  
    beforeEach(() => {
      regularManager = new RegularTaskManager();
      mockBaseTasks.forEach(task => regularManager.addTask({...task}));
  
      priorityManager = new PriorityTaskManager();
      mockPriorityTasks.forEach(task => priorityManager.addTask({...task}));
    });
  
    // Test RegularTaskManager
    test('RegularTaskManager should add tasks', () => {
      expect(regularManager.getAllTasks()).toHaveLength(3);
    });
  
    test('RegularTaskManager should remove tasks', () => {
      regularManager.removeTask('2');
      expect(regularManager.getAllTasks()).toHaveLength(2);
      expect(regularManager.getAllTasks().find(task => task.id === '2')).toBeUndefined();
    });
  
    test('RegularTaskManager should update task status', () => {
      regularManager.updateTaskStatus('1', 'completed');
      const task = regularManager.getAllTasks().find(task => task.id === '1');
      expect(task?.status).toBe('completed');
      expect(task?.completed).toBe(true);
    });
  
    test('RegularTaskManager should filter tasks by status', () => {
      const pendingTasks = regularManager.filterByStatus('pending');
      expect(pendingTasks).toHaveLength(1);
      expect(pendingTasks[0].id).toBe('1');
    });
  
    // Test PriorityTaskManager
    test('PriorityTaskManager should add tasks', () => {
      expect(priorityManager.getAllTasks()).toHaveLength(4);
    });
  
    test('PriorityTaskManager should filter tasks by priority', () => {
      const highPriorityTasks = priorityManager.filterByPriority('high');
      expect(highPriorityTasks).toHaveLength(1);
      expect(highPriorityTasks[0].id).toBe('3');
    });
  
    test('PriorityTaskManager should get urgent tasks', () => {
      const urgentTasks = priorityManager.getUrgentTasks();
      expect(urgentTasks).toHaveLength(1);
      expect(urgentTasks[0].id).toBe('4');
    });
  });
  
  // PART 4: Test comprehensive scenarios (25%)
  describe('Comprehensive Task Management Scenarios', () => {
    test('Should handle an empty task list gracefully', () => {
      const manager = new TaskManager<BaseTask>();
      expect(manager.getAllTasks()).toHaveLength(0);
      expect(manager.filterByStatus('pending')).toHaveLength(0);
    });
  
    test('Should handle task operations in sequence', () => {
      const manager = new TaskManager<BaseTask>();
      
      // Add tasks
      manager.addTask(mockBaseTasks[0]);
      manager.addTask(mockBaseTasks[1]);
      expect(manager.getAllTasks()).toHaveLength(2);
      
      // Update a task
      manager.updateTaskStatus('1', 'in-progress');
      expect(manager.getAllTasks().find(t => t.id === '1')?.status).toBe('in-progress');
      
      // Filter tasks
      expect(manager.filterByStatus('in-progress')).toHaveLength(2);
      
      // Remove a task
      manager.removeTask('1');
      expect(manager.getAllTasks()).toHaveLength(1);
      expect(manager.getAllTasks()[0].id).toBe('2');
    });
  
    test('Should be able to mix different task types with proper type safety', () => {
      type MixedTask = BaseTask | PriorityTask | RecurringTask;
      
      // Create a function that processes any task type
      function processTask<T extends BaseTask>(task: T): string {
        let result = `Processing task ${task.title}`;
        
        if ('priority' in task) {
          result += ` with ${task.priority} priority`;
        }
        
        if ('frequency' in task) {
          result += ` recurring ${task.frequency}`;
        }
        
        return result;
      }
      
      const baseResult = processTask(mockBaseTasks[0]);
      expect(baseResult).toBe('Processing task Task 1');
      
      const priorityResult = processTask(mockPriorityTasks[0]);
      expect(priorityResult).toBe('Processing task Priority Task 1 with low priority');
      
      const recurringResult = processTask(mockRecurringTasks[0]);
      expect(recurringResult).toBe('Processing task Recurring Task 1 recurring daily');
    });
  });