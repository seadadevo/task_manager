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
          <h1 class="text-2xl font-bold text-gray-900">New Task</h1>
          <p class="text-sm text-gray-500">Create a new task to stay organized</p>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] shadow-2xs border border-gray-100 p-6 sm:p-10">
        
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
                placeholder="What needs to be done?"
                :class="{ 'border-red-300 bg-red-50 text-red-900': errors.title }"
              />
            </div>
            <span v-if="errors.title" class="text-red-500 text-xs ml-1 flex items-center gap-1">
              <AlertCircle :size="12" /> {{ errors.title }}
            </span>
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
                :class="{ 'border-red-300 bg-red-50 text-red-900': errors.category_id }"
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
            <span v-if="errors.category_id" class="text-red-500 text-xs ml-1 flex items-center gap-1">
              <AlertCircle :size="12" /> {{ errors.category_id }}
            </span>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700 ml-1">Description</label>
            <textarea 
              v-model="form.description"
              rows="4"
              class="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
              placeholder="Add details about your task..."
            ></textarea>
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
              class="flex-1 py-3 px-6 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-900/20 flex justify-center items-center gap-2"
            >
              <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isSubmitting ? 'Creating...' : 'Create Task' }}
            </button>
          </div>

        </form>    
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTasksStore } from '../stores/taskStore';
import { useCategoryStore } from '../stores/categoryStore';
import type { IAddTask } from '../types';
import { useToast } from 'vue-toastification';
import { ArrowLeft, Type, Layers, Flag, Calendar, AlertCircle, ChevronDown } from 'lucide-vue-next';

const router = useRouter()
const taskStore = useTasksStore();
const categoryStore = useCategoryStore();
const toast = useToast();

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

onMounted(async () => {
    if(categoryStore.categories.length === 0) {
        await categoryStore.fetchCategories();
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

const handleSubmit = async () => {
    if(!validate()) return;

    isSubmitting.value = true;
    try{
        await taskStore.addTask(form);
        toast.success('Task created successfully!');
        router.push('/')
    } catch(err) {
        console.error(err)
        toast.error('Failed to create task');
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

div, input, select, textarea, button {
   font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>