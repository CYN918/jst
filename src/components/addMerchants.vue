<template>
    <div class="contain">
		<div class="head">
			<router-link to="/merchants" class="back">
				<i class="icon-back">
				</i>
			</router-link>
			<span class="title">录入商户</span>
		</div>
		<div class="main generalize-dredge" style="background: #f7f7f7;padding-bottom: 30px;">
			
				<div class="dredge-form">
					<form id="register">
						<div class="box-top">
							<div class="new-flex">
								<div class="line-left clearfix">
									商户姓名
								</div>
								<div class="flex-item">
									<input id="name" v-model="name" name="name" value="" type="text" placeholder="请输入商户姓名" maxlength="8" autocomplete="off"/>
								</div>
							</div>
							<div class="new-flex">
								<div class="line-left clearfix">
									手机号码
								</div>
								<div class="flex-item">
									<input id="mobile" v-model="mobile" name="mobile" value="" type="text" placeholder="请输入手机号码" maxlength="11" autocomplete="off"/>
								</div>
							</div>
							<div class="new-flex">
								<div class="line-left clearfix">
									所在区域
								</div>
								<div class="flex-item" id="expressArea">
									<districtBase class="title" @areaChange="getArea" :sendsrt="myAdress"></districtBase>
								</div>
								<div class="line-left clearfix">
									<div class="line-icon">
										<i class="icon-arrow"></i>
									</div>
								</div>
							</div>
							
						</div>

						<div class="box-bottom">
							<div class="new-flex" style="border-bottom: none;">
								<div class="line-left clearfix">
									机具SN
								</div>
								<div class="flex-item">
									<input id="sequence" v-model="sequence" name="sequence" value="" type="text" placeholder="请输入15位机具序列号" maxlength="15" autocomplete="off"/>
									
									
								</div>
								<div class="line-left clearfix">
									<div class="line-icon line-icon-xiangji">
										<i class="icon-xiangji"></i>
									</div>
								</div>
							</div>
							
							<div class="new-flex">
								<div class="line-left clearfix">
									物流公司
								</div>
								<div class="fanxian" @click="popupVisible = true">{{allTheDetail}}</div>
								<div class="line-left clearfix">
									<div class="line-icon">
										<i class="icon-arrow"></i>
									</div>
								</div>
							</div>
							<div class="new-flex">
								<div class="line-left clearfix">
									物流单号
								</div>
								<div class="flex-item">
									<input id="logistics" value="" type="text" placeholder="请输入物流单号" autocomplete="off"/>
								</div>
							</div>
							<mt-popup v-model="popupVisible" position="bottom">
								<mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>   
								<div class="picker-btn-wrap">
									<div  class="picker-cancel" @click="addressChooseCancel">取消</div>
									<div  class="picker-sure" @click="confirmChoose">确定</div>
								</div>   
							</mt-popup>
							
							
							
						</div>
						
					</form>
					<div class="box-btn">
						<a @click="register()" class="btn box-btn-green">确认提交</a>
					</div>
				</div>
			</div>
		</div>
		
    </div>
    
</template>
<script>
import { Toast } from 'mint-ui';
import { Picker } from 'mint-ui';
import districtBase from '@/components/districtbase';
import axios from 'axios'
export default {
	name: 'addMerchants',
	data () {
		return {
			name: '',
			mobile: '',
			area: '',
			sequence: '',
			address: '',
			myAdress: null,
            slots: [],
			sendsrt: '',
			allTheDetail: '请选择物流',
            popupVisible: false,
            myAddressSlots: [{values: ['请选择物流','百世快递', '中通快递', '申通快递', '圆通快递', '韵达快递', '邮政快递包裹', 'EMS', '天天快递']}],
		}
	},
	components:{
		districtBase
	},
	methods: {
		getArea (obj) {
			this.myAdress = obj.myAdress
			this.district = obj.district
		},
		onMyAddressChange(picker,values){
            this.allTheDetail = picker.values[0];
		},
		addressChooseCancel(){
            this.popupVisible = false;
        },
        confirmChoose(){
            this.popupVisible = false;
        },
	},
	mounted () {
		
	}
}
</script>
<style scoped="scoped">
    .contain >>> .mint-popup{
        width: 100%;
        height: 292px;
    }
    .picker-btn-wrap{
        width: 100%;
        height: 40px;
        border-bottom: solid 1px #eaeaea;
        position: fixed;
        top: 0px;
    }
	.picker-cancel{
        width: 50%;
        line-height: 40px;
        float: left;
        font-size: 16px;
        color: #26a2ff;
        text-align: center;
    }
    .picker-sure{
        width: 50%;
        line-height: 40px;
        float: left;
        font-size: 16px;
        color: #26a2ff;
        text-align: center;
    }
    .contain >>> .picker{
        margin-top: 50px;
    }
	.box-top{
		width: 95%;
		margin: 12px auto;
	}
	.generalize-dredge{
		height: 467px;
	}
	.box-bottom{
		width: 95%;
		height: 150px;
		margin: 0px auto;
	}
	.box-btn{
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 30px;
		position: relative;
		top: 70px;
	}
	.box-btn-green{
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 30px;
		padding: 0px;
		border: none;
		font-size: 18px;
	}
	.contain{
		overflow-x: hidden;
		overflow-y: hidden;
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
	.ve-send-code{
        color: #2f2d2d;
        padding:0rem .2rem;
        width: 80px;
        height: 28px;
        background: #FF6A48;
        color: #FFFFFF;
        font-size: 12px;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
    }
	.districtbase{
        font-size: 0.4rem;
        text-align: right;
        padding-right: 25px;
    }
    .districtbase .ve-choice-yn>span{
        width: 49%;
        display: inline-block;
        text-align: center;
        padding: 0.3rem 0rem;
        color: #1296DB;
        font-size: 0.4rem;
    }
	.fanxian{
		float: right;
        padding-right: 28px;
		color: #999999;
		font-size: 14px;
	}
	.flex-item > input{
		color: #222222;
	}
	/* #name::-webkit-input-placeholder,#mobile::-webkit-input-placeholder,#sequence::-webkit-input-placeholder,#logistics::-webkit-input-placeholder{
		color: #222222;
	} */
	#logistics {
		height: 47px;
		text-align: right;
		padding-right: 10px;
		border: none;
	}
	.contain >>> .picker-item{
		color: #222222;
	}
</style>
