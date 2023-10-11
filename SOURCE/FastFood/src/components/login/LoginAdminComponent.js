import React from 'react'
import { Link, Router } from '../../routes/routes'
// import './login.scss'

import GoogleLogin from 'react-google-login'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import LoadCheckComponent from '../general/LoadCheckComponent'
@observer
export default class LoginComponent extends React.Component {
  @observable user = {
    email: '',
    password: ''
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  changeInput = event => {
    const { value, name } = event.target
    const newState = this.user
    newState[name] = value
    this.user = newState
    // this.setState(newState)
  }

  render() {
    const { message } = this.props

    return (
      <div id="login" style={{ height: '100vh' }}>
        <div className="opa" style={{ height: '100%' }} />
        <div className="row  justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10 col-12 px-0">
            <div className="login pad-login">
              <div className="head">
                <h4 className="mb-4">Đăng nhập</h4>
              </div>
              <div className="another px-sm-5 px-3">
                <input
                  style={
                    message === 'Sai email/mật khẩu. Vui lòng kiểm tra lại'
                      ? { color: '#fd7e14', border: '1px solid #fd7e14' }
                      : {}
                  }
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={this.changeInput}
                  onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                      this.props.callBack('LogIn', this.user)
                    }
                  }}
                />
                <input
                  style={
                    message === 'Sai email/mật khẩu. Vui lòng kiểm tra lại'
                      ? { color: '#fd7e14', border: '1px solid #fd7e14' }
                      : {}
                  }
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={this.changeInput}
                  onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                      this.props.callBack('LogIn', this.user)
                    }
                  }}
                />
                <p className="error font">{message}</p>

                <button
                  className="btn-login btn-login-res mb-0"
                  onClick={() => this.props.callBack('LogIn', this.user)}
                >
                  {this.props.load ? <LoadCheckComponent /> : ' ĐĂng Nhập'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
