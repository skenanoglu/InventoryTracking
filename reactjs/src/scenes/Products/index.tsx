import * as React from 'react';

import { Button, Card, Col, Dropdown, Menu, Modal, Row, Table, Tag, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateProduct from './components/createOrUpdateProduct';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import ProductStore from '../../stores/productStore';
import { DeleteOutlined, DownloadOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

export interface IProductProps {
  productStore: ProductStore;
}

export interface IProductState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  productId: number;
  filter: string;
}

const confirm = Modal.confirm;

@inject(Stores.ProductStore) //dependency injection -- bağımlılıklar sabit olarak kodlanmaz ve ortam değiştikçe değişebileceği anlamına gelir.
@observer
class Product extends AppComponentBase<IProductProps, IProductState> {
  formRef = React.createRef<FormInstance>();
  //uygulama içerisinde açılır menü içerisinde kullanılacak veriler

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    productId: 0,
    filter: '',
  };

  async componentDidMount() {
    // ekran hazır olduğunda getall medotunu çağırır store içerisinde veriler model üzerinde canlı hale gelir
    await this.getAll();
  }

  async getAll() {
    // store gidip getall metodunu cağırır. içerisinde formu manipule eden parametreler bulunur.
    await this.props.productStore.getAll();
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
      this.props.productStore.createProduct(); //store dan create apisi cagırılır.
    } else {
      // eğer id boş değilse update işlemidir bu durumda update olduğunu anlıyoruz
      await this.props.productStore.get(entityDto); //store dan update apisini cağırır.
    }

    this.setState({ productId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      if (entityDto.id !== 0) {
        this.formRef.current?.setFieldsValue({
          ...this.props.productStore.productModel,
        });
      } else {
        this.formRef.current?.resetFields();
      }
    }, 100);
  }

  delete(input: EntityDto) {
    //delete butonunun metodudur.
    const self = this;
    confirm({
      // emin misiniz için pop up açılır.
      title: 'Silmek istediğinize emin misiniz?',
      onOk() {
        // eğer ok a basıldıysa delete işlemigerçekleşecektir.
        self.props.productStore.delete(input);
      },
      onCancel() {}, //cancel a basılırsa pencere kapanır
    });
  }

  handleCreate = async () => {
    this.formRef.current?.validateFields().then(async (values: any) => {
      if (this.state.productId === 0) {
        await this.props.productStore.create(values);
        message.info('Başarıyla Oluşturuldu');
      } else {
        await this.props.productStore.update({ id: this.state.productId, ...values });
        message.info('Başarıyla Güncellendi');
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      this.formRef.current?.resetFields();
    });
  };

  public render() {
    const { products } = this.props.productStore;
    const columns = [
      {
        title: L('Id'),
        dataIndex: 'id',
        key: 'id',
        width: 70,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('İsim'),
        dataIndex: 'name',
        key: 'productName',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Marka'),
        dataIndex: 'brand',
        key: 'productBrand',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Kapasite'),
        dataIndex: 'capacity',
        key: 'capacity',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Ağırlık'),
        dataIndex: 'weight',
        key: 'productWeight',
        width: 150,
        render: (text: string) =>
          text === '10+KG' ? (
            <Tag color="#Be2536">{text} **DİKKAT AĞIR YÜK**</Tag>
          ) : text === '5-10KG' ? (
            <Tag color="#BE8025">{text} **ORTA AĞIRLIK**</Tag>
          ) : (
            <Tag color="#25be33">{text}</Tag>
          ),
      },
      {
        title: L('Açıklama'),
        dataIndex: 'description',
        key: 'productDescription',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Adet'),
        dataIndex: 'count',
        key: 'productCount',
        width: 70,
        render: (text: number) =>
          text < 20 ? <Tag color="#cd201f">{text}</Tag> : <Tag color="#55acee">{text}</Tag>,
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
                        data={products === undefined ? [] : products}
                        className="btn btn-primary"
                      >
                        CSV Olarak Dışa Aktar
                      </CSVLink>
                    </Menu.Item>
                    <Menu.Item>
                    <CSVLink
                        filename={"products.pdf"}
                        data={products === undefined ? [] : products}
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
            <h2>{L('Products')}</h2>
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
        <Row></Row>
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
                total: products === undefined ? 0 : products.length,
                defaultCurrent: 1,
              }}
              columns={columns}
              loading={products === undefined ? true : false}
              dataSource={products === undefined ? [] : products}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateProduct
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.productId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Product;
