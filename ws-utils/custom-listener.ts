export default class CustomEvent {
    private static _instance: CustomEvent = new CustomEvent()
    //限制产生多个对象
    private constructor() {}
    //获得实例对象
    public static getInstance(): CustomEvent {
        return this._instance
    }
    addEvent(eventName: string = 'storage', callback: Function) {
        console.log(`添加${eventName}事件监听`)
        window.addEventListener(eventName, callback.apply(this))
    }
    removeEvent(eventName: string = 'storage', callback: Function) {
        console.log(`清除${eventName}事件监听`)
        window.removeEventListener(eventName, callback.apply(this))
    }
}
