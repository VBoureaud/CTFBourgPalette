import React, { useState, useEffect } from 'react';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Button, Card, Timeline } from 'antd';
import { displayDate, levelDisplay } from '../store/utils';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const catcherData = [
  { 
    name: 'SMS',
    color: 'rgba(255, 99, 132, 0.5)',
    coef: 6,
  }, {
    name: 'Credentials',
    color: 'rgba(54, 162, 235, 0.5)',
    coef: 1,
    max: 1,
  }, {
    name: 'Pictures',
    color: 'rgba(255, 206, 86, 0.5)',
    coef: 3,
  }, {
    name: 'Calls',
    color: 'rgba(75, 192, 192, 0.5)',
    coef: 4,
  }, {
    name: 'Videos',
    color: 'rgba(153, 102, 255, 0.5)',
    coef: 2,
  }, {
    name: 'Others',
    color: 'rgba(255, 159, 64, 0.5)',
    coef: 5,
  }
];

const { Meta } = Card;

const styles = {
  screenContainer: {
    width: '100vw',
    maxWidth: '100%',
    height: '87vh',
    maxHeight: '100%',
  } as React.CSSProperties,
  AppContain: {
    height: '100%',
  } as React.CSSProperties,
  navBar: {
    minHeight: '35px',
    background: '#5936ff',
    color: 'white',
    textShadow: '1px 1px 1px black',
    borderBottom: '1px solid black',
  } as React.CSSProperties,
  logo: {
    position: 'relative',
    top: '5px',
    left: '5px',
  } as React.CSSProperties,
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
    width: '100%',
    height: '100%',
    margin: 'auto',
  } as React.CSSProperties,
  fail: {} as React.CSSProperties,
  name: {} as React.CSSProperties,
  password: {} as React.CSSProperties,
  submit: {} as React.CSSProperties,
  profil: {
    float: 'right',
  } as React.CSSProperties,
  content: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    maxHeight: '90%',
    alignItems: 'center',
    marginTop: '15px',
    marginBottom: '15px',

  } as React.CSSProperties,
  card: {
    width: '300px',
    margin: '5px',
  } as React.CSSProperties,
};

type ComputerScreenType = {
  children?: any;
  mode?: string;
  started?: number;
};

