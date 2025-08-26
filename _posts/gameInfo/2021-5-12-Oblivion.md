---
layout: post
title: Oblivion Info Dumps
---

<script type="text/javascript" src="/assets/js/pages/oblivion.js"></script>

**Contents**
* TOC
{:toc}

## No CD Patch
The original 1.0 version checks to see if a CD ROM is installeed as well as if you have an Oblivion CD inserted.

### CD Rom Patch
```x86asm
call dword ptr ds:[<&CopyFileA>]
call oblivion.404AC0
test al, al
jne oblivion.40DF73 
```
The `jne` instruction at the end is replaced with a regular jmp instruction, to avoid the CD ROM check.
The unpatched signature with for the CD ROM check is: `FF 15 ?? ?? ?? ?? E8 ?? ?? ?? ?? 84 C0 0F 85`

### CD Patch
```x86asm
call dword ptr ds:[<&MessageBoxA>]
jmp oblivion.40F1E4
mov al, byte ptr ds:[AD5170]
test al, al
jne oblivion.40E035
```
Much like the CD ROM patch, the `jne` instruction gets replaced with a `jmp` to avoid the CD verification.
The unpatched CD Check signature is `FF 15 ?? ?? ?? ?? E9 ?? ?? ?? ?? A0 ?? ?? ?? ?? 84 C0 0F 85`.

