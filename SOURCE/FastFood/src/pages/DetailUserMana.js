import React from "react";

import { observable } from "mobx";

import { inject, observer } from "mobx-react";
import { getCustomer, createCustomer, updateCustomer } from "../api/Customer";
import {
  getPathName,
  getQuery,
  getAllUrlParams,
  intentPage
} from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import MenuLeftComponent from "../components/dashboard/MenuLeftComponent";
import DetailUserComponent from "../components/dashboard/user/DetailUserComponent";
import { validateEmail } from "../utils/EmailUtils";
@inject("store")
@observer
export default class DetailUserMana extends React.Component {
  @observable isRender = false;
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  @observable data = {
    name: "",
    userName: "",
    avatar: "",
    phone: "",
    email: "",
    password: "",
    type: 0,
    role: "customer",
    address: ""
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let pathName = getPathName();
    let getParam = getAllUrlParams(window.location.href).id || "";
    console.log("getParam" + getParam);
    if (getParam != undefined && getParam != "") {
      // getProduct(getParam, res => {
      //   this.data = res;
      //   this.isRender = true;
      //   console.log('getProduct' + JSON.stringify(this.data));
      // });
      getCustomer(getParam)
        .then(res => {
          this.data = res;

          this.isRender = true;
          console.log(JSON.stringify(this.data));
        })
        .catch(err => {
          alert("Người dùng không tồn tại !");
        });
    } else {
      this.isRender = true;
    }
  }
  callBack = (key, data) => {
    switch (key) {
      case "ADD_IMG":
        break;
      case "UPDATE_USER":
        if (data.role != "customer") {
          if (
            data.name == "" ||
            data.phone == "" ||
            data.email == "" ||
            data.password == ""
          )
            return alert("Bạn phải nhập đầy đủ thông tin");
        } else {
          if (data.name == "" || data.phone == "")
            return alert("Bạn phải nhập đầy đủ thông tin");
        }
        if (validateEmail(data.email)) {
          updateCustomer(data).then(res => {
            if (res) {
              this.titleAddCart = 1;
              this.statusAddCart = true;
              setTimeout(() => {
                this.statusAddCart = false;
                // intentPage("/admin/users");
              }, 2000);
            }
          });
        } else {
          alert("Địa chỉ email không hợp lệ !");
        }

        break;
      case "UPDATE_AVATAR":
        let obj = this.data;
        obj.avatar = data;
        updateCustomer(obj).then(res => {
          if (res) {
            console.log(res);
          }
        });
        break;
      case "CREATE_USER":
        if (data.role != "customer") {
          if (
            data.name == "" ||
            data.phone == "" ||
            data.email == "" ||
            data.password == ""
          )
            return alert("Bạn phải nhập đầy đủ thông tin");
        } else {
          if (data.name == "" || data.phone == "")
            return alert("Bạn phải nhập đầy đủ thông tin");
        }
        if (data.role != "customer") {
          if (!validateEmail(data.email)) {
            return alert("Địa chỉ email không hợp lệ !");
          }
        }

        data.type = 0;
        createCustomer(data).then(res => {
          this.titleAddCart = 0;
          this.statusAddCart = true;
          setTimeout(() => {
            this.statusAddCart = false;
            intentPage("/admin/users");
          }, 2000);
          console.log(JSON.stringify(res));
        });

        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-2 px-0">
          <MenuLeftComponent />
        </div>
        <div className="col-lg-10 px-0">
          {this.isRender ? (
            <DetailUserComponent data={this.data} callBack={this.callBack} />
          ) : null}
        </div>
        {this.statusAddCart ? (
          <div
            className={
              this.titleAddCart == 0 || this.titleAddCart == 1
                ? "alert alert-success"
                : "alert alert-false"
            }
            role="alert"
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              padding: "50px"
            }}
          >
            {this.titleAddCart == 0
              ? "Thêm thành công !"
              : this.titleAddCart == 1
              ? "Sửa thành công !"
              : "Không thành công !"}
          </div>
        ) : null}
      </div>
    );
  }
}
