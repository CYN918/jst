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
                <img src="../assets/img/jpos01.png"/>
                <img src="../assets/img/jpos02.png"/>
                <img src="../assets/img/jpos03.png"/>
                <img src="../assets/img/jpos04.png"/>
                <img src="../assets/img/jpos05.png"/>
                <img src="../assets/img/jpos06.png"/>
                <img src="../assets/img/jpos07.png"/>
                <img src="../assets/img/jpos08.png"/>
                <img src="../assets/img/jpos09.png"/>
                <img src="../assets/img/jpos10.png"/>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'instructionsjpos',
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
