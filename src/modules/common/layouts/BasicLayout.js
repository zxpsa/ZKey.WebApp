import { ZkBasicLayout } from '@zkey-webapp/pc';
import '@zkey-webapp/pc/dist/index.esm.css';
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
            const dynamicRouter = this.$store.state.dynamicRouter;
            // '/'节点下的路由作为导航菜单配置
            let navMenus = dynamicRouter.filter(item => item.path == "/");
            if (navMenus.length > 0) navMenus = navMenus[0].children;
            return navMenus
        }
    },
    render() {
        return (<ZkBasicLayout navMenus={this.navMenus} currentUser={this.currentUser} langs={this.langs} copyright="FEE版权所有"></ZkBasicLayout>)
    }
}