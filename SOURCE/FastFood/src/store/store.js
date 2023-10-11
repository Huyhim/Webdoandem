import { action, observable, observe } from "mobx";
import Promise from "bluebird";
// var join = Promise.join
// var fs = Promise.promisifyAll(require('fs'))
// import { fs } from 'fs'
// const fs = require('fs')
import Config from "../config/env";
import { getPathName, getQuery } from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import { getCategories } from "../api/Category";
import { getAllProducts, queryProduct } from "../api/Product";
import { getAllCustomers, getCustomer, createCustomer } from "../api/Customer";
import { getAllOrders } from "../api/Order";
let store = null;

class Store {
  @observable isServer = false;
  @observable isRender = false;
  @observable token = "";
  @observable user = "";
  @observable dataProducts = [];
  @observable dataProductLimit = [];
  @observable productTopBuy = [];
  @observable dataMenu = [
    {
      name: "Trang chủ",
      icon: "",
      key: "TrangChu",
      active: false,
      directional: "/"
    },
    {
      name: "Sản phẩm",
      icon: "",
      key: "SanPham",
      active: false,
      directional: "/products",
      children: this.dataCategory
    }
  ];
  @observable dataCategory = [];
  @observable myCart = [];
  @observable list = [
    {
      name: "Chờ lấy hàng",
      key: "waiting",
      status: true
    },
    {
      name: "Đang giao",
      key: "ordering",
      status: false
    },
    {
      name: "Đã nhận",
      key: "receive",
      status: false
    },
    {
      name: "Đã hủy",
      key: "cancel",
      status: false
    }
  ];
  // admin
  @observable admin = "";
  @observable dataMenuDashboard = [
    {
      name: "Dashboard",
      icon: "",
      key: "Dashboard",
      active: false,
      directional: "/admin/dashboard",
      children: []
    },
    {
      name: "Sản phẩm",
      icon: "",
      key: "SanPham",
      active: false,
      directional: "/admin/products",
      children: []
    },
    {
      name: "Đơn hàng",
      icon: "",
      key: "DonHang",
      active: false,
      directional: "/admin/orders"
    },
    {
      name: "Người dùng",
      icon: "",
      key: "User",
      active: false,
      directional: "/admin/users"
    },
    {
      name: "Tài khoản",
      icon: "",
      key: "Profile",
      active: false,
      directional: "/admin/detail-user"
    }
  ];
  @observable dataOrdersDashboard = [];
  @observable dataOrderAll = [];
  @observable dataCustomersDashboard = [];
  constructor(obj) {
    const self = this;
  }
  // AsyncStorage

  // @action
  // setLogin = (res, role) => {
  //   if (res.code == 1) {
  //     if (res.data.user.isValidated) {
  //       this.user = res.data.user
  //       this.token = res.data.token
  //       setToken(res.data.token)
  //       setData(Config.asyncStorage.user, JSON.stringify(this.user))

  //       if (role === Config.role.employ || role === Config.role.admin) {
  //         Router.pushRoute('/infor/tuyen-dung')
  //       } else {
  //         if (this.user.phone != undefined) {
  //           Router.pushRoute('/dashboard-sv/view-cv')
  //         } else {
  //           Router.pushRoute('/dashboard-sv/edit-cv?id=' + this.user.id)
  //         }
  //       }
  //     } else {
  //       Router.pushRoute('/login/fail')
  //     }
  //   }
  // }
  // @action
  // setLogOut = () => {
  //   unsetToken()
  //   this.user = {}

  //   setData(Config.asyncStorage.user, JSON.stringify(this.user))
  //   Router.pushRoute('/log-in')
  // }

  @action
  checkUser = (key, callBack) => {
    switch (key) {
      case "admin":
        if (this.admin != "" && this.admin.id) {
        } else {
          if (localStorage.getItem("adminFF")) {
            console.log(JSON.parse(localStorage.adminFF));
            this.admin = JSON.parse(localStorage.adminFF);
          } else {
            Router.pushRoute("/admin/login");
            return;
          }
        }

        callBack();

        break;
      case "customer":
        if (this.user != "" && this.user.id) {
          callBack();
        } else {
          if (localStorage.getItem("userFF")) {
            console.log(localStorage.userFF);
            getCustomer(localStorage.userFF)
              .then(res => {
                this.user = res;
                console.log("this.user", JSON.stringify(this.user));
                callBack();
              })
              .catch(err => {
                this.user = {};
                console.log(err);
                callBack();
              });
          } else {
            this.user = {};
            callBack();
          }
        }

        break;
      default:
        break;
    }
  };

