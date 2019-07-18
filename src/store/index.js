'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import ls from '@/utils/localStorage';
import router from '@/router';

Vue.use(Vuex);

const state = {
    user: ls.getItem('user'),
    auth: ls.getItem('auth'),
};

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user;
        ls.setItem('user', user);
    },
    UPDATE_AUTH(state, auth) {
        state.auth = auth;
        ls.setItem('auth', auth);
    },

    // 用户刷新 token 成功，使用新的 token 替换掉本地的token
    setToken(state,token) {
        token.token_expired_at =new Date().getTime()+(token.expires_in * 1000);
        let token_expired_time = new Date(token.token_expired_at)
        token.token_expired_time =token_expired_time.toLocaleDateString().replace(/\//g, "-") + " " + token_expired_time.toTimeString().substr(0, 8) ;
        ls.setItem('token',token);
    },


};

const actions = {
    login({ commit }, user) {
        if (user) commit('UPDATE_USER', user);
        commit('UPDATE_AUTH', true);
        router.go(-1);
    },
    logout({ commit }) {
        commit('UPDATE_USER', null);//清空
        commit('UPDATE_AUTH', false);
        ls.setItem('token', null);
        router.push('/');

    },
    userUpdate({commit},user){
        commit('UPDATE_USER', user);
    },
    // 将刷新的 token 保存至本地
    setToken({commit},token) {
        commit('setToken', token);
    },





};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store;
