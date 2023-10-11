import React from "react";

import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { getPathName } from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import { deleteProduct, queryProduct, searchProduct } from "../api/Product";
import MenuLeftComponent from "../components/dashboard/MenuLeftComponent";
import ListProductComponent from "../components/dashboard/products/ListProductComponent";
import LoadComponent from "../components/general/LoadComponent";
@inject("store")
@observer
export default class ProductsMana extends React.Component {
  @observable data = [];
  @observable page = 1;
  @observable limit = 15;
  @observable totalPage = 0;
  @observable isRender = false;
  @observable isSearch = false;
  @observable query = "";
  @observable search = {};
  @observable searchByName = false;
  constructor(props) {
    super(props);

    this.search = {
      name: "",
      status: "",
      category: ""
    };
  }
  componentDidMount() {
    let pathName = getPathName();
    this.props.store.checkUser("admin", () => {
      this.props.store.getCategoriesAPI(res => {});

      this.getProduct(this.page, this.limit);
    });
  }
  getProduct = (p, l, q) => {
    this.isRender = false;
    queryProduct({ page: p, limit: l, query: q }).then(res => {
      if (res) {
        this.data = res;
        this.totalPage = Math.ceil(this.data.count / this.limit);
        this.isRender = true;
      } else {
      }
    });
  };
  searchProductByName = (page, limit, query) => {
    this.isRender = false;
    searchProduct({ page: page, limit: limit, query: query })
      .then(res => {
        if (res) {
          console.log(res);
          this.data = res;
          this.totalPage = Math.ceil(res.count / this.limit);
          this.isRender = true;
        }
      })
      .catch(err => {
        this.data = [];
        this.isRender = true;
        console.log(err);
      });
  };
  callBack = (key, data) => {
    switch (key) {
      case "DEL_ITEM":
        deleteProduct(data.item.id).then(res => {
          this.data.rows.splice(data.index, 1);
        });
        break;
      case "NEXT_PAGE":
        this.page = data;
        console.log(JSON.stringify(this.page));
        if (this.isSearch) {
          if (this.searchByName) {
            this.searchProductByName(this.page, this.limit, this.query);
          } else {
            this.getProduct(this.page, this.limit, this.query);
          }
        } else {
          this.getProduct(this.page, this.limit);
        }

        break;
      case "SEARCH":
        this.isSearch = true;
        this.page = 1;

        if (data.name != "") {
          this.searchByName = true;
          this.query = data.name;
          this.searchProductByName(this.page, this.limit, data.name);
        } else {
          this.query =
            `${data.name ? "&name=" + `${data.name}` : ""}` +
            `${data.status ? "&status=" + data.status : ""}` +
            `${data.category ? "&category=" + data.category : ""}`;
          this.searchByName = false;
          this.getProduct(this.page, this.limit, this.query);
        }

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
          status: "",
          category: ""
        };
        this.getProduct(this.page, this.limit);

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
            <ListProductComponent
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
        </div>
      </div>
    );
  }
}
