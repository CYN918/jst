<template>
    <div class="contain">
        <div class="head">
            <router-link to="/instruction" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">即付宝尊享版操作指引</span>
        </div>
        <div class="main instructions">
            <div class="instructions-list">
                <img src="../assets/img/jfb1.png"/>
                <img src="../assets/img/jfb2.png"/>
                <img src="../assets/img/jfb3.png"/>
                <img src="../assets/img/jfb4.png"/>
                <img src="../assets/img/jfb5.png"/>
                <img src="../assets/img/jfb6.png"/>
                <img src="../assets/img/jfb6_1.png"/>
                <img src="../assets/img/jfb7.png"/>
                <img src="../assets/img/jfb9.png"/>
                <img src="../assets/img/jfb10.png"/>
                <img src="../assets/img/jfb11.png"/>
                <img src="../assets/img/jfb12.png"/>
                <img src="../assets/img/jfb13.png"/>
                <img src="../assets/img/jfb14.png"/>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'instructionscp',
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
