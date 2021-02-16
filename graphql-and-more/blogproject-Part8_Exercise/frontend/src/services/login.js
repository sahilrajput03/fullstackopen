import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials).catch(t=> console.log("##catched##",t))
  return response.data
  
}

export default { login }