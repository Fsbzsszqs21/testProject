# testProject
这是一个测试工程，我决定和crr尝试开发应用，本项目用来测试代码合作
哇，太棒了，这将是我们飞黄腾达的开始，起飞！

## 协作操作指南（新手版）

### 三条核心规则

1. `main` 只放能正常运行的代码，谁都不直接在 `main` 上改
2. 一条分支只做一件事，做完就合并、删掉
3. 每次开工前，先把 `main` 更新到最新

### 每轮开发流程

**1. 更新 main，开新分支**

```powershell
git switch main
git pull
git switch -c feature/cy-要做的事      # 妹妹用 feature/crr-要做的事
```

**2. 改代码，提交，推送**

```powershell
git add .
git commit -m "cy: 这次改了什么"
git push -u origin feature/cy-要做的事
```

**3. 在 GitHub 上开 Pull Request，合并到 main**

**4. 合并后回到本地，更新 main，删掉已合并的分支**

```powershell
git switch main
git pull
git branch -d feature/cy-要做的事
```

### 关于「推送完，我本地有她的代码吗？」

没有。合并只发生在 GitHub 上，本地不会自动更新。

- `git fetch` = 只把 GitHub 的最新状态下载到本地记录，不动文件
- `git pull` = 下载 + 合并进当前分支（最常用）

记住：**切分支前、动手前，先 `git pull` 一次。**

### 遇到冲突怎么办

冲突不是报错，只是两个人改了同一处，Git 不知道保留哪个。

1. 让 AI 帮你解释冲突两边分别是什么
2. 你来决定保留哪些内容
3. 解决后重新提交：

```powershell
git add .
git commit
```

### 和 AI 一起开发的原则

- 用大白话描述需求，让 AI 改代码
- 每次改完，先看它**改了什么**、页面**能不能跑起来**
- 小步走：改一点 → 提交一次，不要攒一大坨再提交
- 合并前先 `git pull`，冲突会少很多