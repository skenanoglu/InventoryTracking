import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row, Table, Tag } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateCorporateDebit from './components/createOrUpdateCorporateDebit';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import CorporateDebitStore from '../../stores/corporateDebitStore';
import { DeleteOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';

export interface ICorporateDebitProps {
  corporateDebitStore: CorporateDebitStore;
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

@inject(Stores.CorporateDebitStore)
@observer
class CorporateDebit extends AppComponentBase<ICorporateDebitProps, ICorporateDebitState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    corporateDebitStore: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
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
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      this.props.corporateDebitStore.createCorporateDebit();
    } else {
      await this.props.corporateDebitStore.get(entityDto);
    }

    this.setState({ corporateDebitStore: entityDto.id });
    this.Modal();

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
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
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
      } else {
        await this.props.corporateDebitStore.update({
          id: this.state.corporateDebitStore,
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
    const { CorporateDebits } = this.props.corporateDebitStore;
    const columns = [
      {
        title: L('Employee Id'),
        dataIndex: 'employeeId',
        key: 'employeeId',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },

      {
        title: L('Employee Name'),
        dataIndex: 'employeeName',
        key: 'employeeName',
        width: 150,
        render: (text: string) => <Tag color="magenta">{text}</Tag>,
      },
      {
        title: L('Employee Departement'),
        dataIndex: 'employeeDepartment',
        key: 'employeeDepartment',
        width: 150,
        render: (text: string) => <Tag color="geekblue">{text}</Tag>,
      },
      {
        title: L('Product Id'),
        dataIndex: 'productId',
        key: 'productId',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Product Count'),
        dataIndex: 'productCount',
        key: 'productCount',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Update'),
        width: 150,
        render: (text: string, item: any) => (
          <Button
            shape="round"
            type="primary"
            onClick={() => this.createOrUpdateModalOpen({ id: item.id })}
            icon={<SettingOutlined />}
          >
            {L('Update')}
          </Button>
        ),
      },
      {
        title: L('Delete'),
        width: 150,
        render: (text: string, item: any) => (
          <Button
            danger
            shape="round"
            type="primary"
            onClick={() => this.delete({ id: item.id })}
            icon={<DeleteOutlined />}
          >
            {L('Delete')}
          </Button>
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
            <h2>{L('CorporateDebits')}</h2>
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
