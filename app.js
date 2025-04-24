// app.js
App({
  onLaunch() {
    // 初始化词库
    this.initWordLibraries();
  },

  globalData: {
    wordsList: [],
    wordLibraries: {},
    selectedLibrary: '流行文化',
    gameSettings: {
      gameTime: 60, // 默认游戏时间60秒
      mode: 'casual' // 默认休闲模式
    },
    gameResult: {
      correctWords: [],
      skippedWords: [],
      score: 0
    }
  },

  // 初始化词库
  initWordLibraries() {
    this.globalData.wordLibraries = this.getWordsData();
    // 随机选择词库中的词，保证每次游戏词库内容不同
    this.refreshWordLibraries();
    // 设置默认词库
    this.globalData.wordsList = this.globalData.wordLibraries['流行文化'];
  },

  // 刷新词库内容
  refreshWordLibraries() {
    const libraries = this.globalData.wordLibraries;

    // 为每个词库随机选择词语
    for (const libraryName in libraries) {
      if (libraries.hasOwnProperty(libraryName)) {
        const fullLibrary = libraries[libraryName];
        const selectedWords = this.getRandomWordsFromLibrary(fullLibrary, 30); // 每个词库选择30个词
        libraries[libraryName] = selectedWords;
      }
    }
  },

  // 从完整词库中随机选择一定数量的词
  getRandomWordsFromLibrary(library, count) {
    const shuffled = [...library].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, library.length));
  },

  // 词库数据
  getWordsData() {
    return {
      '流行文化': [
        // 网络热词
        "内卷", "躺平", "奥利给", "绝绝子", "永远的神",
        "整活", "破防", "真香", "摸鱼", "打工人",
        "塌房", "锁死", "无语子", "YYDS", "C位",
        "硬糖少女", "网抑云", "脱口秀", "斗鱼一姐", "王者荣耀",
        "杠精", "柠檬精", "小鲜肉", "盲盒", "双向奔赴",
        "嘎嘎猛", "太真实了", "一起爬山吗", "啊这", "生活很苦但请你足够甜",
        "逮虾户", "社死", "XXX冲鸭", "猛男必看", "吸猫",
        "yysy", "破大防", "好家伙", "爱要大声说出来", "笑死",
        "哈哈哈哈哈哈", "awsl", "老铁双击666", "我不听我不听", "吹爆",
        "666", "秀", "你币有了", "神仙打架", "上头"
      ],
      '影视动漫': [
        // 热门影视剧、动漫
        "三体", "长安三万里", "独行月球", "满江红", "坚如磐石",
        "流浪地球", "你好李焕英", "长津湖", "八角笼中", "消失的她",
        "人生大事", "熊出没", "刺客伍六七", "斗罗大陆", "海贼王",
        "鬼灭之刃", "间谍过家家", "进击的巨人", "咒术回战", "名侦探柯南",
        "英雄联盟", "原神", "王者荣耀", "和平精英", "崩坏星穹铁道",
        "哈利波特", "复仇者联盟", "速度与激情", "变形金刚", "蜘蛛侠",
        "奥特曼", "蓝精灵", "汪汪队立大功", "机器猫", "喜羊羊与灰太狼",
        "柯南", "海绵宝宝", "小猪佩奇", "超级飞侠", "帮帮龙出动",
        "猫和老鼠", "火影忍者", "哪吒", "大圣归来", "葫芦娃",
        "天线宝宝", "熊出没", "蜡笔小新", "樱桃小丸子", "白蛇"
      ],
      '网络流行语': [
        // 网络流行词汇
        "顶流", "粉丝", "up主", "直播带货", "剧本杀",
        "蹲一个", "早八人", "打工魂", "打工人", "脱单",
        "上头", "摸鱼", "摆烂", "润", "内卷",
        "财富密码", "社恐", "斩男色", "凡尔赛", "双减",
        "谈恋爱", "脱单", "钓鱼", "蹲一个", "锁死",
        "对镜头说话", "三连", "原地爆炸", "我不要你觉得", "XSWL",
        "有生之年", "我是一只鱼", "阴阳怪气", "沙雕", "啊对对对",
        "XXX冲鸭", "猛男落泪", "啥也不是", "比心", "真香",
        "人间清醒", "不愧是你", "到此一游", "无语住了", "鸡你太美",
        "学不会", "知识点", "弹幕", "薯条鸡翅", "我不允许"
      ],
      '音乐潮流': [
        // 音乐相关
        "薛之谦", "华晨宇", "周杰伦", "蔡徐坤", "鹿晗",
        "易烊千玺", "王俊凯", "王源", "肖战", "李易峰",
        "迪丽热巴", "杨幂", "Eason", "JJ", "五月天",
        "李宇春", "邓紫棋", "张艺兴", "TFBOYS", "SNH48",
        "街舞", "说唱", "Battle", "说唱", "打碟",
        "R&B", "嘻哈", "电音", "中国风", "摇滚",
        "抖音热歌", "快手歌曲", "网易云热歌", "音乐节", "演唱会",
        "麦克风", "舞台", "乐队", "粉丝应援", "现场直播",
        "国风", "嘻哈", "说唱", "腰带", "丝巾",
        "复古", "汉服", "潮牌", "锁骨链", "耳钉"
      ],
      '游戏电竞': [
        // 游戏电竞
        "英雄联盟", "王者荣耀", "和平精英", "原神", "崩坏星穹铁道",
        "吃鸡", "LOL", "Dota2", "CS:GO", "守望先锋",
        "Steam", "Epic", "暗黑破坏神", "怪物猎人", "任天堂",
        "PSP", "塞尔达", "塞尔达传说", "宝可梦", "皮卡丘",
        "第五人格", "我的世界", "迷你世界", "明日之后", "方舟生存进化",
        "植物大战僵尸", "赛马娘", "永劫无间", "哈利波特魔法觉醒", "使命召唤",
        "战神", "最终幻想", "生化危机", "战地", "彩虹六号",
        "头号玩家", "太空狼人杀", "阴阳师", "火影忍者", "一拳超人",
        "FPS", "TPS", "RPG", "开放世界", "回合制",
        "肝游戏", "氪金", "抽卡", "卡池", "皮肤"
      ],
      '美食探店': [
        // 美食、饮品
        "螺蛳粉", "爆柠茶", "茶百道", "喜茶", "奈雪的茶",
        "蜜雪冰城", "古茗", "沪上阿姨", "鲍师傅", "肯德基",
        "麦当劳", "汉堡王", "星巴克", "瑞幸咖啡", "COCO都可",
        "奶茶", "咖啡", "烧烤", "火锅", "麻辣烫",
        "小龙虾", "烤肉", "寿司", "冒菜", "麻小",
        "泡面", "炸鸡", "汉堡", "鸡排", "酸菜鱼",
        "烤冷面", "鸭脖", "臭豆腐", "煎饼果子", "肉夹馍",
        "生煎", "小笼包", "盖浇饭", "酸辣粉", "饺子",
        "探店", "吃播", "美食vlog", "必吃榜", "网红店",
        "爆款", "试吃", "深夜食堂", "安利", "回购"
      ]
    };
  },

  // 随机获取一个词
  getRandomWord(usedWords = []) {
    const wordsList = this.globalData.wordsList;
    const availableWords = wordsList.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) return "没有更多词语了";

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
  },

  // 设置当前选择的词库
  setWordLibrary(libraryName) {
    if (this.globalData.wordLibraries[libraryName]) {
      this.globalData.selectedLibrary = libraryName;
      this.globalData.wordsList = this.globalData.wordLibraries[libraryName];
    }
  },

  // 重置游戏结果并刷新词库
  resetGameResult() {
    // 重置游戏结果
    this.globalData.gameResult = {
      correctWords: [],
      skippedWords: [],
      score: 0
    };

    // 刷新词库内容，使每次游戏词语不同
    this.refreshWordLibraries();
    // 更新当前选中的词库
    this.globalData.wordsList = this.globalData.wordLibraries[this.globalData.selectedLibrary];
  }
})
