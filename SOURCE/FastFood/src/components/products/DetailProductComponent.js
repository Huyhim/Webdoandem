import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import { intentPageString } from '../../utils/RouterUtils'
import LoadComponent from '../general/LoadComponent'
import ItemProductComponent from './ItemProductComponent'
import ReactHtmlParser from 'react-html-parser'
import $ from 'jquery'

// import './products.scss'
@inject('store')
@observer
export default class DetailProductComponent extends React.Component {
  @observable isRender = false
  @observable numberProduct = 1
  @observable data = []
  @observable checkSize = false
  @observable typeSize = ''
  @observable image = ''

  constructor(props) {
    super(props)
    this.data = this.props.data
    if (this.data.type && this.data.type.length > 0) {
      this.typeSize = this.data.type.map(e => {
        return { name: e, status: false }
      })
    }
    this.image = this.data.image[0] || '../../static/images/bannerHome.jpg'
  }
  componentDidMount() {
    this.isRender = true
  }
  changeInput = data => {
    const { value, name } = data.target

    switch (name) {
      case 'amount':
        this.numberProduct = value
        break

      default:
        break
    }
  }
  render() {
    return (
      <div className="detail-product w-100">
        {this.isRender ? (
          <div className="limit">
            <div className="row">
              <div className="col-10 px-0">
                <div className="detail-product-content  py-5">
                  <div className="row">
                    <div className="col-lg-6 text-center">
                      <img
                        src={this.image}
                        style={{
                          objectFit: 'contain',
                          height: 300,
                          maxWidth: '100%'
                        }}
                      />
                      <div
                        className="my-3 justify-content-center"
                        style={{
                          height: '90px',
                          overflowX: 'auto',
                          overflowY: 'hidden',
                          display: 'inline-flex',
                          width: '100%'
                        }}
                      >
                        {this.data.image.map((e, i) => {
                          return (
                            <img
                              src={e}
                              className="mr-2 cursor"
                              style={{
                                objectFit: 'contain',
                                height: 70
                              }}
                              onClick={() => {
                                this.image = this.data.image[i]
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <h3 className="mb-4">{this.data.name}</h3>
                      <p>
                        Tình trạng :{' '}
                        {this.data.status == 0 ? 'Còn hàng' : 'Hết hàng'}
                      </p>
                      {this.data.type.length > 0 ? (
                        <div className="">
                          <span className="float-left mr-33">
                            Phân loại hàng
                          </span>
                          <div className="">
                            {this.typeSize.map((item, index) => {
                              return (
                                <span
                                  className="mx-2"
                                  style={{ position: 'relative' }}
                                >
                                  <label
                                    for={index}
                                    className="cursor"
                                    style={
                                      item.status
                                        ? {
                                            padding: '5px 10px',
                                            border: '2px solid green',
                                            background: '#fff'
                                          }
                                        : {
                                            padding: '5px 10px',
                                            border: '2px solid gray',
                                            background: '#fff'
                                          }
                                    }
                                    onClick={() => {
                                      this.checkSize = false
                                    }}
                                  >
                                    {item.name}
                                  </label>
                                  <input
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      zIndex: -1
                                    }}
                                    onChange={e => {
                                      const { value, name } = e.target
                                      this.typeSize.map((e1, i1) => {
                                        if (e1.name == value) {
                                          e1.status = true
                                        } else {
                                          e1.status = false
                                        }
                                      })
                                    }}
                                    type="radio"
                                    name="type"
                                    id={index}
                                    value={item.name}
                                  />
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      ) : null}
                      {this.checkSize ? (
                        <p style={{ color: 'red' }}>Bạn chưa chọn loại hàng</p>
                      ) : null}
                      <br />
                      <div className="d-inline-block align-items-center pt-2">
                        <span
                          className="float-left mr-4"
                          style={{ lineHeight: '30px' }}
                        >
                          Số lượng
                        </span>
                        <input
                          type="number"
                          name="amount"
                          className="p-1"
                          min="0"
                          value={this.numberProduct}
                          onChange={e => {
                            this.changeInput(e)
                          }}
                          style={{
                            height: '30px',
                            width: 100,
                            border: '1px solid rgb(180, 180, 180)',
                            borderRadius: '5px'
                          }}
                        />
                      </div>
                      <div className="my-4">
                        <button
                          className="cursor px-3 py-2 float-left bgDefault mr-4"
                          onClick={() => {
                            if (this.typeSize == '') {
                              this.checkSize = false
                              if (this.numberProduct != 0) {
                                this.props.callBack('ADD_CART', {
                                  ...this.data,
                                  amount: this.numberProduct
                                })
                              } else {
                                alert('Bạn chưa chọn số lượng !')
                              }
                            } else if (
                              this.typeSize.find(e => e.status == true) !==
                              undefined
                            ) {
                              this.checkSize = false
                              if (this.numberProduct != 0) {
                                this.props.callBack('ADD_CART', {
                                  ...this.data,
                                  amount: this.numberProduct,
                                  typeSize: this.typeSize
                                })
                                // this.typeSize = this.typeSize.map(e => {
                                //   e.status = false;
                                // });
                              } else {
                                alert('Bạn chưa chọn số lượng !')
                              }
                            } else {
                              this.checkSize = true
                            }
                          }}
                        >
                          <span className="colorWhite">Thêm vào giỏ</span>
                        </button>

                        <button
                          className="cursor px-3 py-2  bgDefault"
                          onClick={() => {
                            if (this.typeSize == '') {
                              this.checkSize = false
                              if (this.numberProduct != 0) {
                                this.props.callBack('ADD_CART', {
                                  ...this.data,
                                  amount: this.numberProduct
                                })
                                intentPageString('/order')
                              } else {
                                alert('Bạn chưa chọn số lượng !')
                              }
                            } else if (
                              this.typeSize.find(e => e.status == true) !==
                              undefined
                            ) {
                              this.checkSize = false
                              if (this.numberProduct != 0) {
                                this.props.callBack('ADD_CART', {
                                  ...this.data,
                                  amount: this.numberProduct,
                                  typeSize: this.typeSize
                                })
                                intentPageString('/order')
                              } else {
                                alert('Bạn chưa chọn số lượng !')
                              }
                            } else {
                              this.checkSize = true
                            }
                          }}
                        >
                          <span className="colorWhite">Mua ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <pre className="my-3 font" style={{ lineHeight: '20px' }}>
                    {ReactHtmlParser(this.data.description)}
                  </pre>
                </div>
                <div className="product-more">
                  <div className="mx-4">
                    <h4>Có thể bạn thích</h4>
                    <hr className="my-1" />
                  </div>

                  <div className="row py-3">
                    {this.props.dataLike.map((e, i) => {
                      return (
                        <div className="p-3" style={{ width: '20%' }}>
                          <ItemProductComponent
                            item={e}
                            index={i}
                            callBack={(key, data) => {
                              this.props.callBack(key, data.item)
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="col-2 py-5">
                <div className="product-more">
                  <div className="">
                    <h5>Sản phẩm tương tự</h5>
                    <hr className="my-1" />
                  </div>

                  <div className="row py-3">
                    {this.props.dataMore.map((e, i) => {
                      let item = this.props.dataMore[Math.floor(Math.random()*this.props.dataMore.length)]
                      if (i < 6)
                        return (
                          <div
                            className="col-12 product-item-home mb-4 px-0"
                            style={{ height: 150 }}
                          >
                            <div
                              className="product-item-cover "
                              style={{ height: '100%', width: '100%' }}
                            >
                              <a href={'/detail-products?id=' + item.id}>
                                <img
                                  className="cursor"
                                  src={
                                    item.image[0] ||
                                    '../../static/images/bannerHome.jpg'
                                  }
                                  style={{
                                    objectFit: 'cover',
                                    height: '100%',
                                    width: '100%'
                                  }}
                                />
                              </a>
                            </div>
                            <div className="row product-item-txt w-100 pr-4">
                              <div className="col-12">
                                <h6 className="font-weight-bold  cursor">
                                  <a
                                    href={'/detail-products?id=' + item.id}
                                    className="colorWhite"
                                    style={{ textDecoration: 'none' }}
                                  >
                                    {item.name}
                                  </a>
                                </h6>

                                <p className="colorWhite">{item.price}đ</p>
                              </div>
                            </div>
                          </div>
                        )
                      return
                      return (
                        <div className="col-12 p-3">
                          <ItemProductComponent
                            item={e}
                            index={i}
                            callBack={this.props.callBack}
                          />
                        </div>
                      )
                    })}
                  </div>
                  {this.props.dataMore && this.props.dataMore.length > 5 ? (
                    <div className="view-more mb-4 text-right">
                      <a href="/products/drink">
                        <i className="colorDefault">Xem thêm</i>
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadComponent />
        )}
      </div>
    )
  }
}
