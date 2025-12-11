<template>
  <header class="bg-blue-700 shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
      

        <router-link to="/" class="flex items-center gap-3 group">
          <div>
            <h1 class="text-4xl font-bold text-white">TaskY</h1>
          </div>
        </router-link>

        <nav class="flex items-center gap-2 sm:gap-4">
          <router-link 
            to="/" 
            class="px-4 py-2 text-white bg-white/40 rounded-lg font-medium flex items-center gap-2"
            :class="{ 'bg-white/20': $route.path === '/' }"
          >
            <Home size="24" />
            <span class="hidden sm:inline">Home</span>
          </router-link>

          <router-link 
            to="/add-task" 
            class="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium shadow-md flex items-center gap-2"
          >
            <Plus size="24"/>
            <span class="hidden sm:inline">Add Task</span>
          </router-link>

          <div class="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
           <File size="24" class=" text-white"/>
            <div class="text-white">
              <span class="font-bold text-lg">{{ taskStore.tasks.length }}</span>
              <span class="text-xs text-blue-100 ml-1">Tasks</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTasksStore } from '../stores/taskStore';
import { useRoute } from 'vue-router';
import { Home, Bell, Plus, File } from 'lucide-vue-next';
const taskStore = useTasksStore();
const $route = useRoute();
</script>

<style scoped>
</style>
