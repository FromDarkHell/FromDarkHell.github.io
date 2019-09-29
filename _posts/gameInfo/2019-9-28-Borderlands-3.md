---
layout: post
title: Borderlands 3 Glitches / Info / Tools
---

## Mission Flow

1. Children of The Vault
2. From The Ground Up
	* Powerful Connections
3. Cult Following
    * Bad Reception
    * Dump on Dumptruck
    * Under Taker
    * Head Case
    * Golden Calves
    * Skag Dog Days 
4. Taking Flight
5. Sanctuary
6. Hostile Takeover
    * Just a Prick
    * Healers and Dealers
    * Maliwannabees
    * Rise and Grind
        * Dynasty Diner 
    * Kill Killavolt 
7. The Impending Storm
8. Space-Laser Tag
9. Atlas, At Last
10. Beneath the Meridian
11. Hammerlocked
12. Lair of the Harpy
13. The Guns of Reliance
14. The Family Jewel
15. Going Rogue
16. Cold as the Grave
17. Blood Drive
18. Angels and Speed Demons
19. The Great Vault
20. The First Vault Hunter
21. Footsteps of Giants
22. In the Shadow of Starlight
23. Divine Retribution
<br/>
Note: This mission flow may not be fully 100% accurate.

## Game/Speedrun Tools

* [Speedrun Profile Manager]({{site.url}}/assets/downloads/BL3SpeedrunProfileManager.rar) (You need your speedrun profile.sav named as `profile - SPEEDRUN.sav`)
* [Downpatcher](https://drive.google.com/open?id=1FJr4KGBnGvaUKoKK-b4fYOzd_WFCpH3E)
* [Glitch Spreadsheet](https://docs.google.com/spreadsheets/d/1KyGZIbKvd0QH23HRhby8VZVQacW4ErUvDeYAyD3FEkw/edit?usp=sharing)
* [Geared Moze Save File]({{site.url}}/assets/downloads/bl3saves/1.sav)
* [Compiled Starting Save Files]({{site.url}}/assets/downloads/bl3saves/Starters.rar)
* [Downpatcher]

## Lore Info:

* [All Eridian Writings]({{ site.baseurl }}{% post_url 2019-9-18-Eridian-Writings %})

## Disable Intros
Go to <InstallationPath>\Borderlands3\OakGame\Content\Movies<br/>
Be aware, the folder is spoiler heavy<br/>
Rename/Delete `2KLOGO`, `AMDLOGO`, `GBXLOGO` and `MARCUS_INTRO`<br/>
This doesnt skip the Vault Hunters intro cinematic.<br/>

## Texture Streaming Edits
If you navigate to, `Documents\My Games\Borderlands 3\Saved\Config\WindowsNoEditor` and edit: `GameUserSettings.ini`<br/>
You'll see at the end of the file something along the lines of: `TextureStreamingViewBoostScale=0.000000`<br/>
You can edit these ini values  and then set your `GameUserSettings.ini` to read-only. If you want to modify any of the values set their respective `Override` value to `1.000000`. I personally use (in order of appearence w/o the `Override` values): `0.5, 0.5, 160`.<br/>
You can also try setting `bUseDynamicResolution` to `True`.
