---
layout: post
title: "Mythbusters: The Game Reversing"
---

<style>
    .table-img {
        max-width: 128px !important; 
        height: auto;
    }
</style>


**Contents**
* TOC
{:toc}

As the game announces to you when you boot it up, it's made with Unity.
Unity (especially without IL2CPP) is *stupidly* easy to reverse engineer.
For example, I've reversed: 
- [Office Race](/Office-Race)
- [Zoombinis](/Zoombinis)
- [The Spy Who Shrunk Me](Spy-Who-Shrunk-Me)

which are all using Unity so if you've seen those, you've probably seen half the things I'm going to do...

Like any mono Unity game, you can easily load up [dnSpy](https://github.com/dnSpy/dnSpy) (a C# / Unity debugger) in order to decompile the main game binary (`Assembly-CSharp.dll`).

## Blueprint Minigames

First I'm gonna just gonna name-drop all of the various blueprint ""puzzles"" (and their solutions where possible just because).

### Quizzes

This puzzle is the most barebones blueprint puzzle. The game doesn't even randomize the question order, so the first question in this table should just always be the first question you get on the quiz blueprint puzzles. I've got basically nothing else to say about this one just becasue its so simple, enjoy your quiz answers ~~you cheater~~.

|  Quiz ID  | Question                                                                           | First Answer                                                  | Second Answer                                                 | Third Answer                                                  | Fourth Answer                                                 | Correct Answer |
|:---------:|------------------------------------------------------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------|----------------|
| quiz00000 | The astronomical unit is a unit of:                                                | distance                                                      | time                                                          | velocity                                                      | density                                                       | FIRST          |
| quiz00001 | In the rain, a person stays drier when traveling a distance of 100 ft:             | on a bike                                                     | by running                                                    | by walking                                                    | on a skateboard                                               | THIRD          |
| quiz00002 | How many times can you fold a sheet of A4 sized paper?                             | 1                                                             | 5                                                             | 6                                                             | 7                                                             | FOURTH         |
| quiz00003 | Which substance used as fuel won't make a rocket fly?                              | Concrete                                                      | Salami                                                        | Black Powder                                                  | Excrement                                                     | FIRST          |
| quiz00004 | What can stop bullets?                                                             | A car door                                                    | A few pizzas in a thermal bag                                 | A car covered with phone books                                | A deck of playing cards                                       | SECOND         |
| quiz00005 | Can a suspension bridge be made out of sticky tape?                                | Yes                                                           | Yes, but no one will be able to cross it                      | No                                                            | Yes, but not longer than 1.5 feet                             | FIRST          |
| quiz00006 | The symbol NaCl stands for which chemical?                                         | Sulfuric acid                                                 | Carbonic acid                                                 | Salt                                                          | Sugar                                                         | THIRD          |
| quiz00007 | What shouldn't be used to put out a grease fire?                                   | A Blanket                                                     | Water                                                         | A Foam extinguisher                                           | A Pot lid                                                     | SECOND         |
| quiz00008 | To separate two phone books with interlaced pages, you need:                       | 10 people                                                     | two cars                                                      | two people                                                    | two tanks                                                     | FOURTH         |
| quiz00009 | Human swim faster in...                                                            | syrup                                                         | water                                                         | substances less dense than water                              | glue                                                          | THIRD          |
| quiz00010 | Black powder is made up of powdered substances, such as:                           | Sulfur, charcoal, potassium nitrate                           | Sulfur, potassium carbonate, potassium nitrate                | Sulfur, potassium carbonate, ferrite                          | Sulfur, charcoal, calcium nitrate                             | FIRST          |
| quiz00011 | How many decibels can cause hearing damage?                                        | 30 dB                                                         | Above 70 dB                                                   | 20 dB                                                         | Below 10 dB                                                   | SECOND         |
| quiz00012 | Which of these substances is the densest?                                          | Sea water                                                     | Distilled water                                               | Milk                                                          | Glycerin                                                      | FOURTH         |
| quiz00013 | Which is the safest gas used to inflate balloons?                                  | Nitrogen                                                      | Hydrogen                                                      | Ammonia                                                       | Helium                                                        | FOURTH         |
| quiz00014 | At room temperature, dry ice:                                                      | melts                                                         | explodes                                                      | stays the same                                                | sublimates                                                    | FOURTH         |
| quiz00015 | How much is the number Pi?                                                         | 3.14 ...                                                      | 5.13 ...                                                      | 2.14 ...                                                      | 31.54 ...                                                     | FIRST          |
| quiz00016 | The capital of the United States of America is:                                    | Warsaw                                                        | New York                                                      | Chicago                                                       | Washington, DC                                                | FOURTH         |
| quiz00017 | Which element has a melting point of 29.76°C and "melts in your hand"?             | Iron                                                          | Gold                                                          | Lead                                                          | Gallium                                                       | FOURTH         |
| quiz00018 | The basic ingredient in lemonade is?                                               | Juniper fruit                                                 | Lemon                                                         | Hops                                                          | Salt                                                          | SECOND         |
| quiz00019 | What year did humans first land on the moon?                                       | 1969                                                          | 1920                                                          | 1975                                                          | 2020                                                          | FIRST          |
| quiz00020 | What's the chemical formula of ozone?                                              | O1                                                            | O2                                                            | O3                                                            | O4                                                            | THIRD          |
| quiz00021 | What is the voltage of an electrical outlet in the US?                             | 110 V                                                         | 230 V                                                         | 220 V                                                         | 320 V                                                         | FIRST          |
| quiz00022 | What is gelatin made from?                                                         | Bones                                                         | Wheat                                                         | Corn                                                          | Potatoes                                                      | FIRST          |
| quiz00023 | The largest continent on Earth is:                                                 | Asia                                                          | Africa                                                        | North America                                                 | South America                                                 | FIRST          |
| quiz00024 | The largest ocean on Earth is the:                                                 | Pacific Ocean                                                 | Atlantic Ocean                                                | Arctic Ocean                                                  | Indian Ocean                                                  | FIRST          |
| quiz00025 | The correct order of the planets in terms of distance from the Sun is:             | Venus, Mercury, Earth, Mars, Jupiter, Saturn, Uranus, Neptune | Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune | Mercury, Venus, Mars, Earth, Jupiter, Saturn, Uranus, Neptune | Mercury, Venus, Earth, Mars, Jupiter, Saturn, Neptune, Uranus | SECOND         |
| quiz00026 | How much time does it take for Earth to orbit the Sun?                             | 13 months                                                     | 12 months                                                     | 6 months                                                      | 24 hours                                                      | SECOND         |
| quiz00027 | What's the Earth's core made out of?                                               | Iron and nickel                                               | A magnet                                                      | Gallium                                                       | Quartz                                                        | FIRST          |
| quiz00028 | What moves faster than light?                                                      | Sound                                                         | Rocket                                                        | A bullet fired from a sniper rifle                            | Nothing                                                       | FOURTH         |
| quiz00029 | The smallest country in the world is:                                              | The Vatican                                                   | Poland                                                        | Morocco                                                       | Liechtenstein                                                 | FIRST          |
| quiz00030 | How many degrees does a right angle have?                                          | 30                                                            | 45                                                            | 90                                                            | 180                                                           | THIRD          |
| quiz00031 | Frogs are:                                                                         | Birds                                                         | Mammals                                                       | Reptiles                                                      | Amphibians                                                    | FOURTH         |
| quiz00032 | What result will we get from the following formula: 10 × (3 × 5 - 20) = ?          | -50                                                           | 50                                                            | 130                                                           | -450                                                          | FIRST          |
| quiz00033 | What result will we get from the following formula: 30 - (20 - 1 × 5) - 125: 5 = ? | -15                                                           | 10                                                            | -10                                                           | 15                                                            | THIRD          |
| quiz00034 | What planet do we live on?                                                         | Mars                                                          | Venus                                                         | Earth                                                         | Mercury                                                       | THIRD          |
| quiz00035 | Which temperature is the closest to the temperature of the human body?             | 88.6°F (31ºC)                                                 | 98.6°F (37ºC)                                                 | 37°F (2.8ºC)                                                  | 108.6°F (42.6ºC)                                              | SECOND         |
| quiz00036 | What is the chemical formula for water?                                            | O3                                                            | H3O2                                                          | O2                                                            | H2O                                                           | FOURTH         |
| quiz00037 | Albert Einstein was born in:                                                       | Germany                                                       | United States                                                 | Poland                                                        | Austria                                                       | FIRST          |
| quiz00038 | What's the symbol for gold on the periodic table?                                  | Au                                                            | Ag                                                            | Fe                                                            | Cr                                                            | FIRST          |
| quiz00039 | Which substance has the most corrosive properties?                                 | hydrochloric acid                                             | sodium hydroxide                                              | sulfuric acid                                                 | fluoroantimonic acid                                          | FOURTH         |
| quiz00040 | Who formulated the three laws of motion?                                           | Nicolaus Copernicus                                           | Nicola Tesla                                                  | Isaac Newton                                                  | Albert Einstein                                               | THIRD          |
| quiz00041 | What is the speed of sound in the air?                                             | ca. 222 m/s (500 mph)                                         | ca. 722 m/s (1,615 mph)                                       | ca. 333 m/s (746 mph)                                         | ca. 11,666 m/s (26,100 mph)                                   | THIRD          |
| quiz00042 | Which solution is the most acidic?                                                 | Lemon juice                                                   | Water                                                         | Rain                                                          | Detergent                                                     | FIRST          |
| quiz00043 | How many bits does a byte have?                                                    | 12                                                            | 4                                                             | 6                                                             | 8                                                             | FOURTH         |
| quiz00044 | How many seconds are in a minute?                                                  | 100                                                           | 60                                                            | 30                                                            | 10                                                            | SECOND         |
| quiz00045 | What is the chemical formula for oxygen?                                           | O2                                                            | O                                                             | O4                                                            | O3                                                            | FIRST          |
| quiz00046 | Bats are:                                                                          | birds                                                         | amphibians                                                    | reptiles                                                      | mammals                                                       | FOURTH         |
| quiz00047 | The first man on the moon was:                                                     | Neil Alden Armstrong                                          | Christopher Columbus                                          | Christopher Chyliński                                         | Ferdinand Magellan                                            | FIRST          |
| quiz00048 | Which of the following animals is not a mammal?                                    | Dolphin                                                       | Kangaroo                                                      | Turtle                                                        | Koala                                                         | THIRD          |
| quiz00049 | The highest mountain is:                                                           | Mount Denali                                                  | Mount Everest                                                 | Mont Blanc                                                    | K2                                                            | SECOND         |
| quiz00050 | A straight line in geometry:                                                       | Has an end, but no beginning                                  | Has no beginning and no end                                   | Has a beginning, but no end                                   | None of the above                                             | SECOND         |
| quiz00051 | Lizards are...?                                                                    | birds                                                         | amphibians                                                    | reptiles                                                      | mammals                                                       | THIRD          |
| quiz00052 | Penguins are...?                                                                   | birds                                                         | amphibians                                                    | reptiles                                                      | mammals                                                       | FIRST          |
| quiz00053 | Humans are...?                                                                     | birds                                                         | amphibians                                                    | reptiles                                                      | mammals                                                       | FOURTH         |
| quiz00054 | How many minutes are there in an hour?                                             | 100                                                           | 10                                                            | 30                                                            | 60                                                            | FOURTH         |
| quiz00055 | How many degrees does an acute angle have?                                         | 180-360                                                       | 45-60                                                         | 90-180                                                        | 0-90                                                          | FOURTH         |
| quiz00056 | In a normal setting, water boils at the temperature:                               | 10°C (50°F)                                                   | 99°C (210.2°F)                                                | 100°C (212°F)                                                 | 110°C (230°F)                                                 | THIRD          |
| quiz00057 | Which of the following animals is not an amphibian?                                | Marsh frog                                                    | Moor frog                                                     | Turtle                                                        | Mountain newt                                                 | THIRD          |
| quiz00058 | Which of these animals is not a bird?                                              | Bat                                                           | Eagle                                                         | Owl                                                           | Penguin                                                       | FIRST          |
| quiz00059 | How many degrees are there in a full angle?                                        | 30                                                            | 360                                                           | 90                                                            | 45                                                            | SECOND         |
| quiz00060 | How many degrees does a half-full angle have?                                      | 180                                                           | 90                                                            | 360                                                           | 45                                                            | FIRST          |
| quiz00061 | The symbol for silver on the periodic table is:                                    | Au                                                            | Ag                                                            | Fe                                                            | Cr                                                            | SECOND         |
| quiz00062 | The symbol for hydrogen on the periodic table is:                                  | H                                                             | B                                                             | Kr                                                            | Ne                                                            | FIRST          |
| quiz00063 | The symbol for iron on the periodic table is:                                      | Zn                                                            | Rh                                                            | Fe                                                            | Hg                                                            | THIRD          |
| quiz00064 | The symbol for chlorine on the periodic table is:                                  | Cm                                                            | C                                                             | Cl                                                            | Cs                                                            | THIRD          |
| quiz00065 | The symbol for carbon on the periodic table is:                                    | Cm                                                            | C                                                             | Ra                                                            | Pt                                                            | SECOND         |
| quiz00066 | How many vertices does a triangle have?                                            | 4                                                             | 2                                                             | 1                                                             | 3                                                             | FOURTH         |
| quiz00067 | How many vertices does a square have?                                              | 3                                                             | 4                                                             | 6                                                             | 8                                                             | SECOND         |
| quiz00068 | Which solution is the most alkaline?                                               | Lemon juice                                                   | Water                                                         | Rain                                                          | Laundry detergent                                             | FOURTH         |
| quiz00069 | The capital of Japan is:                                                           | Osaka                                                         | Kyoto                                                         | Tokyo                                                         | Saitama                                                       | THIRD          |
| quiz00070 | The capital of Italy is:                                                           | Naples                                                        | The Vatican                                                   | Rome                                                          | Florence                                                      | THIRD          |


### Rolling Ball Game

Here's a list of all of the possible solutions and puzzles for the rolling ball blueprint minigame.
This also includes their internal IDs (because why not) as well as their width/height, maximum move count, and difficulty (`s` for small, `m` for medium, `l` for large). This also includes the hints directly ripped from the game itself.

| ID     | Width | Height | Move Count | Difficulty |                                          Hint Path                                          |
|--------|-------|--------|------------|------------|:-------------------------------------------------------------------------------------------:|
| 300000 | 5     | 5      | 9          | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/0-A.png">  |
| 300001 | 5     | 5      | 25         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/1-A.png">  |
| 300002 | 5     | 5      | 40         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/2-A.png">  |
| 300003 | 7     | 7      | 7          | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/3-A.png">  |
| 300004 | 5     | 5      | 14         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/4-A.png">  |
| 300005 | 5     | 5      | 32         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/5-A.png">  |
| 300006 | 5     | 5      | 14         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/6-A.png">  |
| 300007 | 5     | 5      | 20         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/7-A.png">  |
| 300008 | 5     | 5      | 16         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/8-A.png">  |
| 300009 | 7     | 7      | 23         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/9-A.png">  |
| 300010 | 5     | 5      | 16         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/10-A.png"> |
| 300011 | 5     | 5      | 22         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/11-A.png"> |
| 300012 | 7     | 7      | 40         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/12-A.png"> |
| 300013 | 7     | 7      | 34         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/13-A.png"> |
| 300014 | 5     | 5      | 28         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/14-A.png"> |
| 300015 | 5     | 5      | 40         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/15-A.png"> |
| 300016 | 5     | 5      | 18         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/16-A.png"> |
| 300017 | 5     | 5      | 24         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/17-A.png"> |
| 300018 | 7     | 7      | 23         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/18-A.png"> |
| 300019 | 7     | 7      | 34         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/19-A.png"> |
| 300020 | 7     | 7      | 32         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/20-A.png"> |
| 300021 | 5     | 5      | 15         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/21-A.png"> |
| 300022 | 5     | 5      | 17         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/22-A.png"> |
| 300023 | 5     | 5      | 50         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/23-A.png"> |
| 300024 | 7     | 7      | 39         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/24-A.png"> |
| 300025 | 7     | 7      | 59         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/25-A.png"> |
| 300026 | 5     | 5      | 20         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/26-A.png"> |
| 300027 | 5     | 5      | 75         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/27-A.png"> |
| 300028 | 5     | 5      | 50         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/28-A.png"> |
| 300029 | 7     | 7      | 45         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/29-A.png"> |
| 300030 | 7     | 7      | 32         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/30-A.png"> |
| 300031 | 7     | 7      | 30         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/31-A.png"> |
| 300032 | 7     | 7      | 41         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/32-A.png"> |
| 300033 | 5     | 5      | 35         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/33-A.png"> |
| 300034 | 5     | 5      | 35         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/34-A.png"> |
| 300035 | 5     | 5      | 32         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/35-A.png"> |
| 300036 | 5     | 5      | 35         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/36-A.png"> |
| 300037 | 5     | 5      | 50         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/37-A.png"> |
| 300038 | 5     | 5      | 40         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/38-A.png"> |
| 300039 | 7     | 7      | 130        | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/39-A.png"> |
| 300040 | 7     | 7      | 80         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/40-A.png"> |
| 300041 | 7     | 7      | 42         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/41-A.png"> |
| 300042 | 7     | 7      | 24         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/42-A.png"> |
| 300043 | 7     | 7      | 70         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/43-A.png"> |
| 300044 | 7     | 7      | 27         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/44-A.png"> |
| 300045 | 5     | 5      | 16         | m          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/45-A.png"> |
| 300046 | 5     | 5      | 35         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/46-A.png"> |
| 300047 | 5     | 5      | 30         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/47-A.png"> |
| 300048 | 5     | 5      | 30         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/48-A.png"> |
| 300049 | 7     | 7      | 45         | l          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/49-A.png"> |
| 300050 | 5     | 5      | 12         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/50-A.png"> |
| 300051 | 5     | 5      | 16         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/51-A.png"> |
| 300052 | 5     | 5      | 20         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/52-A.png"> |
| 300053 | 5     | 5      | 12         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/53-A.png"> |
| 300054 | 5     | 5      | 14         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/54-A.png"> |
| 300055 | 5     | 5      | 22         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/55-A.png"> |
| 300056 | 5     | 5      | 26         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/56-A.png"> |
| 300057 | 5     | 5      | 24         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/57-A.png"> |
| 300058 | 5     | 5      | 24         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/58-A.png"> |
| 300059 | 5     | 5      | 26         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/59-A.png"> |
| 300060 | 5     | 5      | 30         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/60-A.png"> |
| 300061 | 5     | 5      | 34         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/61-A.png"> |
| 300062 | 5     | 5      | 36         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/62-A.png"> |
| 300063 | 5     | 5      | 34         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/63-A.png"> |
| 300064 | 5     | 5      | 36         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/64-A.png"> |
| 300065 | 5     | 5      | 42         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/65-A.png"> |
| 300066 | 5     | 5      | 42         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/66-A.png"> |
| 300067 | 5     | 5      | 40         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/67-A.png"> |
| 300068 | 5     | 5      | 52         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/68-A.png"> |
| 300069 | 5     | 5      | 40         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/69-A.png"> |
| 300070 | 5     | 5      | 44         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/70-A.png"> |
| 300071 | 5     | 5      | 50         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/71-A.png"> |
| 300072 | 5     | 5      | 70         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/72-A.png"> |
| 300073 | 5     | 5      | 56         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/73-A.png"> |
| 300074 | 5     | 5      | 18         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/74-A.png"> |
| 300075 | 5     | 5      | 54         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/75-A.png"> |
| 300076 | 5     | 5      | 48         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/76-A.png"> |
| 300077 | 5     | 5      | 62         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/77-A.png"> |
| 300078 | 5     | 5      | 68         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/78-A.png"> |
| 300079 | 5     | 5      | 52         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/79-A.png"> |
| 300080 | 5     | 5      | 40         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/80-A.png"> |
| 300081 | 5     | 5      | 26         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/81-A.png"> |
| 300082 | 5     | 5      | 38         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/82-A.png"> |
| 300083 | 5     | 5      | 52         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/83-A.png"> |
| 300084 | 5     | 5      | 44         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/84-A.png"> |
| 300085 | 5     | 5      | 56         | s          | <img class="table-img" src="/assets/downloads/mythbusters/rolling-ball-solutions/85-A.png"> |

## Myth Mechanics

### Balloon Lift-Off
For this myth, you can choose to place ballasts on either the left or right side of a chair. In addition to placing balloons on the top in order to gain lift.
Most of the classes for this are just named `Balloon[___]`. One of the main classes is the `BalloonExperimentService`. 
This `BalloonExperimentService` class has a `ChangeBalloonState` which will adjust whether or not the balloon-ified chair goes up/down.
```csharp
	/* 
		Function: BalloonExperimentService.ChangeBalloonState 
		Comments added by me <3
	*/
	private static void ChangeBalloonState(GameEntity mainBalloonExperiment, Rigidbody chairHookRigidbody)
	{
		// The `massCanLift.Mass` is equal to (balloon_count * 20)
		int mass = mainBalloonExperiment.massCanLift.Mass;

		// If the balloon lift mass is within 5kg and the ballast mass (`chairHookRigidbody.mass`), start hovering instead.
		if (Math.Abs((float)mass - chairHookRigidbody.mass) <= 5f)
		{
			if (mainBalloonExperiment.hasBalloonChangeHeight)
			{
				mainBalloonExperiment.RemoveBalloonChangeHeight();
				return;
			}
		}
		else
		{
			// This will set whether or not we're rising based on the mass difference.
			// If `balloon lift mass` > `ballast mass`, start rising; otherwise start falling
			mainBalloonExperiment.ReplaceBalloonChangeHeight((float)mass - chairHookRigidbody.mass > 0f);
		}
	}
```
Each balloon can support up to 20 mass units (kilograms by default) while each ballast weighs 20 mass units. The chair has a default mass of 100 mass units (kg). 
If you can do basic algebra, you'll realize that you'll need at minimum 5 balloons to hover (and 6 balloons to gain height obviously)
If you can't do basic algebra, read the following: in order to gain height, the total count of balloons needs to be `(5 + ballast_count + 1)`. In order to lose height, you need to be anything below that value.


## Random Data

### Item Data

By adding code to the `ItemDataInitSystem.Initialize`, you can easily print out a list of all of the items in the game.
This class loads all of it's data from an embedded resource in the Unity bundles. Then it loads the Items into a dictionary structured like `ID: {Item Object}`. 
So I decided to dump out all of the objects and then put it into a [Spreadsheet](https://docs.google.com/spreadsheets/d/176dZpKcdYnKzUM06bA_Uw0vdmiL38lUSQUSKL47HugA/edit?usp=sharing).

### Rocket Data

For the purposes of the rocket myths, there's only 4 types of rocket profiles.
1. Simple
2. Donut (Donut and Star)
3. Cross (Cross / Double C)
4. Octopus
Each of these adjusts how much fuel is used per each frame tick and thus a faster rocket.
The same thing applies for the fuel types (in order of increasing speed).
1. Poo (4)
2. Salami (20)
3. Sugar (28)
4. Black power (40)
5. Aluminium (50)

### Popularity Bonuses
Whenever you reach a certain amount of popularity, you gain an extra bonus from ye old company overlords.

| Popularity Threshold | Bonus Amount |
|:--------------------:|:------------:|
|         1000         |     500      |
|         2000         |     1000     |
|         3000         |     1500     |
|         5000         |     2500     |
|        10000         |     4000     |
|        30000         |     6000     |
|        50000         |     8000     |
|        100000        |    12000     |
|        200000        |    16000     |
|        500000        |    20000     |
|       1000000        |    24000     |

### Debug Tools

This games uses [SRDebugger](https://www.stompyrobot.uk/tools/srdebugger/) in order to implement it's debug utils. It exposes all sorts of tools via the `SROptions` class.
You can also basically make `SRDebugger.Settings.IsEnabled` always return true in order to enable debug mode.
According to the docs, you open the debug menu with `Ctrl-Shift-F1`.
<img src="{{ site.baseurl }}/assets/downloads/mythbusters/mythbusters-debug-menu.png" loading="lazy"/>

There's a cheat which allows you to spawn **infinite** busters:
<video style="max-width:100%;" onloadstart="this.volume=0.25" src="{{ site.baseurl }}/assets/downloads/mythbusters/Mythbusters.webm" type="video/webm" controls preload="metadata"></video>

### Myths / Blueprints Data

For reference, `The First Experiment` version of this game contains all of the myths in this table, but it blocks out everything aside from `Hero's Gambit` and `Balloon Chair` by just setting the minimum blueprints to `999`

| Myth ID |    Blueprint IDs    |  Sprite ID   |       Title        |   Scene Name    |    Experts Card IDs    | Min. Blueprints Solved |
|:-------:|:-------------------:|:------------:|:------------------:|:---------------:|:----------------------:|:----------------------:|
|  30000  | 40000, 40006, 40012 | image_30000M |     ROCKET CAR     | RACETRACK_START | 700006, 700004, 700005 |           5            |
|  30001  |    40001, 40007     | image_30001M | CURVING THE BULLET | SHOOTING_RANGE  | 700004, 700009, 700006 |           2            |
|  30002  | 40002, 40008, 40013 | image_30002M |   HERO'S GAMBIT    | SHOOTING_RANGE  | 700009, 700010, 700011 |           0            |
|  30003  |    40003, 40009     | image_30003M |   REVERSE DRIVE    | RACETRACK_START | 700011, 700010, 700006 |          300           |
|  30004  |    40004, 40010     | image_30004M |   SALAMI ROCKET    | ROCKET_PLATFORM | 700009, 700005, 700010 |           3            |
|  30005  | 40005, 40011, 40014 | image_30005M |   BALLOON CHAIR    | ROCKET_PLATFORM | 700004, 700006, 700009 |           1            |

Here's a list of all of the blueprint IDs as well (as of the initial release of the game). You'll notice that there's a few cut blueprints (namely 4003, and 4009) which are for the [reverse drive myth](https://www.imdb.com/title/tt1766851/).


| Blueprint ID |            Title             | Steps |                                      Puzzle Pool IDs                                      | Recipe ID | Solved Card Unlock |  Next Unlocked Blueprints  |
|:------------:|:----------------------------:|:-----:|:-----------------------------------------------------------------------------------------:|:---------:|:------------------:|:--------------------------:|
|    40000     | ONE SMALL JUMP FOR HUMANITY  |   5   |        matches_puzzles_I, procentage_puzzles_I, RollingBall_s, quiz, ok_puzzles_I         |   50000   |       700034       |           40006            |
|    40001     |        Will it bend?         |   4   |          ok_puzzles_I, procentage_puzzles_I, procentage_puzzles_I, ok_puzzles_I           |   50001   |       700033       |           40004            |
|    40002     |      RUN FOR YOUR LIFE       |   4   |           ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I            |   50002   |       700025       |             -1             |
|    40003     |             N/D              |   4   |           ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I            |   50003   |       700033       |           40009            |
|    40004     |      AN IMPOSSIBLE FUEL      |   4   |           ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I            |   50004   |       700028       | 40007, 40008, 40010, 40011 |
|    40005     | IS IT A BIRD? IS IT A CHAIR? |   5   |        matches_puzzles_I, procentage_puzzles_I, RollingBall_s, quiz, ok_puzzles_I         |   50005   |       700000       |           40001            |
|    40006     |        ROCKET CAR v2         |   5   |        matches_puzzles_I, procentage_puzzles_I, RollingBall_s, quiz, ok_puzzles_I         |   50006   |       700035       |           40012            |
|    40007     |          Hard Turn           |   6   | ok_puzzles_I, procentage_puzzles_I, RollingBall_s, matches_puzzles_I, quiz, RollingBall_s |   50007   |       700034       |             -1             |
|    40008     |  AN EXPONENTIAL EXPLOSION!   |   5   |    ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I, RollingBall_s    |   50008   |       700029       |           40013            |
|    40009     |             N/D              |   4   |           ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I            |   50009   |       700035       |             -1             |
|    40010     |       THE FOOD ROCKET        |   5   |    ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I, RollingBall_s    |   50010   |       700034       |             -1             |
|    40011     |         THE AERONAUT         |   4   |               matches_puzzles_I, procentage_puzzles_I, RollingBall_s, quiz                |   50011   |       700033       |           40014            |
|    40012     |        ROCKET CAR v3         |   5   |        matches_puzzles_I, procentage_puzzles_I, RollingBall_s, quiz, ok_puzzles_I         |   50012   |       700036       |             -1             |
|    40013     |       LAST ACTION HERO       |   4   |           ok_puzzles_I, RollingBall_s, procentage_puzzles_I, matches_puzzles_I            |   50013   |       700028       |             -1             |
|    40014     |   THERE'S NO TIME TO WASTE   |   5   |        matches_puzzles_I, procentage_puzzles_I, RollingBall_s, quiz, ok_puzzles_I         |   50014   |       700007       |             -1             |


#### Demo Missions

In order to load one of the extra missions that's loaded from the MythBoard, you'll need to edit some of the code to set the myth ID of the myth you're loading.
You'll edit: `GameEntity.ReplaceMythSelected` and `GameEntity.AddMythSelected` to set `newMythId` to whatever myth ID you choose, up above is a list of all of the possible myth ID values.
<img src="{{ site.baseurl }}/assets/downloads/mythbusters/MythBustersTheGame_Prologue_OFzzRgUP70.png" loading="lazy"/>

## Speedrun Notes

There's a few extra bits of speed tech that apply for all of the speedrun categories so I'm just going to mention them here.
If you need to fast-travel/teleport, you can just save* quit and you'll instantly get warped back to where you loaded the map in from.
The assistant is absolutely *cracked* and so, just always spec for it first.

### Core Myths
This category just involves doing the main 4 myths/blueprints (Hero's Gambit, Balloon Chair, Curving The Bullet, Salami Rocket)