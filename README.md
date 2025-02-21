# nooro-api

A Nooro API built with **Express.js**, **Prisma ORM**, and **MySQL**.

---

## Setup Instructions

### Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git

cd your-repo
```

### Install Dependencies
```sh
npm install
```

### Environment Variable
```sh
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
PORT=5000
```

### Start MySQL

### Run Prisma
```sh
npx prisma generate
npx prisma migrate dev --name init
```

### Run Server
```sh
npm run dev
```