<template>
  <div class="p-4 sm:p-8 max-w-[1200px] my-0 mx-auto bg-gray-50 min-h-screen">
    
    <div class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
        <Filter class="text-gray-400 ml-2" :size="20" />
        <select 
            :value="taskStore.selectedCategoryId"
            @change="(e) => {
              const target = e.target as HTMLSelectElement;
              taskStore.filterByCategory(target.value ? Number(target.value) : null);
            }"
            class="px-2 py-1 bg-transparent outline-none text-gray-700 font-medium cursor-pointer"
        >
            <option :value="null">All Categories</option>
            <option 
                v-for="category in categoryStore.categories" 
                :key="category.id" 
                :value="category.id"
            >
                {{ category.name }}
            </option>
        </select>
      </div>
      
      <router-link to="/add-task" class="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2">
         <span>+ New Task</span>
      </router-link>
    </div>

    <div v-if="taskStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <div v-for="n in 3" :key="n" class="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 h-80 animate-pulse">
          <div class="flex items-center gap-3 mb-6">
             <div class="w-12 h-12 rounded-full bg-gray-200"></div>
             <div class="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
          <div class="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>
          <div class="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
          <div class="h-32 w-full bg-gray-200 rounded-2xl"></div>
       </div>
    </div>

    <div v-else-if="taskStore.error" class="text-center py-20">
       <div class="inline-block p-4 rounded-full bg-red-50 text-red-500 mb-4">⚠️</div>
       <h3 class="text-xl font-bold text-gray-800">Something went wrong</h3>
       <button @click="taskStore.fetchTasks()" class="mt-4 text-blue-600 font-medium hover:underline">Try Again</button>
    </div>

    <div v-else-if="taskStore.tasks.length === 0" class="text-center py-20">
       <div class="text-gray-300 text-6xl mb-4">📂</div>
       <p class="text-gray-500">No tasks found here.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="group bg-white rounded-[2rem] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col"
      >
        
        <div class="flex items-center justify-between mb-6">
           <div class="flex items-center gap-3">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                :style="{ backgroundColor: getInfoByCategoryId(task.category_id)?.color + '20' || '#f3f4f6' }"
              >
                 <img
                    v-if="getInfoByCategoryId(task.category_id)?.icon_url"
                    :src="getInfoByCategoryId(task.category_id)?.icon_url"
                    class="w-6 h-6 opacity-80"
                    :style="{ filter: 'grayscale(100%) brightness(0.5)' }" 
                  />
                  <span v-else class="text-xl">📁</span>
              </div>
              
              <div>
                 <h4 class="font-bold text-gray-900 leading-tight">
                    {{ getInfoByCategoryId(task.category_id)?.name || "General" }}
                 </h4>
                 <span class="text-xs text-gray-400 font-medium">
                    {{ new Date(task.created_at).toLocaleDateString() }}
                 </span>
              </div>
           </div>

           <span
              class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              :class="{
                'bg-green-100 text-green-700': task.priority === 'low',
                'bg-yellow-100 text-yellow-700': task.priority === 'medium',
                'bg-red-100 text-red-700': task.priority === 'high',
              }"
            >
              {{ task.priority }}
            </span>
        </div>

        <div class="mb-6 flex-1">
           <router-link :to="`/tasks/${task.id}`">
              <h3 class="text-lg font-bold text-gray-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                 {{ task.title }}
              </h3>
           </router-link>
           <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {{ task.description || "No description provided for this task." }}
           </p>
        </div>

        <div v-if="task.image_url" class="mb-6 rounded-2xl overflow-hidden h-40 w-full relative group-hover:opacity-90 transition-opacity">
           <router-link :to="`/tasks/${task.id}`">
             <img
                :src="task.image_url"
                class="w-full h-full object-cover"
                @error="(e) => { (e.target as HTMLImageElement).src = anotherimage }"
             />
           </router-link>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-50">
           
           <label class="flex items-center gap-2 cursor-pointer group/check">
              <div class="relative">
                 <input
                    type="checkbox"
                    :checked="task.completed"
                    @change="taskStore.toggleTaskComplete(task.id, task.completed)"
                    class="peer sr-only"
                 />
                 <div class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                 </div>
              </div>
              <span class="text-xs font-semibold text-gray-400 group-hover/check:text-gray-600 transition-colors">
                 {{ task.completed ? 'Done' : 'Pending' }}
              </span>
           </label>

           <div class="flex items-center gap-2">
              <router-link 
                 :to="`/edit/${task.id}`"
                 class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                 <Pencil :size="14" />
              </router-link>
              
              <button
                 @click="handleDelete(task.id)"
                 class="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center bg-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                 <Trash2 :size="14" />
              </button>
           </div>
        </div>

      </div>
    </div>

    <div class="flex justify-center items-center gap-4 mt-12">
        <button 
            @click="taskStore.prevPage" 
            :disabled="taskStore.currentPage === 1"
            class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-all"
        >
            <ChevronLeft :size="20" />
        </button>

        <span class="text-sm font-bold text-gray-700">Page {{ taskStore.currentPage }}</span>

        <button 
            @click="taskStore.nextPage" 
            :disabled="!taskStore.isThereMore"
            class="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 transition-all"
        >
            <ChevronRight :size="20" />
        </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTasksStore } from "../stores/taskStore";
import { useCategoryStore } from "../stores/categoryStore";
import anotherimage from "./../assets/insta.jpg";
import type { Category } from "../types";
import { useToast } from "vue-toastification";
import { Filter, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-vue-next";

const taskStore = useTasksStore();
const categoryStore = useCategoryStore();
const toast = useToast();

const getInfoByCategoryId = (categoryId: number): Category | undefined => {
  return categoryStore.categories.find((c) => c.id === categoryId);
};

const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
        try {
            await taskStore.removeTask(id);
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error('Error at deleting:', error);
            toast.error('Failed to delete task');
        }
    }
}

onMounted(async () => {
  await taskStore.fetchTasks();
  await categoryStore.fetchCategories();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.task-card, body {
   font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>