export const useCustomEventListener = (eventName:string,handler:any,type: 'add' | 'remove') => {
    type === 'add' && window.addEventListener(eventName,handler)
    type === 'remove' && window.removeEventListener(eventName,handler)
}
