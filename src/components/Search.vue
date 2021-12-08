<template>
  <div class="search-container">
    <a-form-model layout="inline" :model="searchFrom" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchFrom.searchWord" placeholder="请输入关键字"></a-input>
      </a-form-model-item>

      <a-form-model-item label="商品类目">
        <a-select style="width: 120px" @change="handleChange" allowClear>
          <a-select-option v-for="item in data" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchFrom: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  
  methods: {
    handleSubmit(e) {
      this.$emit('submit', this.searchFrom);
    },
    handleChange(val) {
      this.searchFrom.category = val;
    },
  },
};
</script>

<style lang="less">
.search-container {
  padding: 10px 30px;
}
</style>
