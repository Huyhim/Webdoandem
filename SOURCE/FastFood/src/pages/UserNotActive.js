import React from 'react';

import { inject, observer } from 'mobx-react';

import HeaderComponent from '../components/header/header-component';
import FooterComponent from '../components/footer/footer-component';
import UserNotActiveComponent from '../components/login/UserNotActiveComponent';

@inject('store')
@observer
export default class UserNotActive extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <HeaderComponent />
        <UserNotActiveComponent />
        <FooterComponent />
      </div>
    );
  }
}
