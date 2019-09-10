import request from '@/utils/request'

export function search(data) {
    return request({
        url: '/mal-anime/search',
        method: 'post',
        data
    })
}