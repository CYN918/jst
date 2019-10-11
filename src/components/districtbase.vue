<template>
    <div class="districtbase">
        <div @click="areagook" ><span id="tishi" style="color: #999999;font-size: 14px;">请选择开户行地址</span>{{ sendsrt }}</div>
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
	  name: 'districtbase',
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
                address: [],
                elemtwo: [],
                elemthree: [],
                slots: []
            };
        },
        components:{

          },
		methods: {
            onValuesChange (picker, values) {
                if(values[0]){
                    document.getElementById("tishi").style.display = "none";
                    picker.setSlotValues(1, values[0].value);
                    let myAdress = values[0].name+ ' ' +values[1].name;
                    let district = new Object();
                    district.provinceName = values[0].name;
                    district.cityName = values[1].name;
                    this.$emit('areaChange', {myAdress, district});
                }
            },
            areagocancel () {
                this.popupVisible = false
            },
            areagook () {
                if(this.address.length == 0){
                    this.getAddress()
                }
                this.popupVisible = true
            },
            getAddress () {
                axios.get('../../static/city.json', {

                })
                .then(response => {
                    this.address = response.data.data
                    if(response.data.data.length > 0){
                        let province = 10
                        let city = 0
                        if(this.arealist === undefined){
                            this.elemtwo  = this.address[10].value
                            this.elemthree = this.address[10].value[0].value
                        }else{
                            province = this.arealist[0]
                            city = this.arealist[1]
                            for (let i = 0; i < response.data.data.length; i++) {
                                let elemont = response.data.data[i];
                                console.log(elemont)
                                let elemont_id = elemont.id
                                if(elemont_id == province){
                                    this.elemtwo = elemont.value
                                    for (let j = 0; j < this.elemtwo.length; j++) {
                                        let elemode = this.elemtwo[j];
                                        let elemode_id = elemode.id;
                                        if(elemode_id == city){
                                            this.elemthree = elemode.value
                                            for (let e = 0; e < this.elemthree.length; e++) {
                                                let elemort = this.elemthree[e];
                                                let elemort_id = elemort.id;
                                                if(elemort_id == area){
                                                    area = e
                                                }
                                            }
                                            city = j
                                        }
                                    }
                                    province = i
                                }
                            }
                        }
                        this.slots = [{
                            flex: 1,
                            values: this.address,
                            defaultIndex: province,
                            className: 'slot1',
                            textAlign: 'center'
                        }, {
                            divider: true,
                            content: '-',
                            className: 'slot2'
                        }, {
                            flex: 1,
                            values: this.elemtwo,
                            defaultIndex: city,
                            className: 'slot3',
                            textAlign: 'center'
                        }];
                    }
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
