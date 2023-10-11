import React from 'react';
// import './login.scss';

import { observer } from 'mobx-react';
@observer
export default class VerifyEmailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
  }
  componentDidMount() {}

  LogIn = () => {
    this.props.callBack('redirectToLogin', this.state);
  };

  render() {
    const { verifiedEmail } = this.props;

    return (
      <div id="login">
        <div className="opa" />
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10 col-11 px-0">
            <div className="login pad-login">
              <div className="head py-3">
                <h4>
                  <b>{verifiedEmail}</b>
                </h4>
              </div>

              <button className="btn-login btn-login-res" onClick={this.LogIn}>
                Đăng Nhập Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
