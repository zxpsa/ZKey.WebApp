// import { createStore } from "store";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
/**
 * 状态管理机配置
 */
const modules = {
    
};

const state = {
    /** 动态路由表 */
    dynamicRouter:null,
    loadding: false,//加载
};

const mutations = {
    /**
     * 更新动态路由表
     */
    UpdateDynamicRouter(state, params){
        state.dynamicRouter = params;
    }
};

const actions = {
    // UpdateDynamicRouter({ state, commit, rootState }){
        
    // }
};

export function createStore(){
   return new Vuex.Store({ modules, state, mutations, actions });
}

