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

/**
 * 获取文章详情
 * @param {文章Id} articleId 
 * @returns 
 */
export const getArticlesDetails = articleId => {
    return request({
        method:'GET',
        url:`/v1_0/articles/${articleId}`
    })
}

/**
 * 添加收藏
 * @param {收藏文章ID} target 
 * @returns 
 */
export const addCollected = target => {
    return request({
        method:'POST',
        url:'/v1_0/article/collections',
        data:{
            target
        }
    })
}

/**
 * 取消文章收藏
 * @param {收藏文章ID} target 
 * @returns 
 */
export const deleteCollected = target => {
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${target}`,
    })
}

export const addlikings = target => {
    return request({
        method:'POST',
        url:'/v1_0/article/likings',
        data:{
            target
        }
    })
}


export const deletelikings = target => {
    return request({
        method:'DELETE',
        url:`/v1_0/article/likings/${target}`,
    })
}