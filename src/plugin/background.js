const DEEPSEEK_API_KEY = 'your_api_key_here' // 建议通过用户配置获取

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CONTENT_ANALYSIS') {
    analyzeContent(request.data)
      .then((result) => showResultNotification(result))
      .catch((error) => console.error('Analysis failed:', error))
  }
})

async function analyzeContent(data) {
  const response = await fetch('https://api.deepseek.com/v1/content/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      text: data.content,
      features: ['violence', 'adult', 'drugs'], // 根据API要求调整
    }),
  })

  return response.json()
}

function showResultNotification(result) {
  if (result.rating === 'unsafe') {
    chrome.action.setIcon({ path: 'icons/warning.png' })
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: '内容安全警告',
      message: '该页面可能包含不适合青少年的内容',
    })
  }
}
