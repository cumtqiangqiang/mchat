export function setData(index: string, data: unknown ) {
    wx.setStorageSync(index, data)
}
export function getData(index: string) {
    return wx.getStorageSync(index)
}
export function addRecord (index: string, record: any) {
    let r = new Set(getData(index) || [])
    r.add(record)
    setData(index, Array.from(r))
}