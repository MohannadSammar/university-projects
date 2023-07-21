# Tech Tinder

## Quick Start Guide

There are 2 ways to start the Tech-Tinder system:

1. Docker Compose
2. Lerna Monorepo

### Docker Compose

To start the System via docker-compose, you need to run the command `docker-compose up --build` for the first time. After the initial start, a `docker-compose up` will be enough.
This will start the Frontend with the port `3000`, the backend with the port `3010` and a MySQL database with the local port `3307`.

### Monorepo starter-guide

If you decide to start the system via the Lerna monorepo you need to follow the next steps:

_IMPORTANT before starting:_

- Make sure to duplicate the /packages/backend/.env.example and also duplicate the /packages/backend/.env and fill in the appropriate information
- You need a local Database

1. `nmp i`
2. `npm run init`
3. `npm run watch` or `npm start` (before start run `npm run build`)

### After initial start

If you initially start the system, you need to migrate and fill the database. To achieve this, follow the next steps:

1. Run `docker-compose exec backend npm run schema:sync` if you are using docker or `npm run schema:sync` if you are using Lerna
2. Run `docker-compose exec backend npm run fixtures` if you are using docker or `npm run fixtures` if you are using Lerna

Now you should be good to go! Have fun!

## Api Tests

You can run the tests using docker via `docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml up` or using lerna via `npm run test`.

## Backend

The backend runs with Typescript and Node.js with an Express.js Webserver. The Backend is responsible for talking an managing the database as well as the communication eBay API for live price and product data.

### API Endpoints

You can have a look in our Postman-Collection,which is found in the file `TechTinder.postman_collection.json`. We've documented all our API endpoints there. You also can visit the online postman documentation [here](https://documenter.getpostman.com/view/10481608/UVkjwxv8).

### Main Components

The backend can be split into the following segments, each representing a part of the API.

#### Product

The product logic is the heart of the system. It is responsible for:

| Route                     | Description                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /products/search/:keyword | Searching products with all its variants                                                                                                                                                                                                                                                                            |
| /products/:id             | Providing details about a Product including: attributes, review count, likes and all of its variants                                                                                                                                                                                                                |
| /products/:id/offers      | Get offers for products which currently talks only to the Ebay-Api, but it would be possible to extend this with more providers. This returns information about offers and prices and can be paginated                                                                                                              |
| /products/cards           | Get product cards. This will return 3 random cards and information about the like count and more. This request is paginated too and can be seeded to ensure to get always the next matching products in chain. You can also put a selected product at position 1 in the chain or filter the products to a category. |
| /products/:id/like        | A user can like a product. By providing a valid product id, it will store a user <--> product relation, thus liking the specific product. The same product can be liked by the user only once.                                                                                                                      |
| /products/:id/dislike     | A user can "un-like" a product, releasing the relation between user <--> product, when providing a valid product id. A user can only "un-like" products he previously liked. Likes do not go into negative - there are no "dislikes".                                                                               |

#### Auth

The auth system is responsible for:

| Route           | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| /signup         | A user can sign up to Tech Tinder. After the sign-up, the user is automatically logged in |
| /login          | A registered user can log in.                                                             |
| /logout         | Invalidates the auth token, so the user is logged out                                     |
| /updatepassword | Allows the user to change his password                                                    |

##### Auth Token

If you log in, you will receive a JWT token in your response, but also an HTTP-only cookie. You can use the Authentication with `Bearer {token}`. The other way is to attach the cookie to the request, which is more comfortable and works just fine.

##### Protect Middleware

The protect-middleware can be used before the controller to ensure that the user is logged in. If so, the user object will be added to the request object. It can be accessed by `req?.user`.

#### Category

The category system is responsible for:

| Route                    | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| /categories              | All Categories which are available in the database will be shown |
| /categories/:id/products | All Products of an specific Category will be shown               |

#### Review

The review system is responsible for:

| Route        | Method | Description                          |
| ------------ | ------ | ------------------------------------ |
| /reviews     | Post   | A review to a product can be created |
| /reviews     | Patch  | A specific review can be updated     |
| /reviews/:id | Delete | A specific review can be deleted     |

#### Variant

The variant system is responsible for:

| Route                 | Method | Description                                                   |
| --------------------- | ------ | ------------------------------------------------------------- |
| /variants/:id/reviews | Get    | Get all reviews for a variant by providing a valid id         |
| /variants/:id/offers  | Get    | Get eBay product offers for a variant by providing a valid id |

# Instructions for using the frontend

## used technologies

the frontend uses nextJS, which can be either run locally from packages/frontend or through the monorepo as shown above.
For styling, we use styled-components.

## Signup + Login

press the login button on the main screen.
If you are not Signed Up already, click on SignUp on the bottom of the card to fill in your details.
You will be logged in automatically after signing up.
Entering any other pages is prohibited without loggin in.

