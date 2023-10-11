import React from 'react';
// import './login.scss';

import { inject, observer, Observer } from 'mobx-react';
@observer
export default class UpdatePasswordComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  resetPass = () => {
    this.props.callBack('resetPass');
  };
  render() {
    const { email } = this.props;
    return (
      <div id="login">
        <div className="head row  justify-content-center">
          <div className="col-xl-5 col-lg-6 col-sm-8 col-11 px-0">
            <div className="login pad-login">
              <h4 className="d-sm-block d-none pt-md-0 pt-3">Cập nhật mật khẩu</h4>
              <h5 className="d-block d-sm-none pt-3 px-3">Cập nhật mật khẩu</h5>
              <br />
              <p className="font">
                Hệ thống vừa được cập nhật phiên bản mới hơn, bạn vui lòng và địa chỉ <span className="color-default">{email} </span>để cập nhật lại mật khẩu
              </p>
              <p className="font">Vui lòng check mail và làm theo hướng dẫn trong mail</p>
              <div className="another font px-md-0 px-sm-5 px-3 pb-md-0 pb-3">
                <button onClick={this.resetPass} className="btn-login btn-login-res mb-xl-0 mb-lg-3">
                  CHƯA NHẬN ĐƯỢC MAIL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
