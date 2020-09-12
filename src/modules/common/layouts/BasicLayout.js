import { ZkBasicLayout } from 'ZKey.WebApp.PC/dist/index.esm';
import 'zkey.webapp.pc/dist/index.esm.css';
export default {
    components: {
        ZkBasicLayout
    },
    data() {
        return {
            /** 当前用户信息和操作菜单 */
            currentUser: {
                name: '测试',
                imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                menus: [
                    {
                        label: '个人中心', icon: 'user',
                        onClick() {
                            console.log(123123);
                        }
                    },
                    {
                        label: '个人设置', icon: 'setting',
                        onClick() {
                            console.log(123123);
                        }
                    },
                    {
                        label: '退出登录', icon: 'logout',
                        onClick() {
                            console.log(123123);
                        }
                    }
                ]
            },
            langs: [
                {
                    label: '简体中文',
                    icon: '🇨🇳',
                    onClick() {
                        console.log('选择简体中文');
                    }
                },
                {
                    label: 'English',
                    icon: '🇺🇸',
                    onClick() {
                        console.log('选择English');
                    }
                }
            ]
        }
    },
    computed: {
        navMenus() {
            return [{
                name: 'index1',
                path: '/dashboard',
                // component: BasicLayout,
                // redirect: '/dashboard',
                meta: {
                    title: '首页1',
                    icon: 'dashboard'
                },
                children: [
                    {
                        name: 'index12',
                        path: '/dashboard1',
                        // redirect: '/dashboard',
                        meta: {
                            title: '首页12',
                            icon: 'dashboard'
                        }
                    },
                    {
                        name: 'index12',
                        path: '/dashboard12',
                        // redirect: '/dashboard',
                        meta: {
                            title: '首页122',
                            icon: 'dashboard'
                        }
                    }
                ]
            }]
        }
    },
    render() {
        return (<ZkBasicLayout navMenus={this.navMenus} currentUser={this.currentUser} langs={this.langs} copyright="FEE版权所有"></ZkBasicLayout>)
    }
}