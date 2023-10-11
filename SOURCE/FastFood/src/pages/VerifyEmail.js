import React from 'react';
import { Link, Router } from '../routes/routes';
import HeaderComponent from '../components/header/header-component';

import FooterComponent from '../components/footer/footer-component';

import { inject, observer } from 'mobx-react';

import { initFB, loginFB } from '../utils/FBUtils';
import { observable } from 'mobx';
import { login, loginHRC, verifyEmail } from '../api/Auth';
import { setToken } from '../utils/auth';
import Config from '../config/env';
import { validateEmail } from '../utils/EmailUtils';
import VerifyEmailComponent from '../components/login/VerifyEmailComponent';
@inject('store')
@observer
export default class VerifyEmail extends React.Component {
  @observable
  data = {};
  @observable
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

    this.state = {
      verifiedEmail: 'Đang xác thực ...'
    };
  }

  componentDidMount() {
    initFB(Config.app.fb);

    const emailToken = Router.router.query.token;
    verifyEmail(emailToken)
      .then(data => {
        if (data.code === 1) {
          this.setState({
            verifiedEmail: 'Xác thực email thành công.'
          });
          this.data = data;
          ////console.log('verifyEmail' + JSON.stringify(data));
        } else {
          this.setState({
            verifiedEmail: 'Xác thực không email thành công. Vui lòng thử lại'
          });
        }
      })
      .catch(err => {
        this.setState({
          verifiedEmail: 'Xác thực không email thành công.'
        });
      });
  }
  callBack = (key, data) => {
    switch (key) {
      case 'redirectToLogin': {
        this.props.store.setLogin(this.data, this.data.data.user.role);

        break;
      }
    }
  };
  render() {
    return (
      <div>
        <HeaderComponent />
        <VerifyEmailComponent verifiedEmail={this.state.verifiedEmail} callBack={this.callBack} />
        <FooterComponent />
      </div>
    );
  }
}
