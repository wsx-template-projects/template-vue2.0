import modules from '@/api/modules'
import http from '../scripts/http'
import { createAPI } from '@/scripts/http/createApi'

const API = createAPI(http, modules)
console.log('1api modules', modules)
export default API
