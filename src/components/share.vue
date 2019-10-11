<template>
    <div class="login">
        <mt-header fixed title="业绩"></mt-header>
        <mt-navbar v-model="selected" style="margin-top: 40px;">
            <mt-tab-item id="1">日新增</mt-tab-item>
            <mt-tab-item id="2">月统计</mt-tab-item>
            <mt-tab-item id="3">本月收益</mt-tab-item>
            <mt-tab-item id="4">累计收益</mt-tab-item>
            <mt-tab-item id="5">累计商户</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-field style="margin-top:0.1rem;" placeholder="请输入搜索日期如 20190725" v-model="keywork">
                    <mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
                </mt-field>
                <div class="box">
                    <ul v-if="this.list != null"> 
                        <li v-for="item in list">
                            <h3>{{item.date}}</h3>
                            <div>
                                <p class="new">{{item.sumActivation}}</p>
                                <p class="txt">新增激活数(台)</p>
                            </div>
                            <div>
                                <p class="trading">{{item.sumAmount_}}</p>
                                <p class="txt">交易总额(元)</p>
                            </div>
                            <div>
                                <p class="partnership">{{item.sumPartner}}</p>
                                <p class="txt">新增合伙人(个)</p>
                            </div>
                        </li>
                    </ul>
                    <ul v-else>
                        <img src="../assets/img/zanwushuju.png"/>
                        <p>暂无数据</p>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-field style="margin-top:0.1rem;" placeholder="请输入搜索月份如 201907" v-model="keyworks">
                    <mt-button size="small" type="default" class="ve-send-code" @click="gosearchs">搜索</mt-button>
                </mt-field>
                <div class="box">
                    <ul v-if="this.data != null">
                        <li v-for="item in data">
                            <h3>{{item.date}}</h3>
                            <div>
                                <p class="new">{{item.sumActivation}}</p>
                                <p class="txt">新增激活数(台)</p>
                            </div>
                            <div>
                                <p class="trading">{{item.sumAmount_}}</p>
                                <p class="txt">交易总额(元)</p>
                            </div>
                            <div>
                                <p class="partnership">{{item.sumPartner}}</p>
                                <p class="txt">新增合伙人(个)</p>
                            </div>
                        </li>
                    </ul>
                    <ul v-else>
                        <img src="../assets/img/zanwushuju.png"/>
                        <p>暂无数据</p>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="selectTime" @click="selectData">{{val}}<img src="../assets/img/duobianxing.png"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{value}}<img src="../assets/img/duobianxing.png"/></div>
                <div class="pickerPop" @touchmove.prevent>
                    <!-- 年月日时分选择 -->
                    <mt-datetime-picker
                        lockScroll="true"
                        ref="picker"
                        v-model="dateVal"
                        class="myPicker"
                        type="date"
                        year-format="{value}"
                        month-format="{value}"
                        @confirm="dateConfirm()">
                    </mt-datetime-picker>
                </div>
                
                <div class="content">
                    <ul>
                        <li class="teshu">
                            <span class="left">个人收益(元)</span>
                            <span class="right">{{sumProfitDirect}}</span>
                        </li>
                        <li class="teshu">
                            <span class="left">团队收益(元)</span>
                            <span class="right">{{sumProfitTeam}}</span>
                        </li>
                        <li class="teshu">
                            <span class="left">激活奖励(元)</span>
                            <span class="right">{{sumCashBack}}</span>
                        </li>
                        <li>
                            <span class="left">分润收益(元)</span>
                            <span class="right">{{sumProfit}}</span>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <div class="cumulative">
                    <div class="year" @click="popupVisible = true">{{selectedValue}}年<img src="../assets/img/duobianxing.png"/></div>
                    <!-- @touchmove.prevent 阻止默认事件，此方法可以在选择时间时阻止页面也跟着滚动。 -->
                    <mt-popup v-model="popupVisible" position="bottom">
                        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>   
                        <div class="picker-btn-wrap">
                            <div  class="picker-cancel" @click="confirmChoose">取消</div>
                            <div  class="picker-sure" @click="confirmChoose">确定</div>
                        </div>   
                    </mt-popup>
                    <p>{{sumKpi}}</p>
                    <div class="add"><i></i><span>累计收益</span><i></i></div>
                    <img src="../assets/img/zhu.png"/>
                    <div class="results" v-if="this.lists != null">
                        <ul>
                            <li v-for="item in lists" class="teshu"><span class="left">{{item.month}}月</span><span class="right">{{item.sumYMKpi}}</span></li>
                        </ul>
                    </div>
                    <div class="results" v-else>    
                        <img src="../assets/img/zanwushuju.png"/>
                        <p>暂无数据</p>    
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <div class="hehuo">
                    <p class="one">累计合伙人(个)</p>
                    <p class="two">{{paycount}}</p>
                </div>
                <div class="shanghu">
                    <p class="one">累计商户(个)</p>
                    <p class="two">{{shcount}}</p>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>


        <index-tab page="1"></index-tab>
    </div>
