import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table, Tag } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdatePersonelDebit from './components/createOrUpdatePersonelDebit';
import { EntityDto } from '../../services/dto/entityDto';
import Stores from '../../stores/storeIdentifier';
import PersonelDebitStore from '../../stores/personelDebitStore';
import { DeleteOutlined, DownloadOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import ProductStore from '../../stores/productStore';
import { CSVLink } from 'react-csv';
import { L } from '../../lib/abpUtility';
import UserStore from '../../stores/userStore';

export interface IPersonelDebitProps {
  personelDebitStore: PersonelDebitStore;
  productStore: ProductStore;
  userStore: UserStore;
}

export interface IPersonelDebitState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  personelDebitStore: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.PersonelDebitStore)
@inject(Stores.ProductStore)
@inject(Stores.UserStore)
@observer
class PersonelDebit extends AppComponentBase<IPersonelDebitProps, IPersonelDebitState> {
  formRef = React.createRef<FormInstance>();

  /**uygulama calisirken o anda mudahale edilen verilerin tabloda anında karsılıgını gormek için yazıldı
   * kısaca durum yönetimi amaclıdır.
   */
  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    personelDebitStore: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.personelDebitStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
    });
  }

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      this.props.personelDebitStore.createPersonelDebit();
    } else {
      await this.props.personelDebitStore.get(entityDto);
    }

    this.setState({ personelDebitStore: entityDto.id });
    this.Modal();

    setTimeout(() => {
      if (entityDto.id !== 0) {
        this.formRef.current?.setFieldsValue({
          ...this.props.personelDebitStore.PersonelDebitModel,
        });
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
        self.props.personelDebitStore.delete(input);
      },
      onCancel() {},
    });
  }

  handleCreate = async () => {
    this.formRef.current?.validateFields().then(async (values: any) => {
      if (this.state.personelDebitStore === 0) {
        await this.props.personelDebitStore.create(values);
      } else {
        await this.props.personelDebitStore.update({
          id: this.state.personelDebitStore,
          ...values,
        });
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
    const { PersonelDebits } = this.props.personelDebitStore;
    const { users } = this.props.userStore;
    
    const columns = [
      {
        title: ('İsim'),
        dataIndex: 'userId',
        key: 'userId',
        width: 150,
        render: (text: any) => <Tag color='blue'>{users === undefined ? [] : users.items.find((x:any)=>x.id == text )?.fullName}</Tag>,
      },
      {
        title: ('Açıklama'),
        dataIndex: 'description',
        key: 'description',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: ('Ürün Id'),
        dataIndex: 'productId',
        key: 'productId',
        width: 100,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Ürün İsmi'),
        dataIndex: "product",
        key: 'product',
        width: 150,
        render: (text: any) => <Tag color='blue'>{text.name}</Tag>,
      },
      {
        title: ('Ürün Sayısı'),
        dataIndex: 'productCount',
        key: 'productCount',
        width: 100,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title:('Aksiyonlar'),
        width: 250,
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
                        filename={"TableContent.csv"}
                        data={ PersonelDebits === undefined ? [] : PersonelDebits.items}
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
            <h2>{('Kişisel Zimmet')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => this.createOrUpdateModalOpen({ id: 0 })}
            />
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
              pagination={{
                pageSize: this.state.maxResultCount,
                total: PersonelDebits === undefined ? 0 : PersonelDebits.totalCount,
                defaultCurrent: 1,
              }}
              columns={columns}
              loading={PersonelDebits === undefined ? true : false}
              dataSource={PersonelDebits === undefined ? [] : PersonelDebits.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdatePersonelDebit
          productStore={this.props.productStore}
          userStore={this.props.userStore}

          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.personelDebitStore === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default PersonelDebit;
