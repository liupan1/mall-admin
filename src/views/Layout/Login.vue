<template>
  <div class="login">
    <a-form-model class="login-form" ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">登录</a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">注册</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { login } from '@/api/user.js';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkemail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交!');
          login(this.loginForm)
            .then((res) => {
              console.log(res);
              this.$router.push({ name: 'Home' });
            })
            .catch((err) => {
              this.$message.error(error);
            });
        } else {
          console.log('错误提交!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" >
.login {
  .login-form {
    max-width: 500px;
    margin: 100px auto;
    border: 1px solid #eee;
    padding: 30px 10px 6px 60px;
  }
}
</style>
