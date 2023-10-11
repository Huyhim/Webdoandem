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
import MenuProfileComponent from "../components/profile/MenuProfileComponent";
import PurchaseComponent from "../components/profile/PurchaseComponent";
import LoadComponent from "../components/general/LoadComponent";
// import { getCategoriesAPI } from '../store/store'
import { getAllCustomers, createCustomer } from "../api/Customer";
import { createOrder, getOrderByIdUser } from "../api/Order";
import * as moment from "moment";
import { unitTimeNow, unixToTime } from "../utils/convertTime";
import HeaderComponent from "../components/header/HeaderComponent";
import FooterComponent from "../components/general/FooterComponent";
@inject("store")
@observer
export default class Purchase extends React.Component {
  @observable isRender = false;
  @observable orderUser = [];
  @observable data = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getMyOrder();
  }

  getMyOrder = () => {
    this.isRender = false;
    console.log(this.props.store.user.id);
    if (this.orderUser.length == 0) {
      this.props.store.checkUser("customer", () => {
        getOrderByIdUser(this.props.store.user.id)
          .then(res => {
            this.isRender = true;
            this.orderUser = res;

            this.orderUser.rows.map(e => {
              if (e.statusOrder[e.statusOrder.length - 1].status == 0) {
                this.data.push(e);
              }
            });
            // console.log(JSON.stringify(this.data))
          })
          .catch(err => {
            this.isRender = true;
            console.log(err);
          });
      });
    }
  };
  callBack = (key, data) => {
    switch (key) {
      case "NEXT":
        this.props.store.list.map(e => {
          if (e.key == data) {
            e.status = true;
          } else {
            e.status = false;
          }
        });
        switch (data) {
          case "waiting":
            this.data = [];
            this.orderUser.rows.map(e => {
              if (e.statusOrder[e.statusOrder.length - 1].status == 0) {
                this.data.push(e);
              }
            });

            break;
          case "ordering":
            this.data = [];
            this.orderUser.rows.map(e => {
              if (e.statusShip[e.statusShip.length - 1].status == 0) {
                this.data.push(e);
              }
            });

            break;
          case "receive":
            this.data = [];
            this.orderUser.rows.map(e => {
              if (e.statusShip[e.statusShip.length - 1].status == 1) {
                this.data.push(e);
              }
            });

            break;
          case "cancel":
            this.data = [];
            this.orderUser.rows.map(e => {
              if (e.statusShip[e.statusShip.length - 1].status == 2) {
                this.data.push(e);
              }
            });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };
  render() {
    return this.isRender ? (
      <div style={{ backgroundColor: "#f5f5f5" }}>
        {/* <div style={{ height: '80px', background: 'lightgreen' }}> */}{" "}
        <HeaderComponent />
        {/* </div> */}
        <div className="row pb-3" style={{ background: "#fafafa" }}>
          <div className="col-2">
            <MenuProfileComponent />
          </div>
          <div className="col-10">
            <PurchaseComponent callBack={this.callBack} data={this.data} />
          </div>
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
        <FooterComponent />
      </div>
    ) : (
      <div>
        <LoadComponent />
      </div>
    );
  }
}
