# Customer Churn Prediction System

An end-to-end Machine Learning application that predicts customer churn using banking customer data and provides an interactive analytics dashboard for exploring model predictions, feature importance, and the complete machine learning workflow.

Built with a production-style architecture using React, FastAPI, and Scikit-learn, the project demonstrates the complete lifecycle of a machine learning solution—from data analysis and feature engineering to model deployment and frontend integration.

---

## Live Demo

### Frontend

https://churn-frontend-eight.vercel.app/

### Backend API

https://churn-prediction-app-90ii.onrender.com/

---

## Project Overview

Customer churn prediction is a critical business problem in industries such as banking, telecommunications, SaaS, and subscription-based services. Identifying customers who are likely to leave allows businesses to take proactive retention measures and reduce revenue loss.

This project predicts the likelihood of customer churn using demographic, financial, and behavioral attributes, while also providing insights into the machine learning workflow used to build the model.

---

## Key Features

### Machine Learning

* Customer churn prediction using supervised learning
* Feature engineering and preprocessing pipelines
* Multiple model comparison and evaluation
* Cross-validation using Stratified K-Fold
* ROC-AUC based model selection
* Feature importance analysis

### Frontend

* Modern responsive UI built with React
* Interactive prediction dashboard
* Risk-level classification system
* Customer analytics cards
* Feature importance visualizations
* Smooth animations using Framer Motion
* Mobile-friendly design

### Backend

* FastAPI REST API
* Real-time prediction endpoint
* Automated feature engineering pipeline
* Model serialization using Joblib
* Production-ready inference workflow

### Data Analysis

* Exploratory Data Analysis (EDA)
* KDE Plots
* Pairplots
* Violin Plots
* Correlation Analysis
* Feature Importance Visualization
* Churn Distribution Analysis

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript (ES6+)
* Tailwind CSS
* Framer Motion
* React Router DOM
* Fetch API

### Backend

* FastAPI
* Uvicorn
* Python

### Machine Learning

* Scikit-learn
* Gradient Boosting Classifier
* Random Forest
* Logistic Regression
* AdaBoost
* Support Vector Classifier (SVC)

### Data Processing

* Pandas
* NumPy

### Data Visualization

* Matplotlib
* Seaborn

### ML Engineering

* Pipeline Architecture
* ColumnTransformer
* StandardScaler
* OneHotEncoder
* SimpleImputer
* Feature Engineering
* Cross Validation
* Stratified K-Fold Validation

### Deployment

* Vercel
* Render
* Git
* GitHub

---

## Machine Learning Workflow

### 1. Data Exploration

* Dataset inspection
* Missing value analysis
* Statistical summaries
* Churn distribution analysis

### 2. Exploratory Data Analysis

* Distribution plots
* Pairwise feature relationships
* Violin plots
* Correlation matrices
* Churn-based comparisons

### 3. Feature Engineering

Created custom features including:

* Balance Per Product
* Salary Balance Ratio
* Age Group
* Tenure Bucket
* High Balance Indicator

### 4. Data Preprocessing

* Missing value handling
* Feature scaling
* One-hot encoding
* Automated preprocessing pipelines

### 5. Model Training

Models evaluated:

* Logistic Regression
* Random Forest
* Gradient Boosting
* AdaBoost
* Support Vector Classifier

### 6. Model Selection

Models were compared using ROC-AUC scores obtained through Stratified K-Fold Cross Validation.

Best performing model:

**Gradient Boosting Classifier**

---

## Model Performance

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 86.80% |
| Precision | 78.04% |
| Recall    | 48.89% |
| F1 Score  | 60.12% |
| ROC-AUC   | 86.92% |

---

## Project Structure

```bash
customer-churn-prediction-system/

├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── best_churn_pipeline.pkl
│   ├── requirements.txt
│   └── notebooks/
│
├── screenshots/
│
└── README.md
```

---

## API Endpoint

### Predict Churn

```http
POST /predict
```

Example Request:

```json
{
  "customer_id": 123456789,
  "credit_score": 650,
  "country": "France",
  "gender": "Male",
  "age": 40,
  "tenure": 3,
  "balance": 50000,
  "products_number": 2,
  "credit_card": 1,
  "active_member": 1,
  "estimated_salary": 60000
}
```

Example Response:

```json
{
  "prediction": 0,
  "churn_probability": 0.03
}
```

---

## Skills Demonstrated

* Machine Learning
* Model Evaluation
* Feature Engineering
* Data Analysis
* Data Visualization
* Full Stack Development
* REST API Development
* Frontend Engineering
* Responsive UI Design
* Cloud Deployment
* MLOps Fundamentals
* Software Architecture
* Production ML Pipelines

---

## Future Improvements

* SHAP Explainability
* Prediction History Tracking
* User Authentication
* Dashboard Analytics
* Docker Containerization
* CI/CD Pipeline
* Cloud-Based ML Serving
* Model Monitoring

---

## Author

### Stuti

Passionate about Machine Learning, Full Stack Development, Data Science, and building real-world intelligent systems.

Built with ❤️ using React, FastAPI, and Scikit-learn.
