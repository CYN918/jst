<template>
    <div class="districtbase">
        <div @click="areagook" >{{ boxsrt }}<span id="tishiOne" style="color: #BFBFBF;font-size: 14px;">请选择开户行</span>{{ sendsrt }}</div>
        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="ve-choice-yn">
                <span @click="areagocancel">取消</span>
                <span @click="areagocancel">确定</span>
            </div>
            <mt-picker style="width: 100vw;" :slots="slots" value-key="name" @change="onValuesChange"></mt-picker> 
        </mt-popup>
    </div>
</template>
<script>
    import axios from 'axios'
    
    export default {
	  name: 'district',
        props: {
            boxsrt: '',
            sendsrt: '',
            arealist: Array,
            multiple: Boolean,
            max: Number
        },
        data() {
            return {
                popupVisible: false,
                elemont_id: [],
                slots: []
            };
        },
		methods: {
            onValuesChange(picker, values) {
                if (values[0]) {
                    document.getElementById("tishiOne").style.display = "none";
                    picker.setSlotValue(1, values[0]);
                    let bankName = values[0].name
                    this.$emit('areaChange', {bankName});
                }
            },
            areagocancel () {
                this.popupVisible = false
            },
            areagook () {
                if(this.elemont_id.length == 0){
                    this.getAddress()
                }
                this.popupVisible = true
            },
            getAddress () {
                axios.get('/api/cnaps/bankName', {
                    
                })
                .then(response => {
                    this.elemont_id = response.data.data
                    this.slots = [{
                        flex: 1,
                        values: this.elemont_id,
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
<style scoped>
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