<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i><span>返回</span></router-link>
            <span class="title">设置</span>
        </div>
        <div class="main my-partner noticeList">
            <div class="record-list">
                <ul>
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <router-link to="/personalInformation">
                                    <div class="content fl">
                                        <div class="title"> 
                                            <span class="version-text">
                                                个人信息
                                            </span>     
                                        </div>
                                    </div>
                                    <div class="version-icon-box fr">
                                        <div class="toggle">
                                            <div class="icon-box">
                                                <i class="icon-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </li>
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <router-link to="/updatePwd">
                                    <div class="content fl">
                                        <div class="title">
                                            <span class="version-text">
                                                修改密码
                                            </span> 
                                        </div>
                                    </div>
                                    <div class="version-icon-box fr">
                                        <div class="toggle">
                                            <div class="icon-box">
                                                <i class="icon-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </li>
                    
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <router-link to="/releaseNotes">
                                    <div class="content fl">
                                        <div class="title">   
                                            <span class="version-text">
                                                版本说明
                                            </span>     
                                        </div>
                                    </div>
                                    <div class="version-icon-box fr">
                                        <div class="toggle">
                                            <div class="icon-box">
                                                <i class="icon-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </li>
                    
                    <li class="generalize partner" @click="loginOut();">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <div class="content fl">
                                    <div class="title">
                                        <span class="version-text">
                                            退出登录
                                        </span>
                                    </div>
                                </div>
                                <div class="version-icon-box fr">
                                    <div class="toggle">
                                        <div class="icon-box">
                                            <i class="icon-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import localStore from '@/localstorage.js';
import axios from 'axios'
export default {
    name: 'setting',
    data () {
        return {
            
        }
    },
    components:{
        
    },
    methods: {
        loginOut(){
            MessageBox.confirm('', {
                 message: '确认退出？', 
                 confirmButtonText: '确认', 
                 cancelButtonText: '取消' 
            }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                    axios.get('/api/login/logout').then(respanse=>{
                        if(respanse.data.code == 0){
                            Toast(respanse.data.message);
                            this.$router.push({path: '/login'});
                            localStorage.clear();
                        }else{
                            Toast(respanse.data.message);
                        }
                    })    
             	}
            }).catch(err => { 
             	if (err == 'cancel') {     //取消的回调

             	} 
            });
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
    .version-text{
        font-size: 15px;
        color: #222222;
    }

</style>
