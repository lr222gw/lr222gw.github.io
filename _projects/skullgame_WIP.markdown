---
layout: project
title:  "(WIP) Skullgame"
date:   2024-06-12
categories: projects
image: "/docs/media/skullgame.png"
demo: "/docs/media/full_fast_demo.mp4"
demotype: "video"
---

<div id="warn" markdown="1">
![Warning Site under construction]({{site.baseurl}}{{ page.permalink }}/assets/icons/warning.svg)
<p>Site is under construction</p>
</div>


{% include video.html src="/docs/media/full_slow_demo.mp4" %}

**Note:<br> This article contains images and videos of a very early build. Assets are not final.**

## Brief About This Project

Skullgame is a VR multiplayer game made with unity as a exploratory project for me to get a opportunity to develop a VR multiplayer experience. 
This project is based on the Card game `Skull` (non-affiliated), and aims to guide the players through the game in a VR environment. 
The reason why I decided to recreate `Skull` is mainly due to me thinking the game is fun and let me experiment with unity without having to focus too much on game mechanics.

## What have/am I learned/ing during this project?

- Unity Editor scripting 
- Multiplayer with Unity 
- - Synchronization
- More experience with C# 
- Bezier Curves
- UdonSharp 




{% capture div_contents %}
## Brief About Skullgame

At the beginning of the game all players receives four cards that secret to the other players; three cards marked with a `rose symbol` the fourth is a `trap card` with a `skull symbol`.
Each round every player get to decide one of two actions to preform on their turn (clockwise order): 
- A. Place one of their cards by putting it on a stack in front of them.
- B. If all players has placed at least one card the current player may choose to initiate betting. 

#### The Betting
The initiating player picks a value from 1 to `the sum of all cards being placed`; efficiently stating that `"I bet I can pick`*`X`*`cards of the tables without encountering a skull"`.
Any player can at this point raise the bet, the player with the highest bid will have to pick the cards of the table but there's a caveat; the winning player must always start by picking all cards in their own stack. If they bet higher than the number of cards in their stack then they must proceed to pick from the other players in any order they wish.

If the highest bidder succeeds without encountering a `skull card` then they will get a score, once they have two scores they have won the whole game.
If the highest bidder fails they will lose one of their four cards *(or however many they have left)*, but only they will know which card they've lost. Hopefully you didn't lose your skull card.

#### The Aim of the game
The aim is to be the first to win two rounds by strategically bluffing to make opponents pick your skull cards while avoiding picking any skulls yourself. It's a balance of risk-taking and deception to outwit your opponents.
{% endcapture %}
{% include ButtonHideWindow.html div_id="skullbrief" div_content=div_contents button_text="Unfamiliar with Skull? Click here to get a brief introduction" %}
