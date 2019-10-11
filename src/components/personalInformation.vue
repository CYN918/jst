<template>
    <div class="contain">
        <div class="head">
            <router-link to="/setting" class="back"><i class="icon-back"></i><span>返回</span></router-link>
            <span class="title">个人信息</span>
        </div>
        <div class="main my-partner noticeList">
            <div class="record-list">
                <ul>
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix">   
                                <div class="content fl">
                                    <div class="title"> 
                                        <span class="version-text">
                                            头像
                                        </span>     
                                    </div>
                                </div>
                                <div class="version-icon-box fr" @click.stop="uploadHeadImg">
                                    <div class="toggle">
                                        <img class="Img" v-bind:src="image" :onerror="defaultImg"/>
                                    </div>
                                </div> 
                                <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>   
                            </div>
                        </div>
                    </li>
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <div class="content fl">
                                    <div class="title">
                                        <span class="version-text">
                                            实名认证
                                        </span> 
                                    </div>
                                </div>
                                <div class="version-icon-box fr">
                                    <div class="toggle">
                                        <div class="icon-box" v-if="this.name != null">
                                            {{name}}
                                        </div>
                                        <div class="icon-box" v-else>
                                            未认证
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </li>
                    
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix"> 
                                <div class="content fl">
                                    <div class="title">   
                                        <span class="version-text">
                                            手机号码
                                        </span>     
                                    </div>
                                </div>
                                <div class="version-icon-box fr">
                                    <div class="toggle">
                                        <div class="icon-box">
                                            {{mobile}}
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </li>
                    
                    <li class="generalize partner">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <div class="content fl">
                                    <div class="title">
                                        <span class="version-text">
                                            是否激活
                                        </span>
                                    </div>
                                </div>
                                <div class="version-icon-box fr">
                                    <div class="toggle">
                                        <div class="icon-box" v-if="this.isActivation == true">
                                            已激活
                                        </div>
                                        <div class="icon-box" v-if="this.isActivation == false">
                                            未激活
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
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'personalInformation',
    data () {
        return {
            image: '',
            name: '',
            mobile: '',
            isActivation: '',
            defaultImg: 'this.src="'+ require('../assets/img/portrait.png') +'"',
        }
    },
    components:{
        
    },
    methods: {
        // 打开图片上传
        uploadHeadImg: function () {
            this.$el.querySelector('.hiddenInput').click()
        },
         // 将头像显示
        handleFile: function (e) {
            let $target = e.target || e.srcElement
            let file = $target.files[0]
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.image = res.result
            }
            reader.readAsDataURL(file)
        },
        getData(){
            axios.get('/api/user/information').then(respanse=>{
                if(respanse.data.code == 0){
					this.image = respanse.data.data.photo;
                    this.name = respanse.data.data.name;
                    this.mobile = respanse.data.data.mobile.substring(0,3)+"****"+respanse.data.data.mobile.substring(8,11);
                    this.isActivation = respanse.data.data.isActivation;
                }else{
                    Toast(respanse.data.message);
                }
            })
        }
    },
    mounted () {
        this.getData();
    }
}
</script>
<style scoped>
    .hiddenInput{
        display: none;
    }
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
    .icon-box{
        width: 48px;
        height: 48px;
    }
    .record-list .generalize .item-top .toggle i{
        width: 48px;
        height: 48px;
    }
    .Img{
        width: 40px;
        height: 40px;
        position: relative;
        top: 5px;
    }
    

</style>
