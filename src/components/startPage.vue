<template>
    <div>
        <img src="../assets/img/startPage.png" alt="" title="让支付变的更简单" />
        <!-- <div class="advertising">{{count}}<router-link to="/index" class="back">跳过广告</router-link></div> -->
    </div>     
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'startPage',
    data(){
        return {
            count:"",//倒计时
        }
    },
    components:{

    },
    created(){
        this.goGrdoupRecor();
    },
    methods:{
        goGrdoupRecor(){
            const TIME_COUNT = 60;
            if(!this.timer){
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(()=>{
                    if(this.count > 0 && this.count <= TIME_COUNT){
                        this.count--;
                    }else{
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                         
                        axios.post('/api/login/loginCheck').then(respanse=>{
                            if(respanse.data.code == 0){
                                //跳转的页面写在此处
                                this.$router.push({path: '/'});
                            }else if(respanse.data.code == 1){
                                //跳转的页面写在此处
                                this.$router.push({path: '/login'});
                            }else{
                                Toast(respanse.data.message);
                            }
                        })
                    }
                })
            }
        },
    },
    mounted () {
        
    },
}
</script>
<style scoped>
    div{
        width: 100%;
        height: 100%;
        overflow-x:hidden;
        overflow-y:hidden;
        top:0;
        z-index: -1;
        position: absolute;
    }
    div > img{
        width: 100%;
        height: auto;
        overflow-x:hidden;
        overflow-y:hidden;
        display: block;
        outline: none;
        border:0;
    }
    .advertising{
        position: absolute;
        z-index: 666666;
        top: 20px;
        left: 250px;
        width: 100px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #868686;
        border-radius: 10px;
        display: none;
    }
</style>