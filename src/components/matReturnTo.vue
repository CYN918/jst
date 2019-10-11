<template>
    <div class="contain">
		<div class="head">
			<router-link to="/partnerIndex" class="back"><i class="icon-back"></i></router-link>
			<span class="title">垫返参数</span>
		</div>
		<div class="main my-partner">
			<div class="merchantsList">
			    <ul>
				    <li class="merchantsList-bottom" v-for="item in list">
					    <div class="activation">{{item.type}}</div>
						<div class="Input-one"><input type="text" :id="'jpb_back'+item.id"/></div>
						<div class="tishi-one">≥0 (元)</div>
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
	name: 'matReturnTo',
	data () {
		return {
			userId: this.$route.query.userId,
			list: [],
			lists: '',
			items: '',
			datas: '',
		}
	},
	components:{
		
	},
	methods: {
		withdrawal(){
			var jpb_back8 = document.getElementById('jpb_back8').value;
			console.log(jpb_back8)
			var jpb_back11 = document.getElementById('jpb_back11').value;
			var jpb_back14 = document.getElementById('jpb_back14').value;
			if(!jpb_back8){
				Toast('请输入尊享版Plus参数');
				return false
			}
			if(!jpb_back11){
				Toast('请输入即POS参数');
				return false
			}
			if(!jpb_back14){
				Toast('请输入即付宝智享版参数');
				return false
			}
			
			var obj = [{8:jpb_back8},{11:jpb_back11},{14:jpb_back14}];
			var formData = new FormData();
            formData.append("jpb_back", JSON.stringify(obj));
            axios({
                url: '/api/partner/jihparameter',
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
		},
		getData(){
			axios.get('/api/partner/posTypeList').then(respanse=>{
                if(respanse.data.code == 0){
					this.list = respanse.data.data;
					this.lists = respanse.data.data[0].id;
					this.items = respanse.data.data[1].id;
					this.datas = respanse.data.data[2].id;
                }else{
                    this.$router.push({path: '/login'});
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
		float: left;
		font-size: 14px;
		color: #222222;
		padding-left: 12px;
		width: 60%;
		text-align: left;
	}
	.merchantsList > ul .merchantsList-top .Input{
		float: left;	
	}
	.merchantsList > ul .merchantsList-top .tishi-one{
		float: right;
		font-size: 12px;
		color: #999999;
		padding-right: 12px;
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
		float: left;
		font-size: 14px;
		color: #222222;
		padding-left: 12px;
		width: 60%;
		text-align: left;
	}
	.merchantsList > ul .merchantsList-bottom .Input-one{
		float: left;
	}
	.merchantsList > ul .merchantsList-bottom .tishi-one{
		float: right;
		font-size: 12px;
		color: #999999;
		padding-right: 12px;
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
