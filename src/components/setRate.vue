<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back"></i></router-link>
			<span class="title">固定费率</span>
		</div>
		<div class="main my-partner">
			<div class="FenRun">
			    <ul>
					<li class="FenRun-two" v-if="state == 0"><span>即付宝智享版</span><span class="set-up" @click="jixiang()">设置参数</span></li>
					<li class="FenRun-two" v-if="state == 1"><span>即付宝智享版</span><span class="set-up" @click="jixiang1()">查看参数</span></li>
					<li class="FenRun-three" v-if="zhuangtai == 0"><span>即POS</span><span class="set-up" @click="jipos()">设置参数</span></li>
					<li class="FenRun-three" v-if="zhuangtai == 1"><span>即POS</span><span class="set-up" @click="jipos1()">查看参数</span></li>
				</ul>
			</div>
			
		</div>
	</div>
</template>
<script>
export default {
	name: 'setRate',
	data () {
		return {
			keywork: '',
			state: '0',
			zhuangtai: '1',
		}
	},
	components:{
		
	},
	methods: {
		gosearch() {
			alert(1)
		},
		jixiang(){
			this.$router.push({name: 'MentallyVersion',params:{id: '2'}});
		},
		jixiang1(){
            this.$router.push({name: 'MentallyVersionPreviewO'});
		},
		jipos(){
			this.$router.push({name: 'SetParameters',params:{id: '2'}});
		},
		jipos1(){
			this.$router.push({name: 'SetParametersPreviewO'});
		}
	},
	mounted () {
		
	}
}
</script>
<style scoped="scoped">
	.main{
		overflow-x: hidden;
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
	.FenRun{
		width: 95%;
		margin: 10px auto;
		height: 102px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.FenRun > ul > li{
		width: 95%;
		margin: 0px auto;
		height: 51px;
		line-height: 51px;
	}
	.FenRun > ul .FenRun-one{
		font-size: 14px;
		color: #222222;
		text-align: left;
		font-weight:bold;
	}
	.FenRun > ul .FenRun-two > span{
        float: left;
		font-size: 14px;
		color: #575757;
	}
	.FenRun > ul .FenRun-two .set-up{
        float: right;
		font-size: 14px;
		color: #FF6A48;
	}
	.FenRun > ul .FenRun-three > span{
        float: left;
		font-size: 14px;
		color: #575757;
	}
	.FenRun > ul .FenRun-three .set-up{
        float: right;
		font-size: 14px;
		color: #FF6A48;
	}
</style>
