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
            :props="pickPositionField(comp.props, PositionKeys).picked"
            :active="activeComponent && activeComponent.id === comp.id"
            @onWrapperClick="handleComponentClick"
            @onComponentRemove="handleComponentRemove"
            @onComponentUpdate="batchUpdate"
          >
            <component :is="comp.type" v-bind="pickPositionField(comp.props, PositionKeys).remaining" />
          </editor-component-wrapper>
          <!-- <editor-component-cursor /> -->
        </div>
      </el-main>
      <el-aside class="aside-right">
        <editor-component-table
          v-if="activeComponent"
          :key="activeComponent.id"
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
import MaterialList from "../components/MaterialList/index.vue";
import EditorComponentWrapper from "../components/EditorComponentWrapper.vue";
import EditorComponentTable from "../components/SettingList/index.vue";
import EditorComponentCursor from "../components/EditorComponentCursor.vue"
const PositionKeys = ['position', 'left', 'top']

export default defineComponent({
  components: {
    MaterialList,
    EditorComponentWrapper,
    EditorComponentCursor,
    EditorComponentTable,
  },
  methods: {
    pickPositionField(props: { [index: string]: any }, keys: string[]) {
      const result = { ...props }
      const positionProps: { [index: string]: any } = {}
      keys.forEach((key: string) => {
        positionProps[key] = props[key]
        delete props[key]
      })
      return {
        picked: positionProps,
        remaining: result
      }
    }
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

    const handleComponentClick = (options: { id: string }) => {
      store.commit("setActive", options)
    }

    const handleComponentRemove = (id: string) => {
      store.commit("removeComponent", id)
    }

    const handleComponentValueChange = (key: string, value: any) => {
      store.commit("updateComponent", {[key]: value})
    }

    const batchUpdate = (options: { [index: string]: any }) => {
      store.commit("updateComponent", options)
    }

    return {
      editorComponents,
      onTemplateClick,
      handleComponentClick,
      activeComponent,
      handleComponentRemove,
      handleComponentValueChange,
      batchUpdate,
      PositionKeys,
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
