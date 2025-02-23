<script setup lang="ts">
import { reactive } from 'vue'
import type { config } from '../type/config'

import ConfigItem from './ConfigItem.vue'

let defaultConfig: config = {
  basic: {
    block: false,
    isDeepSeekR1: true,
  },
  content: {
    terror: false,
    porn: false,
    game: true,
    stars: true,
    politics: true,
    otherButStudy: true,
  },
}

if (localStorage.getItem('config') !== null) {
  defaultConfig = JSON.parse(localStorage.getItem('config') as string)
}

const config = reactive(defaultConfig)
</script>
<template>
  <div class="flex flex-col gap-2 p-5">
    <span class="pl-3 text-sm text-gray-500">基础配置</span>
    <div class="flex flex-wrap pb-2">
      <ConfigItem item="拦截访问" />
      <ConfigItem item="R1检查" :default-value="true" />
    </div>

    <span class="pl-3 text-sm text-gray-500">允许访问</span>
    <div class="flex flex-wrap">
      <ConfigItem item="暴力恐怖" />
      <ConfigItem item="成人内容" />
      <ConfigItem item="游戏内容" :default-value="true" />
      <ConfigItem item="娱乐八卦" :default-value="true" />
      <ConfigItem item="政治娱乐" :default-value="true" />
      <ConfigItem item="学习无关内容" :default-value="true" />
    </div>
  </div>
</template>
