<template>
    <div id="app" class="theme-light">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {}
    },
    provide() {
        return {
            app: this.app,
        }
    },
    created() {},
}
</script>
