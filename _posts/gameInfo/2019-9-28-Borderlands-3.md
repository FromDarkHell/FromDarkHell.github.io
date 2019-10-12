---
layout: post
title: Borderlands 3 Glitches / Info / Tools
---

## Mission Flow
1. Children of the Vault
    * The Slaughter Shaft
    * Skag Dog Days
    * Under Taker
    * Powerful Connections
2. From The Ground Up
    * Bad Reception
    * Head Case
    * Golden Calves
3. Cult Following
    * Dump on Dumptruck
4. Taking Flight
    * Kill Demo Skag
5. Sanctuary
    * Kill Borman Nates
    * Kill Urist McEnforcer
    * Kill Vic and Warty
    * Maliwannabees
    * Porta Prison
    * Healers and Dealers
    * Rise and Grind
        - Dynasty Diner
    * Kill Killavolt
    * Technical NOGout
    * Proof of Wife
6. Hostile Takeover
    * Just A Prick
    * Holy Spirits
7. The Impending Storm
    * Kill Dinklebot
    * Invasion of Privacy
    * Opposition Research
8. Space-Laser Tag
    * Kill Power Troopers
9. Atlas At Last
    * Ratch'd Up
10. Beneath the Meridian
    * Kill the Grogans and Their Mother
    * Kill IndoTyrant
    * On the Blood Path
    * Get Quick, Slick
11. Hammerlocked
    * Kill El Dragon Jr
    * The Kevin Konundrum
    * Cistern of Slaughter
    * Sacked
    * Don't Truck with Eden-6
    * Witch's Brew
12. Lair of the Harpy
    * Malevolent Practice
    * Irregular Customers
13. The Guns of Reliance
    * Kill Maxitrillion
    * Rumble In The Jungle
    * Swamp Bro
    * Capture the Frag
    * Dynasty Dash: Eden-6 (Dynasty Diner needed)
14. The Family Jewel
    * Kill Red Jabber
    * The Unstoppable
    * Sell Out
15. Going Rogue
    * Raiders of the Lost Rock
16. Cold as the Grave
    * Kill Rakkman
    * Kill Road Dog
    * Kill Tarantella
    * The Homestead
        - The Homestead (Part 2)
            * The Homestead (Part 3)
    * Pandora's Next Top Mouthpiece
    * Buff Film Buff
    * Just Desserts
    * Boom Boom Boomtown
        * Life of the Party
        * Sheega's All That
    * Dynasty Dash: Pandora (Dynasty Diner needed)
    * The Feeble and the Furious
    * Let's Get It Vaughn
    * ECHOnet Neutrality
17. Blood Drive
    * Captain Thunk and Sloth
    * The Demon in the Dark
    * Childhood's End
    * Wildlife Conservation (Life of the Party needed)
18. Angels and Speed Demons
19. The Great Vault
    * Discover the Trial of Survival
        - Trial of Survival
    * Discover the Trial of Fervor
        - Trial of Fervor
    * Discover the Trial of Cunning
        - Trial of Cunning
    * Discover the Trial of Supremacy
        - Trial of Supremacy
    * Discover the Trial of Discipline
        - Trial of Discipline
    * Discover the Trial of Instinct
        - Trial of Instinct
    * Welcome to Slaughterstar 3000
        - Tech Slaughter
    * Transaction-Packed
        - Baby Dancer (ECHOnet Neutrality, Healers and Dealers, Raiders of the Lost Rock needed)
20. The First Vault Hunter
    * Cannonization
        - Bad Vibrations
    * Homeopathological
21. Footsteps of Giants
    * It's Alive (Homeopathological needed)
22. In the Shadow of Starlight
    * Fire in the Sky (Bad Vibrations needed)
23. Divine Retribution

<br/>
Note: This mission flow may not be fully 100% accurate.

## Game/Speedrun Tools

* [Speedrun Profile Manager]({{site.url}}/assets/downloads/BL3SpeedrunProfileManager.rar) (You need your speedrun profile.sav named as `profile - SPEEDRUN.sav`)
* [Downpatcher](https://drive.google.com/open?id=1FJr4KGBnGvaUKoKK-b4fYOzd_WFCpH3E)
* [Glitch Spreadsheet](https://docs.google.com/spreadsheets/d/1KyGZIbKvd0QH23HRhby8VZVQacW4ErUvDeYAyD3FEkw/edit?usp=sharing)
* [Geared Moze Save File]({{site.url}}/assets/downloads/bl3saves/1.sav)
* [Compiled Starting Save Files]({{site.url}}/assets/downloads/bl3saves/Starters.rar)
* [Collectable Guide / Online Maps](https://mapgenie.io/borderlands-3)

## Lore Info:

* [All Eridian Writings]({{ site.baseurl }}{% post_url 2019-9-18-Eridian-Writings %})
* [All Typhon Logs]({{ site.baseurl }}{% post_url 2019-9-29-Typhon-Logs %})

## Disable Intros
Go to \Borderlands3\OakGame\Content\Movies<br/>
Be aware, the folder is spoiler heavy<br/>
Rename/Delete `2KLOGO`, `AMDLOGO`, `GBXLOGO` and `MARCUS_INTRO`<br/>
This doesnt skip the Vault Hunters intro cinematic.<br/>

## Texture Streaming Edits
If you navigate to, `Documents\My Games\Borderlands 3\Saved\Config\WindowsNoEditor\GameUserSettings.ini`<br/>
You'll see at the end of the file something along the lines of: `TextureStreamingViewBoostScale=0.000000`<br/>
You can edit these ini values  and then set your `GameUserSettings.ini` to read-only. If you want to modify any of the values set their respective `Override` value to `1.000000`. I personally use (in order of appearence w/o the `Override` values): `0.5, 0.5, 160`.<br/>
You can also try setting `bUseDynamicResolution` to `True`.
