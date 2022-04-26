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

export const addUser = target => {
    return request({
        method:'POST',
        url:'/v1_0/user/followings',
        data:{
            target
        }
    })
}

export const deleteUser = target => {
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${target}`,
    })
}