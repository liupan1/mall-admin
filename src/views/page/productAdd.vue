<template>
  <div class="product-add-container">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail v-if="current==0" @next="next" :form="form" />
      <SaleDetail v-if="current==1" :form="form" @prev="prev" @submit="submit" />
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';
import { addProduct, detail, editProduct } from '@/api/product.js';

export default {
  components: { BasicDetail, SaleDetail },
  created() {
    if (this.$route.params.id) {
      detail(this.$route.params.id).then((res) => {
        this.form = res;
      });
    }
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
    };
  },
  methods: {
    next(data) {
      this.form = {
        ...this.form,
        ...data,
      };
      this.current++;
    },
    prev(data) {
      this.form = {
        ...this.form,
        ...data,
      };
      this.current--;
    },
    submit(data) {
      this.form = {
        ...this.form,
        ...data,
      };
      if (this.$route.params.id) {
        editProduct(this.from).then((res) => {
          console.log(res);
          this.$message.success('编辑成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      } else {
        addProduct(this.form).then((res) => {
          this.$message.success('新增成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      }
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 300px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
