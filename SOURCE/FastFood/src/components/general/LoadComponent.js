import React from 'react';
// import './style.scss';
export default class LoadComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul class="loader">
        <li className="mr-2">
          <div class="circle" />
          <div class="ball" />
        </li>
        <li className="mr-2">
          <div class="circle" />
          <div class="ball" />
        </li>
        <li className="mr-2">
          <div class="circle" />
          <div class="ball" />
        </li>
        <li className="mr-2">
          <div class="circle" />
          <div class="ball" />
        </li>
        <li>
          <div class="circle" />
          <div class="ball" />
        </li>
      </ul>
    );
    return (
      <div className="loading w-100">
        <div className="container">
          <div className="it item1" />
          <div className="it item2" />
          <div className="it item3" />
        </div>
      </div>
    );
  }
}
