<template>
  <!--Modal-->
  <!-- leave-active-class="duration-300 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0" -->
  <transition enter-active-class="duration-300 ease-out opacity-0" enter-to-class="opacity-100">
    <div
      v-show="isOpen"
      :class="modalClassObject"
      class="
        modal
        fixed
        w-full
        mx-auto
        flex
        items-center
        min-h-screen
        inset-0
        justify-center
        outline-none
        overflow-y-auto
        box-border
        bg-gray-900 bg-opacity-50
      "
      style="z-index: 2500"
    >
      <div
        class="modal-dialog w-1/3 p3 pb-16 my-auto md:max-w-md mx-auto box-border"
        style="z-index: 2000"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="bg-white">
          <div
            class="modal-content py-4 texleft px-6"
            :class="{ 'bg-gray-800': skinMode === 'dark', 'bg-white': skinMode === 'light' }"
          >
            <!--Title-->
            <div class="flex justify-between items-center p6">
              <p class="font-semibold text-lg tracking-wide leading-tight fonbold texgray-900">
                {{ title ? title : '' }}
              </p>
              <button
                v-if="closable"
                class="
                  bg-white
                  mb-3
                  hover:bg-gray-300
                  transition
                  duration-300
                  rounded-full
                  p-2
                  modal-close
                  cursor-pointer
                  outline-none
                  focus:outline-none
                "
                @click.prevent="$emit('onClose')"
              >
                <svg class="texgray-800" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  ></path>
                </svg>
              </button>
            </div>

            <!--Body-->
            <div class="">
              <slot></slot>
            </div>
            <!-- End Body -->
          </div>
        </div>
      </div>

      <!-- start modal overlay -->
      <div
        v-show="isOpen"
        class="fixed bg-gray-900 opacity-50 modal-overlay w-full h-full"
        @click.prevent="$emit('onCloseFromOutside')"
      ></div>
      <!-- end modal overlay -->
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  props: {
    isOpen: Boolean,
    title: {
      type: String,
      default: '',
      required: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
      required: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    modalClassObject() {
      return {
        'pointer-events-none': !this.isOpen,
      };
    },
    ...mapState({
      skinMode: (state: any) => state.skinMode,
    }),
  },
});
</script>

<style scoped>
.modal-overlay {
  z-index: 1900;
  top: 0;
  left: 0;
}
</style>
