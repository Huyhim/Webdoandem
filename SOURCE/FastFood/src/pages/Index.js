import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { getPathName } from "../utils/RouterUtils";
import { Link, Router } from "../routes/routes";
import Config from "../config/env";
import HeaderComponent from "../components/header/HeaderComponent";
import BannerComponent from "../components/home/BannerComponent";
import HomeComponent from "../components/home/HomeComponent";
import LoadComponent from "../components/general/LoadComponent";
import FooterComponent from "../components/general/FooterComponent";
import { intentPageString, intentPage } from "../utils/RouterUtils";
@inject("store")
@observer
export default class Index extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable dataFavourite = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  constructor(props) {
    super(props);
    if (this.props.store.dataCategory.length == 0) {
      this.props.store.initApp();
    }
  }
  componentDidMount() {
    // if (this.props.store.isRender) {

    if (localStorage.getItem("myCartFF"))
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
    this.props.store.getCategoriesAPI(res => {
      this.props.store.dataCategory.forEach((item, index) => {
        this.data.push({
          title: item.name || "",
          data: [],
          query: item.key || ""
        });
      });
      this.props.store.getAllProductsAPI(res => {
        console.log("getAllProductsAPI", JSON.stringify(res.length));
        for (
          let index = 0;
          index < this.props.store.dataProducts.length;
          index++
        ) {
          let element = this.props.store.dataProducts[index];
          if (element.highlight == "0") {
            this.dataFavourite.push(element);
          }
          if (
            element.category == this.data[0].query &&
            this.data[0].data.length < 11
          ) {
            this.data[0].data.push(element);
          } else if (
            element.category == this.data[1].query &&
            this.data[1].data.length < 11
          ) {
            this.data[1].data.push(element);
          } else if (
            element.category == this.data[2].query &&
            this.data[2].data.length < 11
          ) {
            this.data[2].data.push(element);
          } else {
          }
        }

        this.isRender = true;
      });
    });
    console.log("componentDidMount" + JSON.stringify(this.props.store.myCart));

    // this.props.store.checkStatusMenu();
    // }
  }
  callBack = (key, data) => {
    switch (key) {
      case "ADD_CART":
        try {
          if (
            this.props.store.myCart.find(e => e.id == data.item.id) !==
            undefined
          ) {
            this.props.store.myCart.find(e => e.id == data.item.id).amount += 1;
          } else {
            let addProduct = { ...data.item, amount: 1 };
            this.props.store.myCart.push(addProduct);
          }
          localStorage["myCartFF"] = JSON.stringify(this.props.store.myCart);
          this.statusAddCart = true;
        } catch (error) {
          this.statusAddCart = false;
        }
        setTimeout(() => {
          this.statusAddCart = false;
        }, 1000);
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
            <HeaderComponent />
            <BannerComponent callBack={this.callBack} />
            <HomeComponent
              data={this.data}
              dataFavourite={this.dataFavourite}
              callBack={this.callBack}
            />
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
          <div>
            <LoadComponent />
          </div>
        )}
      </div>
    );
  }
}
