import React from 'react';
import { Link, Router } from '../../routes/routes';
// import './login.scss';

import { observer } from 'mobx-react';
@observer
export default class ResetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      retypePassword: ''
    };
  }
  componentDidMount() {
    // this.setState({
    //   userName: this.props.userName,
    //   email: this.props.email
    // });
    // alert('1');
  }

  handleSubmitPassword = () => {
    this.props.callBack('submitPassword', this.state);
  };
  changeInput = event => {
    const { value, name } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  };

  render() {
    const { message, userName, email } = this.props;

    return (
      <div id="login">
        <div className="opa" />
        <div className="row limit justify-content-center">
          <div className=" col-lg-8 col-md-10 col-12 px-0">
            <div className="login pad-login">
              <div className="head">
                <h4 className="pb-3">Nhập mật khẩu mới</h4>
              </div>

              <div className="another px-5 px-md-0">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <input value={userName} name="userName" type="text" placeholder="User" onChange={this.changeInput} disabled />
                  </div>
                  <div className="col-12 col-md-6">
                    <input value={email} name="email" type="text" placeholder="Email" onChange={this.changeInput} disabled />
                  </div>
                  <div className="col-12 col-md-6">
                    <input name="newPassword" type="password" placeholder="Mật khẩu" onChange={this.changeInput} />
                  </div>
                  <div className="col-12 col-md-6">
                    <input name="retypePassword" type="password" placeholder="Xác nhận mật khẩu" onChange={this.changeInput} />
                  </div>
                  <div>Mật khẩu phải có từ 8 - 12 ký tự.</div>
                </div>

                <button className="btn-login btn-login-res" onClick={this.handleSubmitPassword}>
                  Đổi mật khẩu
                </button>
              </div>

              <p className="forget">
                Bạn muốn đăng nhập vào tải khoản khác?
                  <a href="/log-in"> Đăng nhập ngay!</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
