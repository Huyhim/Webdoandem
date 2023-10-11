import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../routes/routes';
import LoadComponent from '../general/LoadComponent';
import ItemProductComponent from './ItemProductComponent';
// import './products.scss';
import CategoryLeftComponent from '../home/CategoryLeftComponent';
@inject('store')
@observer
export default class ProductComponent extends React.Component {
  @observable isRender = false;
  @observable data = [];

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.isRender = true;
  }

  render() {
    return (
      <div className="product w-100">
        {this.isRender ? (
          <div className="">
            {/* <ul
              className="menu w-100 m-auto nav nav-pills nav-fill"
              style={{ zIndex: 1 }}
            >
              {this.props.store.dataCategory.map((e, i) => {
                return (
                  <li
                    className="nav-item cursor"
                    onClick={() => {
                      this.props.callBack('DIREC', '/products/' + e.key)
                    }}
                  >
                    <a
                      key={i}
                      className={
                        e.active
                          ? 'nav-link colorDefault'
                          : 'nav-link colorDefault'
                      }
                    >
                      {e.name}
                    </a>
                  </li>
                )
              })}
            </ul> */}
            <div className="limit">
              <div className="row">
                <div className="col-2">
                  <div className="my-4">
                    <CategoryLeftComponent />
                  </div>
                </div>
                <div className="col-10 border-left border-secondary ">
                  {this.data && this.data.length > 0 ? (
                    <div className="row py-3">
                      {this.data.map((e, i) => {
                        return (
                          <div className="p-3" style={{ width: '20%' }}>
                            <ItemProductComponent
                              item={e}
                              index={i}
                              callBack={this.props.callBack}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <h5 className="pt-5 text-center">Không có dữ liệu</h5>
                  )}
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
