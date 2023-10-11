import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Link, Router } from "../../../routes/routes";

// import "./dashboardComponent.scss";
import $ from "jquery";

@inject("store")
@observer
export default class DashboardComponent extends React.Component {
  @observable isRender = false;
  @observable months = [
    {
      name: "Tháng 1",
      value: "01",
      status: false
    },
    {
      name: "Tháng 2",
      value: "02",
      status: false
    },
    {
      name: "Tháng 3",
      value: "03",
      status: false
    },
    {
      name: "Tháng 4",
      value: "04",
      status: false
    },
    {
      name: "Tháng 5",
      value: "05",
      status: false
    },
    {
      name: "Tháng 6",
      value: "06",
      status: false
    },
    {
      name: "Tháng 7",
      value: "07",
      status: false
    },
    {
      name: "Tháng 8",
      value: "08",
      status: false
    },
    {
      name: "Tháng 9",
      value: "09",
      status: false
    },
    {
      name: "Tháng 10",
      value: "10",
      status: false
    },
    {
      name: "Tháng 11",
      value: "11",
      status: false
    },
    {
      name: "Tháng 12",
      value: "12",
      status: false
    }
  ];

  constructor(props) {
    super(props);
    console.log(this.props.timeNow);
    this.months.find(e => e.value == this.props.timeNow).status = true;
  }
  componentDidMount() {}
  render() {
    const {
      timeNow,
      order,
      usersNew,
      usersFriendly,
      employee,
      custommer,
      callBack
    } = this.props;
    return (
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12 pr-0">
            <div className="one">
              <h5>
                Tổng doanh thu <small> tháng {timeNow} </small>
              </h5>
              <div className="number">{order.totalMoney}đ</div>
              <select
                onChange={e => {
                  // this.months.map(m => {
                  //   if (m.value == e.target.value) {
                  //     m.status = true;
                  //   } else {
                  //     m.status = false;
                  //   }
                  // });
                  callBack("changeMonth", e.target.value);
                }}
              >
                {this.months.map(m => {
                  return (
                    <option value={m.value} selected={m.status}>
                      {m.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 pr-0">
            <div className="two">
              <h5>Tổng số người dùng </h5>
              {/* <div className="number">12</div> */}
              <div className="row two-user">
                <div className="col-6">
                  <p>Khách hàng</p>
                  <b>{custommer}</b>
                </div>
                <div className="col-6">
                  <p>Hệ thống</p>
                  <b>{employee}</b>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 pr-0">
            <div className="three">
              <h5>Tổng số sản phẩm </h5>
              <div className="number">
                {this.props.store.dataProducts.length}
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="four">
              <h5>Tổng số đơn hàng </h5>
              <div className="number">{order.totalIndex}</div>
              <select
                onChange={e => {
                  this.months.map(m => {
                    if (m.value == e.target.value) {
                      m.status = true;
                    } else {
                      m.status = false;
                    }
                  });
                }}
              >
                {this.months.map(m => {
                  return (
                    <option value={m.value} selected={m.status}>
                      {m.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9 col-sm-6 col-12">
            <div className="row">
              <div className="col-lg-6 col-12 pl-0">
                <div className="left">
                  <h5>Top sản phẩm mua nhiều</h5>
                  {this.props.store.productTopBuy.map(e => {
                    if (e.topBuy > 0)
                      return (
                        <p>
                          <a href={"/admin/detail-product?id=" + e.id}>
                            {e.name} - <b>{e.topBuy} </b> <br />
                          </a>
                        </p>
                      );
                  })}
                </div>
              </div>
              <div className="col-lg-6 col-12 pr-0">
                <div className="left">
                  <h5>Khách hàng thân thiết</h5>
                  {usersFriendly.map(user => {
                    return (
                      <p>
                        <a href={"/admin/detail-user?id=" + user.id}>
                          {user.name} - <b>{user.type} </b>sản phẩm từng mua{" "}
                          <br />
                          {user.email}
                        </a>
                      </p>
                    );
                  })}
                </div>
                <div className="left">
                  <h5>Người dùng mới</h5>
                  {usersNew.map(user => {
                    return (
                      <p>
                        <a href={"/admin/detail-user?id=" + user.id}>
                          {user.email} - {user.role} <br /> {user.createdAt}
                        </a>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="right">
              <h5>Đơn hàng chưa xử lý</h5>
              <div className="number">
                {12 > 0 ? (
                  <span style={{ color: "red" }}>{order.statusOrder.wait}</span>
                ) : (
                  <span style={{ color: "#000" }}>
                    {order.statusOrder.wait}
                  </span>
                )}
              </div>
            </div>
            <div className="right">
              <h5>Đang giao hàng/ chờ giao hàng</h5>
              <div className="number">
                {" "}
                {12 > 0 ? (
                  <span style={{ color: "blue" }}>{order.statusShip.wait}</span>
                ) : (
                  <span style={{ color: "#000" }}>{order.statusShip.wait}</span>
                )}
              </div>
            </div>

            <div className="right">
              <p>
                <b>Đơn hàng bị hủy</b> :<span>{order.statusOrder.cancel}</span>
              </p>
              <p>
                <b>Giao hàng bị hủy</b> :<span>{order.statusShip.cancel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
