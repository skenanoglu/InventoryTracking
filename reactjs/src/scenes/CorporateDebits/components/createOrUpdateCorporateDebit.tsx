import * as React from 'react';

import { Form, InputNumber, Modal, Select } from 'antd';

import { FormInstance } from 'antd/lib/form';
import '../index.less';
import { L } from '../../../lib/abpUtility';
import ProductStore from '../../../stores/productStore';
import CompanyStore from '../../../stores/companyStore';

export interface ICreateOrUpdateCorporateDebitProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
  productStore: ProductStore;
  companyStore : CompanyStore;
}

class CreateOrUpdateCorporateDebit extends React.Component<ICreateOrUpdateCorporateDebitProps> {

  async componentDidMount(): Promise<void> {
    await this.props.productStore.getAll();
    await this.props.companyStore.getAll();
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
    const sirketler =()=> {
      return this.props.companyStore.companies && this.props.companyStore.companies.map(x=> {return {label : x.companyName , value: x.id}})
    }

    const { visible, onCancel, onCreate, formRef } = this.props;

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
        title={L('Kurumsal Zimmet')}
        width={700}
        className={'modalStyle'}
      >
        <Form ref={formRef}>
        <Form.Item label={"Şirket"} name={'companyId'} {...formItemLayout}>
            <Select
              options={sirketler()}
            />
          </Form.Item>
          <Form.Item label={L('Departman')} name={'employeeDepartment'} {...formItemLayout}>
            <Select
              options={[
                {
                  value: 'Pazarlama Departmanı',
                  label: 'Pazarlama Departmanı',
                },
                {
                  value: 'Yönetici',
                  label: 'Yönetici',
                },
                {
                  value: 'Satış Departmanı',
                  label: 'Satış Departmanı',
                },
                {
                  value: 'İnsan Kaynakları Departmanı',
                  label: 'İnsan Kaynakları Departmanı',
                },
                {
                  value: 'Operations Departmanı',
                  label: 'Operations Departmanı',
                },
                {
                  value: 'Finans Departmanı',
                  label: 'Finans Departmanı',
                },
                {
                  value: 'Satın Alma Departmanı',
                  label: 'Satın Alma Departmanı',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={L('Ürün')} name={'productId'} {...formItemLayout}>
            <Select
              options={products()}
            />
          </Form.Item>
          <Form.Item label={('Ürün Sayısı')} name={'productCount'} {...formItemLayout}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCorporateDebit;
