<template>
    <div id="app">
        <!-- <my-guide :data-source="routes"></my-guide> -->
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import routes from './router/routes'

const app = namespace('app')
@Component({
    components: {},
})
export default class App extends Vue {
    routes: any = [...routes]
    created() {}

    mounted() {}
}
</script>

<style lang="less">
.wrap {
    margin: 0 auto;
    width: 1000px;
}
.logo h1 {
    margin-bottom: 1px;
    color: yellow;
    text-align: center;
    text-shadow: 1px 1px 6px #555;
    font-size: 200px;
}
.logo p {
    margin-top: 1px;
    color: white;
    text-align: center;
    font-size: 20px;
}
.logo p span {
    color: lightgreen;
}

.sub a {
    padding: 5px;
    background: #06afd8;
    color: yellow;
    text-decoration: none;
    font-weight: bold;
    font-size: 13px;
    font-family: arial, serif;
}
.footer {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: white;
}
.footer a {
    color: yellow;
}
</style>
