# CRM React App

Welcome to the **CRM React App** ("Product Management"). This repository contains a React JS web application implementing a simple CRM with authentication, dashboard visualizations, and product management features.

Visit Link - https://product-management-dthm.onrender.com

## Overview

This project was created as part of an SDE assignment to build a full-stack-like CRM front-end using React, Redux, and dummy REST APIs. It includes:

- A **Login Page** with form validation and toast notifications.  
- **Authentication** via public/private routing guards.  
- A **Dashboard** with summary cards and interactive charts.  
- **Product Management**: full CRUD operations with search, sorting, and pagination.

## Features

- **Login & Authentication**: Protected routes ensure only authenticated users access the dashboard and products page.  
- **Dashboard**:  
  - Summary cards showing total products, average price, and average rating.  
  - Line chart and bar chart visualizing product data.  
- **Product Management**:  
  - Add, edit, and delete products using a styled form with inline validation.  
  - Client-side search, sortable columns, and pagination in the product list table.  
- **Responsive Design**: Hamburger menu on mobile, adaptable card layouts.  
- **State Management**: Implemented with Redux Toolkit and React-Redux.  
- **Form Handling**: Built with Formik and Yup for validation.  
- **Notifications**: Success/error toasts using react-toastify.

## Technologies Used

- **React** (v18)  
- **React Router DOM** for routing  
- **Redux Toolkit** & **React-Redux** for state management  
- **Formik** + **Yup** for form validation  
- **Recharts** for data visualization  
- **Axios** for HTTP requests  
- **React-Toastify** for notifications  
- **CSS** custom theming and responsive design  

## Login Credentials

Use the following test accounts (from dummyjson.com):

- **Username:** `emilys`  
  **Password:** `emilyspass`

## Getting Started

Follow these steps to run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (>=14) and npm installed

### Installation

```bash
# Clone this repository
git clone https://github.com/ganeshrupanwar/Product-Management.git

# Install dependencies
npm install

# Run on localhost
npm start
