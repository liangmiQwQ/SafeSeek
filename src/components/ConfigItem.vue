<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'

const value = defineModel<boolean>()

const props = defineProps<{ item: string; defaultValue?: boolean }>()
</script>

<template>
  <div class="flex w-1/2 items-center justify-between gap-2 px-3 pb-1">
    <span>
      {{ props.item }}
    </span>
    <SwitchRoot
      v-model:checked="value"
      :default-checked="props.defaultValue"
      class="relative flex h-[20px] w-[34px] cursor-default rounded-full bg-black/50 shadow-sm focus-within:outline focus-within:outline-black data-[state=checked]:bg-black"
    >
      <SwitchThumb
        class="my-auto block h-[17px] w-[17px] translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[16px]"
      />
    </SwitchRoot>
  </div>
</template>
