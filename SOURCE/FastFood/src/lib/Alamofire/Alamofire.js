import axios from 'axios'
import Config from '../../config/env'
import Promise from 'bluebird'
import { Link, Router } from '../../routes/routes'
import { inject } from 'mobx-react'
/**
 *
 *
 * @param {any} url
 * @param {string} [method='GET']
 * @param {any} body
 * @param {any} [headers={}]
 * @returns
 */

export const request = (url, method = 'GET', body, headers = {}) => {
  if (true) {
    console.log('URL: ' + url)
    console.log('METHOD: ' + method)
    console.log('BODY: ' + JSON.stringify(body))
    console.log('Headers: ' + JSON.stringify(headers))
  }

  return new Promise((resolve, reject) =>
    axios({
      method,
      url,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      }
      // withCredentials: true
    })
      .then(res => {
        return resolve(res.data)
      })
      .catch(error => {
        if (error.response) {
          if (
            error.response.status === 401 &&
            error.response.data.error_code !== 6
          ) {
            // lỗi token

            global.errToken = true
            Router.pushRoute('/log-in')

            return reject('token het han')
          }
        }

        reject(error)
      })
  )
}
export const requestNoCheck = (url, method = 'GET', body, headers = {}) => {
  if (!Config.releaseVersion) {
    ////console.log('URL: ' + url);
    ////console.log('METHOD: ' + method);
    ////console.log('BODY: ' + JSON.stringify(body));
    ////console.log('Headers: ' + JSON.stringify(headers));
  }

  return new Promise((resolve, reject) =>
    axios({
      method,
      url,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      }
      // withCredentials: true
    })
      .then(res => {
        return resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  )
}
