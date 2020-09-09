/**
 * 导航菜单配置
 * 注: 在开发阶段使用,正式环境应根据权限和角色从服务端读取
 */
export default [
    {
        path: '/listDemo',
        meta: { icon: 'poweroff' }
    },
    {
        path: '/lighting',
        meta: { icon: 'sliders' },
        children: [
            {
                path: '/lighting/timingControl'
            },
            {
                path: '/lighting/sceneControl'
            }
        ]
    }
]