import request from '../Utils/request'

/**
 * 搜索
 * @param {获取评论所传参数} param
 * @returns 
 */
export const getComment = params => {
    return request({
        method:'GET',
        url:'/v1_0/comments',
        params
    })
}

/**
 * 点赞文章
 * @param {文章ID} target 
 * @returns 
 */
export const addCommentLike = target => {
    return request({
        method:'POST',
        url:'/v1_0/comment/likings',
        data:{
            target
        }
    })
}

/**
 * 取消点赞文章
 * @param {文章ID} target 
 * @returns 
 */
export const deleteCommentLike = target => {
    return request({
        method:'DELETE',
        url:`/v1_0/comment/likings/${target}`,
    })
}

/**
 * 发布评论
 * @param {*} data 
 * @returns 
 */
export const addComment = data => {
    return request({
        method:'POST',
        url:'/v1_0/comments',
        data
    })
}