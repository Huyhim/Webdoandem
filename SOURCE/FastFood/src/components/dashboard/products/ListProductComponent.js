import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Link, Router } from "../../../routes/routes";
import ReactHtmlParser from "react-html-parser";
// import "./product.scss";
@inject("store")
@observer
class Item extends React.Component {
  render() {
    const { index, item, callBack } = this.props;
    return (
      <tr>
        {/* <td>
          <span
            className="d-block"
            style={{
              maxWidth: '100px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              height: '16px',
              lineHeight: '16px'
            }}
            title={item.id || ''}
          >
            {item.id || ''}
          </span>
        </td> */}
        <td
          className=""
          // onClick={() => {
          //   callBack('CLICK_ITEM', { index, item });
          // }}
        >
          <a
            href={"/admin/detail-product?id=" + item.id}
            className="colorDefault cursor"
            style={{ textDecoration: "none" }}
          >
            {item.name || ""}
          </a>
        </td>
        <td> {item.highlight == 0 ? "true" : "false"} </td>
        <td style={{}}>
          {item.image.length} hình ảnh
          {/* {item.image.map(e => {
            return (
              <p
                className="mb-1"
                style={{
                  maxWidth: '150px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  height: '16px',
                  lineHeight: '16px'
                }}
              >
                {e}
              </p>
            )
          })} */}
        </td>
        <td>{item.price}</td>
        <td style={{}}>
          {item.type.map(e => {
            return (
              <p className="mb-1" style={{}}>
                {" "}
                {e}{" "}
              </p>
            );
          })}
        </td>
        <td>
          {item.status == 0 ? (
            <span style={{ color: "darkblue" }}>Còn hàng</span>
          ) : (
            <span style={{ color: "red" }}>Hết hàng</span>
          )}
        </td>
        <td>
          <p
            className="mb-0 description"
            style={{
              maxWidth: "200px"
            }}
          >
            {ReactHtmlParser(item.description)}
          </p>
        </td>
        <td>
          {this.props.store.dataCategory.map((e, i) => {
            if (e.key == item.category) return e.name;
          })}
        </td>
        <td>
          <img
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              this.props.clickItem({ item, index });
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

@inject("store")
@observer
export default class ListProductComponent extends React.Component {
  @observable isRender = false;
  @observable data = [];
  @observable search = "";
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.search = this.props.search;
    console.log(JSON.stringify(this.search));
    this.isRender = true;
  }
  componentDidMount() {}
  pagination = () => {
    let pagi = [];
    for (let index = 0; index < this.props.totalPage; index++) {
      if (this.props.page == index + 1) {
        pagi.push(
          <span className="border bgDefault colorWhite rounded py-1 px-2 mx-1">
            {index + 1}
          </span>
        );
      } else {
        pagi.push(
          <span
            className="border border-dark rounded p-1 py-1 px-2 mx-1 cursor"
            onClick={() => {
              this.props.callBack("NEXT_PAGE", index + 1);
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
          <div className="py-4 font">
            <div className="px-5">
              <button className="bgDefault  p-2 px-3 rounded cursor">
                <a
                  href="/admin/detail-product"
                  className="colorWhite"
                  style={{ textDecoration: "none" }}
                >
                  Thêm món
                </a>
              </button>
              <div className="row pt-4">
                <div className="col-6 px-0">
                  <div className="row  align-items-center mb-3 ">
                    <div className="col-3 px-0">
                      <span className="font">Tên sản phẩm</span>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="w-75 form-control font"
                        style={{}}
                        value={this.search.name}
                        onChange={e => {
                          this.search.name = e.target.value;
                        }}
                        onKeyPress={({ charCode }) => {
                          if (charCode === 13) {
                            callBack("SEARCH", this.search);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row  align-items-center">
                    <div className="col-3 px-0">
                      <span className="font">Trạng thái</span>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="w-75 custom-select font"
                        onChange={e => {
                          this.search.status = e.target.value;
                        }}
                      >
                        <option
                          value=""
                          selected={this.search.status == "" ? true : false}
                        >
                          ----
                        </option>
                        <option
                          value="0"
                          selected={this.search.status == "0" ? true : false}
                        >
                          Còn hàng
                        </option>
                        <option
                          value="1"
                          selected={this.search.status == "1" ? true : false}
                        >
                          Hết hàng
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row  align-items-center">
                    <div className="col-4">
                      <span className="font">Danh mục</span>
                    </div>
                    <div className="col-8">
                      <select
                        type="text"
                        className="w-75 custom-select font"
                        onChange={e => {
                          this.search.category = e.target.value;
                        }}
                      >
                        <option
                          value=""
                          selected={this.search.category == "" ? true : false}
                        >
                          ----
                        </option>
                        {this.props.store.dataCategory.map((item, index) => {
                          return (
                            <option
                              value={item.key}
                              selected={
                                this.search.category == item.key ? true : false
                              }
                            >
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end mb-4 pr-5">
                <button
                  onClick={() => {
                    callBack("SEARCH", this.search);
                  }}
                  className="bgDefault colorWhite p-2 px-3 mr-3 rounded cursor"
                >
                  Tìm kiếm
                </button>
                {this.props.isSearch ? (
                  <button
                    onClick={() => {
                      callBack("BACK_ALL");
                    }}
                    className="bgDefault colorWhite p-2 px-3 rounded cursor"
                  >
                    Tất cả sản phẩm
                  </button>
                ) : null}
              </div>
            </div>
            <table className="table table-bordered text-center font">
              <thead className="thead-light">
                <tr>
                  {/* <th scope="col">id</th> */}
                  <th scope="col">Tên SP</th>
                  <th scope="col">Hot</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Phân loại hàng</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Danh mục</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {this.data.map((item, index) => {
                  return (
                    <Item
                      item={item}
                      index={index}
                      callBack={callBack}
                      clickItem={({ item, index }) => {
                        this.clickItem = { item: item, index: index };
                      }}
                    />
                  );
                })}

                {this.data.length == 0 ? (
                  <td colSpan="10">Không có sản phẩm nào</td>
                ) : null}
              </tbody>
            </table>
            <div className="float-right mb-3 mr-3">{this.pagination()}</div>

            {/* <!-- Modal --> */}
            <div
              ref="myModal"
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body pt-5 pb-4 text-center">
                    Bạn có chắc chắn muốn xóa sản phẩm này !
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={() => {
                        this.props.callBack("DEL_ITEM", this.clickItem);
                      }}
                      data-dismiss="modal"
                      type="button"
                      className="btn btn-primary"
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
