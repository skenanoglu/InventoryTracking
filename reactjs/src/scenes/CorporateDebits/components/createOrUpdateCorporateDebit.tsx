import * as React from 'react';

import { Form, Input, Modal } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';

export interface ICreateOrUpdateCorporateDebitProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateCorporateDebit extends React.Component<ICreateOrUpdateCorporateDebitProps> {
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
        title={L('CorporateDebits')}
        width={550}
      >
        <Form ref={formRef}>
          <Form.Item label={L('Employee Id')} name={'employeeId'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item
            label={L('Employee Department')}
            name={'employeeDepartment'}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item label={L('employee Name')} name={'employeeName'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('product Id')} name={'productId'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('product Count')} name={'productCount'} {...formItemLayout}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCorporateDebit;
