import * as React from 'react';

import { Checkbox, Form, Input, InputNumber, Modal, Radio, Select } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';
import UserStore from '../../../stores/userStore';
import ProductStore from '../../../stores/productStore';
import CompanyStore from '../../../stores/companyStore';
import DamageStore from '../../../stores/damage';

export interface ICreateOrUpdateDamageProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;

  userStore: UserStore;
  productStore: ProductStore;
  companyStore: CompanyStore;
  damageStore: DamageStore;
}

export interface ICreateOrUpdateDamageState {
  disabled : boolean;
}

class CreateOrUpdateDamage extends React.Component<ICreateOrUpdateDamageProps,ICreateOrUpdateDamageState> {
 
  componentDidUpdate(prevProps: Readonly<ICreateOrUpdateDamageProps>, prevState: Readonly<ICreateOrUpdateDamageState>, snapshot?: any): void {
    if(prevProps.visible != this.props.visible) {
      this.setState({disabled : this.props.damageStore.damageModel.companyOrUser == 0})
    }
  }
  state = {
    disabled: false,
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

    const tailFormItemLayout = {
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
    const kullanicilar =()=> {
      return this.props.userStore.users && this.props.userStore.users.items.map(x=> {return {label : x.fullName , value: x.id}})
    }
    const sirketler =()=> {
      return this.props.companyStore.companies && this.props.companyStore.companies.map(x=> {return {label : x.companyName , value: x.id}})
    }
    
    const onValuesChange = (data:any) => {
      if(data.companyOrUser !=undefined){
        if(data.companyOrUser == 0) 
        {
          this.setState({disabled : true})
          return this.props.formRef.current?.resetFields(["companyId"])
        }
        if(data.companyOrUser == 1)  
        {
          this.setState({disabled : false})
          return this.props.formRef.current?.resetFields(["userId"])
        }
      }
    }
    const { visible, onCancel, onCreate, formRef } = this.props;

    return (
      <Modal visible={visible} onCancel={onCancel} onOk={onCreate} title={L('Damages')} width={550}>
        Hasar Kişiye Mi Kuruma Mı Ait?
        <Form ref={formRef} onValuesChange={onValuesChange} initialValues={{companyOrUser : 0}}>
        <Form.Item name={'companyOrUser'} {...formItemLayout}>
          <Radio.Group>
            <Radio value={0}> Kişi </Radio>
            <Radio value={1}> Kurum </Radio>
          </Radio.Group>
          </Form.Item> 
        <Form.Item label={"Şirket"} name={'companyId'} {...formItemLayout}>
            <Select
              disabled={this.state.disabled}
              options={sirketler()}
            />
          </Form.Item> 
          <Form.Item label={"Kullanıcı"} name={'userId'} {...formItemLayout}>
            <Select 
              disabled={!this.state.disabled}
              options={kullanicilar()}
            />
          </Form.Item>
          <Form.Item label={('Ürün')} name={'productId'} {...formItemLayout}>
          <Select
              style={{ width: 120 }}
              options={products()}
            />          
            </Form.Item>
            <Form.Item label={"Hasarlı Ürün Sayısı"} name={'count'} {...formItemLayout}>
            <InputNumber />
          </Form.Item>          
          <Form.Item label={"Hasar Açıklaması"} name={'damageDescription'} {...formItemLayout}>
            <Input />
          </Form.Item>          
          <Form.Item label={"Tamir Maliyeti"} name={'repairCost'} {...formItemLayout}>
            <InputNumber />
          </Form.Item>          
          <Form.Item label={"Tamir Süresi"} name={'repairDate'} {...formItemLayout}>
            <InputNumber />
          </Form.Item>
          <Form.Item label={L('Tamir Edildi Mi')} name={'isRepaired'} valuePropName={'checked'} {...tailFormItemLayout}>
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateDamage;
