from fastapi import FastAPI
import joblib
import pandas as pd
from app.schemas.customer import CustomerData
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained pipeline
model = joblib.load("app/model/best_churn_pipeline.pkl")


@app.get("/")
def home():
    return {"message": "Churn Prediction API Running"}

@app.post("/predict")
def predict(data: CustomerData):

    input_data = pd.DataFrame([{
        "customer_id": data.customer_id,
        "credit_score": data.credit_score,
        "country": data.country,
        "gender": data.gender,
        "age": data.age,
        "tenure": data.tenure,
        "balance": data.balance,
        "products_number": data.products_number,
        "credit_card": data.credit_card,
        "active_member": data.active_member,
        "estimated_salary": data.estimated_salary
    }])

    # FEATURE ENGINEERING

    input_data["balance_per_product"] = (
        input_data["balance"] / input_data["products_number"]
    )

    input_data["salary_balance_ratio"] = (
        input_data["estimated_salary"] / (input_data["balance"] + 1)
    )

    input_data["high_balance"] = (
        input_data["balance"] > 100000
    ).astype(int)

    # AGE GROUP
    input_data["age_group"] = pd.cut(
        input_data["age"],
        bins=[0, 30, 50, 100],
        labels=["Young", "Middle", "Senior"]
    )

    # TENURE BUCKET
    input_data["tenure_bucket"] = pd.cut(
        input_data["tenure"],
        bins=[-1, 3, 7, 10],
        labels=["Low", "Medium", "High"]
    )

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0][1]

    return {
        "prediction": int(prediction),
        "churn_probability": float(probability)
    }