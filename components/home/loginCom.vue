<script>
import { ref } from 'vue'
import { useStore } from 'vuex';

export default {
    setup() {
        const flag = ref(true);
        const store = useStore();
        const phone = ref('');
        const password = ref('');
        const classNameflag = ref(true);
        const dialogFormVisible = ref(false);


        // 事件方法
        const className = () => {
            classNameflag.value = !classNameflag.value;
            flag.value = !flag.value
        }

        const submit_login = () => {
            store.commit('Login/submit_login', {
                phone: phone.value,
                password: password.value
            })
        }

        return {
            phone,
            password,
            dialogFormVisible,
            flag,
            classNameflag,
            // 事件方法
            className,
            submit_login
        }
    },
}
</script>

<template>
    <div class="login_box">
        <el-dialog v-model="$store.state.Login.dialogVisible" :close-on-click-modal="false" show-close="true">
            <div id="login">
                <div id="QR_code_login">
                    <div class="QR_code_login_title">
                        <p>扫描二维码登录</p>
                    </div>
                    <div class="QR_code">
                        <img src="../../assets/img/qr_code.png" alt="">
                    </div>
                    <div class="QR_code_info">
                        <p>请使用哔哩哔哩客户端</p>
                        <p>扫码登录或扫码下载APP</p>
                    </div>
                </div>
                <div class="border"></div>
                <div class="loginFrom">
                    <div class="loginFrom_title" @click="className">
                        <p :class="{ 'con': classNameflag, '': !classNameflag }">密码登录</p>
                        <span></span>
                        <p :class="{ '': classNameflag, 'con': !classNameflag }">短信登录</p>
                    </div>
                    <div class="loginFrom_info_login" v-if="flag">
                        <div class="form">
                            <div class="phone">
                                账号
                                <input type="text" placeholder="请输入账号" v-model="phone" />
                            </div>
                            <div class="password">
                                密码
                                <input type="password" placeholder="请输入密码" v-model="password" />
                                <button class="getCode">忘记密码?</button>
                            </div>
                        </div>
                        <div class="login_register">
                            <div class="Register" @click="className">注册</div>
                            <div class="Login" @click="submit_login">登录</div>
                        </div>
                    </div>
                    <div class="loginFrom_info_register" v-if="!flag">
                        <div class="form_regiter">
                            <div class="phone">
                                <div class="left">
                                    +86 <span class="iconfont icon-xialaxiao"></span>
                                    <input type="text" placeholder="请输入手机号" />
                                </div>
                                <div class="right">
                                    <span class="line"></span>
                                    <div class="text">
                                        短信验证码
                                    </div>
                                </div>
                            </div>
                            <div class="password">
                                验证码
                                <input type="password" placeholder="请输入验证码" />
                            </div>
                            <div class="login_register">
                                <div>
                                    登录 / 注册
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="other_login_register">
                        <p class="mode">其他登录方式</p>
                        <div class="mode_list">
                            <div class="wx">
                                <span>微信登录</span>
                            </div>
                            <div class="wb">
                                <span>微博登录</span>
                            </div>
                            <div class="qq">
                                <span>QQ登录</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="agreement_wrapper">
                <div class="agreement_content">
                    <p>未注册过哔哩哔哩的手机号，我们将自动帮你注册账号</p>
                    <p>登录或完成注册即代表你同意
                        <a target="_blank" href="https://www.bilibili.com/protocal/licence.html">
                            用户协议 </a>
                        和
                        <a target="_blank" href="https://www.bilibili.com/blackboard/privacy-pc.html"> 隐私政策 </a>
                    </p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.login_box {
    width: 1160px;
    height: 0;
}

.login_box .el-dialog__wrapper {
    width: 663px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 0 6px rgb(0 0 0 / 10%);
    padding: 52px 65px 29px 92px;
    box-sizing: border-box;
    background-color: #fff;
    background-image: url('../../assets/img/login01.png'), url('../../assets/img/login02.png');
    background-position: 0 100%, 100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 14%;
    position: relative;
    user-select: none;
    display: flex;
}

.login_box ::v-deep .el-overlay-dialog {
    position: fixed;
    top: 50%;
    right: 0;
    margin-top: -240px;
    bottom: 0;
    left: 0;
    overflow: auto;
}

.login_box ::v-deep .el-dialog {
    width: 663px;
    height: 400px;
    margin: 0 auto;
    box-shadow: none;
    background-color: #fff;
    position: relative;
    padding: 52px 65px 29px 92px;
    box-sizing: content-box;
}

#login {
    display: flex;
}

.login_box ::v-deep .el-dialog__header,
.login_box ::v-deep .el-dialog__body {
    padding: 0;
}

// .login_box ::v-deep .el-dialog__header {
//     // height: 50px;
//     // position: absolute;
//     // top: -60px;
//     // left: 64px;
//     // height: 50px;
//     // width: 100%;
// }

