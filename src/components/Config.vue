<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { config } from '../type/config'

import ConfigItem from './ConfigItem.vue'

chrome.storage.sync.get('config', (result) => {
  if (result !== null && result !== undefined) {
    if (
      result.config !== null &&
      result.config !== undefined &&
      result.config !== ''
    ) {
      config.basic = JSON.parse(result.config).basic
      config.content = JSON.parse(result.config).content
    }
  }
})

const config = reactive<config>({
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
})

watch(config, (value) => {
  chrome.storage.sync.set({ config: JSON.stringify(value) }, () => {
    alert('设置完毕')
  })
})
</script>
<template>
  <div class="flex flex-col gap-2 p-5">
    <span class="pl-3 text-sm text-gray-500">基础配置</span>
    <div class="flex flex-wrap pb-2">
      <ConfigItem item="拦截访问" v-model:model-value="config.basic.block" />
      <ConfigItem
        item="R1检查"
        :default-value="true"
        v-model:model-value="config.basic.isDeepSeekR1"
      />
    </div>

    <span class="pl-3 text-sm text-gray-500">允许访问</span>
    <div class="flex flex-wrap">
      <ConfigItem item="暴力恐怖" v-model:model-value="config.content.terror" />
      <ConfigItem item="成人内容" v-model:model-value="config.content.porn" />
      <ConfigItem
        item="游戏内容"
        :default-value="true"
        v-model:model-value="config.content.game"
      />
      <ConfigItem
        item="娱乐八卦"
        :default-value="true"
        v-model:model-value="config.content.stars"
      />
      <ConfigItem
        item="政治娱乐"
        :default-value="true"
        v-model:model-value="config.content.politics"
      />
      <ConfigItem
        item="学习无关内容"
        :default-value="true"
        v-model:model-value="config.content.otherButStudy"
      />
    </div>
  </div>
</template>
