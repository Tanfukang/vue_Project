const state = {
  name: '',
  password: '',
  user: window.sessionStorage.getItem('user'),
  token: window.sessionStorage.getItem('token')
}

export default state