.login_box ::v-deep .el-dialog__headerbtn {
    top: -54px;
    right: -54px;
}

#QR_code_login {
    flex: 1;

    .QR_code_login_title {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        text-align: center;
    }

    .QR_code {
        box-sizing: border-box;
        width: 173px;
        height: 173px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border: 1px solid #e7e7e7;
        border-radius: 8px;
        margin: 0 auto;
        margin-top: 20px;
    }

    .QR_code_info {
        margin-top: 20px;
        text-align: center;
    }
}

.border {
    flex: 0.2;
    margin-top: 40px;
    // margin-left: 30px;
    height: 220px;
    border-left: 1px solid #e7e7e7;
}

.loginFrom {
    height: 100%;
    flex: 2;

    .loginFrom_title {
        display: flex;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        justify-content: center;

        p {
            cursor: pointer;
        }

        span {
            height: 100%;
            margin: 0 10px;
            border-left: 2px solid #e7e7e7;
        }

        p.con {
            color: #4fa5d9;
        }
    }

    .loginFrom_info_login {
        width: 100%;
        margin-top: 20px;

        .phone {
            width: 400px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #000;
            border: 1px solid #e7e7e7;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-indent: 1em;

            input {
                width: 230px;
                border: 0px;
                color: #000;
                height: 100%;
                margin-left: 8px;
            }
        }

        .password {
            width: 400px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #000;
            border: 1px solid #e7e7e7;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            text-indent: 1em;
            display: flex;

            input {
                width: 230px;
                border: 0px;
                color: #000;
                height: 100%;
                margin-left: 8px;
            }

            button {
                border: 0px;
                margin-left: 10px;
                background-color: transparent;
            }
        }
    }

    .loginFrom_info_register {
        width: 100%;
        margin-top: 20px;

        .phone {
            width: 400px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #000;
            border: 1px solid #e7e7e7;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-indent: 1em;
            display: flex;

            span.iconfont {
                font-size: 12px;
            }

            input {
                width: 230px;
                border: 0px;
                color: #000;
                height: 100%;
                margin-left: 8px;
            }

            .right {
                display: flex;
                align-items: center;

                .line {
                    display: inline-block;
                    width: 1px;
                    height: 26px;
                    background: #e7e7e7;
                }

                .text {
                    font-size: 14px;
                    color: #00a1d6;
                    cursor: pointer;
                }
            }
        }

        .password {
            width: 400px;
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #000;
            border: 1px solid #e7e7e7;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            text-indent: 1em;
            display: flex;

            input {
                width: 230px;
                border: 0px;
                color: #000;
                height: 100%;
                margin-left: 8px;
            }

            button {
                border: 0px;
                margin-left: 10px;
                background-color: transparent;
            }
        }

        .login_register {
            div {
                background-color: #ff0066;
                color: #fff;
                box-sizing: border-box;
                width: 194px;
                height: 40px;
                border-radius: 8px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }

    .login_register {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;

        .Register {
            border: 1px solid #e7e7e7;
            color: #000;
            margin-right: 13px;
            box-sizing: border-box;
            width: 194px;
            height: 40px;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }

        .Login {
            background-color: #ff0066;
            color: #fff;
            margin-right: 13px;
            box-sizing: border-box;
            width: 194px;
            height: 40px;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
    }

    .other_login_register {
        margin-top: 24px;

        .mode {
            font-size: 13px;
            line-height: 16px;
            text-align: center;
            color: #999;
            margin-bottom: 12px;
        }

        .mode_list {
            display: flex;
            justify-content: center;
        }

        .wx {
            font-size: 12px;
            margin-right: 30px;
            cursor: pointer;
            display: flex;
            justify-content: center;

            &::before {
                display: inline-block;
                content: "";
                width: 28px;
                height: 28px;
                margin-right: 8px;
                background: url('../../assets/img/微信.png') no-repeat;
                background-size: cover;
            }
        }

        .wb {
            font-size: 12px;
            margin-right: 30px;
            cursor: pointer;
            display: flex;
            justify-content: center;

            &::before {
                display: inline-block;
                content: "";
                width: 28px;
                height: 28px;
                margin-right: 8px;
                background: url('../../assets/img/微博.png') no-repeat;
                background-size: cover;
            }
        }

        .qq {
            font-size: 12px;
            margin-right: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            &::before {
                display: inline-block;
                content: "";
                width: 28px;
                height: 28px;
                margin-right: 8px;
                background: url('../../assets/img/qq.png') no-repeat;
                background-size: cover;
            }
        }
    }
}

.agreement_wrapper {
    font-size: 13px;
    color: #999;
    margin-top: 40px;

    .agreement_content {
        p {
            text-align: center;
            line-height: 19px;
            font-size: 12px;

            a {
                color: #00a1d6;
                cursor: pointer;
            }
        }
    }
}
</style>