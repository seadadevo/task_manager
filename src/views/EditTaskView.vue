<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-8">
    
    <div class="max-w-2xl mx-auto">
      
      <div class="flex items-center gap-4 mb-8">
        <button 
          @click="router.back()"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
        >
          <ArrowLeft :size="20" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Edit Task</h1>
          <p class="text-sm text-gray-500">Update task details and preferences</p>
        </div>
      </div>

      <div v-if="isLoadingData" class="flex flex-col items-center justify-center py-20">
         <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
         <p class="text-gray-500 font-medium">Loading task details...</p>
      </div>

      <div v-else class="bg-white rounded-[2rem] shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10">
        
        <form @submit.prevent="handleSubmit" class="space-y-8">
          
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700 ml-1">Task Title <span class="text-red-500">*</span></label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Type :size="18" class="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input 
                type="text"
                v-model="form.title"
                class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="Task title"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700 ml-1">Category <span class="text-red-500">*</span></label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Layers :size="18" class="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <select
                v-model="form.category_id"
                class="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option :value="0" disabled>Select a category</option>
                <option 
                  v-for="cat in categoryStore.categories" 
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                 <ChevronDown :size="16" class="text-gray-400" />
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700 ml-1">Description</label>
            <div class="relative">
                <textarea 
                v-model="form.description"
                rows="4"
                class="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                placeholder="Add details..."
                ></textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="space-y-2">
               <label class="text-sm font-semibold text-gray-700 ml-1">Priority</label>
               <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Flag :size="18" class="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <select 
                    v-model="form.priority"
                    class="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                     <ChevronDown :size="16" class="text-gray-400" />
                  </div>
               </div>
            </div>

            <div class="space-y-2">
               <label class="text-sm font-semibold text-gray-700 ml-1">Due Date</label>
               <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar :size="18" class="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input 
                    type="date"
                    v-model="form.due_date"
                    class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all cursor-pointer"
                  />
               </div>
            </div>
          </div>

          <hr class="border-gray-100" />

          <div class="flex gap-4 pt-2">
            <button
              type="button"
              @click="router.push('/')"
              class="flex-1 py-3 px-6 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2"
            >
              <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <Save v-else :size="18" />
              {{ isSubmitting ? 'Updating...' : 'Save Changes' }}
            </button>
          </div>

        </form>    
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTasksStore } from '../stores/taskStore';
import { useCategoryStore } from '../stores/categoryStore';
import type { IAddTask } from '../types';
import { useToast } from 'vue-toastification';
import { ArrowLeft, Type, Layers, Flag, Calendar, ChevronDown, Save } from 'lucide-vue-next';

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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

div, input, select, textarea, button {
   font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>