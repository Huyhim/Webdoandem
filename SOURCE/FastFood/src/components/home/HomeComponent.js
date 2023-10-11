import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { intentPageString } from '../../utils/RouterUtils';
import { Link, Router } from '../../routes/routes';
import LoadComponent from '../general/LoadComponent';
import ItemProductComponent from '../products/ItemProductComponent';
// import '../products/products.scss';
// import './home.scss';
import CategoryLeftComponent from './CategoryLeftComponent';

@observer
class Item extends React.Component {
  @observable isRender = false;
  constructor(props) {
    super(props);
  }

  render() {
    const { item, index } = this.props;
    return (
      <div className="col-3 product-item-home mb-4" style={{ height: 200 }}>
        <div className="product-item-cover " style={{ height: '100%', width: '100%' }}>
          <a href={'/detail-products?id=' + item.id}>
            <img
              className="cursor"
              src={item.image[0] || '../../static/images/bannerHome.jpg'}
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </a>
        </div>
        <div className="row product-item-txt w-100 pr-4">
          <div className="col-12">
            <h5 className="font-weight-bold  cursor">
              <a
                href={'/detail-products?id=' + item.id}
                className="colorWhite"
                style={{ textDecoration: 'none' }}
              >
                {item.name}
              </a>
            </h5>

            <p className="colorWhite">{item.price}đ</p>
          </div>
          {/* <div className="col-4 align-self-center text-right">
            <button
              className="cursor"
              onClick={() => {
                if (item.type && item.type.length > 0) {
                  intentPageString('/detail-products?id=' + item.id)
                } else {
                  this.props.callBack('ADD_CART', { item, index })
                }
              }}
            >
              <img
                style={{ width: 25, height: 25 }}
                src="../../static/images/icons-add-shopping-cart.png"
                title="Thêm vào giỏ"
              />
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

@inject('store')
@observer
export default class HomeComponent extends React.Component {
  @observable isRender = false;
  @observable data = [];

  constructor(props) {
    super(props);
    this.isRender = true;
    this.data = this.props.data;
  }

  render() {
    return (
      <div className="product w-100 font">
        {this.isRender ? (
          <div className="">
            <div className="limit">
              <div className="mx-4 my-3">
                {this.props.dataFavourite.length > 0 ? (
                  <h4 style={{ color: '' }}>Hôm nay ăn gì ?</h4>
                ) : null}
              </div>
              <div className="row">
                {this.props.dataFavourite.map((e, i) => {
                  if (i < 4) return <Item item={e} index={i} callBack={this.props.callBack} />;
                })}
              </div>{' '}
              {this.props.dataFavourite.length > 4 ? (
                <a
                  href="/products/highlight"
                  className="text-right w-100 d-inline-block px-3"
                  style={{ color: 'gray' }}
                >
                  Xem thêm
                </a>
              ) : null}
            </div>
            <div className="limit">
              <div className="mx-4 my-3">
                {this.props.store.productTopBuy.length > 0 ? (
                  <h4 style={{ color: '' }}>Sản phẩm được mua nhiều nhất ?</h4>
                ) : null}
              </div>
              <div className="row">
                {this.props.store.productTopBuy.map((e, i) => {
                  if (i < 8) return <Item item={e} index={i} callBack={this.props.callBack} />;
                })}
              </div>{' '}
              {this.props.store.productTopBuy.length > 4 ? (
                <a
                  href="/products/topbuy"
                  className="text-right w-100 d-inline-block px-3"
                  style={{ color: 'gray' }}
                >
                  Xem thêm
                </a>
              ) : null}
            </div>
            <div className="limit">
              <div className="row">
                <div className="col-2">
                  <CategoryLeftComponent />
                </div>
                <div className="col-10  border-left border-secondary ">
                  {this.data.map((item, index) => {
                    if (item.data && item.data.length > 0)
                      return (
                        <div>
                          <div className="mx-4">
                            <h4>{item.title}</h4>
                            <hr className="my-1" />
                          </div>
                          <div className="row py-3">
                            {item.data.map((e, i) => {
                              if (i < 10)
                                return (
                                  <div className="p-3" style={{ width: '20%' }}>
                                    <ItemProductComponent
                                      item={e}
                                      index={i}
                                      callBack={this.props.callBack}
                                    />
                                  </div>
                                );
                              return null;
                            })}
                          </div>
                          {item.data.length > 10 ? (
                            <div className="view-more mr-5 mb-4 text-right">
                              <a href={'/products/' + item.query}>
                                <i className="colorDefault">Xem thêm</i>
                              </a>
                            </div>
                          ) : null}
                        </div>
                      );
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    );
  }
}
