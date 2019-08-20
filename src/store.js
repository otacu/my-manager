import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, removeToken, setToken} from "@/utils/auth";
import {login} from "@/api/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      token: getToken(),
      openTab:[],//所有打开的tab
      activeIndex:'' //当前激活的tab
  },
  mutations: {
      SET_TOKEN: (state, token) => {
          state.token = token
      },
      // 添加tab
      ADD_TAB (state, data) {
          state.openTab.push(data);
      },
      // 删除tab
      DELETE_TAB (state, route) {
          let index = 0;
          for (let option of state.openTab) {
              if (option.route === route) {
                  break;
              }
              index++;
          }
          state.openTab.splice(index, 1);
      },
      // 设置当前激活的tab
      SET_ACTIVE_INDEX (state, index) {
          state.activeIndex = index;
      },
      // 重置tabs
      RESET_TABS (state){
          state.openTab=[]
      }
  },
  actions: {
      login({commit}, userInfo) {
          const {username, password} = userInfo
          return new Promise((resolve, reject) => {
              login({username: username.trim(), password: password}).then(response => {
                  commit('SET_TOKEN', response.token)
                  setToken(response.token)
                  resolve()
              }).catch(error => {
                  reject(error)
              })
          })
      },
      logout({commit}) {
          return new Promise(resolve => {
              commit('SET_TOKEN', '')
              removeToken()
              resolve()
          })
      },
      // 添加tab
      add_tab({commit}, data) {
          return new Promise((resolve) => {
              commit('ADD_TAB', data)
              resolve()
          })
      },
      // 删除tab
      delete_tab({commit}, route) {
          return new Promise((resolve) => {
              commit('DELETE_TAB', route)
              resolve()
          })
      },
      // 设置当前激活的tab
      set_active_index({commit}, index) {
          return new Promise((resolve) => {
              commit('SET_ACTIVE_INDEX', index)
              resolve()
          })
      },
      // 重置tabs
      reset_tabs({commit}){
          return new Promise((resolve) => {
              commit('RESET_TABS')
              resolve()
          })
      }
  }
})
