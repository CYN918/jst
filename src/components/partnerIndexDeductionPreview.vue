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
						<div class="Input"><input type="text" placeholder="0-100%" v-model="FenRun"/>%</div>
					</li>
					<li class="merchantsList-bottom">
					    <div class="activation">激活返现</div>
						<div class="Input-one"><input type="text" placeholder="0-100%" v-model="activation"/>%</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'partnerIndexDeductionPreview',
	data () {
		return {
			FenRun: '',
			activation: '',
			id: this.$route.query.userId,
		}
	},
	components:{
		
	},
	methods: {
		getData(){
            var formData = new FormData();
            formData.append("userId", this.id);
            axios({
                url: '/api/partner/seledikparameter',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.FenRun = respanse.data.data.frDeduct;
					this.activation = respanse.data.data.activDeduct;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
	},
	mounted () {
		this.getData();
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
		padding-left: 0.2rem;
		text-align: right;
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
</style>
