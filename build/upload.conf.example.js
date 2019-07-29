const dest ={
    host: '',
    username: '',
    password: '',
};
const staticPath = {path: '/var/www/dailyLog/public/static'};
const staticDevPath = 'dist/static';
const indexPath = {path: '/var/www/dailyLog/resources/views/index.blade.php'};
const indexDevPath = 'dist/index.html';
const staticDest = {};
const indexDest = {};
Object.assign(staticDest,dest,staticPath);
Object.assign(indexDest,dest,indexPath);
module.exports={
    STATIC_DEST:staticDest,
    STATIC_DEV_PATH:staticDevPath,
    INDEX_DEST:indexDest,
    INDEX_DEV_PATH:indexDevPath,
};
