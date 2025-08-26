---
layout: post
title: The Spy Who Shrunk Me Info
---


**Contents**
* TOC
{:toc}


## Ranking System

All of the code for calculating your SpyScore is in the `SpyRankCalculator` class.
Your Spy Score™ is stored as a float in the game save;
When calculating the score, you start off with a default of 100 score (SSS).
The calculations follow this pattern:
  - Detected: -10 score
  - Kills: -10 score and -5 per each kill
  - Alarms: -10 score for each time an alarm is raised
  - Time: if it took you longer than the target time (discussed later), -5 score

Objectives are calculated a bit more indepth.
For each scene (level), it stores a counter of the "important" objectives (objectives which are shown on the mission report). Then this counter of important objectives (`num2`) is compared to the amount of important objectives that you actually completed (`num3`).
The math is then as follows:
```csharp
float num4 = (float)(num3 / num2);
score -= 40f * (1f - num4);
```
which means that the total score is decreased for each important objective that you do not do in the level. 
For example, if you do 5 objectives in a 10 objective level, you get `40 * (1 - (5 / 10)) = 20` subtracted from your score. When writing out the save data, it will save your best score out to the file.

### SpyScore Table

The value for your SpyScore string (S vs SSS vs F etc) is based off of the above calculations

| Value | Result |
|:-----:|:------:|
|  >99  |  SSS   |
|  >94  |   SS   |
|  >89  |   S    |
|  >74  |   A    |
|  >59  |   B    |
|  >44  |   C    |
|  <44  |   F    |


## Save Games
Save games are stored as JSON files in the default `persistentDataPath` (A Unity construct).
The persistentDataPath for this game is usually `%appdata%/../LocalLow/Catland/The Spy Who Shrunk Me`
It stores the collected collectibles in `collectibles.json`, difficulties in `difficulties.json`

Difficulties is saved as an array of integers (via `DifficultySerialization`), the integers represent the highest difficulty you have completed a given level on.
Collectibles are saved as a dictionary storing two different lists of data like so (it's not formatted at all, I just did that):
```json
{
  "hiddenCollectibleData":[
        5, 9, 2,
        0, 4, 1,
        7, 8, 3,
        6, 10
    ],
    "storyCollectibleData":[
        1, 2, 3,
        0, 4, 5,
        6, 7, 10,
        11, 12,8,
        9
    ]
}
```
Both collectible types are just enums and the respective values are like so:
```csharp
/* HiddenCollectible.cs */
public enum HiddenCollectible
{
  VHSTape = 0x00,
  DrinkingBird = 0x01,
  ComputerChip = 0x02,
  PortraitOfBolsco = 0x03,
  ShrinkSerumVial = 0x04,
  Slavda = 0x05,
  Mycop = 0x06,
  LeninStatue = 0x07,
  Snowglobe = 0x08,
  LaserPointer = 0x09,
  DiscoBall = 0x0A
}
/* StoryCollectible.cs */
public enum StoryCollectible
{
  ShrinkRay = 0x00,
  Banana = 0x01,
  AirbagMine = 0x02,
  Teleporter = 0x03,
  Stopwatch = 0x04,
  Spytacles = 0x05,
  EierkopfPurse = 0x06,
  EierkopfLetter = 0x07,
  EierkopfGoggles = 0x08,
  EierkopfCage = 0x09,
  Rocket = 0x0A,
  AudreyPacifist = 0x0B,
  AudreyGhost = 0x0C,
  AudreySuperspy = 0x0D
}
```
Your settings are also stored as a JSON file, nothing too interesting but I'll post an example:
```json
{
  "sensitivity": 1.0,
  "fieldOfView": 60.0,
  "language": "English",
  "resolutionWidth": 1366,
  "resolutionHeight": 768,
  "displayMode": 0,
  "display": 0,
  "vsync": false,
  "invertY": false,
  "crouchToggle": true,
  "detailLevel": 0,
  "vignette": false,
  "bloom": false,
  "ssao": false,
  "masterVolume": 100.0,
  "musicVolume": 25.0,
  "soundEffectsVolume": 40.0,
  "dialogueVolume": 40.0,
  "randomBanterVolume": 15.0
}
```
In actually interesting save data news, there's the `progess.json` file which stores all of your general progress (level scores etc):
```json
{
   "levelProgressData": [
      {
         "levelName": "TrainScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 130.9559,
         "bestScore": 100
      },
      {
         "levelName": "OfficeScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 3.43270421,
         "bestScore": 75
      },
      {
         "levelName": "OperationScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 37.00432,
         "bestScore": 85
      },
      {
         "levelName": "LabsScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 34.7402534,
         "bestScore": 65
      },
      {
         "levelName": "ArchivesScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 29.0812168,
         "bestScore": 75
      },
      {
         "levelName": "ArchivesBossScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 18.04723,
         "bestScore": 95
      },
      {
         "levelName": "LabsReduxScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 24.1406841,
         "bestScore": 100
      },
      {
         "levelName": "GeneralFatResidenceScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 13.262104,
         "bestScore": 65
      },
      {
         "levelName": "LabsWarehouseScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 22.2558136,
         "bestScore": 100
      },
      {
         "levelName": "RocketScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 0,
         "bestScore": 100
      },
      {
         "levelName": "CutsceneQuaternionIntro",
         "unlocked": true,
         "cleared": false,
         "ghostAchieved": false,
         "pacifistAchieved": false,
         "bestTime": 9999,
         "bestScore": 0
      },
      {
         "levelName": "CutsceneEndingBadForssa",
         "unlocked": true,
         "cleared": false,
         "ghostAchieved": false,
         "pacifistAchieved": false,
         "bestTime": 9999,
         "bestScore": 0
      },
      {
         "levelName": "CutsceneEndingGood",
         "unlocked": true,
         "cleared": false,
         "ghostAchieved": false,
         "pacifistAchieved": false,
         "bestTime": 9999,
         "bestScore": 0
      },
      {
         "levelName": "QuaternionScene",
         "unlocked": true,
         "cleared": true,
         "ghostAchieved": true,
         "pacifistAchieved": true,
         "bestTime": 148.543533,
         "bestScore": 75
      },
      {
         "levelName": "CutsceneQuaternionOutro",
         "unlocked": true,
         "cleared": false,
         "ghostAchieved": false,
         "pacifistAchieved": false,
         "bestTime": 9999,
         "bestScore": 0
      },
      {
         "levelName": "CutsceneEndingBadMoscow",
         "unlocked": true,
         "cleared": false,
         "ghostAchieved": false,
         "pacifistAchieved": false,
         "bestTime": 9999,
         "bestScore": 0
      },
      {
         "levelName": "CutsceneEndingBadWashingtonDC",
         "unlocked": true,
         "cleared": false,
         "ghostAchieved": false,
         "pacifistAchieved": false,
         "bestTime": 9999,
         "bestScore": 0
      }
   ]
}
```
If you want to use the JSON file to get the Superspy achievement (All Level Scores = 100), you can use a regex like `"bestScore": [0-9]+` and replace with `"bestScore": 100`. Then you can hop in game and complete a level in order to unlock the objective.