import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '@/firebaseConfig.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification
  },
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser
    },
    SET_USER_PROFILE(state, userProfile) {
      state.userProfile = userProfile
    }
  },
  actions: {
    defineCurrentUser({ commit }, user) {
      commit('SET_CURRENT_USER', user)
    },
    fetchUserProfile({ commit, dispatch, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit('SET_USER_PROFILE', res.data())
          console.log(state.userProfile)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message:
              'Il y a eu un problème durant le chargement du profil administrateur : ' +
              error.message
          }
          dispatch('notification/add', notification)
        })
    },
    clearData({ commit }) {
      commit('SET_CURRENT_USER', null)
      commit('SET_USER_PROFILE', {})
    }
  }
})
