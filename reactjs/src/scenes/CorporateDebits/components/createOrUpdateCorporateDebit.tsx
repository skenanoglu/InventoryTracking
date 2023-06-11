import * as React from 'react';

import { Form, Input, InputNumber, Modal, Select } from 'antd';

import { FormInstance } from 'antd/lib/form';
import '../index.less';
import { L } from '../../../lib/abpUtility';
import ProductStore from '../../../stores/productStore';

export interface ICreateOrUpdateCorporateDebitProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
  productStore: ProductStore;
}

class CreateOrUpdateCorporateDebit extends React.Component<ICreateOrUpdateCorporateDebitProps> {

  async componentDidMount(): Promise<void> {
    await this.props.productStore.getAll();
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },

    };

    const products =()=> {
      return this.props.productStore.products && this.props.productStore.products.map(x=> {return {label : x.name , value: x.id}})
    }

    const { visible, onCancel, onCreate, formRef } = this.props;

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
        title={L('CorporateDebits')}
        width={700}
        className={'modalStyle'}
      >
        <Form ref={formRef}>
          <Form.Item label={L('Çalışan Id')} name={'employeeId'} {...formItemLayout}>
            <InputNumber />
          </Form.Item>
          <Form.Item label={L('Departman')} name={'employeeDepartment'} {...formItemLayout}>
            <Select
              options={[
                {
                  value: 'Marketing Department',
                  label: 'Marketing Department',
                },
                {
                  value: 'Administration',
                  label: 'Administration',
                },
                {
                  value: 'Sales Department',
                  label: 'Sales Department',
                },
                {
                  value: 'Human Resource Department',
                  label: 'Human Resource Department',
                },
                {
                  value: 'Operations Department',
                  label: 'Operations Department',
                },
                {
                  value: 'Finance Department',
                  label: 'Finance Department',
                },
                {
                  value: 'Purchase Department',
                  label: 'Purchase Department',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={L('Çalışan İsmi')} name={'employeeName'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Ürün')} name={'productId'} {...formItemLayout}>
            <Select
              style={{ width: 120 }}
              options={products()}
            />
          </Form.Item>
          <Form.Item label={L('Ürün Sayısı')} name={'productCount'} {...formItemLayout}>
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: '1',
                  label: '1',
                },
                {
                  value: '2',
                  label: '2',
                },
                {
                  value: '4',
                  label: '4',
                },
                {
                  value: '3',
                  label: '3',
                },
                {
                  value: '5',
                  label: '5',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCorporateDebit;
