import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Link, Router } from "../../routes/routes";
// import "../general/style.scss";
// import "./dashboard.scss";
import $ from "jquery";
import { intentPage } from "../../utils/RouterUtils";
import { getAllOrders } from "../../api/Order";
import { unitTime } from "../../lib/convertTime";
@inject("store")
@observer
export default class MenuLeftComponent extends React.Component {
  @observable isRender = false;
  @observable orderIndex = {
    statusOrder: 0,
    statusShip: 0
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.store.checkUser("admin", () => {});
    console.log(JSON.stringify(this.props.store.dataMenuDashboard));
    // unixToMonth(unitTime('2019-03-07T09:16:47.737+0000'))

    $("#leftside-navigation .sub-menu > a").click(function(e) {
      $("#leftside-navigation ul ul").slideUp(),
        $(this)
          .next()
          .is(":visible") ||
          $(this)
            .next()
            .slideDown(),
        e.stopPropagation();
    });
    this.props.store.getAllOrdersAPI(res => {
      if (res.length > 0) {
        res.map(e => {
          console.log(JSON.stringify(e.statusOrder[e.statusOrder.length - 1]));
          if (
            (e.statusOrder[e.statusOrder.length - 1].status &&
              e.statusOrder[e.statusOrder.length - 1].status == "0") ||
            e.statusOrder[e.statusOrder.length - 1].status == 0
          ) {
            this.orderIndex.statusOrder++;
          }
          if (
            e.statusShip[e.statusShip.length - 1].status == "0" ||
            e.statusShip[e.statusShip.length - 1].status == 0 ||
            e.statusShip[e.statusShip.length - 1].status == 3 ||
            e.statusShip[e.statusShip.length - 1].status == "3"
          ) {
            this.orderIndex.statusShip++;
          }
        });
      }
      this.isRender = true;
    });
  }
  render() {
    return (
      <aside
        className="sidebar"
        style={{ position: "fixed", width: "16.666667%" }}
      >
        {this.isRender ? (
          <div id="leftside-navigation" className="nano">
            <ul className="nano-content">
              {this.props.store.dataMenuDashboard.map((item, index) => {
                return (
                  <li className={item.active ? "sub-menu active" : "sub-menu"}>
                    {item.key == "Profile" ? (
                      <a
                        href={
                          item.directional + "?id=" + this.props.store.admin.id
                        }
                      >
                        <span>{item.name}</span>
                      </a>
                    ) : null}
                    {item.key == "User" &&
                    this.props.store.admin.role == "admin" ? (
                      <a href={item.directional}>
                        <span>{item.name}</span>

                        {item.children && item.children.length > 0 ? (
                          <i className="arrow fa fa-angle-right pull-right" />
                        ) : null}
                      </a>
                    ) : null}
                    {item.key !== "Profile" && item.key !== "User" ? (
                      <a href={item.directional}>
                        <span>{item.name}</span>
                        {item.key == "DonHang" ? (
                          <span
                            class="badge badge-danger mx-2"
                            title="Đơn hàng chưa xử lý"
                            style={{ fontSize: "100%" }}
                          >
                            {this.orderIndex.statusOrder}
                          </span>
                        ) : null}
                        {item.key == "DonHang" ? (
                          <span
                            class="badge badge-warning"
                            title="Đơn hàng chưa được giao/ đang giao"
                            style={{ fontSize: "100%" }}
                          >
                            {this.orderIndex.statusShip}
                          </span>
                        ) : null}

                        {item.children && item.children.length > 0 ? (
                          <i className="arrow fa fa-angle-right pull-right" />
                        ) : null}
                      </a>
                    ) : null}
                    {item.children && item.children.length > 0 ? (
                      <ul>
                        {item.children.map((e, i) => {
                          return (
                            <li>
                              <a href={item.directional}>{e.name}</a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              <li
                className={"sub-menu active"}
                onClick={() => {
                  this.props.store.logout("admin", () => {});
                }}
              >
                <a href={"/admin/login"}>
                  <span>Đăng xuất</span>
                </a>
              </li>
            </ul>
            <p
              style={{
                textAlign: "center",
                padding: " 0 15px ",
                color: "#f08080",
                position: "absolute",
                bottom: 30,
                left: 0
              }}
            >
              {this.props.store.admin ? this.props.store.admin.email : "NO"}
            </p>
          </div>
        ) : null}
      </aside>
    );
  }
}
