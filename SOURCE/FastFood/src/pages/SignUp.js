import React from "react";

// import { initFB, loginFB } from '../utils/FBUtils';
import { Link, Router } from "../routes/routes";
import { validateEmail } from "../utils/EmailUtils";
// import { createUser, login } from '../api/Auth';
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import Config from "../config/env";
import { setData } from "../utils/LocalStorageUtils";
import HeaderComponent from "../components/header/HeaderComponent";
import FooterComponent from "../components/general/FooterComponent";
import SignUpComponent from "../components/login/SignUpComponent";
import { getPathName } from "../utils/RouterUtils";
import { getAllCustomers, createCustomer } from "../api/Customer";
@inject("store")
@observer
export default class SignUp extends React.Component {
  @observable
  path = "";
  @observable
  isEmailRegistered = false;
  @observable
  isRegistered = false;
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    // initFB(Config.app.fb);
    // const pathSignUp = Router.router.asPath;
    ////console.log('Router.router', Router.router);
    // if (pathSignUp === '/sign-up/doanh-nghiep') {
    //   this.path = 'doanh-nghiep';
    // } else {
    //   this.path = 'sinh-vien';
    // }
    ////console.log(this.path);
  }

  callBack = (key, data) => {
    this.isRegistered = true;

    switch (key) {
      case "signup":
        if (
          data.password.length > 0 &&
          data.password2.length > 0 &&
          data.name.length > 0 &&
          data.phone.length > 0
        ) {
          if (!validateEmail(data.email)) {
            alert("Email không đúng :)");
            return;
          }

          if (data.password != data.password2) {
            alert("Mật khẩu không trùng nhau");
            return;
          }
          if (data.password.length < 8) {
            alert("Mật khẩu >= 8 kí tự");
            return;
          }
          createCustomer({ ...data, type: 0, address: "", role: "customer" })
            .then(res => {
              console.log(res);
              localStorage["userFF"] = res.id;
              this.props.store.user = res;

              Router.pushRoute("index");
              // this.isEmailRegistered = false;
              // document.getElementById('login-view').style.display = 'none';
              // document.getElementById('verify-mail').style.display = 'block';

              this.isRegistered = false;
            })
            .catch(e => {
              this.isRegistered = false;
              const res = e.response.data;
              // alert(res.message);
              if (res.message === "email already registered") {
                this.isEmailRegistered = true;
              } else {
                alert(res.message);
              }
              ////console.log('signup ' + JSON.stringify(e));
            });
        } else {
          this.isRegistered = false;
          alert("Vui lòng điền đầy đủ thông tin trước khi tạo tài khoản");
        }
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div className="signup font">
        <HeaderComponent />
        <SignUpComponent
          isEmailRegistered={this.isEmailRegistered}
          callBack={this.callBack}
          isRegistered={this.isRegistered}
        />
        <FooterComponent />
      </div>
    );
  }
}
