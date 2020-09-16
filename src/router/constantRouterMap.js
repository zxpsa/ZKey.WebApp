import routerPageMap from "./routerPageMap"
import { generateRouteByRouterPageMap } from "./util"

const arr = [
    {
        path: '/404',
        meta: { title: '错误' }
    }
]

export default generateRouteByRouterPageMap(arr,routerPageMap);