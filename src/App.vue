<template>
  <el-container class="app">
    <div class="header" v-if="showHeader">Header</div>
    <div class="app-content">
      <router-view />
    </div>
    <el-footer  v-if="showHeader">Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElContainer, ElFooter } from 'element-plus'


export default defineComponent({
  components: {
    ElContainer,
    ElFooter,
  },
  setup() {
    const router = useRoute()
    const showHeader = computed(() => router.meta?.showHeaderAndFooter)

    return {
      showHeader
    }
  },
})
</script>


<style lang="scss" scoped>
.app {
  min-height: 100vh;
}
.app-content {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
}
</style>
