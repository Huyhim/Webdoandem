import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
// import './profile.scss'

@inject('store')
@observer
export default class ProfileAddressComponent extends React.Component {
  @observable isRender = false
  @observable data = []
  @observable user = {}
  @observable total = 0

  constructor(props) {
    super(props)
    this.isRender = true
    this.user = this.props.store.user
  }
  componentDidMount() {}

  changeInput = data => {
    const { value, name } = data.target
    let newState = this.user

    // alert(JSON.stringify(this.data));
    newState[name] = value
    this.user = newState
  }
  render() {
    return (
      <div className="profile-address w-100">
        <div className="">
          <div className="py-3">
            <h5>Địa chỉ của tôi</h5>
            <button
              className="cursor py-2 px-4 bgDefault rounded"
              onClick={() => {
                this.props.callBack('ADD_ADDRESS')
              }}
            >
              <span className="colorWhite">Thêm địa chỉ mới</span>
            </button>
            <hr className="my-1" />
          </div>
          {this.isRender ? (
            this.user.address && this.user.address.length > 0 ? (
              this.user.address.map(e => {
                return (
                  <div className="row">
                    <div className="col-3 text-right">
                      <button type="button" class="btn btn-outline-primary">
                        Sửa
                      </button>
                      <button type="button" class="btn btn-outline-danger">
                        Xóa
                      </button>
                      {this.user.address.type == '1' ? (
                        <button
                          disabled
                          type="button"
                          class="btn btn-outline-dark"
                        >
                          Thiết lập mặc định
                        </button>
                      ) : (
                        <button type="button" class="btn btn-outline-dark">
                          Thiết lập mặc định
                        </button>
                      )}
                    </div>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-4">Tên</div>
                        <div className="col-8">
                          {this.user.address.name}{' '}
                          {this.user.address.type == '1' ? (
                            <span class="badge badge-pill badge-success">
                              Mặc dịnh
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">Số điện thoại</div>
                        <div className="col-9">{this.user.address.phone}</div>
                      </div>
                      <div className="row">
                        <div className="col-3">Địa chỉ</div>
                        <div className="col-9">{this.user.address.address}</div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>
                Bạn chưa có địa chỉ nhận hàng nào ! Hãy thêm địa chỉ mới để mua
                hàng được thuận lợi!
              </div>
            )
          ) : (
            <LoadComponent />
          )}
        </div>
      </div>
    )
  }
}
