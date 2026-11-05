/* Static data: foods, goal categories, meal ideas, colors */
const FOODS=`Roti (chapati)|297|9.6|46|7.5|4.9|40
Paratha (plain)|326|7|45|13|3|80
White bread|265|9|49|3.2|2.7|30
Brown bread|247|13|41|3.4|7|30
White rice (cooked)|130|2.7|28|0.3|0.4
Brown rice (cooked)|123|2.7|26|1|1.8
Dal (cooked lentils)|116|9|20|0.4|7.9
Rajma (cooked)|127|8.7|22.8|0.5|6.4
Chole / chickpeas (cooked)|164|8.9|27|2.6|7.6
Paneer|296|18|3.4|23|0
Egg (boiled)|155|13|1.1|11|0|50
Chicken breast (cooked)|165|31|0|3.6|0
Fish (cooked)|140|24|0|4|0
Chicken biryani|160|8|20|5|1
Milk (whole)|61|3.2|4.8|3.3|0
Curd / yogurt|61|3.5|4.7|3.3|0
Greek yogurt|59|10|3.6|0.4|0
Cheese|402|25|1.3|33|0
Oats (dry)|389|16.9|66|6.9|10.6
Poha (cooked)|130|2.6|25|2.5|1.5
Idli|132|4.5|27|0.5|1.5|40
Dosa (plain)|168|3.9|29|3.7|1.2|100
Samosa|262|3.5|24|17|2|60
Banana|89|1.1|23|0.3|2.6|120
Apple|52|0.3|14|0.2|2.4|180
Mango|60|0.8|15|0.4|1.6
Orange|47|0.9|12|0.1|2.4|130
Potato (boiled)|87|1.9|20|0.1|1.8
Sweet potato|86|1.6|20|0.1|3
Spinach (cooked)|23|3|3.8|0.3|2.4
Cauliflower|25|1.9|5|0.3|2
Tomato|18|0.9|3.9|0.2|1.2
Onion|40|1.1|9.3|0.1|1.7
Peanuts|567|26|16|49|8.5
Almonds|579|21|22|50|12.5
Soya chunks (dry)|345|52|33|0.5|13
Tofu|76|8|1.9|4.8|0.3
Whey protein powder|400|80|8|6|0|30
Chai (milk, sugar)|50|1.5|7.5|1.6|0
Sugar|387|0|100|0|0
Ghee|900|0|0|100|0
Butter|717|0.9|0.1|81|0
Cooking oil|884|0|0|100|0
Pizza|266|11|33|10|2.3`;
const KEY='nutri-tracker-v1';
const DEF={goals:{kcal:2000,protein:60,carbs:250,fat:65,fiber:30},log:{},custom:[],profile:null,alerts:{},account:null};
const MEALS=['Breakfast','Lunch','Snack','Dinner'];
const NUT=[['protein','Protein','p','pro'],['carbs','Carbs','c','carb'],['fat','Fat','f','fat'],['fiber','Fiber','fi','fib']];
/* Symbols (emoji) used around the page */
const MEAL_ICON={Breakfast:'🌅',Lunch:'☀️',Snack:'🍎',Dinner:'🌙'};
const NUT_ICON={protein:'💪',carbs:'🌾',fat:'🥑',fiber:'🥦'};
/* Theme options: id, label, preview color. Palettes live in css/themes.css */
const THEMES=[['green','Fresh green','#1F7A4D'],['ocean','Ocean blue','#1F63C4'],['violet','Royal violet','#6B3FC4'],['sunset','Sunset orange','#C2570C'],['rose','Rose pink','#C2305A']];
const MODES=[['light','☀️','Light'],['dark','🌙','Dark'],['auto','💻','Auto']];
/* Site owner shown in the footer. Your name and links are set in js/config.js */
const linkUrl=(k)=>{let v=(MY_LINKS[k]||'').trim();if(!v)return'';
  if(k==='email')return v.startsWith('mailto:')?v:'mailto:'+v;
  if(k==='whatsapp'&&!/^https?:/i.test(v))return 'https://wa.me/'+v.replace(/\D/g,'');
  return /^(https?:|mailto:)/i.test(v)?v:'https://'+v};
