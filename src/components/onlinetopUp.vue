<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">在线充值</span>
        </div>
        <div class="main my-wallet">
            <div style="border-radius: 10px;width: 97%;margin: 0px auto;height: 120px;margin-top: 15px;">
                <div class="bankLogo">
                    <span class="bankName">收款人名</span>
                    <span class="bankInstructions">{{payeeName}}</span>
                </div>
                <div class="bankLogo">
                    <span class="bankName">收款账户</span>
                    <span class="bankInstructions">{{payeeId}}</span>
                </div>
            </div>
            
            <div class="content">
                <div class="bankLogo">
                    <span class="bankName">付款人名</span>
                    <span class="Input"><input type="text" placeholder="请输入姓名" v-model="payerName"/></span>
                </div>
                <div class="bankLogo">
                    <span class="bankName">付款账户</span>
                    <span class="Input"><input type="text" placeholder="请输入银行卡账号" v-model="payerId"/></span>
                </div>
                <div class="bankLogo">
                    <span class="bankName">充值金额</span>
                    <span class="Input"><input type="text" placeholder="请输充值入金额" v-model="money"/></span>
                </div>
            </div>

            <div class="upload">
                <el-upload
                    action="/api/return/uploadIdImg"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-change="imgSaveToUrl"
                    :on-success="handleAvatarSuccess"
                    :limit="3"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <p>请上传充值凭证照片，一次最多上传3张</p>
            </div>
            <div class="btn-click">
                <mt-button  size="large" :disabled="subumting"  @click="withdrawal" :plain="true" type="primary">
                    <span v-if="!subumting">确认上传</span>
                    <span style="display:table-cell;" v-else><mt-spinner :type="2" color="#26a2ff"></mt-spinner></span>
                </mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios';
export default {
    name: 'onlinetopUp',
    data () {
        return {
            payeeName: '九州软件科技有限公司',
            payeeId: '6226 0026 1589 2203',
            payerName: '',
            payerId: '',
            money: '',
            image: '',
            dialogImageUrl: '',
            dialogVisible: false,
            imgI: [],
            subumting: false,
        }
    },
    components:{
        
    },
    methods: { 
        handleAvatarSuccess(response, file, fileList) {
            var imgI = [];
            for(var i = 0;i < fileList.length;i++){
                imgI.push(fileList[i].response.data)
            }
            this.imgI = imgI;
            if(imgI.length === 3){
                document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none';
            }
        },
        handleExceed(files, fileList) {
             Toast('最多只能上传三张图片');
        },
        imgSaveToUrl(fileList){
            // console.log(fileList)
        },
        handleRemove(file, fileList) {
            var imgI = [];
            for(var i = 0;i < fileList.length;i++){
                imgI.push(fileList[i].response.data)
            }
            this.imgI = imgI;
            if(imgI.length === 0){
                document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block';
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        withdrawal(){
            if(!this.payerName){
                Toast('请输入付款人姓名');
                return false
            }
            if(!this.payerId){
                Toast('请输入付款账户');
                return false
            }
            if(!this.money){
                Toast('请输入充值金额');
                return false
            }
            this.subumting = true
            var formData = new FormData();
            formData.append("payeeName", this.payeeName);
            formData.append("payeeId", this.payeeId); 
            formData.append("payerName", this.payerName); 
            formData.append("payerId", this.payerId); 
            formData.append("money", this.money); 
            formData.append("imgI", this.imgI[0]); 
            formData.append("imgIi", this.imgI[1]); 
            formData.append("imgIii", this.imgI[2]); 
            axios({
                url: '/api/return/addReturnTopUp',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    Toast(respanse.data.message);
                    //充值审核中
                    this.$router.push({path: '/bindTerminal',query:{name:respanse.data.data.name,aumot:this.money}});
                }else{
                    Toast(respanse.data.message);
                    this.subumting = false
                }
            })
            //充值成功
            //this.$router.push({path: '/average'}); 
            //充值失败
            //this.$router.push({path: '/myRate'}); 
            
        },
    },
    mounted () {
        
    }
}
</script>
<style scoped>
    .hiddenInput{
        display: none;
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
    .bankLogo{
        height: 60px;
        background: #FFFFFF;
    }
    .bankLogo .logo{
        width: 30px;
        height: 30px;
        float: left;
        margin: 20px 0px 0px 20px;
    }
    .bankLogo .logo > img{
        width: 30px;
        height: 30px;
    }
    .bankLogo .bankName{
        font-size: 15px;
        color: #222222;
        float: left;
        margin: 25px 0px 0px 20px;
    }
    .bankLogo .bankInstructions{
        font-size: 13px;
        color: #999999;
        float: right;
        margin: 25px 10px 0px 0px;
    }
    .content{
        width: 97%;
        margin: 0px auto;
        height: 180px;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 15px;
    }
    .content > h3{
        width: 95%;
        margin: 0 auto;
        text-align: left;
        font-size: 13px;
        color: #333333;
    }
    .content > h3 > i{
        font-style: normal;
        color: #FF6A48;
    }
    .content .withdrawal{
        height: 30px;
        width: 95%;
        margin: 0 auto;
        border-bottom: 1px solid #EBEBEB;
        text-align: left;
        margin-top: 42px;
        padding-bottom: 35px;
    }
    .content .withdrawal > label{
        font-size: 24px;
    }
    .content .withdrawal > input{
        width: 132px;
        height: 30px;
        font-size: 19px;
        color: #999999;
        border: none;
    }
    .content .withdrawal > a{
        float: right;
        color: #FF6A48;
        font-size: 12px;
        margin-right: 15px;
        margin-top: 5px;
    }
    .content .prompt{
        font-size: 12px;
        color: #999999;
        display: block;
        margin-top: 10px;
        text-align: left;
        margin-left: 13px;
    }
    .btn-click{
        position: relative;
        top: 80px;
    }
    .btn-click > button{
        width: 90%;
        margin: 0 auto;
        border-radius:30px;
        background: #FF6A48;
        border: none;
        color: #FFFFFF;
    }
    .Input{
        height: 60px;
        display: block;
        width: 60%;
        float: right;
        padding-right: 12px;
    }
    .Input > input{
        border: none;
        height: 30px;
        float: right;
        position: relative;
        top: 18px;
        font-size: 15px;
        text-align: right;
    }
    .upload{
        width: 97%;
        margin: 0px auto;
        min-height: 150px;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 15px;
    }
    .upload >>> .el-upload--picture-card{
        width: 95px;
        height: 95px;
        line-height: 95px;
    }
    .upload >>> .el-upload-list__item{
        width: 95px;
        height: 95px;
    }
    .upload > ul > li{
        width: 25%;
        height: 87px;
        float: left;
        border: 1px #4D4D4D dashed;
        text-align:center;
        line-height:87px;
        margin: 15px 15px;
    }
    .upload > ul > li > img{
        vertical-align:middle;
    }
    .upload > p{
        width: 87%;
        height: 14px;
        float: left;
        color: #999999;
        font-size: 13px;
        text-align: left;
        margin: 15px auto;
        margin-top: 15px;
        margin-left: 25px;
    }
    .upload > p > b{
        float: right;
    }
</style>
