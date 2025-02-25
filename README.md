🛒 Shopping Cart Application
A Next.js frontend application that manages a shopping cart with real-time updates using GraphQL and Apollo Client. The app integrates with a backend that periodically changes product availability and notifies clients about these changes. Users are always informed about cart modifications and must acknowledge changes before proceeding.

🚀 Features
Real-Time Cart Updates: Uses GraphQL subscriptions to detect changes in cart items.

User Notifications: Notifies users when:

An item goes out of stock (ITEM_OUT_OF_STOCK).

An item's quantity is reduced (ITEM_QUANTITY_UPDATED).

Cart Management:

Add, remove, and update item quantities.

Display and manage the cart in real-time.

Validation: Ensures all inputs are validated using Zod before making GraphQL mutations.

Authentication: Next.js middleware

🛠️ Tech Stack
Framework: Next.js

State Management: Zustand

GraphQL Client: Apollo Client

Validation: Zod

Styling: Tailwind CSS (or your preferred CSS framework)

Real-Time Updates: GraphQL Subscriptions

🧩 Key Components

1. Cart Management
   CartItem: Displays a single cart item with options to update quantity or remove the item.

CartList: Lists all items in the cart and the total cost and summary of the cart.

2. Product Management
   ProductCard: Displays product details and an "Add to Cart" button.

ProductList: Fetches and displays a list of products.

3. Real-Time Updates
   Uses GraphQL subscriptions to listen for changes in product availability and cart items.

Notifies users when:

An item goes out of stock.

An item's quantity is reduced.

4. Validation
   Uses Zod to validate inputs before making GraphQL mutations.

Ensures data integrity and provides meaningful error messages.

🛠️ Setup

Prerequisites:
Node.js (v18 or higher)
npm or yarn

Installation

Clone the repository:

bash
Copy
git clone https://github.com/nodi100/Simple-Shop-App.git

Navigate to the project directory:

bash
Copy
cd Simple-Shop-App

Install dependencies:

bash
Copy
npm install

# or

yarn install

Environment Variables
Create a .env.local file in the root directory and add the following variables:

env
Copy
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://take-home-be.onrender.com/api
NEXT_PUBLIC_WS_ENDPOINT=wss://take-home-be.onrender.com/api

Run the Application
Start the development server:

bash
Copy
npm run dev

# or

yarn dev
Open your browser and navigate to http://localhost:3000.

🚀 Deployment
Build the Application
Generate an optimized production build:

bash
Copy
npm run build

# or

yarn build
Start the Production Server
Run the production build:

bash
Copy
npm start

# or

yarn start
