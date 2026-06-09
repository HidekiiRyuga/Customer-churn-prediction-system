import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-gray-950
      via-black
      to-gray-900
      text-white
      px-8
      py-16
    ">

      {/* HERO SECTION */}

      <div className="
        max-w-6xl
        mx-auto
        flex
        flex-col
        items-center
        text-center
      ">

        <h1 className="
          text-6xl
          md:text-7xl
          font-extrabold
          leading-tight
          mb-6
        ">

          Customer Churn
          <span className="text-blue-500">
            {" "}Prediction System
          </span>

        </h1>

        <p className="
          text-gray-400
          text-xl
          max-w-3xl
          leading-relaxed
          mb-10
        ">

          An end-to-end Machine Learning project
          that predicts whether a bank customer
          is likely to churn using data analysis,
          feature engineering, preprocessing,
          model training, evaluation,
          and deployment.

        </p>

        {/* BUTTONS */}

        <div className="
          flex
          flex-wrap
          justify-center
          gap-6
        ">

          <Link
            to="/predict"
            className="
              bg-blue-600
              hover:bg-blue-500
              transition-all
              duration-300
              px-8
              py-4
              rounded-2xl
              text-lg
              font-semibold
              shadow-xl
            "
          >

            Try Prediction

          </Link>

          <Link
            to="/explanation"
            className="
              border
              border-gray-700
              hover:border-blue-500
              hover:bg-gray-900
              transition-all
              duration-300
              px-8
              py-4
              rounded-2xl
              text-lg
              font-semibold
            "
          >

            View ML Workflow

          </Link>

        </div>

      </div>

      {/* FEATURES SECTION */}

        <div className="
        max-w-6xl
        mx-auto
        mt-28
        ">

        <h2 className="
            text-4xl
            font-bold
            text-center
            mb-14
        ">

            Project Highlights

        </h2>

        <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
        ">

            {[
            {
                title: "Machine Learning Pipeline",
                desc: "Complete preprocessing, feature engineering, model training and evaluation workflow."
            },

            {
                title: "Interactive Prediction System",
                desc: "Users can input customer data and instantly predict churn probability."
            },

            {
                title: "Visual Data Analysis",
                desc: "EDA visualizations including heatmaps, pairplots, violin plots and feature importance."
            },

            {
                title: "Cross Validation",
                desc: "Compared multiple ML algorithms using ROC-AUC cross-validation scoring."
            },

            {
                title: "Deployment Ready",
                desc: "Backend deployed using Render and frontend optimized with React + Vercel."
            },

            {
                title: "Explainable AI",
                desc: "Detailed breakdown of the full ML workflow with code explanations and outputs."
            }

            ].map((item) => (

            <div
                key={item.title}
                className="
                bg-gray-900
                border
                border-gray-800
                rounded-3xl
                p-8
                shadow-2xl
                hover:border-blue-500
                transition-all
                duration-300
                "
            >

                <h3 className="
                text-2xl
                font-bold
                text-blue-400
                mb-4
                ">

                {item.title}

                </h3>

                <p className="
                text-gray-400
                leading-relaxed
                ">

                {item.desc}

                </p>

            </div>

            ))}

        </div>

        </div>

      {/* TECH STACK */}

      <div className="
        max-w-6xl
        mx-auto
        mt-28
      ">

        <h2 className="
          text-4xl
          font-bold
          mb-12
          text-center
        ">

          Tech Stack

        </h2>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
        ">

          {[
            "Python",
            "Scikit-learn",
            "FastAPI",
            "React",
            "Pandas",
            "Seaborn",
            "Vite",
            "Render + Vercel"
          ].map((tech) => (

            <div
              key={tech}
              className="
                bg-gray-900
                border
                border-gray-800
                rounded-3xl
                p-8
                text-center
                shadow-2xl
                hover:border-blue-500
                transition-all
                duration-300
              "
            >

              <h3 className="
                text-2xl
                font-bold
                text-blue-400
              ">
                {tech}
              </h3>

            </div>

          ))}

        </div>

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

export default Home;