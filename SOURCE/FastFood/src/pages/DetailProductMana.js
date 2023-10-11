import React from "react";

import { observable } from "mobx";

import { inject, observer } from "mobx-react";
import { getProduct, createProduct, updateProduct } from "../api/Product";
import {
  getPathName,
  getQuery,
  getAllUrlParams,
  intentPage
} from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import MenuLeftComponent from "../components/dashboard/MenuLeftComponent";
import DetailProductComponent from "../components/dashboard/products/DetailProductComponent";
import LoadCheckComponent from "../components/general/LoadCheckComponent";
@inject("store")
@observer
export default class DetailProductMana extends React.Component {
  @observable isRender = false;
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  @observable data = {
    name: "",
    highlight: false,
    image: [],
    price: "",
    status: 0,
    description: "",
    category: "",
    type: [],
    topBuy: 0
  };
  constructor(props) {
    super(props);
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
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
      getProduct(getParam).then(res => {
        this.data = res;
        if (this.data.highlight == 0) {
          this.data.highlight = true;
        } else {
          this.data.highlight = false;
        }

        this.isRender = true;
        console.log("getProduct" + JSON.stringify(this.data));
      });
    } else {
      this.isRender = true;
    }
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  callBack = (key, data) => {
    switch (key) {
      case "ADD_IMG":
        break;
      case "UPDATE_PRODUCT":
        if (data.name == "" || data.price == "" || data.category == "")
          return alert("Bạn phải nhập đầy đủ thông tin");
        this.statusAddCart = true;
        this.titleAddCart = 0;
        if (data.highlight) {
          data.highlight = 0;
        } else {
          data.highlight = 1;
        }

        updateProduct(data)
          .then(res => {
            if (res) {
              this.titleAddCart = 2;
              setTimeout(() => {
                this.statusAddCart = false;
                intentPage("/admin/products");
              }, 1000);
            }
          })
          .catch(res => {
            this.titleAddCart = 3;
            setTimeout(() => {
              this.statusAddCart = false;
              intentPage("/admin/products");
            }, 1000);
          });
        break;
      case "CREATE_PRODUCT":
        if (data.name == "" || data.price == "" || data.category == "")
          return alert("Bạn phải nhập đầy đủ thông tin");
        this.statusAddCart = true;
        this.titleAddCart = 0;

        if (data.highlight) {
          data.highlight = 0;
        } else {
          data.highlight = 1;
        }

        createProduct(data)
          .then(res => {
            this.data = res;
            if (this.data.highlight == 0) {
              this.data.highlight = true;
            } else {
              this.data.highlight = false;
            }
            this.titleAddCart = 1;

            setTimeout(() => {
              this.statusAddCart = false;
              // intentPage('/admin/products')
            }, 1000);

            console.log(JSON.stringify(res));
          })
          .catch(res => {
            this.titleAddCart = 3;
            this.statusAddCart = true;
            setTimeout(() => {
              this.statusAddCart = false;
              intentPage("/admin/products");
            }, 1000);
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
            <DetailProductComponent data={this.data} callBack={this.callBack} />
          ) : null}
        </div>

        {this.statusAddCart ? (
          <div
            className={
              this.titleAddCart == 0 ||
              this.titleAddCart == 1 ||
              this.titleAddCart == 2
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
            {this.titleAddCart == 0 ? (
              <div className="m-auto">
                <LoadCheckComponent />
              </div>
            ) : this.titleAddCart == 1 ? (
              "Thêm thành công !"
            ) : this.titleAddCart == 2 ? (
              "Sửa thành công !"
            ) : (
              "Không thành công !"
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
