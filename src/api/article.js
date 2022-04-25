import request from "../Utils/request"

/**
 * 获取新闻页数据
 * @param {所传参数} params 
 * @returns 
 */
export const getArticles = params =>{
    return request({
        url:'/v1_0/articles',
        method:'GET',
        params
    })
}