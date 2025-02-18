# Final Frontier Arts
A demo Contentful project

## Live Demo

### [https://final-frontier-arts.vercel.app/](https://final-frontier-arts.vercel.app/)

![homepage screenshot](/lib/homepage.png)

## About the Project

The Final Frontier Arts is a curated gallery that is dedicated to exploring the intersection of space, science, and art. 

The owner, Olivia Nova, owns many science themed galleries in her area. But she has a problem, her employees haven't learned how to use Contentful even though their website has been using the platform for months.

She devises a plan. She creates a scavenger hunt learning program so that the employees must use multiple Contentful features to find a missing URL to the next art piece being added to the gallery.

## Learning Topics
The user will have to interact with the following Contentful features. 

* Content Model
* Content search & filter
* Publishing entries
* Reference Fields
* Previews/drafts
* GraphQL API
* Custom Apps
* Webhooks


## Structure

### Technology
The website is built with the following:
* Next.js
* TypeScript
* Contentful
* GraphQL API

### Extras
The following are also include in the project:

#### Webhooks
Zapier that is triggered on entry publishing sends the clue to a Google doc.

#### Contentful Apps
4 Custom apps were created, 2 Marketplace apps were used.

![apps screenshot](/lib/apps.png)

* *Exhibition Checker:* One clue requires the user to re-order a reference field. This app checks that the user did that correctly.
* *Sidebar Decoder:* One clue requires the user to find a specific code, and enter it into a sidebar app to check if it is valid.
* Two apps were created to make adding artwork to the project faster. One app searches the *Artsy API* and the other searches the *Art Institute of Chicago API*.
* *GraphQLi App:* This app is used for a clue that requires a GraphQL query to be built.
* *Color Picker App* This app is used for a clue.

## The Scavenger Hunt

The user will go through 5 different clues, each clue unlocking the next clue and providing a code. At the end, the final code will lead the user to the missing art piece. 

### Examples of the Game

Game Start
![game screenshot](/lib/game-start.png)
Game Clue
![clue screenshot](/lib/game-clue.png)