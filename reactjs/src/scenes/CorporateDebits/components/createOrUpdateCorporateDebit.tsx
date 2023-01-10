import * as React from 'react';

import { Form, Input, InputNumber, Modal, Select } from 'antd';

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
            <InputNumber />
          </Form.Item>
          <Form.Item label={L('Department')} name={'employeeDepartment'} {...formItemLayout}>
            <Select
              defaultValue="Software Department <3"
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
          <Form.Item label={L('employee Name')} name={'employeeName'} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('product Id')} name={'productId'} {...formItemLayout}>
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: '77',
                  label: '77',
                },
                {
                  value: '66',
                  label: '66',
                },
                {
                  value: '55',
                  label: '55',
                },
                {
                  value: '44',
                  label: '44',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={L('product Count')} name={'productCount'} {...formItemLayout}>
            <Select
              style={{ width: 120 }}
              options={[
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
