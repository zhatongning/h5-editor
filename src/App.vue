<template>
  <el-container class="app">
      <el-header  v-if="showHeader">Header</el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer  v-if="showHeader">Footer</el-footer>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElContainer, ElHeader, ElFooter, ElMain } from 'element-plus'


export default defineComponent({
  components: {
    ElContainer,
    ElHeader,
    ElFooter,
    ElMain
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


<style lang="scss">
.app {
  min-height: 100vh;
}

</style>
