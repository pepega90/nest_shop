# nest_shop E-Commerce Microservices Platform

This is a microservices-based e-commerce platform built using the NestJS framework. It leverages a distributed architecture with Kafka as the message broker and PostgreSQL as the database for each service. The platform features user authentication, a cart and wishlist system, order processing, and payment integration. The `user_service` acts as a gateway, routing requests to the `product_service` and `shopping_service`. This architecture allows all services to be accessed through the `user_service`.

## Features

- **User Authentication**: Secure user registration and login with JWT.
- **Product Management**: Add, edit, and manage product listings.
- **Cart & Wishlist**: Users can add products to their cart or wishlist for future purchase.
- **Order Processing**: Create and track orders for products added to the cart.
- **Scalable Architecture**: Built with a microservices pattern for scalability and maintainability.
- **Kafka Integration**: Kafka is used as the message broker for reliable, asynchronous communication between services.
- **PostgreSQL**: Each service has its own isolated database for data storage and management.

## Services

### User Service (Gateway)
- **Description**: Handles user registration, authentication, and acts as a gateway, routing requests to the `product_service` and `shopping_service`.

### Product Service
- **Description**: Manages product listings, including adding, editing, and deleting products. Requests are routed through the `user_service`.

### Shopping Service
- **Description**: Manages cart, wishlist, and order processing, including payment integration. Requests are routed through the `user_service`.

## Communication

- **Message Broker**: Kafka is used for message-based communication between services. Each service publishes and subscribes to relevant Kafka topics for event-driven interactions, such as order creation, payment updates, and product stock management.
- **Gateway**: The `user_service` acts as a gateway for routing requests to the `product_service` and `shopping_service`. These services do not expose their own ports, relying on the gateway to handle external requests.

## Monitoring and Metrics
The platform includes monitoring and observability tools to ensure reliable operation and performance tracking:

- **Prometheus**: Collects real-time metrics from the services, such as request counts, response times, and error rates.
- **Grafana**: Provides a dashboard to visualize the metrics collected by Prometheus.

## Getting Started

### Prerequisites

To run this project, ensure that you have the following installed:

- Node.js (>=14.x)
- NestJS (7.x or 8.x)
- Kafka
- PostgreSQL
- Docker (optional, for easier setup)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/pepega90/nest_shop.git
    cd nest_shop
    ```

2. Set up the environment variables:

    Create a `.env` file in each service directory with the necessary configurations. For example:

    ```env
    DATABASE_URL=postgres://username:password@localhost:5432/user_service_db
    KAFKA_BROKER=localhost:9092
    ```

3. Install dependencies for each service:

    - **User Service**:
        ```bash
        cd user_service
        npm install
        ```

    - **Product Service**:
        ```bash
        cd ../product_service
        npm install
        ```

    - **Shopping Service**:
        ```bash
        cd ../shopping_service
        npm install
        ```

4. Start Kafka and PostgreSQL (if using Docker):

    ```bash
    docker-compose up -d
    ```

5. Run the services:

    - **User Service** (acts as a gateway):
        ```bash
        cd user_service
        npm run start:dev
        ```

    - **Product Service** and **Shopping Service**: These services are accessed via the user_service gateway and do not need to expose their own ports.

## Running the Application

After setting up and running the services, you can access the platform through the `user_service` at `http://localhost:3000`. The gateway will route requests to the relevant microservices (product and shopping services).

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
