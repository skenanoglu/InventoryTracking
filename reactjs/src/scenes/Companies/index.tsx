import * as React from 'react';

import { Button, Card, Col, Dropdown, Menu, Modal, Row, Table, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateCompany from './components/createOrUpdateCompany';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import CompanyStore from '../../stores/companyStore';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';

export interface ICompanyProps {
  companyStore: CompanyStore;
}

export interface ICompanyState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  companyId: number;
  filter: string;
}

const confirm = Modal.confirm;

@inject(Stores.CompanyStore) //dependency injection -- bağımlılıklar sabit olarak kodlanmaz ve ortam değiştikçe değişebileceği anlamına gelir.
@observer
class Company extends AppComponentBase<ICompanyProps, ICompanyState> {
  formRef = React.createRef<FormInstance>();
  //uygulama içerisinde açılır menü içerisinde kullanılacak veriler

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    companyId: 0,
    filter: '',
  };

  async componentDidMount() {
    // ekran hazır olduğunda getall medotunu çağırır store içerisinde veriler model üzerinde canlı hale gelir
    await this.getAll();
  }

  async getAll() {
    // store gidip getall metodunu cağırır. içerisinde formu manipule eden parametreler bulunur.
    await this.props.companyStore.getAll();
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
      this.props.companyStore.createCompany(); //store dan create apisi cagırılır.
    } else {
      // eğer id boş değilse update işlemidir bu durumda update olduğunu anlıyoruz
      await this.props.companyStore.get(entityDto); //store dan update apisini cağırır.
    }

    this.setState({ companyId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      if (entityDto.id !== 0) {
        this.formRef.current?.setFieldsValue({
          ...this.props.companyStore.companyModel,
        });
      } else {
        this.formRef.current?.resetFields();
      }
    }, 100);
  }

  delete(input: EntityDto) {

    //delete butonunun metodudur.
    const self = this;
    return confirm({
      // emin misiniz için pop up açılır.
      title: 'Silmek istediğinize emin misiniz?',
      onOk() {
        // eğer ok a basıldıysa delete işlemigerçekleşecektir.
        self.props.companyStore.delete(input);
      },
      onCancel() {}, //cancel a basılırsa pencere kapanır
    });
  }

  handleCreate = async () => {
    this.formRef.current?.validateFields().then(async (values: any) => {
      if (this.state.companyId === 0) {
        await this.props.companyStore.create(values);
        message.info('Başarıyla Oluşturuldu');
      } else {
        await this.props.companyStore.update({ id: this.state.companyId, ...values });
        message.info('Başarıyla Güncellendi');
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      this.formRef.current?.resetFields();
    });
  };

  public render() {
    const { companies } = this.props.companyStore;
    const columns = [
      {
        title: L('Id'),
        dataIndex: 'id',
        key: 'id',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Şirket İsmi'),
        dataIndex: 'companyName',
        key: 'companyName',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Vergi No'),
        dataIndex: 'taxNo',
        key: 'taxNo',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Açıklama'),
        dataIndex: 'description',
        key: 'companyDescription',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Aksiyonlar'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>
                    {L('Güncelle')}
                  </Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Sil')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
              {L('Güncelle/Sil')}
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
            <h2>{L('Kurumlar')}</h2>
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
                total: companies === undefined ? 0 : companies.length,
                defaultCurrent: 1,
              }}
              columns={columns}
              loading={companies === undefined ? true : false}
              dataSource={companies === undefined ? [] : companies}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCompany
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.companyId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Company;
