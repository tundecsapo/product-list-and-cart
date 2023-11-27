# Dummy Store Demo: Product List and Cart pages

This project is built upon React + TypeScript + Vite + Material UI.

## How to get started?

- Clone the repository
- Open the project folder in your IDE
- Install the dependencies by running: ***npm i***
- After installation is complete, run the project by: ***npm run dev***

### Lint

- You can check if there is any linting issues by running: ***npm run lint***

### Jest Test

- You can run some unit and snapshot tests by running: ***npm run test***

### Build

- To build the project, please run: ***npm run build***

### How the project should look like?

#### /PRODUCTS

- After running ***npm run dev***, the project should run on: http://localhost:5173/

- You can reach the /products page by clicking on the "Products" on the top navigation bar. In mobile view, you should click the hamburger icon first. (The product page is also the default page that loads when you arrive at the main page.)
- On the product page you should be able to see a list of products that are being fetched from a mockAPI.
- There is a pagination at the bottom of the page that you can use to change the page number or the number of products per page. The changes in the pagination update the URL parameters. However, the pagination itself is happenning by anually splitting up the productList as the current mockApi can't handle size and page parameters.
- You can add the preferred products into your cart the following way:

1. Click on the "Add Cart" button and the amount that is visible on the product's card will get moved to your cart.
2. You can increase or decrease the quantity by clicking on the +/- signs or manyally typing a number, then clicking on the "Update" button.
3. The amount can't be lower than the minimumAllowedAmount, and can't be higher than the availableAmount. You can find the exact amounts in a Tooltip if you hover over the +/- icons.
4. You can remove the whole quantity from your cart if you click on the "Remove" button at the bottom of the product's card.

#### /CART

1. On the right top corner on the screen you can see the cart icon, with a badge over it, that shows the amount of products that are in the cart.
2. If you click on the cart icon, you can see a short preview of your cart's content.
3. If you want to empty your cart, you shouls click on the "Clean Cart" button in the cart preview.
4. You can navigate to the /cart page by clicking on the "View Cart" button.
5. On the /cart page you can see the list of all your selected products, with the desired quantities, the subtotal price for each product type and the total price that you have pay.
6. You also have a chance to increase of decrease the quantities for each product in this page.
