import os
import xml.etree.ElementTree as ET
import shutil

# These .sfm files are actually just slightly more complex xml files so just use an XML library
trophyConf = ET.parse("./../../trophies/Raw_Trophies/TROP.SFM").getroot()
# A dictionary of the trophy # to the trophy name as shown in the .sfm file
trophyIDToName = {}

# Anything past the 5th element are the trophies embedded in this .sfm file
for trophy in trophyConf[5:]:
	print(f"Trophy #{trophy.get('id')}: {trophy[0].text}")
	trophyName = trophy[0].text
	# Just some safetry, pretty sure this isn't actually useful in Lollipop Chainsaw afaik
	for c in '[<>:"/\|?*]': trophyName = trophyName.replace(c,'')
	trophyIDToName.update({trophy.get('id') : trophyName})


# This script is used to convert the Raw trophies into a more user-friendly named version 

for filename in os.listdir('./../../trophies/Raw_Trophies'):
	if not (filename.endswith(".PNG")) or filename.startswith("ICON"): continue

	trophyID = filename[4:-4]
	trophyName = trophyIDToName[trophyID]
	print(f"Trophy #{trophyID} ({filename}) to: {trophyName}")
	shutil.copy("./../../trophies/Raw_Trophies/" + filename, "./../../trophies/Processed_Trophies/" + trophyName + ".png")