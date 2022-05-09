import React, { useState } from 'react';
import { WifiType } from '../store/types';

import "antd/dist/antd.css";
import "nes.css/css/nes.min.css";

import { WifiOutlined, LockOutlined } from '@ant-design/icons';
import { List, Input, Button } from 'antd';

import { calculateDistance } from '../store/utils';

const styles = {
  tiled: {
    width: '100%',
    height: '100%',
    background: 'blue',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  content: {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    height: '100%',
    overflowY: 'auto',
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "white",
  } as React.CSSProperties,
  backBtn: {
    background: '#373737',
    textAlign: 'center',
    padding: '5px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  } as React.CSSProperties,
  iconStyle: {
    marginRight: '4px',
    position: 'relative',
    bottom: '5px',
  } as React.CSSProperties,
};

type PhoneWifiType = {
  onCancel: Function;
  position: number[];
  wifiKnow?: string[];
  onConfirm?: Function;
  data: WifiType[];
};
type PhoneWifiTiledType = {
  onClick: Function;
};

function PhoneWifi(props: PhoneWifiType) {
  const [step, setStep] = useState('listWifi');
  const [tryWifi, setTryWifi] = useState<WifiType | null>(null);
  const [successWifi, setSuccessWifi] = useState(false);
  const [errorWifi, setErrorWifi] = useState(false);
  const [pwdValue, setPwdValue] = useState('');

  const handleReset = () => {
    setStep('listWifi');
    setSuccessWifi(false);
    setErrorWifi(false);
    setPwdValue('');
  }

  const handleChooseWifi = (item: WifiType) => {
    if (props.wifiKnow && props.wifiKnow.indexOf(item.name) !== -1) {
      setStep('wifiKnow');
    }
    else {
      setTryWifi(item);
      setStep('password');
    }
  }

  const handleConfirm = () => {
    if (tryWifi && tryWifi.pwd === pwdValue) {
      setSuccessWifi(true);
      setPwdValue('');
      if (props.onConfirm)
        setTimeout(() => {
          if (props.onConfirm)
            props.onConfirm(tryWifi.name)
          handleReset();
        }, 3000);
    } else {
      setErrorWifi(true);
    }
  }

	return (
		<div style={styles.content}>
      {step === 'listWifi' && <List
        size="small"
        header={<div>WI-FI LIST</div>}
        bordered
        dataSource={props.data.filter(elt => elt.actif)}
        style={{ background: 'white' }}
        renderItem={item => (
          <List.Item style={{ display: calculateDistance(props.position, item.coord) >= 0 ? 'block' : 'none' }}>
            <div onClick={() => handleChooseWifi(item)}>
              <WifiOutlined style={styles.iconStyle} />
              <LockOutlined style={styles.iconStyle} />
              {item.name}
              <span style={{ float: 'right' }}>{calculateDistance(props.position, item.coord)}/5</span>
            </div>
          </List.Item>
        )}
      />}
      
      {step === 'password' && <div style={{ padding: '5px' }}>
        {successWifi && <p style={{ color: 'white', padding: '5px', borderRadius: '2px', marginBottom: '4px', background: '#00f700'}}>Success</p>}
        {errorWifi && <p style={{ color: 'white', padding: '5px', borderRadius: '2px', marginBottom: '4px', background: 'tomato'}}>Fail</p>}
        <p style={{ marginBottom: '5px' }}><WifiOutlined style={styles.iconStyle} />{tryWifi && tryWifi.name}</p>
        <Input value={pwdValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwdValue(e.target.value)} placeholder="Password" prefix={<LockOutlined />} />
        <Button onClick={handleConfirm} type="primary" style={{ float: 'right' }}>Connect</Button>
      </div>}

      {step === 'wifiKnow' && <p>You already know this Wi-Fi.</p>}
      
      <p style={styles.backBtn} onClick={() => { setStep('wifi');props.onCancel(); }}>Back</p>
    </div>
	)
}

export const PhoneWifiTiled = (props: PhoneWifiTiledType) => {
  return (
    <div onClick={() => props.onClick()} style={styles.tiled}>
      <WifiOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>WIFI</p>
    </div>
  )
}

export default PhoneWifi;