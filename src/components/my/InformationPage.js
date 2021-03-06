import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import CoojiePage from '../../util/CoojiePage';
import Head from '../../pages/Header1';
import InterfaceUtil from "../../util/InterfaceUtil";
import './informationPage.css'
import {Button, Checkbox, Col, Form, Input, message, Row} from 'antd';

const FormItem = Form.Item;

class InformationPage extends Component {
    handleSubmit = (e) => {
        const _this = this;
        e.preventDefault();
        let checkboxs = [];
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i = 1; i < 15; i++) {
                    if (values[i]) {
                        checkboxs.push(i);
                    }
                }

                if (checkboxs.length === 0) {
                    alert('至少选择一个经营范围！');
                    return
                }
                this.setState({loading: true});
                checkboxs = checkboxs.join(',');
                $.ajax({
                    url: InterfaceUtil.getUrl(60),
                    type: "post",
                    data: InterfaceUtil.addTime({
                        "user_id": _this.user_id, "token": _this.token, 'name': values.userName,
                        'address': values.address, 'tel': values.phonenumber,
                        'shop_operate': checkboxs
                    }),
                    // 'shyb': values.zipCode,
                    dataType: "json",
                    success: function (data) {

                        if (data.code === 1) {
                            window.scrollTo(0, 0);
                            message.success(data.msg);
                            _this.props.history.push('/Index');
                        } else {
                            alert(data.msg)
                        }
                    }
                });
            }
        });
    }

    constructor(props) {
        super(props);
        this.username = CoojiePage.getCoojie('username');
        this.user_id = CoojiePage.getCoojie('user_id');
        this.token = CoojiePage.getCoojie('token');
        this.state = {
            jbxx: {
                "id": '',
                "username": '',
                "shzt": '',
                "mjtp": '',
                "shr": '',
                "shdz": '',
                "shdh": '',
                "shyb": '',
                "yyzzh": '',
                "yyzz": '',
                "yljgxkzbh": '',
                "yljgxkz": '',
                "cgwts": '',
                "sfzh": '',
                "sfz": '',
                "shwts": '',
            },
            jynr: [],
            loading: false,
            iconLoading: false,
            user_shop_operate: [],
            info: {
                username: '',
                level: ``,

            }
        }
    }

    componentDidMount() {
        const that = this;
        //我的基本信息
        $.ajax({
            url: InterfaceUtil.getUrl(34),
            type: "post",
            data: InterfaceUtil.addTime({
                "user_id": that.user_id, "token": that.token
            }),
            dataType: "json",
            success: function (data) {

                if (data.code === 1) {
                    // let datas = that.state.jbxx;
                    // datas[`dwmc`] = data.data.enterprise;
                    // datas[`lxr`] = data.data.username;
                    that.setState({
                        info: data.data,
                        // jbxx: datas,
                    })
                }

                // var obj = data.data;
                // var keys = [];//定义一个数组用来接受key
                // var values = [];//定义一个数组用来接受value
                // for (let key in obj) {
                //     keys.push(key);
                //     values.push(obj[key]);//取得value
                //     if (obj[key] === 'null' || obj[key] === null) {
                //         obj[key] = ''
                //     }
                // }
                // if (data.code === 1) {
                //     if (data.data.shzt === '审核通过') {
                //         that.props.history.push('/Index');
                //         return;
                //     }
                //     that.setState({
                //         jbxx: obj,
                //         jynr: obj.jynr1,
                //     });
                // } else {
                //     that.props.history.push('/Denglu');
                // }
            }
        });


        $.ajax({
            url: InterfaceUtil.getUrl(56),
            type: "post",
            data: InterfaceUtil.addTime({
                "user_id": that.user_id, "token": that.token
            }),
            dataType: "json",
            success: function (data) {
                if (data.code === 1) {

                    let datas = that.state.jbxx;
                    datas[`shdz`] = data.data.user_address.address;
                    datas[`shr`] = data.data.user_address.name;
                    datas[`shdh`] = data.data.user_address.tel;
                    datas[`lxr`] = data.data.user_info.real_name;
                    datas[`dwmc`] = data.data.user_info.enterprise;
                    // let jynrs=that.state.jynr;user_info
                    // :
                    // enterprise
                    // :
                    // "wdw"
                    // real_name
                    // :
                    // "隆洋"
                    // jynrs= data.data.shop_operate;
                    that.setState({
                        jynr: data.data.shop_operate,
                        jbxx: datas,
                        user_shop_operate: data.data.user_shop_operate,

                    })
                }


            }
        });
    }

    shangchuan(e) {
        let files = e.target.files;
        let aabb = e.target.getAttribute('data');
        let user_id = CoojiePage.getCoojie('user_id');
        let token = CoojiePage.getCoojie('token');

        let formData = new FormData();
        formData.append("file", files[0]);
        formData.append("user_id", user_id);
        formData.append("token", token);
        formData.append("type_img", aabb);

        // $.ajax({
        //     url: InterfaceUtil.getUrl(56),
        //     type: "post",
        //     cache: false,
        //     traditional: true,
        //     contentType: false,
        //     processData: false,
        //     data: formData,
        //     dataType: "json",
        //     success: function (data) {
        //
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //
        //     }
        // });


    }

    render() {
        let data = this.state.jbxx;
        let isChec = this.state.user_shop_operate;
        const {getFieldDecorator} = this.props.form;
        let checkbox = this.state.jynr.length > 0 ? this.state.jynr.map((item, i) => {
            let status = false;
            if (isChec.length > 0) {
                isChec.map((it, i) => {
                    if (item.id == it) {
                        status = true;
                        false
                    }
                    // status = item.id == it ? true : false;
                })
            }
            return <Col span={4} key={i}>
                {getFieldDecorator(`${item.id}`, {
                    valuePropName: 'checked',
                    initialValue: status
                })(
                    <Checkbox key={item.id + item.name} className='ifmtpCheck'>{item.name}</Checkbox>
                )}
            </Col>
        }) : null;
        let dwmcs = data.dwmc ? `${data.dwmc}` : ``;
        let contacts = data.lxr ? `${data.lxr}` : ``;
        return <div>
            <Head/>
            <div className='contentBox2'>

                <div className='ifmtpBoxs'>
                    {/*最近订单标题*/}
                    <div className='ifmtpHead'>
                        <p className=''>基本信息</p>
                    </div>
                    {/*内容*/}
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='white personal_xiangqing_title'>
                            {/*<div className='xian'></div>*/}
                            {/*基本信息*/}
                            <div className='marginLeft20 personal_Jibenxinxi_title'>
                                <p className='personal_Jibenxinxi_title_p'>
                                    会员基本信息 - 资料审核通过后只能进行密码修改</p>
                            </div>
                            <div className='personal_Jibenxinxi_title_con'>
                                <p className='personal_Jibenxinxi_title_p1'>
                                    <span>会员账号：</span>
                                    <span className='personal_Jibenxinxi_title_span'>
                    {this.state.info.username}
                </span>
                                    <span className='marginLeft10'>
                {this.state.info.level}
                </span>
                                </p>
                                <p className='personal_Jibenxinxi_title_p1'><span>会员类型：
                </span>
                                    <span className='personal_Jibenxinxi_title_span'>
                    {this.state.jbxx.mjtp}
                    </span>
                                </p>
                                <p className='personal_Jibenxinxi_title_p1'>
                                    <span>会员密码：</span>
                                    <input type="password"
                                           style={{background: '#f7f7f7'}}
                                           className='personal_Jibenxinxi_title_inp'
                                           disabled value={'111111'}/>
                                </p>
                                <div className='infmConD'>
                                    <span>单位名称：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="收货人姓名" />*/}
                                        <FormItem>
                                            {/*`${item.id}`*/}
                                            {getFieldDecorator('dwmc', {
                                                rules: [{message: '请输入单位名称!'}],
                                                initialValue: `${dwmcs}`
                                            })(
                                                <Input placeholder="单位名称"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className='infmConD'>
                                    <span>联系人：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        <FormItem>
                                            {getFieldDecorator('contacts', {
                                                rules: [{required: true, message: '请输入联系人!'}],
                                                initialValue: `${contacts}`
                                            })(
                                                <Input placeholder="联系人"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='white personal_xiangqing_title'>
                            {/*<div className='xian'></div>*/}
                            {/*收货信息*/}
                            <div className='marginLeft20 personal_Jibenxinxi_title'>
                                <p className='personal_Jibenxinxi_title_p'>
                                    收货信息
                                </p>
                            </div>
                            <div className='personal_Jibenxinxi_title_con'>
                                <div className='infmConD'>
                                    <span>收货人：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="收货人姓名" />*/}
                                        <FormItem>
                                            {/*`${item.id}`*/}
                                            {getFieldDecorator('userName', {
                                                rules: [{required: true, message: '请输入收货人姓名!'}],
                                                initialValue: `${data.shr}`
                                            })(
                                                <Input placeholder="收货人姓名"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className='infmConD'>
                             <span>
                             收货地址：
                             </span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="收货地址" />*/}
                                        <FormItem>
                                            {getFieldDecorator('address', {
                                                rules: [{required: true, message: '请输入收货地址!'},],
                                                initialValue: `${data.shdz}`
                                            })(
                                                <Input placeholder="收货地址"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className='infmConD '>
                                    <span>收货电话：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="收货电话" maxLength="11"/>*/}
                                        <FormItem>
                                            {getFieldDecorator('phonenumber', {
                                                rules: [{required: true, message: '请输入收货电话!'}],
                                                initialValue: `${data.shdh}`
                                            })(
                                                <Input placeholder="收货电话" maxLength="11"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className='infmConD'>
                                    <span>收货邮编：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="邮编"  maxLength="6"/>*/}
                                        <FormItem>
                                            {getFieldDecorator('zipCode', {
                                                rules: [{required: true, message: '请输入邮编!'}],
                                                initialValue: `${data.shyb}`
                                            })(
                                                <Input placeholder="邮编" maxLength="6"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='white personal_xiangqing_title'>
                            {/*<div className='xian'></div>*/}
                            {/*收货信息*/}
                            <div className='marginLeft20 personal_Jibenxinxi_title'>
                                <p className='personal_Jibenxinxi_title_p'>
                                    经营范围
                                </p>
                            </div>
                            <div className='infmConD2'>
                                <Row gutter={24}>  {checkbox} </Row>
                            </div>
                            <div className='marginLeft20 personal_Jibenxinxi_title'>
                                <p className='personal_Jibenxinxi_title_p'>
                                    证件资料上传
                                </p>
                            </div>
                            <div
                                className='personal_Jibenxinxi_title_con3 personal_Jibenxinxi_title_con paddingBottom20'>
                                <div className='infmConD infmConD3'>
                                    <span>营业执照：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="收货人姓名" />*/}
                                        <FormItem>
                                            {getFieldDecorator('yyzzh', {
                                                rules: [{message: '请输入营业执照号码'}],
                                                initialValue: `${data.yyzzh}`
                                            })(
                                                <Input placeholder="请输入营业执照号码"/>
                                            )}
                                        </FormItem>
                                    </div>
                                    <div className='personal_Jibenxinxi_title_span2'>
                                        <input type="file"
                                               className='shangchuan_inp aaaa'
                                               accept="image/png, image/jpeg, image/jpg"
                                               id='shangchuan' data='yyzz'
                                               onInput={(e) => {
                                                   this.shangchuan(e)
                                               }}/>
                                        <label htmlFor="shangchuan" className='shangchuan_btn cursor'>上传图片</label>
                                        <span className='marginLeft5'>图片地址：<span
                                            className='shangchuan_dizhi'>无</span></span>
                                    </div>
                                </div>

                                <div className='infmConD infmConD3'>
                                    <span>医疗机构执业许可证：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        <FormItem>
                                            {getFieldDecorator('yljgxkzbh', {
                                                initialValue: `${data.yljgxkzbh}`
                                            })(
                                                <Input placeholder="医疗机构执业许可证号"/>
                                            )}
                                        </FormItem>

                                    </div>
                                    <div className='personal_Jibenxinxi_title_span2'>
                                        <input type="file" className='shangchuan_inp aaaa'
                                               accept="image/png, image/jpeg, image/jpg" id='shangchuan2'
                                               data="yljgxkz" onInput={(e) => {
                                            this.shangchuan(e)
                                        }}/>
                                        <label htmlFor="shangchuan" className='shangchuan_btn cursor'>上传图片</label>
                                        <span className='marginLeft5'>图片地址：<span
                                            className='shangchuan_dizhi'>无</span></span>
                                    </div>
                                </div>
                                <div className='infmConD infmConD3'>
                                    <span>采购人身份证：</span>
                                    <div className='personal_Jibenxinxi_title_span'>
                                        {/*<Input placeholder="收货人姓名" />*/}
                                        <FormItem>
                                            {getFieldDecorator('sfzh', {
                                                initialValue: `${data.sfzh}`
                                            })(
                                                <Input placeholder="请输入采购人身份证号码"/>
                                            )}
                                        </FormItem>

                                    </div>
                                    <div className='personal_Jibenxinxi_title_span2'>
                                        <input type="file" className='shangchuan_inp aaaa'
                                               accept="image/png, image/jpeg, image/jpg" id='shangchuan3'
                                               data='sfz' onInput={(e) => {
                                            this.shangchuan(e)
                                        }}/>
                                        <label htmlFor="shangchuan" className='shangchuan_btn cursor'>上传图片</label>
                                        <span className='marginLeft5'>图片地址：<span
                                            className='shangchuan_dizhi'>无</span></span>
                                    </div>
                                </div>
                                <div className='infmConD infmConD3'>
                                    <span>法人授权采购委托书：</span>
                                    <div className='personal_Jibenxinxi_title_span2'>
                                        <input type="file" className='shangchuan_inp aaaa'
                                               accept="image/png, image/jpeg, image/jpg" id='shangchuan4'
                                               data='sfz' onInput={(e) => {
                                            this.shangchuan(e)
                                        }}/>
                                        <label htmlFor="shangchuan" className='shangchuan_btn cursor'>上传图片</label>
                                        <span className='marginLeft5'>图片地址：<span
                                            className='shangchuan_dizhi'>无</span></span>
                                        <span className='marginLeft10'>请先下载</span>
                                        <span className='marginLeft5 blue'>法人授权采购委托书</span>
                                        <span className='marginLeft5'>填写后盖章扫描上传</span>
                                    </div>
                                </div>
                                <div className='infmConD infmConD3'>
                                    <span>收货委托书：</span>
                                    <div className='personal_Jibenxinxi_title_span2'>
                                        <input type="file" className='shangchuan_inp1 aaaa'
                                               accept="image/png, image/jpeg, image/jpg" id='shangchuan5'
                                               data='shwts' onInput={(e) => {
                                            this.shangchuan(e)
                                        }}/>
                                        <label htmlFor="shangchuan" className='shangchuan_btn cursor'>上传图片</label>
                                        <span className='marginLeft5'>图片地址：<span
                                            className='shangchuan_dizhi'>无</span></span>

                                        <span className='marginLeft10'>请先下载</span>
                                        <span className='marginLeft5 blue'>收货委托书</span>
                                        <span className='marginLeft5'>填写后盖章扫描上传</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*证件资料上传*/}
                        <div className="inforButtonBox">
                            <Button type="primary"
                                    htmlType="submit"
                                    loading={this.state.loading}
                            >
                                保存
                            </Button>
                        </div>


                    </Form>
                </div>
            </div>
        </div>

    }
}

export default Form.create()(withRouter(InformationPage));


















