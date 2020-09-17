<template>
    <div>
        <zk-list ref="table" rowKey="id" :searchs="searchs" :columns="columns" :data="loadData">
            <template #operBtns>
                <div>
                    <a-button type="primary" icon="plus" @click="handleEdit()">新增</a-button>
                </div>
            </template>
            <template #status="record">
                <a-badge :status="record.status | statusTypeFilter" :text="record.status | statusFilter" />
            </template>
            <template #action="record">
                <span>
                    <zk-btn @click="handleDetail(record)">查看</zk-btn>
                    <a-divider type="vertical" />
                    <zk-btn @click="handleEdit(record)">修改</zk-btn>
                    <a-divider type="vertical" />
                    <zk-btn @click="handleDel(record)">删除</zk-btn>
                </span>
            </template>
        </zk-list>
        <DemoDetail ref="demoDetail"></DemoDetail>
        <DemoEdit ref="demoEdit"></DemoEdit>
    </div>
</template>
<script>
// import { ZkSelect,ZkList } from 'ZKey.WebApp.PC';
import { ZkSelect, ZkList, InputTypeEnum,ZkBtn } from '@zkey-webapp/pc';
import { queryDemoListByPage } from '@/api/demo';
import DemoDetail from './DemoDetail.vue';
import DemoEdit from './DemoEdit.vue';

const statusMap = {
  "-1": { status: 'default', text: '停用' },
  "1": { status: 'success', text: '启用' }
}

export default {
    name:'DemoList',
    components:{ ZkSelect, ZkList, ZkBtn, DemoDetail, DemoEdit },
    data() {
        return {
            title:"客服人员管理",
            // 查询
            searchs:[
                { title: "客服姓名", dataIndex: 'userName' },
                { title: "联系电话", dataIndex: 'tel',type:InputTypeEnum.NUMBER },
                { title: "客服昵称", dataIndex: 'nickName' },
                { title: "服务状态", dataIndex: 'status', type:InputTypeEnum.SELECT,
                options: () => Promise.resolve([
                    { label: '全部', value: 999 },
                    { label: '启用', value: 1 },
                    { label: '停用', value: -1 }
                ]),value:999 }
            ],
            // 表头
            columns: [
                { title: "用户姓名", dataIndex: "userName",width:'150px' },
                { title: "状态", scopedSlots:{ customRender: "status"},width:'100px' },
                { title: "联系电话", dataIndex: "tel",width:'150px' },
                { title: "功能列", scopedSlots:{ customRender: "action"},width:'180px' },
            ],
            // 加载数据方法 必须为 Promise 对象
            loadData: (queryParams,parameter) => {
               if (queryParams.status==999)queryParams.status = null;
               return queryDemoListByPage(queryParams,parameter);
            }
        }
    },
    filters: {
        statusFilter (type) {
            return statusMap[type].text
        },
        statusTypeFilter (type) {
            return statusMap[type].status
        }
    },
    methods:{
        handleDetail(item){
            this.$refs.demoDetail.show({
                id:item.id,
                onOk:()=>{
                    // 刷新当前列表
                    this.$refs.table.refresh(true);
                }
            });
            console.log(item);
        },
        
        handleEdit(item){
           const id = item?item.id:null;
           this.$refs.demoEdit.show({
                id,
                onOk:()=>{
                    this.$refs.table.refresh(true);
                }
            })
        },

        handleDel(item){
            console.log(item);
            this.$confirm({
                title:'提示',
                content:`确定删除客服“${item.userName}”？`,
                onOk:()=>{
                   delPersonnel({ id:item.id }).then((result) => {
                       this.$refs.table.refresh();
                   });
                }
            });
        },

        showDoctorDetail(item){
            this.$refs.DoctorDetailVue.show({ doctorId:item.id , doctorName:item.text });
        }
    }
}
</script>