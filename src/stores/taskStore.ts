import { defineStore } from "pinia";
import { ref } from "vue";
import { getTasks } from "../services/taskService";
import type { Task } from "../types";

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);

    const currectPage = ref(1);
    const limit = ref(6);
    const isThereMore = ref(true);
    const fetchTasks = async () => {
        try {
            const data = await getTasks(currectPage.value, limit.value);
            if(data.length < limit.value) {
                isThereMore.value = false;
            } else {
                isThereMore.value = true;
            }
            tasks.value = data;
        } catch (error) {
            console.error(error);
        }
    }

    const nextPage = () => {
        if(isThereMore.value) {
            currectPage.value++;
            fetchTasks();
        }
    }
    const prevPage = () => {
        if(currectPage.value > 1) {
            currectPage.value--;
            fetchTasks();
            isThereMore.value = true;
        }
    }

    return {
        tasks,
        fetchTasks,
        currectPage,
        isThereMore,
        nextPage,
        prevPage
    }
}) 