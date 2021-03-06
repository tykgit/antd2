import React from 'react';
import {withRouter,Link} from "react-router-dom";
import InterfaceUtil from '../../util/InterfaceUtil';
// import $ from '../../js/jquery.min';
import $ from 'jquery';

class Fenlei11 extends React.Component {
  constructor(props) {
    super(props); //调用父类的构造方法；
    this.state = {
      fenlei: [],
      lujin:InterfaceUtil.getImgUrl(),
    }
  }


  fenlei(e) {

    // if (e.target.children.length != 0) {
    //
    //   var index = e.target.getAttribute('data');
    //   index = parseInt(index)
    //   $('.index_lunbo_ul_zilei').addClass('display');
    //   $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
    //   $('.aaa1').addClass('aaa1_current');
    //   $('.aaa1').eq(index).addClass('borderRight');
    // } else {
    //   var index = e.target.parentNode.getAttribute('data');
    //   $('.index_lunbo_ul_zilei').addClass('display');
    //   $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
    //   $('.aaa1').eq(index).addClass('borderRight');
    // }
    var index = $(e.target).parents('li').attr('data');
    $('.index_lunbo_ul_zilei').addClass('display');
    $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
    $('.aaa1').eq(index).addClass('borderRight');
  }

  fenlei1(e) {
    $('.index_lunbo_ul_zilei').addClass('display');
    $('.aaa1').removeClass('borderRight');
  }

  fenlei2(e) {
    var a = e.target.getAttribute('class');
    if (a == null) {
      var index = e.target.parentNode.parentNode.parentNode.getAttribute('data');
      $('.index_lunbo_ul_zilei').addClass('display');
      $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
      $('.aaa1').eq(index).addClass('borderRight');
    } else if (a == 'disanji') {
      var index = e.target.parentNode.parentNode.getAttribute('data');
      $('.index_lunbo_ul_zilei').addClass('display');
      $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
      $('.aaa1').eq(index).addClass('borderRight');
    }
    else if (a == 'index_lunbo_ul_zilei_dl') {
      var index = e.target.parentNode.getAttribute('data');
      $('.index_lunbo_ul_zilei').addClass('display');
      $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
      $('.aaa1').eq(index).addClass('borderRight');
    } else if (a == 'zuixiaji') {
      var index = e.target.parentNode.parentNode.parentNode.getAttribute('data');
      $('.index_lunbo_ul_zilei').addClass('display');
      $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
      $('.aaa1').eq(index).addClass('borderRight');
    } else {
      var index = e.target.getAttribute('data');
      $('.index_lunbo_ul_zilei').addClass('display');
      $('.index_lunbo_ul_zilei').eq(index).removeClass('display');
      $('.aaa1').eq(index).addClass('borderRight');
    }
  }

  //点击跳转
  chaxun(e,pid) {
    // var a = e.target.children.length;
    // if (a != 0) {
    //    pid = pid
    //
      // .log('1'+pid)
    this.props.history.push('/Chanpinzhongxin?&zjzx=1?&pid=' + pid)
    //   // window.location.href = '#/Chanpinzhongxin?pid=' + pid;
    // } else {
    //   // var pid = e.target.parentNode.getAttribute('data-pid');
    //   // window.location.href = '#/Chanpinzhongxin?pid=' + pid;
    // }
  }

  chaxun1(e,sid) {
    let index=e.target.parentNode.parentNode.getAttribute('data');
      let pid = $('.aaa1').eq(index).attr('data-class');
    this.props.history.push('/Chanpinzhongxin?&zjzx=1&pid=' + pid + '&sid=' + sid)
  }

  chaxun2(e,did) {
      let index = e.target.parentNode.parentNode.parentNode.getAttribute('data');
      let sid = e.target.parentNode.parentNode.firstChild.getAttribute('data-sid');
      let pid = $('.aaa1').eq(index).attr('data-class');
    this.props.history.push( '/Chanpinzhongxin?&zjzx=1&pid=' + pid + '&sid=' + sid + '&did=' + did)
  }


  componentDidMount() {
    function getCookie(cookieName) {
      var strCookie = document.cookie;
      var arrCookie = strCookie.split('; ');
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=');
        if (cookieName == arr[0]) {
          return arr[1];
        }
      }
      return '';
    }

