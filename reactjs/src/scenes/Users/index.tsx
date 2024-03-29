import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table, Tag, message } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import { EntityDto } from '../../services/dto/entityDto';
import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, DownloadOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

declare var abp : any;
export interface IUserProps {
  userStore: UserStore;
}

export interface IUserState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  userId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class User extends AppComponentBase<IUserProps, IUserState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    userId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {

    if(!this.props.userStore.users.items.find(x=>x.id == abp.session.userId)?.roleNames.includes("ADMIN")){
       return  message.error("Kullanıcı role yetkiniz bulunmamktadır.")
    }

    if (entityDto.id === 0) {
      await this.props.userStore.createUser();
      await this.props.userStore.getRoles();
    } else {
      await this.props.userStore.get(entityDto);
      await this.props.userStore.getRoles();
    }

    this.setState({ userId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.userStore.editUser });
    }, 100);
  }

  delete(input: EntityDto) {
    
    if(!this.props.userStore.users.items.find(x=>x.id == abp.session.userId)?.roleNames.includes("ADMIN")){
      return  message.error("Kullanıcı role yetkiniz bulunmamktadır.")
   }

    const self = this;
    return confirm({
      title: 'Silmek istediğinize emin misiniz?',
      onOk() {
        self.props.userStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.userId === 0) {
        await this.props.userStore.create(values);
      } else {
        await this.props.userStore.update({ ...values, id: this.state.userId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { users } = this.props.userStore;
    const columns = [
      { title:'Kullanıcı Adı', dataIndex: 'userName', key: 'userName', width: 150, render: (text: string) => <div>{text}</div> },
      { title:'İsim', dataIndex: 'name', key: 'name', width: 100, render: (text: string) => <div>{text}</div> },
      { title:'Email Adres', dataIndex: 'emailAddress', key: 'emailAddress', width: 100, render: (text: string) => <div>{text}</div> },
      { title:'Roller', dataIndex: 'roleNames', key: 'roleNames', width: 100, render: (text: string[]) => text.map(x=><Tag color="blue">{x}</Tag>)},
        {
        title:'Aktif Mi?',
        dataIndex: 'isActive',
        key: 'isActive',
        width: 150,
        render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{('Aktif')}</Tag> : <Tag color="red">{('Pasif')}</Tag>),
      },
      {
        title: 'Aksiyonlar',
        width: 200,
        render: (text: string, item: any) => (
          <div>
            <Row gutter={16}>
              <Col> 
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{('Güncelle')}</Menu.Item>
                    <Menu.Item onClick={() => this.delete({ id: item.id })}>{ <><DeleteOutlined/> Sil </>}</Menu.Item>
                  </Menu>
                }
                placement="bottomLeft"
              >
                <Button type="primary" icon={<SettingOutlined />}>
                {('Güncelle/Sil')}
                </Button>
              </Dropdown>
              </Col>
              <Col>
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item>
                      <CSVLink
                        filename={"users.csv"}
                        data={users === undefined ? [] : users.items}
                        className="btn btn-primary"
                      >
                        CSV Olarak Dışa Aktar
                      </CSVLink>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomLeft"
              >
                <Button type="primary" icon={<DownloadOutlined />}>
                {('Dışa Aktar')}
                </Button>
              </Dropdown>
              </Col>
          </Row>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>{('Kişiler')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey={(record) => record.id.toString()}
              bordered={true}
              columns={columns}
              pagination={{ pageSize: 10, total: users === undefined ? 0 : users.totalCount, defaultCurrent: 1 }}
              loading={users === undefined ? true : false}
              dataSource={users === undefined ? [] : users.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateUser
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.userId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          roles={this.props.userStore.roles}
        />
      </Card>
    );
  }
}

export default User;
