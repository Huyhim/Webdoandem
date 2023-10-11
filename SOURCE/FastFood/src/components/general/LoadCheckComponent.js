import React from 'react'
// import './style.scss'
export default class LoadComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="load">
        <span class="dot dot_1" />
        <span class="dot dot_2" />
        <span class="dot dot_3" />
        <span class="dot dot_4" />
      </div>
    )
  }
}
