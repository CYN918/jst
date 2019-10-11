<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i></router-link>
            <span class="title">消息通知</span>
        </div>
        <div class="box">
            <div class="box-list" v-if="this.list != null">
                <ul v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="15">
                    <li class="generalize partner" v-for="item in list">
                        <div class="item clearfix">
                            <div class="item-top clearfix">
                                <a  @click="btnClick(item.id)">
                                    <div class="content fl">
                                        <div class="title"> 
                                            <span class="version-text-top">
                                                {{item.title}}
                                            </span><br/> 
                                            <span class="version-text-bottom">
                                                {{item.time}}
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
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="box-list" v-else>
                <img src="../assets/img/wuxiaoxi_icon.png"/>
                <p>无消息</p>
            </div>
        </div>
        
    </div>
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'newsList',
    data () {
        return {
            list: [],
        }
    },
    components:{
        
    },
    methods: {
        getData(){
            var formData = new FormData();
            formData.append("M_", 1);
            formData.append("N_", 15);
            axios({
                url: '/api/user/noticeList',
                method: 'get',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.list = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                
                this.loading = false;
            }, 2500);
        },
        btnClick(id){
            this.$router.push({name: 'NewsDetails',params:{id: id}});
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
        min-height: 160px;
        margin: 0 auto;
        padding: 0;
        margin-top:4px;
        background: #FFFFFF;
    }
    .box-list > ul > li{
        width: 95%;
        margin: 0 auto;
        height: 75px;
        text-align: left;
        font-size: 14px;
        color: #5C5C5C;
        padding-top: 20px;
        border-bottom: 1px solid #e5e5e5;
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
    .toggle {
        line-height: 48px;
        text-align: center;
    }
    .toggle i {
        width: 8px;
        height: 14px;
        display: inline-block;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .version-text-top{
        color: #999999;
        font-size: 15px;
    }
    .version-text-bottom{
        color: #A8A8A8;
        font-size: 12px;
        display: block;
        padding-top: 15px;
    }
    .box-list > img{
        margin-top: 2rem;
    }

</style>
