---
layout: post
title: Dredd VS Death Info
---

<style>
.rouge-gutter {
	width: 5%;
}
</style>

**Contents**
* TOC
{:toc}

Please don't ask why I've got an info page about a random niche game from 2003, I felt bored :)

## HD / Windowed Install

If you're playing the game on a computer younger than like 2005 (or with a recent monitor)
You'll want to use the [HD Patcher](https://www.moddb.com/downloads/mirror/108425/120/70a14d36bea91716c33fc79828814ecc/)
Install Guide:
- Unpack the patcher to the Judge Dredd game folder.
- Then you can just run the program and it'll do some weird computer magic and be able to launch the game with a setup meant for not 2003
- Thanks :)

## Patch Notes

There was only 1 actual patch (that being 1.01): 
- Patch Notes V1.01: [https://pastebin.com/raw/MD8rwhDT](https://pastebin.com/raw/MD8rwhDT)

## ASR File Format

Each of the `.asr` files meant to represent text start off with a magic string/number of: `Asura{Space}{Space}{Space}`.

The next set of 4 bytes is another string representing the "type" of this .ASR, so far I've seen:

* `LTXT` (Localization? Text):
	- Byte Skip: `0x1C`
* `PTXT` (??? Text):
	- Used in all of the `.asr` files in `l_text` (probably more localization?)
	- Same format as the `LTXT` format
	- Byte Skip: `0x2C`
* `HTXT` (??? Text)
	- Byte Skip: `0x1C`
	- Nearly the same format as `LTXT`/`PTXT`
	- Only difference: there's 4 extra bytes in between each string
		* The first byte starts counting up and then it kinda just gives up on math so it jumps for some reason
		* The next three bytes are somewhat useless afaik
* `RSFL` 
* `RSCF` One large chunk of `.WAV` sound files
	- Byte Skip: `0x24`
	- (File Name Length (as an int?))
		* Doesn't really matter since the file paths are null terminated anyway
	- Null Byte(s) (variable for some reason)
	- [(RIFF) WAV Format](http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html)
		* It doesn't really matter too much if you're trying to extract, since you can just get the length 
		* Length is the 4-byte int (little endian obviously) right past the `RIFF` Chunk ID

The `.pc` files in `./envs` start off with the same magic number/string with `FNFO` as the "type" string

In the root directory there's `.dsg` files without any form of magic numbers
I've not yet bothered/tried to figure out the format of these (profiles?)
Then in `./save{x}`, you've got *proper* saves with the "Asura   " magic number and then a `save` type


## Text File Formats

If you skip however many `[byte skip]` amount of bytes from the type descriptor, you'll end up at the start of the first string, its all encoded in `UTF-16 (Big-Endian)` (the strings themselves that are inside the `.ASR` ).
The length you get is the actual length of the `UTF-16-BE` string itself rather than the # of bytes, but for those mathematically inclined its just that amount x2 (because of UTF-16's extra byte). 
You skip another 3 null bytes, and now you're at the start of the string, you read in the bytes as `UTF-16-BE` for `length*2` bytes in total, giving you the string (probably with a null byte at the end too). Badabing badaboom you can now read

There's no length byte(s) specified in the file itself, it just has a group of 7 bytes (all filled with `0x00`) at the end for padding, that way you know you've reached the end of your long chunky string set.

If you're too lazy (understandable) to write these programs yourself.
I've got Python code to parse it [as a Gist](https://gist.github.com/FromDarkHell/41bc5bb65d0319faacae1c6050a5b9c9#file-parsetext-py)

## Sound File Format
This basically only includes the `RSCF` type which is only used in two files: `MPSnds.asr` and `en_gmsnd.asr`
You start off past the Asura header, skip the next `0x24` bytes to make it to the start of the file path of the `.WAV` file
Then read the string until there's a null byte giving you something like: `\sounds\characters\dredd\dredd_jump_1.wav`
Then skip however many bytes (depends on the .WAV file itself for some reason) until you hit the `RIFF` Chunk ID
Then you can just read the length of the `.WAV` file contained inside (and add 4 to it to get to the actual end of the WAV)
Badabing badaboom

If you expected the entire `en_gmsnd.asr` file to contain *only* wave files, you're wrong :)
Eventually you'll reach the end of a wave sound file and then hit `replaceable sounds from D:\AlienbrainWork\Dredd_Art\Asura_Files\Sounds\Spch_En\en_sound_list_speech.ini`

I'm not fully sure why this [Alienbrain](https://www.alienbrain.com/) file is included in it, but in my parsing I basically just skipped over it because it didn't seem to be any actual text and I wasn't sure how to parse it and give anything interesting.

Once again if you're too lazy to parse these out yourself
Here's the [Python script Gist](https://gist.github.com/FromDarkHell/41bc5bb65d0319faacae1c6050a5b9c9#file-parsesound-py)

## Info Dumps

### Sound Files
These all just come from `MPSnds.asr` and `en_gmsnd.asr`

Google Drive Link: [Drive Link](https://drive.google.com/file/d/1RWDXBFkHJGdpA58JdSmLYpcG2JXorJY5/view?usp=sharing)

P.S. If you're looking for `I AM THE LAW` its in `spch_en/characters/dialogue/judge_dredd/ai/judge_dredd_taunt1.wav` (and `judge_dredd_taunt1b.wav`)

### Game Manual

Manual: [Drive Link](https://drive.google.com/drive/u/1/folders/1xUD6cEuhGXdo0flUwW1kdSACYfkZA7nz)

### Cutscene Quotes
These come from `./Misc/CSText/CS_En.asr`
I kinda assume that its used from cutscenes (etc)
Pastebin: [https://pastebin.com/raw/rCBQmBi6](https://pastebin.com/raw/rCBQmBi6)

```
It is the third decade of the 22nd century.
Unemployment is endemic, boredom is universal
and only the Judges can prevent total anarchy...
Empowered to dispense instant justice, 
they are judge, jury and executioner all in one.
The most feared and respected of all the Judges is Dredd -
he is the Law!
Our adoring public.
Dredd, you gotta stop holding your fan club meetings outside City Hall
Dispense with the wisecracks, Anderson -
tell Dredd what you just told me.
The Pre-Cogs at PSI-Division are predicting a terrible plague.
Dredd, the last thing this city needs is an epidemic -
citizens crammed together the way they are,
it would spread like wildfire.
I'll keep my ear to the ground, Chief Hershey.
In the meantime, disperse those demonstrators outside.
Consider it done.
Aaaaaaaaiiii!
Drokk!
Wwwhat was that thing?
I got a bad feeling about this.
Drokk.....Sir.
Dredd!  There must have been a hundred vampires packed into that H-Wagon!
I'm going in.
Warning!  Failsafe locking mechanism deactivated!
Releasssse usssss!
What!?
Releassse ussss! 
Help ussss...!
Join ussss...!
You musssst...
Get out of my head!
Emergency Release Activated
NOOOO!!!
Freeeeedommmm!
Now sssssinner, prepare to be judggged.
The crime isss liffffe, the ssssentence isss DEATH!
Aaaaaaaaiiii!
Drokk!
Dredd here. Come in, Control.
Dredd, we've lost radio contact with a squad of Psi-Judges in Sector 13 Docks.
They were tracking the Dark Judges... 
I'll find them.
It's Dredd!
Throw down your weapons!  You're under arrest!
The dead have risen and are laying waste to the Ryder Mega-Mall.
Odds on Judge Death has something to do with this.
I'll deal with this, Control.
 Let me know as soon as you hear anything of the Dark Judges.
Control to Dredd. 
Tek-Division has run tests on the Vampires and the Undead creatures.
They're both infected with Pet Regen retrovirus!
Looks like the Dark Judges aren't responsible then.
Time I brought Icarus in for questioning. Where is he?
He was last tracked landing at a disused facility out by the western perimeter of the city.
Ah, the famous Judge Dredd!  What brings you here?
Icarus, I'm shutting this facility down.
It doesn't matter - the serum is perfected! 
I have discovered the key to immortality!
 No one can stop me now!
Warning!  Incubation Chamber Release activated!
Consider yourself stopped.
D-d-d-d-dark Judges!  Zombies!  Vampires!  We're doomed!  
Aaaaaaaaaaa!
Dredd!  Mortis is in there somewhere.
We've managed to seal off the floors below.
All exits are covered?
Mortis is not leaving this building.
You got that right.
Trapped!  Curssssssssse you Dredd!
But three othersss remain to judggggge your life-infessssssted city!
Give up your worthlesssssss battle!
Control!  Get a Psi-Squad down here FAST.
Ffff-ff-ff-fire!  In the Smokatorium!
Hey, anybody got a light?
Certainly, ssssssinner!
Arrrggghhh!
Nooooooooooo!
That's two down, two to go.
Dredd!  We've got a situation at Resyk.
There may be survivors but we can't get through -
It's teeming with Undead!  
Aaaah, Judge Dredd!  Glad you could join usssss!
Obssserve: a lessssson in how to dispenssssse jussticccce!
Arrghh!
Stomm!
Ahahahahahah!
You cannot defeat me!
Cursssssse you, Dredd!
Anderson to Dredd!  Do you copy?
Dredd here. Death is escaping into the Undercity.
Grud! Judge Fear is down here somewhere too.
You're down there already?  We've got to stop them!
What do you think I'm doing, Joe?  Get down here!
Dredd! 
I can smell your fear, Dredd!  But you can wait...
Anderson?!  Anderson?  
Drokk!
Control! I've trapped Judge Fear in the Egyptian vault of the Metropolitan Museum!
Roger that.
Anderson must have gone through! Drokk!
Aaaah, Dreddddd! I've been exssssspecting you.
What are you doing to the Psi-Judges?
Harnessing their Psi-energy, I will open a dimensssssional gateway between thisssss world and yourssssss.
All life will be exsssssstinguished 
and Mega-City One shall at lasssssst be purified!
I've stopped you before, creep.
What makes you think you'll get away with it this time? 
The Death Cult was kind enough to provide me 
with this magnificent body. 
Icarussss's sssinful resssearch into eternal life
would seem to have itssss uses!
I killed Icarus.
A worthy attempt, but his serum had already taken effect! 
Now his body is indestructible!  And it is mine!
And now, Dredd, the time of judgement is at hand!
Over my dead body!
Indeed.
Never a suction trap when you need one is there?
 Guys! You know what to do!
This can't beeeeee!
Aaaaaaaarggghh!
Noooooooooo!
Judge Death is...trapped...within me.
We just eliminated the last of the vampires from Sector 5.
The Regen infestation is over.
Good work, Dredd.
Rest assured that we'll be stepping up security on the Dark Judges. 
What about Anderson? 
Containing Judge Death's essence was a terrible strain on her - -
But she's doing fine, thank you very much.
Joe, you weren't worried about me were you?
Control to Dredd!  Block war in progress!
Corner of Reeves and Hopper.
On my way, Control. Dredd out!
I guess we'll never know. 
```

### Control Quotes
These come from `./Misc/l_text/control/c_En.asr` 
I assume they get these names as they're probably said when you "lose" control (aka you murder poor innocent civilians)

Pastebin: [https://pastebin.com/U9yUZQiR](https://pastebin.com/U9yUZQiR)

```
What do you think you're doing?
Take it easy, Dredd!
That was a little harsh, don't you think?
Check your fire!
Watch where you're shooting!
Watch those civilians!
Stand down, Dredd.
Cool it, Dredd!
Hold your fire!
That's enough, Dredd!
Dredd, that's ENOUGH!
You've done it now Dredd.
I'm sending in the SJS.
The SJS have been dispatched.
All units, Dredd has gone rogue.
You should have checked your Law Meter Dredd.
The SJS are coming for you.
Nice work, Dredd.
You're living up to your reputation, Dredd.
Keep it up, Dredd.
Outstanding work, Dredd.
You're a credit to the uniform.
I'm putting you forward for another recommendation, Dredd.
Oh Grud, we lost him!
Dredd's dead, baby, Dredd's dead!
Meat-WAGON!
Code Red 99! JUDGE DOWN! 
Judge Down! Repeat, Judge Down!
This Control, we just lost Judge Dredd.
Get up, Joe! Say it isn't so!
```

### Speaker Quotes

These come from `./Misc/l_text/tannoy/t_En.asr`
Tannoy is a british maker of speakers (for those not in the *speaker INDUSTRY*) 
	- Side Note: Rebellion is British (apparently)

Here's an easier to read version: [Pastebin](https://pastebin.com/raw/JP6j474U)

```
Greetings, fellow worshippers! This is Necrus, your High Priest. At last Judge Death and his Lieutenants are free! Free to purge this planet of its greatest sin: life itself!
Salutations, loyal followers. I, Necrus, am about to complete the ceremony that will give the Dark Judges physical form. Gather at the altar room and  bear witness to the end of history!
Search your feelings, Dredd.. In your heart, you know that death is far better than life in this overcrowded,  sin-infested metropolis. Join us, and DIE!
Welcome to the Clooney Medical Centre, where good medical treatment is WORTH paying for.
All terminal patients are requested to stay in their beds. I mean, what's the point? 
Attention all staff and patients. Evacuation of the Clooney Medical Centre is now in progress. 
All patients remaining in the building are advised to make their way to the  quarantine chambers. 
Paging Dr. Rosen-Rosen to the Infirmary. A young mother has just given birth to mutant triplets. Repeat, Dr. Rosen-Rosen to the infirmary for mutant triplets.
The Hover Bus Corporation thanks you for waiting.
Hover Bus! Come fly with us! The Hover Bus Corporation can not be held responsible for passengers plummeting to their deaths.
The Hover Bus Corporation would like to remind passengers who weigh over one ton that they must buy two tickets.
Security breach Code 5. Unauthorised access to laboratories detected.
This is Dr. Icarus speaking. The Justice Department has entered this facility. Workers in Labs 1, 2 and 3 should begin deleting all files pertaining to the Pet Regen project immediately. 
Your attention, please. One or two of my most recent experiments may have escaped from their containment chambers. Please be on your guard. 
This is Dr. Icarus again. Please try not to panic. These creatures are completely harmless if you show them who's boss. 
Ahem. This is Dr. Willis. Dr. Icarus may have somewhat over-estimated the harmlessness of the  blood-sucking creatures . Please make your way to the nearest available exit.
Computer mainframe offline. Security systems disabled. 
Going Up
Level 412 Blood Bank 
Mega-City News Public Information Bulletin. There have been a series of radiation leaks in sector seven-oh-one-zero-four all the way from Murtagh-and-Riggs to Rickman-and-Willis. Citizens are advised to wear their anti-rad suits at all times.
In a bizarre turn of events all the members of  the Skeleton Chapter of Mega-City One's ever-expanding Death Cult have ended their lives as a part of the city's largest ever Suicide Pact. Seems those crazy cult members just couldn't wait for the recently-escaped Dark Judges to bring about the end of the world. Didn't anybody ever tell them patience is a virtue? 
Good news for citizens! The population of Mega-City One has reached an all-time high. You're now sharing this beautiful conurbation with an amazing 400 million other people. Look at it this way, you'll never run out of folks to talk to!
Herman Squish will tomorrow collect the Mega-City One Fattie Of The Year Award for gross, consistent and ever-increasing obesity. At only 24 years of age, Squish already has two Inter-City Eating Competition Medals under his sizeable belt. This is the Mega-City News, hoping you enjoy your dinner. 
With 360 million citizens still seeking employment in the Big Meg, another bout of suicides is expected on the eve of the working week this Sunday. Mega-City News will bring you all the gory details in our Sunday Night Fever Special - live, only on this channel.
Stay tuned for the highlights of this year's Super Surf Power Board Competition, including THAT footage of ex-champ Travis Hotfoot falling 332 stories to his death after his anti-grav unit failed in the middle of what this reporter believes is known as an 'Audacious Boost'. All that and more, after these messages..
Word has it that the Justice Department are stepping up random Crime Blitzes in a bid to cap the recent rise in petty crime. Mega-City News advises citizens of the Big Meg to clean the skeletons from their closets at the next available opportunity.
Welcome to the Mega Mall. Feeling empty inside? Why not fill the void with a series of  unnecessary purchases?
Mega Mall research has shown that buying things may actually boost your immune system, improve your eyesight and even reduce cholesterol! 
Mega Mall reminds you that, after a recent spate of escalator incidents.. aaarghh!!!
All that consumerism worn you out? Why not try one of the tasty snacks on offer at the Mega Mall's very own Food Court.
If you have no intention of making a purchase, please leave immediately. Loiterers will be prosecuted.
All personnel alert, security systems have been compromised. Stay frosty, people.
Warning, there is a breakout in progress. Convicted perpetrators are now at large. All non-security personnel should evacuate the building immediately.  
Attention all convicts, please stay where you are and try not panic. The Justice Department will re-arrest you shortly. 
Caution, power must be restored before security systems regain functionality.  For Grud's sake somebody get that power back on!
Rioting prisoners are reminded that offences committed during their stay at the Nixon Penitentiary are subject to twice the usual sentence after re-arrest. 
Can all non-essential personnel please make their way to Iso Block Control for prisoner recapture.
All units! It's taking a little longer than expected to bring the sentry guns online! Stand fast, we're doing everything we can!
ALL UNITS! ALL UNITS! There is a full-scale riot underway in H-Block! We need backup NOW!
Welcome to Resyk! Making good use of expired citizens since 2096!
This is the Resyk General Manager speaking. This is not the first time the dead have walked at this facility. The dead rise, the dead fall; Resyk carries on regardless.
Attention, patrons! The Smokatorium is legally obliged to remind you that tobacco is very, very bad for your health. But that nicotine sure is a rush, huh?  
Attention, patrons! There is a Dark Judge loose within the Smokatorium! Smoke 'em if you got 'em!  
The Mega-City Smokatorium welcomes the legendary Judge Dredd to the premises. While you're here Dredd, how about a Chokin' Monkee on the house?
Whoah! Who turned on the sprinklers? Janice, get out there and see what's going on! Janice? Hey! Who barbecued my PA?
Emergency lighting activated.
Need a loan? Here at Mega City Central Bank we accept any major body part as collateral. warning your body parts may be at risk if you do not keep up with repayments.  
Hey Juves. Are your parents criminals? Inform on them and win an exciting new Hoverbike!
Attention juves! Buddies been stealing candy? Inform on them and you could win an exciting new Justice Pack!
New from the Justice Department! Food types A, B and C. If it's good enough for a Judge, it's good enough for you.
The Justice Department accepts no responsibility for injuries sustained during the arrest process.
Grot Pot. With a snack this delicious, who needs nutritional value? Warning: may cause death.
Munce Gum. The taste just won't go away! 
Smart Sweets. You gotta be dumb to buy 'em!
Soy Cola. So sweet, it might just kill you! 
Synthi-Food. Who cares about the ingredients? It sure tastes good!
Justice Department regulations keep the alcohol content of Good Luck Beer to a minimum. So if you're planning to get drunk, good luck!
Life sucks, so why not lose yourself in fantasy? Watch Tr-D.
Brit-Cit, where outdated tradition reigns triumphant!
The all-new Cursed Earth Resort. Enjoy the dramatic nuke-blasted vistas! Muties? What muties?
Pretty blue eyes? Beautiful cheekbones? Otto Sump's Ugly Clinic can change all that. You want Ugly? Otto Sump can get you ugly.
There's no way to land around here - it's just too tight. Heading north to the Juno Business Plaza. We'll have to pick you up there.
Dredd!  We've managed to touch down but you'd better hurry!  We're being attacked.. Death Cultists.. we'll hold for a minute but there's too many. GRUDAMMIT DREDD JUST MOVE IT!
Dredd, we're leaving! Get on that upper level for pickup - it's too dangerous on the ground!
You're gonna have to jump!
Do it NOW!
Dredd, Hershey's asking for you.
Control to Dredd! The Psi-Judges are getting a strong signal from the Nixon Penitentiary - where the Dark Judges are held!
Control to Dredd. You're approaching the position where the Psi's disappeared.  
Dredd!  We've got trouble!  Judge Mortis has surfaced at the Clooney Hospital! Get to the H-Wagon ASAP!
Dredd, one of the Dark Judges has been located in the Emergency Room. Take the elevator from reception.
Dredd, try to get Mortis into the Quarantine room without destroying his body and releasing his ethereal form. We'll seal it remotely once he's inside.
Careful Dredd! Don't destroy his body!  
Remember, Dredd: Mortis is afraid of fire.
Dredd! If you don't put out that fire, everybody in the Smokatorium will be burned to a crisp!
Find another way in, Dredd!
If you can switch the sprinkler system on, you will force Fire to go up a level.
Try switching the fan on.
Dredd, there's a strange portal here - it looks like Deadworld is spilling through it!
More vampires.
Where is Icarus?
Open the doors.
Drokk!
Control, I've trapped Judge Fear in the Egyptian vault of the metropolitan museum.  Roger that.
Anderson must have gone through!  Drokk!
In a bizarre turn of events all the members of  the Skeleton Chapter of Mega-City One's ever-expanding Death Cult have ended their lives as a part of the city's largest ever Suicide Pact. Seems those crazy cult members just couldn't wait for the recently-escaped Dark Judges to bring about the end of the world. Didn't anybody ever tell them patience is a virtue?
This is Mega-City News speaking to the legendary Judge Dredd himself. Dredd, there's a lot of talk about the somewhat oppressive nature of the Mega-City One justice system. Any comment?
This is the Mega-City news with an important bulletin. The Dark Judges have escaped from the Nixon Penitentiary and are currently at large on the streets of Mega-City One. It was almost five years ago that the Big-Meg was last terrorised by the Dark Judges: Fire, Fear, Mortis and their leader, Judge Death. For the dark Judges life itself is the ultimate crime and death the only available sentence. This is the Mega-City new wishing you pleasant and restful nights' sleep.
It's Fluffy, darling, he's.. he's dead! There there folks. Dr Dick Icarus? Fluffy? He's alive! But how? PET REGEN will bring your pets back to life!  Available now: PET REGEN, because they're worth it, Dial 555-REGEN!
It's Fluffy, darling, he's dead! I'm here for Fluffy! Dr Dick Icarus? Fluffy? He's Alive! But how? It's all thanks to this: PET REGEN will bring your pets back to life! Dial 555-REGEN and resurrect your pet now! PET REGEN, because they're worth it, available now!
I can feel your fear, Dredd!  Come to me. Face me and know true justice in death!
We will bring justice to Mega-City One!  Already Deadworld begins to merge with this dimension!
Dredd, this is Control. We've managed to boost the signal so we should be able to communicate from now on..
Judge Fear is hiding in the remains of old New York's Metropolitan Museum. Get there, fast! 
Dredd, use Action to tell Bellis to follow you.
Dredd, get to the elevator. 
This is your Grenade counter which shows you how many Stumm Gas grenades you have.
This shows how many magazines you have. Each time your Ammo Bar drops to zero, a magazine will be used to refill it, if you have any.
Notice how the gun you are using is highlighted in the top right corner.
The Ammo Bar on your right will go down every time you fire your weapon.
If you have any magazines left, they will recharge your bullet bar when you run out.
Take your Lawgiver Mark III.
This is the new Lawgiver Mark III - Why don't you give it a try Dredd?
Now go to the firing range and shoot the target using your standard bullets.
You can always use AIM to help.
Now change your ammo type until you get the ricochet bullets.
Keep changing your ammo until you get back to ricochet.
Remember the Lawgiver Mark III has 6 different ammo types.
Now pick up the Arbitrator shotgun.
Return to the firing range and shoot the target with the Arbitrator shotgun.
The Arbitrator is better at close range, so wait until your target is close to you.
Go over to the table to get the Lawrod Rifle.
Switch the Arbitrator shotgun for the Lawrod Rifle using Action.
Remember that you can only change your second weapon.
You can't drop your Lawgiver Mark III.
Switch your ammo type to single shot and zoom in on your target.
Now its time to test your skills Dredd.
Find the hostage.
Good, now tell her to come with you to the safety area.
Rescue the hostage from the perps.
Follow the blue marker point on your screen.
You need the hostage with you.
Nice Job Dredd, you've completed the training course.
Control to all available units. Bank robbery in Progress at Bolland Plaza.
Dredd, we've just lost contact with the chamber where the Dark Judges are being held. Get over there, fast!
Dredd, Psi-Division are getting strong signals from the Dark Judges holding chamber. Something's wrong.
Dredd, looks like you've stumbled across the headquarters of the Death Cult! Proceed with caution!
The dead have risen and are laying waste to the Ryder Mega Mall. Odds on Judge Death has something to do with this.
Dredd, what are you doing? There are survivors waiting to be rescued back in there!
You blew it, Dredd! There were innocent civilians counting on you!
Dredd, the labs are gonna blow.  Get outta there.
That elevator's not going anywhere, Dredd! Find another way out.
Hurry Dredd! You need to find the computer mainframe that controls the elevator!
Dredd, one of the local gangs is holding an innocent citizen prisoner! 
Judge Goodwin needs back-up. He's close to your location. 
Dredd, one of the Dark Judges has been located in the Emergency Room. Take the elevator from reception.
Dredd, get the survivors to the quarantine rooms!
Dredd, get those patients outta there!
The patients are dead, Dredd! What's wrong with you? 
Dredd, you MUST rescue the patients!
Dredd, get the patients out first. Before you release the gas!
Try releasing the sterilising gas - that might scare Mortis off.
Good job,  Dredd. The patients are secure. But you still have to get Mortis out of the Emergency Room. Try releasing the sterilising gas, it might just scare him off.
Dredd, there are still patients inside the hospital. Find them and take them to a quarantine room.
Judge Mortis is up in the Emergency Room. The elevator will take you there!
You still have to deal with Mortis. 
Watch it, Dredd! If you destroy his body, Mortis will escape in ethereal form.
Check your fire, Dredd!
We have to keep Mortis' body intact.
Don't destroy Mortis' body.
Dredd, try to force Mortis toward the quarantine room.
Try releasing the gas, Dredd! It might force Mortis away from the patients.
It's working, Dredd! Activate the gas release valves! It should force Mortis closer to the quarantine room.
Get those sprinklers working, Dredd!
Dredd, get that water on!
Watch yourself, Dredd! Psi-Division's getting some strong signals from your location.
Dredd! We have confirmation from one of the survivors. Judge Death is in the building!
Bad news, Dredd! Judge Death has taken control of the undead creatures. Stay on your guard.
Careful, Dredd! You're approaching the position where Death was last sighted!
Dredd, you gotta keep moving - find Judge Death.
Our sensors indicate you're getting close to Death.
Careful Dredd, Death is near.
Move it Dredd, find Judge Death before he kills everyone!
Activate the computer console Dredd.
More vampires.
Where is Icarus?
Open the doors.
Drokk!
Control, I've trapped Judge Fear in the Egyptian vault of the metropolitan museum.  Roger that.
Anderson must have gone through!  Drokk!
I'll miss the Mark II..
If only patrolling the streets were as easy as this training..
Brings me back to my cadet days
They called me in for this?
Drokk, my path is blocked
Bleeding heart liberals..
Time to dispense some justice.
In this city, justice comes at a price. That price is freedom.
Make way for the law!
You! Scrawler! Put down the aerosol!
I love the smell of justice in the morning.
Just goes to show that crime doesn't pay.
Where did these beasts come from?
You picked the wrong day for a robbery.
Copy that, Control.  On my way.
I'll be the judge of that!
Vampire scum!
I'll see you in hell!
Only good perp is a caged perp.
The Dark Judges, huh?
Thought I'd seen the last of them.
Drokk! The Dark Judges! 
I don't like the sound of this.
Control, what's the situation on the Dark Judges?
Drokk, what about the Dark Judges?
You're all going back inside!
Where's that artillery support, Control? I need those sentry guns working NOW!
Your choice, perp.  I'll pack your corpse into a Resyk Crate myself.
It's the cubes or Resyk. Your choice.
Laugh it up, perp.
I'm coming for you.
You wanna die, Necrus? I can make it happen.
Time to take out the trash..
Not in this lifetime, creep!
If he gives the Dark Judges physical form, Necrus will pay!
Grud! I may not make it in time!
Eat lead!
I'll give these Death Cultists exactly what they want..
Zombies, eh?
Living or dead.. justice will be served.
This rampant consumerism makes my skin crawl.
You picked the wrong day to go shopping, creep!
All in a day's work, citizen.
Comes with badge, ma'am.
Copy that. I'm going in.
Reminds me of my nursery..
The plot thickens..
More evidence..
Icarus has gone too far!
Computer, I'm shutting you down!
Icarus is a mad-man!
Drokk! Icarus' body has gone!
Drokk! Where has Icarus' body gone?
This place is gonna blow!
I'm getting out of here!
The place is crumbling around me!
What kind of sick operation is this?
I won't be getting my check up here.
Dammit, the elevator's been deactivated!
All in a day's work, old man. Now, I need your help.
Thank you, citizen. I advise you stay away from this sector from now on.
Glad to be of assistance Goodwin.
Watch it Goodwin!
I'll cover you Goodwin.
Piece of cake.
This is MY city, perps!
I make the rules!
Time to face the law!
I'm bringing Justice to this Grud-forsaken sector!
Understood, proceeding as advised.
That's a shot in the arm.
You'll be safe here.
Stay here until help arrives.
Wait here for the rescue team.
Stay here and keep out of sight.
Wise up, robot. Smoking is a filthy habit.
Wise up, citizen. Smoking is a filthy habit.
Drokk! The door won't open!
That's my intention, Control. Dredd out.
Smells bad!
Zombie freak!
You came to the right place, vampire!
You're going straight to the re-processing plant!
I'm coming for you, Judge Death!
Living or dead, a perp is a perp!
This time you're going away for keeps!
Judge Fear! Don't worry creep, you're on my list.
You're gonna wish you stayed locked up, Fear!
Keep talking, creep. You'll be back in the Penitentiary before you know it!
Control, this is Dredd. Control? Drokk! No signal down here!
Drokk! This thing is invulnerable!
Seems to be drawing its power from the Psi-Judges.
Go help Anderson! I'll distract Judge Death.
Just one more.
You're free.
Welcome, Dredddd. To DEADWORLD!
Fassssster, Dredddd.. Every sssssstep brings you closssssser to your doom!
Come to meeee.. Ssssseal your fate!
I'm waiting, Dredddd!
Looks like the Dark Judges have taken physical form. They'll be at the height of their powers now.
I'm afraid they'll have to wait, Dredd. There's trouble at the Ryder Mega-Mall! We need you there, ASAP!
Dredd, this is Control. Now, why don't you help Tek Judge Bellis?
You fought the law and the law won.
Justice is served.
You're messing with the department's finest, creep!
Acknowledged.
I'm going in.
Copy that, Control.
Affirmative, Control.
Roger that.
No problem.
I AM the law!
DOUBLE TIME!
Can do, Control!
I've got a bad feeling about this.
I'll be the judge of that.
Fooool!  You cannot ssssstop me now!
Give up Dredd!  Ssssssoon Mega-City One will be judged!
You have already lossssst!
Understood, Control.
Gonna need a Meat-Wagon down here!
Proceeding with caution.
Stomm!
En route now.
On my way.
```

### Scripted Quotes

Easier to read format: [Pastebin](https://pastebin.com/raw/FshdAfX3)
Not quite sure why they're in the `./Misc/l_text/scripted/s_En.asr` file/folder, doesn't make sense, it seems like just random dialogue from NPCs but:

```
It wasn't me
You'll never get me, jay.
I'll blow you away, lawman.
I'm coming to get you!
You're dead, Dredd.
Ow!
You're damaging my circuits!
Does not compute!
Morning, Dredd. Here's the new Mark 3 Lawgiver. See how she handles.
OK Dredd, try shooting these targets.
Excellent!
Great!
Not bad Dredd, but not perfect. Try again.
Nope.
Hmm, let's try that again.
Your synapses are all over the place, Dredd.
Did you do a double shift yesterday or something?
Hey, don't shoot me!
Now switch to armour piercing.
That's the wrong ammo type!
Change your ammo type!
Now try Heat-Seeker!
Check out Ricochet. Just be careful you don't get hit by the rebound!
Ok, now try using the zoom function.
Select a weapon Dredd.
You can practice with any of these.
Have you tried the Stumm Grenade yet?
Morning Dredd.
How are you today, sir?
You are requested to go to the Procedures room.
How about we run through arresting procedures?
Time to refresh your skills Dredd.
Arrest that Robot!
Walk up to it.
Try shooting the gun out of its hand! 
Press the Challenge Button.
Now press the Arrest Button.
Get closer to it!
Perfect!
If only arresting perps was that easy, eh Dredd!
Dredd, don't damage the robot!
Dredd, don't damage the robot!
The exit's over there.
Cool!
Nice!
Power to the people!
Down with the law! 
Referendum now!
Democracy in! Judges out! 
Our city - our rules!   
Every time you succesfully arrest someone, your lawmeter goes up.
I wander what happens when your lawmeter reaches maximum?
If you kill an innocent civilian, your lawmeter will go down.
The SJS will come get you if your lawmeter drops too low, Dredd.
Dredd, Hershey wants you to arrest anyone scrawling graffitti outside the Halls of Justice, to set an example.
You will all be judged! 
Death to everyone. 
Every time you arrest one of us, three more are ready to take their place. 
Death Lives!
Our day will come. Sooner than you think, you'll see..
You just got yourself 3 months for incitement to riot.
Control, I got another Death Cult nutcase for the cubes. Seems to be more of them around these days..
Dredd, Mega City Bank is being robbed! Get over there straight away.
Stop messing around and get to the bank!
Its Dredd!
Drokk!
Ladies and gentlemen, this is a robbery. Put your hands in the air like you just don't care! Roco, get the money.
Everyone out! Run!
Quick! Move it!
Aaaaaargh! Vampires!
Help!
Help!
W-w-what was that thing? 
B-b-but there's no such thing as vampires!
Vampires!
The crash destroyed the main elevator. Use the backup.
Help, there's too many of them!
It's chaos up there.
Dredd!  Thank Grud you're here.
The security system has gone haywire!  It'll have to be overridden before the gates and sentry guns come back online!
Dredd!  There must have been a hundred vampires packed into that H-Wagon!  They're slaughtering us!  
This could be that plague the PSI-Division Judges have been talking about.
We need help capturing the escaped perps!
Mean Machine is loose and on the rampage!
It's Dredd!  
Stop him!  
He must not interfere!
You're too late Dredd! The Dark Judges are reborn!
These things just don't die!
Behind you!
All the functioning fire doors are sealed shut - but there are still one or two routes through. It's like some kind of horror vid-slug there!  The survivors don't stand a chance!
Somebody help us!
We're trapped in here!
Help me! I don't wanna die!
 A Judge! Thank Grud!
It's Dredd, he'll save us!
Somebody help us!
We're trapped in here!
Help me! Help me! I don't wanna die!
Sick! They're eating their victims!
 A Judge! Thank Grud!
It's Dredd, he'll save us!
This is a restricted area. I'm afraid I cannot allow admittance.
There he is!
Get him!
Cut him off!
You're dead, Dredd!
There he is!
Get him!
Cut him off!
You're dead, Dredd!
Please! No!
Don't hurt me!
I'm ill already!
Please! No!
Don't hurt me!
I'm ill already!
No mercy for the living!
Accept your righteous judgement. 
The touch of Mortis brings decay!
Come closssser, Dredd!
Good day sir. Can I interest you in a fine Sov Block import tobacco?
The door is broken! Help! Let me out of here!
We've got most of the workers out but there are some still blockaded inside.
The corpses keep getting up and walking around!
Thank Grud!  You came just in time!  There are more of our guys trapped deeper in the facility! Here's the security pass you'll need.
H-he killed the others!  Just reached into their chests and killed them!  Judge Death!
Fooool!  You cannot ssssstop me now!
Give up Dredd!  Ssssssoon Mega-City One will be judged!
You have already lossssst!
Here, have my security pass - you need it more than me!
Wwhat's going on?
Dredd, help!
Zombies!
Vampires!
Help us!
Save us!
This is like some kind of nightmare!
Help!
Save me!
Thank Grud!
A Judge!
Thank Grud it's Dredd!
You just missed Death.
Death was here.. he.. killed.. everyone..
I hid from Judge Death, but what if he comes back?
A Dark Judge, killing everyone!
It's Judge Death! He's here! 
He's controlling the zombies!
Get out while you still can!
Fool!  This will not hold me long!
Dredd, there's a strange portal here - it looks like Deadworld is spilling through it!
You've despatched my Lieutenants, but it doesn't matter. They will soon be free again when we come back, and you will be dead - sinner!
You will not be able to stop usssssss!
Cover us!  Keep Death busy until we can release Anderson!
Release the others!  Together we can free Anderson!
Thank Grud!
Morning Dredd, glad you could make it for reorientation.
Let's head over to the Lecture Hall.
Ok Dredd, lets see you get to the other side of this room by jumping and crouching.
You need to jump here.
You need to crouch here.
You'll need to jump onto the box, then crouch under the barrier.
Well done Dredd.
See you around.
Later.
Just started your shift?
You hear those rumours from Psi-Division?
Full Eagle day, huh? Don't worry, kid, we all get a little nervous at graduation. Before you know it, you'll be taking the Long Walk into the Cursed Earth.
This is your Health Meter showing you how much health you have. If it drops to zero, you will die.
Your shield will protect you from occasional hits, but it can't stand up to sustained fire. If it drops, try to stay out of fire for a few seconds, so that it can recharge. 
Medi-paks automatically fully recharge your health bar when it becomes empty.
The Law Meter shows how well you are doing as a Judge. As you arrest perps and complete objectives, this meter will increase.
If you kill innocents or perps who have surrendered it will go down.
Be careful - if it drops to zero, the Special Judicial Squad will come for you.
Head over to the jump course, it's just round the corner.
Morning Dredd.
How about we run through arresting procedures?
Arrest that Robot!
Walk up to it.
Press Challenge.
Now press Action.
Get closer to it.
Perfect! Now if only arresting perps was that easy, Dredd.
Hi Dredd, Judge Bellis here.
You're going to show me where the elevator is, I believe?
Do you know where the elevator is?
Take me to the elevator Dredd.
What do you mean you don't believe me? I swear, man, it was a vampire. Fangs, claws, the works..
I'm sick of those drokking Judges. Especially Dredd - he's the worst of 'em.  Ssshhh, here he comes..
Stomm Jimmy, I should'n'ta had that last Munce Burger. I don't know what's in those things, but it wants out - and fast. Where's the nearest restroom?
No more tyranny!
People of Mega-City One! Join hands! Start a love train!
Judges out! Democracy in!
One citizen! One vote!
What do we want? DEMOCRACY!
When do we want it? NOW!
True justice for all!
No more tyranny!
People of Mega-City One! Join hands! Start a love train!
Judges out! Democracy in!
One citizen! One vote!
What do we want? DEMOCRACY!
When do we want it? NOW!
True justice for all!
I'm glad the Justice Department has those Dark Judges holed up at the penitentiary. Grud only knows what'd happen if they got loose.
I'm glad the Justice Department has those Dark Judges holed up at the penitentiary. Grud only knows what'd happen if they got loose.
Those death cult freaks give me the creeps, man.
Sometimes I think these demonstrators have a point. Then I remember that deep down every citizen is a perp just waiting for an opportunity.
Let's get outta here!
Freedom!
I'll take vampires over Judges anyday!
Bring it on, Judges!
I ain't going to back to the cubes alive.
Let's get outta here!
Freedom!
I'll take vampires over Judges anyday!
Bring it on, Judges!
I ain't going to back to the cubes alive.
Look, it's Dredd!
Hey, Dredd! EAT ME!
Let's get outta here!
Freedom!
I'll take vampires over Judges anyday!
Bring it on, Judges!
I ain't going to back to the cubes alive.
Look, it's Dredd!
Hey, Dredd! EAT ME!
Access to the guard quarters is blocked, Dredd. There's vampires everywhere!
Dredd, If you want to get inside the main holding area, you're gonna have to fight your way to the override panel on the walkway between the guards' quarters.
Dredd, over here! I have a key card to the computer room. But I'm not gonna make it alone! 
The card, it-it's not working! Dredd! Cover me while I figure this out.
Access to the guard quarters is blocked, Dredd. There's vampires everywhere!
You killed Necrus!
You killed our High Priest! 
My wife just doesn't understand me. I mean, we worship Death and look forward to the day when all life is extinguished from the universe. What's not to understand?
You killed Necrus!
You killed our High Priest! 
Attention, perpetrators! This is the Justice Department. You are ordered to lay down your weapons and surrender immediately.
Give it up, lawbreakers! The sooner your sentence begins, the sooner you will be free to live a lawful existence on the streets of Mega-City One.
It's Dredd! We're saved!
Okay.
Let's get out of here!
Don't leave me!
You're my hero!
This is my number, call me!
Save me!
I don't wanna die!
You took your time, Judge.
Dredd! Thank Grud!
I'm right behind you.
Lead the way!
What about those creatures?
I'm scared!
It's not true what they say about you.
You're a good man, Dredd.
You took your time, Judge.
I thought I was going to die in this consumerist hellhole.
I'm right behind you.
Lead the way!
Don't leave me!
Did I do something wrong?
It's not true what they say about you.
Thank Grud for the Justice Department.
I'm too young to die
The Justice Department! At last!
Okay.
Are you sure?
What about those creatures?
You're a good man, Dredd.
Thanks, Dredd!
Its true, man, the best things in life ARE free.
Free stuff.. my favourite!
Christmas came early to the Big Meg this year.
Its true, man, the best things in life ARE free.
Free stuff.. my favourite!
Christmas came early to the Big Meg this year.
Poor Rodders, 'e came 'ere to buy 'is first pair of skin-tight zipper pants. And now look at the poor blighter!
Okay, Dredd. I'll take the survivors from here.
Great job, Dredd.
Those citizens owe you their lives.
Dredd, we've got more survivors trapped in there!
The boys from Tek division have opened up the doors to the main hub. Let's move!
Control, we're being overrun. Send help now!
Get me some backup, NOW!
Dredd! We're about to open the gate, but we don't know what's on the other side!
Okay, Dredd. I'll take the survivors from here.
The vampires have escaped!
Who released the seals on the containment chambers?
I've tried paging Icarus, but he's not responding!
The serum is much more powerful than I'd dared to imagine!
Somebody get the keys to the gun cabinet!
Help!
Somebody, help!
We're all going to die in here!
D-Dredd, I never thought I'd be glad to see YOU! Icarus has gone crazy! We need to get to Lab 3 before it's too late!
Icarus has gone crazy!
We need to get to Lab 3 before it's too late!
Good Morning Sir!
Dr. Icarus has ordered the facility closed to all visitors.
Thanks for saving my tail back there, Judge!
Thought my goose was cooked!
Pretty girls, but they had a mean attitude!
Come with me! I can get that elevator going, no problem!
There! Good as gosh darn new!
Sure will, son. And thanks again!
Whoah!
Ow!
AaaaRGH!
Don't shoot me!
Shoot the bad guys, Dredd!
Wh-whatever you say..
What'd I do wrong?
Let's head out to the H-wagon!
Lets move Dredd - to the Juno Plaza!
I'd appreciate your company..
It's just a bit further to go..
We're nearly there!
Cover me!
Help me, Gruddammit!
Nice One Dredd!
Thanks for that.
Aargh!
Aaaargh!
What are you doing Dredd?
Ok. Let's go.
What took you?
Come on Dredd, let's go.
Teamwork!
We made it!
Stop shooting at me!
Dredd, there's a Dark Judge up here!
It's Judge Mortis!
He's killing everyone!
Save us, Dredd!
It's Dredd!
Bless my lungs, it's a Judge!
Thank Grud!
We're trapped!
What are we going to do?
Dredd, help us!
It's Judge Fire!
Isn't he supposed to locked away?
I don't wanna die.
Grud help us.
He's flaming crazy!
Maybe we should offer him a smoke!
What I wouldn't give for a choking monkee.
Ahh, i ran out of monkees!
Dammit, Larry.. You went and smoked my last monkee!
I'm outta Chokes.
Was that guy on fire?
Have you got a light?
Talk about the perils of smoking..
I'll never smoke again.
Dammit, these are new threads!
Hey! I'm smoking here!
Here comes the rain.
Is this absolutely necessary?
Man, I'm slippery when wet!
Come closssser, Dredd!
I'll ssssssend you to oblivion!
Gaaasssss!
Cursssse you Dredd!
A plague on you, Dreddddd!
You'll never get these pathetic mortals out alive.
You're finished, Dredd!
You're all going to DIE!
Pathetic humans!
I'm sorry, I'm unable to serve you whilst there is a deranged extra-dimensional killer on the loose.
Thought we'd dealt with the Dark Judges once and for all.
Gonna be a tough job bringing this creep in.
Gotta say I'm a little nervous about this one.
This is no ordinary perp.
Thought we'd dealt with the Dark Judges once and for all.
Gonna be a tough job bringing this creep in.
Gotta say I'm a little nervous about this one.
This is no ordinary perp.
Nice work, Dredd. I'm proud to serve with you. 
Dredd! Don't worry, we smashed up the door activation panel. Now those zombie freaks are trapped downstairs and we can smoke in peace!
It's Dredd!
Bless my lungs, it's a Judge!
Thank Grud!
We're trapped!
What are we going to do?
Dredd, help us!
It's Judge Fire!
Isn't he supposed to locked away?
I don't wanna die.
Grud help us.
He sure is angry about something!
What I wouldn't give for a choking monkee.
Ahh, i ran out of monkees!
Dammit, Larry.. You went and smoked my last monkee!
I'm outta Chokes.
Was that guy on fire?
Have you got a light?
Talk about the perils of smoking..
I'll never smoke again
Dammit, these are new threads!
Hey! I'm smoking here!
Here comes the rain.
Is this absolutely necessary?
Man, I'm slippery when wet!
Help!
I'm too young to die!
Oh, the humanity!
It's Dredd!
Bless my lungs, it's a Judge!
Thank Grud!
We're trapped!
What are we going to do?
Dredd, help us!
It's Judge Fire!
Isn't he supposed to locked away?
I don't wanna die.
Grud help us.
He sure is angry about something!
What i wouldn't give for a choking monkee.
Ahh, i ran out of monkees!
Dammit, Larry.. You went and smoked my last monkee!
I'm outta Chokes.
Was that guy on fire?
Have you got a light?
Talk about the perils of smoking..
I'll never smoke again.
Dammit, these are new threads!
Hey! I'm smoking here!
Here comes the rain.
Is this absolutely necessary?
Man, I'm slippery when wet!
I'm too young to die!
Oh, the humanity!
It's Dredd!
Bless my lungs, it's a Judge!
Thank Grud!
We're trapped!
What are we going to do?
Dredd, help us!
It's Judge Fire!
Isn't he supposed to locked away?
I don't wanna die.
Grud help us.
He sure is angry about something!
What i wouldn't give for a choking monkee.
Ahh, i ran out of monkees!
Dammit, Larry.. You went and smoked my last monkee!
I'm outta Chokes.
Was that guy on fire?
Have you got a light?
Talk about the perils of smoking..
I'll never smoke again.
Dammit, these are new threads!
Hey! I'm smoking here!
Here comes the rain.
Is this absolutely necessary?
Man, I'm slippery when wet!
It's Dredd!
Bless my lungs, it's a Judge!
Thank Grud!
We're trapped!
What are we going to do?
Dredd, help us!
It's Judge Fire!
Isn't he supposed to locked away?
I don't wanna die.
Grud help us.
He sure is angry about something!
He's flaming crazy!
Maybe we should offer him a smoke!
What I wouldn't give for a choking monkee.
Ahh, i ran out of monkees!
Dammit, Larry.. You went and smoked my last monkee!
I'm outta Chokes.
Was that guy on fire?
Have you got a light?
Talk about the perils of smoking..
I'll never smoke again
Dammit, these are new threads!
Hey! I'm smoking here!
Here comes the rain.
Is this absolutely necessary?
Man, I'm slippery when wet!
When can we eat?
It's Dredd!
Bless my lungs, it's a Judge!
Thank Grud!
We're trapped!
What are we going to do?
Dredd, help us!
It's Judge Fire!
Isn't he supposed to locked away?
I don't wanna die.
Grud help us.
He sure is angry about something!
He's flaming crazy!
Maybe we should offer him a smoke!
What I wouldn't give for a choking monkee.
Ahh, i ran out of monkees!
Dammit, Larry.. You went and smoked my last monkee!
I'm outta Chokes
Was that guy on fire?
Have you got a light?
Talk about the perils of smoking..
I'll never smoke again
Dammit, these are new threads!
Hey! I'm smoking here!
Here comes the rain.
Is this absolutely necessary?
Man, I'm slippery when wet!
When can we eat?
Dreddddd! Welcome to the party, old friend!
Mega-City One will burn!
Come, Dreddd! It's better to burn out than fade away!
I'll fry you to a crisp!
I'll melt this entire city to its foundations!
Aaaaargh!
Water!
Get it off me!
How dare you!
Help! Let me out of here! The door is broken and the building has been overrun with Undead!  HELP!
Anything I can help you with, sir?
I tried serving that fire-based gentlemen, but he didn't seem to require my assistance.
This water is short-circuiting my mainframe..
These sprinklers are playing havoc with my system!
Face your fear, Dredd!
Die, ssssinnner!
Gaze upon the face of FEAR!
How dare you!
I'm coming for you Dredd!
I'll kill you where you stand!
I'm waiting, Dreddd! 
Are you afraid to face me?
Come, Dreddd! Judgement is nigh!
Oooohh.. that ticklesssss.
Issss that the best you can doooo?
This is it, Dreddd! Time to die!
I'll desssstroy you!
I'll destroy ALL OF YOU!
I'm going to kill you ssssssssslowly..
I'm more powerfffull that ever beffffore!
Cursssssse you, Dreddd!
Welcome, Dredddd. To DEADWORLD!
Fassssster, Dredddd.. Every sssssstep brings you closssssser to your doom!
Come to meeee.. Ssssseal your fate!
I'm waiting, Dredddd!
I'm indestructible.
Your puny weapons cannot harm me!
Deatthhh is almosssst upon yoouuu!
Nice work, Joe.
Thanks, Dredd!
..my head..
Help the others.
Quickly! Free the others!
Thanks, Dredd!
..my head..
Help the others.
Quickly! Free the others!
It's Dredd!
Was that guy on fire?
Is this absolutely necessary?
Ahh, i ran out of monkees!
Hey! I'm smoking here!
Here comes the rain.
Man, I'm slippery when wet!
It's Dredd!
Isn't he supposed to locked away?
Dammit, Larry.. You went and smoked my last monkee!
Man, I'm slippery when wet!
It's Judge Fire!
He sure is angry about something!
Dammit, these are new slacks!
Have you got a light?
Maybe we should offer him a smoke!
When can we eat?
You're going to feel a slight prick..
There.
Feels better already, huh?
Try to stay out of trouble.
It's only a flesh wound..
Dredd, thank Grud! I could do with some help! Let's get outta here!
Monsters everywhere!
You took your time, Judge.
I thought I was going to die in this consumerist hellhole.
Dredd! Thank Grud!
The Justice Department! At last!
I'm right behind you.
Lead the way!
Are you sure?
Did I do something wrong?
What about those creatures?
I'm scared!
It's not true what they say about you.
You're a good man, Dredd.
Thank Grud for the Justice Department.
Thanks, Dredd!
Vampires! Zombies!
Zombies tried to eat my brain!
Dredd! Thank Grud!
A Judge!
Help!
It's Dredd! We're saved!
I thought I was going to die in this consumerist hellhole.
I'm too young to die
The Justice Department! At last!
Okay.
Let's get out of here!
Don't leave me!
Are you sure?
Did I do something wrong?
Thank Grud for the Justice Department.
Thanks, Dredd!
You're my hero!
Vampires! Zombies!
Zombies tried to eat my brain!
Dredd! Thank Grud!
Save me!
A Judge!
Okay.
Let's get out of here!
I'm right behind you.
Are you sure?
What about those creatures?
You're a good man, Dredd.
Vampires! Zombies!
Dredd! Thank Grud!
Save me!
A Judge!
Help!
I don't wanna die!
Monsters everywhere!
Let's get out of here!
I'm right behind you.
Did I do something wrong?
It's not true what they say about you.
Thank Grud for the Justice Department.
Dredd! Thank Grud!
A Judge!
Help!
I don't wanna die!
Monsters everywhere!
```

### Character/AI Names

Located at `./Misc/l_text/names/n_En.asr`

```
Aardvark
Allele
Alphabet
Ameryk
Angel
Apelino
Armitage
Assengai
Bach
Bagley
Bailey
Beeny
Bethann
Boland
Chezner
Colon
Conn
Cool
Coran
Cufflink
Cusack
Daly
Davis
Davitchek
Dekker
Delany
Dempsey
Derryson
Devine
Devlin
Dubinski
Dupre
Ezquerra
Fallon
Fargo
Farin
Fatt
Flapper
Florist
Floyer-Lea
Gaffney
Gai
Gibber
Gink
Gizzard
Gjetost
Gravel
Grunter
Gunderson
Haggard
Hermetic
Hickey
Higgins
Hogan
Jacobi
Jara
Jones
Jordan
Jubbly
Kamun
Floyd
Kidd
Kingo
Kiss
Lacy
McGruder
McJelly
McRabbit
McStodge
Monkey
Moonie
Motility
Mott
Mozart
Normal
Paint
Parry
Potato
Prokofiev
Qliq
Quiver
Riskit
Sander
Savage
Shoe
Slywalker
Smith
Snork
Starkiller
Sternbow
Stodgman
Stone
Strum
Suggs
Sump
Thorpe
Wagner
Wombat
Woolf
Zziiz
Africa
Ailsa
Akinesia
America
Andreana
Anna
Aouregan
Argantlon
Arzhela
Athol
Audrey
Avenie
Avril
Aziliz
Barbara
Battersea
Bella
Bleuzenn
Blondel
Bonnie
Bradana
Briaca
Britta
Candy
Carla
Cassandra
Cecilly
Charity
Chastity
Chelsea
Daracha
Davina
Dawn
Deirdre
Deniela
Dolly
Dot
Edana
Edith
Elara
Eleanor
Elspeth
Emily
Erika
Esmerelda
Euphemia
Evanna
Faith
Felicia
Fenalla
Fia
Fiamma
Franseza
Fulhama
Gaela
Giorsal
Glabella
Groby
Gwenn
Helena
Helori
Hope
Isobel
Janey
Jessica
Jillyjilly
Jo
Jockella
Johnella
Juliet
Kanna
Karestan
Katell
Kit
Laverne
Levenez
Lucy
Maria
Marlene
Medea
Mikaela
Missy
Nadia
Nelly
Nicola
Patrice
Petula
Queenie
Seva
Shea
Sissy
Sterenn
Sulgwenn
Tamsin
Trifin
Una
Vanilla
Vienna
Yootha
Zandra
Aaron
Alex
Amadeus
Arnold
Arranz
Arthur
Austell
Bedevere
Bert
Big
Bill
Bjorn
Bob
Bubb
Caswyn
Charley
Chezney
Chris
Clesek
Colan
Conred
Coolray
Costentyn
Cuilliok
Daveth
David
Derek
Dino
Drew
Ed
Elmer
Ernest
Errol
Eustace
Fink
Gawain
Giro
Glastenen
Golvan
Grunt
Gwynek
Hicca
Irwin
Jacca
Jason
Jock
Joe
Johnny
Jose
Jowan
Jug
Junior
Kea
Kenzal
Kevin
Kwame
Link
Madron
Manly
Mark
Masek
Mawgan
Max
Meryn
Mike
Morgan
Nadelek
Neil
Nick
Norman
Oscar
Otto
Ozzie
Pa
Paddy
Podgy
Porthos
Previn
Quasimodo
Ray
Red
Richard
Romeo
Scroob
Selwyn
Sithny
Socrates
Steve
Talan
Tharg
Thor
Tim
Todd
Tom
Torquemada
Trevedic
Tristan
Uggie
Walter
Zachary
Babs
Baldy
Bermuda
Biggy
Bongo
Boring
Braindead
Bruiser
Bubbly
Canine
Carrot
Caveman
Chiggers
Chubby
Chump Dump
Cool
Cross Eyed
Cucumber
Diddy
Ding Dong
Dirty
Doc
Don
Fattie
Fidget
Fish
Footboy
Fragger
Fudge
Futsie
Giraffe
Grotpot
Hedgehog
Homey
Interesting
Itch
Jammy
Jelly
Jimp
Knife
Knuckles
Lizard
Lofty
Loser
Man-Mountain
Meek
Monkey
Moppet
Munce
Muscles
Mutie
Nance
Nasty
Normal
One Eye
Peeper
Perp
Razor
Redhead
Rhino
Shadow
Shakey
Shuggy
Silver
Slag
Slick
Slim
Slimey
Sneeky
Speedy
Tallboy
Tank
Tardy
The Belly
The Brat
The Dentist
The Geek
The Gimp
The Lobster
The Rat
The Scrawler
The Shark
The Simp
Titch
Trousers
Tuna
Two Time
Umpty
Zigzag
```




P.S. P.S: Here's a good [*political* **TAKE**](https://www.politics.co.uk/comment-analysis/2017/03/10/the-politics-of-judge-dredd) of Dredd :)