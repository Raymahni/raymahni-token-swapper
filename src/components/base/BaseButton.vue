<template>
  <button
    :disabled="disabled"
    class="mt-6 w-full px-4 py-2 text-white"
    :class="{
      'bg-gray-400 cursor-not-allowed': disabled,
      'bg-blue-600 cursor-pointer': !disabled,
    }"
  >
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
