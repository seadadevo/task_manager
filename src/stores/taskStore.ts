import { defineStore } from "pinia";
import { ref } from "vue";
import { getTasks } from "../services/taskService";
import type { Task } from "../types";

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);
    
    const currentPage = ref(1);
    const limit = ref(6);
    const isThereMore = ref(true);
    const selectedCategoryId = ref<number | null>(null); 

    const fetchTasks = async () => {
        try {
            const data = await getTasks(currentPage.value, limit.value, selectedCategoryId.value);
            
            if (data.length < limit.value) {
                isThereMore.value = false;
            } else {
                isThereMore.value = true;
            }

            tasks.value = data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
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

    return {
        tasks,
        currentPage,
        isThereMore,
        selectedCategoryId, 
        filterByCategory, 
        fetchTasks,
        nextPage,
        prevPage
    }
})