import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Link, Router } from "../../../routes/routes";
// import "./user.scss";
import { upLoad } from "../../../api/upLoad";
@inject("store")
@observer
export default class DetailUserComponent extends React.Component {
  @observable typeProduct = [];
  @observable data = {};
  @observable size = "";
  @observable image = "";
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.image = React.createRef();
  }
  componentDidMount() {}
  changeInput = data => {
    const { value, name } = data.target;
    switch (name) {
      case "highlight":
        this.data.highlight = !this.data.highlight;
        break;
      case "status":
        if (value == 0) {
          this.data.status = 0;
        } else {
          this.data.status = 1;
        }
        break;
      case "size":
        this.size = value;
        break;
      // case 'category':
      //   this.data.category = this.props.store.dataCategory.find(e => e.key == value);
      //   break;
      default:
        this.data[name] = value;
        break;
    }
  };

  render() {
    const { callBack } = this.props;
    return (
      <div className="py-4 detail-product">
        <div className="px-4 font">
          <div className="row  align-items-center">
            <div className="col-8">
              <div className="row align-items-center mb-3">
                <div className="col-3 px-0">
                  <span className="font">Tên người dùng</span>
                </div>
                <div className="col-8">
                  <input
                    name="name"
                    type="text"
                    value={this.data.name}
                    onChange={e => {
                      this.changeInput(e);
                    }}
                    className="w-75 form-control font"
                    style={{}}
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3 ">
                <div className="col-3 px-0">
                  <span className="font">Email</span>
                </div>
                <div className="col-8">
                  <input
                    name="email"
                    type="text"
                    value={this.data.email}
                    className="w-75 form-control font"
                    style={{}}
                    onChange={e => {
                      this.changeInput(e);
                    }}
                  />
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-3 px-0">
                  <span className="font">Số điện thoại</span>
                </div>
                <div className="col-8">
                  <input
                    name="phone"
                    type="text"
                    value={this.data.phone}
                    onChange={e => {
                      this.changeInput(e);
                    }}
                    className="w-75 form-control font"
                    style={{}}
                  />
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <div className="col-3 px-0">
                  <span className="font">Phân quyền</span>
                </div>
                <div className="col-8">
                  <select
                    type="text"
                    className="w-75 custom-select font"
                    name="role"
                    onChange={e => {
                      this.changeInput(e);
                    }}
                  >
                    <option
                      selected={this.data.role == "customer" ? true : false}
                      value="customer"
                    >
                      Khách hàng
                    </option>
                    <option
                      selected={this.data.role == "employee" ? true : false}
                      value="employee"
                    >
                      Nhân viên
                    </option>
                    <option
                      selected={this.data.role == "admin" ? true : false}
                      value="admin"
                    >
                      Quản trị
                    </option>
                  </select>
                </div>
              </div>
              {/* {this.data.role !== 'customer' ? (
                <div> */}
              {/* <div className="row align-items-center mb-3">
                    <div className="col-3 px-0">
                      <span className="font">Tên đăng nhập</span>
                    </div>
                    <div className="col-8">
                      <input
                        name="userName"
                        type="text"
                        value={this.data.userName}
                        onChange={e => {
                          this.changeInput(e)
                        }}
                        className="w-75 form-control font"
                        style={{}}
                      />
                    </div>
                  </div> */}
              <div className="row align-items-center mb-3">
                <div className="col-3 px-0">
                  <span className="font">Mật khẩu</span>
                </div>
                <div className="col-8">
                  <input
                    name="password"
                    type="text"
                    value={this.data.password}
                    onChange={e => {
                      this.changeInput(e);
                    }}
                    className="w-75 form-control font"
                    style={{}}
                  />
                </div>
              </div>
              {/* </div>
              ) : null} */}
              <div className="row  align-items-center mb-3">
                <div className="col-3 px-0">
                  <span className="font">Địa chỉ</span>
                </div>
                <div className="col-9">
                  <input
                    name="address"
                    type="text"
                    value={this.data.address}
                    onChange={e => {
                      this.changeInput(e);
                    }}
                    className="w-100 form-control font"
                    style={{}}
                  />
                </div>
              </div>
              {this.data.id ? (
                <div>
                  <div className="row align-items-center my-4">
                    <div className="col-3 px-0">
                      <span className="font">Số lần mua hàng</span>
                    </div>
                    <div className="col-9">
                      <span>{this.data.type}</span>
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-3 px-0">
                      <span className="font">Ngày tạo tài khoản</span>
                    </div>
                    <div className="col-9">
                      <span>{this.data.createdAt}</span>
                    </div>
                  </div>{" "}
                </div>
              ) : null}
            </div>
            <div className="col-4">
              <div className="text-center">
                <img
                  src={
                    this.data.avatar
                      ? this.data.avatar
                      : "../../static/images/ava.jpg"
                  }
                  className="rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover"
                  }}
                />

                <div className="w-100 m-auto text-center">
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={() => {
                      this.image.current.click();
                    }}
                  >
                    Thay ảnh
                  </button>
                </div>
                <input
                  name="upFile"
                  type="file"
                  style={{ visibility: "hidden", display: "inherit" }}
                  ref={this.image}
                  onChange={e => {
                    console.log(e.target.files[0]);
                    upLoad(e.target.files[0])
                      .then(res => {
                        if (res) {
                          console.log(res);
                          let newState = this.data;
                          newState.avatar = res.data[0];
                          console.log(newState.avatar);
                          this.data.avatar = newState.avatar;
                          this.props.callBack(
                            "UPDATE_AVATAR",
                            this.data.avatar
                          );
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb-4 pr-5">
            {this.data.id != undefined && this.data.id != "" ? (
              <button
                onClick={() => {
                  callBack("UPDATE_USER", this.data);
                }}
                className="bgDefault colorWhite p-2 px-3 rounded cursor"
              >
                Chỉnh sửa
              </button>
            ) : (
              <button
                onClick={() => {
                  callBack("CREATE_USER", this.data);
                }}
                className="bgDefault colorWhite p-2 px-3 rounded cursor"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
