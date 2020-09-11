import os
import xml.etree.ElementTree as ET

# These .sfm files are actually just slightly more complex xml files so just use an XML library
trophyConf = ET.parse("./../../trophies/Raw_Trophies/TROP.SFM").getroot()

tableOut = open("./../../trophies/Processed_Trophies/trophy_data.txt", "w")


for trophy in trophyConf[5:]:
	tableOut.write(f"| {trophy[0].text} | {trophy[1].text} | {trophy.get('id')}\n")