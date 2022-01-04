---
layout: post
title: Office Race Game Info
---

**Contents**
* TOC
{:toc}

Please don't ask why [this](https://store.steampowered.com/app/867640/Office_Race/) game is here, just follow along and read it (:
I basically can't order this properly because this game is raw chaos, so instead you're just gonna get tons of random walls of text.

Very unsurprisingly, this game is built in Unity (`2017.1.1f1`). This makes the code stupidly easy to decompile, it's available in `Office Race\Office Race_Data\Managed\Assembly-CSharp.dll`.
Office Race's code is fairly slim, most of the logic is shoved into a few classes, other things are just for data representation.
<img alt="Office Race Classes" src="{{ site.baseurl }}/assets/images/OfficeRace_classes.png" loading="lazy"/>


* If you type `quack` in the main menu, you'll toggle **Quack Mode**, it will turn certain sounds into duck noises for whatever reason
