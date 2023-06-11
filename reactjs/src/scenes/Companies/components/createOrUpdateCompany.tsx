import * as React from 'react';

import { Form, Input, Modal } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';

export interface ICreateOrUpdateCompanyProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateCompany extends React.Component<ICreateOrUpdateCompanyProps> {
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
        title={L('Companies')}
        width={550}
      >
        <Form ref={formRef}>
          <Form.Item label={L('Company Name')} name={'companyName'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Tax No')} name={'taxNo'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Description')} name={'description'} {...formItemLayout}>
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

export default CreateOrUpdateCompany;