const OWNER={name:MY_NAME,socials:[['github','GitHub'],['linkedin','LinkedIn'],['instagram','Instagram'],['x','X'],['facebook','Facebook'],['youtube','YouTube'],['whatsapp','WhatsApp'],['email','Email']].map(([k,label])=>({k,label,url:linkUrl(k)})).filter(s=>s.url)};
const ACT=[['Sedentary (little or no exercise)',1.2],['Light (exercise 1–3 days a week)',1.375],['Moderate (exercise 3–5 days a week)',1.55],['Very active (exercise 6–7 days a week)',1.725]];
const CATS={
 lean:{name:'Lean bulk',adj:.10,prot:1.8,desc:'Slow, steady muscle gain with little fat. About 10% more calories than you burn.'},
 bulk:{name:'Bulk',adj:.18,prot:1.8,desc:'Faster weight and muscle gain. About 18% more calories than you burn.'},
 cut:{name:'Fat loss',adj:-.20,prot:2.0,desc:'Lose fat and keep muscle. About 20% fewer calories than you burn.'},
 keep:{name:'Maintain',adj:0,prot:1.6,desc:'Stay at your current weight.'}
};
const FR=[['Green','#1F7A4D','#7AD9A5'],['Amber','#D9820B','#F6D365'],['Blue','#3B6FD4','#8FB8FF'],['Violet','#8A4FD6','#E0A7FF']];
const LIM={cut:1.05,lean:1.10,bulk:1.20,keep:1.10};
const SUG={
 cut:{Breakfast:['Oats with curd and banana|Oats (dry)*40,Curd / yogurt*150,Banana*1p','Eggs and roti|Egg (boiled)*3p,Roti (chapati)*1p,Tomato*80'],
  Lunch:['Dal, roti and sabzi|Dal (cooked lentils)*200,Roti (chapati)*2p,Cauliflower*150','Chicken, rice and salad|Chicken breast (cooked)*150,White rice (cooked)*120,Tomato*100,Onion*40'],
  Snack:['Greek yogurt and apple|Greek yogurt*150,Apple*1p','Boiled chana|Chole / chickpeas (cooked)*150'],
  Dinner:['Paneer, roti and palak|Paneer*100,Roti (chapati)*2p,Spinach (cooked)*100','Fish and veggies|Fish (cooked)*150,Roti (chapati)*1p,Cauliflower*150']},
 keep:{Breakfast:['Poha with milk|Poha (cooked)*200,Milk (whole)*200','Idli and dal|Idli*4p,Dal (cooked lentils)*150'],
  Lunch:['Rajma chawal|Rajma (cooked)*200,White rice (cooked)*180,Curd / yogurt*100','Roti, dal and paneer|Roti (chapati)*3p,Dal (cooked lentils)*150,Paneer*60'],
  Snack:['Banana and almonds|Banana*1p,Almonds*20','Peanuts and apple|Peanuts*25,Apple*1p'],
  Dinner:['Chicken and roti|Chicken breast (cooked)*150,Roti (chapati)*2p,Spinach (cooked)*100','Soya curry and rice|Soya chunks (dry)*40,White rice (cooked)*150,Tomato*100']},
 gain:{Breakfast:['Oats, milk and banana|Oats (dry)*70,Milk (whole)*300,Banana*2p,Peanuts*20','Eggs and paratha|Egg (boiled)*4p,Paratha (plain)*2p,Milk (whole)*250'],
  Lunch:['Chicken rice bowl|Chicken breast (cooked)*200,White rice (cooked)*300,Dal (cooked lentils)*150','Rajma, rice and paneer|Rajma (cooked)*250,White rice (cooked)*300,Paneer*80,Curd / yogurt*150'],
  Snack:['Whey shake with banana|Whey protein powder*30,Milk (whole)*300,Banana*1p','Peanuts, curd and mango|Peanuts*40,Curd / yogurt*200,Mango*150'],
  Dinner:['Paneer, roti and dal|Paneer*120,Roti (chapati)*3p,Dal (cooked lentils)*200','Fish, rice and veg|Fish (cooked)*200,White rice (cooked)*250,Cauliflower*150,Cooking oil*8']}
};
const SHARE={Breakfast:.25,Lunch:.35,Snack:.10,Dinner:.30};
