<template>
    <div class="contain">
        <div class="head">
            <router-link to="/instruction" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">即POS操作指引</span>
        </div>
        <div class="main instructions">
            <div class="instructions-list">
                <img src="../assets/img/jposjugx1.png"/>
                <img src="../assets/img/jposjugx2.png"/>
                <img src="../assets/img/jposjugx3.png"/>
                <img src="../assets/img/jposjugx4.png"/>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'instructionsjpos2',
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
