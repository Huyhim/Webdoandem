import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link, Router } from '../../../routes/routes';
// import './order.scss';
import moment from 'moment';
import { unixToTime } from '../../../utils/convertTime';
@inject('store')
@observer
class Item extends React.Component {
  render() {
    const { index, item, callBack } = this.props;
    return (
      <tr>
        <td className="" style={{ maxWidth: 150, textOverflow: 'ellipsis', overflow: 'hidden' }}>
          <a
            title={item.id}
            href={'/admin/detail-order?id=' + item.id}
            className="colorDefault cursor"
            style={{ textDecoration: 'none' }}
          >
            {item.id}
          </a>
        </td>
        <td style={{ maxWidth: 150, textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {item.idUser ? (
            <a href={'/admin/detail-user?id=' + item.idUser} title={item.idUser ? item.idUser : ''}>
              {item.idUser}{' '}
            </a>
          ) : (
            'Khách hàng chưa có tài khoản'
          )}
        </td>
        <td>{item.user.name ? item.user.name : null}</td>
        <td>{item.user.phone ? item.user.phone : null}</td>
        <td>{item.user.address ? item.user.address : null}</td>

        <td>
          {item.products.map((e, i) => {
            return (
              <p className="mb-0">
                {e.name} - {e.amount}
                {e.typeSize ? ' - ' : null}
                {e.typeSize ? e.typeSize.find(e => e.status == true).name : null}
                {/* {e.size.map(size => {
                  return { size };
                })} */}
                {/* {JSON.stringify(e.typeSize)} */}
              </p>
            );
          })}
        </td>
        <td>{item.message}</td>
        <td>
          {item.statusOrder.map(e => {
            if (e.status == 0) {
              return (
                <p className="mb-0">
                  Đang chờ xử lý - {unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            } else if (e.status == 1) {
              return (
                <p className="mb-0">
                  Xác nhận - {unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            } else {
              return (
                <p className="mb-0">
                  Hủy đơn - {unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            }
          })}
        </td>
        <td>
          {item.statusShip.map(e => {
            if (e.status == 0) {
              return (
                <p className="mb-0">
                  Đang giao - {unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            } else if (e.status == 1) {
              return (
                <p className="mb-0">
                  Đã nhận -{unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            } else if (e.status == 2) {
              return (
                <p className="mb-0">
                  Hủy đơn - {unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            } else {
              return (
                <p className="mb-0">
                  Đang chờ xử lý - {unixToTime(e.time)} {e.name != '' ? ' - ' + e.name : null}
                </p>
              );
            }
          })}
        </td>
        <td>{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
        <td>
          <img
            onClick={() => {
              callBack('DEL_ITEM', { index, item });
            }}
            className="cursor"
            style={{ width: 25 }}
            src="../../../static/images/remove.png"
          />
        </td>
      </tr>
    );
  }
}

@inject('store')
@observer
export default class OrderProductComponent extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable search = {};
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.search = this.props.search;
  }
  componentDidMount() {
    this.isRender = true;
  }
  pagination = () => {
    let pagi = [];
    for (let index = 0; index < this.props.totalPage; index++) {
      if (this.props.page == index + 1) {
        pagi.push(
          <span className="border bgDefault colorWhite rounded py-1 px-2 mx-1">{index + 1}</span>
        );
      } else {
        pagi.push(
          <span
            className="border border-dark rounded p-1 py-1 px-2 mx-1 cursor"
            onClick={() => {
              this.props.callBack('NEXT_PAGE', index + 1);
            }}
          >
            {index + 1}
          </span>
        );
      }
    }
    return pagi;
  };
  render() {
    const { callBack } = this.props;
    return (
      <div>
        {this.isRender ? (
          <div className="font">
            {/*  <div className="px-5">
             <div className="row pt-4">
                <div className="col-5 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên khách hàng</span>
                    </div>
                    <div className="col-9">
                      <input
                        name="name"
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        onChange={e => {
                          this.search.name = e.target.value;
                        }}
                        onKeyPress={({ charCode }) => {
                          if (charCode === 13) {
                            callBack('SEARCH', this.search);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Số điện thoại khách hàng</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        onChange={e => {
                          this.search.phone = e.target.value;
                        }}
                        onKeyPress={({ charCode }) => {
                          if (charCode === 13) {
                            callBack('SEARCH', this.search);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-7">
                  <div className="row align-items-center mb-3">
                    <div className="col-3 px-0">
                      <span className="font">Tình trạng</span>
                    </div>
                    <div className="col-8">
                      <select
                        type="text"
                        className="w-75 custom-select font"
                        onChange={e => {
                          this.search.statusOrder = e.target.value;
                        }}
                      >
                        <option value="" selected={this.search.statusOrder == '' ? true : false}>
                          -----
                        </option>
                        <option value="0" selected={this.search.statusOrder == '0' ? true : false}>
                          Đang chờ xử lý
                        </option>
                        <option value="1" selected={this.search.statusOrder == '1' ? true : false}>
                          Xác nhận
                        </option>
                        <option value="2" selected={this.search.statusOrder == '2' ? true : false}>
                          Hủy đơn
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row  align-items-center">
                    <div className="col-3 px-0">
                      <span className="font">Tình trạng giao</span>
                    </div>
                    <div className="col-8">
                      <select
                        type="text"
                        className="w-75 custom-select font"
                        onChange={e => {
                          this.search.statusShip = e.target.value;
                        }}
                      >
                        <option value="" selected={this.search.statusShip == '' ? true : false}>
                          -----
                        </option>
                        <option value="0" selected={this.search.statusShip == '0' ? true : false}>
                          Đang giao
                        </option>
                        <option value="1" selected={this.search.statusShip == '1' ? true : false}>
                          Đã nhận
                        </option>
                        <option value="2" selected={this.search.statusShip == '2' ? true : false}>
                          Hủy đơn
                        </option>
                        <option value="3" selected={this.search.statusShip == '3' ? true : false}>
                          Đang chờ xử lý
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end mb-4 pr-5 mt-3">
                <button
                  className="bgDefault colorWhite p-2 px-3 mr-3 rounded cursor"
                  onClick={() => {
                    callBack('SEARCH', this.search);
                  }}
                >
                  Tìm kiếm
                </button>
                {this.props.isSearch ? (
                  <button
                    onClick={() => {
                      callBack('BACK_ALL');
                    }}
                    className="bgDefault colorWhite p-2 px-3 rounded cursor"
                  >
                    Tất cả đơn hàng
                  </button>
                ) : null}
              </div>
            </div> */}
            <div className="w-100" style={{ overflowX: 'scroll' }}>
              <table className="table table-bordered text-center font" style={{ minWidth: 1200 }}>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Mã tài khoản</th>
                    <th scope="col">Tên người nhận</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Lời nhắn</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Trạng thái giao hàng</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {this.data.map((item, index) => {
                    return <Item item={item} index={index} callBack={callBack} />;
                  })}
                  {this.data.length == 0 ? <td colSpan="10">Không có sản phẩm nào</td> : null}
                </tbody>
              </table>
            </div>{' '}
            <div className="float-right my-3 mr-3">{this.pagination()}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
