<template>
    <div class="contain">
        <div class="head">
            <router-link to="/setting" class="back"><i class="icon-back"></i><span>返回</span></router-link>
            <span class="title">修改密码</span>
        </div>
        <div class="main my-partner noticeList">
            <div class="record-list">
                <mt-field label="旧密码" placeholder="请输入旧密码" type="password" v-model="password"></mt-field>
                <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newpassword"></mt-field>
                <mt-field label="确认密码" placeholder="请再次输入新密码" type="password" v-model="confirmpassword"></mt-field>
            </div>
        </div>
        <div class="btn-click" @click="upDate">
            <mt-button type="danger" class="complete">完成</mt-button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'updatePwd',
    data () {
        return {
            password: '',
            newpassword: '',
            confirmpassword: '',
        }
    },
    components:{
        
    },
    methods: {
        upDate(){
            if(!this.password){
                Toast('请输入旧密码');
                return false
            }
            if(!this.newpassword){
                Toast('请输入新密码');
                return false
            }
            if(this.password != this.newpassword){
                Toast('两次密码不一致!');
                return false
            }
            var formData = new FormData();
            formData.append("password", this.password);
            formData.append("newPassword", this.newpassword);
            formData.append("newPassword_", this.confirmpassword);
            axios({
                url: '/api/user/doUpdatePwd',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    Toast(respanse.data.message);
                }else if(respanse.data.code == 1){
                    Toast(respanse.data.message);
                }else if(respanse.data.code == -1){
                    Toast(respanse.data.message);
                }
            })
        }
    },
    mounted () {
        
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
    .version-text{
        font-size: 15px;
        color: #222222;
    }
    .record-list{
        width: 100%;
        margin: 0 auto;
    }
    .btn-click{
        position: relative;
        top: 100px;
    }
    .btn-click .complete{
        width: 92%;
    }

</style>
