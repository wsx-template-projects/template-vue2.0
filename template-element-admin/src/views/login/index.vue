<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <div class="title-container">
        <h3 class="title">用户管理后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
            <i style="font-weight: 800;font-size:16px" class="el-icon-unlock"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-checkbox class="selected" v-model="checked">记住密码</el-checkbox>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { setUsername, setPassword, getUsername, getPassword } from '@/utils/auth'
import { Base64 } from 'js-base64'
// import { validUsername } from '@/utils/validate'
// import md5 from 'js-md5'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('密码长度必须在6到16位之间'))
        } else {
          callback()
        }
      }
    }
    return {
      checked: true,
      loginForm: {
        username: getUsername() || '',
        password: getPassword() || ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    const pass = this.loginForm.password
    if (typeof pass === 'number') {
      this.loginForm.password = pass + ''
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      const { username, password } = this.loginForm
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            userName: username,
            // pwd: md5.hex(password)
            pwd: Base64.encode(password)
          }
          console.log('-name-pwd-', data)
          this.testReq(username, password) // TODO: 没有登录接口时使用
          // this.prodReq(data, username, password) // TODO: 后端提供登录接口时使用
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    prodReq(params, username, password) {
      login(params)
        .then(res => {
          console.log('infoRes', res)
          if (this.checked) {
            setUsername(username)
            setPassword(password)
          } else {
            setUsername('')
            setPassword('')
          }
          this.$store
            .dispatch('user/login', res.data)
            .then(() => {
              this.$router.push({ path: '/' }) // TODO: 有权限控制的话，默认跳转到首页
              // this.$router.push({ path: this.redirect || '/', query: this.otherQuery }) // TODO: 没有权限控制的话，重新登录跳转到最后一次打开的界面
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    testReq(username, password) {
      setTimeout(() => {
        this.loading = false
        if (this.checked) {
          setUsername(username)
          setPassword(password)
        } else {
          setUsername('')
          setPassword('')
        }
        const data = { key: '456456464' }
        this.$store
          .dispatch('user/login', data)
          .then(() => {
            this.$router.push({ path: '/' }) // TODO: 有权限控制的话，默认跳转到首页
            // this.$router.push({ path: this.redirect || '/', query: this.otherQuery }) // TODO: 没有权限控制的话，重新登录跳转到最后一次打开的界面
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }, 2000)
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="less">
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  .selected {
    margin-bottom: 10px;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .logo {
    width: 100%;
    margin-bottom: 20px;
    img {
      width: 130px;
      height: 130px;
      margin-left: 160px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
