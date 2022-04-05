export function setData(index: string, data: unknown ) {
    wx.setStorageSync(index, data)
    //wx.setStorageSync('test', new Set().add('sss'))
}
export function getData(index: string) {
    return wx.getStorageSync(index)
}
export function addRecord (index: string, record: any) {
    let r = getData(index) || new Set()
    console.log(r)
        // fixme 重复添加是否需要识别并给出提示？
    r.add(record)
    setData(index, Array.from(r))
}