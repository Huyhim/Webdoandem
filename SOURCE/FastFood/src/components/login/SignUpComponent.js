import React from "react";
import { Link, Router } from "../../routes/routes";
// import "./login.scss";
import GoogleLogin from "react-google-login";
import LoadCheckComponent from "../general/LoadCheckComponent";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
@observer
export default class SignUpComponent extends React.Component {
  @observable mes = "";
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      phone: ""
    };
  }

  loginFBHRC = () => {
    this.props.callBack("loginFBHRC");
  };
  loginGHRC = response => {
    this.props.callBack("loginGHRC", response);
  };

  signup = () => {
    this.props.callBack("signup", this.state);
  };
  checkEmailRegistered = () => {
    if (this.props.isEmailRegistered) {
      return (
        <p>
          *Địa chỉ email này đã từng được tạo.
          <Link route="/log-in">
            <span
              style={{ color: "#20a286", display: "inline", cursor: "pointer" }}
            >
              Đăng nhập?{" "}
            </span>
          </Link>
          <Link route="/forget-password">
            <span
              style={{ color: "#20a286", display: "inline", cursor: "pointer" }}
            >
              Quên mật khẩu?{" "}
            </span>
          </Link>
          <Link route="/log-in">
            <span
              style={{ color: "#20a286", display: "inline", cursor: "pointer" }}
            >
              Bạn chưa từng tạo?
            </span>
          </Link>
        </p>
      );
    }
  };

  render() {
    return (
      <div id="login">
        <div className="opa" />
        <div className="row  justify-content-center">
          <div className="col-lg-8 col-md-10 col-12 px-0">
            <div
              style={{ display: "none", padding: 112, backgroundColor: "#fff" }}
              id="verify-mail"
            >
              <h4 className="text-center">
                Bạn hãy truy cập vào email đã đăng ký để xác thực tài khoản!
              </h4>
            </div>
            <div id="login-view" className="login pad-login">
              <div className="head">
                <h4 className="d-sm-block d-none mb-4 mt-3">
                  Đăng ký tài khoản
                </h4>
                <h5 className="d-block d-sm-none mb-3">Đăng ký tài khoản</h5>
                {/* <small>Đăng ký qua</small> */}
                {/* <p>
                  <button
                    onClick={this.loginFBHRC}
                    className="fb font mr-md-5 mr-1"
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
              <div className="another row justify-content-center">
                <div className="col-sm-6 col-12 pl-md-0 font">
                  <input
                    name="user"
                    type="text"
                    placeholder="Họ tên"
                    onChange={event => {
                      this.setState({ name: event.target.value });
                    }}
                    onKeyPress={({ charCode }) => {
                      if (charCode === 13) {
                        this.signup();
                      }
                    }}
                  />
                </div>
                <div className="col-sm-6 col-12 pl-md-0 font">
                  <input
                    style={
                      this.props.isEmailRegistered === true
                        ? { color: "#fd7e14", border: "1px solid #fd7e14" }
                        : {}
                    }
                    name="phone"
                    type="text"
                    placeholder="Số điện thoại"
                    onChange={event => {
                      this.setState({ phone: event.target.value });
                    }}
                    onKeyPress={({ charCode }) => {
                      if (charCode === 13) {
                        this.signup();
                      }
                    }}
                  />
                </div>
                <div className="col-sm-6 col-12 pl-md-0 font">
                  <input
                    style={
                      this.props.isEmailRegistered === true
                        ? { color: "#fd7e14", border: "1px solid #fd7e14" }
                        : {}
                    }
                    name="user"
                    type="text"
                    placeholder="Email"
                    onChange={event => {
                      this.setState({ email: event.target.value });
                    }}
                    onKeyPress={({ charCode }) => {
                      if (charCode === 13) {
                        this.signup();
                      }
                    }}
                  />
                </div>
                <div className="col-12">{this.checkEmailRegistered()}</div>
                <div className="col-sm-6 col-12 pl-md-0 font">
                  <input
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={event => {
                      this.setState({ password: event.target.value });
                    }}
                    onKeyPress={({ charCode }) => {
                      if (charCode === 13) {
                        this.signup();
                      }
                    }}
                  />
                </div>
                <div className="col-sm-6 col-12 pl-md-0 font">
                  <input
                    name="password"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    onChange={event => {
                      this.setState({ password2: event.target.value });
                    }}
                    onKeyPress={({ charCode }) => {
                      if (charCode === 13) {
                        this.signup();
                      }
                    }}
                  />
                </div>
                <div className="col-12 pb-md-0 pb-4">
                  <p className="txt-note font">
                    Mật khẩu phải có từ 8 -12 ký tự .
                  </p>
                  {this.mes != "" && this.props.isRegistered ? (
                    <p>{this.mes}</p>
                  ) : null}
                  <button
                    onClick={() => {
                      if (this.props.isRegistered) {
                        this.mes = "Vui lòng chờ giây lát !";
                      } else {
                        this.signup();
                      }
                    }}
                    className="btn-login btn-login-res"
                  >
                    {this.props.isRegistered ? (
                      <LoadCheckComponent />
                    ) : (
                      "Đăng Ký"
                    )}
                  </button>
                  Bạn đã có tài khoản?
                  <span className="forget">
                    <a href="/login"> Đăng nhập ngay!</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
