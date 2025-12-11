import { defineStore } from "pinia";
import { ref } from "vue";
import { getTasks } from "../services/taskService";
import type { Task } from "../types";

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            console.log('data is => ', data);
            tasks.value = data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        tasks,
        fetchTasks
    }
}) 