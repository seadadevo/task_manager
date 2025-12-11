<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Edit Task</h1>

    <div v-if="isLoadingData" class="text-center py-10">
        <p class="text-gray-500">Loading ...</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input 
          v-model="form.title" 
          type="text" 
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter task title..."
        />
       </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          v-model="form.category_id"
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
          <option :value="0" disabled>Select a category</option>
          <option 
            v-for="cat in categoryStore.categories" 
            :key="cat.id"
            :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          v-model="form.description"
          rows="3"
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Add task details...">
        </textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            v-model="form.priority"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input 
            type="date"
            v-model="form.due_date"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
       
       <div class="flex gap-4 pt-4">
        <button 
          type="button" 
          @click="$router.push('/')"
          class="flex-1 py-2 px-4 border border-gray-300 rounded-md  text-gray-700"
        >
          Cancel
        </button>
        
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="flex-1 py-2 px-4 bg-green-600 text-white rounded-md  disabled:opacity-50"
        >
          {{ isSubmitting ? 'Updating...' : 'Update Task' }}
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTasksStore } from '../stores/taskStore';
import { useCategoryStore } from '../stores/categoryStore';
import type { IAddTask } from '../types';
import { useToast } from 'vue-toastification';


const router = useRouter();
const route = useRoute();

const taskStore = useTasksStore();
const categoryStore = useCategoryStore();
const toast = useToast();


const isSubmitting = ref(false);
const isLoadingData = ref(true); 
const taskId = Number(route.params.id);

const form = reactive<IAddTask>({
  title: '',
  description: '',
  category_id: 0,
  priority: 'medium',
  due_date: '',
});

onMounted(async () => {
    
    if (categoryStore.categories.length === 0) {
        await categoryStore.fetchCategories();
    }

    const task = await taskStore.getSingleTask(taskId);
    
    if (task) {
        form.title = task.title;
        form.description = task.description || ''; 
        form.category_id = task.category_id;
        form.priority = task.priority;
        form.due_date = task.due_date || ''; 
    } else {
        toast.error('Task not found!');
        router.push('/');
    }
    
    isLoadingData.value = false;
});
const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await taskStore.updateTaskDetails(taskId, form);
    toast.success('Task updated successfully!');
    router.push('/');
  } catch (err) {
    console.error(err)
    toast.error('Failed to update task');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>

</style>