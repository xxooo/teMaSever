const actions = {
  setMenus({ commit,state }, menus) {
    commit('setMenus', menus)
  },
  showLoading({ commit }, status) {
    commit('showLoading', status)
  },
  setboradFullTitle({commit},status){
  	commit('updateboradFullTitle',status)
  }

  
}

export default actions




