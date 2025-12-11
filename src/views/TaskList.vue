<template>
  <div class="p-8 max-w-[1200px] my-0 mx-auto">
    <!-- Filter Section -->
    <div class="mb-6 flex items-center gap-4">
      <label class="text-sm font-medium text-gray-700">Filter by Category:</label>
      <select 
            :value="taskStore.selectedCategoryId"
            @change="(e) => {
              const target = e.target as HTMLSelectElement;
              taskStore.filterByCategory(target.value ? Number(target.value) : null);
            }"
            class="p-2 border rounded-md bg-white shadow-sm outline-none"
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

    <!-- load -->
   <div v-if="taskStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       <div v-for="n in 3" :key="n" class="mx-auto w-full rounded-md border border-gray-200 p-4 shadow">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-200 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
       </div>
    </div>
    <!-- error -->
     <div v-else-if="taskStore.error" class="text-center bg-red-50 py-10 rounded-md border-red-100">
        <h3 class="text-xl font-bold text-red-700 mb-2">Oops! Something went wrong</h3>
        <p class="text-red-600 mb-6">{{ taskStore.error }}</p>
        <button 
            @click="taskStore.fetchTasks()" 
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
            Try Again
        </button>
    </div>
    <!-- no tasks -->
     <div v-else-if="taskStore.tasks.length === 0" class="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">

        <h3 class="text-xl font-medium text-gray-900 mb-2">No tasks found</h3>        
    </div>
    <!-- tasks -->
    <div v-else class="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
      <div
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="task-card w-full sm:w-80 p-4 border-l-4 rounded-lg shadow-md bg-white"
        :style="{
          borderLeftColor:
            getInfoByCategoryId(task.category_id)?.color || '#ccc',
        }"
      >
        <div class="mb-3 h-40 bg-gray-100 rounded overflow-hidden">
            <router-link :to="`/tasks/${task.id}`">
          <img
            :src="task.image_url || anotherimage"
            :alt="task.title"
            class="w-full h-full object-cover"
            @error="(e) => {
              const img = e.target as HTMLImageElement;
              img.src = anotherimage;
            }"
          />
          </router-link>
        </div>

        <div class="mb-2">
          <span
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white"
            :style="{
              backgroundColor:
                getInfoByCategoryId(task.category_id)?.color || '#6b7280',
            }"
          >
            <img
              v-if="getInfoByCategoryId(task.category_id)?.icon_url"
              :src="getInfoByCategoryId(task.category_id)?.icon_url"
              alt=""
              class="w-4 h-4"
            />
            {{ getInfoByCategoryId(task.category_id)?.name || "Unknown" }}
          </span>
        </div>
        <router-link :to="`/tasks/${task.id}`">
            <h3 class="text-lg font-semibold mb-2">{{ task.title }}</h3>
        </router-link>

        <p class="mb-2">
          <span
            class="px-2 py-1 rounded text-xs font-semibold"
            :class="{
              'bg-green-100 text-green-800': task.priority === 'low',
              'bg-yellow-100 text-yellow-800': task.priority === 'medium',
              'bg-red-100 text-red-800': task.priority === 'high',
            }"
          >
            Priority: {{ task.priority }}
          </span>
        </p>

        <p class="text-sm text-gray-600 mb-2">
          {{ task.description?.slice(0, 50) }}...
        </p>

        <!-- completed status => checkbox -->
        <label class="flex items-center gap-2 cursor-pointer">
    <input
        type="checkbox"
        :checked="task.completed"
        @change="taskStore.toggleTaskComplete(task.id, task.completed)"
        class="w-4 h-4 text-blue-600 rounded"
    />
    <span class="text-sm">
        {{ task.completed ? "Completed" : "Mark complete" }}
    </span>
</label>

    <div class="flex justify-end mt-3 border-t pt-3 gap-3">
    <button
       @click="handleDelete(task.id)"
        class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-l flex items-center gap-2"
    >
        Delete
    </button>
    
    <router-link 
        :to="`/edit/${task.id}`"
        class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg inline-flex items-center gap-2"
    >
        
        Edit
    </router-link>
</div>

      </div>
    </div>
  </div>

  <!-- ! Pagaination -->
  <div class="flex justify-center items-center gap-4 mt-8">
    <button 
        @click="taskStore.prevPage" 
        :disabled="taskStore.currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
    >
        Previous
    </button>

    <span class="font-bold">Page {{ taskStore.currentPage }}</span>

    <button 
        @click="taskStore.nextPage" 
        :disabled="!taskStore.isThereMore"
        class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
    >
        Next
    </button>
</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTasksStore } from "../stores/taskStore";
import { useCategoryStore } from "../stores/categoryStore";
import anotherimage from "./../assets/insta.jpg";
import type { Category } from "../types";
import { useToast } from "vue-toastification";

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
  console.log("tasks is: ", taskStore.tasks);
  console.log("categories is: ", categoryStore.categories);
});
</script>

<style lang="scss" scoped></style>
