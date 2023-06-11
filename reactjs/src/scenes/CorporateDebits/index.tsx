import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table, Tag, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateCorporateDebit from './components/createOrUpdateCorporateDebit';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import CorporateDebitStore from '../../stores/corporateDebitStore';
import { DeleteOutlined, DownloadOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import ProductStore from '../../stores/productStore';
import { CSVLink } from 'react-csv';

export interface ICorporateDebitProps {
  corporateDebitStore: CorporateDebitStore;
  productStore: ProductStore;
}

export interface ICorporateDebitState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  corporateDebitStore: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.CorporateDebitStore) // dependency injection ile storedaki metodlar kullanılıor
@inject(Stores.ProductStore) // dependency injection ile storedaki metodlar kullanılıor
@observer
class CorporateDebit extends AppComponentBase<ICorporateDebitProps, ICorporateDebitState> {
  formRef = React.createRef<FormInstance>(); //form rereransı oluşturulur

  state = {
    // çalışma zamanında manipule edilecek olan veriler state management ile kontrol edilir.
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    corporateDebitStore: 0,
    filter: '',
  };

  async componentDidMount() {
    // uygulama hazır olduğunda çalışacaktır.
    await this.getAll();
  }

  async getAll() {
    // d.i ile corporateDebitStore dan get all ile tüm veriler çağırırlır.
    await this.props.corporateDebitStore.getAll({
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
    // update ve create modellerinin visible durumunu manipule eder.
    this.setState({
      modalVisible: !this.state.modalVisible, // suanki visible durumunu not işlemiyle tersine cevirir.
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    // create or update modellerine tıklandığındaaynı komponenti cağırır
    if (entityDto.id === 0) {
      // entitydto class ta 0 isee create amaclı basılmıstır.
      this.props.corporateDebitStore.createCorporateDebit();
    } else {
      // eğer id boş değilse update işlemidir bu durumda update olduğunu anlıyoruz
      await this.props.corporateDebitStore.get(entityDto); //store dan update apisini cağırır.
    }

    this.setState({ corporateDebitStore: entityDto.id }); // id yi state management ile tutar.
    this.Modal(); // modelin visible durumunu tersler ( true ==> false || false ==> false)

    setTimeout(() => {
      if (entityDto.id !== 0) {
        this.formRef.current?.setFieldsValue({
          ...this.props.corporateDebitStore.CorporateDebitModel,
        });
      } else {
        this.formRef.current?.resetFields();
      }
    }, 100);
  }

  delete(input: EntityDto) {
    //delete butonuna basıldığında calisacak metoddur.
    const self = this;
    confirm({
      // eğer ok a basıldıysa delete işlemigerçekleşecektir.
      title: 'Silmek istediğinize emin misiniz?',
        onOk() {
        self.props.corporateDebitStore.delete(input);
      },
      onCancel() {},
    });
  }

  handleCreate = async () => {
    this.formRef.current?.validateFields().then(async (values: any) => {
      if (this.state.corporateDebitStore === 0) {
        await this.props.corporateDebitStore.create(values);
        message.info('Başarıyla Oluşturuldu');
      } else {
        await this.props.corporateDebitStore.update({
          id: this.state.corporateDebitStore,
          ...values,
        });
        message.info('Başarıyla Güncellendi');
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
    const { CorporateDebits } = this.props.corporateDebitStore;
    const columns = [
      {
        title: L('Çalışan Id'),
        dataIndex: 'employeeId',
        key: 'employeeId',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },

      {
        title: L('Çalışan İsmi'),
        dataIndex: 'employeeName',
        key: 'employeeName',
        width: 150,
        render: (text: string) => <Tag color="magenta">{text}</Tag>,
      },
      {
        title: L('Çalışan Departmanı'),
        dataIndex: 'employeeDepartment',
        key: 'employeeDepartment',
        width: 150,
        render: (text: string) => <Tag color="geekblue">{text}</Tag>,
      },
      {
        title: L('Ürün Id'),
        dataIndex: 'productId',
        key: 'productId',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Ürün Sayısı'),
        dataIndex: 'productCount',
        key: 'productCount',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title:('Aksiyonlar'),
        width: 150,
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
                        filename={"corporateDebits.csv"}
                        data={CorporateDebits === undefined ? [] : CorporateDebits.items}
                        className="btn btn-primary"
                      >
                        CSV Olarak Dışa Aktar
                      </CSVLink>
                    </Menu.Item>
                    <Menu.Item>
                    <CSVLink
                        filename={"TableContent.pdf"}
                        data={CorporateDebits === undefined ? [] : CorporateDebits.items}
                        className="btn btn-primary"
                      >
                        PDF Olarak Dışa Aktar
                      </CSVLink>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomLeft"
              >
                <Button type="primary" icon={<DownloadOutlined />}>
                {('Dışarı Aktar')}
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
            <h2>{L('Kurumsal Zimmet')}</h2>
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
                total: CorporateDebits === undefined ? 0 : CorporateDebits.totalCount,
                defaultCurrent: 1,
              }}
              columns={columns}
              loading={CorporateDebits === undefined ? true : false}
              dataSource={CorporateDebits === undefined ? [] : CorporateDebits.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCorporateDebit
          productStore={this.props.productStore}
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.corporateDebitStore === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default CorporateDebit;
