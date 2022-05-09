import React, { useState, useEffect } from 'react';
import { Device } from '../store/types';
import { AimOutlined, LoadingOutlined } from '@ant-design/icons';
import { List, Input, Checkbox, Button } from 'antd';

const styles = {
  tiled: {
    width: '100%',
    height: '100%',
    background: 'blue',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  tiledInactif: {
    width: '100%',
    height: '100%',
    background: 'grey',
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
  contentChild: {
    maxHeight: "calc(100% - 120px)",
    overflowY: 'scroll'
  } as React.CSSProperties,
  backBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    background: '#373737',
    textAlign: 'center',
    padding: '5px',
  } as React.CSSProperties,
};

type PhoneAimType = {
  wifiName: string;
  devices: Device[];
  onCancel: Function;
  onConfirm?: Function;
  onDdos: Function;
};
type PhoneAimTiledType = {
  onClick: Function;
  actif: boolean;
};
type NetworkData = {
  dest: string;
  text: string;
};


const networkListen = {
  randomText: ['Transmission Control Protocol, Src Port: 46952', 'Simple Service Discovery Protocol', 'BOOTID, UDPN.ORG: 152549', 'Router Solicitation from 1.1.1.1', 'Standard query response 0x09875', 'TCP Keep-Alive', 'NOTIFIY * HTTP/1.1', 'Ping to 250.230.10.20'],
  randomDest: 254,
};

const dataTools = [
  { name: 'Scan devices', action: 'scan' },
  { name: 'Man in the middle', action: 'mim', },
  { name: 'DDoS', action: 'ddos' },
];

function PhoneAim(props: PhoneAimType) {
  const [step, setStep] = useState('listAttack');
  const [loading, setLoading] = useState(false);
  const [successChoiceIP, setSuccessChoiceIP] = useState(false);
  const [errorChoiceIP, setErrorChoiceIP] = useState(false);
  const [choiceIP, setChoiceIP] = useState('');
  const [dataNetwork, setDataNetwork] = useState<NetworkData[]>([]);
  const [filterNetwork, setFilterNetwork] = useState(false);
  const [devicesNetwork, setDevicesNetwork] = useState(props.devices.filter(elt => elt.proba <= parseInt('' + Math.random() * 10)));
  const [device, setDevice] = useState<Device | null>(null);

  // scan loader
  useEffect(() => {
    let timerFunc: ReturnType<typeof setTimeout>;
    if (loading) {
      timerFunc = setTimeout(() => {
        if (step === 'scan')
          setDevicesNetwork(props.devices.filter(elt => elt.proba <= parseInt('' + Math.random() * 10)));
        else if (step === 'ddos') {
          if (props.onDdos)
            props.onDdos(props.wifiName);
          handleReset();
          props.onCancel();
        }

        setLoading(false);
      }, 3000);
    }
    return () => clearTimeout(timerFunc);
  }, [loading, props.devices]);

  const buildRandomNavigation = () => {
    const buildOne = () => {
      const dest = [
        parseInt('' + Math.random() * networkListen.randomDest),
        parseInt('' + Math.random() * networkListen.randomDest),
        parseInt('' + Math.random() * networkListen.randomDest),
        parseInt('' + Math.random() * networkListen.randomDest),
      ].join('.');
      const text = networkListen.randomText[parseInt('' + Math.random() * networkListen.randomText.length)];
      return { dest, text };
    }
    if (!filterNetwork)
      setDataNetwork([ buildOne(), buildOne(), buildOne(), buildOne() ])
    else if (dataNetwork.length !== 1) {
      const navigation = [];
      const device = props.devices.filter(elt => elt.ip === choiceIP)[0];
      if (device && device.credentials && device.probaCredential) {
        const rand = Math.random() * 10;
        const isCredentialsTime = device.probaCredential <= rand;
        
        if (isCredentialsTime) navigation.push({
          dest: 'photogram.art',
          text: 'Logged with ' + device.credentials
        });
      }
      setDataNetwork(navigation);
    }
  }

  // listen mim
  useEffect(() => {
    let timerFunc: ReturnType<typeof setTimeout>;
    if (successChoiceIP) {
      timerFunc = setTimeout(buildRandomNavigation, 1000);
    }
    return () => clearTimeout(timerFunc);
  }, [dataNetwork]);

  const handleReset = () => {
    setStep('listAttack');
    setErrorChoiceIP(false);
    setSuccessChoiceIP(false);
    setFilterNetwork(false);
    setDevice(null);
    setChoiceIP('');
  }

  const handleConfirmDDOS = () => {
    setLoading(true);
  }

  const handleConfirmMiM = () => {
    console.log('confirmMiM');
    setErrorChoiceIP(false);
    setSuccessChoiceIP(false);
    if (props.devices.map(elt => elt.ip).indexOf(choiceIP) === -1)
      setErrorChoiceIP(true);
    else {
      const device = props.devices.filter(elt => elt.ip === choiceIP)[0];
      setDevice(device);
      setSuccessChoiceIP(true);
      setStep('mimListen_' + device.type);
      if (device.type === 'navigation' && device.actif)
        buildRandomNavigation();
    }
  }

	return (
		<div style={styles.content}>
      {step === 'listAttack' && <List
        size="small"
        bordered
        dataSource={dataTools}
        style={{ background: 'white' }}
        renderItem={item => (
          <List.Item onClick={() => { 
              if (item.action === 'scan') setLoading(true);
              setStep(item.action);
            }}>
            {item.name}
          </List.Item>
        )}
      />}

      {step === 'scan' && <div style={styles.contentChild}>
        {loading && <LoadingOutlined style={{ fontSize: '45px', height: '60px', width: '60px', display: 'block', margin: '25px auto' }} />}
        {!loading && <List
          size="small"
          header={<div style={{ textAlign: 'center' }}>Devices found on this network</div>}
          dataSource={devicesNetwork}
          style={{ background: 'white' }}
          renderItem={item => (
            <List.Item style={{ background: '#111', color: 'rgb(77, 242, 16)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px' }}>{item.name}</span><span>IP: {item.ip}</span>
            </List.Item>
          )}
        />}
        <p style={{ marginTop: '5px', background: '#373737', textAlign: 'center', padding: '5px', }} onClick={() => { setLoading(true); }}>Refresh</p>
      </div>}

      {step === 'mim' && <div style={styles.contentChild}>
        <h2 style={{ color: 'white' }}>Man in the middle</h2>
        <p>Choose an address to attack.<br />Your phone will become the relay between the Internet and the device using this address. This means that each request will first go through your phone where you can choose to listen or even edit the response.</p>
        {successChoiceIP && <p style={{ textAlign: 'center', color: 'white', padding: '5px', borderRadius: '2px', marginBottom: '4px', background: '#00f700'}}>Success</p>}
        {errorChoiceIP && <p style={{ textAlign: 'center', color: 'white', padding: '5px', borderRadius: '2px', marginBottom: '4px', background: 'tomato' }}>Fail. Wrong IP ?</p>}
        <Input value={choiceIP} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChoiceIP(e.target.value)} placeholder="192.168.0.0" prefix={'IP:'} />
        <Button onClick={handleConfirmMiM} type="primary" style={{ float: 'right' }}>Connect</Button>
      </div>}

      {step === 'mimListen_navigation' && <div style={styles.contentChild}>
        <h3 style={{ color: 'white' }}>Listen to the network live...</h3>
        <Checkbox style={{ width: '100%', background: 'rgb(38, 71, 98)', color: 'white', padding: '5px' }} onChange={(e: any) => setFilterNetwork(e.target.checked)}>Only credentials</Checkbox>
        <List
          size="small"
          bordered
          dataSource={dataNetwork}
          style={{ background: 'white' }}
          renderItem={item => (
            <List.Item>
              {choiceIP} to {item.dest}<br />
              {item.text}
            </List.Item>
          )}
        />
      </div>}

      {step === 'mimListen_watch' && <div style={styles.contentChild}>
        <h3 style={{ color: 'white' }}>Listen to the network live...</h3>
        <p>It seems that the content is encrypted.</p>
        <p>{device && device.credentials}</p>
      </div>}

      {step === 'mimListen_music' && <div style={styles.contentChild}>
        <h3 style={{ color: 'white' }}>Listen to the network live...</h3>
        <p>It seems that the device is running <i>{device && device.credentials && device.credentials[parseInt('' + Math.random() * device.credentials.length)]}</i>.</p>
      </div>}

      {step === 'ddos' && <div style={styles.contentChild}>
        {!loading && <>
          <h2 style={{ color: 'white' }}>DDoS attack</h2>
          <p>Your phone will connect to the SearchHouse lab network and request 10 million queries from multiple sources on your current network. This should overload the system... Are you sure you want to do this ?</p>
          <Button onClick={handleConfirmDDOS} type="primary" danger style={{ display: 'block', margin: 'auto' }}>DDoS</Button>
        </>}
        {loading && <LoadingOutlined style={{ fontSize: '45px', height: '60px', width: '60px', display: 'block', margin: '25px auto' }} />}
      </div>}

      <p style={styles.backBtn} onClick={() => { 
          if (step === 'listAttack') {
            props.onCancel();
          } else setStep('listAttack');
          handleReset();
        }
      }>Back</p>
    </div>
	)
}

export const PhoneAimTiled = (props: PhoneAimTiledType) => {
  return (
    <div onClick={props.actif ? () => props.onClick() : () => {}} style={props.actif ? styles.tiled : styles.tiledInactif}>
      <AimOutlined style={{ fontSize: '35px', marginBottom: '2px' }} />
      <p>Tools</p>
    </div>
  )
}

export default PhoneAim;