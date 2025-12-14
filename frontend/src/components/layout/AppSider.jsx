import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capipalize } from '../../utils';
import CryptoContext from '../../context/crypto-context';
import { useContext } from 'react';

const sliderStyle = {
  padding: '1rem',
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext);
  console.log('sideAssets', assets);

  return (
    <Layout.Sider width="25%" style={sliderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ width: 300, marginBottom: '1rem' }}>
          <Statistic
            title={capipalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isText: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPersent}%</Tag>
                  )}
                  {item.isText && item.value}
                  {!item.isText && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
