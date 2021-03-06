import React from 'react';
import Modal1 from "../../components/Modal";
import {Link, withRouter} from 'react-router-dom';
import {Timeline} from 'antd';
import Tuijian from '../common/tuijian'
import InterfaceUtil from '../../util/InterfaceUtil';
import CoojiePage from '../../util/CoojiePage';
import LoginPage from '../../util/LoginPage';
import $ from 'jquery'

class personalBox extends React.Component {
    constructor(props) {
        super(props); //调用父类的构造方法；
        this.loginPage = new LoginPage();
        this.state = {
            username: '',
            dingdan9: [],
            jylx: [],
            lujin: InterfaceUtil.getImgUrl(),
            orderno: [],
            zzxq: '',
            url: '111',
        }
    }

    //js事件
    dingdangenzong(e) {
        var a = e.target.parentNode;
        a.lastChild.className = 'personalCon1_xuanfu'
    }

    dingdangenzong1(e) {
        var a = e.target.parentNode;
        a.lastChild.className = 'personalCon1_xuanfu display'
    }

    dingdan1(e) {

        var zhengze = /[\u4e00-\u9fa5]/g;
        var a = e.target.innerText;
        var b = a.match(zhengze).join('');
        if (b == '待付款') {
            document.cookie = "ddzt=" + 1;
            window.location.replace('#/Dindan');
        } else if (b == '待收货') {
            document.cookie = "ddzt=" + 2;
            window.location.replace('#/Dindan');
        }
    }

    //去付款
    qufukuan1(e, id) {
        // var id = e.target.parentNode.parentNode.getAttribute('data');

        sessionStorage.setItem("orderno", id);
        this.props.history.push('/Dingdan');
    }

    //查看订单
    xiangqing1(e,id) {
        // var a = e.target.parentNode.parentNode.parentNode.firstChild.innerText;
        // var order_id = a;
        sessionStorage.setItem("orderno", id);
        document.cookie = "order_id=" + id;
    }

    //取消收藏
    quxiao(e) {
        var id = e.target.parentNode.parentNode.getAttribute('data');
        var ida = e.target.parentNode.parentNode.getAttribute('data-a');


        var user_id = CoojiePage.getCoojie('user_id');
        var token = CoojiePage.getCoojie('token');
        const that = this;
        //头部ajax
        $.ajax({
            url: InterfaceUtil.getUrl(10),
            type: "post",
            data:  InterfaceUtil.addTime({
                "token": token, "user_id": user_id, "goods_id": id
            }),
            dataType: "json",
            success: function (data) {
                alert(data.msg)
                if (data.code == 1) {
                    that.ajax2()
                }
            }
        });

    }

    //加入购物车
    buycar0(e) {
        var num = e.target.parentNode.parentNode.getAttribute('data-index');
        var id = e.target.parentNode.parentNode.getAttribute('data-a');

        // function getCookie(cookieName) {
        //     var strCookie = document.cookie;
        //     var arrCookie = strCookie.split("; ");
        //     for (var i = 0; i < arrCookie.length; i++) {
        //         var arr = arrCookie[i].split("=");
        //         if (cookieName == arr[0]) {
        //             return arr[1];
        //         }
        //     }
        //     return "";
        // }

        var username = CoojiePage.getCoojie('username');
        var token =  CoojiePage.getCoojie('token');
        var user_id =  CoojiePage.getCoojie('user_id');
        const that = this;
        //搜索条件ajax

        $.ajax({
            url: InterfaceUtil.getUrl(11),
            type: "post",
            data: InterfaceUtil.addTime({
                "token": token, "user_id": user_id, "goods_id": id, "goods_num": num
            }),
            dataType: "json",
            success: function (data) {
                if (data.code == '1') {
                    var ok = $('.buycar_ok');
                    ok[0].className = 'buycar_ok';
                    var timer1 =setTimeout(function () {
                        ok.eq(0).attr('class','buycar_ok display')
                        // ok[0].className = 'buycar_ok display';
                    }, 3000);
                } else {
                    if (data.msg != 'token过期') {
                        var no = document.getElementsByClassName('buycar_no');
                        var no_span = document.getElementsByClassName('buycar_no_con_span');
                        no[0].className = 'buycar_no';
                        no_span[0].innerText = data.msg;
                    } else {
                        // window.location.href='#/Denglu';
                    }
                }
            }
        });

    }

