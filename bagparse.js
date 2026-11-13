/* Brewprint bag reader: turns text read from a coffee bag (English or Arabic) into recipe fields.
   Pure rules, no network. Exposes window.parseBag(text) (and module.exports for tests). */
(function (root) {
  "use strict";

  // ---------- dictionaries ----------
  // [canonical, ...english aliases], arabic aliases
  const ORIGINS = [
    ["Ethiopia", ["ethiopia", "ethiopian"], ["إثيوبيا", "اثيوبيا", "أثيوبيا", "إثيوبي", "اثيوبي", "الحبشة"]],
    ["Kenya", ["kenya", "kenyan"], ["كينيا", "كيني"]],
    ["Colombia", ["colombia", "colombian", "columbia"], ["كولومبيا", "كولومبي"]],
    ["Brazil", ["brazil", "brasil", "brazilian"], ["البرازيل", "برازيل", "برازيلي"]],
    ["Yemen", ["yemen", "yemeni"], ["اليمن", "يمني", "يمنية"]],
    ["Saudi Arabia", ["saudi", "ksa"], ["السعودية", "سعودي", "سعودية", "جازان", "جيزان"]],
    ["Panama", ["panama"], ["بنما", "باناما"]],
    ["Costa Rica", ["costa rica"], ["كوستاريكا", "كوستا ريكا"]],
    ["Guatemala", ["guatemala"], ["غواتيمالا", "جواتيمالا", "قواتيمالا"]],
    ["Honduras", ["honduras"], ["هندوراس"]],
    ["El Salvador", ["el salvador", "salvador"], ["السلفادور"]],
    ["Nicaragua", ["nicaragua"], ["نيكاراغوا", "نيكاراجوا"]],
    ["Mexico", ["mexico"], ["المكسيك", "مكسيك"]],
    ["Peru", ["peru"], ["بيرو"]],
    ["Bolivia", ["bolivia"], ["بوليفيا"]],
    ["Ecuador", ["ecuador"], ["الإكوادور", "الاكوادور", "إكوادور"]],
    ["Rwanda", ["rwanda"], ["رواندا"]],
    ["Burundi", ["burundi"], ["بوروندي"]],
    ["Uganda", ["uganda"], ["أوغندا", "اوغندا"]],
    ["Tanzania", ["tanzania"], ["تنزانيا"]],
    ["DR Congo", ["congo", "drc"], ["الكونغو", "كونغو"]],
    ["Malawi", ["malawi"], ["مالاوي"]],
    ["Zambia", ["zambia"], ["زامبيا"]],
    ["Indonesia", ["indonesia", "sumatra", "java", "sulawesi", "aceh", "bali"], ["إندونيسيا", "اندونيسيا", "سومطرة", "جاوة"]],
    ["Papua New Guinea", ["papua new guinea", "png"], ["بابوا"]],
    ["India", ["india", "indian"], ["الهند", "هندي"]],
    ["China", ["china", "yunnan"], ["الصين", "يونان"]],
    ["Vietnam", ["vietnam"], ["فيتنام"]],
    ["Thailand", ["thailand"], ["تايلاند"]],
    ["Myanmar", ["myanmar"], ["ميانمار"]],
    ["Laos", ["laos"], ["لاوس"]],
    ["Taiwan", ["taiwan"], ["تايوان"]],
    ["Jamaica", ["jamaica", "blue mountain"], ["جامايكا"]],
    ["Dominican Republic", ["dominican"], ["الدومينيكان"]],
    ["Haiti", ["haiti"], ["هايتي"]],
    ["Cuba", ["cuba"], ["كوبا"]],
    ["Venezuela", ["venezuela"], ["فنزويلا"]],
    ["USA (Hawaii)", ["hawaii", "kona"], ["هاواي"]]
  ];

  // region -> [display name, origin], plus arabic spellings
  const REGIONS = [
    ["Guji", "Ethiopia", ["guji"], ["جوجي", "قوجي", "غوجي"]],
    ["Yirgacheffe", "Ethiopia", ["yirgacheffe", "yirgachefe", "yirga cheffe", "yirgachaffe"], ["يرقاتشيفي", "يرجاتشيفي", "يرغاتشيفي", "يرقاشيفي", "يرجاشيفي", "يرقا تشيفي"]],
    ["Sidama", "Ethiopia", ["sidama", "sidamo"], ["سيداما", "سيدامو"]],
    ["Gedeo", "Ethiopia", ["gedeo"], ["جيديو", "قيديو"]],
    ["Gedeb", "Ethiopia", ["gedeb"], ["جيديب", "قيديب"]],
    ["Kochere", "Ethiopia", ["kochere"], ["كوتشيري", "كوشيري"]],
    ["Harrar", "Ethiopia", ["harrar", "harar"], ["هرر", "هراري"]],
    ["Limu", "Ethiopia", ["limu"], ["ليمو"]],
    ["Jimma", "Ethiopia", ["jimma"], ["جيما"]],
    ["Kaffa", "Ethiopia", ["kaffa"], ["كافا"]],
    ["Bench Maji", "Ethiopia", ["bench maji", "bench sheko"], []],
    ["West Arsi", "Ethiopia", ["west arsi", "arsi"], ["أرسي"]],
    ["Hambela", "Ethiopia", ["hambela"], ["هامبيلا", "همبيلا"]],
    ["Shakiso", "Ethiopia", ["shakiso"], ["شاكيسو"]],
    ["Uraga", "Ethiopia", ["uraga"], ["أوراغا", "اوراقا"]],
    ["Bensa", "Ethiopia", ["bensa"], ["بينسا"]],
    ["Chelchele", "Ethiopia", ["chelchele"], []],
    ["Banko", "Ethiopia", ["banko"], ["بانكو"]],
    ["Agaro", "Ethiopia", ["agaro"], ["أغارو"]],
    ["Nensebo", "Ethiopia", ["nensebo"], []],
    ["Nyeri", "Kenya", ["nyeri"], ["نييري", "نيري"]],
    ["Kirinyaga", "Kenya", ["kirinyaga"], ["كيرينياغا"]],
    ["Embu", "Kenya", ["embu"], ["إمبو"]],
    ["Murang'a", "Kenya", ["muranga", "murang'a"], []],
    ["Kiambu", "Kenya", ["kiambu"], []],
    ["Huila", "Colombia", ["huila"], ["هويلا", "ويلا"]],
    ["Nariño", "Colombia", ["narino", "nariño"], ["نارينيو", "نارينو"]],
    ["Cauca", "Colombia", ["cauca"], ["كاوكا"]],
    ["Tolima", "Colombia", ["tolima"], ["توليما"]],
    ["Antioquia", "Colombia", ["antioquia"], ["أنتيوكيا"]],
    ["Quindío", "Colombia", ["quindio", "quindío"], []],
    ["Santander", "Colombia", ["santander"], []],
    ["Boquete", "Panama", ["boquete"], ["بوكيتي"]],
    ["Volcán", "Panama", ["volcan", "volcán"], []],
    ["Tarrazú", "Costa Rica", ["tarrazu", "tarrazú"], ["تارازو"]],
    ["West Valley", "Costa Rica", ["west valley"], []],
    ["Antigua", "Guatemala", ["antigua"], ["أنتيغوا", "انتيجوا"]],
    ["Huehuetenango", "Guatemala", ["huehuetenango"], []],
    ["Atitlán", "Guatemala", ["atitlan", "atitlán"], []],
    ["Haraz", "Yemen", ["haraz"], ["حراز", "حرازي"]],
    ["Bani Matar", "Yemen", ["bani matar", "bani mattar"], ["بني مطر", "مطري"]],
    ["Haymah", "Yemen", ["haymah", "hayma"], ["حيمة", "الحيمة"]],
    ["Sana'a", "Yemen", ["sanaa", "sana'a"], ["صنعاء"]],
    ["Jazan", "Saudi Arabia", ["jazan", "jizan"], ["جازان", "جيزان"]],
    ["Al Dayer", "Saudi Arabia", ["al dayer", "aldayer", "dayer"], ["الداير"]],
    ["Fifa", "Saudi Arabia", ["fifa mountain", "fayfa"], ["فيفاء", "فيفا"]],
    ["Cerrado", "Brazil", ["cerrado"], ["سيرادو"]],
    ["Sul de Minas", "Brazil", ["sul de minas", "minas gerais"], []],
    ["Mogiana", "Brazil", ["mogiana"], []],
    ["Marcala", "Honduras", ["marcala"], []],
    ["Santa Bárbara", "Honduras", ["santa barbara", "santa bárbara"], []],
    ["Cajamarca", "Peru", ["cajamarca"], []],
    ["Chiapas", "Mexico", ["chiapas"], ["تشياباس"]],
    ["Oaxaca", "Mexico", ["oaxaca"], []],
    ["Gayo", "Indonesia", ["gayo"], []],
    ["Nyamasheke", "Rwanda", ["nyamasheke"], []],
    ["Kayanza", "Burundi", ["kayanza"], []]
  ];

  const PROCESS = [ // order matters: most specific first
    ["anaerobic", ["anaerobic", "anaerobe", "carbonic", "thermal shock", "co-ferment", "coferment", "yeast", "infused", "double fermentation", "extended fermentation", "lactic", "experimental"], ["لاهوائي", "لاهوائية", "لا هوائي", "لا هوائية", "تخمير", "مخمر", "مخمرة", "كربوني"]],
    ["honey", ["honey process", "red honey", "yellow honey", "black honey", "white honey", "pulped natural", "honey"], ["عسلي", "عسلية", "هني", "هوني"]],
    ["natural", ["natural", "dry process", "dry processed", "sun dried", "sun-dried", "naturals"], ["مجفف", "مجففة", "طبيعي", "طبيعية", "ناتشورال", "ناتشرال", "مجففه"]],
    ["washed", ["fully washed", "washed", "wet process", "wet processed", "semi-washed", "wet hulled"], ["مغسول", "مغسولة", "مغسوله", "غسيل", "مغسل"]]
  ];
  const ROAST = [
    ["medlight", ["medium light", "medium-light", "light medium", "light-medium", "light to medium"], ["متوسط فاتح", "متوسطة فاتحة", "فاتح متوسط", "متوسط إلى فاتح"]],
    ["meddark", ["medium dark", "medium-dark", "dark medium", "full city"], ["متوسط غامق", "متوسطة غامقة", "متوسط داكن", "غامق متوسط"]],
    ["light", ["light roast", "filter roast", "for filter", "nordic", "light"], ["تحميص فاتح", "تحميصة فاتحة", "فاتح", "فاتحة", "للفلتر", "فلتر"]],
    ["dark", ["dark roast", "espresso roast", "for espresso", "french roast", "italian roast", "dark"], ["تحميص غامق", "غامق", "غامقة", "داكن", "داكنة", "اسبريسو", "إسبريسو"]],
    ["medium", ["medium roast", "omni roast", "omniroast", "omni", "medium"], ["تحميص متوسط", "متوسط", "متوسطة"]]
  ];
  const VARIETIES = [
    ["Gesha", ["geisha", "gesha"], ["جيشا", "قيشا", "غيشا", "جيشة"]],
    ["Pink Bourbon", ["pink bourbon"], ["بوربون وردي", "بوربون الوردي"]],
    ["Red Bourbon", ["red bourbon"], ["بوربون أحمر"]],
    ["Yellow Bourbon", ["yellow bourbon"], ["بوربون أصفر"]],
    ["Bourbon", ["bourbon"], ["بوربون", "بوربن"]],
    ["Typica", ["typica"], ["تيبيكا", "تايبيكا"]],
    ["Caturra", ["caturra"], ["كاتورا"]],
    ["Catuai", ["catuai", "catuaí"], ["كاتواي"]],
    ["Castillo", ["castillo"], ["كاستيلو"]],
    ["SL28", ["sl28", "sl-28", "sl 28"], []],
    ["SL34", ["sl34", "sl-34", "sl 34"], []],
    ["Ruiru 11", ["ruiru"], []],
    ["Batian", ["batian"], []],
    ["Pacamara", ["pacamara"], ["باكامارا"]],
    ["Pacas", ["pacas"], ["باكاس"]],
    ["Maragogype", ["maragogype", "maragogipe"], []],
    ["Sidra", ["sidra"], ["سيدرا"]],
    ["Wush Wush", ["wush wush", "wushwush"], ["وش وش"]],
    ["Java", ["java variety"], []],
    ["Mundo Novo", ["mundo novo"], []],
    ["Laurina", ["laurina"], []],
    ["Eugenioides", ["eugenioides"], []],
    ["Chiroso", ["chiroso"], ["تشيروسو"]],
    ["Tabi", ["tabi"], []],
    ["Marsellesa", ["marsellesa"], []],
    ["Parainema", ["parainema"], []],
    ["74110", ["74110"], []], ["74112", ["74112"], []], ["74158", ["74158"], []],
    ["Udaini", ["udaini"], ["عديني"]],
    ["Tufahi", ["tufahi"], ["تفاحي"]],
    ["Dawairi", ["dawairi"], ["دوائري"]],
    ["Jaadi", ["jaadi"], ["جعدي"]],
    ["Heirloom", ["heirloom", "landrace", "local landrace", "ethiopian heirloom", "indigenous"], ["أصناف محلية", "صنف محلي", "محلية", "بلدي", "هيرلوم"]]
  ];
  // [english, english aliases, arabic aliases]; longer phrases are tried first
  const FLAVORS = [
    ["dark chocolate", ["dark chocolate"], ["شوكولاتة داكنة", "شوكولاته داكنه", "شوكولاتة غامقة"]],
    ["milk chocolate", ["milk chocolate"], ["شوكولاتة بالحليب", "شوكولاته بالحليب", "شوكولاتة الحليب"]],
    ["chocolate", ["chocolate", "chocolatey"], ["شوكولاتة", "شوكولاته", "شوكولا", "شكولاتة"]],
    ["cocoa", ["cocoa", "cacao", "cacao nibs"], ["كاكاو"]],
    ["blueberry", ["blueberry", "blueberries"], ["توت أزرق", "توت ازرق", "التوت الأزرق"]],
    ["strawberry", ["strawberry", "strawberries"], ["فراولة", "فراوله"]],
    ["raspberry", ["raspberry"], ["توت العليق", "توت أحمر", "رازبيري"]],
    ["blackberry", ["blackberry"], ["توت أسود", "بلاك بيري"]],
    ["blackcurrant", ["blackcurrant", "black currant", "cassis"], ["كشمش"]],
    ["cranberry", ["cranberry"], ["توت بري", "كرانبيري"]],
    ["berries", ["berries", "berry", "red berries", "mixed berries"], ["توت", "التوت"]],
    ["red fruits", ["red fruit", "red fruits"], ["فواكه حمراء", "فاكهة حمراء"]],
    ["stone fruit", ["stone fruit"], ["فواكه ذات نواة"]],
    ["tropical fruit", ["tropical", "tropical fruit"], ["استوائية", "استوائي", "فواكه استوائية"]],
    ["dried fruit", ["dried fruit"], ["فواكه مجففة"]],
    ["cherry", ["cherry", "cherries"], ["كرز"]],
    ["grape", ["grape", "grapes", "red grape", "white grape"], ["عنب"]],
    ["green apple", ["green apple"], ["تفاح أخضر", "تفاح اخضر"]],
    ["red apple", ["red apple"], ["تفاح أحمر"]],
    ["apple", ["apple", "apples"], ["تفاح"]],
    ["pear", ["pear"], ["كمثرى", "إجاص", "اجاص"]],
    ["peach", ["peach", "white peach"], ["خوخ", "دراق", "دراقن"]],
    ["nectarine", ["nectarine"], ["نكتارين"]],
    ["apricot", ["apricot"], ["مشمش"]],
    ["plum", ["plum", "plums"], ["برقوق", "خوخ أحمر"]],
    ["mango", ["mango"], ["مانجو", "منجا", "مانقو"]],
    ["pineapple", ["pineapple"], ["أناناس", "اناناس"]],
    ["passion fruit", ["passion fruit", "passionfruit", "maracuya"], ["باشن فروت", "فاكهة العاطفة", "ماراكويا"]],
    ["papaya", ["papaya"], ["بابايا"]],
    ["guava", ["guava"], ["جوافة", "جوافه"]],
    ["lychee", ["lychee", "litchi"], ["ليتشي", "ليchi"]],
    ["kiwi", ["kiwi"], ["كيوي"]],
    ["watermelon", ["watermelon"], ["بطيخ", "بطيخ أحمر"]],
    ["melon", ["melon", "cantaloupe"], ["شمام", "شمّام"]],
    ["pomegranate", ["pomegranate"], ["رمان", "رمّان"]],
    ["fig", ["fig", "figs"], ["تين"]],
    ["date", ["dates", "medjool"], ["تمر", "تمور"]],
    ["raisin", ["raisin", "raisins"], ["زبيب"]],
    ["grapefruit", ["grapefruit"], ["جريب فروت", "قريب فروت", "ليمون هندي"]],
    ["bergamot", ["bergamot"], ["برغموت", "برقموت", "برجموت"]],
    ["lemon", ["lemon", "lemony", "lemongrass"], ["ليمون", "ليمونة"]],
    ["lime", ["lime"], ["لايم", "ليم"]],
    ["orange", ["orange", "blood orange"], ["برتقال", "برتقالي"]],
    ["tangerine", ["tangerine", "mandarin", "clementine"], ["يوسفي", "يوسف أفندي", "ماندرين", "مندلينا", "كلمنتينا"]],
    ["citrus", ["citrus", "citric"], ["حمضيات", "حمضي", "حمضية"]],
    ["jasmine", ["jasmine"], ["ياسمين"]],
    ["rose", ["rose", "rosewater", "rose hip"], ["ورد", "وردي", "ماء الورد"]],
    ["lavender", ["lavender"], ["لافندر", "خزامى"]],
    ["hibiscus", ["hibiscus"], ["كركديه", "كركدية"]],
    ["chamomile", ["chamomile"], ["بابونج"]],
    ["orange blossom", ["orange blossom"], ["زهر البرتقال", "زهر الليمون"]],
    ["floral", ["floral", "florals", "flowery", "blossom"], ["زهري", "زهرية", "زهور", "أزهار", "ازهار"]],
    ["earl grey", ["earl grey"], ["إيرل جراي", "ايرل جري"]],
    ["black tea", ["black tea"], ["شاي أسود", "شاي احمر"]],
    ["tea-like", ["tea-like", "tea like", "tea", "oolong"], ["شاي"]],
    ["honey", ["honey", "honeyed"], ["عسل"]],
    ["caramel", ["caramel", "caramelized", "salted caramel"], ["كراميل", "كرميل"]],
    ["toffee", ["toffee", "butterscotch"], ["توفي", "توفيه"]],
    ["brown sugar", ["brown sugar", "panela", "demerara"], ["سكر بني", "سكر أسمر"]],
    ["molasses", ["molasses"], ["دبس", "عسل أسود"]],
    ["maple", ["maple", "maple syrup"], ["القيقب", "شراب القيقب"]],
    ["vanilla", ["vanilla"], ["فانيلا", "فانيليا"]],
    ["marzipan", ["marzipan"], ["مرزبان"]],
    ["nougat", ["nougat"], ["نوغا"]],
    ["praline", ["praline"], ["برالين"]],
    ["hazelnut", ["hazelnut", "hazelnuts"], ["بندق"]],
    ["almond", ["almond", "almonds"], ["لوز"]],
    ["walnut", ["walnut", "walnuts"], ["جوز", "عين الجمل"]],
    ["pecan", ["pecan"], ["بيكان"]],
    ["peanut", ["peanut"], ["فول سوداني", "فستق سوداني"]],
    ["pistachio", ["pistachio"], ["فستق حلبي", "فستق"]],
    ["nutty", ["nutty", "nuts", "nut"], ["مكسرات"]],
    ["coconut", ["coconut"], ["جوز الهند"]],
    ["cinnamon", ["cinnamon"], ["قرفة", "دارسين"]],
    ["cardamom", ["cardamom"], ["هيل", "حبهان"]],
    ["clove", ["clove", "cloves"], ["قرنفل"]],
    ["nutmeg", ["nutmeg"], ["جوزة الطيب"]],
    ["ginger", ["ginger"], ["زنجبيل"]],
    ["spice", ["spice", "spiced", "spicy", "baking spice"], ["بهارات", "توابل"]],
    ["cola", ["cola"], ["كولا"]],
    ["malt", ["malt", "malty"], ["شعير", "مالت"]],
    ["tobacco", ["tobacco"], ["تبغ"]],
    ["cedar", ["cedar", "woody"], ["أرز", "خشبي"]],
    ["smoky", ["smoky", "smoke"], ["مدخن", "دخاني"]],
    ["winey", ["winey", "wine-like", "wine"], ["نبيذي"]],
    ["rum", ["rum"], ["روم"]],
    ["creamy", ["creamy"], ["كريمي", "كريمية"]],
    ["buttery", ["buttery", "butter"], ["زبدة", "زبدي"]],
    ["juicy", ["juicy"], ["عصيري", "عصيرية"]],
    ["syrupy", ["syrupy"], ["شرابي"]]
  ];

  // ---------- text normalisation ----------
  const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩", FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
  function normalize(t) {
    return String(t || "")
      .replace(/[٠-٩]/g, d => AR_DIGITS.indexOf(d)).replace(/[۰-۹]/g, d => FA_DIGITS.indexOf(d))
      .replace(/[ً-ْـ]/g, "")          // Arabic diacritics + tatweel
      .replace(/[إأآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/[،؛]/g, ",").replace(/؟/g, "?")
      .replace(/[’`´]/g, "'").replace(/[–—]/g, "-")
      .toLowerCase();
  }
  const normAr = s => normalize(s);
  const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Find the earliest position of any alias. English uses word boundaries; Arabic allows the "ال" prefix and attached letters.
  function findAlias(text, en, ar) {
    let best = -1, len = 0;
    for (const a of en || []) {
      const re = new RegExp("(^|[^a-z0-9À-ɏ])" + escapeRe(a) + "(?![a-zÀ-ɏ])", "i");
      const m = re.exec(text);
      if (m) { const i = m.index + m[1].length; if (best < 0 || i < best || (i === best && a.length > len)) { best = i; len = a.length; } }
    }
    for (const a0 of ar || []) {
      const a = normAr(a0);
      const re = new RegExp("(^|[^\\u0621-\\u064A])(ال|وال|و|بال|ب)?" + escapeRe(a) + "(?![\\u0621-\\u064A]{2,})");
      const m = re.exec(text);
      if (m) { const i = m.index + m[1].length; if (best < 0 || i < best) { best = i; len = a.length; } }
    }
    return best < 0 ? null : {index: best, length: len};
  }

  function firstMatch(text, table) {
    // tables are ordered by priority; return the first entry that matches anywhere
    for (const row of table) { const hit = findAlias(text, row[1], row[2]); if (hit) return row[0]; }
    return null;
  }

  function findOrigin(text) {
    let best = null;
    for (const [name, en, ar] of ORIGINS) {
      const hit = findAlias(text, en, ar);
      if (hit && (!best || hit.index < best.index)) best = {name, index: hit.index};
    }
    return best ? best.name : null;
  }
  function findRegion(text) {
    let best = null;
    for (const [name, origin, en, ar] of REGIONS) {
      const hit = findAlias(text, en, ar);
      if (hit && (!best || hit.index < best.index)) best = {name, origin, index: hit.index};
    }
    return best;
  }

  function findAltitude(text) {
    const t = text.replace(/(\d),(\d{3})/g, "$1$2").replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2");
    const unit = "(?:m\\.?a\\.?s\\.?l\\.?|masl|meters?|metres?|mts?|m(?![a-z])|متر|م(?![؀-ۿ]))";
    const range = new RegExp("(\\d{3,4})\\s*(?:-|to|~|/|الى|إلى|–)\\s*(\\d{3,4})\\s*" + unit, "i");
    const single = new RegExp("(\\d{3,4})\\s*\\+?\\s*" + unit, "i");
    const labeled = /(?:altitude|elevation|alt\.?|height|الارتفاع|ارتفاع)\s*[:\-]?\s*(\d{3,4})(?:\s*(?:-|to|~|الى)\s*(\d{3,4}))?/i;
    const ok = n => n >= 400 && n <= 3200;
    let m = range.exec(t); if (m && ok(+m[2])) return +m[2];
    m = labeled.exec(t); if (m) { const v = +(m[2] || m[1]); if (ok(v)) return v; }
    m = single.exec(t); if (m && ok(+m[1])) return +m[1];
    return null;
  }

  function findVariety(text) {
    const found = [];
    for (const [name, en, ar] of VARIETIES) {
      const hit = findAlias(text, en, ar);
      if (hit && !found.some(f => f.name.includes(name) || name.includes(f.name) && f.name !== name && false)) found.push({name, index: hit.index});
    }
    // drop "Bourbon" if a coloured bourbon was found
    const names = found.map(f => f.name);
    const cleaned = found.filter(f => !(f.name === "Bourbon" && names.some(n => /Bourbon/.test(n) && n !== "Bourbon")));
    cleaned.sort((a, b) => a.index - b.index);
    return cleaned.slice(0, 3).map(f => f.name).join(", ") || null;
  }

  function findNotes(text) {
    // Prefer a "tasting notes" line if present, otherwise scan the whole text.
    const label = /(tasting notes?|notes?|flavou?r notes?|flavou?rs?|cup profile|we taste|الإيحاءات|الايحاءات|ايحاءات|النكهات|نكهات|النوتات|نوتات|الطعم|مذاق)\s*[:\-]?/i;
    const lines = text.split(/\n+/);
    let scope = text;
    const li = lines.findIndex(l => label.test(l));
    if (li >= 0) scope = lines.slice(li, li + 3).join("\n");
    const found = [];
    const taken = [];
    const collect = (src) => {
      for (const [name, en, ar] of FLAVORS) {
        if (found.some(f => f.name === name)) continue;
        // find all occurrences, skip ones already covered by a longer phrase
        const hit = findAlias(src, en, ar);
        if (!hit) continue;
        const end = hit.index + hit.length;
        if (taken.some(([a, b]) => hit.index >= a && hit.index < b)) continue;
        // "honey" as a process word is not a flavour
        if (name === "honey" && /honey\s*(process|processed)|(red|yellow|black|white)\s*honey|عسلي|عسلية/.test(src)) continue;
        if (name === "tea-like" && /\btea\b/.test(src) === false && !/شاي/.test(src)) continue;
        taken.push([hit.index, end]);
        found.push({name, index: hit.index});
      }
    };
    collect(scope);
    if (!found.length && scope !== text) collect(text);
    // remove generic words when a specific one exists
    const names = found.map(f => f.name);
    const generic = {chocolate: ["dark chocolate", "milk chocolate"], apple: ["green apple", "red apple"], berries: ["blueberry", "strawberry", "raspberry", "blackberry", "cranberry"], floral: ["jasmine", "rose", "lavender", "orange blossom"], citrus: ["lemon", "lime", "orange", "tangerine", "grapefruit", "bergamot"]};
    const out = found.filter(f => !(generic[f.name] || []).some(s => names.includes(s)) || f.name === "citrus" && names.filter(n => generic.citrus.includes(n)).length === 0);
    out.sort((a, b) => a.index - b.index);
    return out.slice(0, 5).map(f => f.name);
  }

  function findName(raw, text, region) {
    // farm / washing station / estate line wins; else region
    const lines = raw.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const farmRe = /\b(farm|finca|estate|hacienda|washing station|station|cooperative|co-op|producer|lot)\b|مزرعة|مزرعه|محطة|محطه|تعاونية/i;
    for (const l of lines) {
      if (!farmRe.test(l)) continue;
      // "Farm: El Paraiso" -> "El Paraiso" ; "Hambela Washing Station" stays
      let v = l.replace(/^(farm|finca|producer|estate|station|washing station|lot|المزرعة|مزرعة|المحطة|محطة)\s*[:\-]\s*/i, "").replace(/[|•·]+/g, " ").trim();
      if (/^(producer|farmer|المنتج)\b/i.test(l)) continue;
      if (v.length >= 3 && v.length <= 48 && !/\d{3,}/.test(v)) return tidy(v);
    }
    return region ? region.name : null;
  }
  const tidy = s => {
    s = s.replace(/\s{2,}/g, " ").replace(/^[^\p{L}]+|[^\p{L}\d)]+$/gu, "");
    const latin = s.replace(/[^A-Za-z]/g, "");
    if (latin.length > 2 && (latin === latin.toUpperCase() || latin === latin.toLowerCase()))
      s = s.toLowerCase().replace(/(^|[\s\-'(])([a-z\u00e0-\u00ff])/g, (m, a, b) => a + b.toUpperCase());
    return s;
  };

  function parseBag(raw) {
    const text = normalize(raw);
    const region = findRegion(text);
    const origin = findOrigin(text) || (region && region.origin) || null;
    const res = {
      name: findName(String(raw || ""), text, region),
      origin,
      process: firstMatch(text, PROCESS),
      roast: firstMatch(text, ROAST),
      variety: findVariety(text),
      altitude: findAltitude(text),
      notes: findNotes(text)
    };
    // a "natural" match that is really "natural sweetness" in the notes is common; require process context for "natural" when washed also appears
    if (res.process === "natural" && /washed|مغسول/.test(text) && !/natural process|process[:\s]*natural|المعالجة\s*[:\-]?\s*(طبيعي|مجفف)/.test(text)) res.process = "washed";
    res.found = Object.entries(res).filter(([k, v]) => v && (!Array.isArray(v) || v.length)).map(([k]) => k);
    return res;
  }

  root.parseBag = parseBag;
  if (typeof module !== "undefined") module.exports = {parseBag, normalize};
})(typeof window !== "undefined" ? window : globalThis);
