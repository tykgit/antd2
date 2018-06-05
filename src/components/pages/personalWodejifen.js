require('styles/common.css');
require('styles/personal.css')

import React from 'react';
import Footer from './footer';
import Header from './HeadersPage';
import PersonalWodejifen from '../personal/personalWodejifen'

class PersonalWodejifen1 extends React.Component {
  render() {
    return (
      <div>
        {/*头部*/}
        <Header/>
        {/*内容*/}
        <PersonalWodejifen/>
        {/*尾部*/}
        <Footer/>
      </div>
    );
  }
}


export default PersonalWodejifen1;
