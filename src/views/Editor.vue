<template>
  <el-container class="editor">
    <el-aside class="aside-left">
      <component-list @on-template-click="onTemplateClick" />
    </el-aside>
    <el-main class="main">
      <editor-component-wrapper
        v-for="comp in editorComponents"
        :key="comp.id"
        :id="comp.id"
        :active="!!activeComponent && activeComponent.id === comp.id"
        @onWrapperClick="handleComponentClick"
        @onComponentRemove="handleComponentRemove"
      >
        <component :is="comp.type" v-bind="comp.props" />
      </editor-component-wrapper>
    </el-main>
    <el-aside class="aside-right">
      <pre>{{ activeComponent && activeComponent.props }}</pre>
      <ComponentMap
        v-if="activeComponent"
        v-bind:props="activeComponent.props"
        @onChange="handleComponentValueChange"
      />
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ElContainer, ElAside, ElMain } from "element-plus";
import { useStore } from "vuex";
import { GlobalStore, EditorComponent } from "../store/types";
import ComponentList from "../components/ComponentList.vue";
import EditorComponentWrapper from "../components/EditorComponentWrapper.vue";
import ComponentMap from "../components/ComponentMap.vue";

export default defineComponent({
  components: {
    ElContainer,
    ElAside,
    ElMain,
    ComponentList,
    EditorComponentWrapper,
    ComponentMap,
  },
  setup() {
    const store = useStore<GlobalStore>();
    const editorComponents = computed(() => store.state.editor.components);
    const activeComponent = computed<EditorComponent | null>(
      () => store.getters.activeComponent
    );

    const onTemplateClick = (componentOption: EditorComponent["props"]) => {
      store.commit("addComponent", componentOption);
    };

    const handleComponentClick = (id: string) => {
      store.commit("setActive", id);
    };

    const handleComponentRemove = (id: string) => {
      store.commit("removeComponent", id);
    };

    const handleComponentValueChange = (key: string, value: any) => {
      console.log(key, value)
      store.commit("updateComponent", {key, value})
    }

    console.log(activeComponent.value && activeComponent.value.props);

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

<style>
.editor {
  display: flex;
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
  width: 276px;
}
.main {
  width: calc(100% - 328px - 276px);
  background-color: #eef2f8;
  height: 100%;
}
</style>
