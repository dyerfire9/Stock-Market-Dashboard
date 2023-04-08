# Stock-Market-Dashboard 

This is a Stock Market System App where one can buy, sell and track stocks from all most exchanges.

## How to Run
Requirements
  - NodeJS
  - MongoDB Instance

1. Clone the Repo, then install dependencies
2. npm install
3. Open the .env file in the backend folder and add the following variables: 
    - PORT - The port that will host the server (ie: PORT=5000)
    - MONGO_URI - Mongo DB access URI
    - SECRET - JWT secret (random phrase)
4. cd into the backend folder and start local host server by typing: npm run dev 
5. open another terminal and cd into frontend server and start react app by typing: npm start
6. Please wait a few seconds until server is up and running.

## Note
- I had used polygon.io API to get stock data and is limited to 5 requests/min. Too many requests will result in data not displaying for 1 min
- Due to most API's requiring a monthly subscription in order to gain access to real time data, this app can only display daily stock data.
- There are two pages to this app, Stocks Dashboard and Daily Stocks. Both are displayed on the navbar.


## Author information
Muhammad Abdul Mannan (corresponding author and repository maintainer) <br />
Student - University of Toronto <br />
LinkedIn: www.linkedin.com/in/abdulmannancomp <br />
Website:  https://dyerfire9.github.io/portfolio-site/ <br />
Email: abdulmannancomp@gmail.com <br />
