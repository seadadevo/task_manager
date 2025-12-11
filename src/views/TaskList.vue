<template>
    <div class=" p-[2rem] max-w-[1200px] my-0 mx-auto ">
        <!-- load -->
        <div  v-if="taskStore.tasks.length === 0" class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
  <div class="flex animate-pulse space-x-4">
    <div class="size-10 rounded-full bg-gray-200"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 rounded bg-gray-200"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 h-2 rounded bg-gray-200"></div>
          <div class="col-span-1 h-2 rounded bg-gray-200"></div>
        </div>
        <div class="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
</div>

        <div v-else class="tasks flex flex-col sm:flex-row items-center  gap-2 flex-wrap">
            <div v-for="task in taskStore.tasks" :key="task.id" class="task-card p-3 border border-2 border-amber-200 rounded-sm">
                <h3>{{ task.title }}</h3>
                <p>Priority: {{ task.priority }}</p>
                <p class="">description: {{ task.description?.slice(0, 10) }} ...</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTasksStore } from '../stores/taskStore';

const taskStore = useTasksStore();

onMounted(async () => {
    await taskStore.fetchTasks();
    console.log('tasks is: ', taskStore.tasks);
});
</script>

<style lang="scss" scoped>

</style>