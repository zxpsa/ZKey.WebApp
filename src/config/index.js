const EnvEnum = {
    DEV:'dev',
    TEST:'test',
    PRE:'pre'
}
// const env = EnvEnum.DEV;
// const env = EnvEnum.DEV;
const env = EnvEnum.TEST;
// const env = EnvEnum.PRE;

let apiRoot = "http://localhost:1000";
let wsRoot = 'ws://114.67.72.31:24159';
let rootUrl = 'http://localhost:8000';
let tagStr = '';
if (env == EnvEnum.TEST) {
    apiRoot = 'http://121.89.161.151';
    wsRoot = 'ws://121.89.161.151:24159';
    tagStr = '[ 测试版 ]';
}else if(env == EnvEnum.PRE){
    apiRoot = 'http://114.67.72.31';
    wsRoot = 'ws://114.67.72.31:24159';
    rootUrl = 'http://zkey.pro/47e0bf7a';
    tagStr = '[ 试用版 ]';
}else if(env == EnvEnum.DEV){
    tagStr = '[ 开发版 ]';
}
const href = window.location.href;
if (href.indexOf('/index.html')>-1) {
    // 计算出项目根路径
    rootUrl = href.split('/index.html')[0];
}

let cfg = {
    EnvEnum,
    env,
    /** 项目地址 */
    rootUrl,
    /** 主接口地址 */
    // apiRoot: "http://localhost:1000",
    apiRoot,
    /** websocket 地址 */
    wsRoot,
    /** 管理端首页地址 */
    homeIndex: "/lightingStatus",
    /** 匿名白名单 */
    whiteList: ['login', 'register', 'registerResult'], // no redirect whitelist
    /** 登录页面 */
    loginPath: '/user/login',
    /** 密钥 */
    secretKey:'web:202CB962AC59075B964B07152D234B70',
    /** logo 图片地址 */
    logoImg:rootUrl+'/logo.png?_t=1'
}
ZKConfig = Object.assign(ZKConfig,cfg);

ZKConfig.appName =  ZKConfig.appName + tagStr;
ZKConfig.copyright =  ZKConfig.copyright + tagStr;


cfg.test = {
    
}
export default ZKConfig;