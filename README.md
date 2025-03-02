# SafeSeek - 青少年智能网页安全卫士

[![GitHub License](https://img.shields.io/github/license/liangmiqwq/safeseek)](https://github.com/liangmiqwq/safeseek)

> "让网络成为学习的盟友，而非威胁"  
> 一个轻量级浏览器插件，通过AI实时守护中小学生上网安全

## 🚀 快速开始

### 安装方式

1. 找到文件夹的dist.zip文件 [dist.zip]
2. 解压到任意目录（建议命名为`safeseek`）
3. 浏览器加载插件：
   - **Chrome/Edge**：  
     访问 `chrome://extensions` → 开启「开发者模式」→ 「加载已解压的扩展程序」

### 获取API密钥（必做）

1. 访问 [DeepSeek官网](https://platform.deepseek.com/) 注册账号
2. 在控制台创建API密钥（选择`deepseek-reasoner`模型）
3. 点击插件图标 → 在输入框粘贴密钥 → 点击保存

## ✨ 核心功能

### 智能过滤模式

- 即时检测：打开网页时自动扫描文本内容（仅分析前5000字符）
- 动态拦截：检测到不良内容时自动模糊化页面
- 自定义规则：支持6类内容过滤开关（见配置面板）

### 人性化交互

- 非侵入式提示：半透明遮罩层+醒目标语

## ⚙️ 配置指南

点击插件图标进入配置面板：

| 配置项          | 说明                                                          |
| --------------- | ------------------------------------------------------------- |
| 🔒 拦截模式     | 开启后自动模糊化风险网页（默认关闭，仅提示）                  |
| 🧠 R1检查引擎   | 使用更智能的`deepseek-reasoner`模型（推荐开启）               |
| 🚫 过滤内容类型 | 勾选**不需要**屏蔽的内容类别（暴力/成人/游戏/八卦/政治/其他） |

## ⚠️ 注意事项

1. **性能优化**：
   - 首次加载需等待3秒模型初始化
   - 连续访问同域名网站时自动缓存结果（有效期30分钟）
2. **兼容性说明**：
   - 支持 Chrome 89+/Edge 92+/Firefox 101+
   - 不支持动态加载网页（如部分社交媒体）的实时检测
3. **隐私保护**：
   - 所有文本分析通过API完成，不留存任何浏览记录
   - API密钥本地加密存储（建议定期更新密钥）

## 二次开发

```sh
# 克隆仓库
git clone https://github.com/liangmiqwq/safeseek.git

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产包
pnpm build
```

## 📮 问题反馈

遇到问题请提交 Issue 并提供：

1. 浏览器版本

2. 出现问题的网页URL

3. 控制台错误截图（按F12打开开发者工具）

## 📜 开源协议

AGPL License © 2025 Liangmiqwq
