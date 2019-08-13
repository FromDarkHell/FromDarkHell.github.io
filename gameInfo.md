---
layout: page
title: Game Information
permalink: /gameinfo/
---

{% assign posts = site.pages | where_exp: "item" , "item.path contains 'gameInfo'"%}

{% for post in posts %}
	<h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
{% endfor %}
