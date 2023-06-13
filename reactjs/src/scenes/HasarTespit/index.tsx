import React from 'react';
import { Select, Input, Button, InputNumber, Form, Row, Col } from 'antd';
import jsPDF from 'jspdf';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import ProductStore from '../../stores/productStore';
import UserStore from '../../stores/userStore';

interface IHasarTespitProps {
  productStore: ProductStore;
  userStore: UserStore;
}

interface IHasarTespitState {
  selectedProduct: string;
  selectedUser : string;
  description: string;
  quantity: number;
}

@inject(Stores.ProductStore) // dependency injection ile storedaki metodlar kullanılıor
@inject(Stores.UserStore) // dependency injection ile storedaki metodlar kullanılıor
@observer
class HasarTespit extends React.Component<IHasarTespitProps, IHasarTespitState> {

  async componentDidMount(): Promise<void> {
    await this.props.productStore.getAll();
    await this.props.userStore.getAll({
      keyword: '',
      maxResultCount: 100,
      skipCount: 0
    });
  }

  constructor(props: IHasarTespitProps) {
    super(props);
    this.state = {
      selectedProduct: '',
      selectedUser : '',
      description: '',
      quantity: 1
    };
  }

  handleProductChange = (value: string) => {
    this.setState({ selectedProduct: value });
  };

  handleUserChange = (value: string) => {
    this.setState({ selectedUser: value });
  };

  handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  handleQuantityChange = (value: string | number | undefined) => {
    if (typeof value === 'number') {
      this.setState({ quantity: value });
    }
  };

  handleSubmit = () => {
    const { selectedProduct, selectedUser,description, quantity } = this.state;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text('Hasar Tespit Tutanagi', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("courier", "bold");
    doc.text(`Urun: ${selectedProduct}`, 20, 40);
    doc.text(`Kullanici: ${selectedUser}`, 20, 50);
    doc.text(`Aciklama: ${description}`, 20, 60);
    doc.text(`Miktar: ${quantity}`, 20, 70);


    doc.save('hasar_tespit_tutanagi.pdf');
  };

  render() {

    const { selectedProduct,selectedUser, description, quantity } = this.state;

    const products =()=> {
      return this.props.productStore.products && this.props.productStore.products.map(x=> {return {label : x.name , value: x.id}})
    }

    const users =()=> {
      return this.props.userStore.users && this.props.userStore.users.items.map(x=> {return {label : x.name , value: x.id}})
    }

    return (

      <Form>
        <Row>
           <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Hasar Tespit Tutanağı</h1>
        </Row>
        <Row gutter={16}>
        <Col span={6}>
          <Form.Item label={('Ürün')}>
            <Select value={selectedProduct}
              onChange={this.handleProductChange}
              options={products()}
            />
          </Form.Item>
          </Col>
          <Col span={6}>
          <Form.Item label={('User')}>
            <Select value={selectedUser} 
              onChange={this.handleUserChange}
              options={users()}
            />
          </Form.Item>
          </Col>
          <Col span={6}>
          <Form.Item label={"Hasar Açıklaması"}>
          <Input.TextArea value={description} onChange={this.handleDescriptionChange} />
          </Form.Item>
          </Col>
          <Col span={6}>
          <Form.Item label={"Hasarlı Ürün Adedi"}>
          <InputNumber min={1} value={quantity} onChange={this.handleQuantityChange} />
          </Form.Item>
          </Col>          
          </Row>
        <Row justify='end'>
          <Button type="primary" onClick={this.handleSubmit}>
            Oluştur
          </Button>      
        </Row>
      </Form>
       
        
    );
  }
}

export default HasarTespit;