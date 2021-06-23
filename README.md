# we-friendly 

we-friendly is a crowd-sourced hub for voices from communities to share insight into which spaces are respectful, accessible and affirming! Find businesses and services that are -friendly toward folx who share aspects of YOUR lived experience. Discover what it's like to be visible in these spaces, and choose your favorite local venues to express your authentic self. Transform places in your community to be your own - to be welcoming to others like you. Make sure your community is supporting businesses and services that support people like you - however you identify. Then, when you travel, use we-friendly to find -friendly folx - even in unfamiliar locations. Together, we have financial power, so make your dollar count by supporting local businesses and services that support folx like you - near or far from home!


### 1. Working Prototype
You can access a working prototype of the React app here: https://we-friendly.vercel.app/ and Node app here: https://we-friendly.herokuapp.com/



### 2. User Stories
This app is for two types of users: a visitor and a logged-in user.

##### Landing Page/Sign Up Page
* as a visitor,
* I want to sign up for an account,
* so I can view and write reviews

##### Landing Page/Log In Page
* as a visitor,
* I want to log into a demo account,
* so I can try out the app

##### Landing Page/Log In Page
* as a logged-in user,
* I want to log into my account,
* so I can search for and write reviews

##### Reviews Page
* as a logged-in user,
* I want to search for reviews by business name, zipcode, state, category and/or identity group,
* so I can find reviews of relevant businesses and services where I can have positive experiences

##### Businesses Page
* as a logged-in user,
* I want to search for businesses and services by name, zipcode state and/or category,
* so I can review businesses/services I have visited, and visit ones from the Reviews Page

##### Businesses Page
* as a logged-in user,
* I want to click on link buttons for each business or service
* so I can add a business or write a review

##### me-friendly Page
* as a logged-in user,
* I want to view, edit and delete reviews I have written,
* so I can manage the reviews I write

##### me-friendly Page
* as a logged-in user,
* I want to view and edit businesses and services I have added to the database,
* so I can follow a link to write a review

##### Add Review Page
* as a logged-in user,
* I want to write and post reviews 
* To share my experiences with other users

##### Add Business Page 
* as a logged-in user,
* I want to add information for businesses and services
* so that other people and I can review them

##### Edit Review Page
* as a logged-in user,
* I want to edit my previous reviews
* in case I made errors or have had a different experience

##### Edit Business Page
* as a logged-in user,
* I want to edit businesses and services I have added
* in case I made errors, or something has changed about their contact information



### 3. Functionality
The app's functionality (v1.0) includes:
* All users can access a demo account to try the app.
* All users can create an account.
* All users can click on contact information links for the app creator.
* Logged-in users can search for reviews by business name, zipcode, state, category and/or identity group. 
* Logged-in users can search for businesses and services by name, zipcode, state and/or category.
* Logged-in users can read all reviews, write reviews, and edit and delete the reviews they have written.
* Logged-in users can view details about, save and add businesses/services, and edit details for businesses they have added.
* Logged-in users can navigate between the Landing, Reviews and Businesses pages, and their Saved page - using top navigation.
* Logged-in users can log out to return to the Landing page.
* All users can use accessibility features such as text-to-speech and navigation via keyboard.



### 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, PostgreSQL
* Development Environment: Heroku, DBeaver



### 5. Wireframes
Landing Page
:-------------------------:
![Landing Page](/github-images/wireframes/landing-page.jpeg)
Sign Up Page
![Sign Up Page](/github-images/wireframes/sign-up-page.jpg)
Log In Page
![Log In Page](/github-images/wireframes/log-in-page.jpeg)
Reviews Page
![Reviews Page](/github-images/wireframes/reviews.jpg)
Businesses Page
!["Businesses Page"](/github-images/wireframes/businesses.jpeg)
"me-friendly" Page 
![me-friendly Page](/github-images/wireframes/me-friendly.jpg)
Add Review
![Add Review](/github-images/wireframes/add-review.jpg)
Edit Review
![Edit Review](/github-images/wireframes/edit-review.jpg)
Add Business
![Add Business](/github-images/wireframes/add-business.jpeg)
Edit Business
![Edit Business](/github-images/wireframes/edit-business.jpeg)




