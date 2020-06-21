import Vue from 'vue'
import Vuex from 'vuex'
import { customerAndNewsSnapshotAutoRefresh } from './plugins/vuexPlugins'
import * as fb from '@/firebaseConfig.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [customerAndNewsSnapshotAutoRefresh],
  modules: {
    notification
  },
  state: {
    currentUser: null,
    userProfile: {},
    customerList: [],
    publishedNewsList: [],
    publishedPromotionsList: []
  },
  mutations: {
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser
    },
    SET_USER_PROFILE(state, userProfile) {
      state.userProfile = userProfile
    },
    SET_CUSTOMER_LIST(state, customerArray) {
      state.customerList = customerArray
    },
    SET_PUBLISHED_NEWS_LIST(state, publishedNewsArray) {
      state.publishedNewsList = publishedNewsArray
    },
    SET_PUBLISHED_PROMOTIONS_LIST(state, publishedPromotionsArray) {
      state.publishedPromotionsList = publishedPromotionsArray
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
    },
    updateCustomerList({ commit }, customerArray) {
      commit('SET_CUSTOMER_LIST', customerArray)
    },
    updatePublishedNewsList({ commit }, publishedNewsArray) {
      commit('SET_PUBLISHED_NEWS_LIST', publishedNewsArray)
    },
    updatePublishedPromotionsList({ commit }, publishedPromotionsArray) {
      commit('SET_PUBLISHED_PROMOTIONS_LIST', publishedPromotionsArray)
    }
  }
})
