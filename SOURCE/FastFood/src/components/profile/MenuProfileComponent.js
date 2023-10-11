import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import ItemProductComponent from '../products/ItemProductComponent'
// import './profile.scss'
import $ from 'jquery'
@inject('store')
@observer
export default class MenuProfileComponent extends React.Component {
  @observable menuProfile = [
    {
      name: 'Tài khoản của tôi',
      icon: '',
      key: 'account',
      active: false,
      path: '/user/profile'
      // children: [
      //   {
      //     name: 'Hồ sơ của tôi',
      //     icon: '',
      //     key: 'profile',
      //     active: false,
      //     path: '/user/profile'
      //   },
      //   {
      //     name: 'Địa chỉ nhận hàng',
      //     icon: '',
      //     key: 'address',
      //     active: false,
      //     path: '/user/address'
      //   }
      // ]
    },
    {
      name: 'Đơn mua',
      icon: '',
      key: 'purchase',
      active: false,
      path: '/user/purchase'
    }
  ]
  @observable user = {}
  @observable total = 0
  @observable isRender = false
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.isRender = true
    $('#leftside-navigation .sub-menu > a').click(function(e) {
      $('#leftside-navigation ul ul').slideUp(),
        $(this)
          .next()
          .is(':visible') ||
          $(this)
            .next()
            .slideDown(),
        e.stopPropagation()
    })
  }
  totalPrice = () => {
    let total = 0
    this.data.map((item, index) => {
      total += item.price * item.amount
    })
    return total
  }
  changeInput = data => {
    const { value, name } = data.target
    // alert(JSON.stringify(this.data));
    this.user[name] = value
  }
  render() {
    return (
      <aside className="sidebarProfile">
        {this.isRender ? (
          <div id="leftside-navigation" className="nano">
            <ul className="nano-content">
              {this.menuProfile.map((item, index) => {
                return (
                  <li className={item.active ? 'sub-menu active' : 'sub-menu'}>
                    {item.children && item.children.length > 0 ? (
                      <a href="#">
                        <span>{item.name}</span>
                        <i className="arrow fa fa-angle-right pull-right" />
                      </a>
                    ) : (
                      <a href={item.path}>
                        <span>{item.name}</span>
                      </a>
                    )}

                    {item.children && item.children.length > 0 ? (
                      <ul>
                        {item.children.map((e, i) => {
                          return (
                            <li>
                              <a href={item.path}>{e.name}</a>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </aside>
    )
  }
}