### 6. Front-end Structure - React Components Map
* __index.js__ (stateless)
    * __App.js__ (stateful)
        * __Landing.js__ (stateless)
            * __LogIn.js__ (stateful)
            * __SignUp.js__ (stateful)
            * __Nav.js__ (stateless)
            * __Businesses.js__ (stateful)
                * __AddBus.js__ (stateful)
                * __EditBus.js__ (stateful)
                * __SearchBus.js__ (stateful)      
            * __Reviews.js__  (stateful)
                * __AddRev.js__ (stateful)
                    * __RatingStars.js__ (stateful)
                * __EditRev.js__ (stateful)
                * __SearchRev.js__ (stateful)
            * __MeFriendly.js__ (stateful)
                * __RevBy.js__ (stateful)
                * __BusAdded.js__ (stateful)
                * __Remember.js__ (stateful)



### 7. Back-end Structure - Business Objects
* Users (database table)
    * id (auto-generated)
    * username (at least 3 characters, validated for uniqueness)
    * password (at least 8 chars, at least one alpha and one number validation)
    * name (full name, at least 3 chars)
* Businesses (database table)
    * id (auto-generated)
    * user_id (foreign key to users table)
    * adder_id (foreign key to users table)
    * category (from enum business_type type)
    * name (at least 3 characters)
    * address (VARCHAR(255)),
    * city (VARCHAR(255) NOT NULL)
    * state (from enum state_district_territory type NOT NULL)
    * zipcode (5 characters)
    * website (VARCHAR(255), validated for url)
* Reviews (database table)
    * id (auto-generated)
    * reviewer_id (foreign key to users table)
    * business_id (foreign key to businesses table)
    * date_modified (TIMESTAMPTZ NOT NULL DEFAULT now)
    * friendly_for (from enum identity_group type)
    * rating (1-5, NOT NULL)
    * review (VARCHAR(255) NOT NULL)


    



### 8. API Documentation
#### API Overview 
```text
    /api
    .
    ├── /auth
    │   └── POST
    │       ├── /login
    ├── /users
    │   └── POST
    │       └── /
    ├── /businesses
    |   └── GET
    |       ├── /
    |       ├── /:business_id
    |       ├── /added-by-me/:adder_id
    |   └── POST
    |       ├── /
    |   └── PATCH
    |       └── /:business_id
    ├── /reviews
    |   └── GET
    |       ├── /
    |       ├── /:review_id
    |       ├── /written-by-me/:reviewer_id
    |   └── POST
    |       ├── /
    |   └── DELETE
    |       ├── /:review_id
    |   └── PATCH
    |       └── /:review_id
    
```

##### POST `/api/auth/login`
```js
    // req.body
    {
        "name": "Cowardly Lion",
        "password": "Friendly1",
        "username": "KingOfTheForest"
    }

    // res.body
    {
        "authToken": String,
        "userId": 1
    }
```

##### POST `/api/users`
```js
    // req.body
    {
        "name": "Cowardly Lion",
        "password": "Friendly1",
        "username": "KingOfTheForest"
    }

    // res.body
    {
        "name": "Cowardly Lion",
        "password": "Friendly1",
        "username": "KingOfTheForest"
    }
```

