import React, { Component } from 'react'
// import './footer.scss'
import { Link, Router } from '../../routes/routes'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { intentPage } from '../../utils/RouterUtils'
@inject('store')
@observer
export default class FooterComponent extends Component {
  @observable isRender = false
  @observable
  skills = [
    // {
    //   id: '',
    //   path: 'http://wp.hrc.com.vn/ki-nang/category/phat-trien-ban-than/',
    //   name: 'Phát triển bản thân    ',
    //   cover: '../../../static/images/career1.png',
    //   description: 'Rèn luyện các kĩ năng mềm cần thiết cho cuộc sống'
    // },
    {
      id: '',
      path: 'http://wp.hrc.com.vn/ki-nang/category/kham-pha-nganh-nghe/',
      name: 'Khám phá ngành nghề',
      cover: '../../../static/images/career2.png',
      description:
        'Tìm hiểu thêm về các ngành nghề trên thị trường tuyển dụng hiện tại'
    },
    {
      id: '',
      name: 'Kĩ năng xin việc',
      path: 'http://wp.hrc.com.vn/ki-nang/category/ki-nang-xin-viec/',
      cover: '../../../static/images/career3.png',
      description: 'Sẵn sàng kiến thức và kĩ năng cho mọi kì tuyển dụng'
    },
    {
      id: '',
      name: 'Phát triển bản thân',
      path: 'https://hrc.com.vn/thong-tin/phat-trien-ban-than.html',
      cover: '../../../static/images/career3.png',
      description: ''
    }
    // {
    //   id: '',
    //   name: 'Luyện thi vào các tập đoàn lớn',
    //   path: 'https://wp.hrc.com.vn/ki-nang/',
    //   cover: '../../../static/images/career4.png',
    //   description: 'Ôn luyện cho các kì tuyển dụng căng não'
    // },
    // {
    //   id: '',
    //   name: 'Kĩ năng nơi công sở',
    //   path: 'https://wp.hrc.com.vn/ki-nang/',
    //   cover: '../../../static/images/career5.png',
    //   description: 'Để phát triển tốt nhất ở môi trường làm việc'
    // }
  ]
  @observable chance = [
    {
      name: 'Học bổng',
      path: 'https://hrc.com.vn/thong-tin/hoc-bong.html'
    },
    {
      name: 'Sự kiện',
      path: 'https://hrc.com.vn/thong-tin/su-kien.html'
    },
    {
      name: 'Cuộc thi',
      path: 'https://hrc.com.vn/thong-tin/cuoc-thi.html'
    }
  ]
  @observable jobFooter = [
    {
      name: 'Full-time',
      path: 'https://hrc.com.vn/thong-tin/hoc-bong.html'
    },
    {
      name: 'Part-time',
      path: 'https://hrc.com.vn/thong-tin/su-kien.html'
    },
    {
      name: 'Internship',
      path: 'https://hrc.com.vn/thong-tin/cuoc-thi.html'
    }
  ]
  constructor(props) {
    super(props)
  }
  categoryRespon() {
    return (
      <div id="accordion">
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div
              class="card-header"
              id="headingOne"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <h5 class="mb-0">
                {this.jobFooter.length > 0 ? (
                  <button class="btn btn-link" type="button">
                    Việc làm
                  </button>
                ) : (
                  <button class="btn btn-link" type="button">
                    <Link route={`/viec-lam`}>Việc làm</Link>
                  </button>
                )}

                {this.jobFooter.length > 0 && (
                  <i className="fas fa-angle-down" />
                )}
              </h5>
            </div>
            {this.jobFooter ? (
              <div
                id="collapseOne"
                class="collapse "
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  {this.jobFooter.map((item, index) => {
                    return (
                      <p key={index}>
                        <a href={item.path} target="black">
                          <span
                            className="cursor-pointer"
                            // onClick={() => {
                            //   intentPage(`/viec-lam/${item.url}`)
                            // }}
                          >
                            {item.name}
                          </span>
                        </a>
                      </p>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>
          {/* <div class="card">
            <div
              class="card-header"
              id="headingTwo"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <h5 class="mb-0">
                {this.props.store.appFooter.companies.length > 0 ? (
                  <button class="btn btn-link collapsed" type="button">
                    Công ty
                  </button>
                ) : (
                  <button class="btn btn-link collapsed" type="button">
                    <Link route={`/cong-ty`}>Công ty</Link>
                  </button>
                )}
                {this.props.store.appFooter.companies.length > 0 && (
                  <i className="fas fa-angle-down" />
                )}
              </h5>
            </div>
            {this.props.store.appFooter.companies.length > 0 ? (
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  {this.props.store.appFooter.companies.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link route={`/viec-lam/${item.url}`}>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div> */}
          <div class="card">
            <div
              class="card-header"
              id="headingThree"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <h5 class="mb-0">
                {this.skills.length > 0 ? (
                  <button class="btn btn-link collapsed" type="button">
                    Kỹ năng
                  </button>
                ) : (
                  <button class="btn btn-link collapsed" type="button">
                    <Link route={`https://wp.hrc.com.vn/ki-nang`}>Kỹ năng</Link>
                  </button>
                )}

                {this.skills.length > 0 && <i className="fas fa-angle-down" />}
              </h5>
            </div>
            {this.skills.length > 0 ? (
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  {this.skills.map((item, index) => {
                    return (
                      <p key={index}>
                        <a href={item.path} target="black">
                          <span>{item.name}</span>
                        </a>
                      </p>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>
          {/* <div class="card">
            <div
              class="card-header"
              id="headingFour"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button">
                  <Link route="/about-HRC">
                    <a>Về HRC</a>
                  </Link>
                </button>
              </h5>
            </div>
          </div> */}
          <div class="card">
            <div
              class="card-header"
              id="headingT"
              data-toggle="collapse"
              data-target="#collapseT"
              aria-expanded="false"
              aria-controls="collapseT"
            >
              <h5 class="mb-0">
                {this.chance.length > 0 ? (
                  <button class="btn btn-link collapsed" type="button">
                    Cơ hội
                  </button>
                ) : (
                  <button class="btn btn-link collapsed" type="button">
                    <Link route={`https://wp.hrc.com.vn/ki-nang`}>Cơ hội</Link>
                  </button>
                )}

                {this.chance.length > 0 && <i className="fas fa-angle-down" />}
              </h5>
            </div>
            {this.chance.length > 0 ? (
              <div
                id="collapseT"
                class="collapse"
                aria-labelledby="headingT"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  {this.chance.map((item, index) => {
                    return (
                      <p key={index}>
                        <a href={item.path} target="black">
                          <span>{item.name}</span>
                        </a>
                      </p>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <footer>
        <div className="limit pt-md-3">
          <div className="row">
            <div className="col-12 d-md-none d-block pb-3">
              {this.categoryRespon()}
            </div>
            <div className="col-lg-8 d-none d-md-block px-lg-0">
              <div className="row mb-lg-3">
                <div className="col-lg-4 px-lg-0">
                  <Link route="/">
                    <a>
                      {' '}
                      <img
                        src="https://hrc.com.vn/themes/hrc/assets/images/logo.png"
                        style={{
                          maxHeight: '30px',
                          objectFit: 'contain',
                          marginBottom: '15px'
                        }}
                      />
                      <b style={{ color: '#20a286', display: 'inline-block' }}>
                        HRC - Trang tìm việc và hướng nghiệp duy nhất cho sinh
                        viên kinh tế
                      </b>
                    </a>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 py-lg-0 py-2">
                  <div
                    style={{
                      fontSize: '30px',
                      fontWeight: '400',
                      margin: '5px 0'
                    }}
                  >
                    35,000+
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      textTransform: 'uppercase'
                    }}
                  >
                    SINH VIÊN
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 py-lg-0 py-2">
                  {' '}
                  <div
                    style={{
                      fontSize: '30px',
                      fontWeight: '400',
                      margin: '5px 0'
                    }}
                  >
                    3,000+
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      textTransform: 'uppercase'
                    }}
                  >
                    NHÀ TUYỂN DỤNG
                  </div>{' '}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 px-lg-0">
                  <div className="left-content">
                    <p className="address">
                      <b className="d-inline-block mb-1">Văn phòng:</b>{' '}
                      {'this.props.store.appFooter.office'}
                    </p>
                    <div className="address">
                      <b className="d-inline-block mb-1">Liên hệ: </b>

                      <div className="">
                        {/* {this.props.store.appFooter.hotlines.map((item, index) => {
                      return ( */}
                        <p
                          className="mb-2"
                          key={'index'}
                          style={'index' !== 0 ? {} : {}}
                        >
                          Hotline {'index + 1'} : {'item'}
                        </p>
                        {/* )
                    })} */}
                      </div>
                      <div style={{ clear: 'both' }} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 px-lg-0">
                  <div className="row">
                    <div className="col-md-3 pr-0">
                      <ul>
                        <li>
                          <h6>
                            <Link route="/viec-lam">
                              <a>Việc làm</a>
                            </Link>
                          </h6>
                        </li>
                        {this.jobFooter.map((item, index) => {
                          return (
                            <li key={'index'}>
                              <a href={item.path} target="black">
                                <span
                                  // onClick={() => {
                                  //   intentPage(`/viec-lam/${'item.url'}`)
                                  // }}
                                  className="cursor-pointer"
                                >
                                  {item.name}
                                </span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    {/* <div className="col-md-3 pl-0">
                  <ul>
                    <li>
                      <h6>
                        <Link route="/cong-ty">
                          <a>Công ty</a>
                        </Link>
                      </h6>
                    </li>
                    {this.props.store.appFooter.companies.map((item, index) => {
                      return ( 
                    <li key={'index'}>
                      <Link route={`/viec-lam/${'item.url'}`}>
                        <span className="cursor-pointer">{'item.name'}</span>
                      </Link>
                    </li>
                    )
                    })}
                  </ul>
                </div> */}
                    <div className="col-md-6 pr-0">
                      <ul>
                        <li>
                          <h6>
                            <Link route="https://wp.hrc.com.vn/ki-nang">
                              <a target="black">Kỹ năng</a>
                            </Link>
                          </h6>
                        </li>
                        {this.skills.map((item, index) => {
                          return (
                            <li key={index}>
                              <a href={item.path} target="black">
                                <span className="cursor-pointer">
                                  {item.name}
                                </span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    {/* <div className="col-md-3 pl-0">
                  <ul>
                    <li>
                      <h6>
                        <Link route="/about-HRC">
                          <a>Về HRC</a>
                        </Link>
                      </h6>
                    </li>
                  </ul>
                </div> */}
                    <div className="col-md-3 pl-0">
                      <ul>
                        <li>
                          <h6>
                            <a>Cơ hội</a>
                          </h6>
                        </li>
                        {this.chance.map((item, index) => {
                          return (
                            <li key={index}>
                              <a href={item.path} target="black">
                                <span className="cursor-pointer">
                                  {item.name}
                                </span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 px-lg-0">
              <div
                className="IFrame"
                style={{ maxWidth: '100%', overflow: 'hidden' }}
              >
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhrc.fanpage%2F&tabs=timeline&width=350&height=100&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=229049581190680"
                  width="100%"
                  height="130"
                  scrolling="no"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                />
              </div>
              {/* <p className="description d-none d-md-block mt-3">
                Theo dõi fanpage của HRC để cập nhật những thông tin mới nhất về
                việc làm, cơ hội, sự kiện hot
              </p> */}
            </div>

            <div className="col-md-12 d-md-none d-block">
              <div className="left-content">
                <p className="address">
                  <b>Văn phòng:</b> {'this.props.store.appFooter.office'}
                </p>
                <div className="address">
                  <div className="d-inline-block">
                    <b>Liên hệ: </b>
                  </div>

                  <div className="">
                    {/* {this.props.store.appFooter.hotlines.map((item, index) => {
                      return ( */}
                    <p
                      className="mb-2"
                      key={'index'}
                      style={'index' !== 0 ? {} : {}}
                    >
                      Hotline {'index + 1'} : {'item'}
                    </p>
                    {/* )
                    })} */}
                  </div>
                  <div style={{ clear: 'both' }} />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="copyright-text text-center">
            <p>
              Copyright &copy; 2018 HRC. All rights reserved.
              {/* Copyright © 2017 Câu lạc bộ Nguồn nhân lực */}
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
