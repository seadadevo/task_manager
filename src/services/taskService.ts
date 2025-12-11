import { instance } from ".";
import type { Task } from "../types";

export const getTasks = async (page: number = 1, limit: number = 6 ): Promise<Task[]> => {

    const offset = (page - 1) * limit;
    try {
        const res = await instance.get(`/tasks?order=created_at.desc&limit=${limit}&offset=${offset}`);
        console.log('API Response:', res);
        const data: Task[] = res.data;
        return data;
    } catch (error) {
        console.error('Error is: ',error);
        throw error;
    }
}