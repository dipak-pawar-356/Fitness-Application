# Fitness Application Microservices

Welcome! This is a microservices-based fitness application designed to help users track activities and get AI-powered recommendations for improving their fitness.  
The project is built using modern technologies like Spring Boot, React, MongoDB, RabbitMQ, and Eureka.

---

## 📁 Project Structure

```
fitness_application/
│
├── activityservice/         # Manages user fitness activities
├── aiservice/               # Generates AI-based recommendations
├── configserver/            # Centralized configuration for all services
├── eureka/                  # Eureka service registry for service discovery
├── fitness-app-frontend/    # React frontend for users
├── gateway/                 # API Gateway for routing and security
├── userservice/             # User registration and management
└── README.md                # Project documentation (this file)
```

---

## 🚀 What Does Each Folder Do?

### `activityservice/`
- **Purpose:** Handles all operations related to user fitness activities (create, update, fetch).
- **Main files:** Controllers, services, repositories for activities.

### `aiservice/`
- **Purpose:** Uses AI to generate personalized recommendations based on user activities.
- **Main files:** Listens to activity events, generates and stores recommendations.

### `configserver/`
- **Purpose:** Stores and serves configuration for all microservices from a central place.
- **Main files:** YAML config files for each service.

### `eureka/`
- **Purpose:** Service registry for microservices to discover each other (Eureka server).
- **Main files:** Eureka server setup.

### `fitness-app-frontend/`
- **Purpose:** The user interface built with React.
- **Main files:** React components, API service, Vite config.

### `gateway/`
- **Purpose:** API Gateway that routes requests to backend services and handles authentication.
- **Main files:** Gateway configuration and route definitions.

### `userservice/`
- **Purpose:** Manages user registration, authentication, and profiles.
- **Main files:** User controllers, services, repositories.

---

## 🛠️ How to Run the Project

1. **Start MongoDB** and **RabbitMQ** on your local machine.
2. **Start Eureka Server**  
   Go to `eureka/` and run the Eureka server.
3. **Start Config Server**  
   Go to `configserver/` and run the config server.
4. **Start Backend Services**  
   Start each of these: `activityservice/`, `aiservice/`, `userservice/`, `gateway/`.
5. **Start the Frontend**  
   Open a terminal in `fitness-app-frontend/` and run:
   ```bash
   npm install
   npm run dev
   ```
6. **Open the App**  
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧩 Technologies Used

- **Spring Boot** (Java) - Backend microservices
- **Spring Cloud** (Eureka, Config, Gateway) - Service discovery, config, and routing
- **MongoDB** - Database for storing users, activities, recommendations
- **RabbitMQ** - Messaging between services
- **React** - Frontend user interface
- **Vite** - Frontend build tool
- **Docker** (optional) - For containerization

---

## 📚 Where to Find This File

**This README.md is at the root of the project:**
```
d:\microservices\fitness_application\README.md
```
or just `/README.md` in your GitHub repository.

---

## 🤝 Contribution

Everyone is welcome to contribute!  
- Fork the repo, make your changes, and submit a pull request.
- For questions or issues, open a GitHub issue.

---

## 📄 License

This project is licensed under the MIT License.

---

**Enjoy building and using the Fitness Application!**