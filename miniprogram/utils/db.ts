export function setData(index: string, data: unknown ) {
    wx.setStorageSync(index, data)
}
export function getData(index: string) {
    return wx.getStorageSync(index)
}
export function addRecord (index: string, record: IConvRecord) {
    let r: IConvRecord[]  = getData(index) || []
    console.log('record.id', record.id)
    console.log('r', r)
    if (r.find(item => item.id === record.id)) {
        return 
    }
    r.push(record)
    setData(index, Array.from(r))
}