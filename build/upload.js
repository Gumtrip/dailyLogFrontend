const client = require('scp2');
const uploadConfig = require('./upload.conf');
function uploadCallBack(err){
    if(err){
        console.log(err);
    }else{
        console.log('文件上传完毕!\n')
    }
}
client.scp(uploadConfig.STATIC_DEV_PATH,uploadConfig.STATIC_DEST,uploadCallBack);
client.scp(uploadConfig.INDEX_DEV_PATH,uploadConfig.INDEX_DEST,uploadCallBack);
