<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
            <CheckSquare :size="24" stroke-width="2.5" />
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight text-gray-900">TaskY</span>
            <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Manager</span>
          </div>
        </router-link>

        <nav class="flex items-center gap-3">

          <router-link 
            to="/add-task" 
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95"
          >
            <Plus :size="18" stroke-width="2.5" />
            <span class="hidden sm:inline">New Task</span>
          </router-link>

          <div class="hidden md:flex items-center gap-2 pl-4 ml-2 border-l border-gray-200">
             <div class="flex flex-col items-end">
                <span class="text-[10px] text-gray-400 font-bold uppercase">Visible</span>
                <span class="text-sm font-bold text-gray-900 leading-none">{{ taskStore.tasks.length }}</span>
             </div>
             <div class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <Layers :size="16" />
             </div>
          </div>

        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTasksStore } from '../stores/taskStore';
import { CheckSquare, Plus, Layers } from 'lucide-vue-next';

const taskStore = useTasksStore();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

header {
   font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>