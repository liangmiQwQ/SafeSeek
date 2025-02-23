const createOverlay = () => {
  // 创建遮罩层
  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.width = '100%'
  overlay.style.height = '100%'
  overlay.style.background = 'rgba(0, 0, 0, 0.5)'
  overlay.style.backdropFilter = 'blur(10px)'
  overlay.style.display = 'flex'
  overlay.style.justifyContent = 'center'
  overlay.style.alignItems = 'center'
  overlay.style.zIndex = '9999'

  // 创建提示文字
  const message = document.createElement('div')
  message.id = 'safeseek_checking_text'
  message.textContent = '正在检查网页是否适合您访问'
  message.style.color = 'white'
  message.style.fontSize = '30px'
  message.style.fontWeight = 'bold'
  message.style.textAlign = 'center'

  // 将提示文字添加到遮罩层
  overlay.appendChild(message)

  // 将遮罩层添加到页面
  document.body.appendChild(overlay)
}

window.addEventListener('load', () => {
  chrome.storage.sync.get('config', (result) => {
    if (result !== null && result !== undefined) {
      if (
        result.config !== null &&
        result.config !== undefined &&
        result.config !== ''
      ) {
        if (JSON.parse(result.config).basic.block) {
          createOverlay()
        }
      }
    }
  })

  collectPageContent()
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
