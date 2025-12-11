import { defineStore } from "pinia";
import { ref } from "vue";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../services/taskService";
import type { IAddTask, Task } from "../types";
import { useToast } from "vue-toastification";

export const useTasksStore = defineStore('tasks', () => {
    const toast = useToast();
    const tasks = ref<Task[]>([]);
    
    const isLoading = ref(false);
    const error = ref<string | null>(null);


    const currentPage = ref(1);
    const limit = ref(6);
    const isThereMore = ref(true);
    const selectedCategoryId = ref<number | null>(null); 

    const fetchTasks = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await getTasks(currentPage.value, limit.value, selectedCategoryId.value);
            
            if (data.length < limit.value) {
                isThereMore.value = false;
            } else {
                isThereMore.value = true;
            }

            tasks.value = data;
        } catch (err) {
            console.error('Error fetching tasks:', err);
            error.value = 'faild to load tasks. check your connection!'
        } finally {
            isLoading.value = false;
        }
    }
    // null => ALL
    const filterByCategory = (id: number | null) => {
        selectedCategoryId.value = id;
        currentPage.value = 1; 
        isThereMore.value = true;
        fetchTasks();
    }

    const nextPage = () => {
        if (isThereMore.value) {
            currentPage.value++;
            fetchTasks();
        }
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
            fetchTasks();
            isThereMore.value = true;
        }
    }

    const toggleTaskComplete = async (taskId: number, currentStatus: boolean) => {
        const task = tasks.value.find(t => t.id === taskId);
        if(task) {
            const newStatus = !currentStatus;
            task.completed = newStatus;

            try {
                await updateTask(taskId, { completed: newStatus })
                toast.success(newStatus ? 'Task marked as completed!' : 'Task marked as incomplete!');
            } catch (error) {
                task.completed = currentStatus; 
                console.error(error);
                toast.error('Failed to update task status');
            }
        }
    }

    const addTask = async (newTask: IAddTask) => {
        try {
            await createTask(newTask)
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const updateTaskDetails = async (id: number, updates: IAddTask) => {
        try {
            await updateTask(id, updates);
            const index = tasks.value.findIndex(t => t.id === id);
            if (index !== -1) {
                tasks.value[index] = { 
                    ...tasks.value[index], 
                    title: updates.title,
                    description: updates.description,
                    priority: updates.priority || 'medium',
                    category_id: updates.category_id,
                    due_date: updates.due_date,
                    image_url: updates.image_url
                };
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const getSingleTask = async (id: number): Promise<Task | null> => {
      const existingTask = tasks.value.find(t => t.id === id);
        if (existingTask) return existingTask;
        return await getTaskById(id);
    }

    const removeTask = async(id:number) => {
        try {
            await deleteTask(id);
            tasks.value = tasks.value.filter(t => t.id !== id);
        } catch (err) {
            console.error(err)
        }
    }
    return {
        tasks,
        isLoading,
        error,
        currentPage,
        isThereMore,
        selectedCategoryId, 
        filterByCategory, 
        fetchTasks,
        nextPage,
        prevPage,
        toggleTaskComplete,
        addTask,
        updateTaskDetails,
        getSingleTask,
        removeTask
    }
})