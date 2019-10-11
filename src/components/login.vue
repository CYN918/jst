<template>
    <div class="login">
        <div class="login-top">
            <p class="title">登录</p>
            <p class="message">请填写账号信息</p>
        </div>
        <form class="formData">
            <div class="account">
                <div class="account-left clearfix">
                    <div class="account-icon">
                        <i class="account-icon-arrow"></i>
                    </div>
                </div>
                <input v-model="mobile" name="mobile" value="" type="text" placeholder="请输入手机号" maxlength="11"/>
            </div>
            <div class="line"></div>
            <div class="password">
                <div class="password-left clearfix">
                    <div class="password-icon">
                        <i class="password-icon-arrow"></i>
                    </div>
                </div>
                <input v-model="password" name="password" value="" type="password" placeholder="请输入密码"/>
            </div>
        </form>
        <div class="ve-bottom-tj">
            <mt-button  size="large" :disabled="subumting"  @click="refergo" :plain="true" type="primary">
                <span v-if="!subumting">登录</span>
                <span style="display:table-cell;" v-else><mt-spinner :type="2" color="#26a2ff"></mt-spinner></span>
            </mt-button>
        </div>
        <div class="quick-nav clearfix">
            <a class="J_ping quickReg" style="display:block;">
                <router-link to="/register" slot="left">
                    <span class="txt-quickReg">立即注册</span>
                </router-link>
            </a>
            <a class="J_ping planBLogin" style="display:block;">
                <router-link to="/password" slot="right">
                    <span class="txt-planBLogin">忘记密码？</span>
                </router-link>
            </a>
	    </div>
    </div>
</template>
<script>
import { Spinner } from 'mint-ui';
import { Toast } from 'mint-ui';
import localStore from '@/localstorage.js';
import axios from 'axios';

export default {
    name: 'login',
    data () {
        return {
            mobile: '',
            password: '',
            subumting: false,
        }
    },
    components:{
        
    },
    watch: {
        token: {
			handler: function (token) {
				localStore.save(token)
			},
		deep: true
		}
	},
    methods: {
        refergo () {
            if (this.mobile.length != 11) {
                Toast({
                    message: '请填写正确手机号码',
                    duration: 2000
                });
                return false
            }
            if (this.password.length < 6 || this.password.length > 16) {
                Toast({
                    message: '请填写6到16位的密码',
                    duration: 2000
                });
                return false
            }
            this.subumting = true
            var formData = new FormData();
            formData.append("mobile", this.mobile);
            formData.append("password", this.password); 
            axios({
                url: '/api/login/doLogin',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    Toast(respanse.data.message);
                    this.$router.push({path: '/'});
                    let token = respanse.data.data.token;
                    localStore.save(token);
                }else if(respanse.data.code == 1){
                    Toast(respanse.data.message);
                }else if(respanse.data.code == -1){
                    Toast(respanse.data.message);
                }
            })
  
        },
    },
    mounted () {
        
    }
}
</script>
<style scoped>
    .login{
        position: relative;
    }
    .login-top{
        width: 80%;
        margin: 0px auto;
        padding-top: 101px;
    }
    .login-top .title{
        font-size: 27px;
        color: #222222;
        text-align: left;
    }
    .login-top .message{
        font-size: 17px;
        color: #666666;
        padding-top: 14px;
        text-align: left;
    }
    .ve-bottom-tj{
        margin-top: 1.2rem;
        margin-bottom: 0.2rem;
        padding:0rem 0.4rem;
    }
    .ve-bottom-tj >>> .mint-button{
        background: #FF6A48;
        width: 85%;
        margin: 0px auto;
        color: #FFFFFF;
        font-size: 18px;
        border: none;
        border-radius: 40px;
    }
    .ve-bottom-dx{
        margin-top: 0.5rem;
    }
    .ve-bottom-dx a{
        color:#fff;
    }
    .ve-input-mt{
    }
    .quick-nav {
        width:100%;
        zoom: 1;
        display: inline-block;
        margin-top: .6rem;
        text-align: center;
    }
    .quick-nav a:first-child {
        float: left;
        padding-left: 0.6rem;
        cursor: pointer;
    }
    .quick-nav a:last-child {
        float: right;
        padding-right: 0.6rem;
        
    }
    .quick-nav a:last-child > span{
        font-size: 14px;
        color: #FF6A48;
    }
    .quick-nav a {
        font-size: 0.4rem;
        color: #999;
        line-height: .22rem;
        text-decoration: none;
        padding: 0rem .3rem;
    }
    .formData{
        width: 80%;
        margin: 64px auto;
    }
    .formData .account,.formData .password{
        height: 47px;
        border-bottom: 1px solid #4D4D4D;
    }
    .line{
        height: 1rem;
    }
    .formData .account > input,.formData .password > input{
        border: none;
        outline: none;
        height: 37px;
        font-size: 17px;
        float: left;
        background: none;
        padding-left: 12px;
    }
</style>
