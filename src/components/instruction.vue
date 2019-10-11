<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">操作说明</span>
        </div>
        <div class="main instructions">
            <div class="instructions-list">
                <div class="item flex">
                    <div class="show-pic">
                        <img src="../assets/img/instructions1.png" width="138px" height="88.5px"/>
                    </div>
                    <div class="item-info flex-item">
                        <div class="title" style="text-align: left;">{{title1}}</div>
                        <div class="item-btn">
                            <router-link to="/user/shareInsJfb?title=即付宝尊享版操作指引&desc=即付宝尊享版操作指引&share_url=http://data198.com/user/instructionsjfb?mobile=" class="btn btn-o-green">分享</router-link>
                            <router-link to="/instructionscp" class="btn btn-o-green">了解详情</router-link>
                        </div>
                    </div>
                </div>
                <div class="item flex">
                    <div class="show-pic">
                        <img src="../assets/img/instructions2.png"/>
                    </div>
                    <div class="item-info flex-item">
                        <div class="fl title" style="text-align: left;">{{title2}}</div>
                        <div class="fr item-btn">
                            <router-link to="/user/shareInsCp?title=即推宝服务号开通合伙人流程&desc=即推宝服务号开通合伙人流程&share_url=http://data198.com/user/instructionscp?mobile=" class="btn btn-o-green">分享</router-link>
                            <router-link to="/instructionsip" class="btn btn-o-green">了解详情</router-link>
                        </div>
                    </div>
                </div>
                <div class="item flex">
                    <div class="show-pic">
                        <img src="../assets/img/instructions3.png"/>
                    </div>
                    <div class="item-info flex-item">
                        <div class="fl title" style="text-align: left;">{{title3}}</div>
                        <div class="fr item-btn">
                            <router-link to="/user/shareInsIp?title=即推宝服务号用户装机流程&desc=即推宝服务号用户装机流程&share_url=http://data198.com/user/instructionsip?mobile=" class="btn btn-o-green">分享</router-link>
                            <router-link to="/instructionsip2" class="btn btn-o-green">了解详情</router-link>
                        </div>
                    </div>
                </div>
                <div class="item flex">
                    <div class="show-pic">
                        <img src="../assets/img/instructions4.png"/>
                    </div>
                    <div class="item-info flex-item">
                        <div class="fl title" style="text-align: left;">{{title4}}</div>
                        <div class="fr item-btn">
                            <router-link to="/user/shareInsIp2?title=即推宝APP安装流程&desc=即推宝APP安装流程&share_url=http://data198.com/user/instructionsip2?mobile=" class="btn btn-o-green">分享</router-link>
                            <router-link to="/instructionsjfb" class="btn btn-o-green">了解详情</router-link>
                        </div>
                    </div>
                </div>
                <div class="item flex">
                    <div class="show-pic">
                        <img src="../assets/img/instructions5.png"/>
                    </div>
                    <div class="item-info flex-item">
                        <div class="fl title" style="text-align: left;">{{title5}}</div>
                        <div class="fr item-btn">
                            <router-link to="/user/shareInsJpos?title=即POS操作流程指引&desc=即POS操作流程指引&share_url=http://data198.com/user/instructionsjpos?mobile=" class="btn btn-o-green">分享</router-link>
                            <router-link to="/instructionsjpos" class="btn btn-o-green">了解详情</router-link>
                        </div>
                    </div>
                </div>
                <div class="item flex">
                    <div class="show-pic">
                        <img src="../assets/img/instructions6.png"/>
                    </div>
                    <div class="item-info flex-item">
                        <div class="fl title" style="text-align: left;">{{title6}}</div>
                        <div class="fr item-btn">
                            <router-link to="/user/shareInsJpos2?title=即POS终端机更新机具操作&desc=即POS终端机更新机具操作&share_url=http://data198.com/user/instructionsjpos2?mobile=" class="btn btn-o-green">分享</router-link>
                            <router-link to="/instructionsjpos2" class="btn btn-o-green">了解详情</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'instruction',
    data () {
        return {
            title1: '',
            title2: '',
            title3: '',
            title4: '',
            title5: '',
            title6: '',
        }
    },
    components:{
        
    },
    methods: {
        getData(){
			axios.get('/api/user/instruction').then(respanse=>{
                if(respanse.data.code == 0){
					this.title1 = respanse.data.data.INSTRUCTIONS_JFB;
                    this.title2 = respanse.data.data.INSTRUCTIONS_CP;
                    this.title3 = respanse.data.data.INSTRUCTIONS_IP;
                    this.title4 = respanse.data.data.INSTRUCTIONS_IP2;
                    this.title5 = respanse.data.data.INSTRUCTIONS_JPOS;
                    this.title6 = respanse.data.data.INSTRUCTIONS_JPOS2;
                }else{
                    this.$router.push({path: '/login'});
                }
            })
		},
    },
    mounted () {
        this.getData();
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

</style>
