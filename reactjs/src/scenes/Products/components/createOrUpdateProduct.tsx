import * as React from 'react';

import { Form, Input, Modal, Select } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';

export interface ICreateOrUpdateProductProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateProduct extends React.Component<ICreateOrUpdateProductProps> {
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

    const { visible, onCancel, onCreate, formRef } = this.props;

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
        title={L('Ürünler')}
        width={550}
      >
        <Form ref={formRef}>
          <Form.Item label={L('İsim')} name={'name'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Marka')} name={'brand'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Kapasite')} name={'capacity'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Ağırlık')} name={'weight'} {...formItemLayout}>
            <Select
              defaultValue="0-1KG"
              style={{ width: 120 }}
              options={[
                {
                  value: '1-3KG',
                  label: '1-3KG',
                },
                {
                  value: '3-5KG',
                  label: '3-5KG',
                },
                {
                  value: '5-10KG',
                  label: '5-10KG',
                },
                {
                  value: '10+KG',
                  label: '10+KG',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={L('Açıklama')} name={'description'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Adet')} name={'totalCount'} {...formItemLayout}>
            <Input />
          </Form.Item>          
          <Form.Item label={L('Zimmet Verilen Adet')} name={'countInDebit'} {...formItemLayout}>
            <Input />
          </Form.Item>
          {/* <Form.Item
            label={L('IsActive')}
            name={'isActive'}
            valuePropName={'checked'}
            {...tailFormItemLayout}
          >
            <Checkbox />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateProduct;
