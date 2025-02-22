// 监听页面加载完成
window.addEventListener('load', () => {
  // 延时确保动态内容加载
  setTimeout(collectPageContent, 2000)
})

function collectPageContent() {
  // 获取浏览器内容
  const content = document.body.innerText
    .replace(/\s+/g, ' ')
    .substring(0, 5000) // 主要一个网页前几个字应该也能看出来个大概了

  console.log(content)
  // 发送给后台脚本
  chrome.runtime.sendMessage({
    type: 'CONTENT_ANALYSIS',
    data: {
      url: location.href,
      content: content,
    },
  })
}
