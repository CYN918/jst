<template>
    <div class="contain">
		<div class="head">
			<router-link to="/partnerIndex" class="back"><i class="icon-back"></i></router-link>
			<span class="title">抵扣参数</span>
		</div>
		<div class="main my-partner">
			<div class="merchantsList">
			    <ul>
				    <li class="merchantsList-top">
					    <div class="FenRun">分润抵扣</div>
						<div class="Input"><input type="text" placeholder="0-100%" v-model="frDeduct"/></div>
					</li>
					<li class="merchantsList-bottom">
					    <div class="activation">激活返现</div>
						<div class="Input-one"><input type="text" placeholder="0-100%" v-model="activDeduct"/></div>
					</li>
				</ul>
			</div>
			<p class="tishi">若无需抵扣，以上参数都可以设置为0</p>
			<div class="btn-click">
                <mt-button type="danger" @click="withdrawal()">完成</mt-button>
            </div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'partnerIndexDeduction',
	data () {
		return {
			userId: this.$route.query.userId,
			frDeduct: '',
			activDeduct: '',
		}
	},
	components:{
		
	},
	methods: {
		withdrawal(){
			if(!this.frDeduct){
				Toast('请输入分润抵扣参数');
				return false
			}
			if(!this.activDeduct){
				Toast('请输入激活返现参数');
				return false
			}
			var formData = new FormData();
            formData.append("userId", this.userId);
			formData.append("frDeduct", this.frDeduct);
			formData.append("activDeduct", this.activDeduct);
            axios({
                url: '/api/partner/dikparameter',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					Toast(respanse.data.message);
					this.$router.push({path: '/'});
                }else{
                    Toast(respanse.data.message);
                }
            })
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
	.merchantsList > ul > li{
		width: 95%;
		margin: 10px auto;
		height: 55px;
		line-height: 55px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.merchantsList > ul .merchantsList-top .FenRun{
		width: 85px;
		background: #846BF7;
		float: left;
		font-size: 14px;
		color: #FFFFFF;
		border-radius:5px 0px 0px 5px;
	}
	.merchantsList > ul .merchantsList-top .Input{
		float: right;	
	}
	.merchantsList > ul .merchantsList-top .Input > input,.merchantsList > ul .merchantsList-bottom .Input-one > input{
        width: 74px;
		height: 28px;
		line-height: 28px;
		background: #F7F7F7;
		font-size: 14px;
		color: #B3B3B3;
		border: none;
		outline: none;
		margin-right: 0.5rem;
		padding-left: 0.2rem;
	}
	.merchantsList > ul .merchantsList-bottom .activation{
		width: 85px;
		background: #FF7E61;
		float: left;
		font-size: 14px;
		color: #FFFFFF;
		border-radius:5px 0px 0px 5px;
	}
	.merchantsList > ul .merchantsList-bottom .Input-one{
		float: right;
	}
	.tishi{
		color: #BFBFBF;
		font-size: 13px;
		text-align: left;
		padding-left: 30px;
		padding-top: 20px;
	}
	.btn-click{
		padding-top: 180px;
	}
	.btn-click > button{
		width: 95%;
		background: #FF6A48;
		border-radius: 20px;
	}
</style>
