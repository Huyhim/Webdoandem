import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
import { upLoad } from '../../api/upLoad'
import $ from 'jquery'
// import './profile.scss'

@inject('store')
@observer
export default class ProfileComponent extends React.Component {
  @observable isRender = false
  @observable data = []
  @observable user = {}
  @observable total = 0
  @observable password = {
    passwordOld: '',
    passwordNew: '',
    passwordConfig: ''
  }

  constructor(props) {
    super(props)

    this.image = React.createRef()
    this.user = this.props.store.user
    console.log(this.user)
  }
  componentDidMount() {
    this.isRender = true
  }

  changeInput = data => {
    const { value, name } = data.target
    let newState = { ...this.user }
    switch (name) {
      case 'upFile':
        console.log(data.target.files[0])
        upLoad(data.target.files[0])
          .then(res => {
            if (res) {
              console.log(res)
              newState.avatar = res.data[0]
              console.log(newState.avatar)
              //   Config.api.host.upload +
              //   Config.api.path.upload.upFile +
              //   res.data[0]
              this.user.avatar = newState.avatar
            }
          })
          .catch(err => {
            console.log(err)
          })
        break

      default:
        newState[name] = value
        break
    }
    // alert(JSON.stringify(this.data));

    this.user = newState
  }
  render() {
    return (
      <div className="profile w-100 p-4">
        <div className="">
          <div className="py-3 px-3">
            <h5>Hồ sơ của tôi</h5>
            <hr className="my-1" />
          </div>
          {this.isRender ? (
            <div className="row justify-content-between mb-5">
              <div className="col-md-6 px-0">
                <div className="row mb-2" style={{ alignItems: 'center' }}>
                  <div className="col-3">Email</div>
                  <div className="col-9">
                    <input
                      name="email"
                      type="text"
                      className="w-100
                      
                      form-control"
                      value={this.user.email ? this.user.email : ''}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                <div className="row  mb-2" style={{ alignItems: 'center' }}>
                  <div className="col-3">Số điện thoại</div>
                  <div className="col-9">
                    <input
                      name="phone"
                      type="text"
                      className="w-100 form-control"
                      value={this.user.phone}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                <div className="row  mb-2" style={{ alignItems: 'center' }}>
                  <div className="col-3">Tên</div>
                  <div className="col-9">
                    <input
                      name="name"
                      type="text"
                      className="w-100  form-control"
                      value={this.user.name}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                <div className="row  mb-2" style={{ alignItems: 'center' }}>
                  <div className="col-3">Địa chỉ</div>
                  <div className="col-9">
                    <input
                      name="address"
                      type="text"
                      className="w-100  form-control"
                      value={this.user.address}
                      onChange={this.changeInput}
                    />
                  </div>
                </div>
                <div className="row  my-3" style={{ alignItems: 'center' }}>
                  <div className="col-3">Mật khẩu</div>
                  <div className="col-9">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      {' '}
                      Thay đổi mật khẩu
                    </button>
                  </div>
                </div>
                <div className="row  mb-2" style={{ alignItems: 'center' }}>
                  <div className="col-3">Số lần mua hàng</div>
                  <div className="col-9">
                    {this.user.type ? this.user.type : '0'}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <img
                    src={
                      this.user.avatar
                        ? this.user.avatar
                        : '../../static/images/ava.jpg'
                    }
                    className="rounded-circle"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <input
                    name="upFile"
                    type="file"
                    style={{ visibility: 'hidden' }}
                    ref={this.image}
                    onChange={this.changeInput}
                    // onChange={event => {

                    // }}
                  />
                  <div className="w-100 m-auto text-center">
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      onClick={() => {
                        this.image.current.click()
                      }}
                    >
                      Thay ảnh
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="cursor py-2 px-4 bgDefault rounded mt-5"
                  onClick={() => {
                    this.props.callBack('SAVE_PROFILE', this.user)
                  }}
                >
                  <span className="colorWhite">Lưu thay đổi</span>
                </button>
              </div>

              <div
                class="modal fade"
                id="exampleModalCenter"
                ref={ref => {
                  this.exampleModal = ref
                }}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">
                        Thay đổi mật khẩu
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group row">
                        <label
                          for="inputPasswordOld"
                          class="col-sm-4 col-form-label"
                        >
                          Mật khẩu cũ
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPasswordOld"
                            placeholder="Password"
                            onChange={e => {
                              this.password.passwordOld = e.target.value
                            }}
                          />
                        </div>
                      </div>
                      <div class="form-group row my-3">
                        <label
                          for="inputPasswordNew"
                          class="col-sm-4 col-form-label"
                        >
                          Mật khẩu mới
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPasswordNew"
                            placeholder="Password"
                            onChange={e => {
                              this.password.passwordNew = e.target.value
                            }}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-4 col-form-label"
                        >
                          Nhập lại mật khẩu mới
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            onChange={e => {
                              this.password.passwordConfig = e.target.value
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => {
                          if (
                            this.password.passwordOld == '' ||
                            this.password.passwordNew == '' ||
                            this.password.passwordConfig == ''
                          ) {
                            return alert('Bạn phải nhập đầy đủ trường ...')
                          }
                          if (
                            this.password.passwordOld !==
                            this.props.store.user.password
                          ) {
                            return alert(
                              'Mật khẩu cũ không đúng. vui lòng nhập lại'
                            )
                          }
                          if (
                            this.password.passwordNew !==
                            this.password.passwordConfig
                          ) {
                            return alert(
                              'Mật khẩu mới không trùng khớp. Vui lòng nhập lại !'
                            )
                          }
                          this.props.callBack('CHANGE_PASSWORD', this.password)
                          this.exampleModal.click()
                        }}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoadComponent />
          )}
        </div>
      </div>
    )
  }
}
