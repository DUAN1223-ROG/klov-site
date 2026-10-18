// 公開資料：事業體與人物
var SUBS=[
 {id:"strathex",name:"斯塔赫風控顧問",en:"Strathex Tactical Solutions",family:"沃爾特家族",fc:"var(--walter)",type:"風險管理顧問",
  pub:"專為高風險地區的企業與機構提供安全顧問、危機處理與資產保護方案。",
  svcs:["海外據點安全評估與規劃","高風險地區人員防護與撤離方案","危機應變與事件處理","資產保全與押運服務"],
  tiers:[
   ["經營管理層","Management",[["防衛安全執行長","Chief Security & Defense Officer","CSDO","整體策略規劃、任務調度與跨部門協作。"]]]
  ]},
 {id:"gomov",name:"格莫夫租車公司",en:"Gomov",family:"沃爾特家族",fc:"var(--walter)",type:"車輛租賃／貴賓接送",
  pub:"提供車輛租賃、貴賓司機與安全代步服務，據點遍布主要城市與邊境口岸。",
  svcs:["長短期車輛租賃","貴賓專車與司機服務","高規格安全接送","企業車隊管理"],
  tiers:[
   ["經營管理層","Management",[["行動交通部主任","Director of Mobility Operations","DMO","統籌接送任務排程與人員部署，聯繫其他事業體協作。"]]]
  ]},
 {id:"hasov",name:"哈索夫船運",en:"Hasov Shipping",family:"愛德華家族",fc:"var(--edward)",type:"遠洋航運／貨櫃物流",
  pub:"大型物流與海上運輸集團，專營國際貨櫃與遠洋運輸，航線涵蓋全球主要港口。",
  svcs:["國際貨櫃與遠洋運輸","港口代理與通關服務","特殊貨物運輸規劃","海運風險評估"],
  tiers:[
   ["經營管理層","Management",[["海運作戰總監","Maritime Operations Director","MOD","艦隊配置、航線審核與跨境風險評估。"]]]
  ]},
 {id:"siegfried",name:"西格夫快遞",en:"Siegfried Express",family:"摩根家族",fc:"var(--morgan)",type:"高端快遞／特殊貨品運送",
  pub:"主打精準、極速、安全的跨國快遞與特殊貨品運送服務。",
  svcs:["跨國高價值快遞","機密文件與樣本運送","防篡改封裝服務","即時追蹤與通關代辦"],
  tiers:[
   ["經營管理層","Management",[["安全運輸作戰總監","Director of Secure Transport Operations","DSTO","審核特殊快遞項目、設計遞送鏈條。"]]]
  ]}
];

var PEOPLE=[
 {id:"hart-walter",name:"哈特・沃爾特",en:"HART WALTER",family:"沃爾特家族",fc:"var(--walter)",title:"防衛安全執行長",abbr:"CSDO",org:"克洛夫集團 · Strathex Tactical Solutions",img:"hart-walter.webp",layers:{bg:"hart-walter-full-bg.webp",fg:"hart-walter-full-fg.webp"},
  quote:"No limits. No regrets.",
  bio:"沃爾特家族現任代表，集團防衛安全執行長。統籌集團的安全防衛與風險管理體系，並督導 Strathex Tactical Solutions 的營運。",
  facts:[["姓名","HART WALTER（哈特・沃爾特）"],["出生","2003 / 12 / 23（23 歲）"],["國籍","摩納哥"],["家族","沃爾特家族"],["職位","CSDO · 防衛安全執行長"],["督導","Strathex Tactical Solutions"],["三委員會","沃爾特家族代表"]],
  family:[["xia-nian","妻子"]]},
 {id:"xia-nian",name:"夏念",en:"XIA NIAN",family:"沃爾特家族",fc:"var(--walter)",title:"哈特・沃爾特之妻",abbr:"",org:"",img:"xia-nian.webp",face:"50% 31%",layers:{bg:"xia-nian-bg.webp",fg:"xia-nian-fg.webp"},listed:false,
  quote:"",
  bio:"哈特・沃爾特的妻子，台灣出身。不在集團內擔任職務。",
  facts:[["姓名","XIA NIAN（夏念）"],["出生","2005 / 04 / 21（21 歲）"],["國籍","台灣"],["身份","沃爾特家族 · 哈特・沃爾特之妻"]],
  family:[["hart-walter","丈夫"]]}
];
