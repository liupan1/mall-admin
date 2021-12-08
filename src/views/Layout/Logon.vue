<template>
  <div class="logon">
    <a-form-model class="logon-form" ref="logonForm" :model="logonForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email" required>
        <a-input v-model="logonForm.email" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="密码" prop="password" required>
        <a-input v-model="logonForm.password" type="password" autocomplete="off" />
      </a-form-model-item>

      <a-form-model-item has-feedback label="验证码" prop="code" required :wrapper-col="{ span: 15, offset: 0}">
        <div class="code">
          <a-input v-model="logonForm.code" autocomplete="off" />
          <a-button type="primary" @click="getCodes">获取验证码</a-button>
        </div>
      </a-form-model-item>

      <a-form-model-item has-feedback label="用户名" prop="username" required>
        <a-input v-model="logonForm.username" autocomplete="off" />
      </a-form-model-item>

      <a-form-model-item label="用户类型" prop="role">
        <a-select v-model="logonForm.role" placeholder="请选择账号类型">
          <a-select-option value="coustomer">普通用户</a-select-option>
          <a-select-option value="admin">管理员</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 19, offset: 8 }">
        <a-button type="primary" @click="submitForm('logonForm')">注册</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { getCode, logon } from '@/api/user';

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
    const codeChange = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    const usernameChange = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    return {
      logonForm: {
        password: '',
        email: '',
        code: '',
        username: '',
        role: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkemail, trigger: 'change' }],
        code: [{ validator: codeChange, trigger: 'change' }],
        username: [{ validator: usernameChange, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          logon(this.logonForm).then((res) => {
            this.$message.success('注册成功');
            this.$router.push({ name: 'Login' });
          });
        }
        return false;
      });
    },
    getCodes() {
      if (!this.logonForm.email) {
        this.$message.error('请输入邮箱');
      } else {
        getCode(this.logonForm).then((res) => {
          this.$message.success('验证码以发送到邮箱');
        });
      }
    },
  },
};
</script>
<style lang="less" >
.logon {
  .logon-form {
    position: absolute;
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    border: 1px solid #eee;
    padding: 30px 10px 6px 60px;
  }
  .code {
    display: flex;
  }
}
</style>
