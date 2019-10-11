<template>
    <div class="login">
        <div class="head">
			<router-link to="/cardIndex" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">奖励查询</span>
		</div>
        <div class="box">
            <div class="top">
                <div class="txt">选择日期</div>
                <div class="col-50">
                    <select name="region_id" v-model="val" @change="setCouponSelected($event)">
                        <option value="2019">2019年</option>
                        <option value="2018">2018年</option>	
                        <option value="2017">2017年</option>	
                        <option value="2016">2016年</option>	
                        <option value="2015">2015年</option>	
                        <option value="2014">2014年</option>							   
                    </select>
                    <select name="profession" v-model="value" @change="getCouponSelected($event)">
                        <option value="12">12月</option>
                        <option value="11">11月</option>
                        <option value="10">10月</option>
                        <option value="09">9月</option>
                        <option value="08">8月</option>
                        <option value="07">7月</option>
                        <option value="06">6月</option>
                        <option value="05">5月</option>
                        <option value="04">4月</option>
                        <option value="03">3月</option>
                        <option value="02">2月</option>
                        <option value="01">1月</option>
                    </select>
                </div>
            </div>
            <div class="hehuo">
                <p class="one">个人奖励</p>
                <div class="two">
                    <ul>
                        <li class="border"><span class="number">{{sumCardCountDirect}}</span><span class="the-month">本月办卡佣金(元)</span></li>
                        <li><span class="number">{{sumCardDirect}}</span><span class="the-month">08月办理信用卡(张)</span></li>
                    </ul>
                </div>
            </div>
            <div class="shanghu">
                <p class="one">团队奖励</p>
                <div class="two">
                    <ul>
                        <li class="border"><span class="number">{{sumCardCountTeam}}</span><span class="the-month">本月办卡佣金(元)</span></li>
                        <li><span class="number">{{sumCardTeam}}</span><span class="the-month">08月办理信用卡(张)</span></li>
                    </ul>
                </div>
            </div>
        </div>      
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'reward',
    data () {
        return {
            val:'2019',
            value:'08',
            sumCardCountDirect: '',
            sumCardDirect: '',
            sumCardCountTeam: '',
            sumCardTeam: '',
        }
    },
    components:{
        
    },
    methods: {
        getData(){
            var date = this.val + this.value;
            var formData = new FormData();
            formData.append("date", date);
            axios({
                url: '/api/card/awardSearch',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.sumCardCountDirect = respanse.data.data.sumCardCountDirect;
                    this.sumCardDirect = respanse.data.data.sumCardDirect;
                    this.sumCardCountTeam = respanse.data.data.sumCardCountTeam;
                    this.sumCardTeam = respanse.data.data.sumCardTeam;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        setCouponSelected($event){
            this.getData();
        },
        getCouponSelected($event){
            this.getData();
        }
    },
    mounted () {
        this.getData();
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
	.head-link{
		color: #222222;
	}
    .hehuo{
        width: 95%;
        height: 131px;
        background: #FA7557;
        border-radius: 5px;
        margin: 10px auto;
    }
    .hehuo .one{
        font-size: 15px;
        color: #FFFFFF;
        text-align: left;
        padding: 10px 0px 0px 20px;
    }
    .hehuo .two{
        margin-top: 35px;
    }
    .hehuo .two > ul .border{
        border-right: 1px solid #FFFFFF;
    }
    .hehuo .two > ul > li{
        width: 49%;
        float: left;
    }
    .hehuo .two > ul > li .number{
        color: #FFFFFF;
        font-size: 20px;
        width: 100%;
        float: left;
    }
    .hehuo .two > ul > li .the-month{
        color: #FFFFFF;
        font-size: 12px;
        width: 100%;
        margin-top: 18px;
        display: inline-block;
    }
    .shanghu{
        width: 95%;
        height: 131px;
        background: #7D64F2;
        border-radius: 5px;
        margin: 10px auto;
    }
    .shanghu .one{
        font-size: 15px;
        color: #FFFFFF;
        text-align: left;
        padding: 10px 0px 0px 20px;
    }
    .shanghu .two{
        padding-top: 35px;
    }
    .shanghu .two > ul .border{
        border-right: 1px solid #FFFFFF;
    }
    .shanghu .two > ul > li{
        width: 49%;
        height: 40px;
        float: left;
    }
    .shanghu .two > ul > li .number{
        color: #FFFFFF;
        font-size: 12px;
        width: 100%;
        float: left;
    }
    .shanghu .two > ul > li .the-month{
        color: #FFFFFF;
        font-size: 12px;
        width: 100%;
        margin-top: 18px;
        display: inline-block;
    }
    .box{
        margin-top: 60px;
    }
    .box .top{
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #FFFFFF;
    }
    .box .top .txt{
        width: 60px;
        height: 14px;
        color: #222222;
        font-size: 15px;
        float: left;
        margin-left: 16px;
    }
    .box .top .col-50{
        float: right;
        margin-right: 15px;
    }
    .box .top .col-50 > select{
        border: none;
        outline: none;
    }
</style>
