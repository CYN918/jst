<template>
    <div class="login">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i></router-link>
            <span class="title">垫返明细</span>
        </div>
        <div class="box">
            <div class="col-50">
                <div class="selectTime" @click="selectData">{{val}}<img src="../assets/img/duobianxing.png"/>&nbsp;&nbsp;&nbsp;&nbsp;{{value}}<img src="../assets/img/duobianxing.png"/></div>
            </div>
            <div class="spending">本月支出：{{monthExpend}}</div>
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
        </div>
        <div class="allDetail">
            <ul v-if="this.list != null">
                <li v-for="item in list">
                    <div class="left"><span class="txt" v-if="item.type == 1">激活垫返</span><span class="txt" v-if="item.type == 10">垫返充值</span><span class="time">{{item.time}}</span></div>
                    <div class="right">+{{item.money}}</div>
                </li>
            </ul>
            <ul v-else>
                <img src="../assets/img/zanwushuju.png"/>
                <p>暂无数据</p>
            </ul>
        </div>
                
                
            
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'mattoReturn',
    data () {
        return {
            dateVal: '', // 默认是当前日期
            val:'2019',
            value:'08',
            list: [],
            monthExpend: '',
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
                if(i==2){
                    a[i].style.display="none";
                }
            }
        },
        dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.val = this.dateVal.getFullYear();     
            if(this.dateVal.getMonth() + 1 <= 9){
                this.value = '0' + (this.dateVal.getMonth() + 1);
            }else{
                this.value = this.dateVal.getMonth() + 1;
            }     
            this.getData();
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
            var time = this.val + this.value;
            var formData = new FormData();
            formData.append("M_", 1);
            formData.append("N_", 15); 
            formData.append("time", time); 
            axios({
                url: '/api/return/returnList',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.monthExpend = respanse.data.data.monthExpend;
                    this.list = respanse.data.data.list;
                }else{
                    Toast(respanse.data.message);
                }
            })
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
    .box{
        height: 44px;
        line-height: 44px;
        background: #FFFFFF;
        margin-top: 5px;
    }
    .col-50{
        width: 97px;
        height: 25px;
        line-height: 25px;
        background: #FFFFFF;
        margin-top: 4px;
        float: left;
        margin-top: 10px;
        margin-left: 10px;
    }
    .col-50 > select{
        border: none;
        outline: none;
    }
    .spending{
        width: 129px;
        float: right;
        font-size: 13px;
    }
    .allDetail{
        width: 95%;
        margin: 0px auto;
        min-height: 510px;
        background: #FFFFFF;
        margin-top: 5px;
    }
    .allDetail > ul > img{
        margin-top: 2rem;
    }
    .allDetail > ul > li{
        width: 95%;
        margin: 0 auto;
        height: 50px;
        border-bottom: 1px solid #EBEBEB;
    }
    .allDetail > ul > li .left{
        float: left;
    }
    .allDetail > ul > li .left .txt{
        text-align: left;
        color: #222222;
        font-size: 13px;
        display: block;
        margin-top: 10px;
    }
    .allDetail > ul > li .left .time{
        text-align: left;
        color: #808080;
        font-size: 11px;
        display: block;
        margin-top: 5px;
    }
    .allDetail > ul > li .right{
        float: right;
        color: #13D1A5;
        font-size: 17px;
        line-height: 50px;
    }
    .allDetail > ul > li .active{
        color: #222222;
    }
</style>
