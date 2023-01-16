import * as React from 'react';

import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

import Text from 'antd/lib/typography/Text';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';


const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }

  const selectAfter = (
    <Select defaultValue="@gmail.com">
      <Option value="@gmail.com">@gmail.com</Option>
      <Option value="@balikesir.edu.tr">@balikesir.edu.tr</Option>
      <Option value="@hotmail.com">@hotmail.com</Option>
      <Option value="@yahoo.com">@yahoo.com</Option>
    </Select>
  );

  return (

    <Form
    labelCol={{ span: 16 }}
    wrapperCol={{ span: 15 }}
    layout="horizontal"
    
  >   <Form.Item> 
    <br></br>
    <h1 style={{textAlign:"center"}} >HAKKINDA</h1>  <br></br> 
    <h4  style={{fontSize:"12px"}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type 
      specimen book. It has survived not only five centuries, but also the leap into
       electronic typesetting, remaining essentially unchanged. It was popularised in 
    </h4>
  </Form.Item>   
    <Form.Item>
      <h3 style={{textAlign:"center"}}>BİZİMLE İLETİŞİME GEÇİN</h3>
    </Form.Item>
    <Form.Item>
      <Select placeholder="İletişime Geçmek İstediğiniz Yöneticiyi Seçin" >
        <Select.Option value="deneme@gmaiil.com">Cihat Talat Akpınar</Select.Option>
        <Select.Option value="deneme2@gmaiil.com">Şahin Kenanoğlu</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item>
     <Input placeholder='İSİM SOYİSİM GİRİN'></Input>
  </Form.Item>
  <Form.Item>
    <Input addonAfter={selectAfter} width="large"/>
  </Form.Item>
  <Form.Item>
  <TextArea rows={4} placeholder="İLETMEK İSTEDİĞİNİZ MESAJI GİRİN"/>
  </Form.Item>
  <Form.Item>    
  <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            GÖNDER
          </Button> 
          </Col> 
  </Form.Item>

  </Form>



   
  )
}
export default ContactForm