    componentDidMount() {
        var username = CoojiePage.getCoojie('username');
        var token = CoojiePage.getCoojie('token');
        var user_id = CoojiePage.getCoojie('user_id');
        var jylx = CoojiePage.getCoojie('jylx');
        var order_id = CoojiePage.getCoojie('order_id');
        const that = this;
        //个人信息
        $.ajax({
            url: InterfaceUtil.getUrl(34),
            type: "post",
            data: InterfaceUtil.addTime({
                "user_id": user_id, "token": token
            }),
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (!data.data) return;
                var data=data.data;
                that.setState({
                    username: data.username,
                    dwmc: data.enterprise,
                    jfye: data.integral,
                    // zzyxq: data.data[0].zzyxq,
                    hydj: data.level,
                    // shzt: data.data[0].shzt,
                    ddzt1: data.pay_order,
                    ddzt3: data.send_order,
                    znx: data.message_count,
                    coupons: data.coupon_count,
                    // zzxq: data.data[0],
                    // url: data.data[0].user_photo,
                });
                // var xq = document.getElementsByClassName('a');
                // let xqs=$('.a');
                // if (data.data[0].z1 != 1) {
                //     xqs.eq(0).attr('class','zizhixiaoqi_span1 a red')
                //     // xq[0].className = 'zizhixiaoqi_span1 a red'
                // }
                // if (data.data[0].z2 != 1) {
                //     xqs.eq(1).attr('class','zizhixiaoqi_span2 a red')
                //     // xq[1].className = 'zizhixiaoqi_span2 a red'
                // }
                // if (data.data[0].z3 != 1) {
                //      xqs.eq(2).attr('class','zizhixiaoqi_span2 a red')
                //     // xq[2].className = 'zizhixiaoqi_span2 a red'
                // }
                // if (data.data[0].z4 != 1) {
                //      xqs.eq(3).attr('class','zizhixiaoqi_span2 a red')
                //     // xq[3].className = 'zizhixiaoqi_span2 a red'
                // }
                // if (data.data[0].z5 != 1) {
                //      xqs.eq(3).attr('class','zizhixiaoqi_span2 a red')
                //     // xq[4].className = 'zizhixiaoqi_span2 a red'
                // }

            }
        });

        //订单ajax
        $.ajax({
            url: InterfaceUtil.getUrl(35),
            type: "post",
            data: InterfaceUtil.addTime({
                "token": token, "page": 1, "user_id": user_id, "status": 0,
                pageSize: 3
            }),
            dataType: "json",
            success: function (data) {
                if (data.data.length == 0) {

                } else {
                    if (!data.data.order_list) return;
                    that.setState({
                        dingdan9: data.data.order_list,
                    });
                    that.refs.dingdan.className = 'display'
                }
            }
        });

