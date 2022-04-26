import request from '../Utils/request'

/**
 * 搜索
 * @param {搜索所传参数} q 
 * @returns 
 */
export const getSearchSuggestions = q => {
    return request({
        method:'GET',
        url:'/v1_0/suggestion',
        params:{
            q
        }
    })
}

/**
 * 搜索内容
 * @param {所传参数} params 
 * @returns 
 */
export const getResult = params => {
    return request({
        method:'GET',
        url:'/v1_0/search',
        params
    })
}