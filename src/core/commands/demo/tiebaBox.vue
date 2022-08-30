<template>
  <div>
    <iframe
      width="600px"
      height="600px"
      frameborder="no"
      marginwidth="0"
      marginheight="0"
      :src="videoPath"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

interface MusicBoxProps {
  word: string;
}

const props = withDefaults(defineProps<MusicBoxProps>(), {});
const { word } = toRefs(props);

const videoPath = computed(() => {
  return `https://tieba.baidu.com/f?ie=utf-8&kw=${word.value}`;
});
</script>

<style scoped></style>
