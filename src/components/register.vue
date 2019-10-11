<template>
    <div class="login">
        <div class="head">
			<router-link to="/login" class="back"><i class="icon-back"></i></router-link>
			<span class="title">立即注册</span>
		</div>
        <div class="form">
            <div class="active"><label>手机号</label><input type="text" placeholder="请输入手机号" v-model="phone"/></div>
            <div class="active"><label>新密码</label><input type="password" placeholder="请输入新密码" v-model="password"/></div>
            <div class="active"><label>推荐人</label><input type="text" placeholder="请输入推荐人手机号" v-model="rmobile"/></div>
            <div class="active"><label>图形验证码</label><input class="captchaImage" type="text" placeholder="请输图形验证码" v-model="captchaImage"/><img class="Img" @click="refreshCaptcha" id="Img" src='http://120.24.160.251:8080/application/imgCode?+ Math.random()' /></div>
            <div>
                <label>短信验证码</label>
                <input type="text" placeholder="请输入短信验证码" v-model="code"/>
                <mt-button v-if="phoneCodeStatus" size="small" type="default" class="ve-send-code"  @click="postphonecode">发送验证码</mt-button>
                <mt-button v-else-if="!phoneCodeStatus" size="small" type="default" class="ve-send-code" >倒计时{{ count }}S</mt-button>
            </div>
        </div>
        <div class="agreement"><input type="checkbox" v-model="inputCheck"/>注册即表示本人同意<router-link to="">《服务协议》</router-link></div>
        <div class="ve-bottom-tj">
            <mt-button  size="large" :disabled="subumting"  @click="refergo" :plain="true" type="primary">
                <span v-if="!subumting">确认</span>
                <span style="display:table-cell;" v-else><mt-spinner :type="2" color="#26a2ff"></mt-spinner></span>
            </mt-button>
        </div>
    </div>
</template>
<script>
    import { Spinner } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import axios from 'axios'

    export default {
	  name: 'register',
        data () {
            return {
                timer: null,
                count: 0,
                phone: '',
                password: '',
                rmobile: '',
                captchaImage: '',
                code: '',
                subumting: false,
                phoneCodeStatus: true,   
                inputCheck: '',
            }
        },
	    components:{
	  	    
        },
		methods: {
            refergo () {
                if (this.phone.length != 11) {
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
                if (!this.captchaImage) {
                    Toast({
                        message: '请填写图形验证码',
                        duration: 2000
                    });
                    return false
                }
                if (this.code.length != 6) {
                    Toast({
                        message: '请填写4位验证码',
                        duration: 2000
                    });
                    return false
                }
                if (!this.inputCheck) {
                    Toast({
                        message: '请勾选注册协议',
                        duration: 2000
                    });
                    return false
                }
                this.subumting = true
                var formData = new FormData();
                formData.append("password", this.password);
                formData.append("mobile", this.phone); 
                formData.append("code", this.code);
                formData.append("rmobile", this.rmobile);
                formData.append("captcha", this.captchaImage);
                axios({
                    url: '/api/login/doRegister',
                    method: 'post',
                    data: formData,
                }).then(respanse=>{
                    if(respanse.data.code == 0){
                        Toast(respanse.data.message);
                        this.$router.push({path: '/login'});    
                    }else if(respanse.data.code == 1){
                        Toast(respanse.data.message);
                    }else if(respanse.data.code == -1){
                        Toast(respanse.data.message);
                    }
                })
            },
            postphonecode () {
                if(this.phone.length != 11){
                    Toast({
                        message: '请填写正确手机号码',
                        duration: 2000
                    });
                    return false
                }
                if(!this.captchaImage){
                    Toast({
                        message: '请填写图形验证码',
                        duration: 2000
                    });
                    return false
                }
                var formData = new FormData();
                formData.append("mobile", this.phone);
                formData.append("type", 9); 
                formData.append("captcha", this.captchaImage);
                axios({
                    url: '/api/user/sendCode',
                    method: 'post',
                    data: formData,
                }).then(respanse=>{
                    this.subumting = false
                    if(respanse.data.RSP_CODE_ == 'SUCCESS'){
                        Toast(respanse.data.RSP_MSG_); 
                        let _this = this
                        const TIME_COUNT = 60;//倒计时60s
                        this.count = TIME_COUNT;//赋值，以便判断时间
                        this.phoneCodeStatus = false
                        this.timer = setInterval(function() {
                            if (_this.count > 0 && _this.count <= TIME_COUNT) {
                                _this.count--;
                            } else {
                                _this.phoneCodeStatus = true
                                clearInterval(_this.timer);
                                _this.timer = null;
                            }
                        }, 1000) 
                    }else{
                        Toast(respanse.data.message);
                    }
                })
            },
            refreshCaptcha() {
                document.getElementById("Img").src = 'http://120.24.160.251:8080/application/imgCode?' + Math.random();
            }
        },
        mounted () {
            
        }
	}
</script>
<style scoped>
    .head{
        background: #FFFFFF;
    }
    .head .title{
        color: #222222;
        font-size: 18px;
    }
    .head .back span{
        color: #222222;
    }
    .login >>> .mb-login-logobox{
        margin-top:80px;
    }
    .form{
        width: 95%;
        height: 275px;
        background: #FFFFFF;
        margin: 12px auto;
    }
    .form > div{
        height: 55px;
        line-height: 55px;
        width: 95%;
        margin: 0px auto;
    }
    .form .active{
        border-bottom: 1px solid #EBEBEB;
    }
    .form > div > label{
        font-size: 14px;
        color: #4D4D4D;
        float: left;
    }
    .form > div > input{
        border: none;
        outline: none;
        height: 54px;
        float: left;
        font-size: 14px;
        padding-left: 16px;
        width: 48%;
    }
    .captchaImage{
        width: 30% !important;
    }
    .form > div .Img{
        float: right;
        padding-top: 16px;
    }
    .mb-login-logobox .mb-logobox-img{
        text-align:center;
        margin-top:20px;
    }
    .ve-bottom-tj{
        margin-top: 1.2rem;
        margin-bottom: 1rem;
        padding:0rem 0.4rem;
    }
    .ve-input-mt{
    }
    .quick-nav {
        margin-top: .2rem;
        text-align: center;
        padding: 0rem .3rem;
    }
    .quick-nav a:first-child {
        float: left;
    }
    .quick-nav a:last-child {
        float: right;
    }
    .quick-nav a {
        font-size: .4rem;
        color: #999;
        line-height: .22rem;
        text-decoration: none;
    }
    .ve-send-code{
        color: #2f2d2d;
        padding:0rem .2rem;
        width: 80px;
        height: 28px;
        background: #FF6A48;
        color: #FFFFFF;
        font-size: 12px;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
    }
    .login >>> .mint-cell-text{
        float: left;
    }
    .text-tishi{
        font-size: 13px;
        color: rgb(7, 167, 127);
        margin: 15px 0px 15px 0px;
    }
    .agreement{
        font-size: 14px;
        color: #333;
        text-align: left;
        width: 90%;
        margin: 0px auto;
    }
    .agreement > input{
        position: relative;
        top: 2px;
    }
    .agreement > a{
        color: #FF6A48;
    }
    .ve-bottom-tj >>> .mint-button{
        background: #FF6A48;
        color: #FFFFFF;
        border-radius: 22.5px;
        border: none;
    }
</style>