import { TroubleshootingIssue } from '../types';

export const TROUBLESHOOTING_ISSUES: TroubleshootingIssue[] = [
  {
    id: 'no-display-fans-spin',
    title: {
      en: 'PC Turns ON (Fans Spin, Lights ON) but No Display on Monitor',
      gu: 'કમ્પ્યુટર ચાલુ થાય છે (ફેન અને લાઈટ્સ ચાલુ) પણ મોનિટરમાં ડિસ્પ્લે આવતી નથી'
    },
    symptom: {
      en: 'Power LED is lit, CPU and case fans are spinning, but the monitor displays "No Signal" or goes into standby sleep mode.',
      gu: 'પાવર સ્વિચ દબાવતા કેબિનેટના પંખા અને લાઈટ ચાલુ થાય છે, પરંતુ મોનિટરની સ્ક્રીન બિલકુલ બ્લેક રહે છે અથવા "No Signal" બતાવે છે.'
    },
    category: 'display',
    component: 'RAM / GPU / Display Cable',
    severity: 'critical',
    likelyCauses: {
      en: [
        'HDMI or DisplayPort cable plugged into motherboard instead of dedicated GPU',
        'Dust, moisture, or carbon oxidation on RAM gold contact pins',
        'RAM stick slightly loose or not properly locked into DIMM slot',
        'Monitor input source (HDMI 1 / HDMI 2 / DP) selected incorrectly'
      ],
      gu: [
        'HDMI કે DisplayPort કેબલ ગ્રાફિક્સ કાર્ડને બદલે મધરબોર્ડના પોર્ટમાં ભૂલથી લગાવેલ હોય',
        'RAM ની ગોલ્ડ પિન (સોનેરી પટ્ટી) પર ધૂળ, ભેજ કે કાર્બન જામી જવું',
        'રેમ સ્લોટમાં બરાબર બેઠી ન હોય અથવા ઢીલી પડી ગઈ હોય',
        'મોનિટરનું ઈનપુટ સોર્સ (HDMI/DP) યોગ્ય રીતે સિલેક્ટ કરેલું ન હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Verify Video Cable Connection', gu: 'વીડિયો કેબલ પોર્ટ તપાસો' },
        instruction: {
          en: 'Check behind your cabinet. If your PC has a dedicated Graphics Card (GPU), the HDMI/DisplayPort cable MUST be plugged directly into the GPU ports (lower horizontal bracket), NEVER into the motherboard (upper vertical ports).',
          gu: 'કેબિનેટની પાછળ જુઓ. જો તમારા કમ્પ્યુટરમાં ગ્રાફિક્સ કાર્ડ (GPU) લગાવેલું હોય, તો HDMI/DP કેબલ GPU ના નીચેના પોર્ટમાં જ લગાવેલો હોવો જોઈએ, મધરબોર્ડના ઉપરના પોર્ટમાં નહીં!'
        },
        tip: { en: 'Many users mistakenly plug into the motherboard where integrated graphics are disabled.', gu: 'મોટાભાગના લોકો ભૂલથી મધરબોર્ડમાં કેબલ લગાવી દે છે જેથી ડિસ્પ્લે આવતી નથી.' }
      },
      {
        step: 2,
        title: { en: 'Clean and Re-Seat the RAM Module', gu: 'RAM સાફ કરીને ફરીથી બેસાડો' },
        instruction: {
          en: 'Power off PC, unplug wall cord, press power button for 10s to discharge static. Open cabinet, release latches on both sides of RAM slots, remove the RAM stick. Gently clean the gold pins on both sides with a clean pencil eraser and soft lint-free cloth.',
          gu: 'પાવર બંધ કરી વાયર કાઢી નાખો. કેબિનેટ ખોલી રેમ (RAM) ની બંને બાજુના લોક દબાવીને રેમ બહાર કાઢો. સ્વચ્છ પેન્સિલ રબર (Eraser) વડે રેમની સોનેરી પિન ધીમેથી સાફ કરો અને નરમ કપડાથી લૂછી લો.'
        },
        tip: { en: 'Use an eraser gently without bending pins; this removes invisible carbon buildup.', gu: 'રબર વડે ધીમેથી ઘસીને કાર્બન દૂર કરો, પિન વળવી ન જોઈએ.' }
      },
      {
        step: 3,
        title: { en: 'Re-insert RAM Firmly Until Double Click', gu: 'રેમને બંને તરફથી ક્લિક અવાજ આવે ત્યાં સુધી દબાવો' },
        instruction: {
          en: 'Align the notch of the RAM with the slot guide. Press down firmly with equal thumb pressure on both ends until both plastic side latches snap shut automatically with a distinct "CLICK" sound.',
          gu: 'રેમની ખાંચ (notch) સ્લોટ સાથે બરાબર મેળવીને બંને અંગૂઠા વડે સમાન દબાણ આપો, જ્યાં સુધી બંને બાજુના લોક "ક્લિક" અવાજ સાથે આપોઆપ બંધ ન થઈ જાય.'
        }
      },
      {
        step: 4,
        title: { en: 'Clear CMOS BIOS Settings', gu: 'CMOS બેટરી કાઢીને BIOS રીસેટ કરો' },
        instruction: {
          en: 'If display still does not appear, remove the silver CR2032 coin cell battery on the motherboard for 5 minutes, then re-insert it. This resets corrupt BIOS memory timing profiles.',
          gu: 'જો હજુ પણ ડિસ્પ્લે ન આવે, તો મધરબોર્ડ પર રહેલી સિક્કા જેવી ગોળ CR2032 CMOS બેટરી ૫ મિનિટ માટે બહાર કાઢી લો અને ફરી બેસાડી દો.'
        }
      }
    ],
    preventionTip: {
      en: 'Clean your cabinet dust filters every 2 months. Always ensure RAM is seated in slots 2 and 4 for dual-channel memory stability.',
      gu: 'દર બે મહિને કમ્પ્યુટરનું ડસ્ટ ફિલ્ટર સાફ કરો. ડ્યુઅલ ચેનલ માટે રેમ હંમેશા બીજા અને ચોથા સ્લોટમાં લગાવો.'
    }
  },
  {
    id: 'pc-completely-dead-no-power',
    title: {
      en: 'PC Completely Dead — No Lights, No Fan Spin When Power Button Pressed',
      gu: 'કમ્પ્યુટર બિલકુલ ચાલુ થતું નથી — સ્વિચ દબાવવા છતાં કોઈ લાઈટ કે પંખો ફરતો નથી'
    },
    symptom: {
      en: 'Pressing the cabinet power button produces zero response: no LED lights, no fan spin in SMPS, and motherboard appears completely dead.',
      gu: 'પાવર બટન દબાવવા છતાં કમ્પ્યુટરમાં બિલકુલ કરંટ આવતો નથી; SMPS કે કેબિનેટનો કોઈ પંખો ફરતો નથી અને કોઈ લાઈટ થતી નથી.'
    },
    category: 'power',
    component: 'SMPS (Power Supply) / Power Cord / Front Panel Switch',
    severity: 'critical',
    likelyCauses: {
      en: [
        'Defective or loose power cord from wall outlet',
        'SMPS rear rocker switch is flipped to OFF (O position)',
        'Cabinet front panel power switch wire (POWER SW) detached from motherboard header',
        'Blown internal fuse or blown capacitor inside SMPS'
      ],
      gu: [
        'વીજળી બોર્ડમાંથી આવતો પાવર કેબલ ખરાબ અથવા ઢીલો હોવો',
        'SMPS ની પાછળની સ્વિચ બંધ (O પોઝિશન) પર હોવી',
        'કેબિનેટના પાવર બટનનો વાયર (POWER SW) મધરબોર્ડના હેડર પિનમાંથી નીકળી ગયેલ હોવો',
        'SMPS ની અંદરનો ફ્યુઝ અથવા કેપેસિટર બળી ગયેલ હોવો'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Inspect Wall Plug & SMPS Rear Switch', gu: 'પ્લગ અને SMPS ની સ્વિચ તપાસો' },
        instruction: {
          en: 'Ensure the wall socket switch is ON and power cord is pushed fully into the SMPS. Check the black rocker switch on the back of the SMPS; it must be switched to "I" (ON), not "O" (OFF).',
          gu: 'દીવાલના પ્લગમાં પાવર આવે છે કે નહીં તે ચકાસો. SMPS પાછળ રહેલી નાની કાળી સ્વિચ "I" (ચાલુ) પર હોવી જોઈએ, "O" (બંધ) પર નહીં.'
        }
      },
      {
        step: 2,
        title: { en: 'SMPS Paperclip Self-Test (Bypass Motherboard)', gu: 'પેપરક્લિપ ટેસ્ટ દ્વારા SMPS ચકાસો' },
        instruction: {
          en: 'Unplug the 24-pin main motherboard connector. Take a metal paperclip bent into a U-shape. Insert one end into the GREEN wire pin (PS_ON) and the other end into any adjacent BLACK wire pin (Ground). Plug in power; if the SMPS fan spins, the SMPS is functional.',
          gu: 'મધરબોર્ડમાંથી ૨૪-પિનનો મોટો કનેક્ટર બહાર કાઢો. પેપરક્લિપ વડે એક છેડો લીલા (Green) વાયરમાં અને બીજો છેડો બાજુના કાળા (Black) વાયરમાં લગાવી પાવર ચાલુ કરો. જો SMPS નો પંખો ફરે તો SMPS સાજું છે.'
        },
        tip: { en: 'This proves whether the power supply can turn on independently.', gu: 'આ ટેસ્ટથી ખબર પડી જાય છે કે પાવર સપ્લાય ખરાબ છે કે મધરબોર્ડ.' }
      },
      {
        step: 3,
        title: { en: 'Short Power Switch Pins Manually', gu: 'મધરબોર્ડની પાવર પિન મેન્યુઅલી શોર્ટ કરી જુઓ' },
        instruction: {
          en: 'Locate the front panel header (JFP1) on the bottom-right corner of the motherboard. Gently touch the two "POWER SW" pins together with a flathead screwdriver for 1 second. If the PC starts, your cabinet front button is faulty or disconnected.',
          gu: 'મધરબોર્ડના નીચેના ખૂણે "POWER SW" લખેલી બે પિનને સ્ક્રુડ્રાઈવરથી ૧ સેકન્ડ માટે અડાડી જુઓ. જો પીસી ચાલુ થઈ જાય તો કેબિનેટનું આગળનું સ્વિચ બટન ખરાબ છે.'
        }
      }
    ],
    preventionTip: {
      en: 'Always use a reputable 80-Plus certified SMPS (Tier-C or better) and connect through an offline UPS or surge protector.',
      gu: 'હંમેશા 80-Plus બ્રાન્ડેડ SMPS વાપરો અને લાઈટના ઝટકાથી બચવા માટે UPS અથવા સર્જ પ્રોટેક્ટર લગાવો.'
    }
  },
  {
    id: 'pc-shuts-off-instantly-short-circuit',
    title: {
      en: 'PC Turns ON for 2-3 Seconds, Fans Twitch, Then Instantly Shuts Down',
      gu: 'કમ્પ્યુટર ૨-૩ સેકન્ડ માટે ચાલુ થાય છે અને તરત જ આપોઆપ બંધ થઈ જાય છે'
    },
    symptom: {
      en: 'When the power button is pressed, the LEDs light up and fans spin briefly for 1 to 3 seconds, then the PC abruptly powers off with a click.',
      gu: 'સ્વિચ દબાવતા પંખો સહેજ ફરીને તરત જ બંધ થઈ જાય છે અને સિસ્ટમ પાવર ઓફ થઈ જાય છે.'
    },
    category: 'power',
    component: 'Motherboard Short Circuit / SMPS Over-Current Protection',
    severity: 'high',
    likelyCauses: {
      en: [
        'Short circuit detected by SMPS Over-Current Protection (OCP)',
        'Bent pins inside a USB port making contact with the metal ground housing',
        'Extra brass standoff screw under motherboard touching PCB solder traces',
        'CPU 8-pin 12V EPS cable not connected or plugged in backwards'
      ],
      gu: [
        'SMPS નું સેફ્ટી પ્રોટેક્શન શોર્ટ સર્કિટના કારણે પાવર કટ કરી દે છે',
        'કમ્પ્યુટરના કોઈ USB પોર્ટની અંદરની પિન વાંકી થઈને બોડી સાથે ટચ થઈ ગઈ હોય',
        'મધરબોર્ડ પાછળ કોઈ સ્ક્રૂ કે મેટલ પ્લેટ શોર્ટ સર્કિટ કરતી હોય',
        'પ્રોસેસરનો ૮-પિન (CPU 12V) પાવર કેબલ ઢીલો અથવા ખોટો લાગેલો હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Inspect All USB Ports for Bent Metal Pins', gu: 'બધા જ USB પોર્ટની અંદર ટોર્ચથી તપાસો' },
        instruction: {
          en: 'Use a flashlight to inspect all front and rear USB ports. Ensure the 4 internal gold pins are straight and NOT bent or touching the outer metal enclosure, which creates an instant 5V short to ground.',
          gu: 'ટોર્ચ વડે આગળ અને પાછળના તમામ USB પોર્ટ તપાસો. અંદરની સોનેરી પિન વાંકી વળીને લોખંડની બોડી સાથે અડી ગયેલી ન હોવી જોઈએ.'
        }
      },
      {
        step: 2,
        title: { en: 'Check CPU 8-Pin Auxiliary Power Cable', gu: 'CPU નો ૮-પિન પાવર વાયર તપાસો' },
        instruction: {
          en: 'Verify that the 8-pin (or 4-pin) cable labeled "CPU" is firmly clicked into the socket near the top-left of the CPU socket. Do NOT confuse it with the PCIe 8-pin GPU cable.',
          gu: 'પ્રોસેસરની નજીક ઉપર ડાબી બાજુ લગાવેલો "CPU" ૮-પિન કેબલ બરાબર બેસેલો છે કે નહીં તે જુઓ. ગ્રાફિક્સ કાર્ડનો PCIe કેબલ તેમાં ન લાગવો જોઈએ.'
        }
      },
      {
        step: 3,
        title: { en: 'Bench-Test (Breadboard) Outside Cabinet', gu: 'મધરબોર્ડ કેબિનેટમાંથી બહાર કાઢીને ટેસ્ટ કરો' },
        instruction: {
          en: 'Remove motherboard from cabinet and place it on a non-conductive cardboard box. Connect only CPU, cooler, 1 RAM stick, and SMPS. Power on. If it stays on, a metal standoff in the cabinet was shorting the motherboard.',
          gu: 'મધરબોર્ડને કેબિનેટમાંથી બહાર કાઢી પુઠાના બોક્સ (Cardboard) પર મૂકીને માત્ર CPU, ૧ રેમ અને SMPS લગાવીને ચાલુ કરો.'
        }
      }
    ],
    preventionTip: {
      en: 'Only install brass standoffs in the cabinet where there are matching screw holes on the motherboard.',
      gu: 'કેબિનેટમાં જ્યાં મધરબોર્ડના કાણાં હોય ત્યાં જ સ્ક્રૂના સ્ટેન્ડ-ઓફ લગાવો, વધારાના સ્ક્રૂ કાઢી નાખો.'
    }
  },
  {
    id: 'ram-beep-codes-continuous',
    title: {
      en: 'Continuous Long Beep Sound on Startup (Beep... Beep... Beep...)',
      gu: 'કમ્પ્યુટર ચાલુ કરતાં જ સતત લાંબી બીપ (Beep... Beep...) અવાજ સંભળાય છે'
    },
    symptom: {
      en: 'Motherboard internal speaker emits repeating long beeps continuously and the computer refuses to complete POST boot test.',
      gu: 'કમ્પ્યુટર ચાલુ કરતાં જ મધરબોર્ડમાંથી સતત બીપ... બીપ... અવાજ આવે છે અને કમ્પ્યુટર આગળ બૂટ થતું નથી.'
    },
    category: 'ram',
    component: 'RAM (Random Access Memory)',
    severity: 'critical',
    beepCode: 'Repeating Long Beeps',
    likelyCauses: {
      en: [
        'Memory module not detected by memory controller',
        'RAM timing or frequency incompatible with CPU/motherboard',
        'Oxidation or debris inside memory DIMM slot',
        'Faulty memory chip on the RAM stick'
      ],
      gu: [
        'મધરબોર્ડ રેમ (RAM) ને ડિટેક્ટ કરી શકતું નથી',
        'રેમની સ્પીડ (MHz) અથવા ટાઈમિંગ સપોર્ટ કરતું ન હોય',
        'રેમના સ્લોટની અંદર ધૂળ કે કચરો ભરાઈ ગયો હોય',
        'રેમની અંદરની મેમરી ચીપ બળી ગઈ હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Single Stick Isolation Test', gu: 'એક-એક રેમ લગાવીને ટેસ્ટ કરો' },
        instruction: {
          en: 'If you have multiple RAM sticks, remove all of them. Insert only ONE stick into DIMM Slot 2 (the second slot away from the CPU). Power on. If it boots, test the second stick separately to isolate the defective module.',
          gu: 'જો બે રેમ હોય, તો બંને કાઢી લો. ફક્ત એક જ રેમ સ્લોટ ૨ માં લગાવીને ચાલુ કરો. જો ચાલુ થઈ જાય તો બીજી રેમ ખરાબ હોઈ શકે છે.'
        }
      },
      {
        step: 2,
        title: { en: 'Clean DIMM Slot with Compressed Air', gu: 'સ્લોટને બ્રશ કે એર બ્લોઅરથી સાફ કરો' },
        instruction: {
          en: 'Blow compressed air or use a soft antistatic brush inside the motherboard RAM slot to dislodge any trapped lint or dust particles.',
          gu: 'મધરબોર્ડના રેમ સ્લોટની અંદર રહેલી ધૂળને બ્લોઅર અથવા સોફ્ટ બ્રશ વડે સાફ કરો.'
        }
      },
      {
        step: 3,
        title: { en: 'Run Windows Memory Diagnostic Once Booted', gu: 'વિન્ડોઝ મેમરી ડાયગ્નોસ્ટિક ટેસ્ટ રન કરો' },
        instruction: {
          en: 'Once booted into Windows, press Win + R, type "mdsched.exe" and choose "Restart now and check for problems" to test for internal memory hardware errors.',
          gu: 'કમ્પ્યુટર ચાલુ થયા બાદ Win + R દબાવી "mdsched.exe" ટાઈપ કરી એન્ટર આપો જેથી મેમરીમાં કોઈ ખામી છે કે નહીં તે ચેક થાય.'
        }
      }
    ],
    preventionTip: {
      en: 'Always purchase matching RAM kits from the motherboard Qualified Vendor List (QVL) with identical speeds, timings, and voltage.',
      gu: 'હંમેશા એકસરખી કંપની, સ્પીડ (MHz) અને મોડલની રેમ જોડીમાં જ વાપરો.'
    }
  },
  {
    id: 'gpu-beep-codes-1long-2short',
    title: {
      en: '1 Long Beep Followed by 2 or 3 Short Beeps',
      gu: 'એક લાંબી બીપ પછી બે અથવા ત્રણ ટૂંકી બીપ સંભળાય છે'
    },
    symptom: {
      en: 'System speaker sounds one long tone followed by 2 or 3 short tones; the monitor remains dark or flickers momentarily.',
      gu: 'મધરબોર્ડમાંથી એક લાંબો બીપ અને પછી બે કે ત્રણ ઝડપી બીપ વાગે છે અને મોનિટરમાં કશું દેખાતું નથી.'
    },
    category: 'display',
    component: 'Dedicated GPU / Video BIOS Adapter',
    severity: 'high',
    beepCode: '1 Long + 2/3 Short Beeps',
    likelyCauses: {
      en: [
        'Dedicated graphics card not seated fully into PCIe x16 slot',
        'PCIe 6-pin / 8-pin power cable disconnected from the GPU',
        'Video card BIOS ROM failure or defective video memory (VRAM)',
        'PCIe slot locking retention latch snapped loose'
      ],
      gu: [
        'ગ્રાફિક્સ કાર્ડ મધરબોર્ડના PCIe સ્લોટમાં બરાબર ફિટ થયેલું નથી',
        'ગ્રાફિક્સ કાર્ડને મળતો ૬-પિન કે ૮-પિન પાવર કેબલ ઢીલો છે',
        'ગ્રાફિક્સ કાર્ડનું વીડિયો બાયોસ અથવા VRAM મેમરી ખરાબ થઈ ગઈ છે',
        'PCIe સ્લોટનો લોક બરાબર બેઠો નથી'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Re-seat GPU and Check PCIe Lock', gu: 'ગ્રાફિક્સ કાર્ડ કાઢીને ફરી મજબૂત બેસાડો' },
        instruction: {
          en: 'Unscrew the rear bracket screw, push the PCIe retention clip to release the GPU, and gently pull it out. Re-insert it with firm pressure until the clip clicks locked, and screw the bracket tightly.',
          gu: 'પાછળનો સ્ક્રૂ ખોલી, સ્લોટનો લોક દબાવી GPU બહાર કાઢો. તેને ફરીથી સ્લોટમાં સીધું દબાવીને બેસાડો જ્યાં સુધી લોક ક્લિક ન થઈ જાય.'
        }
      },
      {
        step: 2,
        title: { en: 'Verify PCIe Auxiliary Power Plugs', gu: 'PCIe પાવર કેબલ કનેક્શન તપાસો' },
        instruction: {
          en: 'Check the 6-pin or 8-pin PCIe power cables plugged into the top edge of the graphics card. Make sure the latch clicks into place.',
          gu: 'ગ્રાફિક્સ કાર્ડના ઉપરના ભાગમાં લાગેલા PCIe પાવર કેબલને બરાબર દબાવીને લોક કરો.'
        }
      },
      {
        step: 3,
        title: { en: 'Test in Second PCIe Slot or Integrated Graphics', gu: 'બીજા PCIe સ્લોટમાં અથવા ઑનબોર્ડ ગ્રાફિક્સમાં ચેક કરો' },
        instruction: {
          en: 'If your motherboard has a second PCIe slot, test the GPU there, or remove the GPU entirely and test with motherboard integrated HDMI.',
          gu: 'જો મધરબોર્ડમાં બીજો PCIe સ્લોટ હોય તો તેમાં લગાવીને અથવા GPU કાઢીને ડાયરેક્ટ મધરબોર્ડમાં ચેક કરો.'
        }
      }
    ],
    preventionTip: {
      en: 'Use a GPU anti-sag support bracket for heavy triple-fan graphics cards to prevent PCIe slot strain and PCB cracking.',
      gu: 'મોટા અને વજનદાર ગ્રાફિક્સ કાર્ડ માટે હંમેશા GPU સપોર્ટ બ્રેકેટ વાપરો જેથી સ્લોટ પર વજન ન આવે.'
    }
  },
  {
    id: 'storage-boot-device-not-found',
    title: {
      en: '"Reboot and Select Proper Boot Device" or "No Bootable Device Found"',
      gu: '"Reboot and Select Proper Boot Device" અથવા "No Bootable Device" એરર'
    },
    symptom: {
      en: 'Computer turns on successfully, displays the motherboard logo, but stops on a black screen saying "No boot device found. Press any key...".',
      gu: 'કમ્પ્યુટર ચાલુ થાય છે પણ વિન્ડોઝ લોડ થવાને બદલે સ્ક્રીન પર "Reboot and Select Proper Boot Device" લખેલું આવી જાય છે.'
    },
    category: 'storage',
    component: 'SSD (NVMe / SATA) / Hard Disk / BIOS Boot Order',
    severity: 'critical',
    likelyCauses: {
      en: [
        'SATA data or SATA power cable disconnected from the 2.5" SSD or HDD',
        'M.2 NVMe SSD thermal expansion caused slight dislodging from the M.2 slot',
        'BIOS Boot Order corrupted; default boot device reset to disabled state',
        'BIOS mode switched from UEFI to Legacy/CSM mode after CMOS reset'
      ],
      gu: [
        'હાર્ડ ડિસ્ક અથવા SSD નો SATA ડેટા કે પાવર કેબલ ઢીલો પડી ગયો હોય',
        'M.2 NVMe SSD સ્લોટમાંથી સહેજ બહાર આવી ગયેલી હોય',
        'BIOS માં બૂટિંગનો ક્રમ (Boot Priority) બદલાઈ ગયો હોય',
        'BIOS મોડ UEFI માંથી બદલાઈને Legacy/CSM થઈ ગયું હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Enter BIOS and Check Drive Detection', gu: 'BIOS માં જઈને સ્ટોરેજ ડ્રાઈવ દેખાય છે કે નહીં તે જુઓ' },
        instruction: {
          en: 'Power on PC and immediately press "Del" or "F2" repeatedly to enter BIOS setup. Go to the "Storage Information" or "Boot" tab. Check if your SSD model name (e.g. Samsung, Kingston, Crucial, WD) is listed.',
          gu: 'પીસી ચાલુ કરતાં જ Del અથવા F2 કી વારંવાર દબાવી BIOS ખોલો. તેમાં તમારી SSD કે હાર્ડ ડિસ્કનું નામ લિસ્ટમાં દેખાય છે કે નહીં તે ચકાસો.'
        }
      },
      {
        step: 2,
        title: { en: 'Set "Windows Boot Manager" as Boot Option #1', gu: 'Windows Boot Manager ને પ્રથમ નંબર પર સેટ કરો' },
        instruction: {
          en: 'Under BIOS Boot Priority, ensure "Windows Boot Manager" on your primary SSD is set as Boot Option #1, not an empty USB drive or secondary hard disk.',
          gu: 'Boot Priority માં જઈને વિન્ડોઝ વાળી SSD ને "Boot Option #1" તરીકે પસંદ કરીને F10 દબાવી સેવ કરો.'
        }
      },
      {
        step: 3,
        title: { en: 'Check Physical Cables or Re-insert M.2 SSD', gu: 'SATA કેબલ બદલો અથવા M.2 SSD ફરી બેસાડો' },
        instruction: {
          en: 'For SATA drives, replace the SATA data cable and plug into a different SATA port. For M.2 NVMe SSD, unscrew the tiny standoff screw, slide the SSD out, clean the contact, and re-fasten tightly.',
          gu: 'SATA કેબલ બદલીને બીજા પોર્ટમાં લગાવો. જો M.2 SSD હોય તો સ્ક્રૂ ખોલી ફરીથી સ્લોટમાં બેસાડી ટાઈટ કરો.'
        }
      }
    ],
    preventionTip: {
      en: 'Always install Windows in UEFI mode with GPT partition style for faster boot and recovery partition reliability.',
      gu: 'વિન્ડોઝ હંમેશા UEFI મોડ અને GPT પાર્ટીશનમાં જ ઇન્સ્ટોલ કરો.'
    }
  },
  {
    id: 'hdd-clicking-sound-death',
    title: {
      en: 'Hard Disk Drive Making Ticking / Clicking Noise ("Click of Death")',
      gu: 'હાર્ડ ડિસ્કમાંથી સતત ટક-ટક (Clicking) અવાજ આવે છે અને સિસ્ટમ હેંગ થાય છે'
    },
    symptom: {
      en: 'Mechanical Hard Drive produces rhythmic clicking or screeching metallic sounds. Windows explorer freezes or crashes when accessing drives.',
      gu: 'હાર્ડ ડિસ્કની અંદરથી સતત ટિક-ટિક કે ટક-ટક અવાજ સંભળાય છે, કમ્પ્યુટર હેંગ થાય છે અને ફાઇલો ખુલતી નથી.'
    },
    category: 'storage',
    component: 'Mechanical Hard Disk Drive (HDD)',
    severity: 'critical',
    likelyCauses: {
      en: [
        'Mechanical read/write head assembly actuator failure',
        'Physical magnetic platter damage or surface scratches',
        'Spindle motor bearing degradation due to physical shock or drop',
        'SMPS 12V power rail voltage dropping below safe operating threshold'
      ],
      gu: [
        'હાર્ડ ડિસ્કનું રીડ/રાઈટ હેડ ખરાબ થઈ ગયું હોય',
        'અંદરની મેગ્નેટિક પ્લેટર પર સ્ક્રેચ પડી ગયો હોય',
        'પીસીને આંચકો લાગવાથી હેડ ડિસ્ક સાથે અથડાઈ ગયું હોય',
        'પાવર સપ્લાયમાંથી યોગ્ય વોલ્ટેજ ન મળતો હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'CRITICAL: Immediately Backup Essential Files', gu: 'તાત્કાલિક તમારા મહત્વના ડેટાનો બેકઅપ લો' },
        instruction: {
          en: 'A clicking HDD can die permanently at any second. If Windows can still access the drive, copy your most critical documents/photos to an external SSD, USB, or Google Drive immediately.',
          gu: 'ક્લિકિંગ અવાજ આવતી હાર્ડ ડિસ્ક ગમે ત્યારે કાયમ માટે બંધ થઈ શકે છે. જો ફાઇલો દેખાતી હોય તો સૌથી પહેલા જરૂરી ડેટા પેનડ્રાઇવ કે ગૂગલ ડ્રાઇવમાં સેવ કરી લો!'
        },
        tip: { en: 'Do NOT run CHKDSK or defragmentation on a clicking drive; it accelerates head crash!', gu: 'આવી ડિસ્ક પર કોઈ ડિસ્ક સ્કેન કે ડીફ્રેગમેન્ટ રન ન કરો, નહીંતર ડેટા કાયમ માટે જતો રહેશે.' }
      },
      {
        step: 2,
        title: { en: 'Check SMART Health with CrystalDiskInfo', gu: 'CrystalDiskInfo સોફ્ટવેરથી હેલ્થ ચેક કરો' },
        instruction: {
          en: 'Download the free portable tool "CrystalDiskInfo". If Health Status shows "Bad" or "Caution" with high Reallocated Sectors Count, the mechanical drive must be replaced.',
          gu: 'CrystalDiskInfo સોફ્ટવેર ડાઉનલોડ કરી હાર્ડ ડિસ્કની હેલ્થ જુઓ. જો તેમાં "Caution" કે "Bad" લખેલું હોય તો ડિસ્ક બદલવી પડશે.'
        }
      },
      {
        step: 3,
        title: { en: 'Upgrade to Solid State Drive (SSD)', gu: 'SSD માં અપગ્રેડ કરો' },
        instruction: {
          en: 'Replace the mechanical HDD with an M.2 NVMe SSD or SATA 2.5" SSD. SSDs have zero moving parts, produce zero sound, and are 10-30x faster.',
          gu: 'હાર્ડ ડિસ્કની જગ્યાએ SSD લગાવો. SSD માં કોઈ ફરતા પાર્ટ્સ નથી હોતા, કોઈ અવાજ નથી થતો અને તે ૧૦ ગણી ઝડપી હોય છે.'
        }
      }
    ],
    preventionTip: {
      en: 'Never move, shake, or tilt a PC cabinet while it is powered on and the HDD platters are spinning at 7200 RPM.',
      gu: 'કમ્પ્યુટર ચાલુ હોય ત્યારે કેબિનેટને ક્યારેય હલાવવું કે ખસેડવું નહીં.'
    }
  },
  {
    id: 'cpu-overheating-thermal-shutdown',
    title: {
      en: 'PC Shuts Down Automatically After 10-15 Minutes, Cabinet Feels Hot',
      gu: 'થોડીવાર ચાલુ રહ્યા પછી કમ્પ્યુટર આપોઆપ બંધ થઈ જાય છે, કેબિનેટ ખૂબ ગરમ થાય છે'
    },
    symptom: {
      en: 'System boots fine, but within 10 to 20 minutes (or immediately when launching a game or video render), the PC abruptly turns off with no blue screen.',
      gu: 'કમ્પ્યુટર શરૂઆતમાં સરસ ચાલે છે પણ ૧૦-૧૫ મિનિટમાં કે કોઈ ગેમ ચાલુ કરતા જ આપોઆપ બંધ થઈ જાય છે.'
    },
    category: 'cpu',
    component: 'CPU (Processor) / Heatsink / Thermal Paste',
    severity: 'critical',
    likelyCauses: {
      en: [
        'CPU Thermal paste has dried up, turned to chalky powder, or evaporated',
        'CPU cooler heatsink push-pins or mounting screws loosened',
        'CPU fan cable unplugged from CPU_FAN header',
        'Thick layer of dust clogging the aluminum/copper heatsink fins'
      ],
      gu: [
        'પ્રોસેસર પર લાગેલી થર્મલ પેસ્ટ (Thermal Paste) સુકાઈને પથ્થર જેવી થઈ ગઈ હોય',
        'પ્રોસેસરના કૂલર ફેનના સ્ક્રૂ કે લોક ઢીલા પડી ગયા હોય',
        'કૂલર ફેનનો વાયર CPU_FAN પિનમાંથી નીકળી ગયો હોય',
        'કૂલરની એલ્યુમિનિયમ જાળીમાં ધૂળનો મોટો થર જામી ગયો હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Monitor Real-Time CPU Temperature', gu: 'પ્રોસેસરનું તાપમાન (Temperature) ચેક કરો' },
        instruction: {
          en: 'Install HWMonitor or Core Temp. Normal idle temperature is 35°C - 50°C. If your CPU is idling at 85°C - 100°C, the processor is reaching TJMax and automatically cutting power to prevent melting.',
          gu: 'HWMonitor એપ ઇન્સ્ટોલ કરી તાપમાન જુઓ. સામાન્ય રીતે તાપમાન ૩૫ થી ૫૦ ડિગ્રી હોવું જોઈએ. જો ૯૦ થી ૧૦૦ ડિગ્રી બતાવે તો હીટિંગના કારણે પીસી બંધ થાય છે.'
        }
      },
      {
        step: 2,
        title: { en: 'Remove Cooler and Clean Old Thermal Paste', gu: 'જૂની સુકાઈ ગયેલી પેસ્ટ સાફ કરો' },
        instruction: {
          en: 'Unscrew the CPU cooler heatsink. Use 90%+ Isopropyl Alcohol (IPA) and a microfiber cloth or earbud to thoroughly clean the crusty old thermal paste from both the CPU IHS metal top and the cooler base.',
          gu: 'કૂલર ખોલીને પ્રોસેસરની ઉપરથી અને કૂલરના તળિયેથી જૂની સુકાઈ ગયેલી પેસ્ટ આલ્કોહોલ કે કોટન કપડા વડે સાફ કરો.'
        }
      },
      {
        step: 3,
        title: { en: 'Apply Fresh High-Grade Thermal Paste', gu: 'નવી થર્મલ પેસ્ટ લગાવો' },
        instruction: {
          en: 'Apply a pea-sized dot (or small grain-of-rice) of quality thermal paste (e.g. Arctic MX-4, Noctua NT-H1, Thermal Grizzly) right in the center of the CPU lid. Re-mount the heatsink firmly with diagonal screw cross-tightening.',
          gu: 'પ્રોસેસરની વચ્ચે વટાણાના દાણા જેટલી નવી થર્મલ પેસ્ટ મૂકો અને કૂલરને સામસામેના સ્ક્રૂ ટાઈટ કરીને ફીટ કરો.'
        }
      }
    ],
    preventionTip: {
      en: 'Re-apply thermal paste every 1.5 to 2 years to maintain optimal thermal heat transfer.',
      gu: 'દર દોઢથી બે વર્ષે પ્રોસેસરની થર્મલ પેસ્ટ બદલતા રહો.'
    }
  },
  {
    id: 'bsod-memory-management-crash',
    title: {
      en: 'Blue Screen of Death (BSOD) Crashes with Stop Code MEMORY_MANAGEMENT',
      gu: 'વાદળી સ્ક્રીન (Blue Screen) આવીને કમ્પ્યુટર વારંવાર ક્રેશ થાય છે'
    },
    symptom: {
      en: 'Windows suddenly crashes with a blue error screen displaying stop codes like "MEMORY_MANAGEMENT", "PAGE_FAULT_IN_NONPAGED_AREA", or "IRQL_NOT_LESS_OR_EQUAL".',
      gu: 'કમ્પ્યુટર ચાલુમાં અચાનક વાદળી રંગની સ્ક્રીન આવી જાય છે અને એરર કોડ સાથે સિસ્ટમ રીસ્ટાર્ટ થઈ જાય છે.'
    },
    category: 'ram',
    component: 'RAM / Corrupted Device Driver / Virtual Memory',
    severity: 'high',
    likelyCauses: {
      en: [
        'Failing RAM chip causing memory parity calculation error',
        'Corrupt or outdated chipset or graphics device drivers',
        'Corrupted Windows system files (ntoskrnl.exe)',
        'XMP / EXPO memory overclock profile unstable with motherboard voltage'
      ],
      gu: [
        'રેમ (RAM) ની અંદર ખરાબી આવવાથી મેમરી કેલ્ક્યુલેશન ફેઈલ થવું',
        'કમ્પ્યુટરના ડ્રાઈવર કરપ્ટ થઈ ગયા હોય',
        'વિન્ડોઝની સિસ્ટમ ફાઈલો બગડી ગઈ હોય',
        'BIOS માં રેમનું ઓવરક્લોકિંગ (XMP Profile) અનસ્ટેબલ હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Run Windows System File Checker (SFC)', gu: 'વિન્ડોઝ સિસ્ટમ ફાઇલ સ્કેન રન કરો' },
        instruction: {
          en: 'Search "cmd" in Windows start menu, right-click and choose "Run as Administrator". Type:\n"sfc /scannow" and press Enter. Let it repair any corrupted core operating system files.',
          gu: 'CMD ને Run as Administrator તરીકે ખોલો અને "sfc /scannow" લખી એન્ટર આપો જેથી બગડેલી સિસ્ટમ ફાઈલો રીપેર થાય.'
        }
      },
      {
        step: 2,
        title: { en: 'Disable XMP / EXPO in BIOS', gu: 'BIOS માં XMP મોડ બંધ કરો' },
        instruction: {
          en: 'Enter BIOS setup (Del/F2). Navigate to Overclocking / Memory Settings and set "XMP" or "DOCP/EXPO" to "Disabled" to run the RAM at stock JEDEC standard speeds.',
          gu: 'BIOS માં જઈને XMP અથવા EXPO ઓવરક્લોકિંગ બંધ (Disabled) કરી દો.'
        }
      },
      {
        step: 3,
        title: { en: 'Isolate Defective RAM with MemTest86', gu: 'રેમને અલગ-અલગ ચેક કરો' },
        instruction: {
          en: 'Remove one RAM stick and run the PC. If crashes stop, the removed stick is hardware-defective and requires replacement under warranty.',
          gu: 'એક રેમ કાઢીને ચલાવો. જો ક્રેશ થવાનું બંધ થઈ જાય તો કાઢેલી રેમ ખરાબ છે જેને બદલવી પડશે.'
        }
      }
    ],
    preventionTip: {
      en: 'Always keep your motherboard BIOS updated to the latest stable revision for enhanced memory compatibility.',
      gu: 'મધરબોર્ડનું BIOS હંમેશા અપડેટ રાખો જેથી નવી રેમ સાથે કોઈ સમસ્યા ન આવે.'
    }
  },
  {
    id: 'front-panel-usb-audio-not-working',
    title: {
      en: 'Front Panel USB Ports or Headphone Jack Not Working',
      gu: 'કેબિનેટના આગળના USB પોર્ટ અથવા હેડફોન જેક કામ કરતા નથી'
    },
    symptom: {
      en: 'Plugging USB pen drives or headphones into the front/top cabinet ports does nothing, but the rear motherboard ports work normally.',
      gu: 'આગળના પેનલમાં પેનડ્રાઇવ કે હેડફોન લગાવવા છતાં કમ્પ્યુટરમાં ડિટેક્ટ થતું નથી, પરંતુ પાછળ લગાવવાથી બધું બરાબર ચાલે છે.'
    },
    category: 'peripherals',
    component: 'Front Panel USB 3.0 Header / HD_AUDIO Connector',
    severity: 'medium',
    likelyCauses: {
      en: [
        'Internal front panel USB 3.0 19-pin cable disconnected from motherboard header',
        'HD_AUDIO 10-pin cable disconnected or plugged into wrong header',
        'Bent pin inside the USB 3.0 motherboard header',
        'Realtek audio driver auto-sensing front jack detection disabled'
      ],
      gu: [
        'કેબિનેટમાંથી આવતો ૧૯-પિનનો વાદળી USB 3.0 કેબલ મધરબોર્ડમાં લગાવેલો ન હોય',
        'HD_AUDIO ઓડિયો વાયર મધરબોર્ડના પિનમાંથી નીકળી ગયેલ હોય',
        'USB 3.0 સોકેટની પિન વાંકી વળી ગઈ હોય',
        'ઓડિયો ડ્રાઈવરમાં ફ્રન્ટ પેનલ ડિટેક્શન બંધ હોય'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Inspect Internal USB 3.0 Motherboard Header', gu: 'મધરબોર્ડ પર USB 3.0 વાયર ચેક કરો' },
        instruction: {
          en: 'Open cabinet side panel. Locate the large rectangular 19-pin header (usually black or blue, labeled "USB 3.0" or "F_USB30") on the right edge of the motherboard. Firmly seat the cable plug.',
          gu: 'કેબિનેટ ખોલી મધરબોર્ડની જમણી બાજુ "USB 3.0" લખેલા મોટા બ્લુ કનેક્ટરને બરાબર દબાવીને ફિટ કરો.'
        }
      },
      {
        step: 2,
        title: { en: 'Check HD_AUDIO 9-Pin Connector', gu: 'HD AUDIO નો વાયર ચેક કરો' },
        instruction: {
          en: 'Look at the bottom-left corner of the motherboard. Locate the header labeled "AAFP" or "HD_AUDIO" (it has 10 pins with pin 8 missing). Plug the front audio cable securely into this header.',
          gu: 'મધરબોર્ડના નીચે ડાબી બાજુ "HD_AUDIO" લખેલી પિન પર આગળનો ઓડિયો કેબલ બરાબર લગાવો.'
        }
      },
      {
        step: 3,
        title: { en: 'Enable Front Panel Jack Detection in Realtek Audio Console', gu: 'Realtek ઓડિયો કન્સોલમાં ફ્રન્ટ જેક એનેબલ કરો' },
        instruction: {
          en: 'Open Realtek Audio Console / Control Panel -> Device Advanced Settings -> Turn ON "Disable front panel jack detection" if your jack is not triggering automatic sensing.',
          gu: 'Realtek Audio સેટિંગ્સમાં જઈને "Disable front panel jack detection" ઓપ્શન ચાલુ કરી જુઓ.'
        }
      }
    ],
    preventionTip: {
      en: 'Never force the 19-pin USB 3.0 connector in backwards as its thin pins easily bend and break.',
      gu: 'USB 3.0 નો કેબલ ક્યારેય ઊંધો ન દબાવો, તેની પાતળી પિન બહુ સહેલાઈથી તૂટી જાય છે.'
    }
  },
  {
    id: 'cmos-battery-date-time-reset',
    title: {
      en: 'Computer Time & Date Resets Every Time Power is Disconnected ("CMOS Checksum Error")',
      gu: 'કમ્પ્યુટર બંધ કરીને ચાલુ કરતાં જ તારીખ અને સમય બદલાઈ જાય છે ("CMOS Error")'
    },
    symptom: {
      en: 'Every time the PC is switched off from the wall, the system clock resets to 00:00 2010/2015, and the screen prompts "Press F1 to enter setup".',
      gu: 'જ્યારે પણ કમ્પ્યુટરની મેઇન સ્વિચ બંધ કરીએ, ત્યારે કમ્પ્યુટરનો સમય અને તારીખ જૂની થઈ જાય છે અને F1 દબાવવાનું કહે છે.'
    },
    category: 'motherboard',
    component: 'CR2032 CMOS Coin Cell Battery',
    severity: 'low',
    likelyCauses: {
      en: [
        'CR2032 3V lithium coin cell battery voltage dropped below 2.5V',
        'CMOS battery contact spring oxidized or bent',
        'BIOS NVRAM loses volatile settings without standby battery power'
      ],
      gu: [
        'મધરબોર્ડ પર રહેલી ગોળ CR2032 બેટરી ડીસ્ચાર્જ (ખાલી) થઈ ગઈ છે',
        'બેટરીની પિન પર કાટ કે કાર્બન જામી ગયો હોય',
        'બેટરી વગર બાયોસ પોતાની મેમરી સાચવી શકતું નથી'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Locate the CR2032 Coin Cell Battery', gu: 'CR2032 ગોળ બેટરી શોધો' },
        instruction: {
          en: 'Power off PC and unplug wall cord. Locate the round shiny silver coin-sized battery on the motherboard (often between the PCIe slots or near the chipset).',
          gu: 'પીસી બંધ કરી મધરબોર્ડ પર રહેલી સિક્કા જેવી સિલ્વર કલરની ગોળ બેટરી શોધો.'
        }
      },
      {
        step: 2,
        title: { en: 'Eject Battery using Flathead Screwdriver', gu: 'બેટરીનો લોક દબાવી બહાર કાઢો' },
        instruction: {
          en: 'Gently press the metal retention spring tab on the edge of the battery socket outwards. The coin battery will pop up automatically.',
          gu: 'બેટરીની બાજુમાં રહેલા નાના પતરાના લોકને સહેજ દબાવો એટલે બેટરી આપોઆપ બહાર આવી જશે.'
        }
      },
      {
        step: 3,
        title: { en: 'Insert Fresh CR2032 3V Lithium Battery', gu: 'નવી CR2032 ૩-વોલ્ટ બેટરી લગાવો' },
        instruction: {
          en: 'Purchase a new standard CR2032 3-Volt battery (readily available in electronics/watch stores for ₹20-₹30). Press it in with the "+" text facing upwards until it clicks into place.',
          gu: 'બજારમાંથી ₹૨૦-₹૩૦ માં મળતી નવી CR2032 બેટરી લાવી "+" નિશાન ઉપર રહે તેમ મૂકીને દબાવી દો.'
        }
      }
    ],
    preventionTip: {
      en: 'A standard CR2032 battery lasts 3 to 5 years. Replace it proactively if your PC is older than 4 years.',
      gu: 'આ બેટરી ૩ થી ૫ વર્ષ સુધી ચાલે છે. જૂના કમ્પ્યુટરમાં સમય બદલાય ત્યારે બેટરી બદલી નાખવી.'
    }
  },
  {
    id: 'ethernet-lan-network-drops',
    title: {
      en: 'Ethernet Cable Plugged In but Shows "No Internet" or Disconnects Frequently',
      gu: 'LAN કેબલ લગાવેલો હોવા છતાં "No Internet" બતાવે છે અથવા નેટ વારંવાર બંધ થઈ જાય છે'
    },
    symptom: {
      en: 'The network icon in taskbar shows a globe with an exclamation mark or "Unidentified Network", even though Wi-Fi on phones works fine.',
      gu: 'ટાસ્કબારમાં ઇન્ટરનેટના આઇકોન પર પીળી ચોકડી કે "Unidentified Network" આવે છે જ્યારે મોબાઈલમાં વાઈફાઈ બરાબર ચાલે છે.'
    },
    category: 'network',
    component: 'Network Interface Card (NIC) / RJ-45 Connector / Drivers',
    severity: 'medium',
    likelyCauses: {
      en: [
        'Broken plastic retention clip on RJ-45 LAN cable connector causing loose pin contact',
        'Corrupted Windows TCP/IP network stack or DNS cache conflict',
        'Stale or corrupted Realtek / Intel PCIe Gigabit Ethernet controller driver',
        'Local IP address conflict with another device on the router'
      ],
      gu: [
        'LAN કેબલનો આગળનો પ્લાસ્ટિકનો લોક તૂટી જવાથી કેબલ ઢીલો પડી જવો',
        'વિન્ડોઝની DNS કે નેટવર્ક કેશ ફાઇલોમાં એરર આવી જવી',
        'નેટવર્ક કાર્ડના ડ્રાઈવર જૂના કે બગડી ગયા હોય',
        'રાઉટરમાં આઈપી (IP Address) ક્લેશ થવો'
      ]
    },
    diagnosticSteps: [
      {
        step: 1,
        title: { en: 'Inspect Ethernet Port Physical LED Indicators', gu: 'RJ-45 પોર્ટની લાઈટ્સ તપાસો' },
        instruction: {
          en: 'Look at the Ethernet port on the back of the PC. The Green LED should be solid ON (link established) and the Amber/Orange LED should blink rapidly (data packet transmission). If neither is lit, the cable is dead or port is unpowered.',
          gu: 'પીસીની પાછળ LAN પોર્ટમાં જુઓ. લીલી લાઈટ સતત ચાલુ હોવી જોઈએ અને પીળી લાઈટ ઝબૂકવી જોઈએ. જો કોઈ લાઈટ ન થાય તો કેબલ ખરાબ છે.'
        }
      },
      {
        step: 2,
        title: { en: 'Run Windows Network Stack Reset Commands', gu: 'CMD માં નેટવર્ક રીસેટ કમાન્ડ રન કરો' },
        instruction: {
          en: 'Open Command Prompt as Administrator and execute these commands in order:\n1. ipconfig /flushdns\n2. netsh int ip reset\n3. netsh winsock reset\nThen restart your PC.',
          gu: 'CMD ને Administrator તરીકે ખોલી આ ૩ કમાન્ડ રન કરી પીસી રીસ્ટાર્ટ કરો:\n1. ipconfig /flushdns\n2. netsh int ip reset\n3. netsh winsock reset'
        }
      },
      {
        step: 3,
        title: { en: 'Re-crimp or Replace RJ-45 Cable', gu: 'કેબલ બદલો અથવા નવો કનેક્ટર લગાવો' },
        instruction: {
          en: 'If the plastic locking tab of the RJ-45 plug is snapped, slight cable wiggles break the gigabit link. Replace with a Cat-6 molded patch cord.',
          gu: 'જો કેબલનો પ્લાસ્ટિક લોક તૂટી ગયો હોય તો નવો Cat-6 કેબલ લગાવો.'
        }
      }
    ],
    preventionTip: {
      en: 'Use Cat-6 shielded Ethernet cables and avoid bending the cable sharply near doors or furniture.',
      gu: 'હંમેશા સારી ક્વોલિટીનો Cat-6 કેબલ વાપરો અને વાયરને વળવા ન દો.'
    }
  }
];

