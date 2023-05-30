import {
  doLogin,
  doLogout,
  getAuthorities,
  getUser,
} from '@/shared/api/authentication-api';

const sessionState = {
  login: true, // false by default
  authenticated: true, // false by default
  user: { username: 'congtrinh', name: 'Trinh Tran', email: 'congtrinh097@gmail.com', password: ''},
  authorities: ['ROLE_ADMIN', 'ROLE_USER'], //
};

const sessionGetters = {
  hasAuthorities: (state) => (authorities) => {
    if (!authorities) return true;
    if (!state.authenticated || !state.authorities) return false;
    let authoritiesToCheck = authorities;
    if (typeof authorities === 'string') {
      authoritiesToCheck = [authorities];
    }
    return authoritiesToCheck.some((role) => state.authorities.includes(role));
  },
};

const sessionMutations = {
  login: (state) => {
    state.login = true;
  },
  authenticated: (state, { profile }) => {
    state.login = false;
    state.authenticated = true;
    state.user = profile;
    state.authorities = profile.authorities || ['ROLE_ADMIN', 'ROLE_USER'];
  },
  logout: (state) => {
    state.login = false;
    state.authenticated = false;
    state.user = {};
    state.authorities = [];
  },
};

const sessionActions = {
  login: async ({ commit, dispatch }, userLogin) => {
    const result = await doLogin(userLogin);
    console.log(result);

    if(result.status === 'success') {
      await dispatch('saveToken', { token: result.token });
      commit('authenticated', { profile: result.profile });
      commit('login');
    }
   
    return result;
  },
  saveToken:  async (_, { token }) => {
    localStorage.setItem('token', token);
  },
  logout: async ({ commit }) => {
    // await doLogout(); // should implement logout to remove token from server.
    commit('logout');
  },
};

export default {
  namespaced: true,
  state: sessionState,
  getters: sessionGetters,
  mutations: sessionMutations,
  actions: sessionActions,
};
