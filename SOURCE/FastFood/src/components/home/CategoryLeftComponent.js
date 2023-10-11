import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
// import './home.scss'
@inject('store')
@observer
export default class CategoryLeftComponent extends React.Component {
  @observable isRender = false
  @observable textSearch = ''

  constructor(props) {
    super(props)
    this.isRender = true
  }

  render() {
    return (
      <div className="w-100">
        <h5 class="navbar-brand">
          <b>Danh mục</b>
        </h5>
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
          <li class="nav-item">
                <a class="nav-link px-0 " href={'/products/highlight'}>
                  Sản phẩm nổi bật
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-0 " href={'/products/topbuy'}>
                   Sản phẩm mua nhiều
                </a>
              </li>
        </ul>
        <h5 class="navbar-brand">
          <b>Gợi ý tìm kiếm</b>
        </h5>
        <ul class="nav flex-column">
          {[
            {
              name: 'Trà sữa',
              key: 'tra sua'
            },
            {
              name: 'Cafe',
              key: 'cafe'
            },
            {
              name: 'Ô mai',
              key: 'ô mai'
            },
            {
              name: 'Khoai lang kén',
              key: 'khoai lang ken'
            }
          ].map(e => {
            return (
              <li class="nav-item">
                <a class="nav-link px-0 " href={'/products?search=' + e.key}>
                  {e.name}
                </a>
              </li>
            )
          })}
          {/*  <li class="nav-item">
             <i className="d-block my-3">Khoảng giá</i>
             <p className="">
               <span className="float-left w-25">Từ </span>{' '}
               <input type="text" className="form-control w-75" />
             </p>
             <p>
               <span className="float-left w-25">Đến </span>{' '}
               <input type="text" className="form-control w-75" />
             </p>
          </li> */}
        </ul>
      </div>
    )
  }
}