    var user_type = getCookie('user_type');
    var token = getCookie('token');
    var jylx = getCookie('jylx');
    const that = this;
    //搜索条件ajax

        $.ajax({
                url: InterfaceUtil.getUrl(23),
                type: "post",
                data: InterfaceUtil.addTime({}),
                dataType: "json",
                success: function(data){
                      var data =data;
        // data = JSON.parse(data);
        if (data.data.length == 0) {

        } else {
          that.setState({
            fenlei: data.data
          });
        }
                }
            });

  }

  render() {
    return (
      <div className='fenlei relative display'>
        {/*分类*/}
        <ul className='index_lunbo_ul_fenlei'>
          {
            this.state.fenlei.map(function (item, i) {
              return (
                <li key={item.id} className='aaa1 aaa1_current'
                   data-class={item.id}
                >
                  <div className='dashed2' onClick={(e) => {
                    this.chaxun(e,item.id)
                  }}>
                    <img src={this.state.lujin + item.image} alt=""/>
                    <span className='marginLeft5'>{item.name}</span>
                    <img src={require('../../images/index/xiangyou.png')}
                         className='index_lunbo_ul_fenlei_img' alt=""/>
                    <div className='clear'/>
                  </div>

                  <div className='index_lunbo_ul_zilei ' data={i} onMouseMove={(e) => {
                    this.fenlei2(e)
                  }} onMouseOut={(e) => {
                    this.fenlei1(e)
                  }}>
                    {/*中西成药*/}
                    {
                      this.state.fenlei[i].next.map(function (item, j) {
                        return (
                          <dl key={item.id} className='index_lunbo_ul_zilei_dl'>
                            <dt className='disanji' data-w={item.id} onClick={(e) => {
                              this.chaxun1(e,item.id)
                            }}
                            >{item.name}</dt>
                            <dd className='disanji'>
                              {
                                this.state.fenlei[i].next[j].next.map(function (item) {

                                  return (
                                    <span className='zuixiaji' key={item.id}
                                          data-did={item.id} onClick={(e) => {
                                      this.chaxun2(e,item.id)

                                    }}>{item.name}</span>
                                  )
                                }, this)
                              }
                            </dd>

                          </dl>
                        )
                      }, this)
                    }
                  </div>

                </li>
              )
            }, this)
          }

          <li className='aaa1 aaa1_current'></li>
        </ul>
        {/*子类*/}

        {/*{*/}
          {/*this.state.fenlei.map(function (item, i) {*/}
            {/*// return (*/}
            {/*//   <div className='index_lunbo_ul_zilei display' data={i} onMouseMove={(e) => {*/}
            {/*//     this.fenlei2(e)*/}
            {/*//   }} onMouseOut={(e) => {*/}
            {/*//     this.fenlei1(e)*/}
            {/*//   }}>*/}
            {/*//     /!*中西成药*!/*/}
            {/*//     {*/}
            {/*//       this.state.fenlei[i].d.map(function (item, j) {*/}
            {/*//         return (*/}
            {/*//           <dl className='index_lunbo_ul_zilei_dl'>*/}
            {/*//             <dt className='disanji' data-sid={item.id} onClick={(e) => {*/}
            {/*//               this.chaxun1(e)*/}
            {/*//             }}>{item.title}</dt>*/}
            {/*//             <dd className='disanji'>*/}
            {/*//               {*/}
            {/*//                 this.state.fenlei[i].d[j].d1.map(function (item) {*/}
            {/*//                   return (*/}
            {/*//                     <span className='zuixiaji' data-did={item.id} onClick={(e) => {*/}
            {/*//                       this.chaxun2(e)*/}
            {/*//                     }}>{item.title}&emsp;|&emsp;</span>*/}
            {/*//                   )*/}
            {/*//                 }, this)*/}
            {/*//               }*/}
            {/*//             </dd>*/}
            {/*//*/}
            {/*//           </dl>*/}
            {/*//         )*/}
            {/*//       }, this)*/}
            {/*//     }*/}
            {/*//   </div>*/}
            {/*// )*/}
          {/*}, this)*/}
        {/*}*/}
      </div>
    )
  }

  componentDidUpdate() {

  }
}

// export default Fenlei11
export default withRouter(Fenlei11);