import Promise from 'bluebird'
import Alamofire from '../lib/Alamofire'
import Config from '../config/env'
/**
 *Retrieve careers
 *
 * @param
 * @returns
 */
export const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.orders}`

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

export const getOrder = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.orders}${'/' +
      id}`
    return Alamofire.request(url, 'GET', {}, {})
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err)
      })
  })
}

export const queryOrder = ({ page, limit, query }) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.orders}` +
      `${page ? '?page=' + page : ''}` +
      `${limit ? '&limit=' + limit : ''}` +
      `${query ? query : ''}`

    return Alamofire.request(
      url,
      'GET',
      {},

      {}
    )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export const getOrderByIdUser = (idUser) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.orders}` +
     
      `${'?idUser=' + idUser}`

    return Alamofire.request(
      url,
      'GET',
      {},

      {}
    )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
} 

export const createOrder = ({
  name,
  description,
  statusOrder,
  statusShip,
  message,
  products,
  idUser,
  user
}) => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.orders}`

    return Alamofire.request(
      url,
      'POST',
      {
        name,
        description,
        statusOrder,
        statusShip,
        message,
        products,
        idUser,
        user
      },

      {}
    )
      .then(response => {
        console.log('res1111' + JSON.stringify(response))
        resolve(response)
      })
      .catch(err => {
        console.log('errr' + JSON.stringify(err))
        reject(err)
      })
  })
}

export const updateOrder = ({
  id,
  name,
  description,
  statusOrder,
  statusShip,
  message,
  products,
  idUser,
  user
}) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.orders}` + '/' + id

    return Alamofire.request(
      url,
      'PUT',
      {
        name,
        description,
        statusOrder,
        statusShip,
        message,
        products,
        idUser,
        user
      },

      {}
    )
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const deleteOrder = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.orders}${'/' +
      id}`
    return Alamofire.request(url, 'DELETE', {}, {})
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err)
      })
  })
}
