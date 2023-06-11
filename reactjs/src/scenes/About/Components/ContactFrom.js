import React, { useRef, useState } from 'react';
import { Form, message } from 'antd';
import emailjs from '@emailjs/browser';

import {
  Button,
  Col,
  Input,
  Select,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export const ContactForm = () => {

  const [loading, setloading] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {//butonun click olayını dinler

    console.log(form.current)

    setloading(true)
    e.preventDefault(); // click olayını biz manupule edeceğimiz için defaultu prevent(önlemek) ediyoruz.

    //mailjs kutuphanesinin mail gönerme metodu çapırılır.
    //mailjs internet sitesinde mail template olusturuldu ve service user bilgileri alındi.
    emailjs.sendForm('service_b79b7gt', 'template_nboma8k', form.current, 'WP9aJzgP0R5YHdyOG')
      .then((result) => {
        //başarılıysa console OK yazar
        message.success("Başarıyla Gönderildi...")
        setloading(false)

      }, (error) => {
        message.success("Gönderilemedi")
        //hata varsa hata nedeni konsola yazılır ÖRN: 3. paramter is not true
        console.log(error.text);
      });
  };


  return (
    <div style={{ width: "70%", marginLeft: "150px" }}>
      <form //jsx form olusturuldu
        ref={form} //referansı alıp emailjs ile kullanmak için refereans tutulur.
      >
        <Form.Item>
          <br></br>
          <h1 style={{ textAlign: "center" }} >HAKKINDA</h1>  <br></br>
          <h4 style={{ fontSize: "12px" }} >Kurumsal ve kişisel envanter takibi
            yapabileceğiniz bir web projesi sunuyoruz. Bu proje ile, ürünlerinizi, stokların
            ızı ve tüm envanterinizi kolayca takip edebilirsiniz. Ayrıca, ürünlerinizin tarih
            çesini kaydedebilir, envanterinizi raporlayabilir ve ürünlerinizi kategori bazında
            sınıflandırabilirsiniz. Projemiz kullanımı kolay ve ölçeklenebilir, böylece ihtiyaçlarınız
            ne olursa olsun, envanterinizi kontrol altında tutabilirsiniz.
          </h4>
        </Form.Item>
        <Form.Item>
          <h3 style={{ textAlign: "center" }}>BİZİMLE İLETİŞİME GEÇİN</h3>
        </Form.Item>
        <Form.Item>
          <Select defaultValue={1} placeholder="İletişime Geçmek İstediğiniz Yöneticiyi Seçin">
            <Select.Option value={1}>Şahin Kenanoğlu Yazılım Geliştirici</Select.Option>
            <Select.Option disabled value={2}>Ayhan İstanbullu / Mentor</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Input placeholder='İsim Soyisim Girin' name="user_name"></Input>
        </Form.Item>
        <Form.Item >
          <Input placeholder='E-mail Adresinizi Girin' width="large" name="user_email" />
        </Form.Item>
        <Form.Item>
          <TextArea rows={4} placeholder="İletmek İstediğiniz Mesajı Girin" name="message" />
        </Form.Item>
        <Form.Item>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button loading={loading} type="primary" htmlType="submit" onClick={sendEmail}>
              GÖNDER
            </Button>
          </Col>
        </Form.Item>

      </form>
    </div>


  );
};

export default ContactForm


