// 引入封装类
import { SessionUtils } from '@/utils/index.js'

export default {
    namespaced: true,
    state() {
        return {
            dialogVisible: false,
            token: [],
            loginShow: false,
            userFlag: false,
            money: 1000,
            reading: 100,
            free: 40,
            discount: 5
        }
    },
    mutations: {
        // 点击显示登录
        loginFun(state) {
            state.dialogVisible = !state.dialogVisible;
            // console.log('调用');
        },
        // 点击登录
        submit_login(state, arrdata) {
            console.log(arrdata);
            let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            let pass = /^[a-zA-Z0-9]\w{8,17}$/;

            // 判断手机号码和密码是否正确
            if (!reg.test(arrdata.phone) || !pass.test(arrdata.password)) {
                // console.log('请输入正确手机号码与密码');
                ElMessage.error({
                    message: '请输入正确手机号码与密码',
                });
                return;
            } else {

                ElMessage.success({
                    message: '登录成功',
                });

                // // 关闭登录框
                state.dialogVisible = !state.dialogVisible;
                // console.log('登录成功');


                // 登录成功后将token值上传
                state.token = [
                    {
                        'username': '哀',
                        'imgurl': 'https://i0.hdslb.com/bfs/face/3b3a5d2d20d33772179370a156333927b2a138bd.jpg',
                        'money': state.money,
                        'reading': state.reading,
                        'free': state.free,
                        'discount': state.discount
                        // 'loginShow': state.loginShow
                    }
                ];

                // 上传token值
                // window.localStorage.setItem("token", JSON.stringify(state.token));

                // 封装类的方法
                SessionUtils.set('token', state.token);


                if (localStorage.getItem('token')) {
                    // 登录后显示追漫、历史和头像
                    state.loginShow = !state.loginShow;
                    SessionUtils.set('loginShow', state.loginShow);
                }

                window.location.reload();
            }

        },
    },
}