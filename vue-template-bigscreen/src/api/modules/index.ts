const modules: any = {}
const interceptors: any = []
const requireContext = require.context('.', true, /\.[js|ts]/)
const requireAll = (context: any) => {
    if (context === './index.ts') return
    context.keys().forEach((key: any) => {
        modules[key] = requireContext(key).default || requireContext(key)
    })
}

requireAll(requireContext)

Object.keys(modules).forEach(key => {
    const target = modules[key]
    Object.keys(target).forEach(name => {
        const result = target[name]

        interceptors.push(result)
    })
})

export default interceptors
