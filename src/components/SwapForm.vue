<template>
  <div>
    <!-- Swap Form Header -->
    <div class="flex justify-between text-sm">
      <p>{{ swapType }}</p>
      <p v-if="swapType === 'From'">
        Balance:
        <span :class="{ 'text-blue-600': skinMode === 'light', 'text-blue-400': skinMode === 'dark' }">{{
          fromTokenBalance ? fromTokenBalance : 0
        }}</span>
      </p>
      <p v-if="swapType === 'To'">
        Balance:
        <span :class="{ 'text-blue-600': skinMode === 'light', 'text-blue-400': skinMode === 'dark' }">{{
          toTokenBalance ? toTokenBalance : 0
        }}</span>
      </p>
    </div>

    <!-- Swap Form Entry -->
    <div class="mt-1 border border-gray-200 p-2 flex items-center">
      <BaseInput v-if="swapType === 'From'" :disabled="swapType === 'To'" class="w-2/3" @input="setSwapFromAmount" />
      <div v-if="swapType === 'To'" class="w-2/3">{{ swapToAmount }}</div>
      <a
        v-if="!tokenSelected"
        class="w-1/3 p-2 text-sm text-center cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300"
        :class="{ 'bg-gray-200': skinMode === 'light', 'bg-gray-600': skinMode === 'dark' }"
        @click="openSelectTokenModal"
        >Select Token</a
      >
      <div
        v-if="tokenSelected"
        class="w-1/3 p-2 text-sm text-center cursor-pointer text-white transition duration-300 flex"
        :class="{ 'bg-green-400': swapType === 'From', 'bg-yellow-400': swapType === 'To' }"
        @click="openSelectTokenModal"
      >
        <img
          :src="getImgUrl(swapType === 'From' ? fromToken : toToken)"
          width="24"
          height="24"
          alt="Search Icon"
          class="mr-2"
        />
        <p class="mt-0.5">{{ swapType === 'From' ? fromToken : toToken }}</p>
      </div>
    </div>

    <!-- Select Token Modal -->
    <BaseModal
      :is-open="selectTokenModalVisible"
      title="Select a Token"
      modal-size="small"
      @onClose="closeSelectTokenModal"
    >
      <div class="mt-6">
        <p v-if="isloadingTokens" class="text-sm text-gray-400">Loading Tokens...</p>
        <div v-if="!isloadingTokens" class="w-full">
          <p class="mb-2 text-sm text-gray-400">
            {{ tokens && tokens.length > 0 ? tokens.length : 'No' }} Tokens found
          </p>
          <div class="grid grid-cols-3 gap-3">
            <a
              v-for="(item, index) in tokens"
              :key="index"
              class="border border-gray-200 flex p-2 cursor-pointer"
              @click="selectToken(item)"
            >
              <img :src="getImgUrl(item)" width="24" height="24" alt="Search Icon" class="mr-2" />
              <p class="mt-0.5">{{ item }}</p>
            </a>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue';
import { mapState, mapMutations } from 'vuex';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import { SingleBalance } from '@/assets/interfaces/SingleBalance';

export default defineComponent({
  name: 'SwapForm',
  components: {
    BaseInput,
    BaseModal,
  },
  props: {
    swapType: {
      type: String,
      default: '',
      required: true,
    },
    tokens: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      selectTokenModalVisible: false,
      tokenSelected: false,
    };
  },
  computed: {
    ...mapState({
      balances: (state: any) => state.balances.balances,
      swapToAmount: (state: any) => state.swapToAmount,
      fromTokenBalance: (state: any) => state.fromTokenBalance,
      toTokenBalance: (state: any) => state.toTokenBalance,
      fromToken: (state: any) => state.fromToken,
      toToken: (state: any) => state.toToken,
      skinMode: (state: any) => state.skinMode,
      isloadingTokens: (state: any) => state.isloadingTokens,
    }),
  },
  methods: {
    ...mapMutations({
      setFromTokenBalance: 'SET_FROM_TOKEN_BALANCE',
      setToTokenBalance: 'SET_TO_TOKEN_BALANCE',
      setFromAmount: 'SET_FROM_AMOUNT',
      setFromToken: 'SET_FROM_TOKEN',
      setToToken: 'SET_TO_TOKEN',
    }),
    openSelectTokenModal(): void {
      this.selectTokenModalVisible = true;
    },
    closeSelectTokenModal(): void {
      this.selectTokenModalVisible = false;
    },
    getImgUrl(pic) {
      return require(`../assets/icons/${pic}.png`);
    },
    selectToken(token): void {
      this.tokenSelected = true;
      this.selectTokenModalVisible = false;
      this.setBalance(this.swapType, token);
      this.setToken(this.swapType, token);
    },
    setBalance(type: string, token: string): void {
      const currentBalance: SingleBalance = this.balances.find((item) => item.token === token);
      if (type === 'From') {
        this.setFromTokenBalance(currentBalance ? currentBalance.balance : '0');
      } else {
        this.setToTokenBalance(currentBalance ? currentBalance.balance : '0');
      }
    },
    setToken(type: string, token: string): void {
      if (type === 'From') {
        this.setFromToken(token);
      } else {
        this.setToToken(token);
      }
    },
    setSwapFromAmount(amount): void {
      if (typeof amount === 'string') {
        this.setFromAmount(Number(amount));
      }
    },
  },
});
</script>
