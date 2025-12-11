import { instance } from ".";
import type { Task } from "../types";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const res = await instance.get('/tasks?order=created_at.desc');
        console.log('API Response:', res);
        const data: Task[] = res.data;
        return data;
    } catch (error) {
        console.error('Error is: ',error);
        throw error;
    }
}