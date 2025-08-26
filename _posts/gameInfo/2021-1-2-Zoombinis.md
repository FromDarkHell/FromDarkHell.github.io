---
layout: post
title: Zoombinis Dumps
---

**Contents**
* TOC
{:toc}

## General Info

Difficulties are described in order of their amount of stars / rising difficulty:
  * **Not So Easy**: Level #0
  * **Oh So Hard**: Level #1
  * **Very Hard**: Level #2
  * **Very Very Hard**: Level #3

## Debugging
If you want to load the game into [dnSpy](https://github.com/dnSpy/dnSpy) (a C# / Unity debugger), you'll need to convert (at least I needed to because dnSpy was/is nuked) Zoombinis into a debug build.
You’ll want to follow [dnSpy's guide](https://github.com/dnSpy/dnSpy/wiki/Debugging-Unity-Games#turning-a-release-build-into-a-debug-build) on converting a Unity 5.10 game from a release build into a debug build.
If you don't want to download Unity 5.10 (since its fairly large):
I've got the files hosted on [Google Drive](http://bit.ly/3rYh2AW) that are needed in order to convert a release to a debug
Make sure to pick out the type 32/64 bit (32bit should work fine).

If you want the ultra cheaty experience, load the game into dnSpy’s debugger, then you want to go to the _DebugText_ class, set a breakpoint in `SetText`, then when it loads add `DataManager.Instance.ShowDebugContent` into your Watch panel, and set it to True.
Once you do this, you can do/see a whole ton of extra things like: 
<img src="{{ site.baseurl }}/assets/images/Zoombinis_5YIdElDJFa.png" loading="lazy"/>
If you're fast enough, you can also set the breakpoint in the `VersionNumber`'s `Start()` method.
You can even add `DataManager.Instance.ShowDebugContent = true;` to the start of that function and recompile the `Assembly-CSharp.dll` in order to make it launch with `ShowDebugContent` always being `true`
If you take this approach, you'll be able to see the version number in the bottom right as well.

Most of the "content" added by setting the game into debug mode is fairly self explanatory

You can also set the game into a _Public Beta_
Setting the game to a public beta doesn't too much except for lock you out of everything after Pizza Pass
It also throws an exception if you open the Options menu, but you can still see a menu if you continue afterwards:
<img src="{{ site.baseurl }}/assets/images/Zoombinis_7UohkDGofH.png" loading="lazy"/>


## Save Games

Since the game is in Unity, save games / configs are stored under the registry,
This game uses `Computer\HKEY_CURRENT_USER\Software\FableVision\Zoombinis`
  - Also this tells us that the game was (primarily) developed under [FableVision](https://www.fablevisiongames.com/games)

For example I have:
<img src="{{ site.baseurl }}/assets/images/regedit_7HAS7sXMe3.png" loading="lazy"/>
The binary data (ie `user_FromDarkHeck_[...]`) is stored in the registry as binary (hex).
If you want easy(ish) access to the blob, you'll need to export the whole `Zoombinis` registry key out to a `.reg` file and then open it in a text editor.
From here you can just edit / turn the blob into its own file or whatever you want.

If you want to understand the format:

The data stored in the registry is a Base64 string of a `JSONNode`
This isn't actually *proper* JSON data, but rather some weird ""custom"" type format from the implementation of `SimpleJSON` that's used in the game. (Stored in `Assembly-CSharp-firstpass.dll`)
Rather than implement it myself, I decided to just export `SimpleJSON` from `Assembly-CSharp-firstpass.dll` to its own VS2019 solution & then import the project into a custom library for Zoombinis called `ZoombiniSharp` (available on [Github](https://www.github.com/FromDarkHell/Zoombinisharp))

Zoombinis' attributes (and their values) are basically just ints
```csharp
static Zoombini() {
	string[,] array = new string[4, 5];
	array[0, 0] = "shaggy";
	array[0, 1] = "ponytail";
	array[0, 2] = "tuft";
	array[0, 3] = "flattop";
	array[0, 4] = "hat";
	array[1, 0] = "dot";
	array[1, 1] = "sleepy";
	array[1, 2] = "sunglasses";
	array[1, 3] = "glasses";
	array[1, 4] = "cyclops";
	array[2, 0] = "yellow";
	array[2, 1] = "pink";
	array[2, 2] = "red";
	array[2, 3] = "green";
	array[2, 4] = "blue";
	array[3, 0] = "wheels";
	array[3, 1] = "propeller";
	array[3, 2] = "spring";
	array[3, 3] = "shoes";
	array[3, 4] = "skates";
	TRAIT_NAMES = array;
}
```

If you want a set of tables instead:



|   Hair   | Value |
|:--------:|:-----:|
|  Shaggy  |   0   |
| Ponytail |   1   |
|   Tuft   |   2   |
| Flattop  |   3   |
|   Hat    |   4   |

|    Eyes    | Value |
|:----------:|:-----:|
|    Dot     |   0   |
|   Sleepy   |   1   |
| Sunglasses |   2   |
|  Glasses   |   3   |
|  Cyclops   |   4   |


|  Nose  | Value |
|:------:|:-----:|
| Yellow |   0   |
|  Pink  |   1   |
|  Red   |   2   |
| Green  |   3   |
|  Blue  |   4   |

|   Feet    | Value |
|:---------:|:-----:|
|  Wheels   |   0   |
| Propeller |   1   |
|  Spring   |   2   |
|   Shoes   |   3   |
|  Skates   |   4   |


## Puzzles

### Allergic Cliffs

Puzzle Setup follows like such:
```
 1. Pick a random face (lower or upper), they are now the Controller
   - This random bridge will be the one that’s allergic to the following traits
   - The other random bridge will be allergic to all other trait combinations
 2. Select a random zoombini
 3. Pick a random attribute from the random zoombini.
   - Attribute in this case means: Hair (0), Eyes (1), Nose (2), Feet (3)
 4. Get the value of this attribute from the random zoombini (ie Eyes: Dot, etc)
   - Make the controller allergic to this attribute + value (criterion)
 5. If you’re on a difficulty higher than Easiest:
   - Level 2: Add an extra allergic value for the attribute from a random zoombini
   - Level 3: Add a new random attribute & trait from a random zoombini
   - Level 4: Pick TWO new random criterions from a random zoombini
```

### Stonecold Caves
This one basically follows the same situation as Allergic Cliffs, but as a full overview:
```
1. Pick a random troll (Left or Right), they’re a Controller
2. Pick another random troll (Upper / Lower), they’re also a Controller
3. If you’re on easiest:
	a. Select a random zoombini
	b. Select the random zoombinis attribute & trait value (see Allergic Cliffs)
	c. Make the left or right controller allergic to the random criterion
	d. Whoever the Controller is on the Upper/Lower, they will now reject everyone.
If you’re on Level #2:
	a. Generate random criterion (see Easiest), make Left/Right controller allergic to it
	b. Generate another random criterion, make Upper/Lower controller allergic to it
If you’re on Level #3:
	a. Generate a random attribute, generate two values of the attribute, make the Left/Right allergic to it
	b. Generate a new random attribute, generate two values, and make the Upper/Lower controller allergic to both.
If you’re on Level #4:
	a. Generate 2 random unique criterions and make the Left/Right controller allergic.
	b. Generate 2 more unique criterions, and make the Upper/Lower controller allergic.
```

These thresholds describe how many attempts you need to make before the respective warning / failure is alerted.

|       Test        | Level #1 | Level #2 | Level #3 | Level # 4 |
|:-----------------:|:--------:|:--------:|:--------:|:---------:|
| Warning Threshold |    12    |    14    |    16    |    18     |
| Failure Threshold |    16    |    18    |    20    |    22     |


### Pizza Pass

| Difficulty | Troll Count | Max Pizza Toppings | Max Sundae Toppings | Minimum Toppings | Max Tries |
|:----------:|:-----------:|:------------------:|:-------------------:|:----------------:|:---------:|
|  Level #1  |      1      |         5          |      -1 (None)      |        2         |     6     |
|  Level #2  |      2      |         4          |          1          |        3         |     7     |
|  Level #3  |      3      |         5          |          1          |        3         |     7     |
|  Level #4  |      3      |         5          |          2          |        4         |     7     |

It does all of these bits (picking Pizza combinations etc) randomly, the seed of which is the number of ticks you’ve done so far in Unity.
Also as a side note, this means that after (about) 24.9 days, it’ll roll over to 2147483647
The toppings are picked like so:
```csharp
// Fill a list with the trolls
for(int j = 0; j < numberOfToppings;j++) {
	Topping = 2^j
	Pick a random troll
	Add random topping to the troll
}
```

If you want the proper code:
```csharp
private void AddPizzaToppings(int numberOfToppings)
{
	_maxPizzaToppings = numberOfToppings;
	System.Random random = new System.Random(Environment.TickCount);
	_entreeMachineController.AddPizzaToppingButtons(numberOfToppings);
	List<PizzaPassTroll> list = new List<PizzaPassTroll>();
	for (int i = 0; i < _activeTrolls; i++)
	{
		list.Add(_trolls[i]);
	}
	if (DataManager.Instance.CurrentPuzzleLevel != 3)
	{
		list.Add(_otherTroll);
	}
	for (int j = 0; j < numberOfToppings; j++)
	{
		int topping = (int)Mathf.Pow(2f, (float)j);
		int index = random.Next(0, list.Count);
		list[index].AddPizzaTopping((PizzaPass_PizzaToppings)topping);
	}
}
```
Also if you're paying attention to the code and that table, the next step accounts for the proper maximums etc.

The toppings are just enums (and powers of 2 of course)

|       | Sauce Only | Pineapple | Pepper | Pepperoni | Mushroom | Cheese |
|:-----:|:----------:|:-------- :|:------:|:---------:|:--------:|:------:|
| Value |      0     |    1      |    2   |    4      |    8     |   16   |

|       | Ice Cream | Whipped Cream | Sprinkles | Fudge |
|:-----:|:---------:|:-------------:|:---------:|:-----:|
| Value |     0     |       1       |     2     |   4   |

As a note, Difficulty #2 **CAN'T** get <u>Cheese</u>
  - As an explanation, since it iterates over the number of toppings, and level #2 only has 4 pizza toppings so the highest it can go up to is 2<sup>3</sup> = 8

The next step in the process is to balance the toppings / properly give them out:
```
Get the complete topping count across all trolls (j)
if the main troll(s) have less than the minimum # of toppings:
	Lowest Difficulty:
		- Add pizza toppings
	Otherwise:
		- 50% Chance:
			- Add pizza toppings
			- Add sundae toppings
	- Repeat until less than the minimum # of toppings
The pizza/sundae toppings addition is done like:
	- Get the reverse of the current troll (ie the one on the opposite end of the array of trolls)
		- Check if the troll has the specific topping
			- If so, add it to the normal troll, remove it from reverse, stop here
			- If not, increase the topping (ie Pineapple -> Pepper or Sprinkles -> Fudge)
```

### Who's Bayou
This one doesn’t have too much complexity, it's basically just checking if the zoombini next to it has any of the same stats and then doing something if they don’t match or something else if the other one doesn’t match.

### Toad Maze
This one works fairly complexly (at least in terms of setup):
```

1. Fill an array named array with {12,11,11,10,10,9,9,8,8,7,7,6,6,5,5,4,4}
2. Create three grids, one for Lily, Flower, Color
  a. Each of these grids contain an array of 144 numbers (ints)
     - The indexes are actually just coordinates in a 2D array 
     - 2D coords are turned into “1D” (ints) coords by doing: (y * 12 + x)
3. Fill each of these arrays with a random amount up to limit of each type of grid:
	a. Lily: (0 - 3)
	b. Flower: (0 - 2)
	c. Color: (0 - 4)
4. Pick a random number from 0, 99
	a. If it’s less than 25, horizontally flip the Lily Grid
	b. If it's not <25 but still <50, horizontally and vertically flip the Lily Grid
	c. If it’s not <25, not <50, but <75, horizontally flip the Lily Grid
5. Repeat step 4 with the Flower, and Color grids
6. Create an array of ToadPaths filled with {0,1,2,3,4,5,6,7,8,9,10,11}
7. If you’re on level #2 or #3:
	- TODO
8. Otherwise:
	a. Randomize the list of ToadPaths
	b. array[Amount of Zoombinis] is the amount of randomized paths for the current zoombini count.
		- For example: 16 zoombinis = 4 randomize paths
	c. Iterate from 0 to array[Zoombini Count] (m):
		- ToadPaths[m] are now apart of NonToadPaths
	d. Iterate over each of the NonToadPaths:
		- If NonToadPaths[n] is 0,1,2,3:
			a. Randomize the tiles of LilyGrid 
		- If NonToadPaths[n] is 4,5,6:
			b. Randomize the flowers of FlowerGrid
		- If NonToadPaths[n] is 7,8,9,10,11:
			c. Randomize the flowers of ColorGrid
	e. If you're on difficulty >= 1:
		- Randomly swap tiles between each other
```

### Stone Rise

TODO :)

### Hotel Dimensia

```csharp
int num = 0
if(traitCounts[HAIR] < 5) num += 1
if(traitCounts[EYES] < 5) num += 1
if(traitCounts[NOSE] < 5) num += 1
if(traitCounts[FEET] < 5) num += 1
bool flag = num >= 3

num2 = 0
if(traitCounts[HAIR] < 4) num2 += 1
if(traitCounts[EYES] < 4) num2 += 1
if(traitCounts[NOSE] < 4) num2 += 1
if(traitCounts[FEET] < 4) num2 += 1
bool flag2 = num >= 3
bool flag3 = false;


```




## Assorted Info

Most/all of this was made by modding the game in `DataManager.cs` to print out the respective things loaded like:
```csharp
// Log usernames / game strings
List<string> textOutput = new List<string>();
textOutput.Add("\n===== Game Strings =====");
foreach(GameStrings.GameString gs in _gameStrings.gameStrings) {
	textOutput.Add($"id: {gs.id}:");
	textOutput.Add($"	en: {gs.en.Replace("\n", " ")}");
	textOutput.Add($"	es: {gs.es.Replace("\n", " ")}");
}

textOutput.Add("\n===== Caption Strings =====");
foreach (CaptionStrings.CaptionString cs in _captionStrings.captionStrings) {
	textOutput.Add($"fileName: {cs.filename}:");
	textOutput.Add($"	en: {cs.en.Replace("\n", " ")}");
	textOutput.Add($"	es: {cs.es.Replace("\n", " ")}");
}

textOutput.Add("\n===== Achievements =====");
foreach (Achievement ach in _achievements.achievements) {
	textOutput.Add($"id: {ach.id}:");
	textOutput.Add($"	name_en: {ach.name_en.Replace("\n", " ")}");
	textOutput.Add($"	description_en: {ach.description_en.Replace("\n", " ")}");
	textOutput.Add($"	name_es: {ach.name_es.Replace("\n", " ")}");
	textOutput.Add($"	description_es: {ach.description_es.Replace("\n", " ")}");
}
textOutput.Add("\n===== Zoombini Names =====");
foreach(string name in names.names) textOutput.Add($"Name: {name}");

textOutput.Add("\n===== Hints =====");
foreach(Hints.ModuleHints hint in hints.hintData) {
	textOutput.Add($"Module: {Enum.GetName(typeof(Module), hint.module)}:");
	for (int i = 0; i < hint.hintsByLevel_en.Length; i++)
	{
		textOutput.Add($"	en_hint (#{i}): {hint.hintsByLevel_en[i].Replace("\n", " ")}");
		textOutput.Add($"	es_hint (#{i}): {hint.hintsByLevel_es[i].Replace("\n", " ")}");
	}
}
File.WriteAllLines("K:\\Zoombinis.txt", textOutput.ToArray());
```


### Zoombini Names
If you want a definitive count, there's 602 total possible Zoombini names.
The total list is available in [text](/assets/downloads/zoombinis/names.txt) and [JSON](/assets/downloads/zoombinis/names.json)

### Game Strings
The complete list is available in [text](/assets/downloads/zoombinis/gameStr.txt) and [JSON](/assets/downloads/zoombinis/gameStr.json)

### Captions
The complete list is available in [text](/assets/downloads/zoombinis/captions.txt) and [JSON](/assets/downloads/zoombinis/captions.json)


### Achievements
The complete list is available in [text](/assets/downloads/zoombinis/achievements.txt) and [JSON](/assets/downloads/zoombinis/achievements.json)

### Hints
For this I decided to write code to write out the JSON rather than regex it like I did for all of the other ones just out of ease / usage

{% raw %}
```csharp
List<string> textOutput = new List<string>();
textOutput.Add("\n===== Hints =====");		
foreach(Hints.ModuleHints hint in hints.hintData) {
	textOutput.Add($"\"{Enum.GetName(typeof(Module), hint.module)}\": {{");
	textOutput.Add($"\"hints_en\": [");
	for(int i = 0; i < hint.hintsByLevel_en.Length; i++) {
		textOutput.Add($"\"{hint.hintsByLevel_en[i].Replace("\n", " ")}\",");
	}
	textOutput.Add("],");
	textOutput.Add($"\"hints_es\": [");

	for (int i = 0; i < hint.hintsByLevel_es.Length; i++) {
		textOutput.Add($"\"{hint.hintsByLevel_es[i].Replace("\n", " ")}\",");
	}
	textOutput.Add("]");
	textOutput.Add("},");
}
File.WriteAllLines("K:\\Zoombinis.txt", textOutput.ToArray());
```
{% endraw %}

Then I did some simple clean up rather than write proper code the first time in order to fix the JSON output
It had `",` in the last entry in the arrays.

Either way, the complete list is available in [text](/assets/downloads/zoombinis/hints.txt) and [JSON](/assets/downloads/zoombinis/hints.json)


### Audio Rips
This step is (relatively) simple, all I basically ended up doing was launch [Unity Studio](https://github.com/RaduMC/AssetStudio/releases/).
Then selected all of the .asset files after loading the `Zoombinis_Data` folder into Unity Studio
Then it's basically just selecting out and extracting all of the AudioClips.
Next step is actually getting them into a proper format through Luigi Auriemma's [FSB files extractor](http://aluigi.altervista.org/search.php?src=fsbext)

The complete ripped audio is available in a [ZIP file on Google Drive](http://bit.ly/356t4hT)
If you want (some) of the music, its on a [Google Drive](http://bit.ly/3hFEM8f)