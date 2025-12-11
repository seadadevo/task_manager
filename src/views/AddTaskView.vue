<template>
    <div class="max-w-2xl mx-auto p-6 rounded-lg shadow-md mt-10">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">Add Task</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label class="block test-sm font-medium text-gray-800 mb-1">Title *</label>
                <input type="text"
                v-model = "form.title"
                class= "w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder="add title.."
                >
                <span v-if="errors.title" class="text-red-500 text-sm">{{errors.title}}</span>
            </div>
            <div>
                <label class="block test-sm font-medium text-gray-800 mb-1">Category *</label>
                <select
                v-model="form.category_id"
                class="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                <option :value="0" disabled>Select a category</option>
                <option 
                v-for="cat in categoryStore.categories" :key="cat.id"
                :value="cat.id">{{ cat.name }}</option>
                </select>
                <span v-if="errors.category_id" class="text-red-500 text-sm">{{errors.category_id}}</span>
            </div>

            <div>
                <label class="block test-sm font-medium text-gray-800 mb-1">Description</label>
                <textarea 
                v-model="form.description"
                rows="3"
                class="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="add details...">
                </textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block test-sm font-medium text-gray-800 mb-1">Priority</label>
                    <select 
                    v-model="form.priority"
                    class="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label class="block test-sm font-medium text-gray-800 mb-1">Due Date</label>
                    <input type="date"
                    v-model="form.due_date"
                    class="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    >
                </div>
            </div>


            <div class="flex gap-4 pt-4">
                <button
                type="button"
                @click="router.push('/')"
                class="flex-1 py-2 px-4 border border-gray-300 rounded-md">
                Cancel
                </button>

                <button
                type="submit"
                class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md  disabled:opacity-50 flex justify-center items-center gap-2">
                <span v-if="isSubmitting" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isSubmitting ? 'loading..' : 'Add Task' }}
                </button>
            </div>

        </form>    
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    import {  useRouter } from 'vue-router';
    import { useTasksStore } from '../stores/taskStore';
    import { useCategoryStore } from '../stores/categoryStore';
    import type { IAddTask } from '../types';

    const router = useRouter()
    const taskStore = useTasksStore();
    const categoryStore = useCategoryStore();

    const isSubmitting = ref(false);

    const form = reactive<IAddTask>({
        title: '',
        description: '',
        category_id: 0, 
        priority: 'low',
        due_date: '',
    })

    const errors = reactive({
        title: '',
        category_id: ''
    });
    onMounted(() => {
        if(categoryStore.categories.length === 0) {
            categoryStore.fetchCategories();
        }
    })

    const validate = () => {
        let isItValid = true;
        errors.title = '';
        errors.category_id = '';
        
        if(!form.title.trim()) {
            errors.title = 'Title is required';
            isItValid = false;
        }
        if(!form.category_id || form.category_id === 0 ) {
            errors.category_id = 'Category is required';
            isItValid = false;
        }

        return isItValid;
    }


    const  handleSubmit =async () => {
        if(!validate()) return;

        isSubmitting.value = true;
        try{
            await taskStore.addTask(form);
            router.push('/')
        } catch(err) {
            console.error(err)
        } finally {
            isSubmitting.value = false;
        }
    }
</script>

<style lang="scss" scoped>

</style>