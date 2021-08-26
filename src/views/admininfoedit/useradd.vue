<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="创建医生ID" >
        <el-input v-model="form.username" style="width: 40%;"/>
      </el-form-item>
      <el-form-item label="创建密码">
        <el-input v-model="form.password" style="width: 40%;"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click.native.prevent="handleSign">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validaterePassword = (rule, value, callback) => {
      console.log('value', value)
      console.log('value2', this.form.password)
      if (value !== this.form.password) {
        callback('前后密码不一致')
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      regiRules: {
        username: [{ required: true, trigger: 'blur', }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repassword: [{ required: true, trigger: 'blur', validator: validaterePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    handleSign() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.form).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style scoped>

</style>

