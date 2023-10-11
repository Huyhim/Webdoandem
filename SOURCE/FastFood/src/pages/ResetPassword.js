import React from 'react';
import { Link, Router } from '../routes/routes';
import HeaderComponent from '../components/header/header-component';
import ResetPasswordComponent from '../components/login/ResetPasswordComponent';
import FooterComponent from '../components/footer/footer-component';

import { inject, observer } from 'mobx-react';

import { initFB, loginFB } from '../utils/FBUtils';
import { observable } from 'mobx';
import { login, loginHRC, submitPassWord, getInforByToken } from '../api/Auth';
import { setToken } from '../utils/auth';
import Config from '../config/env';
import { validateEmail } from '../utils/EmailUtils';
@inject('store')
@observer
export default class ResetPassword extends React.Component {
  @observable
  message = '';
  @observable
  userName = '';
  @observable
  email = '';
  static async getInitialProps(ctx) {
    const { mobxStore, res } = ctx;

    if (mobxStore.isAuthenticated) {
      if (res && mobxStore.isServer) {
        res.redirect('/');
      } else {
        Router.pushRoute('index');
      }
    }
    return {};
  }
  constructor(props) {
    super(props);

    ////console.log('store' + JSON.stringify(this.props.store));
  }
  componentDidMount() {
    initFB(Config.app.fb);
    const token = Router.router.query.token;
    getInforByToken(token)
      .then(data => {
        this.userName = data.data.user.name;
        this.email = data.data.user.email;
        ////console.log(data);
      })
      .catch(err => {
        ////console.log(err);
      });
  }
  callBack = (key, data) => {
    const token = Router.router.query.token;
    switch (key) {
      case 'submitPassword':
        ////console.log('submitPassword' + JSON.stringify(data));
        if (data.newPassword.length < 8) {
          alert('Mật khẩu >= 8 kí tự.');
          return;
        }
        if (data.newPassword != data.retypePassword) {
          alert('Mật khẩu không trùng nhau.');
          return;
        }

        submitPassWord(token, data.newPassword)
          .then(() => {
            alert('Đổi mật khẩu thành công.');
            Router.pushRoute('/log-in');
          })
          .catch(err => {
            alert('Đổi mật khẩu thất bại. Vui lòng thử lại.');
          });
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div>
        <HeaderComponent />
        <ResetPasswordComponent userName={this.userName} email={this.email} callBack={this.callBack} message={this.message} />
        <FooterComponent />
      </div>
    );
  }
}
