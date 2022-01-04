---
layout: page
title: Video Game Data Dumping
permalink: /gameinfo/
---


I'm a weirdo and so every now and then if I'm extremely bored (or interested in a game), I'll go around and start to decompile, reverse engineer, etc to a game. 
I like to write about that chronic insanity of mine so that way other people can get actual benefits from it. Most of the time, these game dumps really don't matter much but here you go


## Game Dumps
{% assign posts = site.posts | where: "gameInfo", "true" | sort: 'date' | reverse %}

{% for post in posts %}
*   [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}
