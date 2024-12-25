# ⚽️ *KoraTime Platform*

Welcome to **KoraTime**, the ultimate web platform for football enthusiasts! 🏟️ From reserving football fields to managing teams and fostering social connections, KoraTime provides an all-in-one solution. Whether you're a player, captain, field manager, or admin, we’ve got something tailored for you.  

---

## 🚀 **Features at a Glance**

### 🏟️ **Field Reservation**  
- Search football fields by location and availability.  
- Reserve 1-hour slots with ease.  
- Track your booking history.  

### 👥 **Team Management**  
- Create and join teams.  
- Assign roles like captain, vice-captain, or player.  
- Analyze team performance and match stats.  

### 💬 **Social Features**  
- Manage friends and check their online/offline status.  
- Chat in real-time using private or group messaging.  

### 🛠️ **Admin Dashboard**  
- Add, update, or delete fields.  
- Assign field managers and oversee reservations.  
- View analytics and manage notifications.  

### 🏆 **Tournament Mode** *(Ramadan Exclusive)*  
- Organize and manage local tournaments.  
- Register teams and maintain match brackets.  

---

## 🧑‍💻 **User Roles and Permissions**

| **Role**           | **Permissions**                                                                 |
|---------------------|---------------------------------------------------------------------------------|
| **Regular User**    | Reserve fields, create teams, chat, send friend requests.                      |
| **Team Captain**    | Manage team members, plan matches, view team stats.                           |
| **Field Manager**   | Oversee field operations and schedules.                                       |
| **Admin**           | Manage users, fields, analytics, and tournaments.                             |

---

## 🛠️ **Technology Stack**

### **Frontend**  
- 🖥️ Framework: [Next.js](https://nextjs.org/)  
- 🎨 Styling: [Tailwind CSS](https://tailwindcss.com/)  
- 🔄 Real-Time Updates: [Socket.io](https://socket.io/)  

### **Backend**  
- 🚀 Framework: [NestJS](https://nestjs.com/)  
- 🗄️ Database: [MongoDB](https://www.mongodb.com/)  
- 🔐 Authentication: [JWT](https://jwt.io/)  
- 🔄 Real-Time Communication: [Socket.io](https://socket.io/)



### ***🛠️ Setup and Installation***

Prerequisites
Node.js (v16+ recommended)
MongoDB
Docker (optional for containerization)

**Prerequisites**

- Node.js (v16+ recommended)  
- MongoDB
- Docker (optional for containerization)


### Installation Steps
1. Clone the repository:
   
   ```bash
   git clone https://github.com/mohammed-rharbi/KoraTime.git
   cd KoraTime

3. Install Dependencies:
 - Backend
   
   ```bash
    cd frontend
    npm install
   
 - Frontend
   
   ```bash
    git clone https://github.com/mohammed-rharbi/KoraTime.git
    cd KoraTime


 
### **🔐 Environment Variables**  
Create `.env` files for both frontend and backend.  

 #### **Frontend (`frontend/.env`)**
    ```plaintext
      NEXT_PUBLIC_API_URL=http://localhost:5000/api
      SOCKET_URL=http://localhost:5000

 #### **Backend (`backend/.env`)**  
     ```plaintext
      MONGO_URI=mongodb://localhost:27017/kora-time
      JWT_SECRET=your_jwt_secret

 **Run the Application**
- Frontend
  
  ```bash
     npm run dev
  
- Backend
  
  ```bash
     npm run start:dev


 **Access the Application**
 
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api


### **🛡️ Security** 
🔐 JWT Authentication: Ensures secure access.
🛠️ RBAC: Role-based access control tailored for each user type.
✅ Data Validation: Input validation using class-validator.


### **🧪 Testing**
Types of Tests
🧩 Unit Testing: Test individual modules (services and controllers).
🔗 Integration Testing: End-to-end tests for booking and team management.
📈 Performance Testing: Real-time chat performance with Socket.io.

**Run Tests**

    npm run test

## **🌐 Deployment**
***Dockerized Application***
- 🐳 Fully Dockerized frontend and backend for easy deployment.
- 🚀 CI/CD integration with GitHub Actions.
  
**Docker Commands**
- Build Images
  
   ```bash
     docker-compose build
   
- Run Container
  
   ```bash
     docker-compose up


### **🤝 Contributing**
***We welcome contributions! Please follow the CONTRIBUTING.md guidelines.***

### **📧 Contact**
***For queries or support, reach out to***

- Email: support@koratime.com
- GitHub: KoraTime Repository






