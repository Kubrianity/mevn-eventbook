# eventbook
This project is called eventbook that you can create, update and cancel events as well as attending other events and connecting with attendees. 
## Technologies
***Front end***
* JavaScript
* Vue.js
* Bulma CSS

***Backend***
* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* Pug

***Testing***
* Ava

***Deployment***
* Heroku
* Docker



## Installation & Setup
In order to run this application locally, node.js, npm and mongodb should be installed on your computer and **mongodb should be running**
* Use the command below to clone this repository <br>
*git clone https://github.com/Kubrianity/eventbook-for-deployment.git* <br>
* Change the directory using the following command<br>
*cd backend* <br>
Inside this *backend* folder, create .env file and set an environment variable for session secret like this example: **SESSION_SECRET="YOURSESSIONKEY"**
* Install dependencies with **npm install** command. 
After installing dependencies, run the application for backend part with **node index.js** command <br>
* Then, navigate to frontend folder and install dependecies for this folder. Run the application for frontend part by running **npm run serve** command to view it in localhost
