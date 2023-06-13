import './index.less';

import * as React from 'react';

import {Col,Row } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';

import { L } from '../../lib/abpUtility';
// import LanguageSelect from '../LanguageSelect';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  collapsed?: any;
  toggle?: any;
}

export class Header extends React.Component<IHeaderProps> {
  render() {
    return (
      <Row className={'header-container'}>
        <Col style={{ textAlign: 'left' }} span={1}>
          {this.props.collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={this.props.toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={this.props.toggle} />
          )}
        </Col>
        <Col span={11}>
            <b>Invento ( Zimmet ve Envanter Takip Uygulaması )</b>
        </Col>
        <Col style={{ paddingRight : 30,  textAlign: 'right'}} span={12}>
          <Link to="/logout">
          <LogoutOutlined  style={{color : "red"}}/>
            <span style={{color : "red" , fontSize : 20}}> {L('Logout')}</span>
        </Link>
        </Col>
      </Row>
    );
  }
}

export default Header;
