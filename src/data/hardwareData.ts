import { HardwareDevice, HardwareCategory } from '../types';

export interface CategoryInfo {
  id: HardwareCategory;
  name: { en: string; gu: string };
  description: { en: string; gu: string };
}

export const HARDWARE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    name: { en: 'All Devices', gu: 'તમામ ઉપકરણો' },
    description: { en: 'View all 11 computer hardware devices', gu: 'કમ્પ્યુટરના તમામ 11 હાર્ડવેર ઉપકરણો જુઓ' }
  },
  {
    id: 'internal',
    name: { en: 'Internal Components', gu: 'આંતરિક ઘટકો' },
    description: { en: 'Parts mounted inside the computer cabinet', gu: 'કમ્પ્યુટર કેબિનેટની અંદર ફીટ થયેલા ભાગો' }
  },
  {
    id: 'storage',
    name: { en: 'Storage Devices', gu: 'સ્ટોરેજ ઉપકરણો' },
    description: { en: 'Components that hold temporary or permanent data', gu: 'ડેટાને કામચલાઉ અથવા કાયમી સંગ્રહ કરતા ઉપકરણો' }
  },
  {
    id: 'input',
    name: { en: 'Input Devices', gu: 'ઇનપુટ ઉપકરણો' },
    description: { en: 'Hardware used to send data and commands to the computer', gu: 'કમ્પ્યુટરને આદેશ અને માહિતી આપવા વપરાતા સાધનો' }
  },
  {
    id: 'output',
    name: { en: 'Output Devices', gu: 'આઉટપુટ ઉપકરણો' },
    description: { en: 'Hardware that displays results and visual information', gu: 'પરિણામ અને માહિતીને સ્ક્રીન પર દર્શાવતા સાધનો' }
  },
  {
    id: 'power',
    name: { en: 'Power Supply', gu: 'પાવર સપ્લાય' },
    description: { en: 'Units that supply electricity to all computer hardware', gu: 'કમ્પ્યુટરના તમામ ભાગોને વીજળી પૂરી પાડતું યુનિટ' }
  },
  {
    id: 'case',
    name: { en: 'Computer Case', gu: 'કેબિનેટ / કેસ' },
    description: { en: 'Protective chassis housing the entire system', gu: 'તમામ ભાગોનું રક્ષણ કરતું બાહ્ય બોક્સ / કેસ' }
  }
];

