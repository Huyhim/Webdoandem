import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Link, Router } from "../../../routes/routes";

// import "./user.scss";
@inject("store")
@observer
class Item extends React.Component {
  render() {
    const { index, item, callBack } = this.props;
    return (
      <tr>
        <td>
          <span
            className="d-block"
            style={{
              maxWidth: "100px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              height: "16px",
              lineHeight: "16px"
            }}
            title={item.id || ""}
          >
            {item.id || ""}
          </span>
        </td>
        <td>
          {" "}
          <a href={"/admin/detail-user?id=" + item.id}>
            <img
              className="cursor rounded-circle border border-secondary "
              style={{ width: 30, height: 30 }}
              src={item.avatar || "../../../static/images/ava.jpg"}
            />
          </a>{" "}
        </td>
        <td
          className=""
          // onClick={() => {
          //   callBack('CLICK_ITEM', { index, item });
          // }}
        >
          <a
            href={"/admin/detail-user?id=" + item.id}
            className="colorDefault cursor"
            style={{ textDecoration: "none" }}
          >
            {item.name ? item.name : null}
          </a>
        </td>
        <td>{item.phone || ""}</td>
        <td>{item.email || ""}</td>
        <td>
          <span
            className="colorDefault cursor"
            data-toggle="modal"
            data-target="#changeRoleModalCenter"
            onClick={() => {
              this.props.clickRole({ item, index }, item.role);
            }}
          >
            {item.role && item.role == "customer"
              ? "Khách hàng"
              : item.role == "employee"
              ? "Nhân viên"
              : item.role == "admin"
              ? "Admin"
              : ""}
          </span>
        </td>

        <td>
          <img
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              this.props.clickItem({ item, index });
            }}
            className="cursor"
            style={{ width: 25 }}
            src="../../../static/images/remove.png"
          />
        </td>
      </tr>
    );
  }
}

@inject("store")
@observer
export default class ListUserComponent extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable search = "";
  @observable role = "";
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.search = this.props.search;
    console.log(JSON.stringify(this.search));
    this.isRender = true;
  }
  componentDidMount() {}
  pagination = () => {
    let pagi = [];
    for (let index = 0; index < this.props.totalPage; index++) {
      if (this.props.page == index + 1) {
        pagi.push(
          <span className="border bgDefault colorWhite rounded py-1 px-2 mx-1">
            {index + 1}
          </span>
        );
      } else {
        pagi.push(
          <span
            className="border border-dark rounded p-1 py-1 px-2 mx-1 cursor"
            onClick={() => {
              this.props.callBack("NEXT_PAGE", index + 1);
            }}
          >
            {index + 1}
          </span>
        );
      }
    }
    return pagi;
  };
  render() {
    const { callBack } = this.props;
    return (
      <div>
        {this.isRender ? (
          <div className="py-4 font">
            <div className="px-5">
              <button className="bgDefault  p-2 px-3 rounded cursor">
                <a
                  href="/admin/detail-user"
                  className="colorWhite"
                  style={{ textDecoration: "none" }}
                >
                  Thêm người dùng
                </a>
              </button>
              <div className="row pt-4">
                <div className="col-6 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên người dùng</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        value={this.search.name}
                        onChange={e => {
                          this.search.name = e.target.value;
                        }}
                        onKeyPress={({ charCode }) => {
                          if (charCode === 13) {
                            callBack("SEARCH", this.search);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Số điện thoại</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        value={this.search.phone}
                        onChange={e => {
                          this.search.phone = e.target.value;
                        }}
                        onKeyPress={({ charCode }) => {
                          if (charCode === 13) {
                            callBack("SEARCH", this.search);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Email</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        value={this.search.email}
                        onChange={e => {
                          this.search.email = e.target.value;
                        }}
                        onKeyPress={({ charCode }) => {
                          if (charCode === 13) {
                            callBack("SEARCH", this.search);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="row  align-items-center">
                    <div className="col-3 px-0">
                      <span className="font">Phân quyền</span>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="w-75 custom-select font"
                        onChange={e => {
                          this.search.role = e.target.value;
                        }}
                      >
                        <option
                          value=""
                          selected={this.search.role == "" ? true : false}
                        >
                          ----
                        </option>
                        <option
                          value="customer"
                          selected={
                            this.search.role == "customer" ? true : false
                          }
                        >
                          Khách hàng
                        </option>
                        <option
                          value="employee"
                          selected={
                            this.search.role == "employee" ? true : false
                          }
                        >
                          Nhân viên{" "}
                        </option>
                        <option
                          value="admin"
                          selected={this.search.role == "admin" ? true : false}
                        >
                          Admin
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end mb-4 pr-5">
                <button
                  onClick={() => {
                    callBack("SEARCH", this.search);
                  }}
                  className="bgDefault colorWhite p-2 px-3 mr-3 rounded cursor"
                >
                  Tìm kiếm
                </button>
                {this.props.isSearch ? (
                  <button
                    onClick={() => {
                      callBack("BACK_ALL");
                    }}
                    className="bgDefault colorWhite p-2 px-3 rounded cursor"
                  >
                    Tất cả người dùng
                  </button>
                ) : null}
              </div>
            </div>
            <table className="table table-bordered text-center font">
              <thead className="thead-light">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Ảnh hồ sơ</th>
                  <th scope="col">Tên người dùng</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phân quyền</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {this.data.map((item, index) => {
                  return (
                    <Item
                      item={item}
                      index={index}
                      callBack={callBack}
                      clickItem={({ item, index }) => {
                        this.clickItem = { item: item, index: index };
                      }}
                      clickRole={({ item, index }, role) => {
                        this.clickItem = { item: item, index: index };
                        this.role = role;
                      }}
                    />
                  );
                })}

                {this.data.length == 0 ? (
                  <td colSpan="10">Không có người dùng nào</td>
                ) : null}
              </tbody>
            </table>
            <div className="float-right mb-3 mr-3">{this.pagination()}</div>

            {/* <!-- Modal --> */}
            <div
              ref="myModal"
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body pt-5 pb-4 text-center">
                    Bạn có chắc chắn muốn xóa tài khoản người dùng này !
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={() => {
                        this.props.callBack("DEL_ITEM", this.clickItem);
                      }}
                      data-dismiss="modal"
                      type="button"
                      className="btn btn-primary"
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref="myModal"
              className="modal fade"
              id="changeRoleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body row pt-4 px-4">
                    <div className="col-6 mb-3">
                      <input
                        id="customer"
                        value="customer"
                        name="role"
                        type="radio"
                        checked={this.role == "customer" ? true : false}
                        onChange={e => {
                          this.role = e.target.value;
                        }}
                      />
                      <label className="ml-2 mb-0" for="customer">
                        Khách hàng
                      </label>
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        id="employee"
                        value="employee"
                        name="role"
                        type="radio"
                        checked={this.role == "employee" ? true : false}
                        onChange={e => {
                          this.role = e.target.value;
                        }}
                      />
                      <label className="ml-2 mb-0" for="employee">
                        Nhân viên
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        id="admin"
                        value="admin"
                        name="role"
                        type="radio"
                        checked={this.role == "admin" ? true : false}
                        onChange={e => {
                          this.role = e.target.value;
                        }}
                      />
                      <label className="ml-2 mb-0" for="admin">
                        Quản trị
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      data-dismiss="modal"
                      onClick={() => {
                        this.props.callBack("CHANGE_ROLE", {
                          role: this.role,
                          data: this.clickItem
                        });
                      }}
                      data-dismiss="modal"
                      type="button"
                      className="btn btn-primary"
                    >
                      Thay đổi
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
