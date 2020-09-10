import os

nameDict = {"EVI":"Evil", "FNK": "Funk", "MTL": "Metal", "PHC": "Psychedelic", "PNK":"Punk", "ROC": "Rock"}

for filename in os.listdir('./'):
	if not (filename.endswith(".png")): continue

	musicGenre = [v for (k,v) in nameDict.items() if k in filename][0]
	musicNumber = filename[:-4].rsplit("_",1)[-1][1:]
	os.rename(filename, f"{musicGenre}_{musicNumber}.png")
	