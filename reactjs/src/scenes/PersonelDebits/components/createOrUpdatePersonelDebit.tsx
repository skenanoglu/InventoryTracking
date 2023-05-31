import * as React from 'react';

import { Form, Input, InputNumber, Modal, Select } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';
import '../index.less';
import ProductStore from '../../../stores/productStore';

export interface ICreateOrUpdatePersonelDebitProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
  productStore: ProductStore;
}

class CreateOrUpdatePersonelDebit extends React.Component<ICreateOrUpdatePersonelDebitProps> {

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
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
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
        title={L('PersonelDebits')}
        width={550}
        className={'modalStyle'}
      >
        <Form ref={formRef}>
          <Form.Item label={L('Name')} name={'name'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Surname')} name={'surName'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Description')} name={'description'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('TC NO')} name={'tcno'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Product Name')} name={'productId'} {...formItemLayout}>
          <Select
              style={{ width: 120 }}
              options={products()}
            />          
            </Form.Item>
          <Form.Item label={L('Product Count')} name={'productCount'} {...formItemLayout}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdatePersonelDebit;
