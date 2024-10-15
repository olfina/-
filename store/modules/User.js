// 引入封装类
import { SessionUtils } from '@/utils/index.js'
import store from '..';

export default {
    namespaced: true,
    state() {
        return {
            date_time: null,
            dialogVisible: false,
            innerVisible: false,
            box: [],
            tokenList: null
        }
    },
    mutations: {
        DateFun(state) {
            var date = new Date();
            var time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            state.date_time = time;
        },
        openFun(state, num) {
            if (num == 1) {
                state.dialogVisible = !state.dialogVisible;
            } else if (num == 2) {
                state.innerVisible = !state.innerVisible;
            }
        },
        RechargeFun(state, num) {

            store.commit('User/DateFun');

            state.dialogVisible = !state.dialogVisible;
            state.innerVisible = !state.innerVisible;

            state.box.unshift({
                num,
                time: state.date_time
            })

            // 获取localStorage的token，赋值给tokenLists
            state.tokenList = SessionUtils.get('token');

            // 获取tokenLists的money属性，将其与充值的漫币相加
            state.tokenList[0].money += num;

            // 将改变的tokenLists上传locaStorage
            SessionUtils.set("token", state.tokenList);
            SessionUtils.set("box", state.box);
        }
    }
}