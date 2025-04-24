// index.js
const app = getApp();

Page({
  data: {
    selectedLibrary: '流行文化',
    libraryWordCount: 0
  },

  onLoad() {
    this.updateLibraryInfo();
  },

  onShow() {
    // 每次显示页面时更新词库信息
    this.updateLibraryInfo();
  },

  // 更新词库信息
  updateLibraryInfo() {
    const selectedLibrary = app.globalData.selectedLibrary;
    const libraryWordCount = app.globalData.wordLibraries[selectedLibrary].length;

    this.setData({
      selectedLibrary,
      libraryWordCount
    });
  },

  // 选择词库
  selectLibrary(e) {
    const libraryName = e.currentTarget.dataset.library;
    // 直接设置词库，不显示弹窗提示
    app.setWordLibrary(libraryName);
    this.updateLibraryInfo();
    console.log('已选择词库:', libraryName); // 添加日志调试
  },

  startGame() {
    // 跳转到准备页面
    wx.navigateTo({
      url: '/pages/prepare/prepare'
    });
  },

  goToRules() {
    // 跳转到规则页面
    wx.navigateTo({
      url: '/pages/rules/rules'
    });
  }
})
