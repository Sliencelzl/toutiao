/**
 * 封装有关localstorg的方法
 */


/**
 * 存储数据
 * @param {键(名称)} key 
 * @param {值} value 
 */
export const setItem = (key,value) => {
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}

/**
 * 获取数据
 * @param {键(名称)} key 
 * @returns 
 */
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

/**
 * 删除数据
 * @param {键(名称)} key 
 */
export const removeItem = key => {
    window.localStorage.removeItem(key)
}