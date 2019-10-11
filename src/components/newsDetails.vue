<template>
    <div class="contain">
        <div class="head">
            <router-link to="/newsList" class="back"><i class="icon-back"></i></router-link>
            <span class="title">消息详情</span>
        </div>
        <div class="box">
            <div class="box-list">
                <ul>
                    <li class="teshu"><span class="left">{{title}}</span><br/><span class="right">{{time}}</span></li>
                    <li class="teshu">{{content}}</li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'newsDetails',
    data () {
        return {
            id: this.$route.params.id,
            title: '',
            time: '',
            content: '',
        }
    },
    components:{
        
    },
    methods: {
        getData(){
            axios.get('/api/user/noticeDetail?id=' + this.id).then(respanse=>{
                if(respanse.data.code == 0){
					this.title = respanse.data.data.title;
                    this.time = respanse.data.data.time;
                    this.content = respanse.data.data.content;
                }else{
                    Toast(respanse.data.message);
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
    .box{
        width: 97%;
        height: 160px;
        margin: 0 auto;
        padding: 0;
        margin-top:15px;
        background: #FFFFFF;
    }
    .box-list > ul > li{
        width: 95%;
        margin: 0 auto;
        min-height: 80px;
        text-align: left;
        font-size: 14px;
        color: #5C5C5C;
        padding-top: 20px;
    }
    .teshu{
        border-bottom: 1px solid #e5e5e5;
    }
    .teshu .left{
        font-size: 14px;
        color: #222222;
    }
    .teshu .right{
        font-size: 12px;
        color: #666666;
        margin-top: 15px;
        display: block;
    }

</style>
