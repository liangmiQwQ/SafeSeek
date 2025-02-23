<script setup lang="ts">
import ConfigItem from './ConfigItem.vue'
</script>
<template>
  <div class="flex flex-col gap-2 p-5">
    <span class="pl-3 text-sm text-gray-500">基础配置</span>
    <div class="flex flex-wrap pb-2">
      <ConfigItem item="阻止访问" />
      <ConfigItem item="R1检查" :default-value="true" />
    </div>

    <span class="pl-3 text-sm text-gray-500">允许访问</span>
    <div class="flex flex-wrap">
      <ConfigItem item="暴力恐怖" :default-value="true" />
      <ConfigItem item="成人内容" :default-value="true" />
      <ConfigItem item="游戏内容" />
      <ConfigItem item="娱乐八卦" />
      <ConfigItem item="政治娱乐" />
      <ConfigItem item="学习无关内容" />
    </div>
  </div>
</template>
