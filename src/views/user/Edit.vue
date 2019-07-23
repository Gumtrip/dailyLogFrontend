<template>
    <el-card class="box-card">
        <div slot="header">
            修改资料
        </div>
        <el-form :model="userForm" label-position="left" label-width="100px">
            <el-form-item label="用户名">
                <el-input  name="name" v-model="userForm.name"></el-input>


            </el-form-item>
            <el-form-item label="用户名片">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    name="images"
                    :data="this.uploadDate"
                    :show-file-list="false"
                    :on-success="handleUploadSuccess"
                    :before-upload="beforeUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    import {mapState} from 'vuex';
    import config from '@/config/config.js'
    export default {
        name: "Edit",
        data() {
            return {
                userForm: {
                    name: '',
                    business_card: '',
                },
                uploadDate:{
                    type:'user',
                    prefix:''
                },
                uploadUrl:config.appUrl+'/api/uploadImages',
                imageUrl: ''
            }
        },
        computed: {
            ...mapState([
                'auth',
                'user'
            ])
        },
        created() {
            this.userMe();
        },

        methods: {
            userMe() {
                this.$api.userMe().then((response) => {
                    const user = response.data;
                    this.userForm.name = user.name;
                    this.userForm.business_card = user.business_card;
                    if(user.business_card)this.imageUrl = user.business_card;
                    this.uploadDate.prefix = user.id;
                    this.$store.dispatch('userUpdate', user);
                })

            },
            handleUploadSuccess(res, file) {
                this.userForm.business_card = res;
                this.imageUrl = URL.createObjectURL(file.raw);
            },

            beforeUpload(file) {
                const isPIC = ['image/jpeg','image/png','image/gif'] ;
                const isLt2M = file.size / 1024 / 1024 < 2;
                const isImage = isPIC.indexOf(file.type)==-1?false:true
                if (!isImage) {
                    this.$message.error('上传头像图片只能是 JPG,PNG,GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isImage && isLt2M;
            },
            async submitForm() {
                    const response = await this.$api.userUpdate({
                        name: this.userForm.name,
                    });
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.$store.dispatch('userUpdate', response.data);
            },
        }

    }
</script>

<style lang="scss" scoped>
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