</template>
<script>
import indexTab from '@/components/indexTabComponent';
import { Toast } from 'mint-ui';
import axios from 'axios'

export default {
    name: 'share',
    data () {
        return {
            selected: '1', 
            keywork: '',
            keyworks: '',
            val:'2019',
            value:'08',
            list: [],
            lists: [],
            data: [],
            sumProfitTeam: '',
            sumProfit: '',
            sumCashBack: '',
            sumProfitDirect: '',
            sumKpi: '',
            shcount: '',
            paycount: '',
            dateVal: '',
            dateVal1: '',
            selectedValue: '2019',
            popupVisible: false,
            myAddressSlots: [{values: ['2019','2018', '2017','2016','2015', '2014','2013','2012', '2011','2010','2009', '2008']}],
        }
    },
    components:{
        indexTab,
    },
    methods: {
        selectData () {
            if(!this.dateVal){
                this.dateVal = new Date()
            }
            this.$refs['picker'].open()
            var a = document.getElementsByClassName('picker-slot');
            for(let i=0;a && i < a.length;i++){
                if(i==2){
                    a[i].style.display="none";
                }
            }
        },
        onMyAddressChange(picker,values){
            this.selectedValue = picker.values[0];
        },
        confirmChoose(){
            this.popupVisible = false;
            this.monthSum();
        },
        dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.val = this.dateVal.getFullYear();
            if(this.dateVal.getMonth() + 1 <= 9){
                this.value = '0' + (this.dateVal.getMonth() + 1);
            }else{
                this.value = this.dateVal.getMonth() + 1;
            }
            this.month(); 
        },
        formatDate(date) {
            const y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? '0' + m : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return y + ' ' + m + ' ' + d
        },
        gosearch(){
            this.userDay();
        },
        gosearchs(){
            this.userMonth();
        },
        userDay(){
            var formData = new FormData();
            formData.append("search", this.keywork);
            axios({
                url: '/api/home/userDayKpi_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.list = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        userMonth(){
            var formData = new FormData();
            formData.append("search", this.keyworks);
            axios({
                url: '/api/home/userMonthKpi_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.data = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        month(){
            var date = this.val + "" + this.value;
            var formData = new FormData();
            formData.append("date", date);
            axios({
                url: '/api/income/monthKpi_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.sumProfitDirect = respanse.data.data.sumProfitDirect;
                    this.sumProfitTeam = respanse.data.data.sumProfitTeam;
                    this.sumProfit = respanse.data.data.sumProfit;
                    this.sumCashBack = respanse.data.data.sumCashBack;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        monthSum(){
            var formData = new FormData();
            formData.append("date", this.selectedValue);
            axios({
                url: '/api/income/monthSumKpi_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.sumKpi = respanse.data.data.sumKpi;
                    this.lists = respanse.data.data.list;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        partnerTotal(){
            axios.get('/api/partner/partnerTotal').then(respanse=>{
                if(respanse.data.code == 0){
					this.shcount = respanse.data.data.shcount;
                    this.paycount = respanse.data.data.paycount;
                }else{
                    Toast(respanse.data.message);
                }
            })
        }
    },
    mounted () {
        this.userDay();
        this.userMonth();
        this.month();
        this.monthSum();
        this.partnerTotal();
    }
}
</script>
<style scoped>
    .login >>> .mint-header{
        background: #FFFFFF
    }
    .login >>> .mint-header-title{
        color: #222222;
        font-size: 18px;
    }
    .login >>> .is-selected{
        border-bottom: 3px solid #FF6A48;
        color: #FF6A48;
    }
    .box > ul > img{
        margin-top: 1rem;
    }
    .box{
        margin-top: 10px;
        margin-bottom: 2rem;
    }
    .box > ul > li{
        width: 97%;
        height: 113px;
        margin: 15px auto;
        background: #FFFFFF; 
        border-radius: 5px;
        /* box-shadow: 1px 1px 1px #e5e5e5; */
    }
    .box > ul > li > h3{
        width: 90%;
        height: 35px;
        color: #333333;
        line-height: 35px;
        text-align:left;
        margin: 0 auto;
        border-bottom: 1px solid #EBEBEB;
    }
    .box > ul > li > div{
        width: 33%;
        height: 78px;
        float: left;
        padding-top: 20px;
        text-align: center;
    }
    .box > ul > li > div > p{
        font-size: 15px;
    }
    .box > ul > li > div .txt{
        padding-top: 10px;
        color: #333333;
        font-size: 12px;
    }
    .box > ul > li > div .new{
        color: #13D1A5;
    }
    .box > ul > li > div .trading{
        color: #FF6A48;
    }
    .box > ul > li > div .partnership{
        color: #439CFF;
    }
    .col-50{
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #FFFFFF;
        margin-top: 4px;
    }
    .col-50 > select{
        border: none;
        color: #13D1A5;
        font-size: 17px;
        outline: none;
    }
    .content{
        width: 97%;
        height: 221px;
        margin: 10px auto;
        background: #FFFFFF;
    }
    .content > ul .teshu{
        border-bottom: 1px solid #EBEBEB;
    }
    .content > ul > li{
        width: 92%;
        height: 55px;
        margin: 0 auto;
        line-height: 55px;
        border-radius: 5px;
    }
    .content > ul > li .left{
        float: left;
        color: #333333;
        font-size: 14px;
    }
    .content > ul > li .right{
        float: right;
        color: #FF6A48;
        font-size: 15px;
    }
    .cumulative{
        width: 100%;
        background: #FF6A48;
        margin-top: 4px;
        overflow-y:scroll;
        min-height: 710px;
        margin-bottom: 1rem;
    }
    .cumulative .year{
        float: left;
        border: none;
        outline: none;
        font-size: 17px;
        color: #FFFFFF;
        background: #FF6A48;
        margin: 20px 0px 0px 20px;
    }
    .cumulative .year > img{
        margin-left: 13px;
    }
    .cumulative > p{
        padding-top: 80px;
        font-size: 30px;
        color: #FFFFFF;
    }
    .cumulative .add{
        width: 44%;
        height: 15px;
        line-height: 15px;
        text-align: center;
        margin: 15px auto;
    }
    .cumulative .add > i{
        width: 25%;
        height: 1px;
        background: #FFFFFF;
        display: block;
        float: left;
        position: relative;
        top: 6px;
        margin: 0px 5px 0px 5px;
    }
    .cumulative .add > span{
        font-size: 12px;
        color: #FFFFFF;
        float: left;
    }
    .cumulative > img{
        width: 95%;
        height: 401px;
        margin: 0 auto;
    }
    .cumulative .results{
        width: 95%;
        margin: 0 auto;
        min-height: 403px;
        background: #FFFFFF;
        position: absolute;
        top: 24%;
        left: 2.5%;
    }
    .cumulative .results > img{
        margin-top: 2rem;
    }
    .cumulative .results > ul > li{
        width: 90%;
        height: 55px;
        line-height: 55px;
        margin: 0 auto;
    }
    .cumulative .results > ul .teshu{
        border-bottom: 1px solid #EBEBEB;
    }
    .cumulative .results > ul > li .left{
        float: left;
        color: #333333;
        font-size: 15px;
    }
    .cumulative .results > ul > li .right{
        float: right;
        color: #FF6A48;
        font-size: 15px;
    }
    .hehuo{
        width: 95%;
        height: 131px;
        background: #13D1A5;
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
        font-size: 36px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 30px;
    }
    .shanghu{
        width: 95%;
        height: 131px;
        background: #439CFF;
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
        font-size: 36px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 30px;
    }
    .selectTime{
        height: 44px;
        line-height: 44px;
        background: #FFFFFF;
        margin-top: 4px;
        font-size: 17px;
        color: #13D1A5;
    }
    .selectTime > img{
        margin-left: 5px;
    }
    .login >>> .mint-popup{
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
    .login >>> .picker{
        margin-top: 50px;
    }
</style>
