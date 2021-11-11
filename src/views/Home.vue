<template>
  <div class="h-screen pt-32" :class="{ 'bg-gray-900': skinMode === 'dark' }">
    <!-- Container -->
    <div
      class="border border-gray-400 w-1/4 mx-auto p-4 shadow-xl"
      :class="{
        'bg-gray-800 text-white': skinMode === 'dark',
        'bg-white': skinMode === 'light',
      }"
    >
      <!-- Header -->
      <div class="mb-6 flex justify-between font-semibold text-lg tracking-wide items-center">
        <p>Swap</p>
        <a class="cursor-pointer text-sm" @click="toggleSkinMode"
          >Switch to {{ skinMode === 'dark' ? 'Light' : 'Dark' }} Mode</a
        >
      </div>

      <div class="text-sm mb-6">
        <p v-if="isLoadingAddress" class="text-sm text-gray-400">Loading Address...</p>
        <div v-if="!isLoadingAddress">
          <p>Current Address</p>
          <p class="text-gray-400">{{ currentAddress }}</p>
        </div>
      </div>

      <!-- From Swap Form -->
      <SwapForm swap-type="From" :tokens="tokens" />

      <!-- Switch Forms -->
      <div
        class="
          mt-6
          mb-8
          border border-gray-200
          w-1/3
          mx-auto
          py-2
          text-sm text-center
          cursor-pointer
          hover:bg-blue-600 hover:text-white
          transition
          duration-300
        "
        @click="switchTokens"
      >
        Switch Tokens
      </div>

      <!-- To Swap Form -->
      <SwapForm swap-type="To" :tokens="tokens" />

      <!-- Pool Price -->
      <div v-if="poolPrice" class="mt-6 flex justify-between">
        <p class="text-gray-400">Pool Price</p>
        <p class="text-right">{{ poolPrice }}</p>
      </div>

      <p v-if="!poolPrice && fromToken && toToken" class="text-red-600 text-sm mt-6">
        No Pool Price Available for this selection
      </p>

      <p v-if="errorExists" class="mt-4 text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <!-- Swap Button -->
      <BaseButton
        :disabled="fromTokenBalance == 0 || !fromToken || !toToken"
        button-text="Perform Swap"
        @click="performSwap"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';
import SwapForm from '@/components/SwapForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { SinglePool } from '@/assets/interfaces/SinglePool';

export default defineComponent({
  name: 'Home-page',
  components: {
    SwapForm,
    BaseButton,
  },
  data() {
    return {
      errorExists: false,
      errorMessage: '',
    };
  },
  computed: {
    ...mapState({
      tokens: (state: any) => state.tokens.tokens,
      currentAddress: (state: any) => state.accountData.address,
      pools: (state: any) => state.pools.pools,
      swapFromAmount: (state: any) => state.swapFromAmount,
      swapToAmount: (state: any) => state.swapToAmount,
      fromTokenBalance: (state: any) => state.fromTokenBalance,
      toTokenBalance: (state: any) => state.toTokenBalance,
      fromToken: (state: any) => state.fromToken,
      toToken: (state: any) => state.toToken,
      skinMode: (state: any) => state.skinMode,
      isLoadingAddress: (state: any) => state.isLoadingAddress,
    }),

    poolPrice() {
      if (this.fromToken && this.toToken) {
        const currentPool: SinglePool = this.pools.find(
          (item) => item.tokenA === this.fromToken && item.tokenB === this.toToken,
        );

        if (currentPool) {
          return currentPool.price;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$store.dispatch('getTokens');
    this.$store.dispatch('getCurrentAddress');
    this.$store.dispatch('getPools');
    this.$store.dispatch('getBalances');
  },
  methods: {
    ...mapMutations({
      setToTokenBalance: 'SET_TO_TOKEN_BALANCE',
      setFromTokenBalance: 'SET_FROM_TOKEN_BALANCE',
      setToToken: 'SET_TO_TOKEN',
      setFromToken: 'SET_FROM_TOKEN',
      setSwapToAmount: 'SET_TO_AMOUNT',
      setSkinMode: 'SET_SKIN_MODE',
    }),
    toggleSkinMode(): void {
      if (this.skinMode === 'light') {
        this.setSkinMode('dark');
      } else {
        this.setSkinMode('light');
      }
    },
    switchTokens(): void {
      const fromDetails = {
        balance: this.fromTokenBalance,
        token: this.fromToken,
      };
      const toDetails = {
        balance: this.toTokenBalance,
        token: this.toToken,
      };

      this.setToTokenBalance(fromDetails.balance);
      this.setFromTokenBalance(toDetails.balance);

      this.setToToken(fromDetails.token);
      this.setFromToken(toDetails.token);
    },
    performSwap(): void {
      this.errorExists = false;

      if (this.swapFromAmount > Number(this.fromTokenBalance)) {
        this.errorExists = true;
        this.errorMessage = 'From Account Balance Exceeded - Swap can not be processed.';
        return;
      }

      this.setSwapToAmount(this.swapFromAmount * Number(this.poolPrice));
    },
  },
});
</script>
