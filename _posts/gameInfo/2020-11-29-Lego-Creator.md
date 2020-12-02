---
layout: post
title: Lego Creator Game Dumps
---

<style>
    img { 
        max-width: 100%; 
        height: auto;
    }

    #image-container {
        display: flex;
        width: 100%;
        margin-bottom: 3rem;
        flex-wrap:wrap;
    }
</style>

**Contents**
* TOC
{:toc}

## Harry Potter 1
You can find a disc copy of this game from [archive.org](https://archive.org/details/lego-creator-harry-potter-pc-game) uploaded courtesy of the Harry Potter Archive Project.
If you try to install it on a Win 10 PC (atleast one that has >1GB RAM prolly), it'll complain that you don't have enough RAM (and I doubt you want to get 64mb DDR4)

### Music
One problem is that this game is so old enough to where all of the tools that *could* play the music files / convert them are now absolutely smashed to bits through time.
This game uses a [DLS](https://en.wikipedia.org/wiki/DLS_format) set of sound files (and two mp3s but they're identical in tune)
Through about way too much digging, I was able to figure out through the [Video Game Music Preservation Foundation wiki](http://www.vgmpf.com/Wiki/index.php?title=SGT) a way of playing these `.sgt` / `.dls` files...
In this case I found the easiest thing to use (and probably the only one) being the `Simple DirectMusic Player` by Russell Hicks which has a mirror at [http://www.christianmanga.com/tbf/index.php?action=sdmp](http://www.christianmanga.com/tbf/index.php?action=sdmp)

Slight caveat being that it doesn't actually *rip* them (which is a problem with DirectMusic, rather than the thing itself)
So instead I get to manually sit through and listen to them and then end them whenever I see fit because the `*.sgt` files actually support looping (and so does the player and you can't disable it...)
I bet if one felt like going through the effort to either:
  - A. understand the `*.sgt` files more and edit out looping
  - B. figure out a way to detect a loop (ie compare start waveform to back waveform)

But instead I kinda don't feel like doing it that way plus these edits are fairly fine imo, atleast better than none

So I sat around for like 10 minutes listening to the entire soundtrack to record them all.
They're now available on [Google Drive](https://bit.ly/3mo2tTT)
(and of course they're all ID3 tagged ❤️)

### Paks
This game uses the classic trend of having 1 set of big files filled with tinier files in of themselves *but* its also not just a ZIP (unlike some other engines *cough cough Call of Juarez*)
Luckily the author of [QuickBMS](http://aluigi.altervista.org/quickbms.htm) has already made a [script](aluigi.org/bms/lego_creator.bms) using QuickBMS to extract these out making it fairly simple to read them out.

There's not too much that I really found interesting from the paks, most of them are just fairly simple files + models

I decided to rip out all of the spell images just for no good reason

<div id="image-container">
{% for image in site.static_files %}
    {% if image.path contains 'assets/downloads/lego-creator/hp1_spells' %}
      {% if image.path contains '_selected.bmp' %}
            <a href="{{ site.baseurl }}{{ image.path }}" style="text-align: center;width:6%;">
                <img src="{{ site.baseurl }}{{ image.path }}" alt="image" loading="lazy" style="display:block;flex-shrink: 1;min-width:0;height:auto;width:100%;align-self: flex-start; margin-right: .5rem;" />
            </a>
      {% endif %}
    {% endif %}
{% endfor %}
</div>
For in the event you want a perfect image for turning into a frog or dropping beans or getting hit in the head or rain idk

There's the "unselected" version available on [Github](https://github.com/FromDarkHell/FromDarkHell.github.io/tree/master/assets/downloads/lego-creator/hp1_spells/) as well

I also ripped some of the sounds that I actually enjoyed listening to because I have the sense of humor of a 2 year old

Illegal Character Found: <audio src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_sounds/mb_error_illegalcharfound.wav" type="audio/wav" controls preload="metadata"></audio>

No Floppy Disk: <audio src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_sounds/mb_error_nofloppydisk.wav" type="audio/wav" controls preload="metadata"></audio>

#### Videos

In the game itself, these videos are actually .mpg buut those are large and I like smol files so no
Used some fairly simple Powershell and ffmpeg to convert all of them into `.mp4` so I can put them all up here
```
Get-ChildItem -Path .\ -Filter *.mpg -File -Name | ForEach-Object {
    $out = ".\output\" + [System.IO.Path]::GetFileNameWithoutExtension($_) + ".mp4"
    Write-Host "Converting" $_ "to" $out
    ffmpeg -i $_ -c:v libx264 -c:a aac -crf 20 -preset:v veryslow $out
}
``` 
In case you want to know

**Fairly high volume warning on most of these**

##### Finding The Way
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/findingtheway.mp4" type="video/mp4" controls preload="metadata"></video>

##### First Years
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/firstyears.mp4" type="video/mp4" controls preload="metadata"></video>

##### Flying Practice
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/flyingpractice.mp4" type="video/mp4" controls preload="metadata"></video>

##### Ghost Hunting
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/ghosthunting.mp4" type="video/mp4" controls preload="metadata"></video>

##### HP Intro
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/HPIntro.mp4" type="video/mp4" controls preload="metadata"></video>

##### Letting In Water
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/lettinginwater.mp4" type="video/mp4" controls preload="metadata"></video>

##### LMI Intro
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/lmiintro.mp4" type="video/mp4" controls preload="metadata"></video>

##### Owl Post
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/owlpost.mp4" type="video/mp4" controls preload="metadata"></video>

##### Spell Casting
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/spellcasting.mp4" type="video/mp4" controls preload="metadata"></video>

##### Stop Malfoy
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/stopmalfoy.mp4" type="video/mp4" controls preload="metadata"></video>

##### The Train Now Departing
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/thetrainnowdeparting.mp4" type="video/mp4" controls preload="metadata"></video>

##### Wheres Scabbers
<video onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/lego-creator/hp1_movies/wheresscabbers.mp4" type="video/mp4" controls preload="metadata"></video>

Please enjoy Scabbers who is uhhhhh definitely a rat :)

## Harry Potter And The Chamber of Secrets

With this game being an "old" (2001) game its fairly up front / simplistic about the internals 

If you want a copy of the game, especially since its old af and fairly obscure even at the time (afaik)
There's an ISO on [archive.org](https://archive.org/details/FLTLCHP)
You'll also need a serial key in the format like my product key `1226-1794873-5023307-3430` or something like [these](https://pastebin.com/raw/6yQWuCK4)
It'll ask you if you want to register your product which uhhh almost definitely doesn't work

In this case since it has some form of DRM so the ISO doesn't do that, you'll need to hex-edit the exe (in some form)
Or if you're lazy other people did the work and idk where to get it now but [Fairlight](/assets/downloads/lego-creator/creator.zip) did the job

### Music
The music in this game is just `*.wav` files (178kbps)
But because I feel the need to be impressively extra with anything technical, I wanted to convert them the `*.wav`s to ID3-tagged MP3 files.

Time for some [Python gists](https://gist.github.com/FromDarkHell/72222eef971f0ae7bd003050aef66f1a)
Instead of using my old `ID3Tagger` python library I found a while ago (which I used for Lollipop Chainsaw earlier this year)
I chose to go with [mutagen](https://mutagen.readthedocs.io/en/latest/) just because it seemed cleaner (and I found a dead simple guide for how to use it rather than fumbling with ID3Tagger).

Steps:
1. Convert the `./sound/*.wav` files to `./mp3/*.mp3`
  - For this I just used `ffmpeg` on the cli and integrated it with `subprocess.call` in Python
2. Add the ID3 tags to each of the MP3 files
  - Feed the MP3 file to mutagen through `mp3file = MP3(file, ID3=EasyID3)`
  - Set the album to `Lego Creator: Harry Potter and the Chamber of Secrets`
  - Album Artists are: `["Earcom Ltd", "Paul Weir", "Mariko Ohtake"]` (found through reading the `credits.xml` in `./database/ui/localized/eng/credits.xml`)
  - Set the ID3 title to the respective song title
  - Set the track number to whatever number it is (just alphabetical order / load order in the game imo)

After all of this finagling (fun fact thats how you spell that word apparently), you can now download the music from a random lego game from 2001 at [Google Drive](https://bit.ly/2VgAutC) all of the tracks are separate, but if you want to download them all download them as a zip from our data lord monopoly Google

### Configuration
When you launch the game it pulls from `./lego.conf` for its configuration  (its just a slightly condensed INI file fwiw)
This is actually the only way to change the config settings because even the `legoconf.exe` is just a visual tester
At the bottom of the file is a snippet like [this](https://pastebin.com/raw/HBrfrN4h) (this is the original unmodified version btw for restoring to)

Even though the game resets the resolution back at the bottom you can remove it (or change it there at those lines)
A few key settings I'd probably change are `IntroFilmForce=17000` to `IntroFilmForce=0` which means you can immediately skip the lego intro movie.
You can also just remove `movies/lmiintro.mpg` from the `IntroFilmFile` property which immediately skips it :)

I would also recommend changing the `Width`, `Height`, and `Fullscreen` to fit your monitor or however you want to do it.
I also changed the `DisplayDriver` to `OpenGL` rather than `DX7`
If you change the `InputDriver` to `Win32` atleast on Windows 10 it just makes the mouse unusuable in game.

You can also edit your keybinds if you go into `./database/ui/keybindings/default.xml`
As the name suggests its just fairly standard XML, mapping a `<key>` to a `<Function>` with a `name` property
I rebound my movement keys (and my developer keys) to something more comfortable to my sweaty gamer hands™
If you want my binds: look at [this pastebin](https://pastebin.com/raw/56bwpWJj)

### Developer Mode
If you enable `DeveloperMode` in the config file you get access to some funky new tools
It includes keybinds like:
```
V: Cursor Switch
Escape: Shutdown Game
F4: Reset Camera
F5: Snapshot Save Defaults
F6: Snapshot Next Model
F7: Snapshot
F8: Snapshot All
F9: Snapshot Previous Model
F10: Email (???)
F11: Console (!!!)
I: Reset UI
O: Delayed Reset UI
F: Show Stats (?)
Equal: Increase Resolution
Minus: Decrease Resolution
```
I'm unable to figure out what `Email` actually does but it lags the game for a few seconds

### Save Data
The save files are stored in `%localappdata%/LEGO Interactive/Creator HP CoS`
It stores all user data in `./users` (all relative paths here are relative to the save file dir)
The users themselves (ie where the game reads their info) are read from `./users/users.xml`
The user "struct" (since its just XML) contains data like:
```
    <User_0>
      <Name>Harry</Name>
      <UIClamped>true</UIClamped>
      <StartWorld>hogext_defsave</StartWorld>
      <StartObjectType>harryuniform</StartObjectType>
      <GroundHugging>true</GroundHugging>
      <TutorialsFinished>1</TutorialsFinished>
      <ChestLock>1</ChestLock>
      <LastWorlds/>
      <CollectedItems/>
    </User_0>
```
All of the `StartWorld` values come from `[game install]/database/savegames/*.xml`
Its fairly easy to softlock yourself (atleast without more editing) if you put yourself in a map you're not supposed to be in at that point

## Footnotes
Here's your reminder that J.K. Rowling is a [TERF](https://www.nytimes.com/2019/12/19/world/europe/jk-rowling-maya-forstater-transgender.html) (alongside [Robbie Coltrane](https://www.insider.com/hagrid-actor-robbie-coltrane-defends-jk-rowling-over-transphobia-claim-2020-9) and [Brian Cox](https://www.pinknews.co.uk/2020/09/24/succession-brian-cox-jk-rowling-defence-cancel-culture-troubled-blood-robert-galbraith/) both of whom voiced their support for her transphobic essay) but [Rupert Grint](https://metro.co.uk/2020/06/12/rupert-grint-trans-statement-following-jk-rowling-backlash-12842044/) and [Daniel Radcliffe](https://www.thetrevorproject.org/2020/06/08/daniel-radcliffe-responds-to-j-k-rowlings-tweets-on-gender-identity/) are all (atleast in this aspect) better people than Rowling.

As Racliffe said, `Transgender women are women. Any statement to the contrary erases the identity and dignity of transgender people and goes against all advice given by professional health care associations who have far more expertise on this subject matter`.
Please feel free to donate to [The Trevor Project](https://give.thetrevorproject.org/give/63307/#!/donation/checkout) or any other charity of your choice.