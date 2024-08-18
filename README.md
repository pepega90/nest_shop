is a microservices-based e-commerce platform built using the NestJS framework. It leverages a distributed architecture with Kafka as the message broker and PostgreSQL as the database for each service. The platform features user authentication, a cart and wishlist system, order processing, and payment integration. The user_service acts as a gateway for routing requests, as individual microservices do not expose their own ports directly in this architecture.

## Features

- User Authentication: Secure user registration and login with JWT.
- Product Management: Add, edit, and manage product listings.
- Cart & Wishlist: Users can add products to their cart or wishlist for future purchase.
- Order Processing: Create and track orders for products added to the cart.
- Scalable Architecture: Built with a microservices pattern for scalability and maintainability.
- Kafka Integration: Kafka is used as the message broker for reliable, asynchronous communication between services.

## Services

### User Service
- **Port**: 4000
- **Technology**: Elixir, Phoenix, GenServer
- **Database**: user_service_db

### Wallet Service
- **Port**: 4001
- **Description**: Manages wallet operations such as top-ups and transfers.
- **Technology**: Elixir, Phoenix
- **Database**: wallet_service_dev

## Communication

- **Message Broker**: RabbitMQ (using Broadway for message processing)
- The gateway service sends messages to RabbitMQ, which routes them to the appropriate service (User Service or Wallet Service).

## Monitoring and Metrics
The application includes monitoring and observability tools to ensure reliable operation and performance tracking:

- **Prometheus**: Collects real-time metrics from the services, such as request counts, response times, and error rates.
- **Grafana**: Provides a dashboard to visualize the metrics collected by Prometheus.

## Getting Started

### Prerequisites

- Elixir
- Phoenix Framework
- RabbitMQ
- Broadway
- Prometheus
- Grafana
- Docker (optional, for easier setup)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/pepega90/wallet_microservices.git
    cd walletwave
    ```

2. Set up User Service:
    ```bash
    cd user_service
    mix deps.get
    mix ecto.setup
    ```

3. Set up Wallet Service:
    ```bash
    cd ../wallet_service
    mix deps.get
    mix ecto.setup
    ```

4. Run RabbitMQ (if using Docker):
    ```bash
    docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```

### Running the Services

1. Start the User Service:
    ```bash
    cd user_service
    mix phx.server
    ```

2. Start the Wallet Service:
    ```bash
    cd ../wallet_service
    mix phx.server
    ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
