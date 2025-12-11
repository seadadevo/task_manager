<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-8">
    
    <div class="max-w-3xl mx-auto">
      
      <div class="flex items-center gap-4 mb-8">
        <button 
          @click="router.back()"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
        >
          <ArrowLeft :size="20" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Task Details</h1>
          <p class="text-sm text-gray-500">View and manage task information</p>
        </div>
      </div>

      <div v-if="isLoading" class="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm animate-pulse">
        <div class="h-64 bg-gray-200 rounded-2xl w-full mb-8"></div>
        <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div class="flex gap-4">
           <div class="h-10 w-32 bg-gray-200 rounded-lg"></div>
           <div class="h-10 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      <div v-else-if="task" class="bg-white rounded-[2rem] shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        <div class="relative h-64 sm:h-80 w-full bg-gray-100 group">
          <img 
            :src="task.image_url || anotherimage" 
            :alt="task.title"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            @error="(e) => { (e.target as HTMLImageElement).src = anotherimage }"
          />
          
          <div class="absolute top-6 right-6">
             <span 
              class="px-4 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-md border border-white/20"
              :class="task.completed ? 'bg-green-500/90 text-white' : 'bg-white/90 text-gray-800'"
             >
               {{ task.completed ? 'Completed' : 'Pending' }}
             </span>
          </div>
        </div>

        <div class="p-6 sm:p-10 space-y-8">
          
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
             
             <div class="flex items-center gap-3">
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                  :style="{ backgroundColor: category?.color + '20' || '#f3f4f6' }"
                >
                   <img v-if="category?.icon_url" :src="category.icon_url" class="w-6 h-6 opacity-80" style="filter: grayscale(100%) brightness(0.5)" />
                   <Layers v-else :size="20" class="text-gray-500" />
                </div>
                <div>
                   <p class="text-sm text-gray-500 font-medium">Category</p>
                   <p class="font-bold text-gray-900">{{ category?.name || "Uncategorized" }}</p>
                </div>
             </div>

             <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Flag :size="20" class="text-gray-500" />
                </div>
                <div>
                   <p class="text-sm text-gray-500 font-medium">Priority</p>
                   <span 
                      class="inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                      :class="{
                        'bg-green-100 text-green-700': task.priority === 'low',
                        'bg-yellow-100 text-yellow-700': task.priority === 'medium',
                        'bg-red-100 text-red-700': task.priority === 'high',
                      }"
                    >
                      {{ task.priority }}
                    </span>
                </div>
             </div>

             <div v-if="task.due_date" class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                   <Calendar :size="20" class="text-gray-500" />
                </div>
                <div>
                   <p class="text-sm text-gray-500 font-medium">Due Date</p>
                   <p class="font-bold text-gray-900">{{ formatDate(task.due_date) }}</p>
                </div>
             </div>

          </div>

          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">{{ task.title }}</h1>
            
            <div class="prose max-w-none text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                   <AlignLeft :size="16" /> Description
                </h3>
                <p v-if="task.description" class="leading-relaxed">{{ task.description }}</p>
                <p v-else class="italic text-gray-400">No description provided for this task.</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              
              <router-link 
                  :to="`/edit/${task.id}`"
                  class="flex-1 py-3 px-6 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex justify-center items-center gap-2 shadow-sm"
              >
                  <Pencil :size="18" />
                  Edit Task
              </router-link>
              
              <button 
                  @click="handleDelete"
                  class="flex-1 py-3 px-6 bg-red-50 text-red-600 border border-red-100 font-semibold rounded-xl hover:bg-red-100 hover:border-red-200 transition-all flex justify-center items-center gap-2"
              >
                  <Trash2 :size="18" />
                  Delete Task
              </button>
          </div>

        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-100">
          <div class="text-6xl mb-4">🔍</div>
          <h2 class="text-2xl font-bold text-gray-800">Task Not Found</h2>
          <p class="text-gray-500 mt-2 mb-6">The task you are looking for doesn't exist or has been deleted.</p>
          <router-link to="/" class="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
             Go Home
          </router-link>
      </div>

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
import { useToast } from 'vue-toastification';
import { ArrowLeft, Layers, Flag, Calendar, AlignLeft, Pencil, Trash2 } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const taskStore = useTasksStore();
const categoryStore = useCategoryStore();
const toast = useToast();

const task = ref<Task | null>(null);
const isLoading = ref(true);

const taskId = Number(route.params.id);

const category = computed<Category | undefined>(() => {
    if (!task.value) return undefined;
    return categoryStore.categories.find(c => c.id === task.value?.category_id);
});

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });
};

const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
        try {
            await taskStore.removeTask(taskId);
            toast.success('Task deleted successfully');
            router.push('/');
        } catch (error) {
            toast.error('Failed to delete task');
        }
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

div, h1, p, button {
   font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>