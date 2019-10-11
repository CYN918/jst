<template>
    <div class="contain">
        <div class="head">
            <router-link to="/setting" class="back"><i class="icon-back"></i><span>返回</span></router-link>
            <span class="title">版本说明</span>
        </div>
        <div class="box">
            <div class="box-list">
                <ul>
                    <li class="teshu"><span class="left">版本信息 {{version}}</span><span class="right">{{date}}</span></li>
                    <div class="txt" v-html="content">{{content}}</div>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'releaseNotes',
    data () {
        return {
            version: '',
            date: '',
            content: '',
        }
    },
    components:{
        
    },
    methods: {
        getData(){
            axios.get('/api/user/setting').then(respanse=>{
                if(respanse.data.code == 0){
					this.version = respanse.data.data.version;
                    this.date = respanse.data.data.date;
                    this.content = respanse.data.data.content;
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
    .box{
        width: 97%;
        min-height: 162px;
        margin: 0 auto;
        padding: 0;
        margin-top:15px;
        background: #FFFFFF;
    }
    .box-list > ul > li{
        width: 95%;
        margin: 0 auto;
        height: 41px;
        line-height: 41px;
        text-align: left;
        font-size: 12px;
        color: #222222;
    }
    .teshu{
        border-bottom: 1px solid #e5e5e5;
    }
    .teshu .left{
        float: left;
        font-size: 14px;
        color: #222222;
    }
    .teshu .right{
        float: right;
        font-size: 12px;
        color: #666666;
    }
    .txt{
        width: 95%;
        margin: 0 auto;
        text-align: left;
        font-size: 12px;
        color: #222222;
        line-height: 20px;
    }

</style>
