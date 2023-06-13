import * as React from 'react';
import { Row, Col, Card } from 'antd';
import { CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import './index.less';
import CompanyStore from '../../stores/companyStore';
import CorporateDebitStore from '../../stores/corporateDebitStore';
import ProductStore from '../../stores/productStore';
import { inject } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';

export interface IDashBoardProps {
  corporateDebitStore: CorporateDebitStore;
  productStore: ProductStore;
  companyStore: CompanyStore;
  userStore: UserStore;
}

@inject(Stores.CorporateDebitStore) // dependency injection ile storedaki metodlar kullanılıor
@inject(Stores.ProductStore) // dependency injection ile storedaki metodlar kullanılıor
@inject(Stores.CompanyStore) 
@inject(Stores.UserStore) 
export class Dashboard extends React.Component<IDashBoardProps> {
  async componentDidMount() : Promise<void> {
    await this.props.companyStore.getAll(); 
    await this.props.userStore.getAll({
      keyword: '',
      maxResultCount: 10,
      skipCount: 0
    }); 
    await this.props.productStore.getAll(); 
    await this.props.corporateDebitStore.getAll({
      keyword: '',
      maxResultCount: 10,
      skipCount: 0
    }); 
    setTimeout(() => this.setState({ cardLoading: false }), 1000);
    setTimeout(() => this.setState({ lineChartLoading: false }), 1500);
    setTimeout(() => this.setState({ barChartLoading: false }), 2000);
    setTimeout(() => this.setState({ pieChartLoading: false }), 1000);
  }

  state = {
    cardLoading: true,
    lineChartLoading: true,
    barChartLoading: true,
    pieChartLoading: true,
  };

  render() {
    const { cardLoading } = this.state;
    const { users } = this.props.userStore;

    return (
      <React.Fragment>
        <br></br>
        <Row gutter={16}>
          <Col span={6}>
            <Card className={'dasboardCard-task'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <CheckOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Toplam Kullanıcı Sayısı</p>
                <label className={'dashboardCardCounter'}>{users === undefined ? [] : users.totalCount}</label>
              </Col>
            </Card>
          </Col>
          <Col span={6}>
            <Card className={'dasboardCard-ticket'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <QuestionOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Tanımlı Şirket Sayısı</p>
                <label className={'dashboardCardCounter'}>{this.props.companyStore.companies === undefined ? [] : this.props.companyStore.companies.length}</label>
              </Col>
            </Card>
          </Col> 
          <Col span={6}>
          <Card className={'dasboardCard-task'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
              <CheckOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Kurumsal Zimmet Sayısı</p>
                <label className={'dashboardCardCounter'}>{this.props.corporateDebitStore.CorporateDebits === undefined ? [] : this.props.corporateDebitStore.CorporateDebits.totalCount}</label>
              </Col>
            </Card>
          </Col>
          <Col span={6}>
            <Card className={'dasboardCard-ticket'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <QuestionOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Tanımlı Ürün Sayısı</p>
                <label className={'dashboardCardCounter'}>{this.props.productStore.products === undefined ? [] : this.props.productStore.products.length}</label>
              </Col>
            </Card>
          </Col> 
        </Row>  
      </React.Fragment>
    );
  }
}

export default Dashboard;
