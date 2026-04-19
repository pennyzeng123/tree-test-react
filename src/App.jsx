import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Leaf, Wind, Mountain, Waves, SunMedium, MoonStar, RotateCcw, Share2, Download } from "lucide-react";

const DIMENSIONS = ["EI", "SN", "TF", "JP", "CL", "RB"];

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}
function CardHeader({ className = "", children }) {
  return <div className={className}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}
function CardTitle({ className = "", children }) {
  return <h3 className={className}>{children}</h3>;
}
function CardDescription({ className = "", children }) {
  return <p className={className}>{children}</p>;
}
function Button({ className = "", variant = "default", children, ...props }) {
  const base = "inline-flex items-center justify-center border-0 px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50";
  const styles = variant === "outline"
    ? "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
    : variant === "secondary"
    ? "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
    : "bg-[#6F9F78] text-white hover:opacity-90";
  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>;
}
function Badge({ className = "", variant = "default", children }) {
  const styles = variant === "outline"
    ? "border border-zinc-200 bg-white text-zinc-700"
    : variant === "secondary"
    ? "bg-zinc-100 text-zinc-700"
    : "bg-[#EDF4EA] text-[#50624F]";
  return <span className={`inline-flex items-center ${styles} ${className}`}>{children}</span>;
}
function Input({ className = "", ...props }) {
  return <input className={`w-full border border-zinc-200 px-4 py-3 text-base outline-none focus:border-zinc-300 ${className}`} {...props} />;
}
function Progress({ value = 0, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-full bg-zinc-200 ${className}`}>
      <div className="h-full rounded-full bg-gradient-to-r from-[#99BD92] to-[#6E9B75]" style={{ width: `${value}%` }} />
    </div>
  );
}

const TREE_LIBRARY = {
  INTJ: [
    { code: "INTJ-Mountain-Sun", name: "雪松", title: "战略型远望树", vibe: "安静、克制、目标明确，擅长用长线思维搭建自己的森林地图。", gift: "你善于独立判断，也能在混乱中迅速找到最优路径。", advice: "别把所有压力都藏在树干里，偶尔让别人靠近你的枝叶。", keywords: ["理性", "远见", "独立", "秩序"] },
    { code: "INTJ-Mountain-Mist", name: "冷杉", title: "隐秘型规划树", vibe: "你不喜欢高调表达，却总能在沉默中完成精密布局。", gift: "适合复杂项目、系统设计与需要深度思考的工作。", advice: "在重要关系里，多给别人一点你内心世界的入口。", keywords: ["深思", "克制", "系统性", "洞察"] },
    { code: "INTJ-River-Sun", name: "侧柏", title: "进取型执行树", vibe: "你不仅会想，还会推着计划持续向前。", gift: "把理想落实成步骤，是你的天然能力。", advice: "允许计划留一点弹性，变化不一定会破坏结果。", keywords: ["行动", "结构", "目标", "冷静"] },
    { code: "INTJ-River-Mist", name: "银杉", title: "静水型掌控树", vibe: "表面平静，内在强大，对自己的节奏有极高掌控感。", gift: "适合在长期主义中做出稀缺成果。", advice: "别总提前预设他人的不理解，有些连结值得试试。", keywords: ["长期主义", "稳健", "自洽", "清醒"] }
  ],
  INTP: [
    { code: "INTP-Mountain-Sun", name: "白桦", title: "概念型思辨树", vibe: "你喜欢拆解世界，越复杂的命题越能激发你的兴奋。", gift: "抽象思维、创新洞察与独特视角，是你的枝杈。", advice: "别让灵感只停在云层里，试着把它落到地面。", keywords: ["好奇", "逻辑", "创新", "抽象"] },
    { code: "INTP-Mountain-Mist", name: "榉树", title: "隐思型学者树", vibe: "你偏爱独处，常在安静里长出别人想不到的观点。", gift: "适合研究、写作、设计原型与深度创造。", advice: "别等一切都完美才开始表达。", keywords: ["沉浸", "内省", "推演", "灵感"] },
    { code: "INTP-River-Sun", name: "槭树", title: "实验型发明树", vibe: "你擅长边试边改，对未知充满探索欲。", gift: "适合把旧东西玩出新逻辑。", advice: "减少无尽比较，先做出一个可用版本。", keywords: ["实验", "原型", "探索", "巧思"] },
    { code: "INTP-River-Mist", name: "乌桕", title: "游思型灵感树", vibe: "你在自由的思想河流里漂流，常带回稀奇的果实。", gift: "跨学科联想和反常规观察非常突出。", advice: "规律不是束缚，有时是帮你保存灵感的花盆。", keywords: ["跳跃", "自由", "联想", "洞见"] }
  ],
  ENTJ: [
    { code: "ENTJ-Mountain-Sun", name: "铁杉", title: "统筹型领航树", vibe: "你自带推进力，看到目标就想把路线开出来。", gift: "组织、判断与带队能力很强。", advice: "别只顾着抵达，也留意同行者的感受。", keywords: ["领导", "战略", "效率", "果断"] },
    { code: "ENTJ-Mountain-Mist", name: "黑松", title: "强压型主心树", vibe: "你气场很稳，关键时刻很能扛事。", gift: "在高压环境下依然能维持清晰与秩序。", advice: "强大不代表必须永远坚硬。", keywords: ["掌控", "抗压", "决断", "稳场"] },
    { code: "ENTJ-River-Sun", name: "红枫", title: "开拓型进击树", vibe: "你有野心也有行动力，适合开疆拓土。", gift: "把愿景变为成果，是你最亮眼的地方。", advice: "偶尔停一下，确认方向比加速更重要。", keywords: ["冲劲", "执行", "影响力", "扩张"] },
    { code: "ENTJ-River-Mist", name: "白杨", title: "冷锋型推进树", vibe: "你不爱废话，习惯直接推动事情发生。", gift: "危机处理中尤其可靠。", advice: "建立长期信任，需要温度而不只是正确。", keywords: ["效率", "锋利", "推进", "控制力"] }
  ],
  ENTP: [
    { code: "ENTP-Mountain-Sun", name: "胡杨", title: "辩锋型灵感树", vibe: "你脑子转得快，擅长提出新想法与新角度。", gift: "创意、说服力和问题重构能力都很强。", advice: "别让‘有趣’取代了‘完成’。", keywords: ["点子", "机敏", "表达", "突破"] },
    { code: "ENTP-Mountain-Mist", name: "南洋杉", title: "反骨型构想树", vibe: "你不喜欢按现成路径走，总想另辟蹊径。", gift: "适合创新、创业、内容策划。", advice: "真正在意的事，值得更持续地投入。", keywords: ["反常规", "新鲜感", "机智", "挑战"] },
    { code: "ENTP-River-Sun", name: "榆树", title: "冒险型玩心树", vibe: "你喜欢变化、现场感和即时反馈。", gift: "能迅速带活气氛，也擅长把点子拉进现实。", advice: "别让冲动把长期成果吹散。", keywords: ["活跃", "尝试", "即兴", "创造"] },
    { code: "ENTP-River-Mist", name: "猴面包树", title: "游侠型破局树", vibe: "你讨厌停滞，最擅长打破僵局。", gift: "在复杂局面中找到新出口。", advice: "并不是所有约束都在限制你，有些在保护你。", keywords: ["破局", "快反", "聪明", "游走"] }
  ],
  INFJ: [
    { code: "INFJ-Mountain-Sun", name: "椴树", title: "理想型守望树", vibe: "你敏感而坚定，内心常有一种安静的使命感。", gift: "擅长理解深层情绪，也善于看见更远的意义。", advice: "别总替别人消化风雨，也照顾一下自己。", keywords: ["洞察", "共情", "理想", "深度"] },
    { code: "INFJ-Mountain-Mist", name: "榕树", title: "疗愈型倾听树", vibe: "你像森林里的一盏微灯，让人愿意靠近。", gift: "很适合陪伴、创作、咨询和关系经营。", advice: "边界感会让你的温柔更长久。", keywords: ["温柔", "理解", "安定", "陪伴"] },
    { code: "INFJ-River-Sun", name: "月桂", title: "信念型行动树", vibe: "你不是空想，你会为了在意的价值认真做事。", gift: "把理想转为具体实践，是你的稀缺之处。", advice: "允许成果不完美，也是一种前进。", keywords: ["价值感", "坚持", "善意", "落实"] },
    { code: "INFJ-River-Mist", name: "柳杉", title: "静谧型心灵树", vibe: "你的内心世界很深，很少轻易展示全部。", gift: "文字、艺术和情感表达很有感染力。", advice: "你不必永远做那个最懂事的人。", keywords: ["细腻", "深情", "艺术感", "自省"] }
  ],
  INFP: [
    { code: "INFP-Mountain-Sun", name: "樱花", title: "诗意型小森林", vibe: "你内心柔软、想象力丰沛，总在寻找真正打动自己的东西。", gift: "共情、审美与创造力是你最独特的叶脉。", advice: "别总因为怕失真，就迟迟不肯开始。", keywords: ["浪漫", "想象", "真诚", "细腻"] },
    { code: "INFP-Mountain-Mist", name: "银杏", title: "月光型理想树", vibe: "你安静、柔和，却有很坚定的内在价值。", gift: "适合写作、艺术表达与温柔的创造。", advice: "保护敏感的同时，也要练习现实能力。", keywords: ["温柔", "理想主义", "美感", "纯粹"] },
    { code: "INFP-River-Sun", name: "枫树", title: "热心型灵感树", vibe: "当你被点燃时，会带着热情向前跑。", gift: "能把情绪转成作品、故事与感染力。", advice: "不要把一时状态当成全部的自己。", keywords: ["灵感", "热情", "表达", "感受力"] },
    { code: "INFP-River-Mist", name: "垂柳", title: "漂流型心事树", vibe: "你的情绪像水一样细密，会缓缓流过很多地方。", gift: "对他人的处境有天然体会能力。", advice: "先扎根，再做梦，你会更自由。", keywords: ["情绪感知", "温柔", "自我世界", "治愈"] }
  ],
  ENFJ: [
    { code: "ENFJ-Mountain-Sun", name: "朴树", title: "引导型暖阳树", vibe: "你很会看见他人的潜力，也愿意推着大家变好。", gift: "有感染力、组织力与天然的鼓舞能力。", advice: "别总把‘照顾所有人’当成责任。", keywords: ["号召力", "共情", "热心", "凝聚"] },
    { code: "ENFJ-Mountain-Mist", name: "橡树", title: "沉稳型守护树", vibe: "你温暖但不轻浮，像可以让人依靠的大树。", gift: "在关系中具有稳定、修复与协调能力。", advice: "适度表达自己的需求，不会让你变自私。", keywords: ["可靠", "照顾", "协调", "耐心"] },
    { code: "ENFJ-River-Sun", name: "桂花树", title: "感染型发光树", vibe: "你容易把气氛点亮，也擅长让大家一起动起来。", gift: "适合带团队、做内容、做教育与社群。", advice: "不要因为想被理解，就过度消耗自己。", keywords: ["热情", "表达", "带动", "亲和力"] },
    { code: "ENFJ-River-Mist", name: "香樟", title: "深情型连接树", vibe: "你很懂关系流动，也很重视人与人之间的温度。", gift: "建立长期信任是你的天赋。", advice: "不是所有关系都值得你投入同样强度。", keywords: ["连接", "理解", "投入", "温度"] }
  ],
  ENFP: [
    { code: "ENFP-Mountain-Sun", name: "桃树", title: "灵动型发芽树", vibe: "你像春天里突然窜出来的一阵风，生动、鲜活又有感染力。", gift: "创意、热情和让人感到被看见的能力都很强。", advice: "真正喜欢的事，别只点燃它，也要养大它。", keywords: ["活力", "创造", "热情", "感染力"] },
    { code: "ENFP-Mountain-Mist", name: "海棠", title: "浪漫型冒险树", vibe: "你敏感又好奇，对人和世界都保有热烈期待。", gift: "很会把生活变得有趣，也常带来新鲜可能。", advice: "别被太多可能性拖住，先抓住最想要的那个。", keywords: ["浪漫", "好奇", "变化", "感染"] },
    { code: "ENFP-River-Sun", name: "梅树", title: "燃点型自由树", vibe: "你热烈、轻快，靠兴趣和意义驱动自己。", gift: "在人、内容与创意场景中很能发光。", advice: "自由不等于散落，找到节奏会更有力量。", keywords: ["自由", "发散", "热烈", "灵感"] },
    { code: "ENFP-River-Mist", name: "蓝花楹", title: "梦游型童话树", vibe: "你保有一种孩子气的想象，也有柔软的情感触角。", gift: "适合创作、美学、品牌表达与情绪价值类工作。", advice: "别急着证明自己，先让自己稳定下来。", keywords: ["梦感", "艺术气质", "温柔", "灵动"] }
  ],
  ISTJ: [
    { code: "ISTJ-Mountain-Sun", name: "松树", title: "秩序型根系树", vibe: "你务实、可靠、讲原则，像森林里的稳定地基。", gift: "执行力、责任感和持续性极强。", advice: "规则之外，也可以给自己一点柔软空间。", keywords: ["责任", "稳定", "秩序", "可靠"] },
    { code: "ISTJ-Mountain-Mist", name: "柏树", title: "克制型守序树", vibe: "你不喜欢张扬，更偏爱把事做好。", gift: "在细节、流程与长期维护上非常值得信任。", advice: "别把情绪都留给自己默默消化。", keywords: ["谨慎", "踏实", "稳重", "细致"] },
    { code: "ISTJ-River-Sun", name: "落羽杉", title: "实干型耐久树", vibe: "你行动朴实，不夸张，却能一直做到位。", gift: "适合任何需要稳定产出的长期任务。", advice: "偶尔也试着拥抱变化带来的新方法。", keywords: ["耐性", "实作", "稳健", "责任心"] },
    { code: "ISTJ-River-Mist", name: "铁木", title: "沉稳型基石树", vibe: "你像一棵静静站着的树，让人觉得安心。", gift: "能替团队接住很多现实层面的东西。", advice: "你不必总靠‘能扛’来证明价值。", keywords: ["基石", "稳住", "抗压", "务实"] }
  ],
  ISFJ: [
    { code: "ISFJ-Mountain-Sun", name: "白蜡树", title: "照料型温柔树", vibe: "你细腻体贴，常把周围人的需要放在心上。", gift: "照顾、陪伴、执行细节都很可靠。", advice: "别因为怕麻烦别人，就忽略了自己。", keywords: ["体贴", "耐心", "照顾", "安稳"] },
    { code: "ISFJ-Mountain-Mist", name: "山茶树", title: "安静型守护树", vibe: "你柔和低调，却能提供稳定的情绪容器。", gift: "适合幕后支持、关系维护与细致服务。", advice: "不需要所有人都满意，你也值得被理解。", keywords: ["温和", "细致", "贴心", "守护"] },
    { code: "ISFJ-River-Sun", name: "茶树", title: "亲和型陪伴树", vibe: "你让人感觉舒服，容易建立亲近感。", gift: "适合教育、社群、用户体验与服务型场景。", advice: "请把你的需求说出来，而不是等别人发现。", keywords: ["陪伴", "友善", "稳定", "细心"] },
    { code: "ISFJ-River-Mist", name: "香榧树", title: "默默型付出树", vibe: "你不爱抢风头，但总会默默把空缺补上。", gift: "长期照护与支持能力很强。", advice: "有边界的温柔，才不会把自己耗空。", keywords: ["付出", "安静", "稳妥", "关怀"] }
  ],
  ESTJ: [
    { code: "ESTJ-Mountain-Sun", name: "栎树", title: "管理型骨干树", vibe: "你讲效率、重规则，擅长把事安排得明明白白。", gift: "组织与推进现实任务非常有力。", advice: "在正确之外，也别忽略关系里的柔韧。", keywords: ["管理", "秩序", "执行", "直接"] },
    { code: "ESTJ-Mountain-Mist", name: "栓皮栎", title: "强稳型规训树", vibe: "你在混乱场合很有定盘星作用。", gift: "擅长兜底、纠偏与建立标准。", advice: "给别人一点尝试空间，结果也许更好。", keywords: ["规则", "稳场", "果断", "责任"] },
    { code: "ESTJ-River-Sun", name: "黄连木", title: "推进型行动树", vibe: "你看不得拖沓，一旦定目标就会全速前进。", gift: "非常适合项目推进与资源协调。", advice: "快是一种能力，听也是一种能力。", keywords: ["高效", "执行力", "结果导向", "担当"] },
    { code: "ESTJ-River-Mist", name: "柚木", title: "压舱型实务树", vibe: "你稳、狠、准，做事不拖泥带水。", gift: "在现实业务和复杂协作中极有价值。", advice: "别总用高标准要求每一个人。", keywords: ["现实", "判断", "落地", "压舱石"] }
  ],
  ESFJ: [
    { code: "ESFJ-Mountain-Sun", name: "紫薇", title: "社交型迎宾树", vibe: "你亲和、体贴，很会让人感到被欢迎。", gift: "照顾场面、人际协调与氛围维护很强。", advice: "别总从外界反馈里确认自我价值。", keywords: ["热情", "社交", "照顾", "协调"] },
    { code: "ESFJ-Mountain-Mist", name: "木棉", title: "温厚型联结树", vibe: "你重感情，做事有分寸，也愿意为关系付出。", gift: "很适合团队协作、社群经营与公共沟通。", advice: "过度迎合会让你忘了自己本来的节奏。", keywords: ["人情味", "亲切", "细腻", "稳定关系"] },
    { code: "ESFJ-River-Sun", name: "梨树", title: "热场型发光树", vibe: "你天生会制造温暖和热闹。", gift: "适合活动、内容、服务与对外表达。", advice: "不是每个场合都需要你负责照亮。", keywords: ["活络", "关怀", "表达", "氛围感"] },
    { code: "ESFJ-River-Mist", name: "苹果树", title: "柔光型陪伴树", vibe: "你对关系很认真，也很懂得维持细水长流。", gift: "擅长让关系有温度、有延续。", advice: "真正亲近的人，也该理解你的疲惫。", keywords: ["陪伴", "认真", "温柔", "维系"] }
  ],
  ISTP: [
    { code: "ISTP-Mountain-Sun", name: "油松", title: "冷静型工匠树", vibe: "你偏好实操和真实反馈，擅长用手与脑一起解决问题。", gift: "判断准确、动手强、临场反应快。", advice: "别总把情感话题推迟处理。", keywords: ["实作", "冷静", "独立", "解决问题"] },
    { code: "ISTP-Mountain-Mist", name: "云杉", title: "独行型修理树", vibe: "你沉默但敏锐，不爱多说，擅长把东西修好。", gift: "适合技术、工艺、模型、运动与现场处理。", advice: "有些关系也需要像维修一样定期维护。", keywords: ["技术感", "低调", "敏锐", "实战"] },
    { code: "ISTP-River-Sun", name: "马尾松", title: "即应型冒险树", vibe: "你喜欢自由、刺激和变化中的判断。", gift: "危机反应和即刻决策非常出色。", advice: "别让‘现在舒服’挤掉了长期规划。", keywords: ["冒险", "快反", "自由", "灵活"] },
    { code: "ISTP-River-Mist", name: "水杉", title: "游离型观察树", vibe: "你不吵闹，但总能从边缘看清关键。", gift: "适合观察、拆解与独立完成高质量工作。", advice: "主动表达需求，会让合作更省力。", keywords: ["观察", "边界", "效率", "独处"] }
  ],
  ISFP: [
    { code: "ISFP-Mountain-Sun", name: "花楸", title: "感受型美学树", vibe: "你安静却有审美锋芒，对‘好不好看、舒不舒服’很敏锐。", gift: "美感、手作、空间感和情绪表达都很突出。", advice: "别总等感觉刚刚好，先让作品出现。", keywords: ["审美", "感受力", "温柔", "创作"] },
    { code: "ISFP-Mountain-Mist", name: "桃金娘", title: "月影型小艺树", vibe: "你低调、细腻，有自己的情绪颜色。", gift: "很适合视觉表达、手工、音乐与生活美学。", advice: "柔软不等于退让，你也可以坚定。", keywords: ["细腻", "审美取向", "柔和", "独特"] },
    { code: "ISFP-River-Sun", name: "垂丝海棠", title: "自由型感官树", vibe: "你喜欢真实可感的生活片刻，不爱被硬性束缚。", gift: "擅长把日常过得有质感，也能把感觉转成作品。", advice: "建立一点结构，会让自由更持久。", keywords: ["自由", "感官", "当下", "真实"] },
    { code: "ISFP-River-Mist", name: "山楂树", title: "温流型小梦树", vibe: "你像一条安静的光带，不张扬，却自有氛围。", gift: "对情绪和环境的微妙变化非常敏锐。", advice: "不要把沉默当成唯一的保护方式。", keywords: ["氛围感", "轻柔", "艺术气质", "敏感"] }
  ],
  ESTP: [
    { code: "ESTP-Mountain-Sun", name: "龙爪槐", title: "现场型冒险树", vibe: "你反应快、胆子大，喜欢立即进入真实场景。", gift: "应变、社交与行动力都非常突出。", advice: "刺激之外，也要给未来留点筹码。", keywords: ["行动派", "机动", "胆识", "现场感"] },
    { code: "ESTP-Mountain-Mist", name: "赤松", title: "酷感型闯关树", vibe: "你有点锋利，也很会判断什么时候该出手。", gift: "危机处理、谈判和快速推进都很有优势。", advice: "强势之外，真诚会让你更耐久。", keywords: ["直觉快", "果断", "敢冲", "现实感"] },
    { code: "ESTP-River-Sun", name: "火棘", title: "高燃型热场树", vibe: "你像运动中的风，擅长把局面带热。", gift: "适合销售、活动、创意执行和需要快节奏反馈的场景。", advice: "别把‘现在快乐’当成唯一准则。", keywords: ["外向", "带动", "刺激", "执行"] },
    { code: "ESTP-River-Mist", name: "黑榄树", title: "游击型破风树", vibe: "你喜欢边走边看，凭经验快速修正路线。", gift: "适合复杂现场与强互动工作。", advice: "别总在最后一刻才认真。", keywords: ["临场", "灵活", "速度", "挑战"] }
  ],
  ESFP: [
    { code: "ESFP-Mountain-Sun", name: "珊瑚树", title: "快乐型派对树", vibe: "你生动、明亮、有感染力，喜欢把开心变得可见。", gift: "表现力、亲和力和现场氛围感超强。", advice: "别只在热闹里发光，也试着安静地扎根。", keywords: ["热闹", "可爱", "表达", "亲近感"] },
    { code: "ESFP-Mountain-Mist", name: "柠檬树", title: "甜感型闪亮树", vibe: "你很会照亮别人，也很在意彼此当下的感受。", gift: "适合内容、演绎、社交与生活方式表达。", advice: "外界喜欢你很重要，但你喜欢自己更重要。", keywords: ["可亲", "美感", "温暖", "表现力"] },
    { code: "ESFP-River-Sun", name: "甜橙树", title: "活力型蹦跳树", vibe: "你喜欢自由流动的快乐，也有让人放松的本事。", gift: "适合社群、品牌、娱乐、创意执行与体验设计。", advice: "给自己一点长期目标，会更有安全感。", keywords: ["元气", "自然社交", "轻快", "体验感"] },
    { code: "ESFP-River-Mist", name: "椰子树", title: "柔亮型氛围树", vibe: "你热爱好看的、好玩的、让人心情变好的东西。", gift: "能让空间和关系都变得更有温度。", advice: "别怕安静，安静不会削弱你的魅力。", keywords: ["氛围感", "治愈", "活泼", "亲切"] }
  ]
};

const SPECIAL_RESULTS = {
  balance: { code: "SPECIAL-BALANCE", name: "凤凰木", title: "稀有型平衡树", vibe: "你在多种维度上都比较均衡，不喜欢被单一标签定义。", gift: "适应力、整合力、同理与判断兼具。", advice: "平衡是天赋，也别忘了明确自己的真正偏好。", keywords: ["平衡", "包容", "多面", "整合"] },
  intensity: { code: "SPECIAL-INTENSITY", name: "玉兰树", title: "稀有型高能树", vibe: "你的性格张力很强，偏好非常鲜明，像一场会发光的天气。", gift: "目标感、感染力、推动力都很惊人。", advice: "强烈不是问题，学会收放会让你更厉害。", keywords: ["高能", "鲜明", "强驱动", "存在感"] }
};

const ALL_TREE_RESULTS = [...Object.values(TREE_LIBRARY).flat(), SPECIAL_RESULTS.balance, SPECIAL_RESULTS.intensity];

// 🌳 真实树图片映射（已接入）
const TREE_IMAGES = {
  "银杏": "https://source.unsplash.com/800x600/?ginkgo,tree",
  "樱花": "https://source.unsplash.com/800x600/?cherry-blossom,tree",
  "松树": "https://source.unsplash.com/800x600/?pine,tree",
  "枫树": "https://source.unsplash.com/800x600/?maple,tree",
  "榕树": "https://source.unsplash.com/800x600/?banyan,tree",
  "白桦": "https://source.unsplash.com/800x600/?birch,tree",
  "橡树": "https://source.unsplash.com/800x600/?oak,tree",
  "杉树": "https://source.unsplash.com/800x600/?cedar,tree",
  "柳树": "https://source.unsplash.com/800x600/?willow,tree",
  "椰子树": "https://source.unsplash.com/800x600/?coconut-tree",
  "棕榈树": "https://source.unsplash.com/800x600/?palm-tree",
  "苹果树": "https://source.unsplash.com/800x600/?apple-tree",
  "梨树": "https://source.unsplash.com/800x600/?pear-tree",
  "桃树": "https://source.unsplash.com/800x600/?peach-tree",
  "榆树": "https://source.unsplash.com/800x600/?elm-tree",
  "槐树": "https://source.unsplash.com/800x600/?locust-tree",
  "紫薇": "https://source.unsplash.com/800x600/?crape-myrtle",
  "木棉": "https://source.unsplash.com/800x600/?kapok-tree",
  "合欢树": "https://source.unsplash.com/800x600/?silk-tree",
  "香樟": "https://source.unsplash.com/800x600/?camphor-tree",
  "雪松": "https://source.unsplash.com/800x600/?cedar-tree",
  "云杉": "https://source.unsplash.com/800x600/?spruce-tree",
  "冷杉": "https://source.unsplash.com/800x600/?fir-tree",
  "红枫": "https://source.unsplash.com/800x600/?red-maple",
  "白杨": "https://source.unsplash.com/800x600/?poplar-tree",
  "胡杨": "https://source.unsplash.com/800x600/?populus-euphratica",
  "榉树": "https://source.unsplash.com/800x600/?zelkova-tree",
  "乌桕": "https://source.unsplash.com/800x600/?tallow-tree",
  "垂柳": "https://source.unsplash.com/800x600/?weeping-willow",
  "桂花树": "https://source.unsplash.com/800x600/?osmanthus-tree",
  "海棠": "https://source.unsplash.com/800x600/?crabapple-tree",
  "梅树": "https://source.unsplash.com/800x600/?plum-tree",
  "蓝花楹": "https://source.unsplash.com/800x600/?jacaranda-tree",
  "松树": "https://source.unsplash.com/800x600/?pine,tree"
};

const TREE_CARD_PREVIEWS = [
  { mbti: "INFJ", name: "椴树", note: "温柔的洞察者" },
  { mbti: "ENFP", name: "桃树", note: "把生活变成游戏" },
  { mbti: "INTP", name: "白桦", note: "在自己的宇宙里" },
  { mbti: "ENTJ", name: "铁杉", note: "目标清晰，带队发光" },
  { mbti: "ISFP", name: "花楸", note: "安静的美学家" },
  { mbti: "ENTP", name: "胡杨", note: "让可能性发生" },
  { mbti: "INFP", name: "垂柳", note: "用想象拥抱世界" },
  { mbti: "ISTJ", name: "松树", note: "值得信赖的力量" }
];

const ENCOURAGEMENTS = {
  INTJ: ["你不用为了显得柔和而放弃锋芒，你的清醒本来就是一种珍贵的能力。", "长线思考不是冷淡，是你在认真替未来铺路。慢一点，也依然在前进。", "不是所有人都能立刻读懂你，但真正重要的人，会看见你的稳和深。", "你不用事事自己扛。偶尔把枝叶张开，让别人也靠近你的世界。"],
  INTP: ["你的想法不是太飘，而是太有层次。别急着否定它们，先让它们落地看看。", "你在脑海里走过的路，很多人一生都没去过。你的思考很有价值。", "慢热不等于迟钝，你只是习惯先和世界认真相处，再给出回答。", "灵感不需要一次就完整，先长出第一片叶子，森林会慢慢形成。"],
  ENTJ: ["你有带路的能力，也值得拥有被理解的时刻，不必永远只做发号施令的人。", "你的果断不是生硬，而是知道方向以后愿意承担结果。", "野心并不吓人，真正难得的是你愿意把理想真的做出来。", "偶尔停一下不是退后，而是在确认这条路仍然值得你继续发光。"],
  ENTP: ["你的跳跃不是分散，而是天生会看见别人没想到的入口。", "别担心自己太不按常理出牌，很多新东西本来就不是从旧路长出来的。", "你可以一边好玩，一边认真。真正厉害的灵感，也值得被完成。", "你的脑袋像风，吹得很远。记得偶尔把好点子抱回地面。"],
  INFJ: ["你不是太敏感，你只是很早就能听见别人还没说出口的风声。", "愿你在照亮别人的同时，也记得给自己留一盏灯。", "你的温柔不是退让，而是一种很安静但很坚定的力量。", "别急着把自己藏好。真正理解你的人，会珍惜你这片深深的森林。"],
  INFP: ["你不需要赶着长成现实定义里的样子，你本来就有自己的季节。", "你的柔软不是脆弱，而是仍然愿意认真感受这个世界。", "请继续相信那些微小的心动，它们会带你走到真正喜欢的地方。", "先保护你的内心，再慢慢把想象种出来。你会长成很特别的一棵树。"],
  ENFJ: ["你有把别人点亮的能力，也值得被同样温柔地接住。", "你的热情不是讨好，而是很真诚地想让世界变好一点。", "别总把照顾所有人当成任务，你自己也需要被好好安放。", "你天生会连接人心，这份能力很稀有，也很珍贵。"],
  ENFP: ["你不是太跳脱，你只是还保有一颗会发芽的心。", "你的热烈很珍贵，它能把灰扑扑的日子也照出一点颜色。", "别怕自己变化快，那说明你一直在向真正喜欢的地方靠近。", "愿你一边自由地长，一边也找到能让自己安心扎根的土壤。"],
  ISTJ: ["你的稳定不是无趣，是很多人遇到风的时候最需要的依靠。", "慢慢做、稳稳长，从来都不是落后，而是你最可靠的节奏。", "你认真对待每一件事的样子，本身就很值得被看见。", "别担心自己不够耀眼，扎得深的树，本来就不靠喧哗证明自己。"],
  ISFJ: ["你总能注意到别人忽略的小地方，这份体贴本身就很动人。", "你的温柔不是理所当然，它是你认真生活后长出来的光。", "别忘了，你也值得被照顾，而不是永远只做那个照顾别人的人。", "愿你在守护别人的时候，也能留一块柔软的位置给自己。"],
  ESTJ: ["你不是太强势，你只是习惯在混乱里把秩序重新扶起来。", "能把事情稳稳推进的人，本来就很厉害。你的价值很实在。", "别担心自己不够柔，你的可靠感本身就让人安心。", "学会偶尔放松一下，你不会因此失去掌控，反而会更从容。"],
  ESFJ: ["你会把人和人之间的温度照顾得刚刚好，这种能力非常难得。", "你的热情不是表面功夫，而是真的希望每个人都被温柔对待。", "不用总从别人的反馈里找答案，你本身就已经很好。", "愿你在照顾氛围的时候，也能放心做回自己。"],
  ISTP: ["你不爱说太多，但你总有办法把问题真的解决掉。", "你的冷静不是疏离，而是在关键时刻很能稳住局面。", "你有自己的观察和节奏，不需要为了热闹去改变自己。", "愿你在独处和行动之间，继续长成一棵很自在的树。"],
  ISFP: ["你的审美和感受力不是小题大做，而是你看世界的天赋。", "你不必大声证明自己，安静地做喜欢的事也很有力量。", "那些你认真感受过的瞬间，都会慢慢变成你的作品和光。", "愿你一边保留柔软，一边更坚定地站在自己喜欢的世界里。"],
  ESTP: ["你有很强的现场感，也有把机会抓在手里的本事。", "你的大胆不是鲁莽，而是敢于真的走进生活里。", "你会在变化里找到路，这是很多人做不到的天赋。", "愿你在尽兴向前的时候，也慢慢积累属于自己的底气。"],
  ESFP: ["你会让周围的人松一口气，这种轻盈和明亮非常珍贵。", "你的快乐不是浅，它能真实地把别人从灰心里拉出来。", "别怕安静下来，你的魅力不会消失，它只是换一种方式发光。", "愿你一直保留热情，也拥有被温柔拥抱的安全感。"],
  SPECIAL: ["你不必急着把自己归类得很清楚，多面本身就是一种天赋。", "你的复杂和丰富，不是问题，是你独特的生长纹理。", "有些人像一棵树，有些人像一整片森林。你更像后者。", "愿你允许自己不只是一种样子，因为你本来就不止一种光。"]
};

const QUESTIONS = [
  { id: 1, text: "在聚会里，你通常会：", options: [{ text: "主动和很多人打招呼", effect: { EI: 2 } }, { text: "先观察气氛，再慢慢融入", effect: { EI: -1 } }, { text: "更想和熟人或自己待着", effect: { EI: -2 } }] },
  { id: 2, text: "做决定时，你更依赖：", options: [{ text: "客观逻辑和效率", effect: { TF: 2 } }, { text: "现实与感受都看", effect: { TF: 0 } }, { text: "人的感受和价值", effect: { TF: -2 } }] },
  { id: 3, text: "你更喜欢哪种工作状态？", options: [{ text: "有明确计划和节点", effect: { JP: 2 } }, { text: "大方向固定，过程灵活", effect: { JP: 0 } }, { text: "边做边看，保留变化", effect: { JP: -2 } }] },
  { id: 4, text: "当你接触新事物时，更容易先注意到：", options: [{ text: "具体细节、可操作性", effect: { SN: -2 } }, { text: "整体感觉和大概结构", effect: { SN: 0 } }, { text: "背后的意义与可能性", effect: { SN: 2 } }] },
  { id: 5, text: "别人通常觉得你：", options: [{ text: "外放直接，很有存在感", effect: { EI: 2, CL: 1 } }, { text: "温和自然，不难靠近", effect: { EI: 0, RB: -1 } }, { text: "安静克制，有点神秘", effect: { EI: -2, CL: -1 } }] },
  { id: 6, text: "面对压力时，你更容易：", options: [{ text: "立刻行动，把问题拆开", effect: { TF: 1, JP: 1, CL: 1 } }, { text: "先消化情绪，再处理", effect: { TF: -1, CL: -1 } }, { text: "暂时回避，等状态回来", effect: { JP: -1, RB: 1 } }] },
  { id: 7, text: "你更像哪一种旅行者？", options: [{ text: "提前做好攻略和清单", effect: { JP: 2, SN: -1 } }, { text: "定好核心点，其余随缘", effect: { JP: 0, RB: 0 } }, { text: "临时起意最有意思", effect: { JP: -2, RB: 1 } }] },
  { id: 8, text: "别人来找你倾诉时，你更可能：", options: [{ text: "帮他分析怎么解决", effect: { TF: 2 } }, { text: "先听，再看他需要什么", effect: { TF: 0 } }, { text: "重点共情，让他被理解", effect: { TF: -2 } }] },
  { id: 9, text: "你更容易被什么打动？", options: [{ text: "真实有效、做得漂亮", effect: { SN: -1, TF: 1 } }, { text: "有意义、有想象空间", effect: { SN: 2, TF: -1 } }, { text: "温暖细节和情绪氛围", effect: { TF: -2, CL: -1 } }] },
  { id: 10, text: "对你来说，‘自由’更像：", options: [{ text: "自己掌控节奏和方向", effect: { JP: 1, EI: -1 } }, { text: "可以随时改变想法", effect: { JP: -2 } }, { text: "做符合内心价值的事", effect: { TF: -1, SN: 1 } }] },
  { id: 11, text: "你更相信：", options: [{ text: "经验和现实会告诉我答案", effect: { SN: -2 } }, { text: "灵感和趋势也很重要", effect: { SN: 2 } }, { text: "两者都要看具体情况", effect: { SN: 0 } }] },
  { id: 12, text: "你在团队里更常扮演：", options: [{ text: "组织推进的人", effect: { EI: 1, JP: 2 } }, { text: "提出新点子的人", effect: { SN: 2, JP: -1 } }, { text: "稳定支持的人", effect: { TF: -1, SN: -1 } }] },
  { id: 13, text: "面对冲突时，你更倾向：", options: [{ text: "直接说清楚", effect: { EI: 1, TF: 2 } }, { text: "先缓和气氛", effect: { TF: -2 } }, { text: "先躲开，等双方冷静", effect: { EI: -1, RB: 1 } }] },
  { id: 14, text: "下列哪种描述更像你？", options: [{ text: "我喜欢把事情做到稳妥", effect: { JP: 2, CL: -1 } }, { text: "我喜欢保留空间和惊喜", effect: { JP: -2, RB: 1 } }, { text: "我会看心情切换模式", effect: { JP: 0 } }] },
  { id: 15, text: "你的灵感更常来自：", options: [{ text: "现实观察和经验积累", effect: { SN: -2 } }, { text: "跳跃联想和未来想象", effect: { SN: 2 } }, { text: "情绪、审美和氛围", effect: { SN: 1, TF: -1 } }] },
  { id: 16, text: "你理想中的朋友关系是：", options: [{ text: "各自独立但彼此尊重", effect: { EI: -1, TF: 1 } }, { text: "能够频繁互动、一起热闹", effect: { EI: 2 } }, { text: "深度理解、稳定陪伴", effect: { TF: -1, RB: -1 } }] },
  { id: 17, text: "你对‘规则’的感受是：", options: [{ text: "规则能保证效率与公平", effect: { JP: 2, TF: 1 } }, { text: "能用就用，不必太死", effect: { JP: 0 } }, { text: "太多规则会压住活力", effect: { JP: -2 } }] },
  { id: 18, text: "你更像哪种天气？", options: [{ text: "晴天，明亮直接", effect: { CL: 2 } }, { text: "阴天，安静柔和", effect: { CL: -2 } }, { text: "多云，随时变化", effect: { CL: 0, RB: 1 } }] },
  { id: 19, text: "你处理日常的方式更偏向：", options: [{ text: "稳定规律，先做好基本盘", effect: { RB: -2, JP: 1 } }, { text: "灵活流动，跟感觉调整", effect: { RB: 2, JP: -1 } }, { text: "看阶段，有时稳有时动", effect: { RB: 0 } }] },
  { id: 20, text: "你更在意一件事的：", options: [{ text: "结果是否高效有效", effect: { TF: 2 } }, { text: "过程是否真实舒服", effect: { TF: -1, RB: -1 } }, { text: "意义是否足够打动我", effect: { TF: -1, SN: 1 } }] },
  { id: 21, text: "如果要开启一个新计划，你更想先做什么？", options: [{ text: "列结构、排优先级", effect: { JP: 2 } }, { text: "先找感觉和灵感", effect: { SN: 1, TF: -1 } }, { text: "先试一下再说", effect: { JP: -2, RB: 1 } }] },
  { id: 22, text: "你在人群中的能量状态更像：", options: [{ text: "越多人越来劲", effect: { EI: 2, CL: 1 } }, { text: "看熟悉程度决定", effect: { EI: 0 } }, { text: "待久了会想撤退", effect: { EI: -2 } }] },
  { id: 23, text: "当计划被打乱时，你通常：", options: [{ text: "会有点烦，想尽快重整", effect: { JP: 2, CL: -1 } }, { text: "觉得也许会有新可能", effect: { JP: -1, RB: 1 } }, { text: "先感受一下，再决定怎么做", effect: { TF: -1 } }] },
  { id: 24, text: "你更想成为哪种树？", options: [{ text: "高高站着，能看得很远", effect: { SN: 1, TF: 1, CL: 1 } }, { text: "枝叶柔软，让人想靠近", effect: { TF: -2, CL: -1 } }, { text: "会随风摆动，自由生长", effect: { RB: 2, JP: -1 } }] }
];

function getMbti(scores) {
  const E = scores.EI >= 0 ? "E" : "I";
  const N = scores.SN >= 0 ? "N" : "S";
  const T = scores.TF >= 0 ? "T" : "F";
  const J = scores.JP >= 0 ? "J" : "P";
  return `${E}${N}${T}${J}`;
}

function getSubtype(scores) {
  const climate = scores.CL >= 0 ? "Sun" : "Mist";
  const rhythm = scores.RB >= 0 ? "River" : "Mountain";
  return { climate, rhythm, index: `${rhythm}-${climate}` };
}

function getResult(answers) {
  const scores = { EI: 0, SN: 0, TF: 0, JP: 0, CL: 0, RB: 0 };
  answers.forEach((optionIndex, i) => {
    const option = QUESTIONS[i].options[optionIndex];
    Object.entries(option.effect).forEach(([k, v]) => {
      scores[k] += v;
    });
  });

  const mbti = getMbti(scores);
  const subtype = getSubtype(scores);
  const balanceCheck = Object.values(scores).every((v) => Math.abs(v) <= 2);
  const intensityCheck = [scores.EI, scores.SN, scores.TF, scores.JP].filter((v) => Math.abs(v) >= 7).length >= 3;

  let result;
  if (balanceCheck) result = SPECIAL_RESULTS.balance;
  else if (intensityCheck) result = SPECIAL_RESULTS.intensity;
  else {
    const list = TREE_LIBRARY[mbti];
    result = list.find((item) => item.code.includes(subtype.index)) || list[0];
  }

  return { result, scores, mbti, subtype };
}

function scorePercent(v) {
  return Math.max(0, Math.min(100, 50 + v * 6));
}

function dimensionLabel(key, value) {
  const labels = {
    EI: value >= 0 ? "外向 E" : "内向 I",
    SN: value >= 0 ? "直觉 N" : "实感 S",
    TF: value >= 0 ? "思考 T" : "情感 F",
    JP: value >= 0 ? "判断 J" : "感知 P",
    CL: value >= 0 ? "晴光型" : "雾感型",
    RB: value >= 0 ? "流动型" : "山系型"
  };
  return labels[key];
}

function pickEncouragement(finalData, name) {
  const pool = ENCOURAGEMENTS[finalData?.mbti] || ENCOURAGEMENTS.SPECIAL;
  const values = Object.values(finalData?.scores || {}).reduce((sum, v) => sum + Math.abs(v), 0);
  const line = pool[values % pool.length];
  return `${name ? `${name}，` : ""}${line}`;
}

function generateTreeCardSvg(finalData, userName) {
  const title = `${userName ? `${userName} · ` : ""}${finalData.result.name}`;
  const subtitle = finalData.result.title;
  const mbti = `MBTI：${finalData.mbti}`;
  const line1 = finalData.result.vibe;
  const line2 = `关键词：${finalData.result.keywords.join(" / ")}`;
  const line3 = pickEncouragement(finalData, userName);

  const escapeXml = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eef6ea"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f7fbf4"/>
        <stop offset="100%" stop-color="#edf6e9"/>
      </linearGradient>
    </defs>
    <rect width="1080" height="1350" rx="48" fill="url(#bg)"/>
    <rect x="54" y="54" width="972" height="1242" rx="40" fill="#ffffff" opacity="0.92"/>
    <text x="540" y="120" text-anchor="middle" font-size="28" fill="#6c776c" font-family="Arial, PingFang SC, Microsoft YaHei">你是一棵什么类型的树？</text>
    <text x="540" y="160" text-anchor="middle" font-size="20" fill="#8a9588" font-family="Arial, PingFang SC, Microsoft YaHei">抱抱小树</text>
    <text x="540" y="235" text-anchor="middle" font-size="64" font-weight="700" fill="#263126" font-family="Arial, PingFang SC, Microsoft YaHei">${escapeXml(title)}</text>
    <text x="540" y="295" text-anchor="middle" font-size="30" fill="#5d6a5d" font-family="Arial, PingFang SC, Microsoft YaHei">${escapeXml(subtitle)}</text>

    <rect x="140" y="360" width="800" height="120" rx="28" fill="url(#panel)"/>
    <text x="540" y="432" text-anchor="middle" font-size="32" fill="#3f6e4b" font-family="Arial, PingFang SC, Microsoft YaHei">${escapeXml(mbti)}</text>

    <rect x="140" y="530" width="800" height="160" rx="28" fill="#f9fbf7"/>
    <text x="540" y="610" text-anchor="middle" font-size="30" fill="#4e5b4c" font-family="Arial, PingFang SC, Microsoft YaHei">${escapeXml(line1)}</text>

    <rect x="140" y="740" width="800" height="120" rx="28" fill="#eef6ea"/>
    <text x="540" y="812" text-anchor="middle" font-size="26" fill="#607060" font-family="Arial, PingFang SC, Microsoft YaHei">${escapeXml(line2)}</text>

    <rect x="120" y="920" width="840" height="220" rx="32" fill="#e8f4e3"/>
    <foreignObject x="160" y="980" width="760" height="120">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial, PingFang SC, Microsoft YaHei; color:#3f6e4b; font-size:28px; line-height:1.75; text-align:center;">
        <div>${escapeXml(line3)}</div>
      </div>
    </foreignObject>

    <text x="540" y="1280" text-anchor="middle" font-size="20" fill="#8a9588" font-family="Arial, PingFang SC, Microsoft YaHei">本测试仅做参考，设计开发：一个叫抱抱小树的潮玩IP</text>
  </svg>`;
}

function getTreeCardDataUrl(finalData, userName) {
  const svg = generateTreeCardSvg(finalData, userName);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function PreviewCard({ item }) {
  return (
    <div className="rounded-[28px] border border-[#D9DFD3] bg-white/82 p-4 text-center shadow-sm shadow-zinc-200/30">
      <div className="mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: "#A7CBA0" }}>
        {item.mbti}
      </div>
      <div className="mt-1 text-xl font-semibold text-[#55623E]">{item.name}</div>
      <div className="mt-2 text-sm text-zinc-500">{item.note}</div>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [hugging, setHugging] = useState(false);
  const [treeCardUrl, setTreeCardUrl] = useState("");

  const previewTreeNames = ALL_TREE_RESULTS.map((item) => item.name);
  const progress = (answers.length / QUESTIONS.length) * 100;
  const finalData = useMemo(() => (finished ? getResult(answers) : null), [finished, answers]);

  const handleAnswer = (index) => {
    const next = [...answers];
    next[current] = index;
    setAnswers(next);
    if (current === QUESTIONS.length - 1) setFinished(true);
    else setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
    setHugging(false);
    setTreeCardUrl("");
  };

  const shareText = finalData ? `${name || "你"}测试结果：${finalData.result.name}｜${finalData.result.title}。MBTI核心类型 ${finalData.mbti}。` : "";
  const treeCardDownloadName = finalData ? `${finalData.result.name}-tree-card.svg` : "tree-card.svg";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(234,244,230,0.95),rgba(246,248,242,0.98),white)] text-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="rounded-3xl border-0 bg-white/80 shadow-lg shadow-zinc-200/50 backdrop-blur">
            <CardHeader>
              <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
                <Trees className="h-4 w-4" /> MBTI × 真实树种测试
              </div>
              <CardTitle className="text-3xl md:text-5xl font-semibold tracking-tight">你是一棵什么类型的树？</CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-zinc-600">
                以 16 型人格为核心，结合晴光 / 雾感、山系 / 流动两组气质维度，形成 <span className="font-medium text-zinc-800">64 种真实树种结果</span>，再加上 2 个额外树种结果，共 <span className="font-medium text-zinc-800">66 种现实存在的树</span>。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["16 种 MBTI 核心", "人格骨架"],
                  ["64 种真实树种", "全部为现实存在"],
                  ["2 种额外树种", "同样是真实树种"],
                  ["24 道题", "可直接试玩"]
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl bg-zinc-50 p-4">
                    <div className="text-lg font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-zinc-500">{desc}</div>
                  </div>
                ))}
              </div>

              {!started && (
                <div className="mt-6">
                  <div className="mb-4 text-center text-2xl font-semibold text-[#55623E]">66 种真实树结果预览</div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {TREE_CARD_PREVIEWS.map((item) => (
                      <PreviewCard key={`${item.mbti}-${item.name}`} item={item} />
                    ))}
                  </div>
                  <div className="mt-6 rounded-3xl border border-[#D9DFD3] bg-[#FAFCF8] p-4">
                    <div className="mb-3 text-sm font-medium text-zinc-500">全部树种</div>
                    <div className="flex flex-wrap gap-2">
                      {previewTreeNames.map((treeName) => (
                        <span key={treeName} className="rounded-full bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm">{treeName}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-gradient-to-br from-emerald-50 to-lime-50 shadow-lg shadow-emerald-100/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Leaf className="h-5 w-5" /> 测试说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-zinc-600">
              <p>这是一版可直接演示的网页原型，先以内容结构和测试逻辑为主，插图后续再接入。</p>
              <div className="grid gap-2">
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">适合做品牌互动</Badge>
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">66 种真实树名结果</Badge>
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">已保留拥抱互动</Badge>
              </div>
              {!started && (
                <div className="pt-2">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="先输入你的名字（可选）" className="mb-3 rounded-2xl bg-white" />
                  <Button onClick={() => setStarted(true)} className="h-11 w-full rounded-2xl text-base">开始测试</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {started && !finished && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <Card className="rounded-3xl border-0 bg-white/90 shadow-xl shadow-zinc-200/50">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-2xl">第 {current + 1} / {QUESTIONS.length} 题</CardTitle>
                      <CardDescription className="mt-1 text-sm">按第一直觉选就好。</CardDescription>
                    </div>
                    <Badge className="rounded-full px-3 py-1">进度 {Math.round(progress)}%</Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardHeader>
                <CardContent>
                  <h2 className="mb-6 text-2xl font-semibold leading-9">{QUESTIONS[current].text}</h2>
                  <div className="grid gap-4">
                    {QUESTIONS[current].options.map((op, idx) => (
                      <motion.button key={idx} whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} onClick={() => handleAnswer(idx)} className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-left text-base transition hover:border-zinc-300 hover:bg-zinc-100">
                        {op.text}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={goPrev} disabled={current === 0} className="rounded-2xl">上一题</Button>
                    <div className="text-sm text-zinc-500">共含 MBTI 四维 + 两组树气质维度</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {finished && finalData && (
            <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Card className="rounded-3xl border-0 bg-gradient-to-br from-white to-emerald-50 shadow-xl shadow-emerald-100/60">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full px-3 py-1 text-sm">测试完成</Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">核心类型 {finalData.mbti}</Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">{dimensionLabel("CL", finalData.scores.CL)}</Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">{dimensionLabel("RB", finalData.scores.RB)}</Badge>
                  </div>

                  <div className="mb-4 text-sm text-emerald-700">{name ? `${name}，你的树人格结果是` : "你的树人格结果是"}</div>
                  <div className="flex flex-col items-center">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      animate={hugging ? { scale: [1, 1.1, 1.04], boxShadow: ["0 0 0 rgba(16,185,129,0)", "0 0 0 18px rgba(16,185,129,0.14)", "0 0 0 rgba(16,185,129,0)"] } : {}}
                      transition={{ duration: 0.7 }}
                      onClick={() => {
                        setHugging(true);
                        setTimeout(() => setHugging(false), 900);
                      }}
                      className="mb-5 rounded-full bg-emerald-100 px-8 py-4 text-base font-semibold text-emerald-800 shadow-md shadow-emerald-200/70 transition hover:bg-emerald-200 md:px-10 md:py-5 md:text-lg"
                    >
                      🌳 点击抱抱这棵树
                    </motion.button>
                    <motion.h2 animate={hugging ? { scale: [1, 1.04, 1] } : {}} transition={{ duration: 0.6 }} className="text-4xl font-semibold tracking-tight md:text-5xl">
                      {finalData.result.name}
                    </motion.h2>
                  </div>
                  <p className="mt-3 text-xl text-zinc-600">{finalData.result.title}</p>

                  {/* 🌳 真实树照片 */}
                  <div className="mt-6">
                    <div className="mb-2 text-sm text-zinc-500">现实中的它</div>
                    <img
                      src={TREE_IMAGES[finalData.result.name] || ""}
                      alt={finalData.result.name}
                      className="w-full rounded-2xl border border-zinc-200 object-cover"
                      style={{ aspectRatio: "1.3" }}
                    />
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-3 rounded-2xl bg-emerald-50/70 p-4 text-sm leading-7 text-emerald-800">{pickEncouragement(finalData, name)}</div>
                    <div className="rounded-2xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-500"><SunMedium className="h-4 w-4" /> 你的气质</div>
                      <p className="text-sm leading-7 text-zinc-700">{finalData.result.vibe}</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-500"><Leaf className="h-4 w-4" /> 你的天赋</div>
                      <p className="text-sm leading-7 text-zinc-700">{finalData.result.gift}</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-500"><MoonStar className="h-4 w-4" /> 成长建议</div>
                      <p className="text-sm leading-7 text-zinc-700">{finalData.result.advice}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {finalData.result.keywords.map((item) => (
                      <Badge key={item} variant="outline" className="rounded-full px-3 py-1">{item}</Badge>
                    ))}
                  </div>

                  {hugging && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="mt-5 rounded-3xl bg-emerald-100 px-6 py-5 text-center text-base font-semibold text-emerald-800 shadow-lg shadow-emerald-200/70 md:text-lg"
                    >
                      你被抱住了🌳
                      <div className="mt-2 text-sm font-normal text-emerald-700 md:text-base">抱抱小树正在轻轻抱一下你</div>
                    </motion.div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button className="rounded-2xl" onClick={() => navigator?.clipboard?.writeText?.(shareText)}>
                      <Share2 className="mr-2 h-4 w-4" /> 复制结果文案
                    </Button>
                    <Button
                      className="rounded-2xl bg-[#E8F5E1] text-[#3F6E4B] hover:bg-[#DDEFD4]"
                      onClick={() => {
                        try {
                          const url = getTreeCardDataUrl(finalData, name);
                          setTreeCardUrl(url);
                        } catch (error) {
                          const text = `🌳 我是一棵「${finalData.result.name}」
${finalData.result.title}
来测测你是哪棵树 →`;
                          navigator?.clipboard?.writeText?.(text);
                          alert('树卡片生成失败，已改为复制分享文案。');
                        }
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> 生成我的树卡片
                    </Button>
                    <Button variant="outline" className="rounded-2xl" onClick={restart}>
                      <RotateCcw className="mr-2 h-4 w-4" /> 再测一次
                    </Button>
                  </div>

                  {treeCardUrl && (
                    <div className="mt-6 rounded-3xl border border-[#D9DFD3] bg-white/90 p-4">
                      <div className="mb-3 text-sm font-medium text-zinc-500">树卡片预览</div>
                      <img src={treeCardUrl} alt="树卡片预览" className="w-full rounded-2xl border border-zinc-200" />
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a href={treeCardUrl} download={treeCardDownloadName} className="inline-flex items-center rounded-2xl bg-[#6F9F78] px-4 py-3 text-sm text-white">
                          下载树卡片 SVG
                        </a>
                        <Button variant="outline" className="rounded-2xl" onClick={() => window.open(treeCardUrl, '_blank')}>
                          在新窗口打开
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-6">
                <Card className="rounded-3xl border-0 bg-white/90 shadow-lg shadow-zinc-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl">人格维度雷达（简化版）</CardTitle>
                    <CardDescription>这部分可以继续升级成正式图表。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {DIMENSIONS.map((key) => (
                      <div key={key}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-zinc-700">{dimensionLabel(key, finalData.scores[key])}</span>
                          <span className="text-zinc-500">{finalData.scores[key]}</span>
                        </div>
                        <Progress value={scorePercent(finalData.scores[key])} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-0 bg-white/90 shadow-lg shadow-zinc-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl">树人格生成逻辑</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm leading-7 text-zinc-600">
                    <div className="flex items-start gap-3"><Wind className="mt-1 h-4 w-4 shrink-0" /><p>MBTI 四维：E/I、S/N、T/F、J/P，先得到 16 型核心人格。</p></div>
                    <div className="flex items-start gap-3"><Mountain className="mt-1 h-4 w-4 shrink-0" /><p>山系 / 流动：代表你的节奏是更稳、更扎根，还是更自由、更变化。</p></div>
                    <div className="flex items-start gap-3"><Waves className="mt-1 h-4 w-4 shrink-0" /><p>晴光 / 雾感：代表你的表达气质是更明亮外显，还是更安静内敛。</p></div>
                    <div className="rounded-2xl bg-zinc-50 p-4 text-zinc-700">16 × 4 = 64 种真实树种结果，再加 2 个额外真实树种，共 66 种现实存在的树。</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
