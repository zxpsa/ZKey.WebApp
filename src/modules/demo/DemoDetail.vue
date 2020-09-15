<template>
    <ZkModal :title="title" :size="'sm'" :visible="visible" @cancel="handleCancel" @ok="handleOk">
        <ZkDescList :col="1">
            <ZkDescItem term="用户姓名" :labelCol="labelCol">{{ info.userName }}</ZkDescItem>
            <ZkDescItem term="用户姓名" :labelCol="labelCol">{{ info.userName }}</ZkDescItem>
            <ZkDescItem term="用户手机号" :labelCol="labelCol">{{ info.phone }}</ZkDescItem>
            <ZkDescItem term="用户性别" :labelCol="labelCol">{{ info.sexStr }}</ZkDescItem>
            <ZkDescItem term="注册时间" :labelCol="labelCol">{{ info.registrationTime }}</ZkDescItem>
            <ZkDescItem term="用户状态" :labelCol="labelCol">{{ info.status | toStatusStr }}</ZkDescItem>
        </ZkDescList>
    </ZkModal>
</template>
<script>
    import { ZkModal, ZkDescList, ZkDescItem } from 'ZKey.WebApp.PC/dist/index.esm.js';

    export default {
        components: { ZkModal, ZkDescList, ZkDescItem },
        data() {
            return {
                title:'查看',
                visible:false,
                info: {
                    userName: '用户姓名',
                    phone: '用户手机号',
                    sexStr: '男',
                    registrationTime: '2020-11-12 00:00:00',
                    status: 1
                },
                labelCol: {
                    span: 8
                }
            }
        },
        filters: {
            toStatusStr(val) {
                return val == 1 ? '启用' : '禁用';
            }
        },
        methods: {
            show({id, onOk, onCancel }) {
                this.visible = true;
                this.id = id;
                this._onOk = onOk;
                this._onCancel = onCancel;
            },
            
            handleCancel(){
                this.visible = false;
            },

            handleOk(){
                console.log('确定点击')
            }
        }
    }
</script>