For my Oblivion Downpatcher, you can see the source code on [Github](https://github.com/FromDarkHell/OblivionDownpatcher/blob/main/OblivionDownpatcher/NoCD/NoCDPatcher.cs)

## Chair Finder Breakdown
If you want an explanation of why this was "necessary", scroll down to [the end result](/Oblivion/#chair-searcher)

### Cell Iteration
In order to make a "console command" style thing in the Construction Set, you have to create a new quest.
This quest can have however many stages, but you can then code a script that constantly polls for changes to the new quest's stage.
In my case I named my quest, `FDHListChairs` and set the stage for running to `1`
One of the more important parts is changing the `fQuestDelayTime` to something that won't run the script about every frame.
This'll save on processing power as well as make it less of a pain in the ass.
Rather than doing the costly (and more annoying and longer) approach of slowly going cell by cell in the exterior, `Tamriel (0,0)` all the way to `Tamriel (40,40)`.
Instead I did the world's worst looking solution (but easier to write and honestly horrible to do in any situation).
Create an array filled with direct object references to each of the cells for example:

```plaintext
Let cellsToPick := ar_List SageGlenHollow,Elenglynn,TestCheydinhalUpper,ChorrolMarkTest,KvatchChapelUndercroft,ICArcaneUniversitySpellmaker,GoblinJimsCave,ICTempleDistrictSeridursHouseUpstairs,ICImperialLegionWatchTowerNECaptainsQuarters,HackdirtMoslinsDryGoodsBasement,SENSCaldanaMonirusHouseUpstairs,XPGloomstonePassage02,FelgageldtCave,Nenalata,Testdungeon,Hackdirt,BrumaJGhastasHouse,ICWaterfrontKvinchalsShack,AnvilHorseWhisperer,ICMarketDistrictEdgarsDiscountSpellsBasement
```
One of the problems with this approach is that lines will end up being >512 characters long, which for some god-awful reason, the compiler will not accept.
For some other asinine reason, the `ar_Append` function doesn't work.
So instead you need to create a separate list and then use the `ar_InsertRange` function like so:

```plaintext
; Create an array filled with more references
Let c2 := ar_List SilverToothCave02,TestMegan04,SEVitharnBailey,ICImperialLegionHQTheBastionTower,OblivionMqKvatchSmallTower03,Wendir02,ArkvedsTower05,OblivionRDCavesMiddleA05,BramblePointCave03,ChorrolCastleWallTowerSW,BrumaMagesGuildBasement,SEPasswallJayredsTent,SENSThingsFoundUpstairs,XPXeddefen03spire,ICImperialLegionWatchTowerN,Wenyandawik,SENSGreenmoteSilo,XPMilchar02a,ICTempleDistrictJmhadsHouse,LeyawiinFiveClawsLodge
			
ar_InsertRange cellsToPick 16 c2 ; Insert c2 to the 16th entry in the cellsToPick array.
```
I ended up making a [Python script](https://gist.github.com/FromDarkHell/c6ad24e2b21d2f9b4765c09414fcfa37#file-arrayfiller-py) to make all of these statements because I value my sanity a bit more than you might think.
I've yet to mention this but because the scripting language is horrible and shouldn't ever be used, it requires that you pre-define all of the variables that you're going to use. It also doesn't have `for` loops (it does have `while` though)

### Finding The Chairs
Now that you've got a list of all of the cells to iterate over, you get to actually load into them and find furniture.
`for` loops look something like:
```plaintext
let i := -1
[...]

Let n := ar_Size cellsToPick

While (i += 1) < n
	Let currentCell := cellsToPick[i] 
```
Because the previous array filling code is awful, I make sure to check if the `currentCell` variable is == `0` because any given index defaults to `0`.
Then you can call [PositionCell](https://cs.elderscrolls.com/index.php?title=PositionCell) with the given cell reference like:
```plaintext
PrintToConsole "Moving to cell: %n", currentCell
player.PositionCell 0,0,0,0 currentCell
;# Wait until we're in a new cell ??
While (player.GetInCell currentCell != 1)
	continue
Loop
```
This approach is fairly janky but it works
Then you can check through the surrounding area for furniture.
For this I was able to use some 'guides' from people over on the [Nexus Forums](https://forums.nexusmods.com/index.php?/topic/7899068-export-the-coordinates-of-all-objects-in-a-cell/). It fairly well explained it + links to docs

My furniture scanning code looks like:
```plaintext
;# Now we check the surrounding area for furniture...
;# 32: Furniture, 2 = Search Size, 1 = Include Inactive
set pChair to GetFirstRef 32 4 1
while(pChair)
	set pX to (pChair.GetPos X)
	set pY to (pChair.GetPos Y)
	set pZ to (pChair.GetPos Z)
	set rotX to (pChair.GetAngle X)
	set rotY to (pChair.GetAngle Y)
	set rotZ to (pChair.GetAngle Z)
	set pChairCell to (pChair.GetParentCell)

				
	;# Cell Name | Cell FormID | Furniture Name | PosX | PosY | PosZ
	PrintToConsole "%n | %i | %n | %f | %f | %f", pChairCell, pChairCell, pChair, pX, pY, pZ

	set pChair to GetNextRef
loop

break
```
I break after the end of that loop because I'm still trapped inside of the cell loop and I want to make sure I've got everything (ie I don't go too fast between maps)

### Outside Furniture
Since the previous code only looped through cells in the `Interiors` world space, I needed to make the code also scan through the entire outside.
Each Oblivion cell is 4096x4096 Oblivion units large.
For this I basically used the same approach of the quest stage from before, accept applying it to `GetStage FDHListChairs == 2`.
I start the loop of by searching for chairs because its gotta be coded a bit differently for the exterior searching.
On the first run:
```plaintext
;# Y minimum: -40, Y maximum: 44
;# X minimum: -53, X maximum: 54
set xMin to -53 ;# Minimum X cell
set xMax to 54  ;# Maximum X cell
set yMin to -40 ;# Minimum Y cell
set yMax to 44  ;# Maximum Y cell
set xCell to xMin
set yCell to yMin
```
One of the problems with this code is that it makes the inefficient assumption that the `Tamriel` worldspace is actually a square.
If you're wondering where I pulled these numbers from, I found a random map giving a coordinate overlay of all of the cells on top of a game map.

<img src="{{ site.baseurl }}/assets/images/OBOriginalCellGridMap.jpg" width="640" height="450" />
<img src="{{ site.baseurl }}/assets/images/OB-UL-CellGridMap.jpg" width="640" height="450"/>
The map obviously isn't a square so I ended up checking a lot more distance than I actually needed to but it probably would've taken the same amount of time to code in a proper searching function :P
The next step is teleporting the player:

```plaintext
;# Each oblivion cell is 4096 oblivion units large
set x to (xCell * 4096)
set y to (yCell * 4096)
PrintToConsole "Moving to (%.0f,%.0f)", x, y
player.PositionWorld x y 0 0 Tamriel
```
The `%.0f` format string prints a float out with 0 decimal places btw
The next bit establishes the looping nature:
```plaintext
if(xCell < xMax)
	set xCell to xCell + 1
endif

if(xCell >= xMax) 
	set xCell to xMin
	set yCell to (yCell + 1)
endif
```
The logic makes it so that the player slowly teleports cell by cell across the map going horizontally and then looping back and going up 1 cell vertically.
This code also misses some of the other Worldspaces, meaning I needed to manually go through the other worldspaces in the editor.
It's also currently missing Shivering Isles / KOTN (probably?)'s chairs/furniture

If you want the full hot mess of code, its available on the [Gist](https://gist.github.com/FromDarkHell/c6ad24e2b21d2f9b4765c09414fcfa37#file-chairfinder)
<br>

tldr; 
    It goes through a list of Interior Cells and then searches for all chairs in a \~30 cell radius
    Then it goes through the whole outside map and checks for furniture there as well.

## Chair Searcher
Oblivion contains a glitch called `Saddle Skedaddle` (it works for more than horses).
It allows you to warp to any location provided that you can find a chair in a cell with the same (or about as much) X,Y,Z coordinates.
You can also position a horse but those are a lot more off the beaten path for it to be useful in a speedrun.

If you want to scan around, I've got a whole [spreadsheet](https://docs.google.com/spreadsheets/d/1Sfn2UVN2S90zGLTqPDCmk1wT_6knvGKVD1-rR20Gmsc/edit?usp=sharing) filled with all of the chairs / beds / etc (furniture).

This gives an easy way of searching through that, allowing for ranges between all of the values
It uses a [JSON](/assets/downloads/oblivion/chairs.json) file to be able to pull the info from.
There's also a [JSON](/assets/downloads/oblivion/cells.json) file for information about all of the cells, as well as a [JSON](/assets/downloads/oblivion/interiors.json) with info about just the interior cells, and a [CSV](/assets/downloads/oblivion/chairs.csv) version of the previous spreadsheet.

<hr>
Empty means to ignore minimums or maximum

{% raw %}

<div>
Minimum X: <input type="number" id="minX" name="minX"> Maximum X: <input type="number" id="maxX" name="maxX"><br>
Minimum Y: <input type="number" id="minY" name="minY"> Maximum Y: <input type="number" id="maxY" name="maxY"><br>
Minimum Z: <input type="number" id="minZ" name="minZ"> Maximum Z: <input type="number" id="maxZ" name="maxZ"><br>
<br>
<button style="width: 100px;text-align: center;left: 15%;position: relative;" onclick="furnitureSearch()" id="submit" name="submit">Submit</button>
<button style="width: 100px;text-align: center;left: 20%;position: relative;" onclick="clearSearch()" id="submit" name="submit">Clear</button>
</div>

Results:
<div>
	<ul id="resultsList">
	</ul>
</div>

<br>

<hr>
{% endraw %}


## Other JSON Data
Using the editor, you'll be able to export a ton of data that's (somewhat vaguely) useful.
There's [descriptions.json](/assets/downloads/oblivion/descriptions.json) which has data about descriptions of objects.
Most of the names are fairly self-explanatory compared to the button which does the extracting in the editor, i.e. `descriptions.json` comes from `File -> Export -> Descriptions`
Some of these JSON files have been modified a bit for a bit more useful information / reducing requests if you actually care to use this.

[factions.json](/assets/downloads/oblivion/factions.json) stores information about the factions, more specifically all of the faction's Rank names for example:
```json
"000CD329": {
    "EditorID": "MS08KurdanFaction",
    "Ranks": {
        "0": {
            "Male": "Class-A Jerk"
        }
    }
}
```

There's [names.json](/assets/downloads/oblivion/names.json) which has objects storing other game object's EditorID (described as `Name`) and the displayed string (described as `Value`):
```json
"ARMO": {
	"00000C09": {
		"Name": "BladesHelmet",
		"Value": "Blades Helmet"
	},
	"00080EDE": {
		"Name": "SETESTGoldenSaintOfficerHelmet",
		"Value": "Golden Saint Helmet"
    }
}
```
This is sorted by the type of the object like types:

```plaintext
NPC_ # NPCs
MAPM # Map Titles / Fast Travels
MISC # Miscellaneous
CONT # Content
CLOT # Clothes
DOOR # Doors
EYES # Eyes
DIAL # Dialog
CELL # Cells
SPEL # Spells
SLGM # Soul Gems
INGR # Ingredients
FLOR # Flora
ACTI # Activations
KEYM # Keys
BOOK # Books
WEAP # Weapons
FACT # Facts
CLAS # Classes
ALCH # Alchemy
QUST # Quests
MGEF # Magic
RACE # Races
Script Effect # Script Effects
CREA # Creatures
ARMO # Armor
APPA # Apparatus
WRLD # World
FURN # Furniture
AMMO # Ammo
SGST # Sigil Stones 
REGN # Regions
HAIR # Hair
LIGH # Lights
BSGN # Birthsigns
```



[quests.json](/assets/downloads/oblivion/quests.json) has more information about quests, some of this data pulls from `descriptions.json`, but you won't need to request that JSON file either as well as `names.json`.

It contains data about the stages of quests (and the quest names + IDs):
```json
"00023DD6": {
    "Name": "Welcome to the Family",
    "ID": "Dark01KnifeFIN",
    "Stages": {
        "10": [
            "I must accept a contract from Vicente Valtieri."
        ],
        "100": [
            "I have accepted a contract from Vicente Valtieri."
        ]
    }
}
```
The `Stage[StageNumber]` is an array because certain stages can have multiple Log entries, the index in the array is the log entry index.