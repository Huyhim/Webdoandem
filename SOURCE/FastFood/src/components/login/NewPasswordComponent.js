import React from 'react';
// import './login.scss';

export default class NewPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.email = '';
  }

  forgotpassword = () => {
    this.props.callBack('forgotpassword', this.email);
  };
  render() {
    const { showGet } = this.props;
    return (
      <div>
        {!showGet ? (
          <div id="login">
            <div className="opa" />
            <div className="head row  justify-content-center">
              <div className="col-xl-5 col-lg-6 col-sm-8 col-12 px-0">
                <div className="login pad-login">
                  <h4 className="d-sm-block d-none pt-md-0 pt-3">Nhập mật khẩu mới</h4>
                  <h5 className="d-block d-sm-none pt-3 px-3">Nhập mật khẩu mới</h5>
                  <div className="another font px-md-0 px-sm-5 px-3 pb-md-0 pb-3">
                    <input
                      type="password"
                      name="email"
                      name="user"
                      onChange={event => {
                        this.email = event.target.value;
                      }}
                      onKeyPress={({ charCode }) => {
                        if (charCode === 13) {
                          this.forgotpassword();
                        }
                      }}
                    />
                    <button className="btn-login btn-login-res mb-xl-0 mb-lg-3" onClick={this.forgotpassword}>
                      Đặt lại mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="login">
            <div className="head row  justify-content-center">
              <div className="col-xl-5 col-lg-6 col-sm-8 col-12 px-0">
                <div className="login pad-login">
                  <h4 className="d-sm-block d-none pt-md-0 pt-3">Lấy lại mật khẩu</h4>
                  <h5 className="d-block d-sm-none pt-3 px-3">Lấy lại mật khẩu</h5>
                  <p className="font">
                    Chúng tôi đã gửi một email khôi phục mật khẩu vào địa chỉ
                    <span style={{ color: '#20a286' }}> {this.email}</span>
                  </p>
                  <p className="font">Vui lòng check mail và làm theo hướng dẫn trong mail</p>
                  <div className="another font px-md-0 px-sm-5 px-3 pb-md-0 pb-3">
                    <button onClick={this.forgotpassword} className="btn-login btn-login-res mb-xl-0 mb-lg-3">
                      CHƯA NHẬN ĐƯỢC MAIL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
