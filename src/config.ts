// BE CAREFUL
// HERE IS THE LOGIC OF THE GAME
// IF YOU READ LONGER, YOU WILL BE SPOILED.

const config = {
	version: '0.1.1',
	debug: false,
	game: {
		name: 'CTFBourgPalette',
		quests: {
			ERGBHJ98: {
				level: 1,
				title: 'Quest 1',
				desc: 'Find Professor H and get your reward.',
				map: '',
				wifiKnow: [],
				orderFix: false,
				imsiHandler: false,
				goalOrder: {
					id3: { optional: true, break: true, dialog: [ 'Welcome to my city! Do you need some help ?', 'Oh yes! The neighbourhood is really nice and quiet. I used to walk around here and enjoy my time.', 'Only once I heard someone shout "123456789". I didn\'t understand why...', 'Well, see you later.' ] },
					id10: {
						break: true,
						dialog: [
							'Welcome to CTFBourgPalette! Are you here to practice your hacking skills ?',
							'Amazing! This is for you. I\'m curious to know if you are more black hat or white hat.',
							'Your choices will define it. Enjoy!',
						],
					},
					id19: { optional: true, computerScreen: true, computerMode: 'photogram' },
				},
				success: 'You got a Phone! Time to hack! An automatic save is launched after each successful quest.',
			},
			OPJSBE9U: {
				level: 2,
				title: 'Quest 2',
				desc: 'Find a way to infiltrate ZOULOUFAMILY Network. Many techniques are available but you will discover the simplest: Predictable & Weak credentials.',
				map: '',
				wifiKnow: [],
				orderFix: false,
				imsiHandler: false,
				goalOrder: {
					id3: { optional: true, break: true, dialog: [ 'Welcome to my city! Do you need some help ?', 'Oh yes! The neighbourhood is really nice and quiet. I used to walk around here and enjoy my time.', 'Only once I heard someone shout "123456789". I didn\'t understand why...', 'Well, see you later.' ] },
					id19: { optional: true, computerScreen: true, computerMode: 'photogram' },
					phone: { method: 'wifi', name: 'ZOULOUFAMILY' },
				},
				success: 'You succeed on your first infiltration.'
			},
			IOHFD93W: {
				level: 3,
				title: 'Quest 3',
				desc: 'Get the list of devices on your current network and find how to exploit one of them. Enter the flag you think valid in the menu "Enter a flag".',
				map: '',
				wifiKnow: [ 'ZOULOUFAMILY' ],
				orderFix: false,
				imsiHandler: false,
				goalOrder: {
					id6: { optional: true, break: true, dialog: [ 'Hey man, do you know where Sara is? I\'ve been waiting for her for so long now!'] },
					phone: { method: 'aim', name: 'AOKZC3O2' },
					id19: { optional: true, computerScreen: true, computerMode: 'photogram' },
				},
				success: 'You succeed on your first exploitation.'
			},
			AOKZC3O2: { // Code needed in ComputerScreen
				level: 4,
				title: 'Quest 4',
				desc: 'It\'s time to play with the password. Find a computer to log in to the account whose credentials you just obtained and try to find a flag.',
				map: '',
				wifiKnow: [ 'ZOULOUFAMILY' ],
				orderFix: false,
				imsiHandler: false,
				goalOrder: {
					id8: { optional: true, break: true, dialog: [ 'Oh, you just got that password. Congrats.', 'You should try to connect with it.', 'But be careful, PhotoGram is a really good databroker.' ] },
					id19: { break: true, computerScreen: true, computerMode: 'photogram' },
				},
				success: 'Success. You get a credit card.',
			},
			WOXHAP89: { // Code needed in ComputerScreen
				level: 5,
				title: 'Quest 5',
				desc: 'Buy a IMSI-catcher and place it on a strategic point in the city. Then wait for data !',
				map: '',
				wifiKnow: [ 'ZOULOUFAMILY' ],
				orderFix: true,
				imsiHandler: false,
				goalOrder: {
					id3: { break: true, dialog: [ 'I see, you want my spy tool after all ?', 'Oh you\'ve got a credit card, ok let\'s proceed with the transaction.', 'If you want to try it, place it on a tall object like the Eiffel Tower, a construction crane or even a street lamp.' ] },
					id20: { break: true, dialog: [ 'You have successfully hidden your IMSI-catcher' ] },
					id19: { optional: true, computerScreen: true, computerMode: 'photogram' },
				},
				success: 'Success',
			},
			PAPILLON: { // Code needed in ComputerScreen
				level: 6,
				title: 'Quest 6',
				desc: 'Look at the data you get and try to see if there is something you can use!',
				map: '',
				wifiKnow: [ 'ZOULOUFAMILY' ],
				orderFix: true,
				imsiHandler: true,
				goalOrder: {
					id20: { optional: true, break: true, computerScreen: true, computerMode: 'imsi' },
					id19: { optional: true, computerScreen: true, computerMode: 'photogram' },
				},
				success: 'Success',
			},
			URERK896: { // Code needed in ComputerScreen
				level: 7,
				title: 'Quest 7',
				desc: 'Return to talk to Professor H.',
				map: '',
				wifiKnow: [ 'ZOULOUFAMILY' ],
				orderFix: true,
				imsiHandler: true,
				goalOrder: {
					id10: {
						break: true,
						dialog: [
							'Here you are!',
							'According to my informations you use some powerful tools to get and exploit vulnerabilities.',
							'Congrats and I hope you enjoyed your time!',
						],
					},
					id20: { optional: true, break: true, computerScreen: true, computerMode: 'imsi' },
					id19: { optional: true, computerScreen: true, computerMode: 'photogram' },
				},
				success: 'Success',
			},
		},
		objects: {
			id1: {
				name: '',
				default: '"Et puisse l\'avenir ne pas nous le reprocher par un chagrin", it looks like French literature...',
			},
			id2: {
				name: '',
				default: 'Bourg Palette is a very quiet, peaceful and relaxing place to enjoy the good weather and the spring wind...',
			},
			id3: {
				name: 'Roger',
				default: 'What\'s up ? Do you want a super spy tool ? I sell it for only 59$.',
			},
			id4: {
				name: '',
				default: 'Bourg Palette is populated by 10 wonderful people. We are happy to count you among us.',
			},
			id5: {
				name: '',
				default: 'Search House Lab, a place to learn cybersecurity.',
			},
			id6: {
				name: 'Bob',
				default: '♪ Well you give me the blues ♫',
			},
			id7: {
				name: 'Jest',
				default: 'I can\'t wait to explore the outdoors with my droids.',
			},
			id8: {
				name: 'Anna',
				default: 'My current job is to breach cryptographic security systems and gain access to the contents of encrypted messages.',
			},
			id9: {
				name: 'Software Engineer',
				default: 'Do you know what is an IP ? It\'s an numerical label that uses the Internet Protocol for communication. For example 192.168.50.1 can be the address of the router in a local network.',
			},
			id10: {
				name: 'Professor H',
				default: 'It\'s a beautiful day to hack, isn\'t it ?',
			},
			id11: {
				name: 'Kev',
				default: 'Do you know what is an IMSI-catcher ? It\'s a device used for intercepting mobile phone traffic and tracking location data of users. It\'s working like a MITM attack but for an entire zone.',
			},
			id12: { //dashboard
				name: '',
				default: '',
			},
			id13: { // server 1
				name: '',
				default: '',
			},
			id14: {// server2
				name: '',
				default: 'Look like it\'s doing some serious math',
			},
			id15: {
				name: '',
				default: 'This computer seems to be off.',
			},
			id16: {
				name: '',
				default: 'Trash is empty.',
			},
			id17: {
				name: 'Server',
				default: 'Hi, my name is Miaws',
			},
			id18: { // server 4
				name: '',
				default: '',
			},
			id19: { //softwarescene_computer2
				name: '',
				default: '',
			},
			id20: { // lampadere
				name: '',
				default: '',
			},
			id21: {
				name: '',
				default: 'It\'s closed. You can\'t walk into people\'s houses like that!',
			},
			id22: {// droid outside
				name: 'Droid',
				default: 'Civil liberty and privacy concerns are such a human concept...',
			},
		},
		wifi: [
			{
				actif: true,
				name: 'ZOULOUFAMILY',
				pwd: '123456789',
				coord: [ 941, 617 ],
				devices: [
					{ name: 'Michel\'s musicPod', proba: 4, ip: '192.168.50.18', type: 'music', credentials: [ 'Michelle - The Beatles', 'Til I Fell in Love with You - Bob Dylan', 'Daft Punk - Random Access Memories' ] },
					{ name: 'Sara\'s phone', proba: 3, ip: '192.168.50.152', type: 'navigation', actif: true, credentials: 'AOKZC3O2', probaCredential: 2 },
					{ name: 'Computer 1', proba: 2, ip: '192.168.50.78', type: 'navigation', actif: false },
					{ name: 'Computer 2', proba: 2, ip: '192 .168.50.129', type: 'navigation', actif: true },
					{ name: 'Sasha\'s watch', proba: 3, ip: '192.168.50.89', type: 'watch', credentials: 'ONINHBHUVTYCR45678VC7645Q567890++°0=)0°987654SXCV}^€~^{hugugusqd~#{]~{^@&}&}}&}}&}]#^^sdfsdfjapô' },
				],
			}, {
				actif: true,
  			name: 'TP-LINK_4C50',
  			pwd: 'IHOSDIFH8374@',
  			coord: [ 1737, 888 ],
  		}, {
				actif: true,
  			name: 'SSID-98765432',
  			pwd: '23456SUDQHM+',
  			coord: [ 89, 364 ],
  		},
		],
	},
};

export default config;