        this.ajax2();
    }

    ajax2() {
        var username = CoojiePage.getCoojie('username');
        var token = CoojiePage.getCoojie('token');
        var user_id = CoojiePage.getCoojie('user_id');
        var jylx = CoojiePage.getCoojie('jylx');

        var that = this;
        //收藏
        $.ajax({
            url: InterfaceUtil.getUrl(36),
            type: "post",
            data: InterfaceUtil.addTime( {
                "user_id": user_id, "token": token, "page": 1, "pageSize": 3
            }),
            dataType: "json",
            success: function (data) {
                that.loginPage.ajaxLogin(data.code, that.props);

                if (data.data.length == 0) {

                } else {
                    if (!data.data.collect_list) return;
                    that.setState({
                        jylx: data.data.collect_list,
                    });
                    that.refs.shoucang.className = 'display'
                }
            }
        });
    }

    render() {
        return (
            <div className='floatleft memberCentre'>
                {/*会员中心右侧*/}
                <div>
                    {/*头部*/}
                    <div className='personalCon1_top'>
                        {/*头像*/}
                        <div className='personalCon1_top_head'>
                            {/*<img src="../../images/logo.png" alt="" className='personalCon1_top_head_img' onMouseOver={(e)=>{this.head(e)}} onMouseOut={(e)=>{this.head1(e)}}/>*/}
                            <Modal1 data={this.state.url}/>
                            <p>四川聚创医药</p>
                        </div>
                        {/*资质*/}
                        <div className='personalCon1_top_zizhi'>
                            <p className='personalCon1_top_zizhi_p'>{this.state.username}，<span
                                className='font14'>欢迎回来</span><span className='personalCon1_top_zizhi_p1'>你的资质已审核 <span
                                className='personalCon1_top_zizhi_p2'>{this.state.shzt}</span></span></p>
                            <p className='font14 personalCon1_top_zizhi_p3'>会员等级:
                                <a href=""
                                   className='personalCon1_top_zizhi_a'>{this.state.hydj}</a><span>当前单位:{this.state.dwmc}</span>
                            </p>
                            <p>
                                <button className='personalCon1_top_zizhi_btn cursor' onClick={(e) => {
                                    this.dingdan1(e)
                                }}>
                                    <img className='myPageImg' src={require('../../images/mypage/0002.png')} alt=""/>
                                    待付款（<span>{this.state.ddzt1}</span>）
                                </button>
                                <button className='personalCon1_top_zizhi_btn1 cursor' onClick={(e) => {
                                    this.dingdan1(e)
                                }}>
                                    <img className='myPageImg' src={require('../../images/mypage/0003.png')} alt=""/>
                                    待收货（<span>{this.state.ddzt3}</span>）
                                </button>
                                <Link to="/Zhanneixin" className='black'>
                                    <button className='personalCon1_top_zizhi_btn2 cursor'>
                                        <img className='myPageImg' src={require('../../images/mypage/0004.png')}
                                             alt=""/>
                                        站内信（<span>{this.state.znx}</span>）
                                    </button>
                                </Link>
                            </p>
                            <div className='clear'></div>
                        </div>
                        {/*余额*/}
                        <div className='personalCon1_top_yue'>
                            <p className='personalCon1_top_yue_p'>可用积分：<span className='red'>{this.state.jfye}</span>
                            </p>
                            <Link to='/Youhuiquan'>
                                <p className='couponPs'>可用优惠券：<span
                                    className='red marginRight5'>{this.state.coupons}</span>张
                                    <img className='myPageImg2' src={require('../../images/mypage/0005.png')} alt=""/>
                                </p>
                            </Link>

                        </div>
                        <div className='clear'></div>
                    </div>
                    {/*资质效期*/}
                    <div className='zizhixiaoqi marginTop10 marginBottom20'>
                        <div>
                            <span className='zizhixiaoqi_span'>资质效期</span>
                            <span className='font12'>药品经营许可证：</span><span
                            className='zizhixiaoqi_span1 a'>{this.state.zzxq.zzxq1} </span>
                            <span className='font12'>GSP认证：</span><span
                            className='zizhixiaoqi_span2 a'>{this.state.zzxq.zzxq2} </span>
                            <span className='font12'>客户委托书：</span><span
                            className='zizhixiaoqi_span2 a'>{this.state.zzxq.zzxq3} </span>
                            <span className='font12'>医疗机构执业许可证：</span><span
                            className='zizhixiaoqi_span2 a'>{this.state.zzxq.zzxq4} </span>
                            <span className='font12'>合同：</span><span
                            className='zizhixiaoqi_span2 a'>{this.state.zzxq.zzxq5} </span>
                            <div className='clear'/>
                        </div>
                    </div>
                    {/*最近订单*/}
                    <div className='personalCon1_top1 marginBottom20'>
                        {/*最近订单*/}
                        <div className='personalCon1_top1_con'>
                            <div className='personal_line floatleft'></div>
                            <span className='floatleft personal_line_p'>最近订单</span>
                            <Link to="/Dindan" className='black'>
                                <span
                                    className='floatRight personal_line_p1'>查看更多>></span></Link>
                        </div>
                        <table className='personalCon1_table'>
                            <thead>
                            <tr>
                                <th width="150px">订单号</th>
                                <th width="160px">订单时间</th>
                                <th width="110px">订单金额</th>
                                <th width="120px">实付金额</th>
                                <th width="80px">参与活动</th>
                                <th width="160px">订单状态</th>
                                <th width="160px">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.dingdan9.map(function (item, i) {

                                    let orderState = item.order_status == 1 ?
                                        <span className='personalCon1_current' onClick={(e) => {
                                            this.qufukuan1(e, item.order_number)
                                        }}>去付款</span> : <span className='nulls'></span>
                                    let times=InterfaceUtil.fmtDate(item.created_time);
                                    let order_status='';
                                    if(item.order_status==='5'){
                                        order_status='交易关闭'
                                    }else if(item.order_status==='1'){
                                        order_status='未付款'
                                    }else if(item.order_status==='2'){
                                        order_status='待发货'
                                    }else if(item.order_status==='3'){
                                        order_status='待收货'
                                    }else if(item.order_status==='4'){
                                        order_status='交易完成'
                                    }else if(item.order_status==='6'){
                                        order_status='退款中'
                                    }
                                    return (
                                        <tr key={i}>
                                            <td className='orange hid'>{item.order_number}</td>
                                            <td>{times}</td>
                                            <td>{item.origin_price}</td>
                                            <td>{item.price}</td>
                                            <td>/</td>
                                            <td className='personalCon1_table_tr'>
                                                {/*<span className='orange'>{item.ddzt} </span>*/}
                                                {/*<span className='marginLeft5 blue'*/}
                                                      {/*onMouseOver={(e) => {*/}
                                                          {/*this.dingdangenzong(e)*/}
                                                      {/*}}*/}
                                                      {/*onMouseOut={(e) => {*/}
                                                          {/*this.dingdangenzong1(e)*/}
                                                      {/*}}>*/}
                                                      {/*订单跟踪*/}
                                                {/*</span>*/}
                                                {/*订单跟踪*/}
                                                {/*<div className='personalCon1_xuanfu display'>*/}
                                                    {/*/!*订单跟踪*!/*/}
                                                    {/*<Timeline className='wlxx'>*/}
                                                        {/*{*/}
                                                            {/*this.state.dingdan9[i].wl.map(function (item, i) {*/}
                                                                {/*return (*/}
                                                                    {/*<Timeline.Item*/}
                                                                        {/*key={i}>*/}
                                                                        {/*<span> {item.createtime} {item.wldw}</span></Timeline.Item>*/}
                                                                {/*)*/}
                                                            {/*}, this)*/}
                                                        {/*}*/}
                                                {order_status}
                                                    {/*</Timeline>*/}
                                                    {/*<Timeline className='ZWwlxx display'>*/}
                                                        {/*<Timeline.Item><span> 暂无物流信息</span></Timeline.Item>*/}
                                                    {/*</Timeline>*/}


                                                {/*</div>*/}
                                                {/*/*/}
                                            </td>
                                            <td data={item.order_number}>
                                                {orderState}
                                                <Link to="/Xiangqing" className='black'><span onClick={(e) => {
                                                    this.xiangqing1(e,item.id)
                                                }}> 查看订单</span></Link>
                                            </td>
                                        </tr>
                                    )
                                }, this)
                            }
                            <tr rowSpan={6} ref='dingdan'>
                                <td colSpan={7}>
                                    <p className='font20'>亲，您还没有订单哦~</p>
                                    <p className='personalCon1_table_tr_p'>
                                        <a href=""
                                           className='personalCon1_table_td'>去产品中心</a>
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        {/*没有订单*/}


                        {/*我的收藏*/}
                        <div className='personalCon1_top1_con'>
                            <div className='personal_line floatleft'></div>
                            <span className='floatleft personal_line_p'>我的收藏</span>
                            <Link to="/Wodeshoucang" className='black'>
                                <span
                                    className='floatRight personal_line_p1'>查看更多>></span></Link>
                        </div>
                        <table className='personalCon1_table'>
                            <thead>
                            <tr>
                                <th width="85px">商品信息</th>
                                <th width="215px">商品名称</th>
                                <th width="200px">生产厂家</th>
                                <th width="115px">规格</th>
                                <th width="120px">价格</th>
                                <th width="205px">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.jylx.map(function (item) {
                                    if (this.state.jylx.length != []) {
                                        return (
                                            <tr key={item.goods_id + 'perConJy'} data={item.goods_id} data-index={item.min_buy}
                                                data-a={item.goods_id}>
                                                <td><img className='collectionImg' src={this.state.lujin + item.image}/>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.enterprise}</td>
                                                <td>{item.standard}</td>
                                                <td>{item.price}</td>
                                                <td><span className='personalCon1_current' onClick={(e) => {
                                                    this.buycar0(e)
                                                }}>加入购物车</span>
                                                    <span onClick={(e) => {
                                                        this.quxiao(e)
                                                    }}>取消收藏</span></td>
                                            </tr>
                                        )
                                    }
                                }, this)
                            }
                            <tr rowSpan={6} ref='shoucang'>
                                <td colSpan={7}>
                                    <p className='font20'>亲，您还没有收藏哦~</p>
                                    <p className='personalCon1_table_tr_p'><a href=""
                                                                              className='personalCon1_table_td'>去产品中心</a>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className='clear'></div>


                        {/*推荐*/}
                        <Tuijian data='5'/>
                    </div>
                    <div className='clear'></div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {

        //物流
        var ZWwlxx = document.getElementsByClassName('ZWwlxx');
        var wlxx = document.getElementsByClassName('wlxx');

        for (var i = 0; i < ZWwlxx.length; i++) {
            if (wlxx[i].children.length == 0) {
                ZWwlxx[i].className = 'ant-timeline ZWwlxx '
            }
        }

    }
}


export default withRouter(personalBox);
