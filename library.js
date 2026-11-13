/* Brewprint recipe library: famous V60 recipes as published by their authors.
   Each step: s = start time (seconds), text ({w} = cumulative scale weight, scaled to the chosen dose),
   w = cumulative water at the end of that pour (base dose), dur = pour length in seconds (for the chart),
   end = last step. To add a recipe, copy one entry and edit it; nothing else needs to change. */
window.BREW_LIBRARY = [
  /* ---------------- HOT ---------------- */
  {
    id: "hoffmann-ultimate", temp: "hot", name: "Ultimate V60", by: "James Hoffmann",
    dose: 30, water: 500, ice: 0, tempC: 100, grind: 600, total: 210, time: "3:30",
    blurb: "Big bloom, two main pours, then a stir and a swirl. Clean, bright and sweet; great for light roasts.",
    tags: ["Clean", "Bright", "2 cups"],
    prep: ["Rinse the paper with just-boiled water and discard it.", "Add the coffee and make a small well in the centre.", "Use water as hot as you can, especially for light roasts."],
    steps: [
      {s: 0, w: 60, dur: 10, text: "Bloom: pour {w} g (2× the coffee), then swirl until every ground is wet."},
      {s: 45, w: 300, dur: 30, text: "Pour to {w} g by 1:15. Keep the V60 fairly full."},
      {s: 75, w: 500, dur: 30, text: "Pour to {w} g by 1:45, a little slower and gentler."},
      {s: 105, text: "Stir once clockwise and once anticlockwise with a spoon."},
      {s: 115, text: "Let it drain a little, then give the V60 a gentle swirl to flatten the bed."},
      {s: 210, end: true, text: "Drawdown done. Aim to finish around 3:30."}
    ],
    tips: ["Bloom at 2× the coffee weight and swirl instead of stirring for an even start.", "Keeping the cone full holds heat in the slurry.", "If it drains much slower than 3:30, grind a little coarser."],
    source: "https://www.hario-usa.com/blogs/recipes-and-more-from-friends/james-hoffmann-uitimate-v60-technique"
  },
  {
    id: "hoffmann-1cup", temp: "hot", name: "Better 1-Cup V60", by: "James Hoffmann",
    dose: 15, water: 250, ice: 0, tempC: 100, grind: 600, total: 180, time: "3:00",
    blurb: "Five small 50 g pours for one mug. Very repeatable, forgiving and sweet.",
    tags: ["Sweet", "Forgiving", "1 cup"],
    prep: ["Rinse the paper with just-boiled water and discard it.", "Add the coffee and tare the scale."],
    steps: [
      {s: 0, w: 50, dur: 10, text: "Bloom: pour {w} g."},
      {s: 10, text: "Swirl gently for about 5 seconds."},
      {s: 45, w: 100, dur: 15, text: "Pour to {w} g."},
      {s: 70, w: 150, dur: 10, text: "Pour to {w} g."},
      {s: 90, w: 200, dur: 10, text: "Pour to {w} g."},
      {s: 110, w: 250, dur: 10, text: "Pour to {w} g."},
      {s: 120, text: "Give the V60 a gentle swirl."},
      {s: 180, end: true, text: "Drawdown done, around 3:00."}
    ],
    tips: ["Small, equal pours keep the bed temperature steady for a single cup.", "Taste matters more than the clock: if it's sour, grind finer; if it's bitter, grind coarser."],
    source: "https://aeroprecipe.com/recipes/james-hoffmann-better-1-cup-v60-technique"
  },
  {
    id: "kasuya-46", temp: "hot", name: "4:6 Method", by: "Tetsu Kasuya · 2016 World Brewers Cup Champion",
    dose: 20, water: 300, ice: 0, tempC: 92, grind: 900, total: 210, time: "3:30",
    blurb: "Coarse grind and five timed pours. The first 40% sets sweetness vs acidity, the last 60% sets strength.",
    tags: ["Sweet", "Balanced", "Coarse grind"],
    prep: ["Rinse the paper and discard the water.", "Grind coarse, like rough sea salt.", "Level the bed and tare the scale."],
    steps: [
      {s: 0, w: 50, dur: 10, text: "Pour {w} g. Let it drain."},
      {s: 45, w: 120, dur: 12, text: "Pour to {w} g."},
      {s: 90, w: 180, dur: 10, text: "Pour to {w} g."},
      {s: 130, w: 240, dur: 10, text: "Pour to {w} g."},
      {s: 160, w: 300, dur: 10, text: "Pour to {w} g."},
      {s: 210, end: true, text: "Remove the dripper at 3:30, even if water is still dripping."}
    ],
    tips: ["Sweeter: make the first pour smaller than the second (e.g. 40% split as 1/3 then 2/3).", "Brighter: make the first pour bigger than the second.", "Stronger body: split the last 60% into more pours. Lighter: fewer pours."],
    source: "https://hario.co.uk/blogs/hario-ambassadors/hario-v60-recipe-interview-with-hario-ambassador-tetsu-kasuya"
  },
  {
    id: "rao-spin", temp: "hot", name: "Rao Spin", by: "Scott Rao",
    dose: 20, water: 330, ice: 0, tempC: 97, grind: 575, total: 255, time: "4:00–4:30",
    blurb: "Two big pours with gentle spins to flatten the bed. High extraction, very clean cup.",
    tags: ["High extraction", "Clean", "Plastic V60"],
    prep: ["Rao uses a plastic V60 because it holds heat best.", "Rinse the paper, add the coffee and make a small well with your finger."],
    steps: [
      {s: 0, w: 60, dur: 10, text: "Pour {w} g, then immediately spin the V60 vigorously."},
      {s: 40, w: 200, dur: 30, text: "At 0:40, pour to {w} g in a steady, low stream."},
      {s: 72, text: "Give a very gentle spin (under one second) to fill the ribs."},
      {s: 110, w: 330, dur: 25, text: "When the slurry is about 70% drained, pour to {w} g."},
      {s: 137, text: "Another very gentle spin."},
      {s: 255, end: true, text: "Drawdown done, around 4:00–4:30."}
    ],
    tips: ["Pour from fairly low, keeping the kettle at a constant height and the stream nearly vertical.", "The spins level the bed so water flows through it evenly.", "The third pour starts by eye (70% drained), so the time shown is approximate."],
    source: "https://www.hario.co.uk/blogs/hario-ambassadors/hario-v60-recipe-interview-with-hario-ambassador-scott-rao"
  },
  {
    id: "hedrick", temp: "hot", name: "Pour Over Masterclass", by: "Lance Hedrick",
    dose: 20, water: 300, ice: 0, tempC: 94, grind: 600, total: 165, time: "2:30–3:00",
    blurb: "Small bloom with a stir, then three spiral pours, each followed by a swirl. Fast and sweet.",
    tags: ["Sweet", "Quick", "1:15"],
    prep: ["Rinse the paper and discard the water.", "Add the coffee, level it and make a small well in the centre.", "Water: 95–96 °C for light roasts, 93–94 °C medium, 91–93 °C dark."],
    steps: [
      {s: 0, w: 40, dur: 10, text: "Bloom: pour {w} g, stir 3–5 times, then swirl."},
      {s: 45, w: 120, dur: 30, text: "Spiral pour to {w} g by 1:15, then swirl gently."},
      {s: 75, w: 260, dur: 45, text: "When the bed shows but isn't dry, spiral pour to {w} g by 2:00. Swirl."},
      {s: 120, w: 300, dur: 15, text: "Pour to {w} g in the centre, avoiding the walls. Swirl once more."},
      {s: 165, end: true, text: "Drawdown done, about 2:45."}
    ],
    tips: ["Drains slower than about 3:15? Grind coarser. Faster than 2:30? Grind finer.", "Swirling after each pour keeps the bed flat for an even extraction."],
    source: "https://secure.lamose.com/blogs/recipes/lance-hedricks-pour-over-masterclass-v60-technique"
  },

  /* ---------------- ICED ---------------- */
  {
    id: "hoffmann-iced", temp: "iced", name: "Japanese Iced V60", by: "James Hoffmann",
    dose: 30, water: 300, ice: 200, tempC: 96, grind: 525, total: 150, time: "~2:30",
    blurb: "Brew a strong coffee straight onto ice: 60% hot water, 40% ice. Crisp and aromatic.",
    tags: ["Crisp", "Fruity", "1:16.7"],
    prep: ["Put {ice} g of ice in the server.", "Rinse the paper over the sink, not over the ice.", "Grind a little finer than for hot V60."],
    steps: [
      {s: 0, w: 60, dur: 10, text: "Bloom: pour {w} g, swirl gently and wait 45 seconds."},
      {s: 45, w: 300, dur: 45, text: "Pour slowly in circles to {w} g."},
      {s: 95, text: "Give the V60 a final gentle swirl."},
      {s: 150, end: true, text: "When it's drained, swirl the server until the ice has nearly melted. Serve over fresh ice."}
    ],
    tips: ["The ice is part of the recipe: it dilutes and chills the brew to drinking strength.", "Grinding finer makes up for using less hot water."],
    source: "https://doppiomontreal.com/blogs/news/james-hoffmans-iced-filtered-coffee-recipe"
  },
  {
    id: "kasuya-iced", temp: "iced", name: "Hot Bloom, Then Ice", by: "Tetsu Kasuya",
    dose: 20, water: 100, ice: 100, tempC: 92, grind: 525, total: 180, time: "~3:00",
    blurb: "Equal parts hot water and ice in two pours. Rich, sweet and syrupy.",
    tags: ["Rich", "Sweet", "1:10"],
    prep: ["Put {ice} g of ice in the server, not in the dripper.", "Grind medium-fine, a little finer than for hot V60."],
    steps: [
      {s: 0, w: 40, dur: 10, text: "Bloom: pour {w} g in a tight circle. Wait 45 seconds."},
      {s: 45, w: 100, dur: 45, text: "Pour to {w} g in a slow spiral, finishing by 1:30."},
      {s: 180, end: true, text: "Drawdown onto the ice by about 3:00. Swirl the server to melt the ice and combine."}
    ],
    tips: ["This is a strong 1:10 brew, so serve it over more ice or add a splash of cold water to taste.", "Published as a translation of Kasuya's method; the numbers may differ slightly from his original."],
    source: "https://japanesecoffeegear.com/tetsu-kasuyas-iced-coffee-recipe-hot-bloom-then-ice-method-translated"
  },
  {
    id: "flash-brew", temp: "iced", name: "Classic Flash Brew", by: "Traditional Japanese method",
    dose: 20, water: 180, ice: 120, tempC: 95, grind: 550, total: 165, time: "2:30–3:00",
    blurb: "The standard Japanese iced method: three pours onto ice, 1:15 overall.",
    tags: ["Balanced", "Easy", "1:15"],
    prep: ["Put {ice} g of ice in the server.", "Rinse the paper and add the coffee."],
    steps: [
      {s: 0, w: 50, dur: 10, text: "Bloom: pour {w} g and wait 45 seconds."},
      {s: 45, w: 120, dur: 30, text: "Pour in circles to {w} g."},
      {s: 90, w: 180, dur: 25, text: "Pour to {w} g."},
      {s: 165, end: true, text: "Drawdown onto the ice by 2:30–3:00. Swirl to melt the rest, then serve over fresh ice."}
    ],
    tips: ["A good starting point for any coffee; light to medium roasts shine here."],
    source: "https://field-guides.vercel.app/pour-over/iced-and-cold-pour-over.html"
  },
  {
    id: "nosleep-iced", temp: "iced", name: "Quick Iced V60", by: "No Sleep Roastery",
    dose: 15, water: 150, ice: 75, tempC: 96, grind: 600, total: 150, time: "~2:30",
    blurb: "One small glass in under three minutes: quick centre pours, then a slow finish.",
    tags: ["Quick", "1 glass", "1:15"],
    prep: ["Put {ice} g of ice in the bottom of your glass or server.", "Rinse the paper with hot water."],
    steps: [
      {s: 0, w: 30, dur: 8, text: "Bloom: pour {w} g."},
      {s: 30, w: 100, dur: 15, text: "Quick pours in the centre to {w} g."},
      {s: 75, w: 150, dur: 20, text: "Slow circular pour to {w} g."},
      {s: 150, end: true, text: "Done around 2:30. Swirl and serve over the ice."}
    ],
    tips: ["Great for a single glass when you're short on time."],
    source: "https://pullandpourcoffee.com/wprm_print/8488"
  },
  {
    id: "kurasu-switch", temp: "iced", name: "Iced V60 Switch", by: "Kurasu Kyoto", gear: "Needs a Hario V60 Switch",
    dose: 15, water: 140, ice: 150, tempC: 95, grind: 750, total: 120, time: "1:45–2:00",
    blurb: "Steep first, then release onto the server and chill with ice. Very sweet and full-bodied.",
    tags: ["Full body", "Immersion", "V60 Switch"],
    prep: ["Switch closed. Rinse the paper and discard the water.", "Have {ice} g of ice ready; it goes into the coffee after brewing.", "If your beans are older, use 20 g of coffee."],
    steps: [
      {s: 0, w: 40, dur: 10, text: "Switch closed: pour {w} g in slow circles around the centre. Wait 40 seconds."},
      {s: 40, w: 140, dur: 20, text: "Pour to {w} g, then flip the switch down to drain."},
      {s: 120, end: true, text: "When it's drained, add the ice to the coffee and stir until fully chilled."}
    ],
    tips: ["Steeping before draining gives a sweeter, rounder cup than a straight pour-through.", "On a regular V60, use one of the other iced recipes instead."],
    source: "https://kurasu.kyoto/blogs/recipe/new-hario-v60-switch-iced-coffee-recipe"
  }
];

