import React from 'react'
// import './style.scss'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.initApp()
    }
  }

  render() {
    return (
      <div className="footer w-100 pt-4 ">
        <div className="limit">
          <div className="row">
            <div className="col-6">
              <img
                src="../../static/images/logo.png"
                style={{ maxHeight: 50, width: 'auto' }}
                className="mb-3"
              />
              <p>Món ngon giá rẻ</p>
              <p>An toàn thực phẩm</p>
              <p>Ship hàng tận nơi</p>
            </div>
            <div className="col-3">
              <b class="navbar-brand">Danh mục</b>
              <ul class="nav flex-column">
                {this.props.store.dataCategory.map(e => {
                  return (
                    <li class="nav-item">
                      <a class="nav-link px-0 " href={'/products/' + e.key}>
                        {e.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="col-3">
              <b class="navbar-brand">Theo dõi chúng tôi trên</b>
              <ul class="nav flex-column">
                <li className="my-2">
                  <a className="facebook" href="#">
                    <i class="fab fa-facebook-square fa-lg mr-2" /> Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-1" />
          <div className="row align-items-center mb-2">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2019 All Rights Reserved by
                <a href="#" className="ml-1">
                  Tạ Hạnh
                </a>
                .
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>{' '}
                {/* <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li> */}
                <li>
                  <a className="dribbble" href="">
                    <i className="fas fa-envelope" />
                  </a>
                </li>
                {/* <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
