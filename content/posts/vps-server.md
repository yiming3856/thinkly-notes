---
title: 服务器设置为密钥登陆，禁止密码登陆操作方法
description: 服务器用密钥登陆，禁止密码登陆方式
publishDate: 2026-11-13T12:00:00Z
pinned: true
tags:
  - vps
  - server
---

VPS服务器安全设置，其中最重要的一个环节就是更改登陆方式为密钥登陆，同时禁止密码登陆这样可以有效的防止服务器被人破解。
密钥登陆需要有公钥和与私钥，就是所说的密钥对，以前生成密钥对需要用到工具软件。
现在其实很简单，在本地电脑上用一条代码就可以生成一个密钥对了，我们只需要把生成的密钥对中的公钥上传到服务器，私钥放在本地电脑的硬盘上即可，以下是操作方法。
首先在本地电脑上打开命令提示符，并输入生成密钥的代码，一路回车下一步即可,生成的密钥对会自动放在电脑C盘的用户名下。

> 本地电脑密钥生成代码：

```bash
ssh-keygen -t ed25519 -a 100 -C "your_email@example.com"
```

- 生成密钥后先用密码登陆服务器，把以下服务器密钥对函数粘贴到服务器里，目的是上传公钥时只需要一条代码即可。

cat >> ~/.bashrc << 'EOF'

add_ssh_key() {
    local KEY="$1"
    local SSH_DIR="${HOME}/.ssh"
    local F="${SSH_DIR}/authorized_keys"
    local KEY_BODY

    if [ -z "$KEY" ]; then
        echo "用法: add_ssh_key \"ssh-ed25519 AAAA... 注释\"" >&2
        return 1
    fi

    KEY_BODY=$(printf '%s' "$KEY" | awk '{print $2}')

    if ! { mkdir -p "$SSH_DIR" && chmod 700 "$SSH_DIR" && touch "$F" && chmod 600 "$F"; }; then
        echo "权限或目录设置失败" >&2
        return 1
    fi

    if awk '{print $2}' "$F" | grep -qx -- "$KEY_BODY"; then
        echo "公钥已存在，无需重复添加"
        return 0
    fi

    if [ -s "$F" ] && [ -n "$(tail -c1 "$F")" ]; then
        printf '\n' >> "$F"
    fi

    printf '%s\n' "$KEY" >> "$F" && echo "公钥已成功添加"
}
EOF

source ~/.bashrc

- 服务器密钥对函数粘贴后，就可以直接把公钥上传服务器了

  > 上传公钥代码:

  ```bash
  add_ssh_key "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEZE+opEXA6bMZ9lnv49rI3aHCswQVRi+8UxYVCTxwaH your_email@example.com"
  ```
请把从SSH后面的所有代码改成你自已的公钥代码，然后整条代码粘贴到服务器，这样公钥就上传好了，后面登陆服务器里就可以改用密钥登陆了。

