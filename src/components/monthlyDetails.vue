<template>
    <div class="login">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i></router-link>
            <span class="title">月结明细</span>
        </div>
        <div class="showTime">
            <div class="selectTime" @click="selectData">{{selectedValue}}<img src="../assets/img/duobianxing.png"/></div>
            <div class="fanxian">返现总额: {{amount}}</div>
        </div>
        <!-- @touchmove.prevent 阻止默认事件，此方法可以在选择时间时阻止页面也跟着滚动。 -->
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
                date-format="{value}"
                @confirm="dateConfirm()">
            </mt-datetime-picker>
        </div>
        <div class="content">
            <ul v-if="this.list != null">
                <li class="active" v-for="item in list">
                    <div class="content-left"><span>分润</span><span>{{item.time}}</span></div>
                    <div class="content-right">+{{item.bonus}}</div>
                </li>
            </ul>
            <ul v-else>
                <img src="../assets/img/kongkong_icon.png" class="Img"/>
				<p style="font-size: 18px;">暂无数据</p>
            </ul>
        </div>


        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'monthlyDetails',
    data () {
        return {
            dateVal: '', // 默认是当前日期
            selectedValue: '2019',
            amount: '',
            list: [],
        }
    },
    components:{
        
    },
    methods: {
        selectData () {
            if(!this.dateVal){
                this.dateVal = new Date()
            }
            this.$refs['picker'].open()
            var a = document.getElementsByClassName('picker-slot');
            for(let i=0;a && i < a.length;i++){
                if(i==2||i==1){
                    a[i].style.display="none";
                }
            }
        },
        dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.selectedValue = this.dateVal.getFullYear();
        },
        formatDate(date) {
            const y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? '0' + m : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return y + ' ' + m + ' ' + d
        },
        getData(){
            var formData = new FormData();
            formData.append("year", this.selectedValue);
            axios({
                url: '/api/user/historyBonus',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.amount = respanse.data.data.amount;
                    this.list = respanse.data.data.list;
                }else{
                    Toast(respanse.data.message);
                    
                }
            })
        },
    },
    mounted () {
        this.getData()
    }
}
</script>
<style scoped>
    .Img{
        padding-top: 1rem;
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
    .showTime{
        height: 44px;
        line-height: 44px;
        margin-top: 5px;
    }
    .showTime .selectTime{
        float: left;
        font-size: 13px;
        color: #222222;
        margin-left: 26px;
    }
    .showTime .selectTime > img{
        margin-left: 13px;
    }
    .showTime .fanxian{
        float: right;
        font-size: 13px;
        color: #222222;
        margin-right: 26px;
    }
    .content{
        width: 96%;
        min-height: 496px;
        background: #FFFFFF;
        margin: 0px auto;
        margin-top: 12px;
    }
    .content > ul > li{
        width: 95%;
        margin: 0px auto;
        height: 54px;
        
    }
    .content > ul .active{
        border-bottom: 1px solid #EBEBEB;
    }
    .content > ul > li .content-left{
        width: 50%;
        float: left;
        text-align: left;
    }
    .content > ul > li .content-left > span{
        width: 100%;
        display: inline-block;
        margin-top: 10px;
    }
    .content > ul > li .content-left > span:nth-child(1){
        color: #222222;
        font-size: 13px;
        font-weight: bold;
    }
    .content > ul > li .content-left > span:nth-child(2){
        color: #808080;
        font-size: 11px;
    }
    .content > ul > li .content-right{
        width: 50%;
        float: right;
        text-align: right;
        line-height: 54px;
        color: #FF6A48;
        font-size: 17px;
    }
</style>
