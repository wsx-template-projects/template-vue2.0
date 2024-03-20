<template>
    <div class="sg-page page-login">
        <nav class="navbar"></nav>
        <div class="login-container">
            <div class="login-form sg-flexbox">
                <div class="login-form-left">
                    <div class="login-form-title">
                        {{ title }}
                    </div>
                    <div class="login-form-cover">
                        <img
                            src="./assets/img/active-bg-fr.png"
                            alt=""
                            width="90%"
                        />
                    </div>
                </div>
                <div class="login-form-right">
                    <sg-base-form
                        class="my-login-form"
                        :fields="LoginView.fields"
                        v-model="LoginView.model"
                        :span="24"
                        ref="form"
                        @submit="onSubmit"
                    >
                        <div class="header" slot="header">
                            <span>登录</span>
                            <input
                                type="text"
                                name="name"
                                autocomplete="off"
                                class="my-hidden"
                            />
                            <input
                                type="password"
                                name="pwd"
                                autocomplete="off"
                                class="my-hidden"
                            />
                        </div>

                        <div slot="footer" class="my-login-form-footer">
                            <el-button
                                :loading="loading"
                                type="primary"
                                class="my-login-form-submit"
                                size="large"
                                @click="onSubmit"
                                >登录</el-button
                            >
                        </div>
                    </sg-base-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import * as AreaApi from '@/template-entry/vue-template-admin/services/sys/area'
//import { confirm } from '@/decorator'
export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
        return {
            title: '后台管理',
            loading: false,
            LoginView: {
                model: {},
                fields: [
                    {
                        tag: 'input',
                        name: 'username',
                        label: '',
                        attrs: {
                            placeholder: '请输入账号',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'password',
                        label: '',
                        attrs: {
                            type: 'password',
                            placeholder: '请输入密码',
                            isTriggerSubmit: true,
                        },
                    },
                ],
            },
        }
    },
    computed: {
        valid() {
            const { username, password } = this.LoginView.model
            if (username && password) {
                return true
            } else {
                return false
            }
        },
    },
    watch: {},
    created() {},
    mounted() {
        // AreaApi.list(
        //     {
        //         name: 111,
        //     },
        //     {
        //         exApiHooks: ['/sys/area/list'],
        //     },
        // )
    },
    methods: {
        //@confirm('确定吗')
        async onSubmit() {
            const model = this.LoginView.model

            try {
                this.loading = true
                const data = await this.$http.post('/mock/login', {
                    ...model,
                })
                const token = data.token
                const username = data.username
                this.$message.success('登录成功')
                this.$store.commit('user/SET_INFO', {
                    name: username,
                })
                this.$store.commit('user/LOGIN', token)
                this.$router.push('/').catch(() => {})
                this.loading = false
            } catch (err) {
                this.loading = false
                console.error(err)
            }
        },
    },
}
</script>
<style>
.admin-login {
    background-color: #dce9f5;
}
</style>
<style lang="less" scoped>
.page-login {
    display: flex;
    height: 100%;
    min-height: 450px;
    flex-direction: column;
    justify-content: center;
    .my-icon-box {
        display: inline-block;

        height: 100%;
        padding-right: 10px;
        padding-left: 7px;
        ::after {
            position: absolute;
            top: 20%;
            right: 0;
            display: block;
            width: 1px;
            height: 60%;
            border-right: 1px solid #ddd;
            content: ' ';
        }
    }
    .my-login-form-footer {
        padding-top: 35px;
    }
    .my-hidden {
        position: fixed;
        top: -99999px;
        left: -99999px;
    }
    .navbar {
        display: none;
        min-height: 50px;
        // margin-bottom: 20px;
    }
    .login-container {
        width: 800px;
        margin: 0 auto;
    }
    .login-form {
        background-color: #fff;
        .login-form-left {
            width: 55%;
            height: 450px;
            color: #fff;
            background: url('./assets/img/active-bg.png') no-repeat center
                center;
            background-size: cover;

            .login-form-title {
                padding-top: 50px;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
            }
            .login-form-cover {
                padding-top: 40px;
                text-align: center;
            }
        }
        .login-form-right {
            padding: 30px;
            padding-top: 50px;
            flex: 1;
        }
        .my-login-form {
            padding: 0;
            .header {
                margin-bottom: 30px;
                font-size: 24px;
                font-weight: bold;
            }
            .my-form-item-code {
                display: flex;

                .my-code {
                    margin-left: 10px;
                }
            }
            .my-login-form-submit {
                width: 100%;
                border-radius: 26px;
            }
            .el-input--prefix .el-input__inner {
                padding-left: 45px;
            }
        }
    }
}
</style>
