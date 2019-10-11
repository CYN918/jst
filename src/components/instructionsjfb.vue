<template>
    <div class="contain">
        <div class="head">
            <router-link to="/instruction" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">即推宝APP安装流程</span>
        </div>
        <div class="main instructions">
            <div class="instructions-list">
                <img src="../assets/img/ip21.png"/>
                <img src="../assets/img/ip22.png"/>
                <img src="../assets/img/ip23.png"/>
                <img src="../assets/img/ip24.png"/>
                <img src="../assets/img/ip25.png"/>
                <img src="../assets/img/ip26.png"/>
                <img src="../assets/img/ip27.png"/>
                <img src="../assets/img/ip28.png"/>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'instructionsjfb',
    data () {
        return {
            
        }
    },
    components:{
        
    },
    methods: {
        
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
    .instructions-list{
        width: 100%;
    }
    .instructions-list > img{
        width: 100%;
    }
</style>
