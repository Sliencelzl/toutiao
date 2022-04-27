import request from '../Utils/request'
/**
 * 登录接口
 * @param {参数} data 
 * @returns 
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

/**
 * 获取验证码
 * @param {手机号} mobile 
 * @returns 
 */
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
    })
}

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return request({
        method:'GET',
        url:'/v1_0/user'
    })
}

/**
 * 获取频道列表
 * @returns 
 */
export const getChannels = () => {
    return request({
        method:'GET',
        url:'/v1_0/channels'
    })
}
/**
 * 添加收藏
 * @param {*} target 
 * @returns 
 */
export const addUser = target => {
    return request({
        method:'POST',
        url:'/v1_0/user/followings',
        data:{
            target
        }
    })
}

/**
 * 取消收藏
 * @param {*} target 
 * @returns 
 */
export const deleteUser = target => {
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${target}`,
    })
}

/**
 * 获取用户个人资料
 * @returns 
 */
export const getUserInfoprofile = () => {
    return request({
        method:'GET',
        url:'/v1_0/user/profile'
    })
}

/**
 * 修改用户资料
 * @returns 
 */
export const updateUserprofile = () => {
    return request({
        method:'PATCH',
        url:'/v1_0/user/profile'
    })
}

export const updateUserPhoto = data => {
    return request({
        method:'PATCH',
        url:'/v1_0/user/photo',
        data
    })
}