##### GET `/api/businesses`
```js

    // res.body
    [
        {
            "id": 8,
            "adder_id": 1,
            "category": "restaurant/bar",
            "name": "Woodstar Cafe",
            "address": "60 Masonic Street",
            "city": "Northampton",
            "state": "MA",
            "zipcode": "01060",
            "website": "woodstarcafe.com"
        },
        {
            "id": 9,
            "adder_id": 2,
            "category": "shopping",
            "name": "Cedar Chest",
            "address": "150 Main Street",
            "city": "Northampton",
            "state": "MA",
            "zipcode": "01060",
            "website": "explorecedarchest.com"
        },
        {
            "id": 10,
            "adder_id": 3,
            "category": "hotel/accommodations",
            "name": "The Colonel Williams Inn",
            "address": "111 Staver Road",
            "city": "Brattleboro",
            "state": "VT",
            "zipcode": "05344",
            "website": "thecolonelwilliamsinn.com"
        },
        {
            "id": 11,
            "adder_id": 1,
            "category": "service",
            "name": "Home Environmental Services",
            "address": "4 School Street",
            "city": "Westfield",
            "state": "MA",
            "zipcode": "01085",
            "website": "homeenvironmentalservices.com"
        },
        {
            "id": 12,
            "adder_id": 2,
            "category": "housing/realty",
            "name": "Mill Valley Estates",
            "address": "420 Riverglade Drive",
            "city": "Amherst",
            "state": "MA",
            "zipcode": "01002",
            "website": "millvalleyapts.com"
        },
        {
            "id": 14,
            "adder_id": 1,
            "category": "healthcare",
            "name": "Carroll McGrath APRN",
            "address": "234 Russell Street, Suite 203",
            "city": "Hadley",
            "state": "MA",
            "zipcode": "01035",
            "website": "www.psychologytoday.com/us/psychiatrists/carroll-mcgrath-aprn-hadley-ma/174408"
        },
        {
            "id": 16,
            "adder_id": 1,
            "category": "restaurant/bar",
            "name": "Thai Garden",
            "address": "2 Bridge Street",
            "city": "Northampton",
            "state": "MA",
            "zipcode": "01060",
            "website": "thaigardennorthampton.com"
        },
        {
            "id": 15,
            "adder_id": 1,
            "category": "restaurant/bar",
            "name": "Thai Garden",
            "address": "2 Bridge St",
            "city": "Northampton",
            "state": "MA",
            "zipcode": "01060",
            "website": "thaigardennorthampton.com"
        }
    ]
```

##### GET `/api/businesses/:business_id`
```js
    // req.query
        `/14`

    // res.body
    {
        "id": 14,
        "adder_id": 1,
        "category": "healthcare",
        "name": "Carroll McGrath APRN",
        "address": "234 Russell Street, Suite 203",
        "city": "Hadley",
        "state": "MA",
        "zipcode": "01035",
        "website": "www.psychologytoday.com/us/psychiatrists/carroll-mcgrath-aprn-hadley-ma/174408"
    }
```

##### GET `/api/businesses/added-by-me/:adder_id`
```js
    // req.query
        `/2`

    // res.body
    [
        {
            "id": 9,
            "adder_id": 2,
            "category": "shopping",
            "name": "Cedar Chest",
            "address": "150 Main Street",
            "city": "Northampton",
            "state": "MA",
            "zipcode": "01060",
            "website": "explorecedarchest.com"
        },
        {
            "id": 12,
            "adder_id": 2,
            "category": "housing/realty",
            "name": "Mill Valley Estates",
            "address": "420 Riverglade Drive",
            "city": "Amherst",
            "state": "MA",
            "zipcode": "01002",
            "website": "millvalleyapts.com"
        }
    ]
```

##### POST `/api/businesses/`
```js
    // req.body
    {
        "adder_id": 3,
        "category": "restaurant/bar",
        "name": "Whetstone Station",
        "address": "36 Bridge St",
        "city": "Brattleboro",
        "state": "VT",
        "zipcode": "05301",
        "website": "whetstonestation.com"
    }

    // res.body
    {
        "id": 17,
        "adder_id": 3,
        "category": "restaurant/bar",
        "name": "Whetstone Station",
        "address": "36 Bridge St",
        "city": "Brattleboro",
        "state": "VT",
        "zipcode": "05301",
        "website": "whetstonestation.com"
    }
```

##### PATCH `/api/businesses/:business_id`
```js
    // req.body
    {
        "adder_id": 3,
        "category": "restaurant/bar",
        "name": "Whetstone Station",
        "address": "36 Bridge Street",
        "city": "Brattleboro",
        "state": "VT",
        "zipcode": "05301",
        "website": "whetstonestation.com"
    }

    // res.body

```

##### GET `/api/reviews`
```js
    // req.query
        
    // res.body
    [
        {
            "id": 1,
            "reviewer_id": 1,
            "business_id": 8,
            "date_modified": "2021-09-30T04:00:00.000Z",
            "friendly_for": "LGBTQIA+",
            "rating": 5,
            "review": "Very queer friendly! And great coffee too"
        },
        {
            "id": 2,
            "reviewer_id": 2,
            "business_id": 8,
            "date_modified": "2021-09-30T04:00:00.000Z",
            "friendly_for": "LGBTQIA+",
            "rating": 5,
            "review": "I felt totally welcomed. Northampton rocks!"
        },
        {
            "id": 3,
            "reviewer_id": 3,
            "business_id": 9,
            "date_modified": "2021-09-30T04:00:00.000Z",
            "friendly_for": "Disabled persons",
            "rating": 3,
            "review": "I had to go out into Thornes to take the elevator to the second floor, and some of the displays were close together, but the staff were helpful!"
        },
        {
            "id": 5,
            "reviewer_id": 2,
            "business_id": 9,
            "date_modified": "2021-10-30T04:00:00.000Z",
            "friendly_for": "Women",
            "rating": 5,
            "review": "Fun store! I mostly only saw women in there!"
        }
    ]
```

