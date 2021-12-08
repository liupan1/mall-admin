<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 13 }">
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>

    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>

    <a-form-model-item label="商品类别" prop="category" required>
      <a-select v-model="form.category" placeholder="请选择商品类别" @change="changeCategory">
        <a-select-option :value="cate.id" v-for="cate in categoryList" :key="cate.id">{{cate.name}}</a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder="请选择子类目">
        <a-select-option :value="cate.id" v-for="cate in categoryItems" :key="cate.id">{{cate.name}}</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select mode="tags" placeholder="请选择" :default-value="['包邮，最晚次日达']" v-model="form.tags">
        <a-select-option value="包邮，最晚次日达">包邮，最晚次日达</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="next">下一步</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { list } from '@/api/category.js';

export default {
  data() {
    return {
      categoryList: [],
      categoryItems: [],
      rules: {},
    };
  },
  props: ['form'],

  created() {
    console.log(this.$store.state.user);
    list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>
