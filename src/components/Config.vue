<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { ref } from 'vue'

const switchState = ref(false)
</script>
<template>
  <div class="p-5">
    <label
      class="pr-[15px] text-[15px] leading-none select-none"
      for="airplane-mode"
    >
      女子亻尔
    </label>
    <SwitchRoot
      v-model:checked="switchState"
      class="relative flex h-[25px] w-[42px] cursor-default rounded-full bg-black/50 shadow-sm focus-within:outline focus-within:outline-black data-[state=checked]:bg-black"
    >
      <SwitchThumb
        class="my-auto block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </SwitchRoot>
  </div>
</template>
