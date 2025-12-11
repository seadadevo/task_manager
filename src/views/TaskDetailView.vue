<template>
  <div class="max-w-3xl mx-auto p-4 sm:p-8">
    
    <button 
      @click="$router.push('/')"
      class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      Back to Tasks
    </button>

    <div v-if="isLoading" class="animate-pulse space-y-4">
      <div class="h-64 bg-gray-200 rounded-lg w-full"></div>
      <div class="h-8 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>

    <div v-else-if="task" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      
      <div class="h-64 sm:h-80 w-full bg-gray-50 relative">
        <img 
          :src="task.image_url || anotherimage" 
          :alt="task.title"
          class="w-full h-full object-cover"
          @error="(e) => { (e.target as HTMLImageElement).src = anotherimage }"
        />
        
        <div class="absolute top-4 right-4">
           <span 
            class="px-3 py-1 rounded-full text-sm font-bold shadow-sm"
            :class="task.completed ? 'bg-green-500 text-white' : 'bg-white text-gray-700'"
           >
             {{ task.completed ? 'Completed' : 'Pending' }}
           </span>
        </div>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        
        <div>
          <div class="flex flex-wrap items-center gap-3 mb-3">
             <span 
                v-if="category"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm"
                :style="{ backgroundColor: category.color }"
              >
                <img v-if="category.icon_url" :src="category.icon_url" class="w-4 h-4 brightness-200" />
                {{ category.name }}
              </span>

              <span 
                class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border"
                :class="{
                  'bg-green-50 text-green-700 border-green-200': task.priority === 'low',
                  'bg-yellow-50 text-yellow-700 border-yellow-200': task.priority === 'medium',
                  'bg-red-50 text-red-700 border-red-200': task.priority === 'high',
                }"
              >
                {{ task.priority }} Priority
              </span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 leading-tight">{{ task.title }}</h1>
        </div>

        <div class="prose max-w-none text-gray-600">
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
            <p v-if="task.description">{{ task.description }}</p>
            <p v-else class="italic text-gray-400">No description provided.</p>
        </div>

        <div v-if="task.due_date" class="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M5.25 12h13.5" />
            </svg>
            <span class="font-medium">Due Date:</span>
            <span>{{ formatDate(task.due_date) }}</span>
        </div>

        <hr class="border-gray-100" />

        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2">
            
            <div class="flex gap-3 w-full sm:w-auto">
                <router-link 
                    :to="`/edit/${task.id}`"
                    class="flex-1 sm:flex-none text-center px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                    Edit
                </router-link>
                
                <button 
                    @click="handleDelete"
                    class="flex-1 sm:flex-none px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 font-medium transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>

      </div>
    </div>

    <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800">Task Not Found</h2>
        <p class="text-gray-500 mt-2">The task you are looking for doesn't exist or has been deleted.</p>
        <router-link to="/" class="mt-4 inline-block text-blue-600 font-medium hover:underline">Go Home</router-link>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTasksStore } from '../stores/taskStore';
import { useCategoryStore } from '../stores/categoryStore';
import type { Task, Category } from '../types';
import anotherimage from '../assets/insta.jpg'; 

const route = useRoute();
const router = useRouter();
const taskStore = useTasksStore();
const categoryStore = useCategoryStore();

const task = ref<Task | null>(null);
const isLoading = ref(true);

const taskId = Number(route.params.id);


const category = computed<Category | undefined>(() => {
    if (!task.value) return undefined;
    return categoryStore.categories.find(c => c.id === task.value?.category_id);
});


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
};


const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
        await taskStore.removeTask(taskId);
        router.push('/')
    }
};

onMounted(async () => {
    if (categoryStore.categories.length === 0) {
        await categoryStore.fetchCategories();
    }
    task.value = await taskStore.getSingleTask(taskId);
    isLoading.value = false;
});
</script>