import { instance } from ".";
import type { Task } from "../types";

export const getTasks = async (page: number = 1, limit: number = 6, categoryId?: number | null): Promise<Task[]> => {
    const offset = (page - 1) * limit;
    
    let url = `/tasks?order=created_at.desc&limit=${limit}&offset=${offset}`;
    //  category_id=eq.1 => category_id=eq.categoryId
    if (categoryId) {
        url += `&category_id=eq.${categoryId}`;
    }

    try {
        const res = await instance.get(url);
        return res.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}