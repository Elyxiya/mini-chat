//封装本地存储存储数据与读取数据方法
//存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('x-token', token)
}
//本地存储获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('x-token')
}
//本地存储删除数据方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('x-token')
}
export const SET_USER = (user: string) => {
  localStorage.setItem('user', user)
}
export const GET_USER = () => {
  return localStorage.getItem('user')
}
export const REMOVE_USER = () => {
  localStorage.removeItem('user')
}