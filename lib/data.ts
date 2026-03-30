export type Company = {
  id: string
  slug: string
  name: string
  description: string
  sector: string
  sectorColor: string
  stage: string
  raised: number
  valuation: number
  employees: number
  founded: number
  isPortfolio: boolean
  investors: string[]
}

export type Fund = {
  name: string
  slug: string
  type: string
  tier: number
  aum: string
  focus: string[]
  companies: string[]
  deployed: number
}

export const COMPANIES: Company[] = [
  { id:'1', slug:'formation-bio', name:'Formation Bio', description:'Drug Development AI', sector:'Health', sectorColor:'#16a34a', stage:'Series C', raised:248, valuation:1100, employees:320, founded:2018, isPortfolio:false, investors:['a16z Bio','Sequoia','Google Ventures'] },
  { id:'2', slug:'evenup', name:'EvenUp', description:'Personal Injury Law', sector:'Legal', sectorColor:'#7c3aed', stage:'Series C', raised:135, valuation:600, employees:290, founded:2019, isPortfolio:false, investors:['SignalFire','Bessemer','Accel'] },
  { id:'3', slug:'prosper', name:'Prosper', description:'RCM Platform', sector:'Health', sectorColor:'#16a34a', stage:'Series B', raised:127, valuation:480, employees:210, founded:2020, isPortfolio:true, investors:['Emergence Capital','a16z','GV'] },
  { id:'4', slug:'harper', name:'Harper', description:'Commercial Insurance', sector:'Financial', sectorColor:'#2563eb', stage:'Series B', raised:110, valuation:450, employees:230, founded:2019, isPortfolio:true, investors:['Emergence Capital','Ribbit Capital','QED'] },
  { id:'5', slug:'crosby', name:'Crosby', description:'Contract Lifecycle', sector:'Legal', sectorColor:'#7c3aed', stage:'Series B', raised:95, valuation:380, employees:180, founded:2019, isPortfolio:true, investors:['Emergence Capital','Tiger Global','Salesforce Ventures'] },
  { id:'6', slug:'scale-medicine', name:'Scale Medicine', description:'Precision Medicine', sector:'Health', sectorColor:'#16a34a', stage:'Series B', raised:89, valuation:360, employees:145, founded:2020, isPortfolio:true, investors:['Emergence Capital','Flagship Pioneering'] },
  { id:'7', slug:'mechanical-orchard', name:'Mechanical Orchard', description:'Legacy Modernization', sector:'Software', sectorColor:'#d97706', stage:'Series B', raised:75, valuation:310, employees:190, founded:2020, isPortfolio:true, investors:['Emergence Capital','Salesforce Ventures'] },
  { id:'8', slug:'irving', name:'Irving', description:'M&A Diligence', sector:'Legal', sectorColor:'#7c3aed', stage:'Series A', raised:45, valuation:190, employees:95, founded:2021, isPortfolio:true, investors:['Emergence Capital','Index Ventures'] },
  { id:'9', slug:'lighttable', name:'LightTable', description:'Construction AI', sector:'Industrial', sectorColor:'#b45309', stage:'Series A', raised:42, valuation:170, employees:88, founded:2021, isPortfolio:false, investors:['Lux Capital','Founders Fund'] },
  { id:'10', slug:'tessera', name:'Tessera', description:'API Integration', sector:'Software', sectorColor:'#d97706', stage:'Series A', raised:41, valuation:165, employees:90, founded:2021, isPortfolio:false, investors:['Sequoia','NEA'] },
  { id:'11', slug:'airops', name:'AirOps', description:'GTM Automation', sector:'GTM', sectorColor:'#0891b2', stage:'Series A', raised:38, valuation:155, employees:80, founded:2021, isPortfolio:false, investors:['Gradient Ventures','Boldstart'] },
  { id:'12', slug:'xbow', name:'XBOW', description:'Autonomous Pentesting', sector:'Security', sectorColor:'#dc2626', stage:'Series A', raised:35, valuation:150, employees:75, founded:2022, isPortfolio:false, investors:['Sequoia','Khosla Ventures'] },
  { id:'13', slug:'outbound-ai', name:'Outbound AI', description:'Voice AI', sector:'Health', sectorColor:'#16a34a', stage:'Series A', raised:34, valuation:140, employees:85, founded:2021, isPortfolio:false, investors:['General Catalyst','Bessemer'] },
  { id:'14', slug:'tribe-ai', name:'Tribe AI', description:'AI Consulting', sector:'AI Impl.', sectorColor:'#15803d', stage:'Series A', raised:33, valuation:130, employees:120, founded:2019, isPortfolio:true, investors:['Emergence Capital','Homebrew'] },
  { id:'15', slug:'rivet', name:'Rivet', description:'Accounting AI', sector:'Financial', sectorColor:'#2563eb', stage:'Series A', raised:31, valuation:120, employees:70, founded:2021, isPortfolio:true, investors:['Emergence Capital','Accel'] },
  { id:'16', slug:'rubie', name:'Rubie', description:'QA Automation', sector:'Software', sectorColor:'#d97706', stage:'Series A', raised:28, valuation:110, employees:65, founded:2022, isPortfolio:true, investors:['Emergence Capital','Boldstart'] },
  { id:'17', slug:'norm-ai', name:'Norm AI', description:'Regulatory Compliance', sector:'Legal', sectorColor:'#7c3aed', stage:'Series A', raised:27, valuation:110, employees:60, founded:2022, isPortfolio:false, investors:['Coatue','Index Ventures'] },
  { id:'18', slug:'docshield', name:'Docshield', description:'Document Automation', sector:'Financial', sectorColor:'#2563eb', stage:'Series A', raised:22, valuation:90, employees:48, founded:2022, isPortfolio:false, investors:['Gradient Ventures','Fin Capital'] },
  { id:'19', slug:'runsybil', name:'RunSybil', description:'AI Red Teaming', sector:'Security', sectorColor:'#dc2626', stage:'Seed', raised:12, valuation:55, employees:28, founded:2023, isPortfolio:true, investors:['Emergence Capital','Y Combinator'] },
  { id:'20', slug:'evidenza', name:'Evidenza', description:'Market Research AI', sector:'GTM', sectorColor:'#0891b2', stage:'Seed', raised:8, valuation:38, employees:22, founded:2023, isPortfolio:false, investors:['Y Combinator','Pear VC'] },
]

export const SECTORS = [
  { name:'All', color:'currentColor', slug:'', count:20 },
  { name:'Health', color:'#16a34a', slug:'Health', count:4 },
  { name:'Software Impl.', color:'#d97706', slug:'Software', count:3 },
  { name:'Financial', color:'#2563eb', slug:'Financial', count:3 },
  { name:'Legal', color:'#7c3aed', slug:'Legal', count:4 },
  { name:'Security', color:'#dc2626', slug:'Security', count:2 },
  { name:'GTM', color:'#0891b2', slug:'GTM', count:2 },
  { name:'Industrial', color:'#b45309', slug:'Industrial', count:1 },
  { name:'AI Impl.', color:'#15803d', slug:'AI Impl.', count:1 },
]

export function fmt(n: number): string {
  if (!n) return '—'
  if (n >= 1000) return `$${(n/1000).toFixed(1)}B`
  return `$${n}M`
}

export function ini(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
