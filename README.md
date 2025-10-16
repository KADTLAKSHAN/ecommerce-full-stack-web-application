# 🛍️ Full-Stack eCommerce REST API (Java & Spring Boot)

This repository contains the complete backend solution for a scalable, secure, and feature-rich **eCommerce web application**. Built with modern **Java full-stack technologies**, this REST API provides all the necessary endpoints for user management, product catalog, shopping cart, order processing, and payment integration.

---

## 🌟 Features

- **Robust Security:** Implemented with **Spring Security 6** and **JSON Web Tokens (JWT)** for stateless, secure authentication and authorization.
- **Role-Based Access Control (RBAC):** Distinct roles for **Users** (customers), **Admins** (site management), and **Sellers** (third-party merchants).
- **Comprehensive eCommerce Core:**
  - **Product Management:** Admin/Seller capabilities to add, update, delete, and view products and categories.
  - **Shopping Cart:** Users can add, view, update quantities, and remove items from their cart.
  - **Order Management:** Users can checkout. Admin can manage all order statuses. Sellers can manage their specific orders.
- **Payment Integration:** Seamless payment processing using the **Stripe Payment Gateway**.
- **API Documentation:** Interactive and up-to-date API documentation generated using **Swagger/OpenAPI**.
- **API Testing:** Includes a **Postman Collection JSON file** for easy testing of all endpoints.
- **Data Persistence:** Efficient data handling using **Spring Data JPA** and **MySQL** database.

---

## 🛠️ Tech Stack

### Backend (REST API)

| Category        | Technology                          | Description                                                   |
| :-------------- | :---------------------------------- | :------------------------------------------------------------ |
| **Framework**   | **Spring Boot**                     | Production-ready and standalone Spring-based applications.    |
| **Security**    | **Spring Security 6 & JWT**         | Authentication, authorization, and secure stateless sessions. |
| **Data Access** | **Spring Data JPA** & **Hibernate** | Object-relational mapping and database interactions.          |
| **Database**    | **MySQL**                           | Reliable and widely-used relational database.                 |
| **API Docs**    | **Swagger/OpenAPI**                 | Automated, interactive API documentation.                     |
| **Payments**    | **Stripe**                          | Industry-standard payment processing platform.                |

### Frontend (Companion Project)

The companion frontend application (found in a separate repository or sub-directory) is built using:

- **Framework:** **React (with Vite)**
- **Styling:** **Tailwind CSS**
- **State Management:** **Redux**
- **UI Libraries:** **Material UI (MUI)**, **Headless UI**
- **Forms:** **React Hook Forms**
- **Utilities:** **React Icons**, **React Toast**

---

## 🚀 Getting Started

### Prerequisites

- **Java Development Kit (JDK) 17+**
- **Maven** (for dependency management)
- **MySQL Database** instance
- **Stripe Account** (for API keys)

### Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/KADTLAKSHAN/ecommerce-full-stack-web-application](https://github.com/KADTLAKSHAN/ecommerce-full-stack-web-application)
    cd ecommerce-full-stack-web-application
    ```

2.  **Database Configuration:**

    - Create a new MySQL database (e.g., `ecommerce_db`).
    - Update the `src/main/resources/application.properties` (or `application.yml`) file with your database credentials and connection details:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
    spring.datasource.username=your_mysql_user
    spring.datasource.password=your_mysql_password
    spring.jpa.hibernate.ddl-auto=update
    ```

3.  **API Key Configuration:**

    - Add your **Stripe Secret Key** and other necessary keys (like the JWT secret) to your configuration file:

    ```properties
    # Stripe API Key
    stripe.secret.key=sk_test_...

    # JWT Configuration
    jwt.secret=yourStrongSecretKeyForJWT
    ```

4.  **Run the application:**
    ```bash
    ./mvnw spring-boot:run
    # OR if using your IDE, run the main class (e.g., SbEcomApplication.java)
    ```

The application will start on `http://localhost:8080`.

---

## 🔬 API Testing

To quickly test and interact with the API endpoints, use the included Postman Collection.

### Using Postman

1.  **Download and Install Postman.**
2.  **Import the Collection:**
    - Navigate to the `Postman Collection JSON` folder (or where you saved it) and import the file: `ECommerce.postman_collection.json`.
3.  **Set Environment Variables:**
    - The collection is designed to use an environment variable for the server address. Make sure the variable `baseUrl` is set to your running API's address, typically: `http://localhost:8080`.
4.  **Run Tests:**
    - Start by executing the **Auth** endpoints (`/api/auth/register`, `/api/auth/login`).
    - After a successful login, the server will issue an authentication **cookie**. Postman automatically captures this cookie and stores it in its **Cookie Jar**, which will be sent with all subsequent requests to maintain your authenticated session. You can then test secured endpoints.

---

## 📄 Documentation Access

You have two ways to interact with the API documentation:

1.  **Swagger UI:** Access the interactive web interface (great for quick inspection and testing):
    **URL:** `http://localhost:8080/swagger-ui.html`

2.  **Postman Collection:** Use the imported JSON file for structured testing and workflow execution.

---

## 🔑 Key Endpoints & Roles

| Endpoint Group | Description                                                | Key Roles           |
| :------------- | :--------------------------------------------------------- | :------------------ |
| **Auth**       | User registration, login, and JWT token generation.        | ALL                 |
| **Products**   | CRUD operations for products and product categories.       | ADMIN, SELLER       |
| **Cart**       | Add, remove, update items in the user's shopping cart.     | USER                |
| **Orders**     | Place new orders, view order history, update order status. | USER, ADMIN, SELLER |
| **Payments**   | Initiate payment with Stripe.                              | USER                |

---

## 🤝 Contribution

Feel free to **fork** this repository, open **issues**, or submit **pull requests**. Contributions are welcome!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.