export const BEEP_CODE_GUIDE = [
  {
    beeps: '1 Short Beep',
    meaning: { en: 'Normal POST Successful', gu: 'કમ્પ્યુટર બિલકુલ નોર્મલ છે (POST સફળ)' },
    status: 'good',
    action: { en: 'All hardware checks passed; system is booting into OS.', gu: 'બધા હાર્ડવેર બરાબર છે, વિન્ડોઝ લોડ થઈ રહ્યું છે.' }
  },
  {
    beeps: 'Continuous Repeating Beeps',
    meaning: { en: 'RAM / Memory Detection Failure', gu: 'રેમ (RAM) ડિટેક્ટ થતી નથી અથવા ખરાબ છે' },
    status: 'critical',
    action: { en: 'Power off, clean RAM gold pins with an eraser, and re-seat in slot 2.', gu: 'પાવર બંધ કરી રેમને રબર વડે સાફ કરી ફરી સ્લોટ ૨ માં બેસાડો.' }
  },
  {
    beeps: '1 Long Beep + 2 or 3 Short Beeps',
    meaning: { en: 'Graphics Card (GPU) Failure', gu: 'ગ્રાફિક્સ કાર્ડ (GPU) ની ખામી' },
    status: 'critical',
    action: { en: 'Check PCIe 8-pin power cables and re-seat GPU in the primary PCIe x16 slot.', gu: 'ગ્રાફિક્સ કાર્ડને બહાર કાઢી ફરી બેસાડો અને પાવર વાયર ચેક કરો.' }
  },
  {
    beeps: '5 Short Beeps',
    meaning: { en: 'CPU / Processor Error', gu: 'પ્રોસેસર (CPU) ની ખામી' },
    status: 'critical',
    action: { en: 'Check CPU cooler mounting pressure, 8-pin CPU power cable, and socket pins.', gu: 'પ્રોસેસરનો ૮-પિન વાયર અને કૂલરનું ફીટીંગ ચેક કરો.' }
  },
  {
    beeps: 'No Beep, No Power',
    meaning: { en: 'SMPS Power Supply Failure', gu: 'પાવર સપ્લાય (SMPS) અથવા પાવર કેબલ ખરાબ' },
    status: 'critical',
    action: { en: 'Perform the green-to-black paperclip test on the 24-pin SMPS connector.', gu: 'SMPS નો પેપરક્લિપ ટેસ્ટ કરો અથવા પાવર કેબલ બદલી જુઓ.' }
  }
];
