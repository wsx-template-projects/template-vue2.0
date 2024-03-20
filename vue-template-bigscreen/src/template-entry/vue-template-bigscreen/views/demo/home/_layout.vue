<template>
    <div>
        <p>
            <router-link to="/demo/home/a">a</router-link>
        </p>
        <p>
            <router-link to="/demo/home/b">b</router-link>
        </p>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less" scoped></style>
