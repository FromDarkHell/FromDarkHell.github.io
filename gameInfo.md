---
layout: page
title: Game Information
permalink: /gameinfo/
---

{% assign posts = site.posts | where:"gameInfo", "true" %}

{% for post in posts %}
 	*   [{{ post.title }}]({{ site.baseurl }}{{ post.url }}) Last Updated: {{ page.date | date: "%-d %B %Y" }
{% endfor %}