export const HARDWARE_DEVICES: HardwareDevice[] = [
  {
    id: 'ram',
    name: { en: 'RAM', gu: 'RAM (રેમ)' },
    fullForm: { en: 'Random Access Memory', gu: 'રેન્ડમ એક્સેસ મેમરી (Random Access Memory)' },
    category: ['internal', 'storage'],
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'ram',
    shortDefinition: {
      en: 'RAM is the super-fast temporary memory that holds programs and data currently being used by the computer.',
      gu: 'RAM એ કમ્પ્યુટરની અત્યંત ઝડપી કામચલાઉ મેમરી છે, જે અત્યારે ચાલતા પ્રોગ્રામ્સ અને ડેટાને તાત્કાલિક ઉપયોગ માટે સાચવે છે.'
    },
    whatItDoes: {
      en: 'It gives the CPU lightning-fast access to open apps, browser tabs, and games while the computer is turned on.',
      gu: 'કમ્પ્યુટર ચાલુ હોય ત્યારે ઓપન થયેલ એપ્સ, બ્રાઉઝર ટેબ્સ અને ગેમ્સનો ડેટા પ્રોસેસરને ખૂબ ઝડપથી પહોંચાડે છે.'
    },
    whyItMatters: {
      en: 'More RAM allows your PC to run multiple heavy applications smoothly without slowing down or freezing.',
      gu: 'વધુ RAM હોવાથી કમ્પ્યુટર એકસાથે અનેક સોફ્ટવેર કોઈપણ અટકાવ કે ધીમા પડ્યા વગર સરળતાથી ચલાવી શકે છે.'
    },
    howItWorks: {
      en: 'When you open an app, it loads from the slow storage (SSD/HDD) into high-speed RAM. Because RAM is volatile, everything in it clears when power is turned off.',
      gu: 'જ્યારે તમે કોઈ એપ ખોલો છો, ત્યારે તે ધીમા સ્ટોરેજમાંથી ઝડપી RAM માં લોડ થાય છે. RAM "વોલેટાઇલ" હોવાથી કમ્પ્યુટર બંધ થતાં જ બધો ડેટા ભૂંસાઈ જાય છે.'
    },
    types: [
      {
        name: { en: 'DDR4 SDRAM', gu: 'DDR4 SDRAM' },
        description: { en: 'Most widely used standard in recent computers (2133 to 3200 MHz).', gu: 'હાલના મોટાભાગના કમ્પ્યુટરમાં વ્યાપકપણે વપરાતી સ્ટાન્ડર્ડ મેમરી (2133 થી 3200 MHz).' }
      },
      {
        name: { en: 'DDR5 SDRAM', gu: 'DDR5 SDRAM' },
        description: { en: 'Latest generation with double the bandwidth and speeds exceeding 6000 MHz.', gu: 'સૌથી નવી પેઢી જે બમણી બેન્ડવિડ્થ અને 6000 MHz થી વધુ ગતિ આપે છે.' }
      },
      {
        name: { en: 'DDR3 SDRAM', gu: 'DDR3 SDRAM' },
        description: { en: 'Older standard found in legacy systems and budget computers.', gu: 'જૂની પેઢીની RAM જે જૂના કમ્પ્યુટરમાં જોવા મળે છે.' }
      },
      {
        name: { en: 'SRAM (Static RAM)', gu: 'SRAM (સ્ટેટિક રેમ)' },
        description: { en: 'Ultra-fast memory used internally inside CPU cache chips.', gu: 'અત્યંત ઝડપી મેમરી જે CPU ના કેશ (Cache) માં વપરાય છે.' }
      }
    ],
    commonUses: {
      en: ['Running operating system processes', 'Holding open Google Chrome tabs', 'Loading game levels & video editing clips'],
      gu: ['ઓપરેટિંગ સિસ્ટમની પ્રક્રિયાઓ ચલાવવા', 'ગુગલ ક્રોમના અનેક ટેબ્સ ખુલ્લા રાખવા', 'ગેમિંગ અને વિડીયો એડિટિંગ ઝડપી બનાવવા']
    },
    realLifeAnalogy: {
      en: 'RAM is like the top surface of your study desk: it holds the books and papers you are reading right now. When you finish for the day (power off), the desk is cleared!',
      gu: 'RAM એ તમારા ભણવાના ટેબલ જેવી છે: તમે જે પુસ્તકો અત્યારે વાંચી રહ્યા છો તે ટેબલ પર રહે છે. જ્યારે કામ પૂરું થાય ત્યારે ટેબલ ખાલી થઈ જાય છે!'
    },
    rememberThis: {
      en: 'RAM is volatile memory (temporary). Do not confuse RAM with storage (SSD/HDD) which saves files permanently!',
      gu: 'RAM એ કામચલાઉ મેમરી છે. RAM અને કાયમી સ્ટોરેજ (SSD/HDD) બંને અલગ છે તે યાદ રાખવું!'
    },
    didYouKnow: {
      en: 'The first commercial RAM chip (Intel 1103) in 1970 had a capacity of just 1 Kilobit (128 bytes)! Today a smartphone has 8 Gigabytes—64 million times more!',
      gu: '1970 માં બનેલી પહેલી RAM ચિપ માત્ર 128 બાઈટ્સની હતી! આજે સામાન્ય ફોનમાં પણ તેનાથી 6.4 કરોડ ગણી વધુ RAM હોય છે!'
    },
    advantages: {
      en: ['Extremely high read/write speeds (over 25,000 MB/s)', 'Direct communication bus with CPU', 'Eliminates application multitasking bottlenecks'],
      gu: ['અતિશય ઊંચી સ્પીડ (25,000 MB/s થી વધુ)', 'પ્રોસેસર સાથે ડાયરેક્ટ કનેક્શન', 'એકસાથે ઘણા સોફ્ટવેર અટક્યા વિના ચલાવી શકે']
    },
    limitations: {
      en: ['Volatile: Loses all data instantly when electricity is cut', 'Significantly more expensive per gigabyte than SSD or HDD', 'Limited capacity compared to storage drives'],
      gu: ['પાવર જતાં ડેટા નાશ પામે છે', 'SSD કે HDD કરતાં ઘણી મોંઘી હોય છે', 'સ્ટોરેજ કરતાં ઓછી સાઈઝ હોય છે']
    },
    comparisons: [
      {
        title: { en: 'RAM vs Storage (SSD/HDD)', gu: 'RAM વિરુદ્ધ સ્ટોરેજ (SSD/HDD)' },
        target: 'storage',
        comparisonText: {
          en: 'RAM provides temporary lightning-fast memory while the PC is on. Storage saves your photos, movies, and files permanently even when turned off.',
          gu: 'RAM કમ્પ્યુટર ચાલુ હોય ત્યાં સુધી અત્યંત ઝડપી કામચલાઉ મેમરી આપે છે, જ્યારે સ્ટોરેજ તમારા ફોટા અને ફાઇલો કાયમ માટે સાચવે છે.'
        },
        points: [
          {
            feature: { en: 'Data Retention', gu: 'ડેટા સાચવવાની ક્ષમતા' },
            deviceA: { en: 'Temporary (Volatile)', gu: 'કામચલાઉ (પાવર બંધ થતાં ભૂંસાય)' },
            deviceB: { en: 'Permanent (Non-volatile)', gu: 'કાયમી (પાવર વગર પણ રહે)' }
          },
          {
            feature: { en: 'Transfer Speed', gu: 'ટ્રાન્સફર સ્પીડ' },
            deviceA: { en: 'Ultra Fast (20,000+ MB/s)', gu: 'અત્યંત ઝડપી (20,000+ MB/s)' },
            deviceB: { en: 'Moderate (150 to 7,000 MB/s)', gu: 'મધ્યમ (150 થી 7,000 MB/s)' }
          }
        ]
      }
    ]
  },

  {
    id: 'hdd',
    name: { en: 'Hard Disk Drive (HDD)', gu: 'હાર્ડ ડિસ્ક ડ્રાઇવ (HDD)' },
    fullForm: { en: 'Hard Disk Drive', gu: 'હાર્ડ ડિસ્ક ડ્રાઇવ (Hard Disk Drive)' },
    category: ['internal', 'storage'],
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'hdd',
    shortDefinition: {
      en: 'An HDD is a traditional magnetic storage device that stores huge amounts of files permanently using spinning metal platters.',
      gu: 'HDD એ પરંપરાગત ચુંબકીય સ્ટોરેજ છે, જે ફરતી ધાતુની ડિસ્ક પર કમ્પ્યુટરનો વિશાળ ડેટા કાયમ માટે સાચવે છે.'
    },
    whatItDoes: {
      en: 'It saves your operating system, software, videos, photos, and backups safely even when your PC is turned off.',
      gu: 'તે તમારી વિન્ડોઝ ઓએસ, સોફ્ટવેર, ફોટા, વિડીયો અને ગેમ્સ કમ્પ્યુટર બંધ હોય ત્યારે પણ સુરક્ષિત સાચવી રાખે છે.'
    },
    whyItMatters: {
      en: 'HDDs offer the highest storage capacity (up to 20+ Terabytes) at the lowest cost per gigabyte.',
      gu: 'HDD ખૂબ જ સસ્તા ભાવે સૌથી વધુ સ્ટોરેજ (2TB થી 20TB સુધી) આપવા માટે સૌથી શ્રેષ્ઠ છે.'
    },
    howItWorks: {
      en: 'Circular magnetic platters spin at 5400 or 7200 RPM while a microscopic read/write head floats on air to record and read magnetic bits.',
      gu: 'અંદર રહેલી ગોળ ડિસ્ક પ્રતિ મિનિટ 5400 કે 7200 ચક્કર ફરે છે અને એક બારીક હેડ તેના પર ચુંબકીય સ્વરૂપે ડેટા લખે અને વાંચે છે.'
    },
    types: [
      {
        name: { en: '3.5-inch Desktop HDD', gu: '3.5-ઇંચ ડેસ્કટોપ HDD' },
        description: { en: 'Larger drives used in desktop PCs and servers requiring high capacity.', gu: 'મોટા ડેસ્કટોપ કમ્પ્યુટર અને સર્વરમાં વપરાતી મોટી હાર્ડ ડિસ્ક.' }
      },
      {
        name: { en: '2.5-inch Laptop HDD', gu: '2.5-ઇંચ લેપટોપ HDD' },
        description: { en: 'Compact, lower-power drives designed for laptops and portable drives.', gu: 'લેપટોપ માટેનું નાનું અને ઓછી વીજળી વાપરતું મોડેલ.' }
      },
      {
        name: { en: 'External USB HDD', gu: 'એક્સટર્નલ USB હાર્ડ ડિસ્ક' },
        description: { en: 'Portable drive enclosed in a case used for file backups across PCs.', gu: 'એક કમ્પ્યુટરમાંથી બીજામાં બેકઅપ લેવા માટે વપરાતી પોર્ટેબલ ડિસ્ક.' }
      },
      {
        name: { en: 'SATA Interface HDD', gu: 'SATA ઇન્ટરફેસ HDD' },
        description: { en: 'Standard cable connection transmitting data up to 6 Gbps.', gu: 'કમ્પ્યુટર મધરબોર્ડ સાથે જોડાતો સ્ટાન્ડર્ડ SATA કેબલ વાળી ડિસ્ક.' }
      }
    ],
    commonUses: {
      en: ['Archiving large family photo libraries and 4K movies', 'Data backups and surveillance CCTV recordings', 'Cost-effective mass file storage servers'],
      gu: ['મોટા મુવીઝ અને ફોટો સંગ્રહ કરવા', 'CCTV કેમેરાનું રેકોર્ડિંગ સાચવવા', 'સસ્તા ભાવે મોટા ડેટાનું બેકઅપ રાખવા']
    },
    realLifeAnalogy: {
      en: 'An HDD is like a traditional paper library with bookshelves: it can hold thousands of books at very low cost, but you have to walk to the shelf to pull a book down.',
      gu: 'HDD એ પુસ્તકાલયના મોટા કબાટ જેવી છે: તેમાં હજારો પુસ્તકો સસ્તે ભાવે સચવાય છે, પણ પુસ્તક શોધવામાં થોડો સમય લાગે છે.'
    },
    rememberThis: {
      en: 'HDDs have moving physical parts. Do not shake or drop an HDD while it is running, as the head can scratch the platter and destroy data!',
      gu: 'HDD માં ફરતા યાંત્રિક ભાગો હોય છે. ચાલુ કમ્પ્યુટરને હલાવવું કે પછાડવું નહીં, નહિતર હાર્ડ ડિસ્ક બગડી શકે છે!'
    },
    didYouKnow: {
      en: 'The first hard drive (IBM 350 in 1956) was the size of two large refrigerators and stored just 3.75 Megabytes of data!',
      gu: '1956 માં આવેલી પહેલી હાર્ડ ડિસ્ક 2 મોટા ફ્રિજ જેવડી હતી અને તેમાં માત્ર 3.75 MB ડેટા જ સમાતો હતો!'
    },
    advantages: {
      en: ['Very cheap cost per gigabyte', 'Massive storage capacities available (up to 22TB)', 'Data recovery can often be performed if hardware fails'],
      gu: ['ખૂબ જ સસ્તો ભાવ પ્રતિ જીબી', 'વિશાળ કેપેસિટી (22 TB સુધી)', 'બગડી જાય તો ડેટા રિકવર થવાની શક્યતા વધુ']
    },
    limitations: {
      en: ['Slow read/write speeds compared to SSD (typically 120-180 MB/s)', 'Produces mechanical noise and vibration', 'Sensitive to physical shocks and drops'],
      gu: ['SSD કરતાં ધીમી સ્પીડ (150 MB/s)', 'અવાજ અને કંપન પેદા કરે છે', 'પડવાથી ખરાબ થવાનું જોખમ રહે છે']
    },
    comparisons: [
      {
        title: { en: 'HDD vs SSD', gu: 'HDD વિરુદ્ધ SSD' },
        target: 'ssd',
        comparisonText: {
          en: 'HDDs use spinning magnetic disks with moving parts (cheaper, slower). SSDs use silent electronic microchips (much faster, durable).',
          gu: 'HDD માં ફરતી ડિસ્ક હોય છે જે ધીમી પણ સસ્તી હોય છે. SSD માં ચિપ્સ હોય છે જે ખૂબ ઝડપી અને મજબૂત હોય છે.'
        },
        points: [
          {
            feature: { en: 'Technology', gu: 'ટેકનોલોજી' },
            deviceA: { en: 'Spinning Magnetic Platters', gu: 'ફરતી મેગ્નેટિક ડિસ્ક' },
            deviceB: { en: 'NAND Flash Memory Chips', gu: 'ઇલેક્ટ્રોનિક ફ્લેશ ચિપ્સ' }
          },
          {
            feature: { en: 'Speed', gu: 'ઝડપ' },
            deviceA: { en: '100 - 180 MB/s', gu: '100 - 180 MB/s' },
            deviceB: { en: '500 - 7,000+ MB/s', gu: '500 - 7,000+ MB/s' }
          }
        ]
      }
    ]
  },

  {
    id: 'ssd',
    name: { en: 'Solid State Drive (SSD)', gu: 'સોલિડ સ્ટેટ ડ્રાઇવ (SSD)' },
    fullForm: { en: 'Solid State Drive', gu: 'સોલિડ સ્ટેટ ડ્રાઇવ (Solid State Drive)' },
    category: ['internal', 'storage'],
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'ssd',
    shortDefinition: {
      en: 'An SSD is modern high-speed storage that uses silent flash memory microchips with zero moving parts.',
      gu: 'SSD એ અતિ ઝડપી સ્ટોરેજ છે, જેમાં કોઈ ફરતા ભાગો વગર ઇલેક્ટ્રોનિક ફ્લેશ મેમરી ચિપ્સ દ્વારા ડેટા સંગ્રહાય છે.'
    },
    whatItDoes: {
      en: 'It boots Windows in just 5-10 seconds, launches software instantly, and loads games without waiting.',
      gu: 'તે કમ્પ્યુટરને માત્ર 5 થી 10 સેકન્ડમાં ચાલુ કરે છે અને સોફ્ટવેર તેમજ ગેમ્સને પલકવારમાં ઓપન કરી આપે છે.'
    },
    whyItMatters: {
      en: 'Upgrading from an old HDD to an SSD is the single biggest performance boost you can give any computer.',
      gu: 'જૂના કમ્પ્યુટરમાંથી HDD કાઢી SSD નાખવાથી કમ્પ્યુટરની ઝડપ 5 થી 10 ગણી વધી જાય છે.'
    },
    howItWorks: {
      en: 'Data is trapped in microscopic flash memory cells using electrical voltages. Because there are no moving arms, files are located instantaneously.',
      gu: 'ડેટા ફ્લેશ મેમરી ચિપ્સમાં વીજળીના કણો વડે સચવાય છે. કોઈ પણ ફરતો ભાગ ન હોવાથી ડેટા તરત જ પ્રાપ્ત થાય છે.'
    },
    types: [
      {
        name: { en: 'M.2 NVMe SSD', gu: 'M.2 NVMe SSD' },
        description: { en: 'Small stick connecting directly to PCIe lanes; ultra-fast speeds up to 7,000+ MB/s.', gu: 'નાની પટ્ટી જેવી SSD જે મધરબોર્ડમાં સીધી લાગે છે (7000+ MB/s સ્પીડ).' }
      },
      {
        name: { en: '2.5-inch SATA SSD', gu: '2.5-ઇંચ SATA SSD' },
        description: { en: 'Traditional box shape replacing laptop/desktop HDDs with speeds up to 550 MB/s.', gu: 'જૂની હાર્ડ ડિસ્કની જગ્યાએ આસાનીથી ફીટ થઈ શકતી કેબલ વાળી SSD (550 MB/s).' }
      },
      {
        name: { en: 'M.2 SATA SSD', gu: 'M.2 SATA SSD' },
        description: { en: 'M.2 stick form factor running on slower SATA 6Gbps bus protocol.', gu: 'M.2 સાઈઝની પણ SATA સ્પીડ પર ચાલતી SSD.' }
      }
    ],
    commonUses: {
      en: ['Operating system drive (C: drive) for instant boot', 'Demanding PC games and video editing scratch disks', 'Lightweight laptops for quiet, durable computing'],
      gu: ['વિન્ડોઝ ઓએસ (C: ડ્રાઇવ) ઝડપી ચલાવવા', 'ગેમિંગ અને વિડીયો એડિટિંગ ઝડપી બનાવવા', 'લેપટોપમાં બેટરી બચાવવા અને ઝડપ વધારવા']
    },
    realLifeAnalogy: {
      en: 'If an HDD is like searching through file cabinets by hand, an SSD is like pressing a button on your phone and having the document appear instantly on screen!',
      gu: 'HDD જો કાગળના કબાટમાંથી ફાઇલ શોધવા જેવી હોય, તો SSD એ સ્માર્ટફોનમાં સર્ચ બટન દબાવતાં જ ફોટો સામે આવી જવા જેવી છે!'
    },
    rememberThis: {
      en: 'M.2 is the physical connector shape (form factor), while NVMe is the ultra-fast communication language (protocol). An M.2 drive can be SATA or NVMe!',
      gu: 'M.2 એ સાધનનો આકાર (કનેક્ટર) છે અને NVMe એ ઝડપી કનેક્શન પ્રોટોકોલ છે. આ બંને વચ્ચેનો તફાવત યાદ રાખવો!'
    },
    didYouKnow: {
      en: 'Because SSDs have no spinning parts, they use up to 70% less battery in laptops and can survive drops that would destroy an HDD!',
      gu: 'SSD માં કોઈ ફરતો ભાગ ન હોવાથી તે 70% ઓછી બેટરી વાપરે છે અને લેપટોપ નીચે પડી જાય તો પણ ડેટા સુરક્ષિત રહે છે!'
    },
    advantages: {
      en: ['Up to 30 times faster than mechanical HDDs', 'Completely silent and produces less heat', 'Highly shock-resistant and energy-efficient'],
      gu: ['HDD કરતાં 10 થી 30 ગણી વધુ ઝડપ', 'બિલકુલ અવાજ રહિત અને ઓછી ગરમી', 'પડવા સામે સુરક્ષિત અને ઓછી વીજળી વાપરે']
    },
    limitations: {
      en: ['Costs more per gigabyte than mechanical hard drives', 'Data recovery is very difficult if the controller chip fails', 'Flash cells have a finite write endurance (TBW)'],
      gu: ['HDD કરતાં થોડી મોંઘી હોય છે', 'અચાનક બળી જાય તો ડેટા રિકવરી અઘરી છે', 'ચોક્કસ લખાણ મર્યાદા (TBW) હોય છે']
    }
  },

  {
    id: 'motherboard',
    name: { en: 'Motherboard', gu: 'મધરબોર્ડ (Motherboard)' },
    fullForm: { en: 'Mainboard / System Board', gu: 'મેઇનબોર્ડ અથવા સિસ્ટમ બોર્ડ (Mainboard)' },
    category: ['internal'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'motherboard',
    shortDefinition: {
      en: 'The motherboard is the main circuit board that connects the CPU, RAM, storage, graphics card, and power supply together.',
      gu: 'મધરબોર્ડ એ કમ્પ્યુટરનું મુખ્ય સર્કિટ બોર્ડ છે, જે પ્રોસેસર, રેમ, હાર્ડ ડિસ્ક અને પાવર સપ્લાયને એકબીજા સાથે જોડે છે.'
    },
    whatItDoes: {
      en: 'It acts as the central communication highway allowing all components to talk to each other and share electrical power.',
      gu: 'તે એક સેન્ટ્રલ હાઈવે જેવું કામ કરે છે જેના દ્વારા કમ્પ્યુટરના બધા સાધનો એકબીજા સાથે વાતચીત અને પાવર શેર કરે છે.'
    },
    whyItMatters: {
      en: 'Without the motherboard, individual parts like the CPU and RAM cannot communicate or function.',
      gu: 'મધરબોર્ડ વિના પ્રોસેસર કે રેમ ક્યારેય એકબીજા સાથે કામ કરી શકતા નથી.'
    },
    howItWorks: {
      en: 'Thousands of copper traces etched into the circuit board carry electrical signals and data between component sockets and expansion slots.',
      gu: 'બોર્ડમાં છપાયેલા હજારો તાંબાના વાયર (ટ્રેસિસ) બધા સાધનો વચ્ચે વીજળી અને ડેટા સિગ્નલનું વહન કરે છે.'
    },
    types: [
      {
        name: { en: 'ATX (Standard)', gu: 'ATX (સ્ટાન્ડર્ડ)' },
        description: { en: 'Full-sized motherboard (305x244 mm) with multiple PCIe slots and maximum connectivity.', gu: 'સામાન્ય કદનું મોટું મધરબોર્ડ જેમાં ઘણા સ્લોટ્સ હોય છે.' }
      },
      {
        name: { en: 'Micro-ATX (mATX)', gu: 'માઇક્રો-ATX (mATX)' },
        description: { en: 'Compact square size (244x244 mm) offering great balance of price and features.', gu: 'થોડું નાનું ચોરસ બોર્ડ જે બજેટ કમ્પ્યુટર માટે ખૂબ લોકપ્રિય છે.' }
      },
      {
        name: { en: 'Mini-ITX', gu: 'મિની-ITX (Mini-ITX)' },
        description: { en: 'Ultra-compact size (170x170 mm) designed for tiny portable desktop cubes.', gu: 'અતિ નાનું બોર્ડ જે પોર્ટેબલ અને નાના કમ્પ્યુટર માટે વપરાય છે.' }
      }
    ],
    commonUses: {
      en: ['Housing the CPU socket and heatsink cooler', 'Holding RAM sticks in dual-channel slots', 'Providing USB, audio, and network ports on the back panel'],
      gu: ['પ્રોસેસર અને કુલર બેસાડવા', 'રેમના સ્લોટ્સ પૂરા પાડવા', 'પાછળ USB, નેટવર્ક અને ઑડિયો પોર્ટ્સ આપવા']
    },
    realLifeAnalogy: {
      en: 'The motherboard is like the human nervous system and skeleton: it holds every vital organ in place and carries nerve signals between them.',
      gu: 'મધરબોર્ડ માનવ શરીરના હાડપિંજર અને ચેતાતંત્ર જેવું છે: તે બધા અંગોને જકડી રાખે છે અને સંદેશા પહોંચાડે છે.'
    },
    rememberThis: {
      en: 'Every motherboard has a specific CPU socket (e.g. Intel LGA1700 or AMD AM5). A CPU from one brand will NOT fit on a motherboard designed for the other!',
      gu: 'દરેક મધરબોર્ડમાં ચોક્કસ પ્રોસેસર સોકેટ હોય છે. Intel નું પ્રોસેસર AMD ના મધરબોર્ડમાં બેસશે નહીં!'
    },
    didYouKnow: {
      en: 'A modern motherboard has between 4 and 10 layers of fiberglass and copper pressed together into a board only 1.6 mm thick!',
      gu: 'આજના મધરબોર્ડ માત્ર 1.6 mm જાડા હોય છે છતાં તેમાં અંદર 4 થી 10 વાયરિંગના અલગ-અલગ લેયર્સ દબાવેલા હોય છે!'
    },
    advantages: {
      en: ['Central hub for all upgrades and expansion cards', 'Built-in BIOS/UEFI firmware controls boot hardware', 'Integrated audio, Wi-Fi, and gigabit ethernet'],
      gu: ['બધા પાર્ટ્સ જોડવાનું મુખ્ય કેન્દ્ર', 'કમ્પ્યુટર શરૂ કરવા માટેનું BIOS/UEFI ધરાવે છે', 'ઇનબિલ્ટ સાઉન્ડ અને નેટવર્ક કનેક્શન આપે છે']
    },
    limitations: {
      en: ['Replacing a motherboard requires taking apart the entire PC', 'Socket limitations prevent upgrading to much newer CPUs', 'Sensitive to static electricity (ESD) during installation'],
      gu: ['મધરબોર્ડ બદલવું એટલે આખું કમ્પ્યુટર ફરીથી બનાવવું', 'ચોક્કસ પ્રોસેસર જ સપોર્ટ કરે છે', 'સ્ટેટિક કરંટથી બળી જવાનું જોખમ રહે છે']
    }
  },

  {
    id: 'smps',
    name: { en: 'SMPS (Power Supply Unit)', gu: 'SMPS (પાવર સપ્લાય યુનિટ)' },
    fullForm: { en: 'Switched-Mode Power Supply', gu: 'સ્વિચ્ડ-મોડ પાવર સપ્લાય (Switched-Mode Power Supply)' },
    category: ['internal', 'power'],
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'smps',
    shortDefinition: {
      en: 'The SMPS converts dangerous high-voltage AC electricity from your home wall socket into safe, clean DC power for computer chips.',
      gu: 'SMPS ઘરની દીવાલમાંથી આવતી 230V હાઈ-વોલ્ટેજ AC વીજળીને કમ્પ્યુટરના નાજુક ભાગો માટે સુરક્ષિત DC કરંટમાં ફેરવે છે.'
    },
    whatItDoes: {
      en: 'It distributes exact voltages (+12V for CPU & GPU, +5V for storage, +3.3V for motherboard chips) with short-circuit protection.',
      gu: 'તે મધરબોર્ડ, પ્રોસેસર અને ગ્રાફિક્સ કાર્ડને જોઈતી ચોક્કસ 12V, 5V અને 3.3V વીજળી સ્થિર રીતે પૂરી પાડે છે.'
    },
    whyItMatters: {
      en: 'A low-quality power supply can damage or destroy expensive computer parts during electrical spikes or power cuts.',
      gu: 'નબળી ગુણવત્તાવાળો SMPS પાવર વધઘટ થાય ત્યારે પ્રોસેસર અને મધરબોર્ડને બાળી શકે છે.'
    },
    howItWorks: {
      en: 'It rapidly switches transistors on and off thousands of times per second, stepping down voltage efficiently while generating minimal heat.',
      gu: 'તે સેકન્ડમાં હજારો વખત પાવર સ્વિચ કરીને ઓછા બગાડ સાથે હાઈ વોલ્ટેજને નીચા સ્થિર વોલ્ટેજમાં રૂપાંતરિત કરે છે.'
    },
    types: [
      {
        name: { en: 'Non-Modular SMPS', gu: 'નોન-મોડ્યુલર SMPS' },
        description: { en: 'All power cables are permanently attached to the box.', gu: 'બધા વાયરો અંદરથી કાયમ માટે જોડાયેલા હોય છે.' }
      },
      {
        name: { en: 'Modular SMPS', gu: 'મોડ્યુલર SMPS' },
        description: { en: 'Detachable cables allow you to plug in only what you need, reducing clutter.', gu: 'જોઈતા વાયર જ લગાવી શકાય તેવો SMPS જેથી કેબલની ગૂંચ ન થાય.' }
      },
      {
        name: { en: '80 PLUS Certified (Bronze/Gold/Platinum)', gu: '80 PLUS સર્ટિફાઇડ' },
        description: { en: 'Power efficiency rating showing that 80% to 92%+ of electricity is cleanly delivered.', gu: 'વીજળીની બચત અને કાર્યક્ષમતા દર્શાવતું સર્ટિફિકેટ.' }
      }
    ],
    commonUses: {
      en: ['Powering the motherboard 24-pin connector', 'Delivering dedicated 8-pin power to high-end CPUs and GPUs', 'Powering SATA storage drives and case fans'],
      gu: ['મધરબોર્ડને 24-પિન કનેક્ટરથી પાવર આપવા', 'ગ્રાફિક્સ કાર્ડ અને CPU ને વીજળી આપવા', 'હાર્ડ ડિસ્ક અને ફેન ચલાવવા']
    },
    realLifeAnalogy: {
      en: 'The SMPS is like the heart of the computer: it pumps electricity (blood) at the exact required pressure through cables (arteries) to every part.',
      gu: 'SMPS કમ્પ્યુટરનું હૃદય છે: જેમ હૃદય આખા શરીરમાં લોહી પહોંચાડે છે, તેમ SMPS બધા ભાગોમાં વીજળી પહોંચાડે છે.'
    },
    rememberThis: {
      en: 'Always choose an SMPS with enough wattage (e.g. 500W to 750W) and never open an SMPS box yourself—its capacitors hold dangerous electric charge even when unplugged!',
      gu: 'SMPS બોક્સ ક્યારેય જાતે ખોલવું નહીં—પ્લગ કાઢ્યા પછી પણ તેની અંદર જોખમી વીજ કરંટ સંગ્રહાયેલો હોય છે!'
    },
    didYouKnow: {
      en: 'An 80 PLUS Gold certified power supply saves enough electricity over 3 years of daily use to pay for a large portion of its purchase price!',
      gu: 'સારો 80 PLUS પાવર સપ્લાય 3 વર્ષમાં એટલી વીજળી બચાવે છે કે તેના પૈસા વસૂલ થઈ જાય છે!'
    },
    advantages: {
      en: ['Protects computer against power surges, over-voltage, and short circuits', 'Converts AC to stable DC with up to 90%+ efficiency', 'Silent cooling fans that spin only when needed'],
      gu: ['શોર્ટ સર્કિટ અને કરંટના ઝટકા સામે સુરક્ષા', 'સ્થિર વોલ્ટેજ આપે છે જેથી પાર્ટ્સ લાંબો સમય ચાલે', 'વીજળીનો બગાડ અટકાવે છે']
    },
    limitations: {
      en: ['Heavy and takes up noticeable room inside the case', 'Excess cables in non-modular models clutter airflow', 'Cheap unbranded models are a fire and component hazard'],
      gu: ['વજનદાર હોય છે', 'વધારાના કેબલ્સ કમ્પ્યુટરની હવા રોકે છે', 'સસ્તો SMPS આખા કમ્પ્યુટરને નુકસાન કરી શકે']
    }
  },

  {
    id: 'cpu',
    name: { en: 'CPU (Processor)', gu: 'CPU (પ્રોસેસર)' },
    fullForm: { en: 'Central Processing Unit / Processor', gu: 'સેન્ટ્રલ પ્રોસેસિંગ યુનિટ (CPU / Processor)' },
    category: ['internal'],
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'cpu',
    shortDefinition: {
      en: 'The CPU (Central Processing Unit), also known as the processor, is the electronic brain of the computer that interprets and executes all software instructions.',
      gu: 'CPU (સેન્ટ્રલ પ્રોસેસિંગ યુનિટ), જેને પ્રોસેસર પણ કહેવાય છે, તે કમ્પ્યુટરનું ઇલેક્ટ્રોનિક મગજ છે જે તમામ સોફ્ટવેર સૂચનાઓ વાંચીને ગણતરી અને પરિણામ આપે છે.'
    },
    whatItDoes: {
      en: 'It does all math calculations, coordinates other hardware parts, and executes software instructions billions of times per second.',
      gu: 'તે તમામ ગાણિતિક ગણતરીઓ કરે છે, અન્ય સાધનોને નિયંત્રિત કરે છે અને સેકન્ડમાં અબજો સૂચનાઓનું પાલન કરે છે.'
    },
    whyItMatters: {
      en: 'The CPU determines how fast your PC opens applications, runs games, edits videos, and browses websites.',
      gu: 'કમ્પ્યુટર કેટલું ઝડપી કામ કરશે તેનો મુખ્ય આધાર CPU (પ્રોસેસર) ની ક્ષમતા પર રહેલો છે.'
    },
    howItWorks: {
      en: 'Operating at microscopic nanometer scales (3nm to 7nm), billions of silicon gates perform the Fetch-Decode-Execute cycle at clock frequencies above 4 GHz.',
      gu: 'તે ફેચ-ડીકોડ-એક્ઝિક્યુટ ચક્ર ચલાવે છે: RAM માંથી સૂચના મેળવે છે, તેનો અર્થ સમજે છે અને અબજો સિલિકોન ગેટ્સ દ્વારા ગણતરી કરીને પરિણામ લાવે છે.'
    },
    types: [
      {
        name: { en: 'Intel Core Series (i3, i5, i7, i9)', gu: 'Intel Core સીરીઝ (i3, i5, i7, i9)' },
        description: { en: 'Leading desktop & laptop processor family using hybrid Performance & Efficient cores.', gu: 'દુનિયાભરમાં સૌથી વધુ વપરાતી ઇન્ટેલ કંપનીની પ્રોસેસર સીરીઝ.' }
      },
      {
        name: { en: 'AMD Ryzen Series (Ryzen 3, 5, 7, 9)', gu: 'AMD Ryzen સીરીઝ (Ryzen 3, 5, 7, 9)' },
        description: { en: 'Renowned for high multi-threaded performance, 3D V-Cache, and gaming prowess.', gu: 'ગેમિંગ અને મલ્ટીટાસ્કિંગ માટે જાણીતી એએમડી રાઇઝન સીરીઝ.' }
      },
      {
        name: { en: 'ARM Processors (Apple Silicon M-Series, Mobile)', gu: 'ARM પ્રોસેસર્સ (Apple M-Series, ફોન પ્રોસેસર)' },
        description: { en: 'Ultra low-power RISC architecture dominating phones and modern MacBooks.', gu: 'ઓછી બેટરીમાં ઊંચી સ્પીડ આપતા આધુનિક સ્માર્ટફોન અને લેપટોપ પ્રોસેસર્સ.' }
      },
      {
        name: { en: 'CPUs with Integrated Graphics (iGPU)', gu: 'ઇન્ટિગ્રેટેડ ગ્રાફિક્સ વાળા CPU' },
        description: { en: 'Includes built-in display rendering without needing a separate GPU card.', gu: 'અંદર જ ડિસ્પ્લે આપવા માટે ગ્રાફિક્સ યુનિટ ધરાવતા CPU.' }
      }
    ],
    commonUses: {
      en: ['Running Windows OS and everyday software', 'Gaming calculation logic, artificial intelligence, and physics', 'Compiling programming code and scientific simulations'],
      gu: ['વિન્ડોઝ અને તમામ સોફ્ટવેર ચલાવવા', 'ગેમિંગ અને સાયન્ટિફિક ગણતરીઓ કરવા', 'કોડિંગ, વિડીયો એડિટિંગ અને એનિમેશન']
    },
    realLifeAnalogy: {
      en: 'The CPU is like the master head chef in a busy kitchen: reading the order ticket, telling assistants what to prepare, and directing the entire restaurant!',
      gu: 'CPU એ રસોડાના મુખ્ય શેફ જેવું છે: તે ઓર્ડર વાંચે છે, કઈ સામગ્રી ક્યાંથી લેવી અને કઈ વાનગી ક્યારે બનાવવી તે બધાને નિર્દેશ આપે છે!'
    },
    rememberThis: {
      en: 'CPU and Processor are the EXACT SAME hardware chip! "CPU" is the technical acronym and "Processor" is the common everyday name.',
      gu: 'યાદ રાખો: CPU અને પ્રોસેસર એ બંને એક જ સાધન છે! વધુ કોર્સ વિડીયો એડિટિંગમાં મદદ કરે છે અને વધુ GHz સ્પીડ ગેમિંગને સ્મૂધ બનાવે છે!'
    },
    didYouKnow: {
      en: 'A modern desktop CPU contains over 10 to 20 BILLION transistors, each so small that tens of thousands could fit on the tip of a single human hair!',
      gu: 'આજના એક સામાન્ય CPU માં 15 અબજથી વધુ ટ્રાન્ઝિસ્ટર હોય છે, જે માનવ વાળ કરતાં પણ હજારો ગણા નાના હોય છે!'
    },
    advantages: {
      en: ['Incredible processing speed (billions of calculations per second)', 'Handles any general-purpose computation task', 'Multi-core architectures run dozens of background apps simultaneously'],
      gu: ['અકલ્પનીય ગણતરી સ્પીડ (GHz સ્પીડ)', 'કોઈપણ પ્રકારના સોફ્ટવેર ચલાવી શકે', 'એકસાથે ઘણા કાર્યો કરવાની ક્ષમતા']
    },
    limitations: {
      en: ['Generates high heat and requires a dedicated heatsink cooler', 'More expensive to replace than peripheral hardware', 'Requires compatible motherboard socket'],
      gu: ['ખૂબ ગરમ થાય છે જેથી કુલર ફેન અનિવાર્ય છે', 'મોંઘો પાર્ટ છે', 'ચોક્કસ મધરબોર્ડ સોકેટની જરૂર પડે છે']
    }
  },

  {
    id: 'monitor',
    name: { en: 'Monitor (Display)', gu: 'મોનિટર (ડિસ્પ્લે સ્ક્રીન)' },
    fullForm: { en: 'Visual Display Unit (VDU)', gu: 'વિઝ્યુઅલ ડિસ્પ્લે યુનિટ (Visual Display Unit)' },
    category: ['output'],
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'monitor',
    shortDefinition: {
      en: 'A monitor is the primary visual output device that displays text, images, video, and user interfaces generated by the computer.',
      gu: 'મોનિટર એ મુખ્ય વિઝ્યુઅલ આઉટપુટ ડિવાઇસ છે, જે કમ્પ્યુટર દ્વારા તૈયાર થતા ચિત્રો, અક્ષરો, વિડીયો અને સોફ્ટવેર સ્ક્રીન પર બતાવે છે.'
    },
    whatItDoes: {
      en: 'It receives digital display signals from the motherboard or graphics card and turns them into millions of colored light pixels.',
      gu: 'તે ગ્રાફિક્સ કાર્ડમાંથી સિગ્નલ મેળવીને લાખો રંગીન પિક્સેલ્સ (Pixels) દ્વારા સ્ક્રીન પર ચિત્ર બનાવે છે.'
    },
    whyItMatters: {
      en: 'Without a monitor, you cannot see what the computer is doing, interact with Windows, or read any information.',
      gu: 'મોનિટર વિના તમે કમ્પ્યુટરમાં શું ચાલી રહ્યું છે તે જોઈ કે ચલાવી શકતા નથી.'
    },
    howItWorks: {
      en: 'Pixels arranged in a grid light up in red, green, and blue (RGB) combinations refreshed 60 to 240+ times per second to create motion.',
      gu: 'લાલ, લીલા અને વાદળી (RGB) રંગના લાખો નાના ટપકાંઓ સેકન્ડમાં 60 થી 144 વખત બદલાઈને જીવંત ચિત્ર બનાવે છે.'
    },
    types: [
      {
        name: { en: 'IPS LED Monitor', gu: 'IPS LED મોનિટર' },
        description: { en: 'Best viewing angles and color accuracy, ideal for office work and content creation.', gu: 'સાચા રંગો અને કોઈપણ ખૂણેથી ચોખ્ખું દેખાડતું લોકપ્રિય મોનિટર.' }
      },
      {
        name: { en: 'OLED Monitor', gu: 'OLED મોનિટર' },
        description: { en: 'Self-lit pixels delivering true deep blacks and instant pixel response for gaming.', gu: 'દરેક પિક્સેલ જાતે લાઈટ કરે છે, સૌથી ઘાટો કાળો રંગ અને અદ્ભુત ચિત્ર આપે છે.' }
      },
      {
        name: { en: 'High Refresh Rate Gaming Monitor (144Hz - 240Hz)', gu: 'ગેમિંગ મોનિટર (144Hz+)' },
        description: { en: 'Refreshes the screen 144+ times per second for silky-smooth motion in fast games.', gu: 'સેકન્ડમાં 144 વખત સ્ક્રીન બદલે છે જેથી ફાસ્ટ ગેમિંગ એકદમ સ્મૂધ ચાલે.' }
      }
    ],
    commonUses: {
      en: ['Viewing Windows desktop and web pages', 'Watching movies and editing high-resolution photos', 'Playing esports video games with high clarity'],
      gu: ['ઇન્ટરનેટ અને ઓફિસ કામ જોવા', 'મુવીઝ જોવા અને ફોટો એડિટિંગ કરવા', 'ગેમિંગ સ્ક્રીન તરીકે']
    },
    realLifeAnalogy: {
      en: 'The monitor is like the windshield of your car: everything the engine and wheels do is only useful if you can see where you are going!',
      gu: 'મોનિટર કારના કાચ જેવું છે: એન્જિન ભલે ગમે તેટલું પાવરફુલ હોય, પણ સામે જોવાનો કાચ ન હોય તો ગાડી ચલાવી શકાતી નથી!'
    },
    rememberThis: {
      en: 'Always use digital cables like HDMI or DisplayPort for sharp modern resolutions. Avoid old blue analog VGA cables on modern screens!',
      gu: 'મોનિટરને જોડવા માટે હંમેશા HDMI અથવા DisplayPort કેબલ વાપરવો જેથી ચિત્ર એકદમ સ્પષ્ટ દેખાય!'
    },
    didYouKnow: {
      en: 'A standard 4K monitor contains over 8.29 MILLION individual colored pixels, all changing color dozens of times every single second!',
      gu: '4K મોનિટરની સ્ક્રીન પર 83 લાખથી પણ વધુ નાના રંગીન પિક્સેલ્સ હોય છે!'
    },
    advantages: {
      en: ['Clear, sharp visual interface with adjustable brightness', 'Multiple inputs (HDMI, DisplayPort, USB-C)', 'Eye-care modes reduce blue light strain'],
      gu: ['આંખો માટે અનુકૂળ સ્પષ્ટ ડિસ્પ્લે', 'HDMI અને DisplayPort કનેક્શન', 'બ્રાઇટનેસ અને કલર એડજસ્ટ કરવાની સુવિધા']
    },
    limitations: {
      en: ['Takes up substantial desk space', 'Fragile glass/panel can crack if bumped or dropped', 'Can cause eye fatigue if used for prolonged hours without breaks'],
      gu: ['ટેબલ પર વધુ જગ્યા રોકે છે', 'કાચની સ્ક્રીન નાજુક હોય છે', 'લાંબો સમય જોવાથી આંખો થાકી શકે છે']
    }
  },

  {
    id: 'mouse',
    name: { en: 'Mouse (Pointing Device)', gu: 'માઉસ (પોઇન્ટિંગ ડિવાઇસ)' },
    fullForm: { en: 'Manually Operated User Selection Equipment', gu: 'પોઇન્ટિંગ અને ક્લિકિંગ ડિવાઇસ' },
    category: ['input'],
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'mouse',
    shortDefinition: {
      en: 'A mouse is a handheld input device that controls the movement of the cursor on the screen and allows you to select items.',
      gu: 'માઉસ એ હાથથી પકડીને ચલાવવાનું ઇનપુટ સાધન છે, જે સ્ક્રીન પરના કર્સરને ફેરવે છે અને વસ્તુઓ પસંદ કરવા ક્લિક કરે છે.'
    },
    whatItDoes: {
      en: 'It lets you point, click, double-click, right-click, drag items, and scroll through long documents and web pages.',
      gu: 'તે સ્ક્રીન પર ક્લિક કરવા, ફાઈલો ખોલવા, ડ્રેગ કરવા અને પેજને ઉપર-નીચે સ્ક્રોલ કરવામાં મદદ કરે છે.'
    },
    whyItMatters: {
      en: 'It makes navigating a graphical operating system like Windows intuitive, fast, and natural for anyone.',
      gu: 'માઉસ વિના વિન્ડોઝમાં ફોલ્ડર્સ ખોલવા કે બ્રાઉઝિંગ કરવું ખૂબ મુશ્કેલ બની જાય છે.'
    },
    howItWorks: {
      en: 'An optical LED light or laser on the bottom captures thousands of surface pictures per second to calculate movement direction and distance.',
      gu: 'નીચે લાગેલી લાલ LED લાઈટ કે લેસર સેન્સર સપાટીના ફોટા લઈને માઉસ કઈ બાજુ ખસે છે તે કમ્પ્યુટરને જણાવે છે.'
    },
    types: [
      {
        name: { en: 'Optical Wired Mouse', gu: 'ઓપ્ટિકલ વાયર્ડ માઉસ' },
        description: { en: 'Reliable, affordable USB mouse with zero battery worries.', gu: 'વાયર વાળું સસ્તું અને ભરોસાપાત્ર માઉસ જેને બેટરીની જરૂર નથી હોતી.' }
      },
      {
        name: { en: 'Wireless Mouse (Bluetooth / 2.4GHz USB)', gu: 'વાયરલેસ માઉસ' },
        description: { en: 'No cable clutter; communicates wirelessly via tiny USB dongle or Bluetooth.', gu: 'વાયર વગરનું માઉસ જે બ્લૂટૂથ કે નાના USB એડેપ્ટરથી ચાલે છે.' }
      },
      {
        name: { en: 'Gaming Mouse', gu: 'ગેમિંગ માઉસ' },
        description: { en: 'High DPI sensitivity settings, programmable extra side buttons, and RGB lights.', gu: 'હાઈ સ્પીડ સેન્સર અને વધારાના બટનો વાળું સ્પેશિયલ માઉસ.' }
      }
    ],
    commonUses: {
      en: ['Clicking icons, menus, and links on web pages', 'Selecting text, drawing shapes, and photo retouching', 'Aiming and looking around in 3D PC video games'],
      gu: ['વેબસાઇટ અને એપ્સ પર ક્લિક કરવા', 'ચિત્રો દોરવા અને ફોટો કટિંગ કરવા', 'ગેમ્સ રમતી વખતે દિશા બદલવા']
    },
    realLifeAnalogy: {
      en: 'The mouse is like an extension of your physical hand reaching directly into the computer screen to pick up, touch, and move items.',
      gu: 'માઉસ એ તમારા હાથ જેવું છે: જેમ તમે ટેબલ પરથી વસ્તુ ઉપાડો છો, તેમ માઉસ સ્ક્રીન પરની ફાઇલો ઉપાડીને મૂકે છે.'
    },
    rememberThis: {
      en: 'Left click = Select / Open. Right click = Opens context options menu. Scroll wheel = Moves document up and down smoothly!',
      gu: 'ડાબું ક્લિક = સિલેક્ટ / ઓપન. જમણું ક્લિક = ઓપ્શન મેનુ. વચ્ચેનું વ્હીલ = પેજ ઉપર-નીચે ફેરવવા!'
    },
    didYouKnow: {
      en: 'The very first computer mouse was invented by Douglas Engelbart in 1964 and was made out of a block of carved wood with two metal wheels!',
      gu: '1964 માં બનેલું દુનિયાનું પહેલું કમ્પ્યુટર માઉસ લાકડાનું બનેલું હતું અને તેમાં પૈડાં લાગેલા હતા!'
    },
    advantages: {
      en: ['Extremely intuitive and natural for beginners to learn', 'High precision pointing down to single pixels', 'Available everywhere at very affordable prices'],
      gu: ['શીખવામાં ખૂબ જ સરળ અને કુદરતી', 'ઝીણી વિગતો પણ આસાનીથી સિલેક્ટ કરી શકાય', 'ખૂબ સસ્તા ભાવે બધે મળી રહે છે']
    },
    limitations: {
      en: ['Requires a flat, clean surface or mousepad to glide properly', 'Wireless models require battery replacement or recharging', 'Prolonged bad wrist posture can cause strain without ergonomic support'],
      gu: ['ચલાવવા માટે સપાટ ટેબલ કે માઉસપેડ જોઈએ', 'વાયરલેસ હોય તો બેટરી ચાર્જ કરવી પડે', 'ખોટી રીતે પકડવાથી કાંડામાં દુખાવો થઈ શકે']
    }
  },

  {
    id: 'keyboard',
    name: { en: 'Keyboard', gu: 'કીબોર્ડ (Keyboard)' },
    fullForm: { en: 'Alphanumeric Input Device', gu: 'ટેક્સ્ટ અને કમાન્ડ ઇનપુટ ડિવાઇસ' },
    category: ['input'],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'keyboard',
    shortDefinition: {
      en: 'A keyboard is the primary text input device consisting of keys used to type letters, numbers, symbols, and system commands.',
      gu: 'કીબોર્ડ એ કમ્પ્યુટરનું મુખ્ય ઇનપુટ સાધન છે, જેના બટનો (કીઝ) દબાવીને અક્ષરો, આંકડાઓ, ચિહ્નો અને કમાન્ડ ટાઈપ કરવામાં આવે છે.'
    },
    whatItDoes: {
      en: 'It sends specific character codes and keyboard shortcuts (like Ctrl+C for copy) to the operating system instantly.',
      gu: 'તે તમે જે બટન દબાવો તેનો કોડ કમ્પ્યુટરને મોકલે છે અને શોર્ટકટ્સ (જેમ કે Ctrl+C) દ્વારા કામ ઝડપી બનાવે છે.'
    },
    whyItMatters: {
      en: 'It is the most efficient and accurate tool for writing documents, chatting, coding, and commanding computers.',
      gu: 'કોઈપણ લખાણ લખવા, મેસેજ કરવા, પાસવર્ડ નાખવા કે પ્રોગ્રામિંગ કરવા માટે કીબોર્ડ અનિવાર્ય છે.'
    },
    howItWorks: {
      en: 'Pressing a key bridges an electrical switch on a matrix grid, sending an interrupt signal to the processor identifying the exact key pressed.',
      gu: 'જ્યારે કોઈ કી દબાવવામાં આવે છે, ત્યારે નીચેની સર્કિટ જોડાઈને સિગ્નલ મોકલે છે કે કયું અક્ષર ટાઈપ થયું.'
    },
    types: [
      {
        name: { en: 'Mechanical Keyboard', gu: 'મિકેનિકલ કીબોર્ડ' },
        description: { en: 'Uses individual mechanical switches under every key; highly durable with satisfying tactile clicks.', gu: 'દરેક બટન નીચે અલગ સ્પ્રિંગ અને સ્વિચ હોય છે; લાંબો સમય ચાલે અને ટાઇપિંગમાં મજા આવે.' }
      },
      {
        name: { en: 'Membrane Keyboard', gu: 'મેમ્બ્રેન કીબોર્ડ' },
        description: { en: 'Uses a flexible rubber dome sheet; quiet, lightweight, and very economical for offices.', gu: 'રબરના પડ વાળું સામાન્ય કીબોર્ડ; અવાજ ઓછો કરે છે અને સસ્તું હોય છે.' }
      },
      {
        name: { en: 'Wireless / Ergonomic Keyboard', gu: 'વાયરલેસ / અર્ગોનોમિક કીબોર્ડ' },
        description: { en: 'Bluetooth connectivity or split curved layouts designed to protect wrists from RSI.', gu: 'વાયર વગરનું અથવા હાથના કાંડાને આરામ આપતી ખાસ ડિઝાઈન વાળું કીબોર્ડ.' }
      }
    ],
    commonUses: {
      en: ['Typing essays, emails, and spreadsheet figures', 'Writing computer programs and terminal shell commands', 'Gaming movement controls using W, A, S, D keys'],
      gu: ['ઈમેલ, લેટર અને એકાઉન્ટિંગ લખાણ ટાઈપ કરવા', 'કોડિંગ અને કમાન્ડ આપવા', 'W, A, S, D કીઝ વડે વિડીયો ગેમ્સ રમવા']
    },
    realLifeAnalogy: {
      en: 'A computer keyboard is the modern digital descendant of the mechanical typewriter, giving you thousands of tools at your fingertips.',
      gu: 'કીબોર્ડ એ જૂના જમાનાના ટાઇપરાઇટરનું આધુનિક ડિજિટલ રૂપ છે, જેનાથી કમ્પ્યુટર સાથે વાતચીત કરી શકાય છે.'
    },
    rememberThis: {
      en: 'Most English keyboards use the "QWERTY" layout, named after the first six letters on the top letter row!',
      gu: 'મોટાભાગના કીબોર્ડ "QWERTY" લેઆઉટ વાપરે છે, જે તેની પહેલી લાઇનના પહેલા 6 અક્ષરો (Q-W-E-R-T-Y) પરથી ઓળખાય છે!'
    },
    didYouKnow: {
      en: 'The QWERTY keyboard was intentionally designed in 1873 to separate commonly paired letters so mechanical typewriter arms wouldn\'t jam!',
      gu: 'QWERTY લેઆઉટ 1873 માં એટલા માટે બન્યો હતો કે ટાઈપ કરતી વખતે ટાઈપરાઈટરના લોખંડના સળિયા એકબીજા સાથે અથડાઈ ન જાય!'
    },
    advantages: {
      en: ['Fastest way for humans to input precise text and code', 'Countless shortcuts increase computer productivity 10-fold', 'Extremely long lifespan (up to 50+ million keypresses)'],
      gu: ['ટેક્સ્ટ અને ડેટા એન્ટ્રી માટે સૌથી ઝડપી સાધન', 'શોર્ટકટ કીઝથી સમય બચે છે', 'લાખો વખત બટન દબાવવા છતાં ખરાબ થતું નથી']
    },
    limitations: {
      en: ['Spilling liquids (tea, water) can permanently damage key circuitry', 'Requires practice to touch-type without looking at keys', 'Mechanical switches can be noisy in quiet library environments'],
      gu: ['પાણી કે ચા ઢોળાવાથી બગડી શકે છે', 'જોયા વગર ઝડપથી ટાઈપ કરવા પ્રેક્ટિસ જોઈએ', 'મિકેનિકલ કીબોર્ડમાં ખટ-ખટ અવાજ વધુ આવે છે']
    }
  },

  {
    id: 'cabinet',
    name: { en: 'Cabinet (Computer Case)', gu: 'કેબિનેટ (કમ્પ્યુટર કેસ / ટાવર)' },
    fullForm: { en: 'Computer Chassis / Tower Enclosure', gu: 'કમ્પ્યુટર કેબિનેટ / ટાવર કેસ' },
    category: ['case'],
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80',
    fallbackSvgType: 'cabinet',
    shortDefinition: {
      en: 'The cabinet is the outer metal and plastic enclosure that houses, secures, and protects all internal computer hardware.',
      gu: 'કેબિનેટ એ કમ્પ્યુટરનું બહારનું મજબૂત બોક્સ છે, જે મધરબોર્ડ, હાર્ડ ડિસ્ક અને SMPS જેવા તમામ આંતરિક ભાગોને સાચવે છે.'
    },
    whatItDoes: {
      en: 'It shields delicate electronics from dust and physical impact while guiding cooling airflow through intake and exhaust fan vents.',
      gu: 'તે ધૂળ, કચરા અને વાગવાથી નાજુક પાર્ટ્સનું રક્ષણ કરે છે અને પંખાઓ દ્વારા ઠંડી હવા અંદર લાવી ગરમ હવા બહાર ફેંકે છે.'
    },
    whyItMatters: {
      en: 'Good airflow in a cabinet keeps temperatures low, preventing the CPU and GPU from overheating and thermal throttling.',
      gu: 'સારું કેબિનેટ કમ્પ્યુટરને ગરમ થવા દેતું નથી, જેથી કમ્પ્યુટર ક્યારેય હેંગ થતું નથી કે બંધ પડતું નથી.'
    },
    howItWorks: {
      en: 'Component standoffs secure the motherboard safely, drive bays mount SSDs/HDDs, and mesh panels allow front-to-back wind-tunnel cooling.',
      gu: 'તેમાં મધરબોર્ડ માટે સ્ક્રૂ પોઇન્ટ્સ, હાર્ડ ડિસ્ક માટે ખાના અને આગળથી ઠંડી હવા ખેંચી પાછળથી ગરમ હવા બહાર કાઢતી જાળી હોય છે.'
    },
    types: [
      {
        name: { en: 'Mid Tower Case (ATX)', gu: 'મિડ ટાવર કેસ (Mid Tower)' },
        description: { en: 'Most common size; fits standard ATX motherboards, full GPUs, and multiple storage drives.', gu: 'સૌથી લોકપ્રિય સાઇઝ જે સામાન્ય ઘરો અને ઓફિસોમાં વપરાય છે.' }
      },
      {
        name: { en: 'Full Tower Case', gu: 'ફુલ ટાવર કેસ (Full Tower)' },
        description: { en: 'Extra-large case for heavy workstations, dual GPUs, and custom liquid cooling loops.', gu: 'ખૂબ મોટો કેસ જે હાઈ-એન્ડ સર્વર અને સ્પેશિયલ કમ્પ્યુટર માટે વપરાય છે.' }
      },
      {
        name: { en: 'Mini-ITX / Small Form Factor (SFF)', gu: 'નાનો SFF / ક્યુબ કેસ' },
        description: { en: 'Compact portable shoe-box size ideal for tight desks and media centers.', gu: 'નાના ટેબલ કે ટીવી નીચે રાખવા માટેનો કોમ્પેક્ટ નાનો કેસ.' }
      }
    ],
    commonUses: {
      en: ['Mounting the motherboard, power supply, and cooling fans', 'Routing and hiding internal wires for clean cable management', 'Front panel access for power button, headphone jack, and USB ports'],
      gu: ['બધા પાર્ટ્સને સુરક્ષિત સ્ક્રૂથી ફીટ કરવા', 'વાયરો સંતાડીને વ્યવસ્થિત રાખવા', 'આગળ પાવર બટન અને USB પોર્ટ્સ આપવા']
    },
    realLifeAnalogy: {
      en: 'The cabinet is like the house you live in: it protects you from the harsh outside weather, provides rooms for everything, and has windows for fresh air!',
      gu: 'કેબિનેટ એ ઘર જેવું છે: તે બહારના તડકા-ધૂળથી અંદરના લોકોને બચાવે છે અને બારીઓ દ્વારા તાજી હવા આપે છે!'
    },
    rememberThis: {
      en: 'Never put your cabinet in a closed cupboard with no airflow! Electronics need continuous cool fresh air to avoid overheating and shutting down.',
      gu: 'કમ્પ્યુટર કેબિનેટને ક્યારેય હવા-ઉજાસ વિનાના બંધ ખાનામાં ન રાખવું, નહિતર અંદર ગરમી વધી જતાં કમ્પ્યુટર બંધ થઈ જશે!'
    },
    didYouKnow: {
      en: 'Modern PC gaming cabinets feature tempered glass side panels and mesh front grills engineered after wind-tunnel aerodynamics for quiet cooling!',
      gu: 'આજના ગેમિંગ કેબિનેટમાં મજબૂત કાચની બારી (Tempered Glass) અને પંખામાં સુંદર RGB લાઈટ્સ હોય છે જેથી અંદરના પાર્ટ્સ જોઈ શકાય!'
    },
    advantages: {
      en: ['Protects internal components from accidental physical damage and dust', 'Reduces fan operating noise with acoustic dampening', 'Provides organized front USB and audio convenience'],
      gu: ['ધૂળ અને અકસ્માતે વાગવાથી પાર્ટ્સનું રક્ષણ', 'પંખાનો અવાજ ઓછો કરે છે', 'આગળ સરળતાથી પેનડ્રાઇવ લગાવવા પોર્ટ્સ આપે છે']
    },
    limitations: {
      en: ['Full-size desktop cases are heavy and difficult to travel with', 'Dust filters must be cleaned periodically to maintain airflow', 'Cheap sharp metal edges can scratch fingers during assembly'],
      gu: ['વજનદાર હોવાથી ફેરવવું અઘરું છે', 'સમય-સમયે જાળીમાંથી ધૂળ સાફ કરવી પડે છે', 'સસ્તા કેબિનેટની ધારથી હાથમાં વાગી શકે છે']
    }
  }
];

export interface HardwareQuizQuestion {
  id: string;
  question: { en: string; gu: string };
  options: { en: string; gu: string }[];
  correctIndex: number;
  explanation: { en: string; gu: string };
}

export const HARDWARE_QUIZ_QUESTIONS: HardwareQuizQuestion[] = [
  {
    id: 'hq-1',
    question: {
      en: 'What is the key difference between RAM and an SSD/HDD?',
      gu: 'RAM અને SSD/HDD વચ્ચેનો મુખ્ય તફાવત શું છે?'
    },
    options: [
      { en: 'RAM saves files forever; SSD loses files when power goes off', gu: 'RAM કાયમ ડેટા સાચવે છે; SSD પાવર જતાં ડેટા ભૂંસી નાખે છે' },
      { en: 'RAM is temporary working memory; SSD/HDD saves files permanently', gu: 'RAM કામચલાઉ મેમરી છે; SSD/HDD ડેટા કાયમ માટે સાચવે છે' },
      { en: 'RAM is only used for music; SSD is only used for photos', gu: 'RAM માત્ર સંગીત માટે અને SSD માત્ર ફોટો માટે વપરાય છે' },
      { en: 'There is no difference; they are the exact same device', gu: 'કોઈ તફાવત નથી, બંને એક જ છે' }
    ],
    correctIndex: 1,
    explanation: {
      en: 'Correct! RAM is volatile memory holding open programs while your PC is on. SSDs and HDDs store files non-volatilely forever.',
      gu: 'સાચો જવાબ! RAM કમ્પ્યુટર ચાલુ હોય ત્યારે ઝડપી કામ માટે વપરાય છે, જ્યારે SSD અને HDD ફાઇલોને કાયમી સાચવે છે.'
    }
  },
  {
    id: 'hq-2',
    question: {
      en: 'Are "CPU" and "Processor" two different hardware devices?',
      gu: 'શું "CPU" અને "પ્રોસેસર" બે અલગ-અલગ હાર્ડવેર સાધનો છે?'
    },
    options: [
      { en: 'Yes, CPU is the monitor and Processor is the keyboard', gu: 'હા, CPU એટલે મોનિટર અને પ્રોસેસર એટલે કીબોર્ડ' },
      { en: 'No, CPU stands for Central Processing Unit and IS the computer processor', gu: 'ના, CPU એટલે સેન્ટ્રલ પ્રોસેસિંગ યુનિટ અને તે જ કમ્પ્યુટરનું પ્રોસેસર છે' },
      { en: 'Yes, Processor sits inside the mouse and CPU sits inside the case', gu: 'હા, પ્રોસેસર માઉસમાં હોય છે અને CPU બોક્સમાં હોય છે' },
      { en: 'Yes, they are made by two competing companies', gu: 'હા, તે બે અલગ-અલગ કંપનીઓ બનાવે છે' }
    ],
    correctIndex: 1,
    explanation: {
      en: 'Correct! CPU and Processor refer to the exact same central chip that calculates instructions.',
      gu: 'સાચો જવાબ! CPU અને Processor બંને એક જ સાધન (કમ્પ્યુટરનું મુખ્ય મગજ) ના બે નામ છે.'
    }
  },
  {
    id: 'hq-3',
    question: {
      en: 'Why is an SSD so much faster than a traditional HDD?',
      gu: 'SSD પરંપરાગત HDD કરતાં કેમ આટલી બધી ઝડપી હોય છે?'
    },
    options: [
      { en: 'Because an SSD uses microchips with zero moving parts instead of spinning platters', gu: 'કારણ કે SSD માં કોઈ ફરતા ભાગો વગર સીધી ફ્લેશ મેમરી ચિપ્સ વપરાય છે' },
      { en: 'Because an SSD is powered by batteries instead of electricity', gu: 'કારણ કે SSD બેટરીથી ચાલે છે' },
      { en: 'Because an SSD only works when connected to the internet', gu: 'કારણ કે તે ઇન્ટરનેટ વગર ચાલતી નથી' },
      { en: 'Because an HDD is made of plastic while SSD is made of wood', gu: 'કારણ કે HDD પ્લાસ્ટિકની હોય છે' }
    ],
    correctIndex: 0,
    explanation: {
      en: 'Correct! Because SSDs have no mechanical spinning disks or moving heads, they read and write data with electronic speed.',
      gu: 'સાચો જવાબ! SSD માં કોઈ ફરતી ડિસ્ક ન હોવાથી ઇલેક્ટ્રોનિક સ્પીડમાં ડેટા સીધો વાંચી શકાય છે.'
    }
  },
  {
    id: 'hq-4',
    question: {
      en: 'What does the SMPS (Power Supply Unit) do?',
      gu: 'SMPS (પાવર સપ્લાય યુનિટ) કમ્પ્યુટરમાં શું કામ કરે છે?'
    },
    options: [
      { en: 'It cools down the monitor screen with cold air', gu: 'તે મોનિટરને ઠંડી હવા આપે છે' },
      { en: 'It converts dangerous high-voltage AC wall power into safe DC electricity for PC parts', gu: 'તે ઘરની હાઈ-વોલ્ટેજ AC વીજળીને કમ્પ્યુટર માટે યોગ્ય DC કરંટમાં ફેરવે છે' },
      { en: 'It types letters automatically when you speak', gu: 'તે બોલવાથી આપોઆપ ટાઇપ કરે છે' },
      { en: 'It connects the computer to Wi-Fi networks', gu: 'તે કમ્પ્યુટરને વાઇ-ફાઇ સાથે જોડે છે' }
    ],
    correctIndex: 1,
    explanation: {
      en: 'Correct! SMPS safely steps down 230V AC to +12V, +5V, and +3.3V DC power.',
      gu: 'સાચો જવાબ! SMPS ઘરની 230V AC વીજળીને કમ્પ્યુટરના ભાગો માટે 12V અને 5V DC માં રૂપાંતરિત કરે છે.'
    }
  },
  {
    id: 'hq-5',
    question: {
      en: 'Which of the following devices is an OUTPUT device?',
      gu: 'નીચેનામાંથી કયું સાધન "આઉટપુટ ડિવાઇસ" (Output Device) છે?'
    },
    options: [
      { en: 'Keyboard', gu: 'કીબોર્ડ (Keyboard)' },
      { en: 'Mouse', gu: 'માઉસ (Mouse)' },
      { en: 'Monitor', gu: 'મોનિટર (Monitor)' },
      { en: 'Microphone', gu: 'માઇક્રોફોન (Microphone)' }
    ],
    correctIndex: 2,
    explanation: {
      en: 'Correct! The monitor outputs visual information from the computer. Keyboard and mouse are input devices.',
      gu: 'સાચો જવાબ! મોનિટર કમ્પ્યુટરમાંથી પરિણામ બહાર સ્ક્રીન પર બતાવે છે, જ્યારે કીબોર્ડ અને માઉસ ઇનપુટ સાધનો છે.'
    }
  }
];

export interface SystemCooperationStep {
  step: number;
  title: { en: string; gu: string };
  description: { en: string; gu: string };
  activeDevice: string;
}

export const SYSTEM_COOPERATION_STEPS: SystemCooperationStep[] = [
  {
    step: 1,
    title: { en: '1. User Input (Mouse / Keyboard)', gu: '1. વપરાશકર્તાનો આદેશ (માઉસ / કીબોર્ડ)' },
    description: {
      en: 'You double-click an icon using your Mouse or type a command on your Keyboard.',
      gu: 'તમે માઉસ વડે કોઈ આઇકન પર ડબલ-ક્લિક કરો છો અથવા કીબોર્ડ પરથી કમાન્ડ આપો છો.'
    },
    activeDevice: 'mouse'
  },
  {
    step: 2,
    title: { en: '2. Motherboard Transmission & SMPS Power', gu: '2. મધરબોર્ડ દ્વારા વહન અને SMPS પાવર' },
    description: {
      en: 'SMPS supplies steady DC power while the Motherboard carries your click signal to the CPU.',
      gu: 'SMPS સ્થિર વીજળી આપે છે અને મધરબોર્ડ વાયરિંગ દ્વારા આ સિગ્નલ પ્રોસેસર સુધી પહોંચાડે છે.'
    },
    activeDevice: 'motherboard'
  },
  {
    step: 3,
    title: { en: '3. Storage Retrieval (SSD / HDD)', gu: '3. સ્ટોરેજમાંથી ફાઇલ લોડિંગ (SSD / HDD)' },
    description: {
      en: 'The operating system reads the program files permanently stored on your SSD or HDD.',
      gu: 'કમ્પ્યુટર તમારી SSD અથવા HDD માં સાચવેલી સોફ્ટવેર ફાઇલોને વાંચવાનું શરૂ કરે છે.'
    },
    activeDevice: 'ssd'
  },
  {
    step: 4,
    title: { en: '4. Fast Working Memory (RAM)', gu: '4. ઝડપી મેમરીમાં ટ્રાન્સફર (RAM)' },
    description: {
      en: 'The files are copied into ultra-fast RAM so the processor can access them without waiting.',
      gu: 'ડેટા તાત્કાલિક ઉપયોગ માટે ઝડપી RAM માં લોડ થાય છે જેથી પ્રોસેસરને રાહ ન જોવી પડે.'
    },
    activeDevice: 'ram'
  },
  {
    step: 5,
    title: { en: '5. CPU Execution & Calculation', gu: '5. પ્રોસેસર ગણતરી (CPU / Processor)' },
    description: {
      en: 'The CPU executes instructions, runs algorithms, and computes graphics data.',
      gu: 'CPU સૂચનાઓ વાંચીને ગણતરી કરે છે અને પ્રોગ્રામને રન કરે છે.'
    },
    activeDevice: 'cpu'
  },
  {
    step: 6,
    title: { en: '6. Visual Output (Monitor)', gu: '6. સ્ક્રીન પર પરિણામ (Monitor)' },
    description: {
      en: 'The Monitor displays the open application, movie, or game window in crystal-clear color!',
      gu: 'મોનિટર સ્ક્રીન પર સોફ્ટવેર વિન્ડો, વિડીયો કે ગેમ એકદમ સ્પષ્ટ કલરમાં દેખાય છે!'
    },
    activeDevice: 'monitor'
  }
];
