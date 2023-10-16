<template>
  <label class="mb-2 text-sm font-medium text-gray-900 sr-only">{{ label }}</label>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <font-awesome-icon icon="magnifying-glass" class="w-4 h-4 text-gray-500" />
    </div>
    <input
      class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    require: false,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
})

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement)?.value)
}
</script>
