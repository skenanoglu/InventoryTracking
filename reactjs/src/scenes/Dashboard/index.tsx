import * as React from 'react';
import { Row, Col, Card } from 'antd';
import { CheckOutlined, QuestionOutlined, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import './index.less';

export class Dashboard extends React.Component<any> {
  componentDidMount() {
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
                <p className={'dashboardCardName'}>Zimmet Verilen Kurum Sayısı</p>
                <label className={'dashboardCardCounter'}>125</label>
              </Col>
            </Card>
          </Col>
          <Col span={6}>
            <Card className={'dasboardCard-ticket'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <QuestionOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Zimmet Teslim Tarihi Yaklaşanlar</p>
                <label className={'dashboardCardCounter'}>257</label>
              </Col>
            </Card>
          </Col>
          <Col span={6}>
            <Card className={'dasboardCard-comment'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <MessageOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Son 30 Gün İçinde Verilen Zimmetler</p>
                <label className={'dashboardCardCounter'}>243</label>
              </Col>
            </Card>
          </Col>
          <Col span={6}>
            <Card className={'dasboardCard-visitor'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <WarningOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Stok Azalan Ürünler</p>
                <label className={'dashboardCardCounter'}>1225</label>
              </Col>
            </Card>
          </Col>
        </Row>  
      </React.Fragment>
    );
  }
}

export default Dashboard;
