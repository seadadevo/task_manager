import { instance } from ".";
import type { IAddTask, Task } from "../types";

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

export const updateTask = async (id: number, updates: Partial<Task>): Promise<Task> => {
    try {
        const res = await instance.patch(`/tasks?id=eq.${id}`, updates)
        return res.data[0];
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const createTask = async (task: IAddTask): Promise<Task> => {
    try {
        const res = await instance.post('/tasks', task);
        return res.data[0];
    } catch (error) {
        console.error('Error is:', error);
        throw error;
    }
}

export const getTaskById = async (id: number): Promise<Task | null> => {
    try {
        const res = await instance.get(`/tasks?id=eq.${id}`);
        if (res.data.length === 0) return null;
        return res.data[0];
    } catch (error) {
        console.error('Get Task Error:', error);
        throw error;
    }
}

export const deleteTask = async(id:number): Promise<void> => {
    try {
        await instance.delete(`/tasks?id=eq.${id}`)
    } catch (err) {
        console.error(err)
        throw err;
    }
}
