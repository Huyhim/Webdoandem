import React from 'react';
import Router from 'next/router';
import HeaderComponent from '../components/header/header-component';

import FooterComponent from '../components/footer/footer-component';
import { validateEmail } from '../utils/EmailUtils';
import { passwordResets } from '../api/Auth';
import Config from '../config/env';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ForgotPasswordComponent from '../components/login/ForgotPasswordComponent';
@observer
export default class ForgotPassword extends React.Component {
  @observable
  showGet = false;
  callBack = (key, data) => {
    switch (key) {
      case 'forgotpassword':
        if (data.length > 0) {
          if (!validateEmail(data)) {
            alert('Email không tồn tại');
            return;
          }

          passwordResets({ email: data, link: Config.api.host.link_forgotpassword })
            .then(res => {
              this.showGet = true;
            })
            .catch(e => {
              const res = e.response.data;
              if (res.code == 2) {
                alert('Tài khoản email chưa được tạo');
              } else {
                alert('Có lỗi xảy ra ' + JSON.stringify(e));
              }
            });
        } else {
          alert('Vui lòng nhập địa chỉ Email');
        }

        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div>
        <HeaderComponent />
        <ForgotPasswordComponent callBack={this.callBack} showGet={this.showGet} />
        <FooterComponent />
      </div>
    );
  }
}
