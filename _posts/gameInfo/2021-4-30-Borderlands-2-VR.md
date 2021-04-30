---
layout: post
title: Borderlands 2 VR Game Info
redirect_from: "/bl2"
---

**Contents**
* TOC
{:toc}


## Modding
So, as BL2VR is still in UE3, the same modding techniques that apply for BL2/TPS also apply to BL2VR.
There's a few differences as BL2VR was compiled in 64bit and (I think) is on a newer engine version.
But it's even less technically complicated than BL2 in terms of edits necessary.
In order to apply the hex edits:
- You want to open your `Binaries/Win64/Borderlands2VR.exe` in a hex editor (I'm a big fan of [hexed.it](https://hexed.it/))
- Search for `say` (Match Case) as UTF-16 text.
    * Replace the letters "say" with spaces, for example it should be `0x20 0x00 0x20 0x00 0x20 0x00`.

This is all you need to do!
For some reason in BL2/TPS, there's an extra hex edit needed to enable the `set` command, but in BL2VR you don't need to do that!

You'll want to enable your console (it's really horrible to type in in VR btw):
* Go to `Documents/My Games/Borderlands 2 VR/WillowGame/Config`
* Open `WillowInput.ini` in Notepand or whatever you use
* Search for `ConsoleKey=` and make it `ConsoleKey=Tilde`/`ConsoleKey=F6` (all keys pretty much work)

From here, you can install files into `Binaries` and make sure to enable your console.