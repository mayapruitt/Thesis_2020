# CONCEPT 

This project builds off of the last two assignments in Dynamic Web Development and also serves as a first prototype of my thesis. 

The concept is to create an interactive experiment about creativity that becomes more accessible to the general public via the web. 

# SETUP

You can visit this site at any time [here](https://pruitt-as5-databases.glitch.me) on glitch.

If you want to run the project locally, follow the steps below:

Clone this github folder to your preferred location on your computer.
Use the Terminal to cd to this project.
Type ```npm install express mongoose morgan``` to install dependencies. 
Type ```npm start``` to run the app. 

# INSPIRATION

Some inspirations are: 
* [Moral Machine](http://moralmachine.mit.edu) - a MIT research study on the ethics of autonomous machines 
* [Quick Draw](https://quickdraw.withgoogle.com) - Google’s doodle machine learning database 
* [Creative Types](https://mycreativetype.com) - Adobe's persona based quiz

My goal is to create a fun experience in the vain of Google and Adobe’s projects but rooted in scientific research. The hope is that this becomes a self contained system that collects more creativity data, analyzes it, and serves as a platform for the general public to learn more about what has been discovered and more about themselves. 

This prototype features the first two phases of the planned final project with a simplified end result. 

# PROCESS

## Development

This project involves a lot of code on the back-end,which proved to be challenging as I don’t consider myself a programmer. 

The most exciting part was creating my own algorithm to parse user input. I want to be able to take lists of unique ideas and compare them to other lists in the database. This inherently requires some Natural Language Processing but for my initial pass I wanted to stay away from training any machine learning models. 

With the help of my partner Craig Einstein, the words are instead converted into numbers that the computer can more easily cross check. By looking for matching strings between phrases and can essentially decide similarity in this way. 

![vectorMatrix]

After running this algorithm the user will be presented two lists: one that is similar to the one they just generated, and one that is very different. 



## Design

The design process started with a general moodboard on Pinterest. I wanted the style to feel a little sci-fi but not too sterile. That's when I discovered the aesthetic of <b>retro futurism</b>. 

This felt like a fun ode to the precedents of creativity research which started in the 1950s, but hopefully in this new form of a dynamic web application we have modernized it!

![moodboard]

![wireframe]

![fontPairings]

![designs]

# NEXT STEPS

There was some difficulty trying to carry information about data from page to page. I'd like to reformat the website to dynamically change elements and styling on a single page. 

I have another phase planned! I'd like the user to enter a short answer of why they chose their selected list. This text would then be analyzed for references to past research in order to offer some explanations of what things might influence a person's subjectivity. (This bank of research might need its own database!)

I'd also like to move this to Heroku and have a really functioning live website. 

For now, I'm looking forward to some user testing to improve the experience. 

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

## References 

* Joey Lee 
* Craig Einstein 







