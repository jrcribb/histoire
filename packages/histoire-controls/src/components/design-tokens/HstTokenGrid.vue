<script lang="ts">
export default {
  name: 'HstDesignTokens',
}
</script>

<script lang="ts" setup>
import { computed, withDefaults } from 'vue'
import { VTooltip as vTooltip } from 'floating-vue'
import HstCopyIcon from '../HstCopyIcon.vue'

const props = withDefaults(defineProps<{
  tokens: Record<string, string | number>
  colSize?: number
  // @TODO report eslint bug
  // eslint-disable-next-line func-call-spacing
  getName?: (key: string, value: string | number) => string
}>(), {
  colSize: 180,
  getName: null,
})

const processedTokens = computed(() => {
  const list = props.tokens
  const getName = props.getName
  return Object.entries(list).map(([key, value]) => {
    const name = getName ? getName(key, value) : key
    return {
      key,
      name,
      value: typeof value === 'string' ? value : value.toString(),
    }
  })
})

const colSizePx = computed(() => `${props.colSize}px`)
</script>

<template>
  <div class="htw-bind-col-size htw-grid htw-gap-4 htw-m-4">
    <div
      v-for="token of processedTokens"
      :key="token.key"
      class="htw-flex htw-flex-col htw-gap-2 htw-group"
    >
      <slot
        :token="token"
      />
      <div>
        <div class="htw-flex htw-gap-1">
          <pre
            v-tooltip="token.name.length > colSize / 8 ? token.name : ''"
            class="htw-my-0 htw-truncate htw-shrink"
          >{{ token.name }}</pre>
          <HstCopyIcon
            :content="token.name"
            class="htw-hidden group-hover:htw-block htw-flex-none"
          />
        </div>
        <div class="htw-flex htw-gap-1">
          <pre
            v-tooltip="token.value.length > colSize / 8 ? token.value : ''"
            class="htw-my-0 htw-opacity-50 htw-truncate htw-shrink"
          >{{ token.value }}</pre>
          <HstCopyIcon
            :content="token.value"
            class="htw-hidden group-hover:htw-block htw-flex-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.htw-bind-col-size {
  grid-template-columns: repeat(auto-fill, minmax(v-bind(colSizePx), 1fr));
}
</style>