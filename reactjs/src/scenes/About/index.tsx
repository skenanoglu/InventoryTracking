import AppComponentBase from '../../components/AppComponentBase';
import * as React from 'react';
import ContactForm from './Components/ContactFrom';

class CorporateDebit extends AppComponentBase {
  //appcomponentbase den miras alan bir sınıf
  public render() {
    return <ContactForm />; // bir dış klasorde yazılan react componenti burada cağırılır. bu ekran da touter config içerisine yerleştirildi.
  }
}

export default CorporateDebit;
