import { ZkBasicLayout } from 'ZKey.WebApp.PC/dist/index.esm';
import 'zkey.webapp.pc/dist/index.esm.css';
export default {
    components:{
        ZkBasicLayout
    },
    computed: {
        navMenus(){
            return [{
                    name: 'index1',
                    path: '/dashboard',
                    // component: BasicLayout,
                    // redirect: '/dashboard',
                    meta: {
                        title: '首页1',
                        icon:'dashboard'
                    },
                    children:[
                        {
                            name: 'index12',
                            path: '/dashboard1',
                            // redirect: '/dashboard',
                            meta: {
                                title: '首页12',
                                icon:'dashboard'
                            }
                        },
                        {
                            name: 'index12',
                            path: '/dashboard12',
                            // redirect: '/dashboard',
                            meta: {
                                title: '首页122',
                                icon:'dashboard'
                            }
                        }
                    ]
                }]
        }
    },
    render() {
       return(<ZkBasicLayout navMenus={ this.navMenus }></ZkBasicLayout>)
    }
}