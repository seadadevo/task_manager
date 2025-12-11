import { instance } from ".";
import type { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await instance.get('/categories?order=name.asc');
        console.log('Api res =>', res)
        const categories: Category[] = res.data;
        return categories;
    } catch (error) {
        console.error('Error is: ', error);
        throw error;
    }
}