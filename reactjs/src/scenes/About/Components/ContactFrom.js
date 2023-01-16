import React, { useRef } from 'react';
import { Form, Space } from 'antd';
import emailjs from '@emailjs/browser';

import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { Option } from 'antd/lib/mentions';
import TextArea from 'antd/lib/input/TextArea';

export const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2keu6pa', 'template_nboma8k', form.current, 'WP9aJzgP0R5YHdyOG')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
<div style={{width:"70%", marginLeft:"150px"}}>
     <form
    ref={form}
  >   
  <Form.Item> 
    <br></br>
    <h1 style={{textAlign:"center"}} >HAKKINDA</h1>  <br></br> 
    <h4  style={{fontSize:"12px"}} >Kurumsal ve kişisel envanter takibi 
    yapabileceğiniz bir web projesi sunuyoruz. Bu proje ile, ürünlerinizi, stokların
    ızı ve tüm envanterinizi kolayca takip edebilirsiniz. Ayrıca, ürünlerinizin tarih
    çesini kaydedebilir, envanterinizi raporlayabilir ve ürünlerinizi kategori bazında s
    ınıflandırabilirsiniz. Projemiz kullanımı kolay ve ölçeklenebilir, böylece ihtiyaçlarınız 
    ne olursa olsun, envanterinizi kontrol altında tutabilirsiniz. 
    </h4>
  </Form.Item>   
    <Form.Item>
      <h3 style={{textAlign:"center"}}>BİZİMLE İLETİŞİME GEÇİN</h3>
    </Form.Item>
    <Form.Item>
      <Select placeholder="İletişime Geçmek İstediğiniz Yöneticiyi Seçin">
        <Select.Option value="deneme@gmaiil.com">Cihat Talat Akpınar</Select.Option>
        <Select.Option value="deneme2@gmaiil.com">Şahin Kenanoğlu</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item>
     <Input placeholder='İsim Soyisim Girin' name="user_name"></Input>
  </Form.Item>
  <Form.Item >
    <Input placeholder='E-mail Adresinizi Girin'  width="large" name="user_email"/>
  </Form.Item>
  <Form.Item>
  <TextArea rows={4} placeholder="İletmek İstediğiniz Mesajı Girin" name="message"/>
  </Form.Item>
  <Form.Item>    
  <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" onClick={sendEmail}>
            GÖNDER
          </Button> 
          </Col> 
  </Form.Item>

  </form>
</div>


  );
};

export default ContactForm


