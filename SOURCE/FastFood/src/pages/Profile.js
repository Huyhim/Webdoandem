import React from 'react'

import { observable } from 'mobx'

import { inject, observer } from 'mobx-react'
import { getPathName, intentPageString, intentPage } from '../utils/RouterUtils'
import { Link, Router } from '../routes/routes'
import Config from '../config/env'
import MenuProfileComponent from '../components/profile/MenuProfileComponent'
import ProfileComponent from '../components/profile/ProfileComponent'
import LoadComponent from '../components/general/LoadComponent'
// import { getCategoriesAPI } from '../store/store'
import {
  getAllCustomers,
  createCustomer,
  updateCustomer
} from '../api/Customer'
import { createOrder } from '../api/Order'
import * as moment from 'moment'
import { unitTimeNow, unixToTime } from '../utils/convertTime'
import HeaderComponent from '../components/header/HeaderComponent'
import FooterComponent from '../components/general/FooterComponent'
@inject('store')
@observer
export default class Profile extends React.Component {
  @observable isRender = false
  @observable data = []
  @observable dataFavourite = []
  @observable statusAddCart = false
  @observable titleAddCart = 0
  @observable user = {
    name: '',
    phone: '',
    address: '',
    email: '',
    role: 'customer',
    message: ''
  }

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.store.checkUser('customer', () => {
      this.isRender = true
    })
  }

  callBack = (key, data) => {
    switch (key) {
      case 'CHANGE_PASSWORD':
        this.props.store.user.password = data.passwordNew
        updateCustomer(this.props.store.user)
          .then(res => {
            if (res) {
              console.log(res)
              this.titleAddCart = 0
              this.statusAddCart = true
              setTimeout(() => {
                this.statusAddCart = false
              }, 1000)
            }
          })
          .catch(err => {
            console.log(err)
            this.titleAddCart = 1
            this.statusAddCart = true
            setTimeout(() => {
              this.statusAddCart = false
            }, 2000)
          })
        break
      case 'SAVE_PROFILE':
        updateCustomer(data)
          .then(res => {
            if (res) {
              this.props.store.user = res
              console.log(res)
              this.titleAddCart = 0
              this.statusAddCart = true
              setTimeout(() => {
                this.statusAddCart = false
              }, 1000)
            }
          })
          .catch(err => {
            console.log(err)
            this.titleAddCart = 1
            this.statusAddCart = true
            setTimeout(() => {
              this.statusAddCart = false
            }, 2000)
          })
        break
      default:
        break
    }
  }
  render() {
    return this.isRender ? (
      <div style={{ backgroundColor: '#f5f5f5' }}>
        {/* <div style={{ height: '80px', background: 'lightgreen' }}>
          {' '} */}
        <HeaderComponent />
        {/* </div> */}

        <div className="row" style={{ background: '#fafafa' }}>
          <div className="col-2">
            <MenuProfileComponent />
          </div>
          <div className="col-10">
            <ProfileComponent callBack={this.callBack} />
          </div>
          {this.statusAddCart ? (
            <div
              className={
                this.titleAddCart == 0
                  ? 'alert alert-success'
                  : 'alert alert-false'
              }
              role="alert"
              style={{
                width: '25%',
                position: 'fixed',
                top: ' 40%',
                right: '35%',
                height: '100px',
                textAlign: 'center',

                paddingTop: '40px'
              }}
            >
              {this.titleAddCart == 0
                ? 'Cập nhật thành công !'
                : 'Không thành công, vui lòng thử lại !'}
            </div>
          ) : null}
          <FooterComponent />
        </div>
      </div>
    ) : (
      <div>
        <LoadComponent />
      </div>
    )
  }
}
