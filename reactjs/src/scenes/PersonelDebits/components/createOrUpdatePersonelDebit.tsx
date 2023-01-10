import * as React from 'react';

import { Form, Input, InputNumber, Modal } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';

export interface ICreateOrUpdatePersonelDebitProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdatePersonelDebit extends React.Component<ICreateOrUpdatePersonelDebitProps> {
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
        title={L('PersonelDebits')}
        width={550}
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
          <Form.Item label={L('Product Id')} name={'productId'} {...formItemLayout}>
            <InputNumber />
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
