---
title: md文章写作格式，存档调用
description: 两份模板的文章格式，方便随时取用
publishDate: 2026-11-12T12:00:00Z
tags:                                # 可选，自动转小写并去重
  - ai
  - vps
pinned: false
---
两份模板的文章格式，方便随时取用：

 > Astro Cactus：模板格式
---
title: 文章标题                      # 必填，最长 60 字符
description: 文章描述                # 必填，没有长度限制
publishDate: 2026-11-12T12:00:00Z    # 必填，发布日期
updatedDate: 2026-11-13T08:00:00Z    # 可选，更新日期
tags:                                # 可选，自动转小写并去重
  - ai
  - vps
pinned: false                        # 可选，true 则首页置顶
draft: false                         # 可选，true 为草稿，不发布
coverImage:                          # 可选，封面图
  src: ./cover.png
  alt: 封面说明
ogImage: ""                          # 可选，自定义分享图
---

> AstroPaper：模板格式

---
title: 文章标题                      # 必填
description: 文章摘要                # 必填，用于摘要和搜索引擎
pubDatetime: 2026-11-12T12:00:00Z    # 必填，发布日期
modDatetime: 2026-11-13T08:00:00Z    # 可选，修改过才加
author: 作者名                       # 可选，不写则用站点默认作者
featured: false                      # 可选，true 则显示在首页精选区
draft: false                         # 可选，true 为草稿，不发布
tags:                                # 可选，不写则默认为 others
  - ai
  - vps
ogImage: ""                          # 可选，自定义分享图
canonicalURL: https://example.com    # 可选，文章在别处已发布时填原文地址
---
### 以上两份模板写法格式，做为存档以并参考。
