import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: {
        connect: false,
        message: null
    },
    mutations: {
        SOCKET_CONNECT: (state,  status ) => {
            console.log(1111, status)
            state.connect = true;
        },
        SOCKET_USER_MESSAGE: (state,  message) => {
            console.log(2222, message);
            state.message = message;
        },
        SOCKET_OPEND: (state, message) => {
            console.log(333, message);
            state.message = message;
        }
    },
    actions: {
        otherAction: (context, type) => {
            return true;
        },
        socket_userMessage: (context, message) => {
            context.dispatch('newMessage', message);
            context.commit('NEW_MESSAGE_RECEIVED', message);
            if (message.is_important) {
                context.dispatch('alertImportantMessage', message);
            }
        }
    }
}
