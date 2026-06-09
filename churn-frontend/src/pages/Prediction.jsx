import { useState, useRef } from "react";
import { motion } from "framer-motion";


function Prediction() {

  const [formData, setFormData] = useState({

    customer_id: 15634602,

    credit_score: 650,

    country: "France",

    gender: "Male",

    age: 42,

    tenure: 5,

    balance: 125000,

    products_number: 2,

    credit_card: 1,

    active_member: 1,

    estimated_salary: 75000
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {
      

      const response = await fetch(
        "https://churn-prediction-app-90ii.onrender.com/predict",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            customer_id: Number(formData.customer_id),

            credit_score: Number(formData.credit_score),

            country: formData.country,

            gender: formData.gender,

            age: Number(formData.age),

            tenure: Number(formData.tenure),

            balance: Number(formData.balance),

            products_number: Number(formData.products_number),

            credit_card: Number(formData.credit_card),

            active_member: Number(formData.active_member),

            estimated_salary: Number(formData.estimated_salary)

          })
        }
      );

      const data = await response.json();

      setResult(data);
      setTimeout(() => {

        resultRef.current?.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

        }, 200);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-gray-950
      to-gray-900
      text-white
      px-6
      py-12
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        <h1 className="
          text-5xl
          font-extrabold
          mb-3
        ">

          Churn Prediction

        </h1>

        <p className="
          text-gray-400
          text-lg
          mb-10
        ">

          Predict whether a customer is likely to churn
          using the trained Machine Learning pipeline.

        </p>

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            bg-gray-900
            p-8
            rounded-3xl
            border
            border-gray-800
            shadow-2xl
          "
        >

          {Object.keys(formData).map((key) => (

            <div
              key={key}
              className="flex flex-col"
            >

              <label className="
                mb-2
                text-gray-300
                font-medium
                capitalize
              ">

                {key.replaceAll("_", " ")}

              </label>

              {key === "country" ? (

    <select
      name={key}
      value={formData[key]}
      onChange={handleChange}
      className="
        bg-gray-800
        border
        border-gray-700
        rounded-xl
        px-4
        py-3
      "
    >
      <option>France</option>
      <option>Germany</option>
      <option>Spain</option>
    </select>

  ) : key === "gender" ? (

    <select
      name={key}
      value={formData[key]}
      onChange={handleChange}
      className="
        bg-gray-800
        border
        border-gray-700
        rounded-xl
        px-4
        py-3
      "
    >
      <option>Male</option>
      <option>Female</option>
    </select>

  ) : key === "active_member" ? (

    <select
      name={key}
      value={formData[key]}
      onChange={handleChange}
      className="
        bg-gray-800
        border
        border-gray-700
        rounded-xl
        px-4
        py-3
      "
    >
      <option value={1}>Yes</option>
      <option value={0}>No</option>
    </select>

  ) : key === "credit_card" ? (

    <select
      name={key}
      value={formData[key]}
      onChange={handleChange}
      className="
        bg-gray-800
        border
        border-gray-700
        rounded-xl
        px-4
        py-3
      "
    >
      <option value={1}>Yes</option>
      <option value={0}>No</option>
    </select>

  ) : key === "age" ? (

    <div>
      <input
        type="range"
        min="18"
        max="90"
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="w-full"
      />
      <p className="text-blue-400 mt-1">
        {formData[key]} years
      </p>
    </div>

  ) : key === "credit_score" ? (

    <div>
      <input
        type="range"
        min="300"
        max="850"
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="w-full"
      />
      <p className="text-blue-400 mt-1">
        {formData[key]}
      </p>
    </div>

  ) : key === "tenure" ? (

    <div>
      <input
        type="range"
        min="0"
        max="10"
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="w-full"
      />
      <p className="text-blue-400 mt-1">
        {formData[key]} years
      </p>
    </div>

  ) : key === "products_number" ? (

    <div>
      <input
        type="range"
        min="1"
        max="4"
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="w-full"
      />
      <p className="text-blue-400 mt-1">
        {formData[key]} products
      </p>
    </div>

  ) : (

  <input
    type="number"
    name={key}
    value={formData[key]}
    onChange={handleChange}
    className="
      bg-gray-800
      border
      border-gray-700
      rounded-xl
      px-4
      py-3
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  />

)}
            </div>

          ))}

          <button
            type="submit"
            className="
              md:col-span-2
              bg-blue-600
              hover:bg-blue-500
              transition-all
              duration-300
              rounded-2xl
              py-4
              text-lg
              font-bold
              shadow-xl
            "
          >

            {loading ? (

        <div className="
            flex
            items-center
            justify-center
            gap-3
        ">

            <div className="
            w-5
            h-5
            border-2
            border-white
            border-t-transparent
            rounded-full
            animate-spin
            "/>

            <span>
            Predicting...
            </span>

        </div>

        ) : (

        "Predict Churn"

        )}

          </button>

        </form>

        {result && (

          <motion.div 

          ref={resultRef}

          key={result.churn_probability}
          
          initial={{
        opacity: 0,
        y: 40
        }}

        animate={{
        opacity: 1,
        y: 0
        }}

        transition={{
        duration: 0.6
        }}
        className="
            mt-10
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            p-8
            shadow-2xl
          ">
            <div
        className={`
          inline-flex
          items-center
          px-5
          py-2
          rounded-full
          text-sm
          font-bold
          mb-6
          ${
            result.churn_probability >= 0.7
              ? "bg-red-500/20 text-red-400 border border-red-500"
              : result.churn_probability >= 0.3
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
              : "bg-green-500/20 text-green-400 border border-green-500"
          }
        `}
      >
        {result.churn_probability >= 0.7
          ? "🔴 HIGH CHURN RISK"
          : result.churn_probability >= 0.3
          ? "🟡 MEDIUM CHURN RISK"
          : "🟢 LOW CHURN RISK"}
      </div>

            <h2 className="
              text-3xl
              font-bold
              mb-6
            ">

              Prediction Result

            </h2>

            <div className="space-y-4">

              <p className="text-xl">

                Status:

                <span className={`
                  ml-3
                  font-bold
                  ${
                    result.prediction === 1
                      ? "text-red-400"
                      : "text-green-400"
                  }
                `}>

                  {result.prediction === 1
                    ? "Customer Will Churn"
                    : "Customer Will Stay"}

                </span>

              </p>

                <div className="
      text-center
      py-6
    ">

      <h1 className="
        text-7xl
        font-extrabold
        text-blue-400
      ">
        {(result.churn_probability * 100).toFixed(2)}%
      </h1>

      <p className="
        mt-2
        text-2xl
        font-semibold
        text-gray-300
      ">
        Churn Probability
      </p>

  </div>

              <div className="mt-6">

        <div className="
            w-full
            h-6
            bg-gray-800
            rounded-full
            overflow-hidden
        ">

            <div
            className={`
                h-full
                transition-all
                duration-700
                ${
                result.prediction === 1
                    ? "bg-red-500"
                    : "bg-green-500"
                }
            `}
            style={{
                width: `${
                result.churn_probability * 100
                }%`
            }}
            />
            

        </div>
        

        <p className="
            mt-2
            text-gray-400
            text-sm
        ">

            Confidence Level

        </p>
        <div className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
        mt-8
      ">

        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Age
          </p>
          <p className="text-2xl font-bold">
            {formData.age}
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Products
          </p>
          <p className="text-2xl font-bold">
            {formData.products_number}
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Balance
          </p>
          <p className="text-2xl font-bold">
            ₹{Number(formData.balance).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Active
          </p>
          <p className="text-2xl font-bold">
            {formData.active_member == 1
              ? "Yes"
              : "No"}
          </p>
        </div>

      </div>
      <div className="mt-10">

    <h3 className="
      text-2xl
      font-bold
      mb-6
    ">
      Key Churn Drivers
    </h3>

   {[
  { name: "Age", value: 33, color: "bg-red-500" },
  { name: "Products", value: 27, color: "bg-orange-500" },
  { name: "Balance", value: 18, color: "bg-yellow-500" },
  { name: "Activity", value: 12, color: "bg-green-500" }
].map((feature) => (

      <div
        key={feature.name}
        className="mb-5"
      >

        <div className="
          flex
          justify-between
          mb-2
        ">

          <span>
            {feature.name}
          </span>

          <span>
            {feature.value}%
          </span>

        </div>

        <div className="
          h-4
          bg-gray-800
          rounded-full
          overflow-hidden
        ">

          <div
            className={`
  h-full
  ${feature.color}
  rounded-full
  transition-all
  duration-1000
`}
            style={{
              width: `${feature.value}%`
            }}
          />

        </div>

      </div>

    ))}

  </div>
  <div className="mt-12">

  <h3 className="
    text-2xl
    font-bold
    mb-6
  ">
    Model Performance
  </h3>

  <div className="
    grid
    grid-cols-2
    md:grid-cols-4
    gap-4
  ">

    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">
        Accuracy
      </p>
      <p className="text-2xl font-bold text-blue-400">
        86.8%
      </p>
    </div>

    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">
        ROC-AUC
      </p>
      <p className="text-2xl font-bold text-green-400">
        86.9%
      </p>
    </div>

    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">
        Precision
      </p>
      <p className="text-2xl font-bold text-yellow-400">
        78.0%
      </p>
    </div>

    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">
        F1 Score
      </p>
      <p className="text-2xl font-bold text-purple-400">
        60.1%
      </p>
    </div>

  </div>

</div>

<div className="
  mt-12
  bg-gray-800
  rounded-3xl
  p-6
">

  <h3 className="
    text-2xl
    font-bold
    mb-4
  ">
    Customer Analysis
  </h3>

  <ul className="
    space-y-3
    text-gray-300
  ">

    <li>
      • Customer age profile: {formData.age} years
    </li>

    <li>
      • Maintains {formData.products_number} banking products
    </li>

    <li>
      • Current account balance: ₹{Number(formData.balance).toLocaleString()}
    </li>

    <li>
      • Customer is {formData.active_member == 1 ? "actively engaged" : "currently inactive"}
    </li>

  </ul>

</div>

        </div>

            </div>

          </motion.div>

        )}

      </div>

       <footer className="
    mt-24
    border-t
    border-gray-800
    pt-8
    text-center
    text-gray-500
    ">

    <p className="text-sm">

        © 2026 Churn Prediction System

    </p>

    <p className="
        mt-2
        text-sm
    ">

        Made with ❤️ by
        <span className="
        text-blue-400
        font-semibold
        ml-1
        ">

        Stuti

        </span>

    </p>

    </footer>

    </div>
  );
}

export default Prediction;