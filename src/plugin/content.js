const createOverlay = () => {
  // 创建遮罩层
  const overlay = document.createElement('div')
  overlay.id = 'safeseek_overlay'
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
        collectPageContent(JSON.parse(result.config))
        return
      }
    }

    collectPageContent({
      basic: {
        block: false,
        isDeepSeekR1: true,
      },
      content: {
        terror: false,
        porn: false,
        game: true,
        stars: true,
        politics: true,
        otherButStudy: true,
      },
      apiKey: '',
    })
  })
})

function collectPageContent(config) {
  const content = document.body.innerText
    .replace(/\s+/g, ' ')
    .substring(0, 5000) // 主要一个网页前几个字应该也能看出来个大概了

  console.log(content)

  const cannotVisit = []

  if (!config.content.terror) {
    cannotVisit.push('Terror and violence')
  }
  if (!config.content.porn) {
    cannotVisit.push('Porn and Adult Content')
  }
  if (!config.content.game) {
    cannotVisit.push('Video Games and Online Games')
  }
  if (!config.content.stars) {
    cannotVisit.push(
      'Star chasing, variety shows, gossip and entertainment news',
    )
  }
  if (!config.content.politics) {
    cannotVisit.push(
      'Politics, keyboard politics, online politics and entertainment politics',
    )
  }
  if (!config.content.politics) {
    cannotVisit.push('No learning or entertainment content')
  }

  fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.basic.isDeepSeekR1 ? 'deepseek-reasoner' : 'deepseek-chat',
      response_format: {
        type: 'json_object',
      },
      messages: [
        {
          role: 'system',
          content: `
The user is a student and he needs a clear website environment. Need you to judge if the website clear or unhealthy 
The user will provide a json struct. Please read the "cannotVisit" array "value" and "url" strings of it
"value" is the text of the webpage and "cannotVisit" is user's option. the array items is the things user want to block things
Your job is to read the "value" and judge is the website a type of "cannotVisit" with "url" and return a json with "result"(boolean)
If the value can be describe with the words in "cannotVisit", the "result" key should be false
EXAMPLE INPUT: 
{
    "value": "Skip to Main Content Welcome to the official site of Minecraft Dungeons & Dragons returns Begin a new adventure with familiar heroes in Dungeons & Dragons: A New Quest! Dive back into the magical world of Faerûn today. DOWNLOAD DLC Get Minecraft Discover our games Minecraft Sandbox Survival, Adventure Single-player + Multiplayer Minecraft Dungeons Dungeon Crawl, Action RPG Single-player + Multiplayer Minecraft Legends Action RPG, Strategy Single-player + Multiplayer Minecraft Education Education, Sandbox Survival, Adventure Single-player + Multiplayer Gameplay Trailers Minecraft Watch the trailer Explore your own unique worlds, survive the night, and create anything you can imagine! Watch the sample video of Minecraft gameplay above, or select 'watch the trailer' to see the full video on YouTube. LEARN MORE Minecraft Dungeons Minecraft Legends Minecraft Education Newest news See all news MARKETPLACE Dungeons & Dragons: A New Quest NEWS Test new egg-citing features NEWS Minecraft Snapshot 25w08a DEEP DIVES Taking Inventory: Ender Pearl DEEP DIVES Building Blocks: Ocean Monument NEWS Minecraft Experience is coming to London NEWS Minecraft Snapshot 25w07a NEWS Test new ways of exploring NEWS Minecraft 1.21.60 Bedrock Changelog DEEP DIVES A fish out of water Need to redownload?",
    "url": "https://www.minecraft.net/en-us",
    "cannotVisit": ["game","porn"]
}

EXAMPLE JSON OUTPUT:
{
    "result": false
}
    
EXAMPLE TWO: 
{
    "value": "翻译 翻译类型 文字 图片 文档 网站 文本翻译 英语 - 检测到的语言 英语 中文（简体） 德语 swap_horiz 英语 中文（简体） 日语 原文 clear 7 / 5,000 正在加载… 翻译结果 翻译结果 Skipped star_border 发送反馈 侧边栏 历史记录 已保存 有翻译结果",
    "url": "https://translate.google.com/?sl=auto&tl=en&text=Skipped&op=translate",
    "cannotVisit": ["game","porn"]
}

EXAMPLE JSON OUTPUT:
{
    "result": true
}`,
        },
        {
          role: 'user',
          content: JSON.stringify({
            value: content,
            url: document.URL,
            cannotVisit,
          }),
        },
      ],
      stream: false,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error !== null && data.error !== undefined) {
        if (config.basic.block) {
          document.getElementById('safeseek_checking_text').innerHTML =
            data.error.message
        } else {
          alert('发生错误! ' + data.error.message)
        }
      } else {
        if (data.choice[0].message.content !== null) {
          const content = removeAfterJSON(
            removeBeforeJSON(removeBeforeThink(data.choice[0].message.content)),
          ).trim()

          if (config.basic.block) {
            if (JSON.parse(content).result) {
              document.getElementById('safeseek_overlay').remove()
            } else {
              document.getElementById('safeseek_checking_text').innerHTML =
                '该网页不适合您的访问!'
            }
          } else {
            if (!JSON.parse(content).result) {
              alert('该网页不适合您的访问')
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function removeBeforeThink(str) {
  const index = str.indexOf('</think>')
  if (index !== -1) {
    return str.slice(index + '</think>'.length)
  }
  return str
}

function removeBeforeJSON(str) {
  const index = str.indexOf('{')
  if (index !== -1) {
    return str.slice(index)
  }
  return str
}

function removeAfterJSON(str) {
  const index = str.indexOf('}')
  if (index !== -1) {
    return str.slice(0, index)
  }
  return str
}
