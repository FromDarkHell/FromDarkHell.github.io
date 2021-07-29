---
layout: page
title: Repositories
permalink: /repos/
---
(Sorted by last updated (when this site was last updated))

{% assign repos = site.github.public_repositories | sort:"updated_at" %}

<ul>
{% for repository in repos reversed %}
	{% if repository.fork == false and repository.name != "FromDarkHell.github.io" %}
		<li>
			<p style="size: 1px">
			<a href="{{ repository.html_url }}" style="size: 15px">{{ repository.name }}</a>: 
			{{ repository.description}}

			{% if repository.archived == true %}
			<b>(Archived)</b>
			{% endif %}

			</p>
		</li>
	{% endif %}
{% endfor %}
<ul>
