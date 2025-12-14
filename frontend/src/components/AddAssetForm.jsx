import { useRef, useState } from 'react';
import { useCrypto } from '../context/crypto-context';
import { Select, Space, Form, InputNumber, Button, DatePicker, Result, Divider } from 'antd';
import CoinInfo from './CoinInfo';

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      price: values.price,
      amount: values.amount,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmoundChange(value) {
    if (!value) {
      return;
    }
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount');
    if (amount) {
      form.setFieldsValue({
        total: +(value * amount).toFixed(2),
      });
    }
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="Select coin"
        onSelect={(v) => {
          setCoin(
            crypto.find((c) => {
              return c.id == v;
            }),
          );
        }}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ display: 'flex' }}>
            <span role="img" aria-label={option.data.icon}>
              <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} />
            </span>
            {option.data.label}
          </Space>
        )}
      />
    );
  } else {
    return (
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        style={{ maxWidth: 1500 }}
        initialValues={{ price: coin.price.toFixed(2) }}
        onFinish={onFinish}>
        <CoinInfo coin={coin} />
        <Divider />
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, min: 0, type: 'number', message: 'Amount cannot be less than 0' },
          ]}>
          <InputNumber
            onChange={handleAmoundChange}
            placeholder="Enter coin amount"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber style={{ width: '100%' }} onChange={handlePriceChange} />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
