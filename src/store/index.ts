import { createStore } from 'vuex';

// JSON Data Imports
import tokensData from '@/assets/data/tokens.json';
import accountData from '@/assets/data/account.json';
import poolsData from '@/assets/data/pools.json';
import balancesData from '@/assets/data/balances.json';

// Type Imports
import { Account } from '@/assets/interfaces/Account';
import { Tokens } from '@/assets/interfaces/Tokens';
import { Pools } from '@/assets/interfaces/Pools';
import { Balances } from '@/assets/interfaces/Balances';

export default createStore({
  state: {
    tokens: {} as Tokens,
    accountData: {} as Account,
    pools: {} as Pools,
    balances: {} as Balances,
    fromToken: '',
    toToken: '',
    swapFromAmount: 0,
    swapToAmount: 0,
    fromTokenBalance: '0',
    toTokenBalance: '0',
    skinMode: 'light',
    isloadingTokens: false,
    isLoadingAddress: false,
  },
  mutations: {
    SET_TOKENS: (state, data) => (state.tokens = data),
    SET_ACCOUNT_INFO: (state, data) => (state.accountData = data),
    SET_POOLS: (state, data) => (state.pools = data),
    SET_BALANCES: (state, data) => (state.balances = data),
    SET_FROM_AMOUNT: (state, data) => (state.swapFromAmount = data),
    SET_TO_AMOUNT: (state, data) => (state.swapToAmount = data),
    SET_FROM_TOKEN_BALANCE: (state, data) => (state.fromTokenBalance = data),
    SET_TO_TOKEN_BALANCE: (state, data) => (state.toTokenBalance = data),
    SET_FROM_TOKEN: (state, data) => (state.fromToken = data),
    SET_TO_TOKEN: (state, data) => (state.toToken = data),
    SET_SKIN_MODE: (state, data) => (state.skinMode = data),
    SET_IS_LOADING_TOKENS: (state, data) => (state.isloadingTokens = data),
    SET_IS_LOADING_ADDRESS: (state, data) => (state.isLoadingAddress = data),
    CLEAR_FROM_AMOUNT: (state) => (state.swapFromAmount = 0),
  },
  actions: {
    getTokens({ commit }) {
      commit('SET_IS_LOADING_TOKENS', true);
      setTimeout(() => {
        commit('SET_TOKENS', tokensData);
        commit('SET_IS_LOADING_TOKENS', false);
      }, 3000);
    },
    getCurrentAddress({ commit }) {
      commit('SET_IS_LOADING_ADDRESS', true);
      setTimeout(() => {
        commit('SET_ACCOUNT_INFO', accountData);
        commit('SET_IS_LOADING_ADDRESS', false);
      }, 3000);
    },
    getPools({ commit }) {
      setTimeout(() => {
        commit('SET_POOLS', poolsData);
      }, 3000);
    },
    getBalances({ commit }) {
      setTimeout(() => {
        commit('SET_BALANCES', balancesData);
      }, 3000);
    },
  },
  modules: {},
});
