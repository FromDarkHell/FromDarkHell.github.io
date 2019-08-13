---
layout: page
title: Game Information
permalink: /gameinfo/
---

{% assign posts = site.posts | where:"gameInfo", "true" %}

{% for post in posts %}
	<h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
{% endfor %}
