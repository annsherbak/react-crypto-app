import { Flex, Typography } from 'antd';

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex>
      <span role="img" style={{ width: 100 }} align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
      </span>
      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
