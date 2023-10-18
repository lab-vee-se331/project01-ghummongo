import { defineStore } from "pinia";
export const useMessageStore = defineStore('message', {
    state: () => ({
        message : '' as string,
        isError: false as boolean
    }),
    getters: {
        isError() {
            return this.isError || false
        }
    },
    actions: {
        updateMessage(message : string) {
            this.message = message
        },
        resetMessage() {
            this.message = ''
        }
    }
})