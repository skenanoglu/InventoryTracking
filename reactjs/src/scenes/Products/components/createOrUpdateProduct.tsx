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
        title={L('Products')}
        width={550}
      >
        <Form ref={formRef}>
          <Form.Item label={L('Name')} name={'name'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Brand')} name={'brand'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Capacity')} name={'capacity'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Weight')} name={'weight'} {...formItemLayout}>
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
          <Form.Item label={L('Description')} name={'description'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Count')} name={'count'} {...formItemLayout}>
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
