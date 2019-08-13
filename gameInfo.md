---
layout: page
title: Game Information
permalink: /gameinfo/
---

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'gameInfo'"%}

{% for item in folder1 %}
	<h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
{% endfor %}
