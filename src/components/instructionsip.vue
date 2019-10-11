<template>
    <div class="contain">
        <div class="head">
            <router-link to="/instruction" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">即推宝开通合伙人流程</span>
        </div>
        <div class="main instructions">
            <div class="instructions-list">
                <img src="../assets/img/cp1.png"/>
                <img src="../assets/img/cp2.png"/>
                <img src="../assets/img/cp3.png"/>
                <img src="../assets/img/cp4.png"/>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'instructionsip',
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
