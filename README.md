# SwiftCart
Introduction
SwiftCart is a modern e-commerce application designed to provide a seamless shopping experience. This application allows users to browse products, view product details, filter and sort products, and manage a shopping cart. The application is built using Vue.js and integrates with a RESTful API to fetch product data.

# Technologies Used
Vue.js: A progressive JavaScript framework used for building the user interface.
Vue Router: The official router for Vue.js that allows navigation between different views or pages in the application.
Vuex (optional): State management library for Vue.js applications.
Tailwind CSS: A utility-first CSS framework for styling the application.
Axios: A promise-based HTTP client for making requests to the REST API.
ESLint: A tool for identifying and fixing problems in JavaScript code.

# Setup Instructions
Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.
npm or yarn: Package managers that come with Node.js.

# Clone the Repository
bash
Copy code
git clone https://github.com/your-username/swiftcart.git
cd swiftcart

 # Install Dependencies
bash
Copy code
npm install
# or
yarn install

# Configure Environment
If your application requires environment variables, create a .env file in the root directory and add the required variables. For example:

arduino
Copy code
VUE_APP_API_URL=https://fakestoreapi.com

# Run the Development Server
bash
Copy code
npm run serve
# or
yarn serve
The application will be available at http://localhost:8080 by default.

# Build for Production
bash
Copy code
npm run build
# or
yarn build
The production-ready build will be output to the dist directory.

# Usage Examples
Navigating the Application
Home Page: Displays a list of products with options to filter and sort.
Product Detail: Click on a product to view detailed information, including its description, price, and ratings.
Search: Use the search bar to find products by name or title.
Favorites: Toggle the favorite status of products to easily access them later.
Cart: Add products to your cart and manage them.
Example API Requests
The application fetches product data from the following endpoints:

Fetch All Products: GET https://fakestoreapi.com/products
Fetch Product Details: GET https://fakestoreapi.com/products/:id
Fetch Product Categories: GET https://fakestoreapi.com/products/categories