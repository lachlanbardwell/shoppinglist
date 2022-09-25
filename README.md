### Shopping Cart App

Shopping cart app created using Create React App. Attempts to fetch data from a self-written backend API. If unsuccessful re-attempts to fetch from a cloned mock API in the front end. The users selected items, their quantities and costs are stored in context and can be viewed in the cart page, along with an accompanying image fetched from the Flickr API.

The project is hosted using an AWS lightsail instance with an Apache HTTP server. It is pipelined for continuous development through GitHub Actions.

To initialise project type

```
npm i
```

```
npm run start
```
