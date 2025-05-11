<script setup lang="ts">
import { onMounted, ref, type ButtonHTMLAttributes, type Ref } from 'vue';

interface Props {
  disabled?: boolean;
  iconName?: string;
  buttonType?: ButtonHTMLAttributes['type'];
  loading?: boolean;
  onlyIcon?: boolean;
  colorIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  iconName: undefined,
  buttonType: 'button' as ButtonHTMLAttributes['type'],
  loading: false,
  colorIcon: undefined,
  onlyIcon: false,
});

const svgContent: Ref<string> = ref('');

/*
 * Function to load the SVG icon dynamically based on the iconName prop.
 * It replaces the width, height, and fill attributes in the SVG string.
 */
const loadSVG = async () => {
  try {
    const svgModule = await import(`@/assets/icons/${props.iconName}.svg?raw`);
    let svgText = svgModule.default;
    svgText = svgText.replace(/width="[^"]*"/, `width="${props.onlyIcon ? 26 : 22}px"`);
    svgText = svgText.replace(/height="[^"]*"/, `height="${props.onlyIcon ? 26 : 22}px"`);
    svgText = svgText.replace(/fill="[^"]*"/, 'fill="currentColor"');

    svgContent.value = svgText;
  } catch (error) {
    console.error('Error fetching SVG:', error);
  }
};

onMounted(() => {
  if (props.iconName) loadSVG();
});
</script>

<template>
  <button
    class="disabled:bg-grey-200 flex items-center justify-center gap-2 rounded-full text-lg font-bold text-white disabled:cursor-not-allowed"
    :class="{
      'cursor-not-allowed opacity-30': props.loading,
      'hover:bg-grey-200 !size-11 w-auto bg-neutral-100 p-2': props.onlyIcon,
      'bg-primary hover:bg-secondary px-5 py-3': !props.onlyIcon,
    }"
    :disabled="props.disabled || props.loading"
    :type="props.buttonType"
  >
    <i class="spinner" v-if="props.loading" />
    <i v-if="svgContent && !props.loading" v-html="svgContent" :class="props.colorIcon" />

    <span v-if="props.loading">Cargando</span>
    <span v-else-if="!props.onlyIcon">
      <slot />
    </span>
  </button>
</template>
