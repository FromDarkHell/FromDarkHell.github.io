---
layout: post
title: Oblivion Info Dumps
---

<script type="text/javascript" src="/assets/downloads/oblivion/oblivion.js"></script>

**Contents**
* TOC
{:toc}

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
```
Let cellsToPick := ar_List SageGlenHollow,Elenglynn,TestCheydinhalUpper,ChorrolMarkTest,KvatchChapelUndercroft,ICArcaneUniversitySpellmaker,GoblinJimsCave,ICTempleDistrictSeridursHouseUpstairs,ICImperialLegionWatchTowerNECaptainsQuarters,HackdirtMoslinsDryGoodsBasement,SENSCaldanaMonirusHouseUpstairs,XPGloomstonePassage02,FelgageldtCave,Nenalata,Testdungeon,Hackdirt,BrumaJGhastasHouse,ICWaterfrontKvinchalsShack,AnvilHorseWhisperer,ICMarketDistrictEdgarsDiscountSpellsBasement
```
One of the problems with this approach is that lines will end up being >512 characters long, which for some god-awful reason, the compiler will not accept.
For some other asinine reason, the `ar_Append` function doesn't work.
So instead you need to create a separate list and then use the `ar_InsertRange` function like so:
```
; Create an array filled with more references
Let c2 := ar_List SilverToothCave02,TestMegan04,SEVitharnBailey,ICImperialLegionHQTheBastionTower,OblivionMqKvatchSmallTower03,Wendir02,ArkvedsTower05,OblivionRDCavesMiddleA05,BramblePointCave03,ChorrolCastleWallTowerSW,BrumaMagesGuildBasement,SEPasswallJayredsTent,SENSThingsFoundUpstairs,XPXeddefen03spire,ICImperialLegionWatchTowerN,Wenyandawik,SENSGreenmoteSilo,XPMilchar02a,ICTempleDistrictJmhadsHouse,LeyawiinFiveClawsLodge
			
ar_InsertRange cellsToPick 16 c2 ; Insert c2 to the 16th entry in the cellsToPick array.
```
I ended up making a [Python script](https://gist.github.com/FromDarkHell/c6ad24e2b21d2f9b4765c09414fcfa37#file-arrayfiller-py) to make all of these statements because I value my sanity a bit more than you might think.
I've yet to mention this but because the scripting language is horrible and shouldn't ever be used, it requires that you pre-define all of the variables that you're going to use. It also doesn't have `for` loops (it does have `while` though)

### Finding The Chairs
Now that you've got a list of all of the cells to iterate over, you get to actually load into them and find furniture.
`for` loops look something like:
```py
let i := -1
[...]

Let n := ar_Size cellsToPick

While (i += 1) < n
	Let currentCell := cellsToPick[i] 
```
Because the previous array filling code is awful, I make sure to check if the `currentCell` variable is == `0` because any given index defaults to `0`.
Then you can call [PositionCell](https://cs.elderscrolls.com/index.php?title=PositionCell) with the given cell reference like:
```py
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
```py
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
If you want the full hot mess of code, its available on the [Gist](https://gist.github.com/FromDarkHell/c6ad24e2b21d2f9b4765c09414fcfa37#file-chairfinder)
<br>
<br>
tldr; It goes through a list of Interior Cells and then searches for all chairs in a \~30 cell radius

## Chair Searcher
Oblivion contains a glitch called `Saddle Skedaddle` (it works for more than horses).
It allows you to warp to any location provided that you can find a chair in a cell with the same (or about as much) X,Y,Z coordinates.
You can also position a horse but those are a lot more off the beaten path for it to be useful in a speedrun.

If you want to scan around, I've got a whole [spreadsheet](https://docs.google.com/spreadsheets/d/1Sfn2UVN2S90zGLTqPDCmk1wT_6knvGKVD1-rR20Gmsc/edit?usp=sharing) filled with all of the chairs / beds / etc (furniture).

This gives an easy way of searching through that, allowing for ranges between all of the values
It uses a [JSON](/assets/downloads/oblivion/chairs.json) file to be able to pull the info from.
There's also a [JSON](/assets/downloads/oblivion/cells.json) file for information about the Interior cells and a [CSV](/assets/downloads/oblivion/chairs.csv) version of the previous spreadsheet.

<hr>
Empty means to ignore minimums or maximum

{% raw %}

<div>
Minimum X: <input type="number" id="minX" name="minX"> Maximum X: <input type="number" id="maxX" name="maxX"><br>
Minimum Y: <input type="number" id="minY" name="minY"> Maximum Y: <input type="number" id="maxY" name="maxY"><br>
Minimum Z: <input type="number" id="minZ" name="minZ"> Maximum Z: <input type="number" id="maxZ" name="maxZ"><br>
<br>
<button style="width: 100px;text-align: center;left: 25%;position: relative;" onclick="furnitureSearch()" id="submit" name="submit">Submit</button>
</div>

Results:
<div>
	<ul id="resultsList">
	</ul>
</div>

{% endraw %}