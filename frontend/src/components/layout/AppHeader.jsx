import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModal from '../CoinInfoModal';

const headerStyle = {
  with: '100%',
  textAlign: 'cenrer',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alingItems: 'center',
  background: 'white',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (evt) => {
      if (evt.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => {
      document.removeEventListener('keypress', keypress);
    };
  }, []);

  function handleSelect(value) {
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  }
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: '250px' }}
        value="press / to open"
        open={select}
        onSelect={handleSelect}
        onClick={() => {
          setSelect((prev) => !prev);
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
      <Button
        type="primary"
        onClick={() => {
          setDrawer(true);
        }}>
        Add Asset
      </Button>

      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={modal}
        footer={null}
        onCancel={() => setModal((prev) => !prev)}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title="Add Asset"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setDrawer((prev) => !prev)}
        open={drawer}
        destroyOnHidden>
        <AddAssetForm
          onClose={() => {
            setDrawer(false);
          }}
        />
      </Drawer>
    </Layout.Header>
  );
}
