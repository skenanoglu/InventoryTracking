import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table, Tag } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateDamage from './components/createOrUpdateDamage';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import DamageStore from '../../stores/damage';
import UserStore from '../../stores/userStore';
import CompanyStore from '../../stores/companyStore';
import ProductStore from '../../stores/productStore';

export interface IDamageProps {
  damageStore: DamageStore;
  userStore: UserStore;
  productStore: ProductStore;
  companyStore: CompanyStore;
}

export interface IDamageState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  damageId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.DamageStore)
@inject(Stores.UserStore)
@inject(Stores.ProductStore)
@inject(Stores.CompanyStore)
@observer
class Damage extends AppComponentBase<IDamageProps, IDamageState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    damageId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.damageStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    await this.props.companyStore.getAll();
    await this.props.productStore.getAll();
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
    if (entityDto.id === 0) {
      this.props.damageStore.createDamage();
    } else {
      await this.props.damageStore.get(entityDto);
    }

    this.setState({ damageId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      if (entityDto.id !== 0) {
        this.formRef.current?.setFieldsValue({...this.props.damageStore.damageModel});
      } else {
        this.formRef.current?.resetFields();
      }
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Silmek istediğinize emin misiniz?',
      onOk() {
        self.props.damageStore.delete(input);
      },
      onCancel() {},
    });
  }

  handleCreate = async () => {
    this.formRef.current?.validateFields().then(async (values: any) => {
      if (this.state.damageId === 0) {
        await this.props.damageStore.create(values);
      } else {
        await this.props.damageStore.update({ id: this.state.damageId, ...values });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      this.formRef.current?.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { damages } = this.props.damageStore;
    const { users } = this.props.userStore;
    const { products } = this.props.productStore;
    const { companies } = this.props.companyStore;

    const columns = [
      { title: L('Ürün'), dataIndex: 'productId', key: 'productId', width: 150, render: (text: any) =><Tag color='purple'>{products === undefined ? [] : products.find((x:any)=>x.id == text )?.name}</Tag> },
      { title: L('Kullanıcı'), dataIndex: 'userId', key: 'userId', width: 150,render: (text: any) => <Tag color='blue'>{users === undefined ? [] : users.items.find((x:any)=>x.id == text )?.fullName}</Tag> },
      { title: L('Şirket'), dataIndex: 'companyId', key: 'companyId', width: 150, render: (text: any) => <Tag color='cyan'>{companies === undefined ? [] : companies.find((x:any)=>x.id == text )?.companyName}</Tag> },
      { title: L('Hasar Açıklaması'), dataIndex: 'damageDescription', key: 'damageDescription', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('Tamir Süresi'), dataIndex: 'repairDate', key: 'repairDate', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('Tamir Maliyeti'), dataIndex: 'repairCost', key: 'repairCost', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('Hasarlı Adet'), dataIndex: 'count', key: 'count', width: 150, render: (text: string) => <div>{text}</div> },
      {
        title: L('Tamirli Mi'),
        dataIndex: 'isRepaired',
        key: 'isRepaired',
        width: 150,
        render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Yes')}</Tag> : <Tag color="red">{L('No')}</Tag>),
      },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
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
            <h2>{L('Hasar Girişi')}</h2>
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
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
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
              rowKey="id"
              bordered={true}
              pagination={{ pageSize: this.state.maxResultCount, total: damages === undefined ? 0 : damages.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={damages === undefined ? true : false}
              dataSource={damages === undefined ? [] : damages.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateDamage
          companyStore={this.props.companyStore}
          userStore={this.props.userStore}
          productStore={this.props.productStore}
          damageStore={this.props.damageStore}
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.damageId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Damage;