  @action
  logout = (key, callBack) => {
    switch (key) {
      case "admin":
        localStorage.removeItem("adminFF");

        break;
      case "customer":
        localStorage.removeItem("userFF");

        break;
      default:
        break;
    }
  };
  @action
  getCategoriesAPI(callBack) {
    getCategories().then(res => {
      if (res) {
        this.dataCategory = res.rows.map((item, index) => {
          return { ...item, active: false };
        });
        this.dataMenu[1].children = this.dataCategory;
        callBack(this.dataCategory);
        console.log("getCategories " + JSON.stringify(this.dataCategory));
      } else {
        console.log(res);
      }
    });
  }

  @action
  getAllProductsAPI(callBack) {
    if (this.dataProducts.length > 0) {
      callBack(this.dataProducts);
    } else {
      getAllProducts()
        .then(res => {
          if (res) {
            this.dataProducts = res.rows;
            this.productTopBuy = this.dataProducts.sort(function(a, b) {
              return b.topBuy - a.topBuy;
            });
            callBack(this.dataProducts);
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  @action
  getOrdersAPI = async () => {
    const dataOrders = await getAllOrders();
    Promise.all(
      dataOrders.rows.map(async order => {
        const user = await getCustomer(order.idUser);
        order = { ...order, customer: user };
        this.dataOrdersDashboard.push(order);
        // console.log('idUser' + JSON.stringify(order))
      })
    ).then(res => {
      console.log("dataOrders" + JSON.stringify(this.dataOrdersDashboard));
    });
  };

  @action
  getAllOrdersAPI = callBack => {
    if (this.dataOrderAll.length > 0) {
      callBack(this.dataOrderAll);
    } else {
      getAllOrders().then(res => {
        this.dataOrderAll = res.rows;
        callBack(this.dataOrderAll);
      });
    }
  };
  @action
  checkStatusMenu = () => {
    let pathName = getPathName();

    this.dataMenu.map((item, index) => {
      if (pathName == "" || "/") {
        this.dataMenu[0].active = true;
      } else if (pathName.slice(9) == "/products") {
        this.dataMenu[1].active = true;
      } else {
        item.active = false;
      }
    });
  };
  @action
  getAllCustomerAPI = callBack => {
    if (this.dataCustomersDashboard.length > 0) {
      callBack(this.dataCustomersDashboard);
    } else {
      getAllCustomers().then(res => {
        this.dataCustomersDashboard = res.rows;
        callBack(this.dataCustomersDashboard);
      });
    }
    getAllCustomers().then(res => {});
  };
  @action
  initApp = async () => {
    await getCategories().then(res => {
      if (res) {
        this.dataCategory = res.rows.map((item, index) => {
          return { ...item, active: false };
        });
        this.dataMenu[1].children = this.dataCategory;
        // this.isRender = true;
        console.log("dataCategory " + JSON.stringify(this.dataCategory));
      } else {
        console.log(res);
      }
    });
    //   if (process.browser) {
    //     if (this.token) {
    //       const user = getData(Config.asyncStorage.user)
    //       if (user != undefined) {
    //         this.user = JSON.parse(user)
    //       }
    //       retrieveCurrentUser(this).then(res => {
    //         if (res.code == 1) {
    //           this.user = res.data
    //           ////console.log('USSSER' + JSON.stringify(this.user));
    //         } else {
    //         }
    //       })
    //     }
    //   }

    //   await retrieveCareers().then(data => {
    //     this.careers = data.data.rows
    //   })
    //   await getAllField().then(res => {
    //     this.fields = res.data
    //   })
    //   await getAllTag().then(res => {
    //     this.tags = res.data
    //   })
    await getAllProducts().then(res => {
      if (res) {
        this.dataProducts = res.rows;
      } else {
        console.log(res);
      }
    });
  };
}

export function initializeStore(obj) {
  if (obj.isServer) {
    return new Store(obj);
  } else {
    if (store === null) {
      store = new Store(obj);
    }
    return store;
  }
}
