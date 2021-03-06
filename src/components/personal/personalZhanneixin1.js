// import $ from "../../js/jquery.min";
import $ from 'jquery';
import {withRouter} from 'react-router-dom'
import React from 'react';
import {Button, message, Modal, Pagination, Select} from 'antd';
import Tuijian from '../common/tuijian';
import InterfaceUtil from '../../util/InterfaceUtil';
import CoojiePage from '../../util/CoojiePage';
import LoginPage from '../../util/LoginPage';
import '../../styles/personal/personalZhanneixin.css'

const confirm = Modal.confirm;

class PersonalZhanneixin extends React.Component {

    handleCancel = () => {
        this.setState({visible: false});
    }

    constructor(props) {
        super(props); //调用父类的构造方法；
        this.loginPage = new LoginPage();
        this.username = CoojiePage.getCoojie('username');
        this.token = CoojiePage.getCoojie('token');
        this.user_id = CoojiePage.getCoojie('user_id');
        this.state = {
            znx: [],
            content: '',
            visible: false,
            textLetter: '',
            textTitle: '',
            page: 1,
        }
    }

    //全选
    quanxuan(e) {
        var a = $('.quanxuan').eq(0).prop('checked');
        if (a == true) {
            $('.shoucang_inp').prop('checked', true);
            $('.quanxuan1').eq(0).prop('checked', true);
        } else if (a == false) {
            $('.shoucang_inp').prop('checked', false);
            $('.quanxuan1').eq(0).prop('checked', false);
            return;
        }
    }

    quanxuan1(e) {
        var a = $('.quanxuan1').eq(0).prop('checked');
        if (a == true) {
            $('.shoucang_inp').prop('checked', true);
            $('.quanxuan').eq(0).prop('checked', true);
        } else if (a == false) {
            $('.shoucang_inp').prop('checked', false);
            $('.quanxuan').eq(0).prop('checked', false);
            return;
        }
    }

    showModalZnx(e, i) {
        this.setState({
            visible: true,
        });

        this.textLetter(i)
    }

    //切换颜色
    color(e) {
        $('.shoucang_head').removeClass('orange');
        e.target.className = 'shoucang_head orange cursor'
    }

    //未读已读
    value1() {
        var a = $('.ant-select-selection-selected-value').attr('title');
        if (a == '全部信息') {
            var a = ''
        } else if (a == '已读信息') {
            var a = '2'
        } else if (a == '未读信息') {
            var a = '1'
        }

        var username = CoojiePage.getCoojie('username');
        var token = CoojiePage.getCoojie('token');
        var user_id = CoojiePage.getCoojie('user_id');
        const that = this;
        //站内信
        $.ajax({
            url: InterfaceUtil.getUrl(48),
            type: "post",
            data: InterfaceUtil.addTime({
                user_id: user_id,
                token: token,
                page: 1,
                pageSize: 10
            }),
            dataType: "json",
            success: function (data) {

                if (data.data.length == 0) {

                } else {
                    that.setState({
                        znx: data.data.list,
                    });
                }
            }
        });

    }

    guanbi(e) {
        e.target.parentNode.parentNode.className = 'personal_zhanneixin_top_div1 display'
        e.target.parentNode.parentNode.previousSibling.className = 'personal_zhanneixin_top_div display'
    }

    xianshiletter(e) {

    }

    //分页
    fenye(e) {
        this.setState({
            page: e
        });
        // this.startAjax()
        this.refs.dingdan.className = 'display'

    }

    componentDidMount() {
        this.startAjax();
    }

    startAjax() {
        let token = CoojiePage.getCoojie('token');
        let user_id = CoojiePage.getCoojie('user_id');
        const that = this;
        //站内信
        $.ajax({
            url: InterfaceUtil.getUrl(48),
            type: "post",
            data: InterfaceUtil.addTime({
                user_id: user_id,
                token: token,
                page: that.state.page,
                pageSize: 10
            }),
            dataType: "json",
            success: function (data) {
                // console.log(data)
                that.loginPage.ajaxLogin(data.code, that.props);
                if (data.data.length == 0) {

                } else {
                    that.setState({
                        znx: data.data.message_list,
                        cons: data.data.message_count,
                    });
                }
            }
        });
    }

