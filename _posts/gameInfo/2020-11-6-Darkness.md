---
layout: post
title: The Darkness Info Dump
---

<style>
.rouge-gutter {
  width: 5%;
}
</style>

**Contents**
* TOC
{:toc}

## Darkness 1

Darkness 1 is PS3/X360 exclusive so I don't have much to spew out my mouth about
GameFAQ Link: [https://gamefaqs.gamespot.com/ps3/927013-the-darkness/faqs/51997](https://gamefaqs.gamespot.com/ps3/927013-the-darkness/faqs/51997)
But considering (unlike Darkness 2) it was developed by Starbreeze Studio, so its Starbreeze's own proprietary engine

After doing some digging (and getting a disc copy and ripping it)
As a quick note, the version I was given seems to be tagged as `1.03` btw.

---

Note: This is in development 

It seems to use a `.xrg` format (which is stupidly variable in its format)
I've noticed a few different types:
```
Cache:
  Fairly JSON-like
  Each line starts with '*'
  Supports C++ like #ifdef's
```

There's also the `.xwc` files which (according to some other posts) store the raw data back to back
These other formats seem to have a different structure than what the posts say so idk

### Image Rips
According to the [PS3Homebrew](https://www.reddit.com/r/ps3homebrew/wiki/retroxmb) subreddit:
  - `ICON0.PNG` is a "content icon"
  - `ICON1.PAM` is a "content icon video" (Not available in D1)
  - `SND0.AT3` is a "content icon sound" (D1 does not have this)
  - `PIC0.PNG` is the "overlay picture", only availbe on 16:9 PS3 screens (N/A)
  - `PIC1.PNG` is a "background picture"
  - `PIC2.PNG` is an "overlay picture", only available on 4:3 screens (of which D1 has none)

<img src="{{ site.baseurl }}/assets/downloads/darkness/rips/CoverImg.png" loading="lazy"/>
This comes from `PS3_Game/USRDIR/SYSTEM/PS3/GAMEDATA/PIC1.PNG`

[Image #2](/assets/downloads/darkness/rips/SaveData.png) comes from `PS3_Game/USRDIR/SYSTEM/PS3/SAVEDATA/ICON0.PNG`

[Image #3](/assets/downloads/darkness/rips/SaveData2.png) comes from `PS3_Game/USRDIR/SYSTEM/PS3/SAVEDATA/PIC1.PNG`

### Extra Content
All of the stuff in this subheading comes from `PS3_GAME/USRDIR/EXTRACONTENT/OFFLINE01/*`.
In the root dir there's `INFO.XRG` which just defines some basic stuff (collectables etc), but the end of the XRG file is a bit more interesting:
```
/* -- these will not work if unlocked by "unlock all" since additional script commands are needed.
      so let's remove them from the extra content (not really needed, since the player will get info
    when unlocking the darklings ingame).
*0
{
  *id retailer_bat
  *name §LEC_122_NAME
  *desc §LEC_122_DESC
  *type picture
  *KeyID 122
}

*0
{
  *id retailer_golfdriver
  *name §LEC_123_NAME
  *desc §LEC_123_DESC
  *type picture
  *KeyID 123
}
*/
```
From here you have a bit more extra info:
```
//*0
//{
//  *id retailer_machete
//  *name Registration Darkling
//  *desc You've unlocked a special darkling outfit by calling the number you got from registering your game online. You will see it when you summon a berserker.
//  *type picture
//  *KeyID 124
//}
```
All of this is commented out so it obviously doesn't exist in the game but quite interesting.
There's also some movie files in `VIDEOS/PROFILEMAIN`
TODO: ADD AND CONVERT THESE MOVIES

### System
Under `PS3_GAME/USRDIR/SYSTEM`, there's `GL`, `PS3`, `PS3EXES`, and `SOUND`.
First off is `GL`, there's not too much interesting in here, its basically just [ARB_fragment_program](https://en.wikipedia.org/wiki/ARB_assembly_language#ARB_fragment_program) and then some more shader vertex code written by Starbreeze devs, but it doesn't seem to interesting to me.

Under `PS3`, there's also not too much except for those images from above and some cache files 

---

## Darkness 2
Unlike Darkness 1, this game actually came out on PC (and I got it for free from some sale as far as I remember)
This game uses [Digital Extremes](https://en.wikipedia.org/wiki/Digital_Extremes)'s proprietary [Evolution engine](https://en.wikipedia.org/wiki/Digital_Extremes#Technology) (in fact its the second game to use it)
The game's files are combinations of `.toc` (Table of Contents) and `.cache` (*Cache*)
Side fact: The game's PDB was stored at `c:\Darkness2PC\Code\EE.SteamCEG.pdb` in development :)

### Avoiding Ear Pain™
The game launches with an impressively loud 2K intro movie, in order to avoid having your ears bleed:
1. Navigate to your game folder
2. Go to `[GAME FOLDER]/Cache.Windows`
3. Delete/Rename `F.VideoTextureSlow.toc`
  * Since the `F.VideoTextureSlow.toc` contains other non-intro movie files, you can [download]({{site.baseurl}}/assets/downloads/darkness/F.VideoTextureSlow.toc) a hex-edited version to remove the intro movie itself 

### Table of Contents Format
According to some `XeNTaX` [forum](https://forum.xentax.com/viewtopic.php?f=32&t=10782#p88313) posts about Warframe (another Evolution engine game) (probably not the most trustworthy site btw):
* 'H' caches contain file headers
* 'B' caches contain the corresponding binary files (except for sounds, and maybe textures)
* 'F' caches contain full sound files and textures

That forum post also contains a link to a [QuickBMS](https://aluigi.altervista.org/quickbms.htm) Script [(Download)]({{site.baseurl}}/assets/downloads/darkness/darkness2.bms)

If you wanna make your own implementation (like I tried):
```
Out of File: 
  - Content Amount: ( (Size of TOC) - 8 ) / 0x60

Magic: 0x4E, 0xC6, 0x67, 0x18
Version: int32
TOC File / Category Format (Loop over Content Amount):
  - offset: long
  - timestamp: long
  - zSize: int32
  - size: int
  - paddedBytes: int
  - ID: int
  - Name: 0x40 long ASCII string (remove non-ASCII chars)
```

The only caveat to this file format being that the .cache files contain `oodle` and `lzf` compressed files
In reality I wouldn't advise making your own implementation of the QuickBMS just because the [oodle](http://www.radgametools.com/oodlecompressors.htm) compression scheme is proprietary and it'll be annoying to actually implement it in in whatever your language of choice is.

### Content Files

| Content File Name  | TOC File Size (bytes) | Cache File Size (bytes) |
|:------------------:|:---------------------:|:-----------------------:|
|   B.AnimRetarget   |         97256         |        60893070         |
|       B.Font       |        115016         |        15215695         |
|       B.Misc       |        1901864        |       1029879078        |
|     B.Misc_en      |        953288         |        26942732         |
|      B.Script      |         50120         |         1761886         |
|     B.Texture      |        987560         |        246668228        |
|    B.Texture_en    |         3368          |         235320          |
|   B.VideoTexture   |          872          |        20300800         |
|       F.Misc       |         78536         |       2581251187        |
|     F.Misc_en      |        926408         |        216493056        |
|     F.Texture      |        724808         |       2289478197        |
|   F.VideoTexture   |         2120          |        185776936        |
| F.VideoTextureSlow |         6344          |        218444400        |
| F.VideoTexture_en  |          680          |        169269268        |
|   H.AnimRetarget   |        109064         |         7488991         |
|       H.Font       |        114920         |         308306          |
|       H.Misc       |        2754536        |        30612157         |
|     H.Misc_en      |        953288         |         2396378         |
|      H.Script      |         57992         |         842971          |
|     H.Texture      |        987560         |         1966378         |
|    H.Texture_en    |         3368          |          5115           |
|   H.VideoTexture   |         2696          |          2579           |
| H.VideoTextureSlow |         6344          |          6163           |
| H.VideoTexture_en  |          680          |           261           |

There's some somewhat interesting info you can glean from (somewhat poorly) extracting the contents of the caches
The UI (as from `B.AnimRetarget`) uses Uncompressed Shockwave Flash 6 
For more interesting code-bits, I ended up figuring out how to decompile the lua source code (The extension *should* probably be `.luac` on the files but y'know :/)
A github repo of the decompiled code is here: [https://github.com/FromDarkHell/TheDarknessIIDecompiled](https://github.com/FromDarkHell/TheDarknessIIDecompiled)

### Config Files
All of these go in `%appdata%/DarknessII`, I'm yet to figure out their format but, could potentially be something?
1. `Editor.cfg` - There's a lot of references to the game's editor, yet it lacks anyway to access it in game afaik
2. `EE.cfg` - `EE` is probably short for `Evolution Engine`
3. `[STEAM ID]/settings`: Config file matched up with your steam ID

### Random Information Takeaways
These are all just random things I found out about other random things after messing with the code™

#### Mansion Radio
After a 5 seconds? tracks? on the radio in the mansion, it'll play a set of news casts
It'll restart that 5 second/track? loop if you toggle the radio on / off
Other useless note: it toggles the radio's noise on/off by just modifying the gain to be `3` or `-47` respectively

#### Dolfo Mini-Games
In order to impress Dolfo for the first time (all according to `DolfoShootTargets.lua`), you need to shoot all 13 bottles in 11 seconds or less
  - If you take more than 45 seconds, it automatically kicks you out of the mini game loop

There's 3 different set of dialog options depending on how bad you are at the game:
  - Time =< 11s: Good
  - Time between 11s & 30s: Decent
  - Time > 30s: Terrible

There's a very stupidly rare chance of *actually* get the 11s roll unless you get a frame perfect situation in which it ticks up to exactly 11s
Even when the timer shows that you did it in 11s it rounds it


In order to impress Dolfo, the second time (ie the pigeon game), you need to shoot 20 pigeons in < 120s
  - pigeonsKilled >= 20: Good (impressed)
  - 15 < pigeonsKilled < 20: Decent
  - pigeonsKilled < 15: Terrible

Side Note: After doing the Mansion raid mission, you can do both mini games in any order

#### Carnival Games

Shootout:
This is fairly similar to the first minigame for Dolfo works *except* the maximum time limit is 60s
The large prize score is 1000 points

The time between targets is a random number between 2 and 4 seconds
The chance for a friendly in the mini-game, is about 50%

At the start of each tick of the mini-game timer:
```
  - If the elapsed time is >= 54s (timeLimit * 0.9):
    * Jenny stops doing her callouts
  - If the elapsed time is >= 42s AND total points >= 900 AND almost
    * almost = true
    * jenny starts doing "Almost" callouts

```

Duck Hunt:
Nearly identical logic-wise to the shootout game
  - Almost Score = 180
  - High Score: 1000
After it goes through all the targets if your score is <200, it resets you back to checkpoint


### Images
These are all just random promo images from the 2K site, best enough to keep them ripped from there.

<img src="{{ site.baseurl }}/assets/downloads/darkness/promo/825-darkness_screenshot_01.jpg" loading="lazy"/>
<img src="{{ site.baseurl }}/assets/downloads/darkness/promo/826-darkness_screenshot_02.jpg" loading="lazy"/>
<img src="{{ site.baseurl }}/assets/downloads/darkness/promo/827-darkness_screenshot_03.jpg" loading="lazy"/>
<img src="{{ site.baseurl }}/assets/downloads/darkness/promo/maxresdefault.jpg" alt="image" loading="lazy"/>
<img src="{{ site.baseurl }}/assets/downloads/darkness/promo/thedarkness2_2kcom_marquee.jpg" alt="image" loading="lazy"/>
<img src="{{ site.baseurl }}/assets/downloads/darkness/promo/thedarkness2_launch_trailer.jpg" alt="image" loading="lazy"/>


<!-- A quick JS script to make all the tables on this page sortable -->
<script>for(const e of document.getElementsByTagName("table")) e.classList.add("sortable");</script>
