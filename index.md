---
layout: default
---

I code dumb things and play video games sometimes

## Game Info Dumps
{% assign posts = site.posts | where:"gameInfo", "true" %}

{% for post in posts %}
*   [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}

### Lore Dumps

{% assign lore = site.posts | where:"loreInfo", "true" %}
{% for post in lore %}
*   [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}
