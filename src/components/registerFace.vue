<template>
    <div class="contain">
		<div class="head">
			<router-link to="/incomeList" class="back">
				<i class="icon-back">
				</i>
			</router-link>
			<span class="title">面对面开通</span>
		</div>
		<div class="main generalize-dredge" style="background: #f7f7f7;padding-bottom: 30px;">
			
				<div class="dredge-form">
					<form action="/user/registerFace" method="POST" id="register">
						<div class="box-top">
							<div class="new-flex">
								<div class="line-left clearfix">
									对方姓名
								</div>
								<div class="flex-item">
									<input id="name" v-model="name" name="name" value="" type="text" placeholder="请输入对方姓名" maxlength="8" autocomplete="off"/>
								</div>
							</div>
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex" >
								<div class="line-left clearfix">
									身份证号
								</div>
								<div class="flex-item" >
									<input id="idNo" v-model="idNo" name="idNo" value="" type="text" placeholder="请输入身份证号码" maxlength="18" autocomplete="off"/>
								</div>
							</div>
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex" style="border-bottom: none;">
								<div class="line-left clearfix">
									机具编号
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
						</div>

						<div class="box-bottom">
							<div class="new-flex">
								<div class="line-left clearfix">
									银行卡号
								</div>
								<div class="flex-item">
									<input id="cardNo" v-model="cardNo" name="cardNo" value="" type="text" placeholder="请输入银行卡号" autocomplete="off"/>
								</div>
							</div>
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex">
								<div class="line-left clearfix">
									开户地
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
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex">
								<div class="line-left clearfix">
									开户行
								</div>
								<div class="flex-item" id="bankArea">
									<district class="title" @areaChange="getBank" :sendsrt="bankName"></district>
								</div>
								<div class="line-left clearfix">
									<div class="line-icon">
										<i class="icon-arrow"></i>
									</div>
								</div>
							</div>
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex">
								<div class="line-left clearfix">
									开户支行
								</div>
								<div class="flex-item" id="branchArea">
									<div class="districtbase">
										<div @click="areagook" ><span id="tishiTwo" style="color: #BFBFBF;font-size: 14px;">请选择开户支行</span><span>{{itembranchName}}</span>{{ sendsrt }}</div>
										<mt-popup
											v-model="popupVisible"
											position="bottom">
											<div class="ve-choice-yn">
												<span @click="areagocancel">取消</span>
												<span @click="areagocancel">确定</span>
											</div>
											<mt-picker style="width: 100vw;" :slots="slots" value-key="branchName" @change="onValuesChange"></mt-picker> 
										</mt-popup>
									</div>
								</div>
								<div class="line-left clearfix">
									<div class="line-icon">
										<i class="icon-arrow"></i>
									</div>
								</div>
							</div>
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex">
								<div class="line-left clearfix">
									手机号码
								</div>
								<div class="flex-item">
									<input id="mobile" v-model="mobile" name="mobile" value="" type="text" placeholder="请输入银行卡预留手机号码" maxlength="11" autocomplete="off"/>
								</div>
							</div>
							<div style="width: 95%;height: 1px;background-color: #dcdcdc;margin: 0px auto;"></div>
							<div class="new-flex"  style="border-bottom: none;">
								<div class="line-left clearfix">
									验证码
								</div>
								<div class="flex-item">
									<input id="code" name="code" v-model="telCode" type="text" placeholder="请输入验证码" maxlength="6" autocomplete="off"/>
									<mt-button id="teleTime" v-if="phoneCodeStatus" size="small" type="default" class="ve-send-code"  @click="postphonecode">发送验证码</mt-button>
									<mt-button id="teleTime" v-else-if="!phoneCodeStatus" size="small" type="default" class="ve-send-code" >倒计时{{ count }}S</mt-button>
								</div>
							</div>
						</div>
						<div class="form-line no-border green" style='border:none;padding-top:6px;line-height:18px;font-size: 10px;color: #999999;'>
							*机具一旦绑定商户将不可再更改，SN编号为后15位，最后一位数字省略。
						</div>
						<div class="box-btn">
							<a @click="register()" class="btn box-btn-green">确认开通</a>
						</div>
					</form>
				</div>
			</div>
		</div>
    </div>

