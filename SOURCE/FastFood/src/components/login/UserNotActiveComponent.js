import React from 'react';

// import './login.scss';

export default class UserNotActiveComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="signup">
        <div id="login">
          <div className="opa" />
          <div className="row limit justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10 col-11 px-0">
              <div style={{ padding: 112, backgroundColor: '#fff' }} id="verify-mail">
                <h4 className="text-center">Bạn hãy truy cập vào email đã đăng ký để xác thực tài khoản!</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
