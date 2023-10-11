import React from "react";

import { observable } from "mobx";

import { inject, observer } from "mobx-react";
import {
  getPathName,
  getQuery,
  intentPageString,
  intentPage
} from "../utils/RouterUtils";
import FooterComponent from "../components/general/FooterComponent";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import HeaderProductComponent from "../components/header/HeaderProductComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import BannerComponent from "../components/home/BannerComponent";
import ProductComponent from "../components/products/ProductComponent";
import LoadComponent from "../components/general/LoadComponent";
import { searchProduct } from "../api/Product";
@inject("store")
@observer
export default class Products extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  @observable page = 1;
  @observable limit = 20;
  @observable searchTxt = "";
  constructor(props) {
    super(props);
    if (
      this.props.store.dataCategory &&
      this.props.store.dataCategory.length == 0
    ) {
      this.props.store.getCategoriesAPI(() => {});
    }
  }
  componentDidMount() {
    let query = getQuery("search");
    this.searchTxt = query;
    this.getProductSearch(query);

    if (localStorage.getItem("myCartFF"))
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
  }
  getProductSearch = query => {
    this.isRender = false;
    this.props.store.getAllProductsAPI(res => {
      let pathName = getPathName();
      if (query && query != "") {
        this.search(this.page, this.limit, query);
      } else {
        if (pathName == "/products/food") {
          this.data = this.props.store.dataProducts.filter(
            e => e.category == "food"
          );
        } else if (pathName == "/products/drink") {
          this.data = this.props.store.dataProducts.filter(
            e => e.category == "drink"
          );
        } else if (pathName == "/products/combo") {
          this.data = this.props.store.dataProducts.filter(
            e => e.category == "combo"
          );
        } else if (pathName == "/products/highlight") {
          this.data = this.props.store.dataProducts.filter(
            e => e.highlight == "0"
          );
        } else if (pathName == "/products/topbuy") {
          this.data = this.props.store.productTopBuy;
        } else {
          this.data = this.props.store.dataProducts;
        }
        this.isRender = true;
      }
    });
  };
  search = (page, limit, query) => {
    searchProduct({ page: page, limit: limit, query: query })
      .then(res => {
        if (res) {
          this.data = res.rows;
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
      case "ADD_CART":
        try {
          if (
            this.props.store.myCart.find(e => e.id == data.item.id) !==
            undefined
          ) {
            this.props.store.myCart.find(e => e.id == data.item.id).amount += 1;
            // alert(JSON.stringify(this.props.store.myCart.find(e => e.id == data.item.id)));
          } else {
            let addProduct = { ...data.item, amount: 1 };
            this.props.store.myCart.push(addProduct);
          }
          localStorage["myCartFF"] = JSON.stringify(this.props.store.myCart);

          this.statusAddCart = true;

          // console.log(JSON.stringify(this.props.store.myCart));
        } catch (error) {
          this.statusAddCart = false;
        }
        setTimeout(() => {
          this.statusAddCart = false;
        }, 1000);
        break;
      case "DIREC":
        intentPageString(data);
        this.getProductSearch();
        break;
      case "SEARCH":
        this.isRender = false;
        intentPage("/products", { search: data });
        this.searchTxt = data;
        this.getProductSearch(data);
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
            <BannerComponent
              searchTxt={this.searchTxt}
              callBack={this.callBack}
            />
            <ProductComponent data={this.data} callBack={this.callBack} />
            <FooterComponent />
            {this.statusAddCart ? (
              <div
                className={
                  this.titleAddCart == 0
                    ? "alert alert-success"
                    : "alert alert-false"
                }
                role="alert"
                style={{ position: "fixed", top: 100, right: 20 }}
              >
                {this.titleAddCart == 0
                  ? "Thêm thành công !"
                  : "Không thành công !"}
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
