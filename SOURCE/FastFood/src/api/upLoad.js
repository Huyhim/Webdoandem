import Promise from 'bluebird'

import Config from '../config/env'
import axios from 'axios'
export const upLoad = e => {
  let formData = new FormData()
  formData.append('file[]', e)

  return axios
    .post(Config.api.host.upload + Config.api.path.upload.upFile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
    .catch(function(res) {
      console.log(res)
    })

  var files = e.target.files
  if (files && files[0]) {
    var f = new FormData()
    f.append('image', files[0])
    var app = this
    axios
      .post(Config.api.host.base + '/uploads', f, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function(res) {
        console.log(res)
      })
      .catch(function(res) {
        console.log(res)
      })
  }
}
