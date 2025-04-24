// prepare.js
const app = getApp();

Page({
  data: {
    gameTime: 60, // 默认游戏时间为60秒
    libraryName: '通用词库',
    wordCount: 0,
    showCountdown: false,
    countdown: 3
  },

  onLoad() {
    // 获取全局设置的游戏时间
    const selectedLibrary = app.globalData.selectedLibrary;
    const wordCount = app.globalData.wordLibraries[selectedLibrary].length;

    this.setData({
      gameTime: app.globalData.gameSettings.gameTime,
      libraryName: selectedLibrary,
      wordCount: wordCount
    });

    // 重置游戏结果
    app.resetGameResult();
  },

  // 选择游戏时间
  selectGameTime(e) {
    const gameTime = parseInt(e.currentTarget.dataset.time);
    this.setData({ gameTime });
    app.globalData.gameSettings.gameTime = gameTime;

    // 播放选择音效或添加触感反馈
    wx.vibrateShort({
      type: 'light'
    });
  },

  // 开始倒计时
  startCountdown() {
    this.setData({
      showCountdown: true,
      countdown: 3
    });

    // 开始倒计时
    this.countdownTimer = setInterval(() => {
      let countdown = this.data.countdown - 1;

      if (countdown <= 0) {
        // 倒计时结束，清除定时器
        clearInterval(this.countdownTimer);

        // 短暂延迟后跳转到游戏页面
        setTimeout(() => {
          this.setData({
            showCountdown: false
          });
          this.startGame();
        }, 500);
      } else {
        // 更新倒计时数字
        this.setData({
          countdown: countdown
        });
      }
    }, 1000);
  },

  // 开始游戏
  startGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    });
  },

  // 返回首页
  goBack() {
    wx.navigateBack();
  },

  // 页面卸载时清除倒计时
  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }
}) 