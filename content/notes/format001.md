---
title: Astro Cactus 模板文章格式
publishDate: "2026-11-13T10:00:00Z"
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
