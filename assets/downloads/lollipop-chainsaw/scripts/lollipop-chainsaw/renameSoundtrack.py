import os

# This script is basically used to convert the extracted cover images over into more human readable names

nameDict = {"EVI":"Evil", "FNK": "Funk", "MTL": "Metal", "PHC": "Psychedelic", "PNK":"Punk", "ROC": "Rock"}

for filename in os.listdir('./../../soundtrack/cover-images/'):
	if not (filename.endswith(".png")): continue

	musicGenre = [v for (k,v) in nameDict.items() if k in filename][0]
	musicNumber = filename[:-4].rsplit("_",1)[-1][1:]
	os.rename(filename, f"{musicGenre}_{musicNumber}.png")
	