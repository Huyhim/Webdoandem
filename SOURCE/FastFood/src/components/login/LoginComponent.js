import React from "react";
import { Link, Router } from "../../routes/routes";
// import "./login.scss";

import GoogleLogin from "react-google-login";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import LoadCheckComponent from "../general/LoadCheckComponent";
@observer
export default class LoginComponent extends React.Component {
  @observable user = {
    email: "",
    password: ""
  };
  constructor(props) {
    super(props);
    // this.state = {
    //   user: '',
    //   password: ''
    // }
  }
  componentDidMount() {}

  changeInput = event => {
    const { value, name } = event.target;
    const newState = this.user;
    newState[name] = value;
    this.user = newState;
    // this.setState(newState)
  };
  loginFBHRC = () => {
    this.props.callBack("loginFBHRC");
  };
  loginGHRC = response => {
    this.props.callBack("loginGHRC", response);
  };

  render() {
    const { message } = this.props;
    return (
      <div id="login">
        <div className="opa" />
        <div className="row  justify-content-center">
          <div className="col-xl-6 d-xl-block d-none" />
          <div className="col-xl-6 col-lg-8 col-md-10 col-12 px-0">
            <div className="login pad-login">
              <div className="head">
                <h4 className="mb-4">Đăng nhập</h4>
                {/* <small>Đăng nhập với</small> */}
                {/* <p>
                  <button
                    className="fb font mr-md-5 mr-1"
                    onClick={this.loginFBHRC}
                  >
                    <i className="fab fa-facebook-f fa-fw" />
                    FACEBOOK
                  </button>

                  <GoogleLogin
                    className="gg font"
                    clientId="238965250464-q8lfatq0jc7eou7odooh0enml3f368g9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.loginGHRC}
                    onFailure={e => {}}
                    render={renderProps => (
                      <button className="gg font" onClick={renderProps.onClick}>
                        <i className="fab fa-google-plus-g fa-fw" />
                        GOOGLE
                      </button>
                    )}
                  />
                </p> */}
              </div>
              {/* <small className="or">hoặc</small> */}
              <div className="another px-sm-5 px-3">
                <input
                  style={
                    message === "Sai email/mật khẩu. Vui lòng kiểm tra lại"
                      ? { color: "#fd7e14", border: "1px solid #fd7e14" }
                      : {}
                  }
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={this.changeInput}
                  onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                      this.props.callBack("LogIn", this.user);
                    }
                  }}
                />
                <input
                  style={
                    message === "Sai email/mật khẩu. Vui lòng kiểm tra lại"
                      ? { color: "#fd7e14", border: "1px solid #fd7e14" }
                      : {}
                  }
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={this.changeInput}
                  onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                      this.props.callBack("LogIn", this.user);
                    }
                  }}
                />
                <p className="error font">{message}</p>
                <button
                  className="btn-login btn-login-res"
                  onClick={() => this.props.callBack("LogIn", this.user)}
                >
                  {this.props.load ? <LoadCheckComponent /> : "Đăng Nhập"}
                </button>
              </div>
              <p>
                Bạn chưa có tài khoản?
                <br className="d-lg-none d-block" />
                <a href="/signup" className="sign-dn ml-1">
                  Đăng ký ngay nào !
                </a>
              </p>

              {/* <p className="forget">
                <Link route="/forget-password">
                  <a href="">Quên mật khẩu ?</a>
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
