// game.js
const app = getApp();

Page({
  data: {
    currentWord: '',
    score: 0,
    timeLeft: 60,
    formatTime: '01:00',
    timeWarning: false,
    isPaused: false,
    animating: false,
    usedWords: [],
    showEndGameConfirm: false
  },

  onLoad() {
    // 设置初始时间
    this.setData({
      timeLeft: app.globalData.gameSettings.gameTime,
      formatTime: this.formatTime(app.globalData.gameSettings.gameTime)
    });

    // 获取第一个词语
    this.nextWord();

    // 开始游戏计时器
    this.startTimer();
  },

  // 开始计时器
  startTimer() {
    this.timer = setInterval(() => {
      if (this.data.isPaused) return;

      let timeLeft = this.data.timeLeft - 1;
      let timeWarning = timeLeft <= 10; // 最后10秒显示警告

      this.setData({
        timeLeft,
        formatTime: this.formatTime(timeLeft),
        timeWarning
      });

      // 时间到，结束游戏
      if (timeLeft <= 0) {
        clearInterval(this.timer);
        this.endGame();
      }
    }, 1000);
  },

  // 格式化时间显示 (mm:ss)
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // 下一个词语
  nextWord() {
    // 播放翻转动画
    this.setData({ animating: true });

    setTimeout(() => {
      // 获取新词语
      const newWord = app.getRandomWord(this.data.usedWords);
      const usedWords = [...this.data.usedWords, newWord];

      this.setData({
        currentWord: newWord,
        usedWords,
        animating: false
      });
    }, 250); // 动画中间点
  },

  // 猜对处理
  wordCorrect() {
    // 更新得分
    const score = this.data.score + 1;

    // 添加到猜对列表
    const gameResult = app.globalData.gameResult;
    gameResult.correctWords.push(this.data.currentWord);
    gameResult.score = score;

    // 更新页面数据并显示下一词
    this.setData({ score });
    this.nextWord();
  },

  // 跳过处理
  wordSkip() {
    // 添加到跳过列表
    app.globalData.gameResult.skippedWords.push(this.data.currentWord);

    // 显示下一词
    this.nextWord();
  },

  // 显示终止游戏确认
  showEndConfirm() {
    this.setData({
      isPaused: true,
      showEndGameConfirm: true
    });
  },

  // 从暂停界面显示终止游戏确认
  endGameWithConfirm() {
    this.setData({
      isPaused: false,
      showEndGameConfirm: true
    });
  },

  // 取消终止游戏
  cancelEndGame() {
    this.setData({
      showEndGameConfirm: false,
      isPaused: false
    });
  },

  // 暂停游戏
  pauseGame() {
    this.setData({ isPaused: true });
  },

  // 继续游戏
  resumeGame() {
    this.setData({ isPaused: false });
  },

  // 退出游戏
  quitGame() {
    clearInterval(this.timer);
    wx.navigateBack();
  },

  // 结束游戏，跳转到结果页
  endGame() {
    clearInterval(this.timer);

    // 保存当前得分和结果
    app.globalData.gameResult.score = this.data.score;

    wx.navigateTo({
      url: '/pages/result/result'
    });
  },

  // 页面卸载，清除计时器
  onUnload() {
    clearInterval(this.timer);
  }
}) 