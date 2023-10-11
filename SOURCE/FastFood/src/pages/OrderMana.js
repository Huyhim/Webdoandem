import React from "react";

import { observable } from "mobx";

import { inject, observer } from "mobx-react";
import { getPathName } from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import { queryOrder, deleteOrder } from "../api/Order";
import { getCustomer } from "../api/Customer";
import MenuLeftComponent from "../components/dashboard/MenuLeftComponent";
import OrderProductComponent from "../components/dashboard/order/OrderProductComponent";
import LoadComponent from "../components/general/LoadComponent";
@inject("store")
@observer
export default class OrderMana extends React.Component {
  @observable data = [];
  @observable page = 1;
  @observable limit = 10;
  @observable totalPage = 0;
  @observable isRender = false;
  @observable isSearch = false;
  @observable query = "";
  @observable search = {};

  constructor(props) {
    super(props);

    // this.props.store.getOrdersAPI()
    this.getOrder(this.page, this.limit);
    this.search = {
      name: "",
      phone: "",
      timeStart: "",
      timeEnd: "",
      statusOrder: "",
      statusShip: ""
    };
  }
  componentDidMount() {
    let pathName = getPathName();
  }

  getOrder = async (p, l, q) => {
    this.data = [];
    this.isRender = false;
    const dataOrder = await queryOrder({ page: p, limit: l, query: q });
    this.totalPage = Math.ceil(dataOrder.count / this.limit);
    Promise.all(
      dataOrder.rows.map(async order => {
        //   const user = await getCustomer(order.idUser)
        //   order = { ...order, customer: user }
        this.data.push(order);
        this.isRender = true;
      })
    ).then(res => {
      this.isRender = true;
    });
  };
  callBack = (key, data) => {
    switch (key) {
      case "DEL_ITEM":
        deleteOrder(data.item.id).then(res => {
          this.data.splice(data.index, 1);
        });
        break;
      case "NEXT_PAGE":
        this.page = data;
        this.isRender = false;
        this.getOrder(this.page, this.limit);
        break;
      case "SEARCH":
        this.isSearch = true;
        this.page = 1;
        console.log(data);
        this.query =
          `${data.statusShip ? "&statusShip=" + `${data.statusShip}` : ""}` +
          `${data.statusOrder ? "&statusOrder=" + data.statusOrder : ""}`;
        // if (data.name != '' || data.phone != '') {
        //   this.query =
        //     `${data.name ? '&name=' + `${data.name}` : ''}` +
        //     `${data.phone ? '&phone=' + data.phone : ''}`;
        // }
        //  else {

        // }
        this.getOrder(this.page, this.limit, this.query);
        break;
      case "BACK_ALL":
        this.page = 1;
        this.isSearch = false;
        this.search = {
          name: "",
          phone: "",
          timeStart: "",
          timeEnd: "",
          statusOrder: "",
          statusShip: ""
        };
        this.getOrder(this.page, this.limit);

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
            <OrderProductComponent
              data={this.data}
              search={this.search}
              isSearch={this.isSearch}
              totalPage={this.totalPage}
              page={this.page}
              callBack={this.callBack}
            />
          ) : (
            <div style={{ minHeight: "100vh" }}>
              <LoadComponent />
            </div>
          )}
        </div>
      </div>
    );
  }
}
