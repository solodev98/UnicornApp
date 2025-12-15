<template>
  <aside class="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 overflow-y-auto">
    <div class="p-6">
      <!-- Logo/Icon -->
      <div class="mb-8">
        <div class="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white font-bold text-xl">
          H
        </div>
      </div>

      <!-- Main Navigation -->
      <nav class="space-y-2">
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 text-gray-900">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Dashboard</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Team</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Projects</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Calendar</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Documents</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Report</span>
        </a>
      </nav>

      <!-- Your Teams Section -->
      <div class="mt-8">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">Your teams</h3>
        <div class="space-y-2">
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-semibold">D</div>
            <span>D Design</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-semibold">E</div>
            <span>E Engineering</span>
          </a>
        </div>
      </div>

      <!-- Reports Section -->
      <div class="mt-8">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">Reports</h3>
        <div class="space-y-2">
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Month to Date</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Year to Date</span>
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Sidebar component - static navigation
</script>

