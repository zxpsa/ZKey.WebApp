/**
 * 查询列表
 * @param {Object} params 查询参数
 * @param {String} params.userName 用户名称
 * @param {String} params.tel 联系电话
 * @param {Object} parameter 
 */
export function queryDemoListByPage(params, parameter) {
    params = {
        accountName: params.userName,
        phone: params.tel,
    }
    return Promise.resolve({
        totalCount: 2,
        pageSize: 1,
        pageNo: 1,
        data: [{
            id: 1,
            userName: '用户姓名',
            tel: '联系电话',
            status: 1
        }, {
            id: 2,
            userName: '用户姓名1',
            tel: '联系电话1',
            status: -1
        }, {
            id: 3,
            userName: '用户姓名2',
            tel: '联系电话2',
            status: -1
        }]
    })
}