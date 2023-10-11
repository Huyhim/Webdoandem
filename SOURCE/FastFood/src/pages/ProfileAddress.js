import React from 'react'

import { observable } from 'mobx'

import { inject, observer } from 'mobx-react'
import { getPathName, intentPageString, intentPage } from '../utils/RouterUtils'
import { Link, Router } from '../routes/routes'
import Config from '../config/env'
import MenuProfileComponent from '../components/profile/MenuProfileComponent'
import ProfileAddressComponent from '../components/profile/ProfileAddressComponent'
import LoadComponent from '../components/general/LoadComponent'
// import { getCategoriesAPI } from '../store/store'
import { getAllCustomers, createCustomer } from '../api/Customer'
import { createOrder } from '../api/Order'
import * as moment from 'moment'
import { unitTimeNow, unixToTime } from '../utils/convertTime'
import HeaderComponent from '../components/header/HeaderComponent'
@inject('store')
@observer
export default class ProfileAddress extends React.Component {
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
    this.isRender = true
  }

  callBack = (key, data) => {
    switch (key) {
      case 'BUY_PRODUCTS':
        if (
          data.user.name == '' ||
          data.user.phone == '' ||
          data.user.address == ''
        ) {
          return alert('Bạn phải nhập đầy đủ thông tin thanh toán !')
        }

        // let obj = data.product;
        // obj.map(e => {
        //   if (e.typeSize) {
        //     let name = e.typeSize.find(item => item.status == true).name;
        //     e.typeSize = name;
        //   }
        // });
        // console.log(JSON.stringify(obj));
        let dataOrder = {
          statusOrder: {
            name: '',
            status: 0,
            time: unitTimeNow()
          },
          statusShip: {
            name: '',
            status: 3,
            time: unitTimeNow()
          },
          message: data.user.message,
          products: data.product
        }
        createCustomer({ ...data.user, type: data.product.length }).then(
          res => {
            this.setCookie('user', JSON.stringify(res))
            // console.log(res.id + '--setCookie---' + JSON.stringify(data.user))
            createOrder({ ...dataOrder, idUser: res.id }).then(res => {
              if (res) {
                this.statusAddCart = true
                this.props.store.myCart = []
                localStorage['myCartFF'] = JSON.stringify(
                  this.props.store.myCart
                )
                setTimeout(() => {
                  this.statusAddCart = false
                  setTimeout(() => {
                    intentPageString('/')
                  }, 100)
                }, 1000)
              }
            })
          }
        )
        // getAllCustomers().then(res => {
        //   let findUser = res.rows.find(res => res.phone == data.user.phone)
        //   if (findUser != undefined) {
        //     createOrder({ ...dataOrder, idUser: findUser.id }).then(res => {
        //       console.log(JSON.stringify(res))
        //       if (res) {
        //         this.statusAddCart = true
        //         this.props.store.myCart = []
        //         localStorage['myCartFF'] = JSON.stringify(
        //           this.props.store.myCart
        //         )
        //         setTimeout(() => {
        //           this.statusAddCart = false
        //           setTimeout(() => {
        //             intentPageString('/')
        //           }, 2000)
        //         }, 1000)
        //       }
        //     })
        //   } else {

        //   }
        // })

        break
      case 'SEARCH':
        intentPage('/products', { search: data })
        break
      default:
        break
    }
  }
  render() {
    return this.isRender ? (
      <div style={{ backgroundColor: '#f5f5f5' }}>
        {/* <div style={{ height: '80px', background: 'lightgreen' }}> */}
          {' '}
          <HeaderComponent />
        {/* </div> */}
        <div className="row">
          <div className="col-2">
            <MenuProfileComponent />
          </div>
          <div className="col-10">
            <ProfileAddressComponent />
          </div>
          <div />
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
                ? 'Mua hàng thành công !'
                : 'Không thành công, vui lòng thử lại !'}
            </div>
          ) : null}
        </div>
      </div>
    ) : (
      <div>
        <LoadComponent />
      </div>
    )
  }
}
