import Vue, { ComponentOptions } from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 加载loading
         */
        $$loading: {
            /** 显示 */
            fullLoading: (text?: string) => void
            /** 显示 */
            show: ({ text = '', isFullScreen = false }) => void
            /** 隐藏 */
            hide: () => void
        }
    }
}
