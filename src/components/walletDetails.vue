<template>
    <div class="login">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i></router-link>
            <span class="title">日结明细</span>
        </div>
        <div class="showTime">
            <div class="selectTime" @click="selectData">{{selectedValue}}-{{monthlyValue}}<img src="../assets/img/duobianxing.png"/></div>
            <div class="fanxian" @click="popupVisible = true">{{allTheDetail}}<img src="../assets/img/duobianxing.png"/></div>
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
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>   
            <div class="picker-btn-wrap">
                <div  class="picker-cancel" @click="addressChooseCancel">取消</div>
                <div  class="picker-sure" @click="confirmChoose">确定</div>
            </div>   
        </mt-popup>
        <div class="content"  v-if="this.list != null">
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="isMoreLoading"
                :infinite-scroll-immediate-check="false"
                infinite-scroll-distance="12">
                <li class="active" v-for="item in list">
                    <div class="content-left"><span>{{item.record}}</span><span>{{item.year}}</span></div>
                    <div class="content-right" v-if="item.type == 1">+{{item.amount}}</div>
                    <div class="content-right" v-if="item.type == 2">+{{item.amount}}</div>
                    <div class="content-right" v-if="item.type == 10">-{{item.amount}}</div>
                    <div class="content-right" v-if="item.type == 11">-{{item.amount}}</div>
                </li>
            </ul>
            <!--显示加载中转菊花-->
            <div class="loading-box tc" v-if="isLoading">
                <mt-spinner type="snake" class="loading-more"></mt-spinner>
                <span class="loading-more-txt">加载中...</span>
            </div>

            <div class="no-more" v-if="noMore" style="margin-top: 0.5rem;font-size: 14px;">没有更多了~</div>
            
        </div>
        <div v-else>
            <img src="../assets/img/kongkong_icon.png" class="Img"/>
            <p style="font-size: 18px;">暂无数据</p>
        </div>
    </div>
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'walletDetails',
    data () {
        return {
            dateVal: '', // 默认是当前日期
            selectedValue: '2019',
            monthlyValue: '09',
            allTheDetail: '',
            popupVisible: false,
            myAddressSlots: [{ 
                    flex: 1, 
                    values: ['全部明细', '提现明细', '分润明细'], 
                    valueKey: ['1','2','3'],
                    className: 'slot1', 
                    textAlign: 'center' 
            }],
            inputValue: '',
            list: [],
            page: 1,
			pageSize: 12,
			isLoading: false, // 加载中转菊花
            isMoreLoading: true, // 加载更多中
			noMore: false, // 是否还有更多
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
            this.selectedValue = this.dateVal.getFullYear();     
            if(this.dateVal.getMonth() + 1 <= 9){
                this.monthlyValue = '0' + (this.dateVal.getMonth() + 1);
            }else{
                this.monthlyValue = this.dateVal.getMonth() + 1;
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
        onMyAddressChange(picker,values){
            this.allTheDetail = picker.values[0];
        },
        addressChooseCancel(){
            this.popupVisible = false;
            this.getData();
        },
        confirmChoose(){
            this.popupVisible = false;
            this.page = 1;
            this.getData();
        },
        getData(type){
            var time = this.selectedValue + "" + this.monthlyValue;
            if(this.allTheDetail === '全部明细'){
                var allTheDetail = 1;
            }else if(this.allTheDetail === '提现明细'){
                var allTheDetail = 2;
            }else if(this.allTheDetail === '分润明细'){
                var allTheDetail = 3;
            }
			var formData = new FormData();
            formData.append("M_", this.page);
			formData.append("N_", this.pageSize);
            formData.append("time", time);
            formData.append("state", 1);
            formData.append("type", allTheDetail);
            axios({
                url: '/api/user/details',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.list =  respanse.data.data.list;
					if (type === 'loadMore') {
                        this.list =  this.list.concat(respanse.data.data.list)
                    } else {
                        this.list =  respanse.data.data.list;
                    }
				    this.total = respanse.data.data.count;
                    this.totalPage = Math.ceil(this.total / this.pageSize)
					//console.log('总页数', Math.ceil(this.total / this.pageSize))
					this.page += 1 // 增加分页
					this.isMoreLoading = true // 设置加载更多中
					this.isLoading = true // 加载中
					this.noMore = false
					//console.log(this.page)
					if (this.page > this.totalPage) { // 超过了分页
						this.noMore = true // 显示没有更多了
						this.isLoading = false // 关闭加载中
						return false
					}
                }else{
					Toast(respanse.data.message);
                }
                this.isLoading = false
                this.isMoreLoading = false
            })
        },
        loadMore() {
            // 做个缓冲
            setTimeout(() => {
                this.getData('loadMore')
            }, 100)
        },
    },
    mounted () {
        this.getData();
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
    .showTime .fanxian > img{
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
