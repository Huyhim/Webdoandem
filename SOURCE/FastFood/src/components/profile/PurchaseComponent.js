import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link, Router } from '../../routes/routes'
import LoadComponent from '../general/LoadComponent'
// import './profile.scss'
import moment from 'moment'

@inject('store')
@observer
export default class PurchaseComponent extends React.Component {
  @observable isRender = false

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.data = this.props.data
    console.log(JSON.stringify(this.props.data))
    this.user = this.props.user
    this.isRender = true
  }

  render() {
    const { data } = this.props
    return (
      <div className="purchase w-100">
        <div>
          <ul className="w-100 m-auto nav nav-pills nav-fill">
            {this.props.store.list.map((e, i) => {
              return (
                <li
                  key={i}
                  className="nav-item cursor"
                  style={
                    e.status
                      ? { background: '#ff4b4a', color: '#fff' }
                      : { border: '1px solid #fdd5d5' }
                  }
                  onClick={() => {
                    this.props.callBack('NEXT', e.key)
                  }}
                >
                  <span
                    className={
                      e.status
                        ? 'nav-link colorWhile py-3'
                        : 'nav-link colorDefault py-3'
                    }
                  >
                    {e.name}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        {this.isRender ? (
          data && data.length > 0 ? (
            <div className="py-3">
              {data.map(e => {
                return (
                  <div className="py-3">
                    <p className="border-bottom mx-3">
                      {e.createdAt
                        ? moment(e.createdAt).format('DD-MM-YYYY HH:mm:ss')
                        : ''}
                    </p>
                    {e.products.map(item => {
                      return (
                        <div>
                          <div className="row my-2">
                            <div className="float-left mx-3">
                              <img
                                className="cursor"
                                style={{
                                  width: '100%',
                                  height: '100px',
                                  width: '100px',
                                  objectFit: 'cover'
                                }}
                                src={
                                  item.image[0] ||
                                  '../../static/images/logo.png'
                                }
                              />
                            </div>
                            <div className="">
                              <h5
                                className="cursor"
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: '100%',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block'
                                }}
                              >
                                {item.name}
                              </h5>
                              <br />
                              <p>
                                {' '}
                                <small>
                                  {item.typeSize
                                    ? item.typeSize.find(e => e.status == true)
                                        .name
                                    : null}
                                </small>
                              </p>

                              <br />
                              <p className="mb-0">
                                {item.price}đ{' '}
                                <small> x {item.amount || 1}</small>
                              </p>
                            </div>
                            {/* <div className="">
                              <p className="mb-0">
                                {item.price}đ{' '}
                                <small> x {item.amount || 1}</small>
                              </p>
                            </div> */}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center" style={{ marginTop: '100px' }}>
              <img
                src="../../static/images/pen.png"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain'
                }}
              />
            </div>
          )
        ) : (
          <LoadComponent />
        )}
      </div>
    )
  }
}
