import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types";

export const useCategoryStore = defineStore('categories', () => {
    
    const categories = ref<Category[]>([]);
    
    const fetchCategories = async() => {
        try {
            const data = await getCategories();
            categories.value = data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        categories, fetchCategories
    }

}) 