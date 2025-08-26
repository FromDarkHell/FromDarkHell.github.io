---
layout: post
title: Battleborn Info Dumps
---

**Contents**
* TOC
{:toc}

Sadly I "got into" digging into this game a bit too late for me to do the best type of digging for live service games... :/
But I've got some assorted info (and TODO: asset dumps)

## Initialization
When you launch up the game, it's gonna ask Gearbox's servers for their SparkTMS package.
- Borderlands 2+TPS(and 3)  also have this system, unsure on the format for BL3

It requests the SparkTMS package from: [http://cdn.services.gearboxsoftware.com/sparktms/poplar/pc/steam/BattlebornTMS-prod.cfg](http://cdn.services.gearboxsoftware.com/sparktms/poplar/pc/steam/BattlebornTMS-prod.cfg)
Gearbox continues to follow the pattern of naming their games/projects after plants/trees
- Trees are usually games and plants/"lower" trees are usually DLC or less important projects

But either way, for Battleborn, it follows the same setup and format as Borderlands 2.
Rather than implement it myself, I just used [Gibbed](https://github.com/gibbed)'s `SparkTMSUnpack` program over on [Github](https://github.com/gibbed/Gibbed.Borderlands2/blob/master/projects/Gibbed.Borderlands2.SparkTmsUnpack/Program.cs).
For fun (and cause why not), I made a dead simple Python script to quickly re-unpack the TMS file from a python script to avoid having to continue to redownload it if you want to check in on it for some reason

```python
import requests
import os
import subprocess
import shutil

url = "http://cdn.services.gearboxsoftware.com/sparktms/poplar/pc/steam/BattlebornTMS-prod.cfg"
savedFile = url.split("/")[-1]


if os.path.exists(savedFile):
    print(f"Deleting old {savedFile} and dir...")
    os.remove(savedFile)

print(f"Requesting new {savedFile}")

with requests.get(url) as r:
    r.raise_for_status()
    with open(savedFile, "wb") as f:
        f.write(r.content)

execName = f'./Executables/Gibbed.Borderlands2.SparkTmsUnpack.exe "{savedFile}" -o'
subprocess.run(execName)


# Create a zip file
shutil.make_archive(f"./{savedFile[:-4]}", "zip", f"./{savedFile[:-4]}_unpack")
```
This in of itself doesn't do much but you place `Gibbed.Borderlands2.SparkTmsUnpack.exe` down into `./Executables`.
You can also download a full rip of what it was when I made that [here]({{ site.baseurl }}/assets/downloads/battleborn/Battleborn - SparkTMS Handler.zip).

Then it'll use some of the info in the SparkTMS package to request Gearbox' services for Hotfixes.
It requests these hotfixes over at [https://discovery.services.gearboxsoftware.com/v2/client/steam/pc/poplar/verification](https://discovery.services.gearboxsoftware.com/v2/client/steam/pc/poplar/verification).
This is a *fairly* simple JSON structure, it just defines individual services.
The proper hotfixes (technically called `Micropatches`) are (currently) in the 8th (0-indexed) entry in the `services` array
The current version (as I write this) for the `Micropatch` service is: `"1.89.71"`
It seems to use some sort of weird in-between version of BL2s hotfixes and BL3s new hotfix format.


## Asset Dumps

### TODO