<template>
    <ZkModal :title="title" :size="'md'" :visible="visible" @cancel="handleCancel" @ok="handleOk">
        <!-- <FormModel></FormModel> -->
        <a-form-model ref="form" :model="info" v-bind="formLayout" :rules="rules">
            <a-row :gutter="48">
                <a-col>
                    <a-form-model-item label="用户姓名" prop="userName">
                        <a-input v-model="info.userName"/>
                    </a-form-model-item>
                </a-col>
            </a-row>
              <a-row :gutter="48">
                <a-col>
                    <a-form-model-item label="用户手机号" prop="phone">
                        <a-input v-model="info.phone"/>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="48">
                <a-col>
                    <a-form-model-item label="选择员工" prop="accountName">
                        <a-input v-model="info.accountName" read-only @click="showSelectCustomerUser">
                            <a-icon type="ellipsis" slot="addonAfter"/>
                        </a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </ZkModal>
</template>
<script>
    import { ZkModal,ZkDescList, ZkDescItem  } from '@zkey-webapp/pc';
    // import { } from 'ant-design-vue';
    export default {
        components: { ZkModal, ZkDescList, ZkDescItem },
        data() {
            return {
                title: '修改',
                visible: false,
                info: {
                    userName: '用户姓名',
                    phone: '用户手机号',
                    sexStr: '男',
                    registrationTime: '2020-11-12 00:00:00',
                    status: 1,
                    accountName:'员工账户'
                },
                /** 布局配置 */
                formLayout: {
                    layout: 'horizontal',
                    labelCol: { xs: { span: 24 }, sm: { span: 7 } },
                    wrapperCol: { xs: { span: 24 }, sm: { span: 13 } }
                },
                rules: {
                    userName: [{ required: true, message: '请输入内容！', trigger: 'change' }],
                    phone: [{ required: true, message: '请输入内容！', trigger: 'change' }],
                }
            }
        },
        methods: {
            show({ id, onOk, onCancel }) {
                this.visible = true;
                this.title = id ? '修改':'新增';
                this.id = id;
                this.$nextTick(()=> this.$refs.form.resetFields());
                this._onOk = onOk;
                this._onCancel = onCancel;
            },

            handleCancel() {
                this.visible = false;
            },

            handleOk() {
                this.$refs.form.validate((valid) => {
                    if (!valid) return;
                    console.log('确定点击');
                })
            },

            showSelectCustomerUser() {
                console.log(123123)
            }
        }
    }
</script>


