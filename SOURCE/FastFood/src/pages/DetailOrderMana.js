import React from 'react';

import { observable } from 'mobx';
import { getOrder, updateOrder } from '../api/Order';
import { getCustomer, updateCustomer } from '../api/Customer';
import { inject, observer } from 'mobx-react';
import { getPathName, getAllUrlParams, intentPage } from '../utils/RouterUtils';
import { Link, Router } from '../routes/routes';
import Config from '../config/env';
import { unixToTime, unitTimeNow, getTimeNow } from '../utils/convertTime';
import MenuLeftComponent from '../components/dashboard/MenuLeftComponent';
import DetailOrderComponent from '../components/dashboard/order/DetailOrderComponent';
@inject('store')
@observer
export default class DetailOrderMana extends React.Component {
  @observable isRender = false;
  @observable data = {};
  @observable statusAddCart = false;
  @observable titleAddCart = 0;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let pathName = getPathName();
    let getParam = getAllUrlParams(window.location.href).id || '';
    console.log('getParam' + getParam);
    if (getParam != undefined && getParam != '') {
      getOrder(getParam).then(res => {
        getCustomer(res.idUser).then(res1 => {
          this.data = { ...res, customer: res1 };
          this.isRender = true;
          console.log('getOrder' + JSON.stringify(this.data));
        });
      });
    } else {
      this.isRender = false;
    }
  }
  callBack = (key, data) => {
    switch (key) {
      case 'UPDATE':
        updateOrder(data).then(res => {
          updateCustomer(data.customer).then(res1 => {
            this.statusAddCart = true;
            setTimeout(() => {
              this.statusAddCart = false;
              intentPage('/admin/orders');
            }, 1000);
            console.log(JSON.stringify(res));
          });
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
            <DetailOrderComponent data={this.data} callBack={this.callBack} />
          ) : (
            <h5 className="pt-5 text-center">Không tìm thấy đơn hàng</h5>
          )}
        </div>
        {this.statusAddCart ? (
          <div
            className={this.titleAddCart == 0 ? 'alert alert-success' : 'alert alert-false'}
            role="alert"
            style={{ position: 'fixed', top: 100, right: 20 }}
          >
            {this.titleAddCart == 0 ? 'Sửa thành công !' : 'Không thành công !'}
          </div>
        ) : null}
      </div>
    );
  }
}
