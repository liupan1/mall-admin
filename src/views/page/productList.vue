<template>
  <div class="product-list-container">
    <Search :data="categoryList" @submit="handleSubmit" />
    <a-button class="product-add-btn">
      <router-link :to="{name: 'ProductAdd'}">添加商品</router-link>
    </a-button>
    <ProductTable :data="data" @removeProduct="removeProduct" @editProduct="editProduct" />
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import { list } from '@/api/category.js';
import ProductTable from '@/components/productTable.vue';
import { getProduct, removeProduct } from '@/api/product.js';

export default {
  components: {
    Search,
    ProductTable,
  },
  data() {
    return {
      searchForm: {},
      categoryList: [],
      data: [],
      categoryObj: {},
    };
  },
  async created() {
    await list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    handleSubmit(data) {
      this.searchForm = data;
      this.getTableData();
    },
    getTableData() {
      getProduct({
        ...this.searchForm,
      }).then((res) => {
        this.data = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          removeProduct({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        class: 'confirm-box',
      });
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
  },
};
</script>

<style  lang="less">
.product-list-container {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
    // display: none;
    z-index: 1;
  }
}
</style>
