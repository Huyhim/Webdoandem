import React from 'react'
import { Link, Router } from '../routes/routes'

import { inject, observer } from 'mobx-react'

// import { initFB, loginFB } from '../utils/FBUtils';
import { observable } from 'mobx'
// import { login, loginHRC, resetPass } from '../api/Auth';
// import { setToken } from '../utils/auth';
import Config from '../config/env'
import { validateEmail } from '../utils/EmailUtils'
import { setData } from '../utils/LocalStorageUtils'
import HeaderComponent from '../components/header/HeaderComponent'
import FooterComponent from '../components/general/FooterComponent'
import LoginAdminComponent from '../components/login/LoginAdminComponent'
import LoadComponent from '../components/general/LoadComponent'
// import { convertImgUrl } from '../utils/ImgUtils';
import { intentPage, getPathName } from '../utils/RouterUtils'
import { getAllCustomers, getCustomerByEmail } from '../api/Customer'
@inject('store')
@observer
export default class Login extends React.Component {
  @observable
  message = ''
  @observable load = false
  // static async getInitialProps(ctx) {
  //   const { mobxStore, res } = ctx;

  //   return {};
  // }
  constructor(props) {
    super(props)

    this.store = this.props.store
  }
  componentDidMount() {
    // initFB(Config.app.fb);
  }
  callBack = (key, data) => {
    switch (key) {
      case 'LogIn':
        if (data.email.length > 0 && data.password.length > 0) {
          if (!validateEmail(data.email)) {
            this.message = 'Email không đúng :)'
            return
          }
          this.load = true
          getCustomerByEmail(data.email)
            .then(res => {
              if (res) {
                console.log(res.role)
                if (res.role && res.role !== 'customer') {
                  if (res.password == data.password) {
                    setData('adminFF', JSON.stringify(res))
                    this.props.store.admin = res
                    intentPage('/admin')
                  } else {
                    this.message = 'Sai mật khẩu. Vui lòng kiểm tra lại'
                  }
                } else {
                  this.message =
                    'Tài khoản của bạn không có trong hệ thống. Vui lòng liên hệ quản trị để truy cập !'
                }
              } else {
                this.message = 'Đăng nhập thất bại, vui lòng thử lại'
              }
              this.load = false
            })
            .catch(err => {
              console.log(err)
              this.message = 'Sai email/mật khẩu. Vui lòng kiểm tra lại'

              this.load = false
            })
        } else {
          this.load = false
          this.message = 'Tài khoản hoặc mật khẩu không được rỗng'
        }
        break

      default:
        break
    }
  }
  render() {
    return (
      <div className="signup font">
        <LoginAdminComponent
          callBack={this.callBack}
          message={this.message}
          load={this.load}
        />
      </div>
    )
  }
}
