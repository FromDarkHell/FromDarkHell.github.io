---
layout: page
title: Video Game Data Dumping
permalink: /gameinfo/
---


Every now and then, if I'm interested in a game (or just extremely bored), I try and dive into the code, decompile assets, and reverse-engineer its inner workings.

I document what things I find, here, so that others can hopefully benefit from it! Whether it's for modding, speedrunning, or just because. Nothing here is really gonna be that groundbreaking, but it's probably a fun read.

## Game Dumps
{% assign posts = site.posts | where: "gameInfo", "true" | sort: 'date' | reverse %}

{% for post in posts %}
*   [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}
