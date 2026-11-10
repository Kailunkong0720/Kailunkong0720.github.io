# 個人網站

純 HTML / CSS / JavaScript，沒有框架、不需要安裝任何東西。

## 預覽

直接用瀏覽器打開 `index.html`，或在這個資料夾執行：

```bash
python -m http.server 5173
```

然後開 <http://localhost:5173>。

## 換成自己的內容

**只需要改 `js/content.js`**，裡面每一段都有中文（`zh`）和英文（`en`）兩個版本：

| 想改的東西 | 位置 |
| --- | --- |
| 信箱、GitHub、LinkedIn、履歷連結 | `meta` |
| 名字、首頁輪播的身分、自我介紹 | `profile` |
| 實習與學歷（`type` 填 `"work"` 或 `"edu"`） | `timeline` |
| 作品（技術標籤寫在 `stack`） | `projects` |
| 技能分類 | `skills` |

要放的檔案請放進 `assets/` 資料夾：

- 履歷：`assets/resume.pdf`
- 照片：放好後把 `profile.photo` 改成 `"assets/me.jpg"`
- 作品截圖：把該作品的 `image` 改成 `"assets/xxx.png"`（留空會自動產生幾何封面）

小提醒：`skills` 裡的名稱如果和作品 `stack` 裡的名稱完全相同，訪客點技能就會篩選出用到它的作品。

## 換配色

改 `css/base.css` 最上面的 `--orange`、`--red`、`--teal`、`--bg`。

## 檔案說明

- `index.html`：頁面骨架
- `css/`：`base.css`（配色、導覽列、按鈕）、`sections.css`（各區塊版面）、`interactive.css`（作品、技能、指令面板）
- `js/content.js`：**你的資料**
- `js/i18n.js`：按鈕與標題的中英文字
- `js/render.js`：把資料畫到頁面上
- `js/stage.js`：首頁可拖曳的圖形
- `js/ui.js`、`js/fx.js`、`js/palette.js`：游標、捲動動畫、指令面板、彩蛋

## 上線

網站放在 GitHub Pages：

- 網址：<https://kailunkong0720.github.io/>
- Repository：<https://github.com/Kailunkong0720/Kailunkong0720.github.io>

改完內容後，在這個資料夾依序執行下面三行，約 1 分鐘後網站就會更新：

```bash
git add -A
git commit -m "Update content"
git push
```
