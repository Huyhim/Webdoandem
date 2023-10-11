import Promise from 'bluebird'
import Alamofire from '../lib/Alamofire'
import Config from '../config/env'

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.categories}`
    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        // console.log('res getCategories' + response)
        resolve(response)
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err)
      })
  })
}
