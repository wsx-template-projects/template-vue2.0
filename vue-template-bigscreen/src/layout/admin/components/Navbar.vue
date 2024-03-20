<template>
    <section class="app-navbar">
        <div class="app-container">
            <slot :scope="this">
                <div class="app-logo"></div>
                <div class="app-title">{{ settings.title }}</div>
                <div class="app-menu"></div>
                <div class="app-user">
                    <i class="iconfont icontouxiang icon-user"></i>
                    <el-dropdown
                        class="avatar-container right-menu-item hover-effect"
                        trigger="click"
                    >
                        <span class="name">{{
                            userInfo.name || '管理员'
                        }}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/gov/user/password">
                                <el-dropdown-item>
                                    <i class="el-icon-lock"></i>
                                    <span>修改密码</span>
                                </el-dropdown-item>
                            </router-link>
                            <el-dropdown-item divided @click.native="logOut">
                                <span style="display:block;">
                                    <i class="el-icon-monitor"></i>
                                    <span>退出系统</span>
                                </span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </slot>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            aa: 1,
        }
    },
    computed: {
        ...mapGetters(['userInfo', 'settings']),
    },
    methods: {
        logOut() {
            this.$store.dispatch('user/LogOut')
        },
    },
}
</script>

<style lang="less"></style>
