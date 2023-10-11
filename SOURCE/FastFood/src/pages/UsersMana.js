import React from "react";

import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { getPathName } from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import {
  deleteCustomer,
  queryUser,
  updateCustomer,
  getAllCustomers
} from "../api/Customer";
import MenuLeftComponent from "../components/dashboard/MenuLeftComponent";
import ListUserComponent from "../components/dashboard/user/ListUserComponent";
import LoadComponent from "../components/general/LoadComponent";
@inject("store")
@observer
export default class UsersMana extends React.Component {
  @observable data = [];
  @observable page = 1;
  @observable limit = 15;
  @observable totalPage = 0;
  @observable isRender = false;
  @observable isSearch = false;
  @observable query = "";
  @observable search = {};
  @observable statusNotify = false;
  @observable title = 0;
  @observable queryUsers = false;
  constructor(props) {
    super(props);

    this.getUsers(this.page, this.limit);
    this.search = {
      name: "",
      phone: "",
      email: "",
      role: ""
    };
  }
  componentDidMount() {
    let pathName = getPathName();
  }
  getUsers = (p, l, q, s) => {
    this.isRender = false;
    if (q) {
      queryUser({ page: p, limit: l, query: q, queryUsers: s })
        .then(res => {
          if (res) {
            this.data = res;
            this.totalPage = Math.ceil(this.data.count / this.limit);
            this.isRender = true;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      queryUser({ page: p, limit: l })
        .then(res => {
          if (res) {
            this.data = res;
            this.totalPage = Math.ceil(this.data.count / this.limit);
            this.isRender = true;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  search = (query, data) => {
    let text = query.toLowerCase();
    let arr = [];
    data.map(function(item) {
      let nana = item.name.toLowerCase();
      if (nana.indexOf(text) != -1) {
        arr.push(item);
      }
    });
    return arr;
  };
  callBack = (key, data) => {
    switch (key) {
      case "DEL_ITEM":
        deleteCustomer(data.item.id)
          .then(res => {
            this.data.rows.splice(data.index, 1);
            this.statusNotify = true;
            this.title = 0;
            setTimeout(() => {
              this.statusNotify = false;
            }, 2000);
          })
          .catch(res => {
            this.statusNotify = true;
            this.title = 1;
            setTimeout(() => {
              this.statusNotify = false;
            }, 2000);
          });

        break;
      case "NEXT_PAGE":
        this.page = data;
        console.log(JSON.stringify(this.page));
        if (this.isSearch) {
          this.getUsers(this.page, this.limit, this.query, this.queryUsers);
        } else {
          this.getUsers(this.page, this.limit);
        }
        break;
      case "SEARCH":
        this.isSearch = true;
        this.page = 1;

        if (data.name && data.name != "") {
          this.queryUsers = false;
          this.query = data.name;
        } else {
          this.queryUsers = true;
          this.query =
            `${data.phone ? "&phone=" + `${data.phone}` : ""}` +
            `${data.email ? "&email=" + data.email : ""}` +
            `${data.role ? "&role=" + data.role : ""}`;
        }
        this.getUsers(this.page, this.limit, this.query, this.queryUsers);

        // console.log(JSON.stringify(q))
        // if (data.name != '') {
        //   this.data = this.search(data.name, this.props.store.dataProducts);
        // }

        // console.log(JSON.stringify(this.data));
        break;
      case "BACK_ALL":
        this.page = 1;
        this.isSearch = false;
        this.search = {
          name: "",
          phone: "",
          email: "",
          role: ""
        };
        this.getUsers(this.page, this.limit);

        break;
      case "CHANGE_ROLE":
        this.data.rows[data.data.index].role = data.role;
        updateCustomer(this.data.rows[data.data.index])
          .then(res => {
            console.log(JSON.stringify(res));

            this.statusNotify = true;
            this.title = 0;
            setTimeout(() => {
              this.statusNotify = false;
            }, 2000);
          })
          .catch(res => {
            this.statusNotify = true;
            this.title = 1;
            setTimeout(() => {
              this.statusNotify = false;
            }, 2000);
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
            <ListUserComponent
              data={this.data.rows}
              isSearch={this.isSearch}
              search={this.search}
              totalPage={this.totalPage}
              page={this.page}
              callBack={this.callBack}
            />
          ) : (
            <div style={{ minHeight: "100vh" }}>
              <LoadComponent />
            </div>
          )}
          {this.statusNotify ? (
            <div
              className={
                this.title == 0 ? "alert alert-success" : "alert alert-false"
              }
              role="alert"
              style={{ position: "fixed", top: 100, right: 20 }}
            >
              {this.title == 0 ? "Thành công !" : "Không thành công !"}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
