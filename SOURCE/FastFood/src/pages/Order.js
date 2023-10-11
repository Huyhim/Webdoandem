import React from "react";

import { observable } from "mobx";

import { inject, observer } from "mobx-react";
import {
  getPathName,
  intentPageString,
  intentPage
} from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import HeaderProductComponent from "../components/header/HeaderProductComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import BannerComponent from "../components/home/BannerComponent";
import OrderComponent from "../components/order/OrderComponent";
import LoadComponent from "../components/general/LoadComponent";
// import { getCategoriesAPI } from '../store/store'
import {
  getAllCustomers,
  createCustomer,
  updateCustomer
} from "../api/Customer";
import { createOrder } from "../api/Order";
import * as moment from "moment";
import { unitTimeNow, unixToTime } from "../utils/convertTime";
import { updateProduct } from "../api/Product";
@inject("store")
@observer
export default class Order extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable dataFavourite = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  @observable user = {
    name: "",
    phone: "",
    address: "",
    email: "",
    role: "customer",
    message: ""
  };

  constructor(props) {
    super(props);
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  componentDidMount() {
    if (localStorage.getItem("myCartFF")) {
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
    }
    console.log(this.props.store.user);
    this.props.store.checkUser("customer", () => {
      this.user = this.props.store.user;
      console.log(this.user);
      this.isRender = true;
    });
  }
  setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
  }
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  callBack = (key, data) => {
    switch (key) {
      case "ADD_CART":
        break;
      case "DEL_CART":
        console.log("DEL_CART", this.props.store.myCart);
        this.props.store.myCart.splice(data.index, 1);
        localStorage["myCartFF"] = JSON.stringify(this.props.store.myCart);
        break;
      case "BUY_PRODUCTS":
        if (
          data.user.name !== "" &&
          data.user.name != undefined &&
          data.user.phone !== "" &&
          data.user.phone != undefined &&
          data.user.address !== "" &&
          data.user.address != undefined
        ) {
          if (this.props.store.user != "" && this.props.store.user.id) {
            data.user = {
              ...data.user,
              type: parseInt(this.props.store.user.type) + data.product.length
            };
          } else {
            data.user = {
              ...data.user,
              type: 0
            };
          }

          let dataOrder = {
            statusOrder: [
              {
                name: "",
                status: 0,
                time: unitTimeNow()
              }
            ],
            statusShip: [
              {
                name: "",
                status: 3,
                time: unitTimeNow()
              }
            ],
            type: 1,
            message: data.user.message,
            products: data.product,
            user: data.user,
            idUser:
              this.props.store.user != "" && this.props.store.user.id
                ? this.props.store.user.id
                : ""
          };
          createOrder(dataOrder)
            .then(res => {
              if (res) {
                if (this.props.store.user != "" && this.props.store.user.id) {
                  this.props.store.user.type =
                    parseInt(this.props.store.user.type) + data.product.length;
                  updateCustomer(this.props.store.user).then(ress => {});
                } else {
                }
                this.statusAddCart = true;
                this.props.store.myCart = [];
                localStorage["myCartFF"] = JSON.stringify(
                  this.props.store.myCart
                );

                data.product.map(e => {
                  e.topBuy += e.amount;
                  updateProduct(e)
                    .then(res => {
                      if (res) {
                        console.log(res);
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });

                setTimeout(() => {
                  this.statusAddCart = false;
                  setTimeout(() => {
                    intentPageString("/");
                  }, 100);
                }, 1000);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("data", data);
          return alert("Bạn phải nhập đầy đủ thông tin thanh toán !");
        }

        break;
      case "SEARCH":
        intentPage("/products", { search: data });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div>
        {this.isRender ? (
          <div>
            {/* <HeaderProductComponent callBack={this.callBack} /> */}
            <HeaderComponent />
            <OrderComponent callBack={this.callBack} />

            {this.statusAddCart ? (
              <div
                className={
                  this.titleAddCart == 0
                    ? "alert alert-success"
                    : "alert alert-false"
                }
                role="alert"
                style={{
                  width: "25%",
                  position: "fixed",
                  top: " 40%",
                  right: "35%",
                  height: "100px",
                  textAlign: "center",

                  paddingTop: "40px"
                }}
              >
                {this.titleAddCart == 0
                  ? "Mua hàng thành công !"
                  : "Không thành công, vui lòng thử lại !"}
              </div>
            ) : null}
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    );
  }
}
