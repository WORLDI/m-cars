export const ipUrl = 'http://127.0.0.1:7001/';

const serverPath = {
    checkLogin : ipUrl + 'checkLogin',     // 验证登录
    getRecordList : ipUrl + 'getRecordList',   // 获取车辆出入记录列表
    getCarList : ipUrl + 'getCarList',   // 获取车辆列表
    getBadList : ipUrl + 'getBadList',    // 获取黑名单列表
    deleteRecord : ipUrl + 'deleteRecord/',    // 删除单条记录
    deleteSomeRecords : ipUrl + 'deleteSomeRecords',   // 批量删除记录
    deleteCar : ipUrl + 'deleteCar/',    // 删除单条车辆信息
    deleteSomeCars : ipUrl + 'deleteSomeCars',     // 批量删除车辆信息
    addToBad : ipUrl + 'addToBad/',        // 加入黑名单
    removeFromBad : ipUrl + 'removeFromBad/',   // 移出黑名单
    removeBads : ipUrl + 'removeBads',      // 批量移出黑名单
    getRecordByCar : ipUrl + 'getRecordByCar/',    // 根据车牌号查询车辆记录
}

export default serverPath;