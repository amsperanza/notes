import axios from 'axios'

const baseUrl = 'https://morning-harbor-47565.herokuapp.com/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
