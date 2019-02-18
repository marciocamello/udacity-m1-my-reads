# MyReads Project 

### UDACITY React Developer

## Description

MyReads is an application where you can categorize your books into separate shelves. Home
You can search through your book in the search page, and add the chosen shelf.
In doing so, the book will be removed from the library, and will go to the bookshelf on the main page.
Where are the top 3 shelves, Current Reading, Want to Read and Read.
You can at any time change the book of books or return the library.

## Features

* List shelves categorized in main screen <br>
  
   - Current Reading <br>
   - Want To Read <br>
   - Read <br>

* Button to move the book from one bookcase to another

* Search page for most searched terms
   - Common Terms<br><br>
    ```bash
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat',
    'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
    'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
    'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
    'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
    'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
    'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh',
    'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ```
    
## Developer

### Structure

```
├── README.md - This file.
├── cypress # Is a tool to test this application
├── docs # Is a tool to generate docs using VuePressJS
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── api/BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── components # Helpful images for your app. Use at your discretion.
    │   ├── Book.js # Is a component to show a single book in ShelfList
    │   ├── Loading.js # Custom loading to use in async requests
    │   ├── NavBar.js # Default nav component to Home and SearchBooks
    │   ├── SearchBooks.js # Page to search books by terms
    │   ├── SearchInput.js # Single component to generated a input to search
    │   ├── Shelf.js # Show a single shelf and your books
    │   ├── ShelfList.js # Show all shelves and all books by shelf category
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Instructions to Run Application

### Install Dependencies

```bash
npm i or yarn
```

### Run application

- Development

```bash
npm run start or yarn start
```

- Access to development Application

```bash
http://localhost:3000
```

- Production

```bash
npm run build or yarn build
```

This folder .build has generated, here contain your production files, and you can upload to your server. 

## Instructions to Run Tests

```bash
npm run cypress or yarn cypress
```

After open cypress tab, you can choice any test to run or run all tests to this application

## Instructions to Generate Docs by VuePressJS

- Development

```bash
npm run dev-docs or yarn dev-docs
```

- Access to development docs

```bash
http://localhost:8081
```

- Production

```bash
npm run build-docs or yarn build-docs
```

The docs files is generated in ./build/static/docs

- Access to production Application

```bash
http://your_host/docs
```

- Deploy docs

```bash

# navigate into the build output directory
cd ./build/static/docs

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

```

