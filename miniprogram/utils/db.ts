export function setData(index: string, data: unknown ) {
    wx.setStorageSync(index, data)
}
export function getData(index: string) {
    return wx.getStorageSync(index)
}
export function addRecord (index: string, record: any) {
    let r = getData(index) || new Set()
        // fixme 重复添加是否需要识别并给出提示？
    r.push(record)
    setData(index, r)
}