    textLetter(i) {
        let datas = this.state.znx;
        const _this = this;
        if (datas.length === 0) return;
        // console.log(datas[i].status)
        if (datas[i].status === 1) {
            $.ajax({
                url: InterfaceUtil.getUrl(49),
                type: "post",
                data: InterfaceUtil.addTime({
                    user_id: _this.user_id,
                    token: _this.token,
                    "id": datas[i].id
                }),
                dataType: "json",
                success: function (data) {
                    if (data.status === 1) {

                        datas[i].status = 2;
                        _this.setState({
                            textLetter: `${datas[i].content}`,
                            znx: datas,
                            textTitle: datas[i].title,
                            content: datas[i].content
                        })
                    }
                }
            });
        } else {
            this.setState({
                textLetter: `${datas[i].content}`,
                textTitle: datas[i].title,
                content: datas[i].content
            })
        }

    }

    showConfirm() {
        let id = [];
        confirm({
            title: '温馨提示',
            content: '你确认删除该条留言',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                let a = $('.shoucang_inp');
                for (let i = 0; i < a.length; i++) {
                    let xuanzhong = a[i].checked;
                    if (xuanzhong === true) {
                        let id1 = a[i].value;
                        id.push(id1);
                    }
                }

                if (id.length === 0) {
                    message.warning('请至少选择一个删除');
                    return;
                }
                ;
                let ids = id.join(',');
                let user_id = CoojiePage.getCoojie('user_id');
                let token = CoojiePage.getCoojie('token');
                const that = this;
                //站内信
                $.ajax({
                    url: InterfaceUtil.getUrl(47),
                    type: "post",
                    data: InterfaceUtil.addTime({
                        "user_id": user_id, "token": token, id: ids
                    }),
                    dataType: "json",
                    success: function (data) {

                        if (data.code === 1) {

                        }
                    }
                });
            },
            onCancel() {
            },
        });
    }

    render() {
        const {visible} = this.state;
        let data = this.state;
        return (
            <div className=' width988 floatRight'>
                {/*最近订单标题*/}
                <div className='personal_Wodejifen_title marginBottom20 personal_Wodejifen_title1'>
                    <p className='marginLeft20 fontFamily fontWeight floatleft font20'>站内信</p>
                    <ul>
                        <li className='orange shoucang_head cursor' onClick={(e) => {
                            this.color(e)
                        }}>系统消息
                        </li>
                        {/*<div className='shu floatleft'></div>*/}
                        {/*<li className='shoucang_head cursor' onClick={(e)=>{this.color(e)}}>求购信息</li>*/}
                    </ul>
                </div>
                {/*内容*/}
                <div className='white personal_xiangqing_title relative'>
                    {/*输入框*/}
                    <div className='personal_Dindan_con_inp'>
                        <div className="example-input floatRight marginRight20">
                            <Select defaultValue='全部信息' style={{width: 200}} className='select_value'>
                                <option value="全部信息">全部信息</option>
                                <option value="未读信息">未读信息</option>
                                <option value="已读信息">已读信息</option>
                            </Select>
                            <Button icon="search" style={{marginLeft: 10}} onClick={(e) => {
                                this.value1(e)
                            }}>查询</Button>
                        </div>
                        <div className='clear'/>
                    </div>
                    {/*全选删除*/}
                    <div className='personal_zhanneixin_top'>
                        <div>
                            <p className='personal_zhanneixin_top_span'>
                                <input type="checkbox" className='quanxuan'
                                       onClick={(e) => {
                                           this.quanxuan(e)
                                       }}/></p>

                            <span className='personal_zhanneixin_top_span1'>全选</span>
                            <span className='personal_zhanneixin_top_span2 cursor'
                                  onClick={() => this.showConfirm()}>删除</span>
                        </div>
                    </div>
                    {/*消息*/}
                    <div className='marginLeft20 marginTop20 personal_zhanneixin_msg'>
                        <ul>
                            {
                                data.znx.map(function (item, i) {
                                    let stationLetterClass, stationLetterText;
                                    if (item.is_read === 1) {
                                        stationLetterClass = 'zhanneixin_li';
                                        stationLetterText = '未读'
                                    } else {
                                        stationLetterClass = 'zhanneixin_li2';
                                        stationLetterText = '已读'
                                    }

                                    return (
                                        <li key={item.id} data={item.id} className={stationLetterClass}>
                                            <div className='personal_zhanneixin_top_div display'/>
                                            {/*<div className='personal_zhanneixin_top_div1 display'>*/}
                                            {/*<p className='personal_zhanneixin_top_div_p'>{item.title} <span*/}
                                            {/*className='personal_zhanneixin_top_div_span floatRight'*/}
                                            {/*onClick={(e) => {*/}
                                            {/*this.guanbi(e)*/}
                                            {/*}}>×</span></p>*/}
                                            {/*<p className='personal_zhanneixin_top_div_p1'*/}
                                            {/*dangerouslySetInnerHTML={{__html: item.content}}/>*/}
                                            {/*</div>*/}


                                            <div className='personal_zhanneixin_top_span floatleft'>
                                                <input
                                                    type="checkbox" className='shoucang_inp'
                                                    value={item.id}
                                                />
                                            </div>
                                            <div>
                                                <div className='personal_zhanneixin_top_span1 floatleft aaaa'
                                                     onChange={(e) => {
                                                         this.status(e)
                                                     }}>{stationLetterText}</div>
                                                <div
                                                    className='personal_zhanneixin_top_span2 floatleft'>
                                                    {item.title}
                                                </div>
                                                <div
                                                    className='personal_zhanneixin_top_span3 floatRight'>
                                                    [<span>{item.created_time}</span>]
                                                </div>
                                                <br/>
                                                <div className='width930 cursor'
                                                     onClick={(e) => this.showModalZnx(e, i)}>
                                                    <p className='personal_zhanneixin_top_p'
                                                    >
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='clear'/>
                                        </li>

                                    )
                                }, this)
                            }
                            <div className='bottom'/>
                            <div className='xian'/>
                        </ul>
                        <Modal
                            visible={visible}
                            title={`${data.textTitle}`}
                            onCancel={this.handleCancel}
                            footer={null}
                        >
                            <div> {data.content}</div>
                        </Modal>
                    </div>
                    {/*全选删除*/}
                    <div className='personal_zhanneixin_top1 bgColor marginLeft20'>
                        <p>
                            <span className='personal_zhanneixin_top_span'>
                                <input type="checkbox" className='quanxuan1'
                                       onClick={(e) => {
                                           this.quanxuan1(e)
                                       }}/></span>
                            <span className='personal_zhanneixin_top_span1'>全选</span>
                            <span className='personal_zhanneixin_top_span2 cursor'
                                  onClick={() => this.showConfirm()}>删除</span>
                        </p>
                    </div>
                    {/*分页*/}
                    <div className='width988 marginTop20 marginBottom20 paddingBtm20'>
                        <span className='floatRight personal_zhanneixin_title_div3_span3'>
                            <Pagination
                                showQuickJumper={true} defaultCurrent={1} defaultPageSize={5} total={data.cons}
                                onChange={(e) => {
                                    this.fenye(e)
                                }}/></span>
                        <div className='clear'/>
                    </div>
                </div>
                {/*推荐*/}
                <Tuijian data='5'/>

            </div>
        );
    }


}


export default withRouter(PersonalZhanneixin);