## Navigating through the app

in the header you will find multiple links to our different pages.
those pages are: 

| Navigation Tab  | What it does                                                                  | additional in Mobile Header  | what it does           |
| --------------- | ----------------------------------------------------------------------------- | ---------------------------- | ---------------------- |
| TeXus Logo      | routes to home page.                                                          | mini- profile picture        | routes to profile page |
| Search          | routes to Search page, wher you can search for a specific product or category |                              |                        |
| Swipe           | routes to Swipe page, where you can explore random products from our DB       |                              |                        |
| Upload Tex      | routes to the TeX / Review Upload, where you can create a Review              |                              |                        |
| Profile         | routes to the Profile page, where you have access to all userData             |                              |                        |
| Support         | routes to the Support page, where you can find the most f.a.q.                |                              |                        |

access the pages in web via clicking on a navigation tab, or in mobile, by clicking on the 3 stripes menu and the appearing nagivation tabs.

you can also find navigation links to the footer:

| Mobile Footer     | Web Footer                     |
| ------------------| -------------------------------|
| Magnifying Glass  | routes to the search page      |
| Heart             | routes to your liked products  |
| Tx logo           | routes to your written TeX     |


## take a look at your profile

Your profile is the place to go to see which products you liked, check the reviews you already wrote and edit them, or to change your
profile picture and your password.


#### Product Card

The Product card is the Card which contains and shows the required information about the product, that includes
Amount of Likes -> how many people liked the product
Rating -> the avergae Rating giving to the prodduct shown by the amount of stars.
Cost -> How much the base model costs.
product name and Manufacturer name.
Addetionaly you have the option to Write a Review to the product by clicking on "Tex this Product" in the upper right corner of the Card.
When clicking on the icon in the lower middle area of the card, a menu opens on the left of the screen with differnet options
details:
Shows addetional Spec details to the product, aswell as different Variants of the products and thier Specs
reviews:
shows the different Reviews given to the Product from other users, including how much they rate the product.
Offers:
Shows where you can Accquire the Product and how much it would cost.


#### Small Product Card

As the name suggests this is a smaller version of the product card, the amount of information to this product is limited, it shows an image of the produc, the manufacturere name aswell as the product name and Rating.
in most cases the rating shows the Avergae Rating of the product.
the only unique area where this is not the case is in the "Tex page", the page where you see ur reviews, the Rating there shows what Rating you gave the Product instead.


#### Swiping

After you have logged in You can use the Header to Navigate, Click on "Search" to search for a specific product or Category where
you can start swipping similair products, or click on Swipe to start swipping on all avalible products without any filter, alternativly you click on the
magnifing glass in the mobile Version to directly navigate to the Search page, or click on the Hamburger menu to open the menu where you can Navigate to the Swipe page and swipe all products.
when u start swipping you can either Swipe to the right to like a product and save it to look at it later, or swipe to the left and ignore the current product.


#### Like a Product

See instructions Above on how to like a product.
You can always Navigate to your "Profile" and then "Likes" to land on the Page where you can see all the liked products first displayed as the Small Product Card.
In the Likes page you can Click on any of the Small Product Card you see there and it would show a The product card with all the Functionalities, Additionally there is a Heart Icon which u can click to unlike a Product, Not that the product gets removed from the likes when you leave the product via swipping Left, right or leaving the screen, This gives you the Ability to Re-like the product before moving to another product, in case it was by mistake.
as mentioned you can use the Arrows left and right to navigate ur other Likes Products.

#### TeX / Review

To navigate to the "TeX" Page which is the page where the user can see all of the Reviews which they have written, the user has to navigate to Profile then to "Your TeX", on Mobile you can use the Tx icon in the bottom right.
There you are Greated with all the Products that you have written in a ##Small Product Card## Form, You can Click on a product to Expand the Small Product Card to a bigger card, where you again see the Product name and picture aswell as ur own Review.
From there you have the option to Delete the product by clicking on the garbage can Icon, you can Exit the screen, by clicking on the X Icon, or you can edit the Review by clicking on the Edit Icon.
When clicking on the Edit, you can Edit the Text Areas, note that they can be Empty, and give the Product a new Rating, when done Editing you click on the "Check" icon to save the new review, incase the user has deciede to note save the new Review, they can Click on the Backarrow icon to discard all the Changes to the review.
From the Tex page you can also Go directly to the Page where you can upload a new Tex.

#### Upload a TeX.

First you have to search for a Product, after that you can see all the Products that match ur Search, if the Item doesnt Exist, then nothing gets shown.
after finding the Target Product, you can Click on it and get greeted by the Review screen, then you can write a REview for the Product and click on Save and then you can see the Reviwed product in the Tex Page.