</template>
<script>
import { Toast } from 'mint-ui';
import { Picker } from 'mint-ui';
import districtBase from '@/components/districtbase';
import district from '@/components/district';
import axios from 'axios'
export default {
	name: 'registerFace',
	data () {
		return {
			name: '',
			mobile: '',
			code: '',
			area: '',
			idNo: '',
			sequence: '',
			cardNo: '',
			address: '',
			bankName: '',
			branchName: [],
			itembranchName: '',
			enjoy: true,
			telCode: '',
			phoneCodeStatus: true,
			timer: null,
			count: 0,
			actions: [],
			myAdress: null,
			popupVisible: false,
            slots: [],
			sendsrt: '',
		}
	},
	components:{
		districtBase,
		district
	},
	methods: {
		postphonecode () {
			if(this.mobile.length != 11){
				Toast({
					message: '请填写正确手机号码',
					duration: 2000
				});
				return false
			}
			var formData = new FormData();
			formData.append("mobile", this.mobile);
			formData.append("type", 4); 
			axios({
				url: '/api/user/sendCode',
				method: 'post',
				data: formData,
			}).then(respanse=>{
				this.subumting = false
				if(respanse.data.code == 0){
					Toast(respanse.data.message); 
					let _this = this
					const TIME_COUNT = 60;//倒计时60s
					this.count = TIME_COUNT;//赋值，以便判断时间
					this.phoneCodeStatus = false
					this.timer = setInterval(function() {
						if (_this.count > 0 && _this.count <= TIME_COUNT) {
							_this.count--;
						} else {
							_this.phoneCodeStatus = true
							clearInterval(_this.timer);
							_this.timer = null;
						}
					}, 1000) 
				}else{
					Toast(respanse.data.message);
				}
			})
		},
		register(){
			var formData = new FormData();
            formData.append("name", this.name);
            formData.append("mobile", this.mobile); 
			formData.append("code", this.code);
			formData.append("area", this.area);
			formData.append("idNo", this.idNo);
			formData.append("sequence", this.sequence);
			formData.append("cardNo", this.cardNo);
			formData.append("address", this.address);
			formData.append("bankName", this.bankName);
			formData.append("branchName", this.itembranchName);
			formData.append("enjoy", this.enjoy);
            axios({
                url: '/api/user/registerFace',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    Toast(respanse.data.message);
					this.$router.push({path: '/index'}); 
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		getArea (obj) {
			this.myAdress = obj.myAdress
			this.district = obj.district
		},
		getBank (obj) {
			this.bankName = obj.bankName
		},
		onValuesChange(picker, values) {
			if (values[0]) {
				document.getElementById("tishiTwo").style.display = "none";
				picker.setSlotValue(1, values[0]);
				this.itembranchName = values[0].branchName
			}
		},
		areagocancel () {
			this.popupVisible = false
		},
		areagook () {
			if(this.branchName.length == 0){
				this.getAddress()
			}
			this.popupVisible = true
		},
		getAddress () {
			var formData = new FormData();
			if(this.district.provinceName == this.district.cityName){
				formData.append("provinceName", this.district.provinceName);
				formData.append("cityName", "市辖区"); 
				formData.append("bankName", this.bankName); 
			}else{
                formData.append("provinceName", this.district.provinceName);
				formData.append("cityName", this.district.cityName); 
				formData.append("bankName", this.bankName); 
			} 
            axios({
                url: '/api/cnaps/branchName',
                method: 'post',
                data: formData,
            }).then(respanse=>{
				this.branchName = respanse.data.data
				this.slots = [{
					flex: 1,
					values: this.branchName,
					className: 'slot1',
					textAlign: 'center'
				}];          
            })
		}
	},
	mounted () {
		
	}
}
</script>
<style scoped="scoped">
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
</style>