##### GET `/api/reviews/:review_id`
```js
    // req.query
        `/2`
    // res.body
    {
        "id": 2,
        "reviewer_id": 2,
        "business_id": 8,
        "date_modified": "2021-09-30T04:00:00.000Z",
        "friendly_for": "LGBTQIA+",
        "rating": 5,
        "review": "I felt totally welcomed. Northampton rocks!"
    }
```

##### GET `/api/reviews/written-by-me/:reviewer_id`
```js
    // req.query
        `/3`
    // res.body
    [
        {
            "id": 3,
            "reviewer_id": 3,
            "business_id": 9,
            "date_modified": "2021-09-30T04:00:00.000Z",
            "friendly_for": "Disabled persons",
            "rating": 3,
            "review": "I had to go out into Thornes to take the elevator to the second floor, and some of the displays were close together, but the staff were helpful!"
        }
    ]
```

##### POST `/api/reviews/`
```js
    // req.body
    {
        "reviewer_id": 2,
        "business_id": 17,
        "date_modified": "2021-09-30T04:00:00.000Z",
        "friendly_for": "LGBTQIA+",
        "rating": 5,
        "review": "Beautiful looking over the river. I snuggled up with my partner and the server commented on how cute we looked."
    }

    // res.body
    {
        "id": 6,
        "reviewer_id": 2,
        "business_id": 17,
        "date_modified": "2021-09-30T04:00:00.000Z",
        "friendly_for": "LGBTQIA+",
        "rating": 5,
        "review": "Beautiful looking over the river. I snuggled up with my partner and the server commented on how cute we looked."
    }
```

##### DELETE `/api/reviews/:review_id`
```js
    // req.query
    `/4`

    // res.body
    
```

##### PATCH `/api/reviews/:review_id`
```js
    // req.body
    {
        "reviewer_id": 2,
        "business_id": 9,
        "date_modified": "2021-10-30T04:00:00.000Z",
        "friendly_for": "Women",
        "rating": 5,
        "review": "Great place to buy gifts! I mostly only saw women in there!"
    }
    // res.body
    {
        "id": 5,
        "reviewer_id": 2,
        "business_id": 9,
        "date_modified": "2021-10-30T04:00:00.000Z",
        "friendly_for": "Women",
        "rating": 5,
        "review": "Great place to buy gifts! I mostly only saw women in there!"
    }

```






### 9. Screenshots
Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page.png)
Sign Up Page
![Sign Up Page](/github-images/screenshots/sign-up-page.png)
Log In Page
![Log In Page](/github-images/screenshots/log-in-page.png)
Reviews
!["Reviews Page"](/github-images/screenshots/reviews.png)
Businesses
!["Businesses Page"](/github-images/screenshots/businesses.png)
"me-friendly"
!["me-friendly"](/github-images/screenshots/me-friendly.png)
Add Business
![Add Business](/github-images/screenshots/add-business.png)
Add Review
![Add Review](/github-images/screenshots/add-review.png)
Edit Business
![Edit Business](/github-images/screenshots/edit-business.png)
Edit Review
![Edit Review](/github-images/screenshots/edit-review.png)




### 10. Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* add functionality to allow users to sort search results by closest zipcode, highest rating, etc.
* add functionality on Reviews page to allow users to click on the name of each business or service being reviewed and link to the Businesses Page, to see details about that business
* add functionality on Businesses page to allow users to click on a link for each business or service and link to the Reviews Page, to see reviews for that business
* add functionality to allow users to save a list of businesses they want to remember to check out (or avoid)
* add functionality for users to retrieve forgotten log in information
* add functionality for users to upload pictures of businesses/services
* add functionality for users to like or comment on other user's reviews
* add functionality to follow favorite reviewers
* add functionality for users to connect with local events





### 11. How to run it 
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts 
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts 
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test