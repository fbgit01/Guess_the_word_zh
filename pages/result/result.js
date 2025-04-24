const app = getApp();

Page({
  data: {
    score: 0,
    correctWords: [],
    skippedWords: []
  },

  onLoad() {
    // 从全局获取游戏结果
    const gameResult = app.globalData.gameResult;

    this.setData({
      score: gameResult.score,
      correctWords: gameResult.correctWords,
      skippedWords: gameResult.skippedWords
    });
  },

  // 再来一局
  playAgain() {
    // 重置游戏结果
    app.resetGameResult();

    // 跳转到准备页面
    wx.redirectTo({
      url: '/pages/prepare/prepare'
    });
  },

  // 返回首页
  goToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: `我在疯狂猜词游戏中获得了${this.data.score}分，一起来玩吧！`,
      path: '/pages/index/index',
      imageUrl: '/images/share-img.png' // 可以放一张分享图
    };
  }
}) 