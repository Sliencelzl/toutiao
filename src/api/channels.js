import request from "../Utils/request";

/**
 * 获取全部的频道
 * @returns 
 */
export const getAllchannels = () => {
    return request({
        method:'GET',
        url:'/v1_0/channels'
    })
}

/**
 * 用户添加频道
 * @returns 
 */
export const addUserchannels = () => {
    return request({
        method:'GET',
        url:'/v1_0/user/channels'
    })
}


export const deleteUserChannel = channelId => {
    return request({
      method: 'DELETE',
      url: `/v1_0/user/channels/${channelId}`
    })
}