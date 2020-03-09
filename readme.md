# Setup

This site builds off of last weeks CRUD assignment, but with slightly more app-specific functionality and with the addition of a MongoDB database. 

You can visit this site at any time [here](https://pruitt-as5-databases.glitch.me) on glitch.

If you want to run the project locally, follow the steps below:

Clone this github folder to your preferred location on your computer.
Use the Terminal to cd to this project.
type ```npm install express mongoose morgan``` to install dependencies. Type ```npm start``` to run the app. 

# Design

My goal for this assignment was to prototype my interactive website for thesis. 

The website (for now) needs to be capable of the following:
* user input in the form of a typed list (POST)
* seeing all submitted data thus far (GET)
* opting out of submitting data (DELETE)

(Being able to update the data is a functionality, I wanted to work on later, because this would be more on the admin side and doesn't need to be client facing.)

# Development

I started by following the [MongoDB Guide](https://github.com/itp-dwd/2020-spring/blob/master/guides/mongodb-guide.md). This helped me get all of the different files mapped out and communicating to the database. 

I then incorporated the client-facing code written from last week. 

With a lot of googling I was able to modify the main.js to interact with the database in mostly the way I want. 

At the moment, everything is printing to the console. The next step is having the data display on the html page. 

Everything works locally, but it is not working properly on Glitch. POST works, but GET and DELETE result in:

 ```[Error] Failed to load resource: the server responded with a status of 503 ()```

## Deploying to Glitch.com

- Make sure the git repo is public
- Make sure the git repo is up to date
- Copy the repo link
- Create a new project on glitch
- Open "Tools" --> "Git, Import, and Export"
- Click "Import from Github", pase the repo link
- Press "ok" and watch your code magically appear!

## Author

Maya Pruitt