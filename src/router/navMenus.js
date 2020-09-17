/**
 * 导航菜单配置
 * 注: 在开发阶段使用,正式环境应根据权限和角色从服务端读取
 */
export default [
    // {
    //     path: '/workplace',
    //     meta: { icon: 'poweroff' }
    // },
    {
        path: '/dashboard',
        meta: { icon: 'dashboard',title:'工作台' },
        children: [
            {
                path: '/dashboard/index'
            }
        ]
    }
]