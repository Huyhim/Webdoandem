import React from 'react';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { getPathName, getQuery, getAllUrlParams, intentPage } from '../utils/RouterUtils';
import { getProduct } from '../api/Product';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import HeaderProductComponent from '../components/header/HeaderProductComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import DetailProductComponent from '../components/products/DetailProductComponent';
import FooterComponent from '../components/general/FooterComponent';
@inject('store')
@observer
export default class DetailProduct extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable dataLike = [];
  @observable dataMore = [];
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let getParam = getAllUrlParams(window.location.href).id || '';
    if (getParam != undefined && getParam != '') {
      getProduct(getParam).then(res => {
        this.data = res;
        if (this.props.store.dataCategory.length == 0) {
          this.props.store.getCategoriesAPI(() => {});
        }
        this.isRender = true;
        this.props.store.getAllProductsAPI(res => {
          this.dataMore = res.filter(e => e.category == this.data.category);
          this.dataLike = res.filter(e => e.highlight == '0');
        });
        console.log('getProduct' + JSON.stringify(this.data));
      });
    } else {
      this.isRender = true;
    }
    if (localStorage.getItem('myCartFF'))
      this.props.store.myCart = JSON.parse(localStorage.myCartFF);
  }
  callBack = (key, data) => {
    switch (key) {
      case 'ADD_CART':
        let existProduct = this.props.store.myCart.filter(e => e.id == data.id);
        if (existProduct !== undefined && existProduct.length > 0) {
          if (existProduct[0].type && existProduct[0].type.length > 0) {
            let typeData = data.typeSize.find(item => item.status == true).name;
            let exist = 0;
            for (let index = 0; index < existProduct.length; index++) {
              const element = existProduct[index];
              let check = element.typeSize.find(item => item.status == true).name;

              if (check == typeData) {
                element.amount += data.amount;
                exist = 1;
                break;
              }
            }
            if (exist == 0) {
              this.props.store.myCart.push(data);
            }
          } else {
            console.log(existProduct[0].amount + '----' + data.amount);
            existProduct[0].amount = parseInt(existProduct[0].amount) + parseInt(data.amount);
          }
        } else {
          console.log(data);
          if (data.amount) {
            this.props.store.myCart.push(data);
          } else {
            let addProduct = { ...data, amount: 1 };
            this.props.store.myCart.push(addProduct);
          }
        }

        localStorage['myCartFF'] = JSON.stringify(this.props.store.myCart);

        this.statusAddCart = true;
        this.titleAddCart = 0;
        setTimeout(() => {
          this.statusAddCart = false;
        }, 1000);
        break;
      case 'SEARCH':
        intentPage('/products', { search: data });
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
            <DetailProductComponent
              data={this.data}
              dataLike={this.dataLike}
              dataMore={this.dataMore}
              callBack={this.callBack}
            />
            <FooterComponent />
            {this.statusAddCart ? (
              <div
                className={this.titleAddCart == 0 ? 'alert alert-success' : 'alert alert-false'}
                role="alert"
                style={{ position: 'fixed', top: 100, right: 20 }}
              >
                {this.titleAddCart == 0 ? 'Thêm thành công !' : 'Không thành công !'}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
