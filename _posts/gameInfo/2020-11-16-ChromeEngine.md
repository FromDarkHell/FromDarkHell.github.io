---
layout: post
title: Chrome Engine Games + Information
---

**Contents**
* TOC
{:toc}

---

## Early Chrome Engine

Nikita Tajemnica Skarbu Piratów (gonna be Nikita from now on) is the earliest [Chrome Engine](https://en.wikipedia.org/wiki/Chrome_Engine) game that I own / care to own.
I imagine that its close enough to CE2 since according to Wikipedia, CE2 just added DX9 support


The `.scr` files follow a fairly simple format, its basically just a modifiable text file
Anything like `!AddEndLevelMusic(...)` or other function names declare a function, later on using the same functions to repeatedly declare certain variables etc
The `.pak` (with the exception of `code.pak`) are all just zip files, containing more files in themselves.
The `code.pak` file is actually a Java JAR (which in practice are just zips with compiled code but ssh)
  - You can use [java-decompiler/jd-gui](https://github.com/java-decompiler/jd-gui/) to open them (renamed from `*.pak` to `*.jar`)


### Nikita Tajemnica Skarbu Piratów
This game uses Chrome Engine 2 which is basically just Chrome Engine 1 + DX9 support because *technology*

It more or less just has every asset you could ever want out in the open (ie the music is in `Data/MUSIC`)
The `.scr` files follow a fairly simple format, its basically just a modifiable text file
Anything like `!AddEndLevelMusic(...)` or other function names declare a function, later on using the same functions to repeatedly declare certain variables etc

Random Info:
  * [Polish README](https://pastebin.com/raw/UpCYvKVe)
  * [Poorly Translated README](https://pastebin.com/raw/DiTp8d6t)

Save Format (please don't ask I was bored):
```
- 20 bytes: ???

- chunkID: little endian int32 
- chunkLength: le int32 (excluding size of int32)

- randomBool: bool (has to be True unless name = null)
- nameLength: short
- Player (Profile) Name [length of nameLength]

- Completed Levels: int32
- # of Hints (60): int32
	- # of Hints amount of bools (hint values in index): bool (byte)
- m_bMustCreateStartProfile: bool [always true]

- chunk2ID: le endian int32
- chunk2Length: le int32
	- subchunk1ID: le int32
	- subchunk1Length: le int32
	- inputSettings (until EOF):
		- deviceID: signed 32bit int
```
- Format was gleaned from the decompiled code in `code.pak` (specifically `Player.class`)
- The `deviceID` is effectively an enum, see [this pastebin](https://pastebin.com/raw/qJjdWeYV) for values

### Call of Juarez 1
The `.scr` format is basically unchanged in between Chrome Engine 2 and CE 3 (this game)
There's not much of a difference really between CE2/CE3, so I've got not much to add

As a note in terms of save files, this game uses both `*.CoJSave`, `*.CoJSave.dat`, and `*.CoJSave.lev` for the saves (and `*.CoJSave.tga` but those are just basic TGAs)

The `.lev` files are effectively just text files, not sure on their purpose/format
There's nothing to really distinguish the player from others, its more or less just a serialized version of every property/object that's being stored at the time of the save

The `*.CoJSave` and `*.CoJSave.dat` files are also just zip files, except they have only 1 file inside of them, that being `data`.

General `data` Format:
```
- 12 bytes (???)

Repeat until EOF:
- Chunk ID: le int32
- Chunk Length: le int32
	ID 136:
		- Save Version Number: int32 (50050)
	ID 154 ("MODULE_TIME"):
		- fReadModuleTime: le float32
		- ???
	ID 151 ("SAVE_ADDINS"):
		- nNextIDValue: le int32
		- Other operations, see the source for more info
	ID 105 ("EXPRESSION_VAR_MAN"):
		- ???
	ID 103 ("Object"):
		- UniqueID: int32
		- ClassName: String (see Nikita)
		- ObjectName: String (^^^)
	ID 102 ("PRECREATE_OBJECT"):
		- ??? (Type of Object, gets pre-loaded?)
	ID 104 ("OBJECTS_REPOSITORY"):
		- sizeOfRepository: le int32
		- serializeableObject:
			- objectID: le int32
			- objectName: String (see Nikita name for how to handle Strings)
	ID 155 ("MARKER_END"):
		- markerPosition: Vector (figure this one out on your own for now)
```

#### Modification
This game's JVM runs under Java version "1.4.2_10":
```
java version "1.4.2_10"
Java(TM) 2 Runtime Environment, Standard Edition (build 1.4.2_10-b03)
Java HotSpot(TM) Client VM (build 1.4.2_10-b03, mixed mode)
```
As output from `[GAME ROOT]/jre/bin/java.exe -version`

## Later Chrome Engine

### Call of Juarez: Gunslinger
This game (according to Wikipedia) uses Chrome Engine 5, which still basically functions the same way in effect
One of the big differences between this game and the past games is that this one's `*.pak` files are encrypted
The `*.pak` files are still zip files but now they've got a password in them (they're also Level 4 compressed)

#### Encryption
Luckily it uses the less secure [ZIP2.0](https://en.wikipedia.org/wiki/ZIP_(file_format)#Encryption) form of encryption which has a 96-bit encryption key. Ironically using AES encryption [probably](https://github.com/mmozeiko/aes-finder) would've been easier to rip out rather than needing to brute force it due to the tools available for it.

It also seems to have a DLL meant for game scripts, buuut I've got no idea how on earth it actually gets loaded
Its got a function called `InitializeGameScriptDLL` and `ShutdownGameScriptDLL` but they do some weird code magic that I'm yet to figure out
Annoyingly enough since the game comes with SteamStub based DRM, you'll want to use [Steamless](https://github.com/atom0s/Steamless) by [atom0s](https://github.com/atom0s).

The password for the encrypted zip (`*.pak`) files is `TN2kTjNmBvn5axaS6tGY`

Just some random facts I learned from static analysis:
  - Run the game with the cmd arg, `-ami` to be able to run multiple copies at the same time
  - Use `--wd` to be able to set the game's working directory (usually the exe dir)
  - Use `-game_dir=` to be able to set where the game loads its files? (unsure rn)
  - All the cmd args include: [https://pastebin.com/raw/DtbJ8eJx](https://pastebin.com/raw/DtbJ8eJx)
  - It can also load "DLC" Pak files located in `coj4/DataDLC%d.pak` (up until `DataDLC2.pak`)
  - Use `/multimon` to switch the monitor that the game is on
  - Launch the game with `/repltest` to get uhh results:
  <video src="{{ site.baseurl }}/assets/images/ohEOAIO2wX.mp4" width="600" height="400" controls preload></video>

(I doubt that most of those args like `-autostartlevel` etc are actually called considering there's no references to their functions in Ghidra but idk)

#### Modification
Now that "we" (meaning me but late to the party) can modify files in the "ZIP" files, they use a "custom" CRC for a checksum rather than a normal one that you can just open up into WinRAR etc.
Looking at [Gibbed.Chrome](https://github.com/gibbed/Gibbed.Chrome) by [Gibbed](https://github.com/gibbed/) you'll notice that there's a few errors in their hashing algorithm.
No real idea on what they are, hashing/cryptography kinda just isn't my jam, but I still want to see how far into it I can get.
(One downside to Gibbed's approach to modifying the pak files is that it doubles the file size of the `.pak` files :/)
So I got to setting that code up to be its own standalone class/namespace rather than a single command line program.
Now I've got a small program that takes a `[original file]` argument and a `[modified directory]` so that way it can get zipped up.

I started messing with the localization files first just because they're an easier place to test than code modifications (and its just strings). These are stored in `DataEn.pak`, specifically mainly `cotexts.bin`

<img src="{{ site.baseurl }}/assets/images/coj_cG2OnUnVjo.png"/>
<img src="{{ site.baseurl }}/assets/images/coj_I0FvMJBPw2.png" width="643" height="450"/>

So uhhh it didn't quite work, buuut the initial `Press Any Key To Continue` key *did* become **HELP ME PLEASE**

As it turns out, when I was saving the files in my code (since I was just writing it to a zip and then using Gibbed's fix code),
I didn't write any of it to a `data/*.*` but instead just `*.*`

Impressively though, the `*.scr` in the `data/` directory which I was *trying* to edit, doesn't actually control any of the text for some reason.
The text that's localized in game is instead stored in the `cotexts.bin` (and the other `.bin` files too)
<img src="{{ site.baseurl }}/assets/images/coj_bUgbyZvu2N.png" width="643" height="450"/>

Pointlessly I created a python script to print them all out to a JSON dict, it's on a [Gist](https://gist.github.com/FromDarkHell/9d729df807ba5231a624d41ad2dcf6e1#file-voicesparser-py)

## Footnotes
Here's your reminder that "western" styled content (**ALMOST**) always portrays a white washed viewpoint of history.
This is due to the television codes at the time in which westerns had a near monopoly on TV.
If you want more, please watch this video: [https://www.youtube.com/watch?v=jzMFoNZeZm0](https://www.youtube.com/watch?v=jzMFoNZeZm0)
I'd like to mention the story line of CoJ: Bound in Blood, but I haven't properly played it so I don't have enough room to talk.