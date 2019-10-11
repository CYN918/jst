<template>
    <div class="contain">
		<div class="head">
			<router-link to="/terminalManagement" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">还款计划</span>
		</div>
		<div class="main winners-list">
			<div class="box">
			    <ul>
					<li class="active"><span class="left">机具台数(台)</span><span class="right">{{this.total}}</span></li>
					<li class="active"><span class="left">接收代理商</span><span class="right">{{this.name}}</span></li>
					<li class="active"><span class="left">单价(元)</span><span class="right"><input type="text" placeholder="请输入单价" v-model="siglePrice"/></span></li>
					<li class="active"><span class="left">商品总额(元)</span><span class="right">{{sumamount}}</span></li>
					<li class="active"><span class="left">欠款金额(元)</span><span class="right"><input type="text" placeholder="请输入欠款金额" v-model="boliamount"/></span></li>
					<li class="active"><span class="left">还款截止日期</span><span class="right"><mt-field placeholder="请输入还款截止日期" type="date" v-model="param4"></mt-field></span></li>
				</ul>
			</div>
			<div class="agreement">
			    <input type="checkbox" v-model="agreement"/>
				<p>勾选表示同意<router-link to="">《债务承担及连带责任担保协议》</router-link></p>
			</div>
			<div class="btn-click">
				<mt-button type="danger" @click="withdrawal()">确定划拨</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import localStore from '@/localstorage.js';
import axios from 'axios'
export default {
	name: 'reimbursement',
	data () {
		return {
			siglePrice: '',
			boliamount: '',
			total: this.$route.query.total,
			id: this.$route.query.id,
			type: this.$route.query.type,
			name: this.$route.query.name,
			storeData: localStore.fetch(),
			param4: '',
			agreement: true,
		}
	},
	components:{
		
	},
	computed: {
        sumamount:{
            get:function(){
                return this.total*this.siglePrice
            },
            set:function(value){
                //console.log(value)
            }
        }
    },
	methods: {
		withdrawal(){
			if(!this.siglePrice){
				Toast('请输入单价');
				return false
			}
			if(!this.boliamount){
                Toast('请输入欠款金额');
				return false
			}
			if(!this.param4){
                Toast('请选择还款截止日期');
				return false
			}
			if(this.agreement == false){
				Toast('请勾选协议');
				return false
			}
			MessageBox.confirm('', {
				title: '待受理',
                message: '您确定向' + this.name + '划拨' + this.total + '台机具货款？', 
                confirmButtonText: '确认', 
                cancelButtonText: '取消' 
            }).then(action => { 
				if (action == 'confirm') {     //确认的回调
				    var formData = new FormData();
					formData.append("agentId", this.id);
					formData.append("siglePrice", this.siglePrice);
					formData.append("sumamount", this.sumamount);
					formData.append("boliamount", this.boliamount);
					formData.append("type", this.type);
					formData.append("param1", 1);
					formData.append("total", this.total);
					formData.append("sequences", this.storeData);
					formData.append("param4", this.param4);
					axios({
						url: '/api/user/allocate',
						method: 'post',
						data: formData,
					}).then(respanse=>{
						if(respanse.data.code == 0){
							Toast({
								message: '已发送',
								duration: 2000
							});
							this.$router.push({path: '/transfer'});
						}else{
							Toast(respanse.data.message);
						}
					})
                    
             	}
            }).catch(err => { 
             	if (err == 'cancel') {     //取消的回调

             	} 
            });
		}
	},
	mounted () {
		
	}
}
</script>
<style scoped="scoped">
	.contain{
		overflow-x: hidden;
	}
	.main{
		min-height: 600px;
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
	.head-link{
		color: #222222;
		font-size: 14px;
	}
	.box{
		width: 95%;
		margin: 10px auto;
		height: 399px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.box > ul > li{
		width: 95%;
		margin: 0px auto;
		height: 50px;
		line-height: 50px;
	}
    .box > ul > li .left{
		float: left;
		color: #4D4D4D;
		font-size: 14px;
	}
	.box > ul > li .right{
		float: right;
		color: #FF6A48;
		font-size: 14px;
	}
	.box > ul > li .right > input{
		width: 105px;
		height: 14px;
		border: none;
		outline: none;
		color: #FF6A48;
		font-size: 15px;
		text-align: right;
	}
	.box > ul > li .right > select{
		border: none;
		outline: none;
		color: #666666;
		font-size: 14px;
	}
	.active{
		border-bottom: 1px solid #EBEBEB;
	}
	.agreement{
		height: 13px;
		line-height: 13px;
		padding-left: 1.5rem;
		padding-top: 1.5rem;
	}
	.agreement > input{
		width: 13px;
		height: 13px;
		float: left;
	}
	.agreement > p{
		font-size: 12px;
		color: #666666;
		float: left;
		padding-left: 5px;
	}
	.agreement > p > a{
		color: #FAB6A7
	}
	.btn-click{
        position: relative;
        top: 10px;
    }
    .btn-click > button{
        width: 94%;
        margin: 0 auto;
		border-radius: 30px;
		background: #FF6A48;
    }
</style>
