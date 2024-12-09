# LinkinPurry

## Overview

This project was created to fulfill the major assignment for the Web Application Development course. It is a website similar to LinkedIn, but with more simplified features. The website is developed using the following technologies:

- React.js + Tailwind CSS for frontend development
- Hono.js for backend framework
- PostgreSQL as the database management system

## Table of Contents

- [LinkInPurry](#linkinpurry)
- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [How to Run the Program](#how-to-run-the-program)
- [API Documentation](#api-documentation)
- [Pembagian Tugas](#pembagian-tugas)
- [Group Members](#group-members)

## Installation

### Manual Installation

1. Clone this repository by running `git clone https://github.com/Labpro-21/if-3310-2024-2-k01-03.git`.
2. Get into the project directory by running `cd if-3310-2024-2-k01-03`.
3. Install the required dependencies by running `npm install` in the frontend directory and `npm install` in the backend directory.
4. Create a `.env` file in backend directory. You can use the `.env.example` file as a reference.
5. Create a `.env` file in the frontend directory. You can use the `.env.example` file as a reference, make sure to fill the `VITE_API_APP_URL = http://localhost:3000/api`

### Docker Installation

1. Clone this repository by running `git clone https://github.com/Labpro-21/if-3310-2024-2-k01-03.git`.
2. Get into the project directory by running `cd if-3310-2024-2-k01-03`.
3. Make sure you have Docker installed on your machine. If you don't have it installed, you can download it [here](https://docs.docker.com/get-docker/).
4. Create a `.env` file in backend directory. You can use the `.env.example` file as a reference.
5. Create a `.env` file in the frontend directory. You can use the `.env.example` file as a reference, make sure to fill the `VITE_API_APP_URL = http://localhost:3000/api`

## How to Run the Program

### Manual

1. Run the backend server by running `npm run dev` in the backend directory.
2. Run the frontend server by running `npm run dev` in the frontend directory.
3. Make sure you have PostgreSQL running on your machine.
4. Open your browser and go to `localhost:5137`.

### Docker

1. Run the backend server by running `docker compose up --build` in the root directory.
2. Open your browser and go to `localhost:5137`.

## API Documentation

You can find the Open API documentation when running the program on `localhost:5137/ui`.

## Pembagian Tugas

### _Feature_

| Fitur                             | NIM      |
| ----------------------------------| -------- |
| Authentication & Authorization    | 13522032 |
| Profile                           | 13522037 |
| Koneksi Antar Pengguna            | 13522032 |
| Feed                              | 13522032 |
| Chat & Web Socket                 | 13522032 |
| Notifikasi                        | 13522032 |
| Responsivity                      | all |
| Docker                            | 13522032 |

### _Server Side_

| Fitur                             | NIM      |
| ----------------------------------| -------- |
| Login                             | 13522032 |
| Register                          | 13522032 |
| Profile                           | 13522037, 13522032 |
| Edit Profile                      | 13522037, 13522032 |
| Feed                              | 13522031, 13522032 |
| Create Feed                       | 13522031, 13522032 |
| Edit Feed                         | 13522031, 13522032 |
| Daftar Pengguna (Browse)          | 13522032 |
| Permintaan Koneksi                | 13522032 |
| Daftar Koneksi                    | 13522032 |
| Chat + Websocket                  | 13522032 |
| Push Notification                 | 13522032 |

### _Client Side_

| Fitur                             | NIM      |
| ----------------------------------| -------- |
| Login                             | 13522032 |
| Register                          | 13522032 |
| Profile                           | 13522037 |
| Edit Profile                      | 13522037 |
| Feed                              | 13522031 |
| Create Feed                       | 13522031 |
| Edit Feed                         | 13522031 |
| Daftar Pengguna (Browse)          | 13522032 |
| Permintaan Koneksi                | 13522032 |
| Daftar Koneksi                    | 13522032 |
| Chat + Websocket                  | 13522032 |
| Push Notification                 | 13522032 |

### _Others_

| Job                                   | NIM                 |
| --------------------------------------| ------------------- |
| Navbar                                | 13522032            |
| Backend & Frontend Structure          | 13522032            |
| Caching (?)                           | 13522032            |
| UI/UX                                 | 13522031            |
| Upload File                           | 13522032            |

## Group Members

1. 13522031 - Zaki Chandra Yudistira
2. 13522032 - Tazkia Nizami
3. 13522037 - Farhan Nafis Rayhan
