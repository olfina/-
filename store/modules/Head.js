export default {
    namespaced: true,
    state() {
        return {
            userFlag: false,
            historyFlag: false,
            cartoonFlag: false,
        }
    },
    mutations: {

        // 鼠标经过
        EnterFun(state, arr) {
            // console.log(arr);
            if (arr[0] == 'historyFlag') {
                state.historyFlag = !state.historyFlag;
                // console.log(state.historyFlag);
            } else if (arr[0] == 'cartoonFlag') {
                state.cartoonFlag = !state.cartoonFlag;
                // console.log(state.cartoonFlag);
            } else if (arr[0] == 'userFlag') {
                state.userFlag = !state.userFlag;
                // console.log(state.userFlag);
            }
        },
        // 鼠标离开
        LeaveFun(state, arr) {
            if (arr[0] == 'historyFlag') {
                state.historyFlag = !state.historyFlag;
            } else if (arr[0] == 'cartoonFlag') {
                state.cartoonFlag = !state.cartoonFlag;
            } else if (arr[0] == 'userFlag') {
                state.userFlag = !state.userFlag;
            }
        }

    },
}