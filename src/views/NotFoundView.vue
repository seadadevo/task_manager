<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center bg-blue-50p-8">
    <div class="text-center">
      <div class="mb-8">
        <div class="relative inline-block">
          <h1 class="text-[150px] font-bold text-transparent bg-clip-text bg-purple-600 leading-none">
            404
          </h1>
          <div class="absolute inset-0 blur-3xl opacity-30 bg-purple-600"></div>
        </div>
      </div>

      <div class="mb-6 flex justify-center">
        <div class="p-6 bg-white rounded-full shadow-lg">
          <FileQuestion class="text-blue-600" :size="64" />
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>

     
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link 
          to="/"
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Home :size="20" />
          Go to Home
        </router-link>

        <button 
          @click="goBack"
          class="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 shadow-md"
        >
          <ArrowLeft :size="20" />
          Go Back
        </button>
      </div>

    
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Home, ArrowLeft, FileQuestion } from 'lucide-vue-next';

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};
</script>

<style scoped>


</style>
