const files = require.context('.', true, /\.js$/)
const modules = {}

files.keys().forEach(key => {
    if (key === './index.js') return
    const path = key.replace(/(\.\/|\.js)/g, '')
    modules[key] = files(key).default || files(key)
})

export default modules