function ComputerScreen(props: ComputerScreenType) {
  const enumStep = { login: 0, dashboard: 1, profil: 2, creditCard: 3, credentialIMSIPage: 4 };
  const [step, setStep] = useState(enumStep.login);
  const [loading, setLoading] = useState(false);
  const enumLogged = { success: 2, fail: 1, init: 0 };
  const [logged, setLogged] = useState(enumLogged.init);
  const [name, setName] = useState('SARA');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let timerFunc: ReturnType<typeof setTimeout>;
    if (loading) {
      timerFunc = setTimeout(() => {
        setLoading(false);
      }, 750);
    }
    return () => clearTimeout(timerFunc);
  }, [loading]);

  const buildDataIMSI = () => {
    return {
      labels: catcherData.map(elt => elt.name),
      datasets: [
        {
          label: '# of Data Catched',
          data: catcherData.map(elt => levelDisplay(diffDate(), elt.coef, elt.max)),
          backgroundColor: catcherData.map(elt => elt.color),
          borderWidth: 1,
        },
      ],
    }
  }

  const tryLogin = () => {
    if (name === 'SARA' && password === 'AOKZC3O2') {
      setLogged(enumLogged.success);
      handleChgmtPage(enumStep.dashboard);
    }
    else 
      setLogged(enumLogged.fail);
  }

  const handleChgmtPage = (page: number) => {
    if (page !== step) {
      setLoading(true);
      setStep(page);
    }
  }

  const getCredentialsFound = () => {
    const data = catcherData.filter(elt => elt.name === 'Credentials')[0];
    return data ? levelDisplay(diffDate(), data.coef, data.max) : 0;
  }

  const diffDate = () => {
    const d = new Date();
    if (props.started) {
      const diff = d.getTime() - props.started;
      const minutes = Math.floor(diff / 60000);
      //const seconds = ((diff % 60000) / 1000).toFixed(0);
      return minutes;
    }
    return 0;
  }

  return (
    <div style={styles.screenContainer}>
      {(!props.mode || props.mode === 'photogram') && <>
        {!loading && (step === enumStep.login || (step === enumStep.dashboard && logged !== enumLogged.success)) && <div style={styles.AppContain}>
          <div style={styles.navBar}>
            <span style={styles.logo}>PhotoGram.Art</span>
          </div>
          <div style={styles.center}>
            {logged === enumLogged.fail && <div style={styles.fail}>Wrong credentials</div>}
            <div style={styles.name}></div>
            <div style={styles.password}></div>
            <Input value={name} style={{ marginTop: '15px' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Name" prefix={<UserOutlined />} />
            <Input value={password} style={{ marginTop: '15px' }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" prefix={<LockOutlined />} />
            <Button onClick={tryLogin} type="primary" style={{ marginTop: '15px' }}>Connect</Button>
        
            <div style={styles.submit}></div>
          </div>
        </div>}

        {!loading && step === enumStep.dashboard && logged === enumLogged.success && <div style={styles.AppContain}>
          <div style={styles.navBar}>
            <span onClick={() => handleChgmtPage(enumStep.dashboard)} style={styles.logo}>PhotoGram.Art</span>
            <Button onClick={() => handleChgmtPage(enumStep.profil)} style={styles.profil} type="primary">Profil</Button>
          </div>
          <div style={styles.content}>
            <Card
              style={styles.card}
              cover={
                <img
                  alt="pict0"
                  src="https://picsum.photos/301/300"
                />
              }
            >
              <Meta
                title="Snow day ?"
                description="Maybe, maybe not."
              />
            </Card>

            <Card
              style={styles.card}
              cover={
                <img
                  alt="pict1"
                  src="https://picsum.photos/302/300"
                />
              }
            >
              <Meta
                title="I like train"
                description="It's fast and chill."
              />
            </Card>

            <Card
              style={styles.card}
              cover={
                <img
                  alt="pict2"
                  src="https://picsum.photos/303/300"
                />
              }
            >
              <Meta
                title="Yummy"
                description="My dinner yesterday night."
              />
            </Card>

            <Card
              style={styles.card}
              cover={
                <img
                  alt="pict3"
                  src="https://picsum.photos/304/300"
                />
              }
            >
              <Meta
                title="My little flower"
                description="Sunny sunny day, welcome spring time!"
              />
            </Card>

            <Card
              style={styles.card}
              cover={
                <img
                  alt="pict4"
                  src="https://picsum.photos/305/300"
                />
              }
            >
              <Meta
                title="A coffee ?"
                description="I'm sure you want a coffee, am I right?"
              />
            </Card>
          </div>
        </div>}

        {!loading && step === enumStep.profil && <div style={styles.AppContain}>
          <div style={styles.navBar}>
            <span onClick={() => handleChgmtPage(enumStep.dashboard)} style={styles.logo}>PhotoGram.Art</span>
            <Button onClick={() => handleChgmtPage(enumStep.profil)} style={styles.profil} type="primary">Profil</Button>
          </div>
          <div style={styles.content}>
            <p>Name: Sara</p>
            <p>Followers: 1269</p>
            <p>Following: 177</p>
            <p>Birthday: 09/05/2000</p>
            <p>Mail: sara_connor@photogram.art</p>
            <p>Last login: 5min ago</p>
            <p style={{ marginTop: '25px', borderTop: '1px solid black', paddingTop: '20px' }}>Find here the informations built according to your usage of PhotoGram:</p>
            <p>Gender: Woman</p>
            <p>Time spent: 185min per day</p>
            <p>Affinity with: Chocolate, Clothes, Cats</p>
            <p>Language: English</p>
            <p>Location: Bourg Palette</p>
            <p>Education: University</p>
            <p>Employement: False</p>
            <p>Political views: Is socially influenced</p>
            <p>Relashionship status: Single</p>
            <p>Planning to have a baby: False</p>
            <p>Number of child: 0</p>
            <p>Have a cat: True</p>
            <p>Loans: 0</p>
            <p>Income: 0</p>
            <p>Vehicles owned: 1</p>
            <p>Properties owned: 0</p>
            <p>Type of home: Multi-family</p>
            <p>Insurance: No major medical insurance</p>
            <p>Health: Diabetic</p>
            <p>Alcohol: Interest</p>
            <p>Tobacco: Interest</p>
            <p>Lottery: False</p>
            <p>Casino gaming: False</p>
            <p>Religion: Catholic</p>
            <p>Economic stable: True</p>
            <p>Receptive to ads: True</p>
            <p>Version commercial beta: True</p>
            <p>Already bought online: True</p>
            <p style={{ color: '#1890ff' }} onClick={() => handleChgmtPage(enumStep.creditCard)}>List of recent purcharses</p>
          </div>
        </div>}

        {!loading && step === enumStep.creditCard && <div style={styles.AppContain}>
          <div style={styles.navBar}>
            <span onClick={() => handleChgmtPage(enumStep.dashboard)} style={styles.logo}>PhotoGram.Art</span>
            <Button onClick={() => handleChgmtPage(enumStep.profil)} style={styles.profil} type="primary">Profil</Button>
          </div>
          <div style={styles.content}>
            <Timeline style={{ padding: '10px' }}>
              <Timeline.Item color="green">{displayDate(0)} - Coffee offer to @LabewCoffee</Timeline.Item>
              <Timeline.Item color="green">{displayDate(0)} - Chocolate from Adviser #E564</Timeline.Item>
              <Timeline.Item color="blue">{displayDate(2)} - Bag from Adviser #F265</Timeline.Item>
              <Timeline.Item color="blue">{displayDate(6)} - Shoes from Adviser #CA56</Timeline.Item>
              <Timeline.Item color="blue">{displayDate(10)} - Bag from Adviser #XWAK</Timeline.Item>
              <Timeline.Item color="red">{displayDate(15)} - Underclothes from Adviser #AA5X</Timeline.Item>
              <Timeline.Item color="grey">{displayDate(18)} - Game for Cats from Adviser #SOJA</Timeline.Item>
              <Timeline.Item color="red">{displayDate(23)} - Tools from Adviser #WAWA</Timeline.Item>
            </Timeline>
            <Card title="Card used" bordered>
              <p>4165 9810 WOXHAP89</p>
              <p>18/25 - 054</p>
            </Card>
          </div>
        </div>}
      </>}

      {props.mode === 'imsi' && <>
        <div style={styles.center}>
          <p>IMSI Catcher</p>
          {step === enumStep.login && <div style={{ textAlign: 'center' }}>
            <p>Launched since: {diffDate()}min</p>
            <p>Caught {getCredentialsFound()} credential</p>
            {getCredentialsFound() > 0 && <Button type="primary" onClick={() => handleChgmtPage(enumStep.credentialIMSIPage)}>See result</Button>}
            <PolarArea data={buildDataIMSI()} />
          </div>}

          {step === enumStep.credentialIMSIPage && <div>
            <Card
              style={styles.card}
            >
              <Meta
                title="From +15654 5465 ..."
                description="Hi Bob,
                  Thank you for waiting for me so long.
                  Don't worry, I'm on my way, you can enter the house, the key is URERK896.
                  See you soon !."
              />
            </Card>
            <Button type="primary" onClick={() => handleChgmtPage(enumStep.login)}>Back</Button>
          </div>}
        </div>
      </>}

      {loading && <div style={styles.center}>
        <LoadingOutlined style={{ fontSize: '45px' }} />
      </div>}
    </div>
  )
}

export default ComputerScreen;