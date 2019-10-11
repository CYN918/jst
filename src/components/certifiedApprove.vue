<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i><span>返回</span></router-link>
            <span class="title">实名认证</span>
        </div>
        <div class="main generalize-dredge" style="background: #f7f7f7;min-height: 620px;">
		
			<div class="dredge-form">
				<form action="/user/registerFace" method="POST" id="register">
					<div class="box-top">
						<div class="new-flex">
							<div class="line-left clearfix">
								真实姓名
							</div>
							<div class="flex-item">
								<input id="name" name="name" v-model="name" type="text" placeholder="请输入真实姓名" maxlength="8" autocomplete="off"/>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex" >
							<div class="line-left clearfix">
								身份证号码
							</div>
							<div class="flex-item" >
								<input id="idNo" name="idNo" v-model="idNumber" type="text" placeholder="请输入姓名对应的身份证号码" maxlength="18" autocomplete="off"/>
							</div>
						</div>
					</div>

					<div class="box-bottom">
						<div class="new-flex">
							<div class="line-left clearfix">
								银行卡卡号
							</div>
							<div class="flex-item">
								<input id="cardNo" name="cardNo" v-model="bankNumber" type="text" placeholder="请输入银行卡卡号" autocomplete="off"/>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
                        <div class="new-flex">
							<div class="line-left clearfix">
								开户行
							</div>
							<div class="flex-item" id="bankArea">
								<input id="bankName" name="bankName" v-model="bankLine" class="form-control" style="border:none;outline:none;box-shadow:none;" type="text" placeholder="请选择开户行" readonly/>
							</div>
							<div class="line-left clearfix">
								<div class="line-icon">
									<i class="icon-arrow"></i>
								</div>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
                        <div class="new-flex">
							<div class="line-left clearfix">
								开户地
							</div>
							<div class="flex-item" id="expressArea">
								<input id="address" name="address" v-model="bankAddress" class="form-control" style="border:none;outline:none;box-shadow:none;" type="text" placeholder="请选择开户行地址" maxlength="10" readonly/>
							</div>
							<div class="line-left clearfix">
								<div class="line-icon">
									<i class="icon-arrow"></i>
								</div>
							</div>
						</div>
						
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex">
							<div class="line-left clearfix">
								开户支行
							</div>
							<div class="flex-item" id="branchArea">
								<input id="branchName" name="branchName" v-model="bankBranch" class="form-control" style="border:none;outline:none;box-shadow:none;" type="text" placeholder="请选择开户支行" readonly/>
							</div>
							<div class="line-left clearfix">
								<div class="line-icon">
									<i class="icon-arrow"></i>
								</div>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex">
							<div class="line-left clearfix">
								手机号码
							</div>
							<div class="flex-item">
								<input id="mobile" name="mobile" v-model="mobile" type="text" placeholder="请输入银行预留手机号码" maxlength="11" autocomplete="off"/>
							</div>
						</div>
						
					</div>
                </form>
				<div class="btn-click" @click="confirm">
					<mt-button type="danger" class="complete">更换认证</mt-button>
				</div>
            </div>
			
        </div>

        
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'certifiedApprove',
	data () {
		return {
			name: '',
			idNumber: '',
			bankNumber: '',
			bankLine: '',
			bankAddress: '',
			bankBranch: '',
			mobile: '',
		}
	},
	components:{
		
	},
	methods: {
		getData(){
			axios.get('/api/user/approve').then(respanse=>{
                if(respanse.data.code == 0){
					this.name = respanse.data.data.name;
					this.idNumber = respanse.data.data.idNo;
					this.bankNumber = respanse.data.data.cardNo;
					this.bankLine = respanse.data.data.bankName;
					this.bankAddress = respanse.data.data.address;
					this.bankBranch = respanse.data.data.branchName;
					this.mobile = respanse.data.data.mobile;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		confirm(){
			this.$router.push({path: '/approve'}); 
		}
	},
	mounted () {
		this.getData();
	}
}
</script>
<style scoped>
    .box-top{
		height: 100px;
		width: 95%;
		margin: 15px auto;
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
    .btn-click{
        position: relative;
        top: 100px;
    }
    .btn-click .complete{
        width: 92%;
    }
	.box-bottom{
		height: 270px;
		width: 95%;
		margin: 15px auto;
	}

</style>