/* ---------------- Arabic text for the library (same order of steps as above) ---------------- */
(function () {
  const AR = {
    "hoffmann-ultimate": {
      name: "الـ V60 المثالي", by: "جيمس هوفمان",
      blurb: "تشريب كبير وصبّتان رئيسيتان ثم تقليب وتحريك دائري. كوب نظيف ومشرق وحلو؛ ممتاز للتحميص الفاتح.",
      tags: ["نظيف", "مشرق", "كوبان"],
      prep: ["اشطف الورق بماء مغلي للتو وتخلّص منه.", "أضف البن واصنع حفرة صغيرة في المنتصف.", "استخدم أسخن ماء ممكن، خصوصاً للتحميص الفاتح."],
      steps: [
        "التشريب: صب {w} غ (ضعف وزن البن)، ثم حرّك الأداة بشكل دائري حتى يتبلل كل البن.",
        "صب حتى {w} غ قبل الدقيقة 1:15. أبقِ الـ V60 ممتلئاً تقريباً.",
        "صب حتى {w} غ قبل الدقيقة 1:45، بشكل أبطأ وألطف.",
        "قلّب بالملعقة مرة مع عقارب الساعة ومرة عكسها.",
        "اتركه يصفّي قليلاً، ثم حرّك الـ V60 بلطف بشكل دائري ليستوي سطح البن.",
        "انتهت التصفية. الهدف أن تنتهي عند حوالي 3:30."
      ],
      tips: ["اجعل ماء التشريب ضعف وزن البن، وحرّك بشكل دائري بدل التقليب لبداية متساوية.", "إبقاء المخروط ممتلئاً يحافظ على حرارة الخليط.", "إذا تجاوزت التصفية 3:30 بكثير، اجعل الطحنة أخشن قليلاً."]
    },
    "hoffmann-1cup": {
      name: "V60 أفضل لكوب واحد", by: "جيمس هوفمان",
      blurb: "خمس صبّات صغيرة كل منها 50 غ لكوب واحد. سهلة التكرار ومتسامحة وحلوة.",
      tags: ["حلو", "سهل", "كوب واحد"],
      prep: ["اشطف الورق بماء مغلي للتو وتخلّص منه.", "أضف البن وصفّر الميزان."],
      steps: [
        "التشريب: صب {w} غ.",
        "حرّك الأداة بلطف بشكل دائري لحوالي 5 ثوانٍ.",
        "صب حتى {w} غ.", "صب حتى {w} غ.", "صب حتى {w} غ.", "صب حتى {w} غ.",
        "حرّك الـ V60 بلطف بشكل دائري.",
        "انتهت التصفية، عند حوالي 3:00."
      ],
      tips: ["الصبّات الصغيرة المتساوية تحافظ على ثبات الحرارة لكوب واحد.", "الطعم أهم من الوقت: إذا كان حامضاً اجعل الطحنة أنعم، وإذا كان مراً اجعلها أخشن."]
    },
    "kasuya-46": {
      name: "طريقة 4:6", by: "تيتسو كاسويا · بطل العالم في التحضير اليدوي 2016",
      blurb: "طحنة خشنة وخمس صبّات بتوقيت محدد. أول 40% تحدد الحلاوة مقابل الحموضة، وآخر 60% تحدد القوة.",
      tags: ["حلو", "متوازن", "طحنة خشنة"],
      prep: ["اشطف الورق وتخلّص من الماء.", "طحنة خشنة مثل ملح البحر الخشن.", "سوِّ سطح البن وصفّر الميزان."],
      steps: [
        "صب {w} غ واتركه يصفّي.",
        "صب حتى {w} غ.", "صب حتى {w} غ.", "صب حتى {w} غ.", "صب حتى {w} غ.",
        "ارفع الأداة عند 3:30 حتى لو كان الماء ما زال يقطر."
      ],
      tips: ["لطعم أحلى: اجعل الصبّة الأولى أصغر من الثانية (قسّم الـ 40% إلى الثلث ثم الثلثين).", "لطعم أكثر إشراقاً: اجعل الصبّة الأولى أكبر من الثانية.", "لقوام أقوى: قسّم آخر 60% إلى صبّات أكثر. ولقوام أخف: صبّات أقل."]
    },
    "rao-spin": {
      name: "طريقة راو بالتدوير", by: "سكوت راو",
      blurb: "صبّتان كبيرتان مع تدوير لطيف ليستوي سطح البن. استخلاص عالٍ وكوب نظيف جداً.",
      tags: ["استخلاص عالٍ", "نظيف", "V60 بلاستيك"],
      prep: ["راو يستخدم V60 بلاستيكياً لأنه يحافظ على الحرارة أكثر.", "اشطف الورق، أضف البن واصنع حفرة صغيرة بإصبعك."],
      steps: [
        "صب {w} غ، ثم دوّر الـ V60 بقوة فوراً.",
        "عند 0:40 صب حتى {w} غ بخيط ماء ثابت ومنخفض.",
        "دوّر الأداة بلطف شديد (أقل من ثانية) لتمتلئ الأخاديد.",
        "عندما يصفّي حوالي 70% من الخليط، صب حتى {w} غ.",
        "تدوير لطيف جداً مرة أخرى.",
        "انتهت التصفية، عند حوالي 4:00 إلى 4:30."
      ],
      tips: ["صب من ارتفاع منخفض نسبياً مع ثبات ارتفاع الغلاية وخيط ماء شبه عمودي.", "التدوير يُسوّي سطح البن فيمر الماء عبره بالتساوي.", "الصبّة الثالثة تبدأ بالنظر (عند 70% تصفية)، لذا الوقت المعروض تقريبي."]
    },
    "hedrick": {
      name: "دورة التقطير الاحترافية", by: "لانس هيدريك",
      blurb: "تشريب صغير مع تقليب، ثم ثلاث صبّات حلزونية يتبع كلاً منها تحريك دائري. سريعة وحلوة.",
      tags: ["حلو", "سريع", "1:15"],
      prep: ["اشطف الورق وتخلّص من الماء.", "أضف البن وسوِّ سطحه واصنع حفرة صغيرة في المنتصف.", "الماء: 95 إلى 96 °م للتحميص الفاتح، 93 إلى 94 °م للمتوسط، 91 إلى 93 °م للغامق."],
      steps: [
        "التشريب: صب {w} غ، قلّب 3 إلى 5 مرات، ثم حرّك بشكل دائري.",
        "صب حلزونياً حتى {w} غ قبل 1:15، ثم حرّك بلطف.",
        "عندما يظهر سطح البن دون أن يجف، صب حلزونياً حتى {w} غ قبل 2:00. حرّك بشكل دائري.",
        "صب حتى {w} غ في المنتصف مع تجنّب الجدران. حرّك بشكل دائري مرة أخرى.",
        "انتهت التصفية، عند حوالي 2:45."
      ],
      tips: ["إذا تجاوزت التصفية 3:15 اجعل الطحنة أخشن، وإذا كانت أسرع من 2:30 اجعلها أنعم.", "التحريك الدائري بعد كل صبّة يُبقي السطح مستوياً لاستخلاص متساوٍ."]
    },
    "hoffmann-iced": {
      name: "V60 الياباني البارد", by: "جيمس هوفمان",
      blurb: "حضّر قهوة قوية مباشرة على الثلج: 60% ماء حار و40% ثلج. منعشة وعطرية.",
      tags: ["منعش", "فواكهي", "1:16.7"],
      prep: ["ضع {ice} غ ثلج في الإبريق.", "اشطف الورق فوق المغسلة، ليس فوق الثلج.", "اجعل الطحنة أنعم قليلاً من الـ V60 الحار."],
      steps: [
        "التشريب: صب {w} غ، حرّك بلطف وانتظر 45 ثانية.",
        "صب ببطء بشكل دائري حتى {w} غ.",
        "حرّك الـ V60 بلطف بشكل دائري للمرة الأخيرة.",
        "بعد انتهاء التصفية، حرّك الإبريق حتى يذوب الثلج تقريباً. قدّمها على ثلج جديد."
      ],
      tips: ["الثلج جزء من الوصفة: يخفف القهوة ويبردها لتصبح بقوة مناسبة للشرب.", "الطحنة الأنعم تعوّض عن كمية الماء الحار الأقل."]
    },
    "kasuya-iced": {
      name: "تشريب حار ثم ثلج", by: "تيتسو كاسويا",
      blurb: "كمية متساوية من الماء الحار والثلج في صبّتين. غنية وحلوة بقوام كثيف.",
      tags: ["غني", "حلو", "1:10"],
      prep: ["ضع {ice} غ ثلج في الإبريق، ليس في أداة التقطير.", "طحنة متوسطة إلى ناعمة، أنعم قليلاً من الـ V60 الحار."],
      steps: [
        "التشريب: صب {w} غ بدائرة صغيرة. انتظر 45 ثانية.",
        "صب حلزونياً ببطء حتى {w} غ، وانتهِ قبل 1:30.",
        "تنتهي التصفية على الثلج عند حوالي 3:00. حرّك الإبريق ليذوب الثلج ويختلط."
      ],
      tips: ["هذه قهوة قوية بنسبة 1:10، قدّمها على ثلج إضافي أو أضف قليلاً من الماء البارد حسب ذوقك.", "منشورة كترجمة لطريقة كاسويا، وقد تختلف الأرقام قليلاً عن الأصل."]
    },
    "flash-brew": {
      name: "الفلاش برو الكلاسيكي", by: "الطريقة اليابانية التقليدية",
      blurb: "الطريقة اليابانية المعتادة للقهوة الباردة: ثلاث صبّات على الثلج بنسبة إجمالية 1:15.",
      tags: ["متوازن", "سهل", "1:15"],
      prep: ["ضع {ice} غ ثلج في الإبريق.", "اشطف الورق وأضف البن."],
      steps: [
        "التشريب: صب {w} غ وانتظر 45 ثانية.",
        "صب بشكل دائري حتى {w} غ.",
        "صب حتى {w} غ.",
        "تنتهي التصفية على الثلج بين 2:30 و3:00. حرّك ليذوب الباقي، ثم قدّمها على ثلج جديد."
      ],
      tips: ["نقطة بداية ممتازة لأي قهوة؛ تتألق مع التحميص الفاتح والمتوسط."]
    },
    "nosleep-iced": {
      name: "V60 بارد سريع", by: "محمصة No Sleep",
      blurb: "كوب واحد في أقل من ثلاث دقائق: صبّات سريعة في المنتصف ثم صبّة أخيرة بطيئة.",
      tags: ["سريع", "كوب واحد", "1:15"],
      prep: ["ضع {ice} غ ثلج في قاع الكوب أو الإبريق.", "اشطف الورق بماء حار."],
      steps: [
        "التشريب: صب {w} غ.",
        "صبّات سريعة في المنتصف حتى {w} غ.",
        "صب بشكل دائري ببطء حتى {w} غ.",
        "تنتهي عند حوالي 2:30. حرّك وقدّمها على الثلج."
      ],
      tips: ["ممتازة لكوب واحد عندما يكون وقتك ضيقاً."]
    },
    "kurasu-switch": {
      name: "V60 سويتش بارد", by: "كوراسو كيوتو", gear: "تحتاج Hario V60 Switch",
      blurb: "نقع أولاً، ثم تصفية في الإبريق وتبريد بالثلج. حلوة جداً وقوامها ممتلئ.",
      tags: ["قوام ممتلئ", "نقع", "V60 سويتش"],
      prep: ["الصمام مغلق. اشطف الورق وتخلّص من الماء.", "جهّز {ice} غ ثلج؛ يُضاف إلى القهوة بعد التحضير.", "إذا كان البن قديماً، استخدم 20 غ بن."],
      steps: [
        "والصمام مغلق: صب {w} غ بدوائر بطيئة حول المنتصف. انتظر 40 ثانية.",
        "صب حتى {w} غ، ثم افتح الصمام للتصفية.",
        "بعد التصفية، أضف الثلج إلى القهوة وقلّب حتى تبرد تماماً."
      ],
      tips: ["النقع قبل التصفية يعطي كوباً أحلى وأنعم من التقطير المباشر.", "على V60 العادي، استخدم إحدى الوصفات الباردة الأخرى."]
    }
  };
  (window.BREW_LIBRARY || []).forEach(r => { if (AR[r.id]) r.ar = AR[r.id]; });
})();
