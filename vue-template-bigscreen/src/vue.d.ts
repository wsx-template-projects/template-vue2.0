export {} /// 这句不能删
declare module 'vue/types/vue' {
    class C {}
    interface Vue {
        // a: C
        // aa: Function
        // aaa: {
        //     aa: 'a' | 'b'
        // }
        // aaaaa: number | string | boolean | Function
    }
}
