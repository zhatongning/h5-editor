<template>
  <el-container class="editor">
    <el-header class="header"></el-header>
    <el-container class="content">
      <el-aside class="aside-left">
        <material-list @on-template-click="onTemplateClick" />
      </el-aside>
      <el-main class="main">
        <div class="editor-page">
          <editor-component-wrapper
            v-for="comp in editorComponents"
            :key="comp.id"
            :id="comp.id"
            @onWrapperClick="handleComponentClick"
            @onComponentRemove="handleComponentRemove"
          >
            <component :is="comp.type" v-bind="comp.props" />
          </editor-component-wrapper>
          <editor-component-cursor />
        </div>
      </el-main>
      <el-aside class="aside-right">
        <pre>{{ activeComponent && activeComponent.props }}</pre>
        <editor-component-table
          v-if="activeComponent"
          v-bind:props="activeComponent.props"
          @onChange="handleComponentValueChange"
        />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalStore, EditorComponent } from "../store/types";
import { CursorRect } from "@/types/editors"
import MaterialList from "../components/MaterialList/index.vue";
import EditorComponentWrapper from "../components/EditorComponentWrapper.vue";
import EditorComponentTable from "../components/EditorComponentTable.vue";
import EditorComponentCursor from "../components/EditorComponentCursor.vue"

export default defineComponent({
  components: {
    MaterialList,
    EditorComponentWrapper,
    EditorComponentCursor,
    EditorComponentTable,
  },
  setup() {
    const store = useStore<GlobalStore>()
    const editorComponents = computed(() => store.state.editor.components)
    const activeComponent = computed<EditorComponent | null>(
      () => store.getters.activeComponent
    )

    const onTemplateClick = (componentOption: EditorComponent["props"]) => {
      store.commit("addComponent", componentOption)
    }

    const handleComponentClick = (options: { id: string, componentRect: CursorRect }) => {
      store.commit("setActive", options)
    }

    const handleComponentRemove = (id: string) => {
      store.commit("removeComponent", id)
    }

    const handleComponentValueChange = (key: string, value: any ) => {
      store.commit("updateComponent", {key, value})
    }

    return {
      editorComponents,
      onTemplateClick,
      handleComponentClick,
      activeComponent,
      handleComponentRemove,
      handleComponentValueChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
}
.content {
  display: flex;
  justify-content: center;
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #ffffff;
}
.aside-left {
  width: 328px;
}
.aside-right {
  width: 340px;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eef2f8;
}

.editor-page {
  position: relative;
  width: 375px;
  height: 667px;
  background-color: #ffffff;
}
</style>
