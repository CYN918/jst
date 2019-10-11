<template>
    <div class="contain">
        <div class="head">
            <router-link to="/transferDetails" class="back"><i class="icon-back"></i></router-link>
            <span class="title">扣款协议</span>
        </div>
        <div class="main my-wallet">
            <p>扣款协议暂时没有</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bonusWallet',
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
    .contain{
		overflow-x: hidden;
        margin-bottom: 2rem;
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
    .my-wallet > p{
        padding-top: 2rem;
        font-size: 18px;
    }

</style>
