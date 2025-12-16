<template>
  
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
  ></div>

 
  <aside
    :class="[
      'w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <div class="p-6 flex-1 overflow-y-auto min-h-0">
   
      <div class="flex justify-between items-center mb-8">
       <div>
        <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_6_877)">
            <path d="M18.0136 9.59135C18.0127 9.64899 18.0114 9.70635 18.0114 9.76399C18.0114 11.7789 18.0114 13.7938 18.0111 15.8084C18.0111 15.8655 18.0097 15.9223 18.0092 15.9857C17.9776 15.991 17.9531 15.9971 17.9284 15.999C17.8979 16.0013 17.8668 15.9999 17.8363 15.9999C16.9012 15.9999 15.9658 15.9999 15.0306 15.9999C14.9787 15.9999 14.9268 15.9976 14.868 15.9965C14.8638 15.9638 14.8589 15.9386 14.8575 15.9134C14.8559 15.8824 14.857 15.8513 14.857 15.8206C14.857 13.7879 14.857 11.7556 14.857 9.72298C14.857 9.67864 14.8575 9.6343 14.8581 9.58997L14.8545 9.59412C14.8932 9.59828 14.932 9.60632 14.9707 9.60632C15.9474 9.60687 16.9243 9.60687 17.9009 9.60632C17.9399 9.60632 17.9789 9.59994 18.0177 9.59634C18.018 9.59578 18.0136 9.59135 18.0136 9.59135Z" fill="#4A5959"/>
            <path d="M14.8583 9.58851C14.7967 9.58934 14.7355 9.591 14.6739 9.591C12.68 9.591 10.6863 9.591 8.69238 9.591C8.63605 9.591 8.57944 9.58962 8.5286 9.58879C8.49398 9.54667 8.50415 9.50538 8.50387 9.46686C8.50277 9.20554 8.50332 8.94422 8.50332 8.6829C8.50332 7.98319 8.50332 7.28321 8.5036 6.5835C8.5036 6.53112 8.49838 6.47819 8.51486 6.41972C8.54207 6.41612 8.5668 6.41113 8.59208 6.41002C8.62726 6.40836 8.66243 6.40919 8.69733 6.40919C10.6825 6.40919 12.6673 6.40919 14.6525 6.40947C14.7088 6.40947 14.766 6.40393 14.8179 6.41723C14.8506 6.4721 14.8399 6.52669 14.8399 6.57879C14.8404 7.28293 14.8404 7.98707 14.8404 8.6915C14.8404 8.94395 14.8396 9.1964 14.841 9.44885C14.8412 9.49679 14.8498 9.54473 14.8544 9.59267C14.8544 9.59294 14.8583 9.58851 14.8583 9.58851Z" fill="#4A5959"/>
            <path d="M18.0178 9.59521C18.0216 9.53812 18.0285 9.48104 18.0285 9.42395C18.0291 8.48038 18.0288 7.53709 18.0296 6.59352C18.0296 6.53699 18.0178 6.47824 18.0499 6.41922C18.0684 6.41644 18.0892 6.41062 18.1104 6.41062C20.1876 6.41007 22.2648 6.41035 24.3472 6.41035C24.3552 6.44055 24.3648 6.46466 24.367 6.4896C24.3703 6.52923 24.3684 6.56913 24.3684 6.60904C24.3684 7.53931 24.3684 8.4693 24.3684 9.39957C24.3684 9.45665 24.367 9.51401 24.3662 9.57664C24.3348 9.58246 24.3104 9.58883 24.2854 9.59077C24.2549 9.59299 24.2238 9.5916 24.1933 9.5916C22.1862 9.5916 20.1788 9.5916 18.1717 9.5916C18.1189 9.5916 18.0664 9.59133 18.0137 9.59105L18.0178 9.59521Z" fill="#4A5959"/>
            <path d="M27.52 15.9987C26.4977 15.9987 25.4793 15.9987 24.4609 15.9984C24.4442 15.9984 24.4274 15.9935 24.4041 15.9899C24.3991 15.9621 24.3928 15.9372 24.3909 15.912C24.3884 15.8812 24.3895 15.8499 24.3895 15.8192C24.3895 13.8087 24.3895 11.7982 24.3898 9.78779C24.3898 9.73126 24.3818 9.67334 24.4016 9.62678C24.4129 9.61736 24.4159 9.61376 24.4194 9.61182C24.4233 9.60988 24.4277 9.60849 24.4318 9.60849C25.4373 9.60711 26.4428 9.60572 27.448 9.60461C27.4656 9.60461 27.4832 9.60517 27.5005 9.60739C27.5087 9.60849 27.5161 9.61404 27.5296 9.62013C27.5337 9.63759 27.5414 9.65837 27.5433 9.67944C27.5461 9.71019 27.5447 9.74123 27.5447 9.77227C27.5447 11.7916 27.5447 13.8109 27.5442 15.8302C27.545 15.8821 27.5557 15.9364 27.52 15.9987Z" fill="#4A5959"/>
            <path d="M17.9939 6.37187C17.887 6.38766 15.2388 6.39792 14.9472 6.38378C14.9219 6.38267 14.8969 6.3763 14.881 6.37381C14.8703 6.36161 14.8664 6.35884 14.8645 6.35496C14.8626 6.35108 14.8618 6.34637 14.8618 6.34222C14.8604 4.26054 14.859 2.17915 14.8579 0.0974745C14.8579 0.0797393 14.8593 0.062004 14.8615 0.0445459C14.8626 0.0365096 14.8678 0.0287505 14.8749 0.0121237C14.8947 0.00879834 14.9197 0.00436453 14.9447 0.00103917C14.9577 -0.000623504 14.9711 0.000207835 14.9843 0.000207835C15.9505 0.000207835 16.9167 -6.92782e-05 17.8829 0.000484948C17.9211 0.000484948 17.9593 0.00658143 17.9881 0.00907545C17.9997 0.0220998 18.0032 0.0248709 18.0052 0.0287505C18.0071 0.0326301 18.0079 0.037341 18.0079 0.0417748C18.0093 2.12345 18.0107 4.20484 18.0118 6.28652C18.0118 6.30425 18.0107 6.32199 18.0082 6.33945C18.0065 6.3472 18.0013 6.35496 17.9939 6.37187Z" fill="#4A5959"/>
            <path d="M27.5286 0.00377796C27.536 0.0386942 27.5429 0.0597548 27.5443 0.0813696C27.5465 0.116563 27.5454 0.152311 27.5454 0.187504C27.5454 2.18937 27.5454 4.19096 27.5451 6.19282C27.5451 6.24963 27.5536 6.30782 27.5316 6.36158C27.4893 6.3904 27.4442 6.38043 27.4016 6.3807C27.1601 6.38181 26.9185 6.38126 26.677 6.38126C25.9743 6.38126 25.2717 6.38126 24.5693 6.38098C24.5174 6.38098 24.4654 6.37793 24.4083 6.37627C24.4014 6.34385 24.3929 6.31918 24.3915 6.29424C24.3888 6.25018 24.3899 6.20584 24.3899 6.16151C24.3899 4.18181 24.3899 2.20239 24.3901 0.222697C24.3901 0.156744 24.3934 0.0910686 24.3954 0.0206818C24.4267 0.0131998 24.4509 0.00405507 24.4759 0.00183817C24.5108 -0.00121008 24.5459 0.0004526 24.5811 0.0004526C25.5077 0.0004526 26.4344 0.0004526 27.3607 0.0004526C27.4129 0.000175487 27.4651 0.00239239 27.5286 0.00377796Z" fill="#4A5959"/>
          </g>
          <defs>
            <clipPath id="clip0_6_877">
              <rect width="40" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        </div>
      
        <button
          @click="$emit('close')"
          class="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Close menu"
        >
          <CloseIcon :size="24" />
        </button>
      </div>

     
      <nav class="space-y-2">
        <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100 text-gray-900">
          <DashboardIcon :size="20" stroke="black" />
          <span class="font-medium">Dashboard</span>
        </a>
        <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <TeamIcon :size="20" stroke="black" />
          <span>Team</span>
        </a>
        <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <ProjectsIcon :size="20" fill="black" />
          <span>Projects</span>
        </a>
        <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <CalendarIcon :size="20" stroke="black" />
          <span>Calendar</span>
        </a>
        <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <DocumentsIcon :size="20" stroke="black" />
          <span>Documents</span>
        </a>
        <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
          <ReportIcon :size="20" stroke="black" />
          <span>Report</span>
        </a>
      </nav>

     
      <div class="my-6 border-t border-gray-200"></div>

    
      <div class="mt-8">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">Your teams</h3>
        <div class="space-y-2">
          <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <div class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-black font-bold">D</div>
            <span>Design</span>
          </a>
          <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <div class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-black font-bold">E</div>
            <span>Engineering</span>
          </a>
        </div>
      </div>
 
      <div class="my-6 border-t border-gray-200"></div>

      
      <div class="mt-8">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">Reports</h3>
        <div class="space-y-2">
          <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <MonthToDateIcon :size="20" />
            <span>Month to Date</span>
          </a>
          <a href="#" @click="$emit('close')" class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <YearToDateIcon :size="20" />
            <span>Year to Date</span>
          </a>
        </div>
      </div>
    </div>

    <div class="p-6 border-t border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style="background-color: #E9D5FF; color: #9333EA;">
          DN
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import CloseIcon from './icons/CloseIcon.vue'
import DashboardIcon from './icons/DashboardIcon.vue'
import TeamIcon from './icons/TeamIcon.vue'
import ProjectsIcon from './icons/ProjectsIcon.vue'
import CalendarIcon from './icons/CalendarIcon.vue'
import DocumentsIcon from './icons/DocumentsIcon.vue'
import ReportIcon from './icons/ReportIcon.vue'
import MonthToDateIcon from './icons/MonthToDateIcon.vue'
import YearToDateIcon from './icons/YearToDateIcon.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

