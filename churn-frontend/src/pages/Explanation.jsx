import SectionCard from "../components/SectionCard";
import activeMemberVsChurn from "../assets/active_member_vs_churn.png";
import ageDistByChurn from "../assets/age_dist_by_churn.png";
import balanceDistByChurn from "../assets/balance_dist_by_churn.png";
import balanceVsProductsByChurn from "../assets/balance_vs_number_of_products_by_churn.png";
import barTenureDistByChurn from "../assets/bar_tenure_dist_by_churn.png";
import churnRateVsProducts from "../assets/churn_rate_vs_number_of_products.png";
import churnRatioFemale from "../assets/churn_ratio_for_female.png";
import churnRatioMale from "../assets/churn_ratio_for_male.png";
import confusionMatrix from "../assets/confusion_matrix_gradient_boosting.png";
import correlationMatrix from "../assets/correlation_matrix_numeric_features.png";
import countryVsChurn from "../assets/country_vs_churn.png";
import creditCardVsChurn from "../assets/credit_card_vs_churn.png";
import creditScoreDistByChurn from "../assets/credit_score_dist_by_churn.png";
import estimatedSalaryDistByChurn from "../assets/estimated_salary_dist_by_churn.png";
import featureEngineeringTable from "../assets/feature_engineering_table.png";
import genderVsChurn from "../assets/gender_vs_churn.png";
import heatmap from "../assets/heatmap.png";
import modelComparisonROC from "../assets/model_comparison_cross_validated_ROC_AUC.png";
import pairplot from "../assets/pairwise_relationship_among_key_numeric_features.png";
import productsNumberDistByChurn from "../assets/products_number_dist_by_churn.png";
import tenureDistByChurn from "../assets/tenure_dist_by_churn.png";
import topFeatureImportances from "../assets/top_20_feature_importances.png";
import violinAgeDistByChurn from "../assets/violin_plot_age_dist_by_churn.png";
import loadDataset from "../assets/load_dataset.png";
import datatypeAndNonNUllcount from "../assets/datatype_and_non_null_count.png";
import describeDataset from "../assets/describedataset.png";
import missingvalChurnValcountsChurnprop from "../assets/missingval_valcounts_and_churn_proportion.png";
import hero from "../assets/hero.png";
import reactLogo from "../assets/react.svg";

const featureImportanceCode = `
# Feature importance analysis

if hasattr(best_pipeline.named_steps['classifier'], 'feature_importances_'):

    num_feats = numeric_features

    cat_feats = list(
        best_pipeline.named_steps['preprocessor']
        .transformers_[1][1]
        .named_steps['onehot']
        .get_feature_names_out(categorical_features)
    )

    feature_names = num_feats + cat_feats

    importances = (
        best_pipeline.named_steps['classifier']
        .feature_importances_
    )

    fi = pd.Series(
        importances,
        index=feature_names
    ).sort_values(ascending=False)[:20]

    display(fi)

    plt.figure(figsize=(8,6))

    sns.barplot(
        x=fi.values,
        y=fi.index
    )

    plt.title('Top 20 Feature Importances')

    plt.show()

else:

    print(
        'Selected model does not provide feature importance.'
    )
`;

function Explanation() {

  return (

    <div className="
    min-h-screen
    bg-gray-950
    text-white
    px-4
    md:px-8
    py-8
    overflow-x-hidden
    ">
      <h1 className="text-5xl font-bold mb-4">
        Churn Prediction ML Walkthrough
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        This page explains how the churn prediction system was built,
        including preprocessing, feature engineering, model training,
        evaluation, and deployment.
      </p>

            <SectionCard
        title="Importing Libraries"

        code={`# Standard imports
        import pandas as pd 
        import numpy as np
        import matplotlib.pyplot as plt 
        import seaborn as sns
        from collections import Counter

        # Sklearn
        from sklearn.model_selection import (
            train_test_split,
            StratifiedKFold,
            cross_val_score,
            GridSearchCV
        )

        from sklearn.preprocessing import (
            StandardScaler,
            MinMaxScaler,
            OneHotEncoder,
            LabelEncoder
        )

        from sklearn.compose import ColumnTransformer
        from sklearn.pipeline import Pipeline
        from sklearn.impute import SimpleImputer

        # Models
        from sklearn.linear_model import LogisticRegression

        from sklearn.ensemble import (
            RandomForestClassifier,
            GradientBoostingClassifier,
            AdaBoostClassifier
        )

        from sklearn.svm import SVC
        from sklearn.naive_bayes import GaussianNB

        # Metrics & utilities
        from sklearn.metrics import (
            accuracy_score,
            precision_score,
            recall_score,
            f1_score,
            roc_auc_score,
            confusion_matrix,
            classification_report
        )

        import joblib
        import warnings

        warnings.filterwarnings("ignore")
        `}

        explanation={`This section imports all the essential Python libraries required throughout the machine learning workflow.

        Pandas and NumPy are used for handling structured data and numerical computations.

        Matplotlib and Seaborn are visualization libraries used during exploratory data analysis (EDA) to identify patterns and trends in customer churn behavior.

        Scikit-learn provides tools for:
        - preprocessing
        - feature engineering
        - machine learning pipelines
        - model training
        - evaluation metrics
        - cross validation

        Joblib is later used to save the trained pipeline for deployment in the FastAPI backend.`}

        insight={`Well-organized imports improve code readability and reflect professional machine learning project structure.`}

        output={"Libraries imported successfully."}
        />
        <SectionCard
        title="Loading the Dataset"

        code={`# Load dataset
        df = pd.read_csv("customer_data.csv")

        print("Shape:", df.shape)

        df.head()`
        }

        explanation={`The dataset is loaded using Pandas, which is one of the most commonly used Python libraries for structured data analysis.

        The CSV file contains customer-related banking information such as:
        - credit score
        - country
        - gender
        - account balance
        - salary
        - tenure
        - churn status

        After loading the dataset, the shape of the dataframe is printed to understand the number of rows and columns present.

        The df.head() function displays the first few rows of the dataset, helping verify that the data has been loaded correctly and allowing an initial inspection of the features.`}

        insight={`The target variable in this project is "churn", where:
        0 = customer stays
        1 = customer leaves the bank.`}

        output={"Dataset loaded successfully."}

        images={[
            {src: loadDataset,
            size: "max-w-2xl"}
            ]}
        />

        <SectionCard
        title="Initial Data Inspection"

        code={`# Info & Summary
        display(df.info())

        display(df.describe(include='all').T)

        # Missing values
        print("\\nMissing values per column:")
        print(df.isnull().sum())

        # Target distribution
        print("\\nChurn value counts:")
        print(df['churn'].value_counts(normalize=False))

        print("\\nChurn proportion:")
        print(df['churn'].value_counts(normalize=True))
        `}

        explanation={`After loading the dataset, an initial inspection phase was performed to better understand the structure, quality, and distribution of the data.

        The df.info() function provides metadata such as:
        - column names
        - data types
        - non-null counts
        - memory usage

        This helps identify whether features are numerical or categorical and whether missing values exist.

        The df.describe() function generates statistical summaries for both numerical and categorical features, including:
        - mean
        - standard deviation
        - quartiles
        - unique category counts
        - most frequent values

        Missing value analysis was then performed using isnull().sum() to ensure the dataset was complete before preprocessing and model training.

        Finally, the target variable "churn" was analyzed to understand customer retention behavior and identify whether the dataset was imbalanced.`}

        insight={`The dataset showed class imbalance, meaning significantly more customers stayed than left. Because of this, evaluation metrics like ROC-AUC and F1-score become more reliable than simple accuracy alone.`}

        output={"Initial dataset inspection completed successfully."}
        images={[
        {
            src: datatypeAndNonNUllcount,
            size: "max-w-md"
        },

        {
            src: describeDataset,
            size: "max-w-2xl"
        },

        {
            src: missingvalChurnValcountsChurnprop,
            size: "max-w-xs"
        }
        ]}
        />
        <SectionCard
        title="Exploratory Data Analysis (EDA) - Numerical Feature Distributions"

        code={`# Numerical columns
        num_cols = [
            'credit_score',
            'age',
            'tenure',
            'balance',
            'products_number',
            'estimated_salary'
        ]

        # Distribution plots
        for col in num_cols:

            plt.figure(figsize=(8,3))

            sns.kdeplot(
                data=df,
                x=col,
                hue='churn',
                fill=True,
                common_norm=False,
                alpha=0.5
            )

            plt.title(f'{col} Distribution by Churn')

            plt.tight_layout()

            plt.show()
        `}

        explanation={`Exploratory Data Analysis (EDA) was performed to visually understand how numerical customer features relate to churn behavior.

        Kernel Density Estimation (KDE) plots were used to compare the distributions of customers who churned and customers who stayed.

        These visualizations help identify:
        - behavioral trends
        - feature separations
        - class overlaps
        - important predictive variables

        Each graph compares a numerical feature against the churn target variable, allowing visual inspection of how customer characteristics influence retention probability.

        Visualization-driven analysis is extremely important before model training because it helps identify meaningful patterns, potential feature importance, and unusual distributions in the dataset.`}

        insight={`Among all numerical features, age showed one of the strongest visible separations between churned and retained customers, making it a highly influential feature for churn prediction.`}

        output={"KDE distribution plots generated successfully."}

        images={[
            {
            src: creditScoreDistByChurn,
            size: "max-w-2xl"
            },

            {
            src: ageDistByChurn,
            size: "max-w-2xl"
            },

            {
            src: tenureDistByChurn,
            size: "max-w-2xl"
            },

            {
            src: balanceDistByChurn,
            size: "max-w-2xl"
            },

            {
            src: productsNumberDistByChurn,
            size: "max-w-2xl"
            },

            {
            src: estimatedSalaryDistByChurn,
            size: "max-w-2xl"
            }
        ]}
        />
        <SectionCard
        title="Pairwise Relationship Analysis"

        code={`# Pairplot (sampled for speed)

        sns.pairplot(
            df.sample(frac=0.2, random_state=42),

            vars=[
                'credit_score',
                'age',
                'balance',
                'estimated_salary'
            ],

            hue='churn',

            diag_kind='kde',

            plot_kws={'alpha':0.5}
        )

        plt.suptitle(
            'Pairwise Relationship among key Numeric Features',
            y=1.02
        )

        plt.show()
        `}

        explanation={`A pairplot was generated to visualize relationships between important numerical features in the dataset.

        Because pairplots can become computationally expensive on large datasets, only 20% of the dataset was sampled using frac=0.2 for faster rendering and better performance.

        The pairplot displays:
        - scatter plots between feature pairs
        - KDE distributions along the diagonal
        - churn-based color separation

        This visualization helps identify:
        - feature correlations
        - clustering behavior
        - class separation
        - potential nonlinear relationships

        Using hue='churn' allows direct comparison between churned and retained customers across multiple feature combinations simultaneously.`}

        insight={`Age and balance showed noticeable clustering differences between churned and retained customers, suggesting stronger predictive influence compared to some other numerical variables.`}

        output={"Pairwise relationship visualization generated successfully."}

        images={[
            {
            src: pairplot,
            size: "max-w-5xl"
            }
        ]}
        />
        <SectionCard
        title="Age Distribution Analysis using Violin Plot"

        code={`# Violin plot for Age

        plt.figure(figsize=(8,4))

        sns.violinplot(
            data=df,
            x='churn',
            y='age',
            inner='quart',
            palette='Set2'
        )

        plt.title('Age Distribution by Churn (Violin Plot)')

        plt.show()
        `}

        explanation={`A violin plot was used to analyze how customer age distributions differ between churned and retained customers.

        Unlike standard boxplots, violin plots combine:
        - distribution density
        - probability estimation
        - quartile visualization

        This provides a deeper understanding of how values are spread across each churn category.

        The inner='quart' parameter displays quartile information inside the violin plot, making it easier to observe:
        - median age
        - interquartile range
        - spread of customer ages

        Violin plots are especially useful for identifying skewness, concentration patterns, and distribution differences between classes.`}

        insight={`Customers who churned tended to belong to higher age ranges compared to customers who stayed, indicating that age is an important predictive feature in the churn prediction model.`}

        output={"Violin plot visualization generated successfully."}

        images={[
            {
            src: violinAgeDistByChurn,
            size: "max-w-3xl"
            }
        ]}
        />

        <SectionCard
        title="Tenure Distribution Analysis"

        code={`# Tenure distribution

        plt.figure(figsize=(10,4))

        sns.countplot(
            data=df,
            x='tenure',
            hue='churn',
            palette='coolwarm'
        )

        plt.title('Tenure Distribution by Churn')

        plt.show()
        `}

        explanation={`A countplot was used to analyze how customer tenure relates to churn behavior.

        The tenure feature represents the number of years a customer has stayed with the bank.

        By visualizing tenure against churn categories, it becomes easier to observe:
        - customer retention patterns
        - loyalty trends
        - churn frequency across different tenure periods

        The hue='churn' parameter separates customers into churned and retained groups, enabling direct comparison across tenure values.

        Countplots are particularly useful for categorical or discrete numerical variables because they clearly display frequency distributions.`}

        insight={`Customers with lower tenure values showed comparatively higher churn frequency, suggesting that newer customers are more likely to leave the bank than long-term customers.`}

        output={"Tenure distribution visualization generated successfully."}

        images={[
            {
            src: barTenureDistByChurn,
            size: "max-w-4xl"
            }
        ]}
        />
        <SectionCard
        title="Gender-wise Churn Distribution"

        code={`# Gender vs Churn Donut Chart

        gender_counts = (
            df.groupby('gender')['churn']
            .value_counts(normalize=True)
            .unstack()
            .fillna(0)
        )

        for gender in gender_counts.index:

            plt.figure(figsize=(5,5))

            plt.pie(
                gender_counts.loc[gender],

                labels=['No Churn', 'Churn'],

                autopct='%1.1f%%',

                startangle=90,

                colors=['#6baed6','#de2d26']
            )

            center = plt.Circle((0,0),0.70, fc='white')

            fig = plt.gcf()

            fig.gca().add_artist(center)

            plt.title(f'Churn Ratio for {gender}')

            plt.tight_layout()

            plt.show()
        `}

        explanation={`Donut charts were created to visualize churn ratios separately for male and female customers.

        The dataset was grouped by gender, and normalized churn proportions were calculated using value_counts(normalize=True).

        A donut chart is a modified pie chart with a hollow center, making the visualization cleaner and easier to interpret visually.

        These charts help compare:
        - customer retention rates
        - churn percentages
        - gender-based behavioral differences

        By analyzing churn distributions separately for each gender category, it becomes easier to identify whether gender has a noticeable influence on customer retention patterns.`}

        insight={`Female customers showed a slightly higher churn proportion compared to male customers, suggesting that gender may contribute moderately to churn prediction performance.`}

        output={"Gender-wise churn donut charts generated successfully."}

        images={[
        {
            src: churnRatioFemale,
            size: "max-w-md",
            sideBySide: true
        },

        {
            src: churnRatioMale,
            size: "max-w-md",
            sideBySide: true
        }
        ]}
        />

        <SectionCard
        title="Categorical Feature Analysis"

        code={`# Categorical features

        cat_cols = [
            'country',
            'gender',
            'credit_card',
            'active_member'
        ]

        for c in cat_cols:

            plt.figure(figsize=(8,3))

            sns.countplot(
                data=df,
                x=c,
                hue='churn'
            )

            plt.title(f'{c} vs Churn')

            plt.xticks(rotation=30)

            plt.tight_layout()

            plt.show()
        `}

        explanation={`Countplots were generated to analyze how categorical customer features relate to churn behavior.

        Categorical variables contain grouped or label-based information rather than continuous numerical values.

        The selected categorical features included:
        - country
        - gender
        - credit card ownership
        - active membership status

        Using hue='churn' allows comparison between customers who stayed and customers who left the bank within each category.

        These visualizations help identify:
        - churn trends across categories
        - customer behavior patterns
        - class imbalances
        - feature importance signals

        Countplots are highly effective for understanding categorical distributions because they clearly display frequency comparisons across multiple groups.`}

        insight={`Active membership showed one of the strongest relationships with churn, as inactive customers were significantly more likely to leave the bank.`}

        output={"Categorical feature countplots generated successfully."}

        images={[
            {
            src: countryVsChurn,
            size: "max-w-2xl"
            },

            {
            src: genderVsChurn,
            size: "max-w-xl"
            },

            {
            src: creditCardVsChurn,
            size: "max-w-xl"
            },

            {
            src: activeMemberVsChurn,
            size: "max-w-xl"
            }
        ]}
        />

        <SectionCard
        title="Correlation Heatmap Analysis"

        code={`# Heatmap visualization

        corr = df.corr(numeric_only=True)

        plt.figure(figsize=(10,6))

        sns.heatmap(
            corr,
            annot=True,
            fmt='.2f',
            cmap='coolwarm',
            linewidths=0.5
        )

        plt.title('Correlation Matrix (Numeric Features)')

        plt.show()
        `}

        explanation={`A correlation heatmap was generated to analyze relationships between numerical features in the dataset.

        Correlation measures how strongly two variables are related to each other.

        The heatmap visually represents:
        - positive correlations
        - negative correlations
        - feature dependencies
        - relationship strength

        The annot=True parameter displays correlation values directly inside the heatmap cells, making interpretation easier.

        Using cmap='coolwarm' helps visually distinguish:
        - strong positive relationships
        - weak relationships
        - inverse relationships

        Heatmaps are extremely useful during exploratory data analysis because they help identify:
        - important predictive features
        - redundant variables
        - multicollinearity issues
        - hidden feature interactions`}

        insight={`Age showed a noticeable positive relationship with churn, while active membership had a negative relationship, indicating that active customers were less likely to leave the bank.`}

        output={"Correlation heatmap generated successfully."}

        images={[
        {
            src: correlationMatrix,
            size: "max-w-5xl"
        }
        ]}
        />

        <SectionCard
        title="Styled Numerical Correlation Heatmap"

        code={`# Numeric Correlation Heatmap

        numeric_data = df[num_cols]

        corr = numeric_data.corr()

        corr.style.background_gradient(cmap='coolwarm')
        `}

        explanation={`A styled correlation matrix was generated specifically for numerical features in the dataset.

        The corr() function calculates correlation coefficients between numerical variables, helping measure how strongly features are related to one another.

        Instead of plotting the values using Matplotlib or Seaborn, the Pandas styling API was used to apply a background color gradient directly to the dataframe.

        The background_gradient() method visually highlights:
        - strong positive correlations
        - weak relationships
        - negative correlations

        This approach provides a cleaner tabular representation of feature relationships while still maintaining visual interpretability.`}

        insight={`Features such as balance, age, and products number showed stronger relationships with churn-related behavior compared to some other numerical variables.`}

        output={"Styled numerical correlation matrix generated successfully."}

        images={[
            {
            src: heatmap,
            size: "max-w-4xl"
            }
        ]}
        />

        <SectionCard
        title="Balance vs Products Relationship Analysis"

        code={`# Balance vs Products scatter

        plt.figure(figsize=(7,5))

        sns.scatterplot(
            data=df,
            x='products_number',
            y='balance',
            hue='churn',
            alpha=0.7
        )

        plt.title('Balance vs Number of Products by Churn')

        plt.show()
        `}

        explanation={`A scatter plot was created to analyze the relationship between customer account balance and the number of products owned by each customer.

        Scatter plots are useful for identifying:
        - clustering behavior
        - trends
        - outliers
        - class separation patterns

        The x-axis represents the number of products owned by customers, while the y-axis represents account balance.

        Using hue='churn' visually separates churned and retained customers, making it easier to observe whether specific product and balance combinations are associated with higher churn probability.

        The alpha parameter adds transparency to points, helping reduce overlap in dense regions of the plot.`}

        insight={`Customers with fewer products and moderate-to-high balances showed comparatively higher churn patterns, suggesting that product engagement strongly influences retention.`}

        output={"Scatter plot visualization generated successfully."}

        images={[
            {
            src: balanceVsProductsByChurn,
            size: "max-w-4xl"
            }
        ]}
        />

        <SectionCard
        title="Churn Rate by Number of Products"

        code={`# Aggregate churn rate per number of products

        churn_rate = (
            df.groupby('products_number')['churn']
            .mean()
            .reset_index()
        )

        # Plot churn rate

        plt.figure(figsize=(8,5))

        sns.barplot(
            data=churn_rate,
            x='products_number',
            y='churn',
            palette='viridis'
        )

        plt.xlabel('Number of Products')

        plt.ylabel('Churn Rate')

        plt.title('Churn Rate vs Number of Products')

        plt.show()
        `}

        explanation={`A barplot was generated to analyze how customer churn rates vary depending on the number of products owned by a customer.

        The dataset was grouped by products_number, and the average churn value was calculated for each category.

        Since churn is represented as:
        - 0 → customer stays
        - 1 → customer leaves

        the mean value directly represents churn probability for each product group.

        This visualization helps identify:
        - customer engagement trends
        - product retention behavior
        - high-risk customer segments

        Barplots are especially effective for comparing aggregated statistics across categorical or discrete numerical groups.`}

        insight={`Customers owning fewer products showed noticeably higher churn rates, indicating that lower product engagement strongly increases the likelihood of customer attrition.`}

        output={"Churn rate analysis by product count generated successfully."}

        images={[
            {
            src: churnRateVsProducts,
            size: "max-w-4xl"
            }
        ]}
        />

        <SectionCard
        title="Feature Engineering"

        code={`# Feature engineering examples

        df_fe = df.copy()

        # Balance per product

        df_fe['balance_per_product'] = (
            df_fe['balance'] /
            (df_fe['products_number'].replace(0, np.nan))
        )

        df_fe['balance_per_product'].fillna(
            0,
            inplace=True
        )

        # Salary to balance ratio

        df_fe['salary_balance_ratio'] = (
            df_fe['estimated_salary'] /
            (df_fe['balance'].replace(0, np.nan))
        )

        df_fe['salary_balance_ratio'].replace(
            [np.inf, -np.inf],
            inplace=True
        )

        df_fe['salary_balance_ratio'].fillna(
            df_fe['salary_balance_ratio'].median(),
            inplace=True
        )

        # Age group

        bins = [0,25,35,45,55,65,100]

        labels = [
            '<25',
            '25-34',
            '35-44',
            '45-54',
            '55-65',
            '65+'
        ]

        df_fe['age_group'] = pd.cut(
            df_fe['age'],
            bins=bins,
            labels=labels
        )

        # Tenure bucket

        df_fe['tenure_bucket'] = pd.cut(
            df_fe['tenure'],
            bins=[-1,0,2,5,10,100],
            labels=['0','1-2','3-5','6-10','10+']
        )

        # Flag high balance

        df_fe['high_balance'] = (
            df_fe['balance'] >
            df_fe['balance'].quantile(0.75)
        ).astype(int)

        # Quick checks

        df_fe[[
            'balance_per_product',
            'salary_balance_ratio',
            'age',
            'age_group',
            'tenure',
            'tenure_bucket',
            'high_balance'
        ]].head()
        `}

        explanation={`Feature engineering was performed to create new meaningful variables from the existing dataset features.

        This step is extremely important in machine learning because well-designed features can significantly improve model performance and predictive capability.

        Several engineered features were created:

        - balance_per_product:
        Calculates the average balance associated with each owned product.

        - salary_balance_ratio:
        Measures the relationship between estimated salary and account balance.

        - age_group:
        Converts continuous age values into categorical age brackets.

        - tenure_bucket:
        Groups customers based on account tenure duration.

        - high_balance:
        Creates a binary indicator for customers with unusually high balances.

        Missing values and infinite values generated during calculations were handled carefully using fillna() and replacement operations.

        Feature engineering helps machine learning models capture hidden behavioral patterns that may not be directly visible in the raw dataset.`}

        insight={`Engineered features such as balance_per_product and age_group helped capture customer behavior patterns more effectively than using raw numerical values alone.`}

        output={"Feature engineering completed successfully."}

        images={[
            {
            src: featureEngineeringTable,
            size: "max-w-4xl"
            }
        ]}
        />  

        <SectionCard
        title="Preprocessing - Encoding & Scaling"

        code={`# Define features and target

        target = 'churn'

        drop_cols = ['customer_id']

        features = [
            c for c in df_fe.columns
            if c not in [target] + drop_cols
        ]

        # Numerical and categorical features

        numeric_features = [
            'credit_score',
            'age',
            'tenure',
            'balance',
            'products_number',
            'estimated_salary',
            'balance_per_product',
            'salary_balance_ratio'
        ]

        categorical_features = [
            'country',
            'gender',
            'credit_card',
            'active_member',
            'age_group',
            'tenure_bucket',
            'high_balance'
        ]

        df_fe[categorical_features] = (
            df_fe[categorical_features]
            .astype('object')
        )

        # Numerical preprocessing pipeline

        numeric_transformer = Pipeline([
            ('imputer',
                SimpleImputer(strategy='median')
            ),

            ('scaler',
                StandardScaler()
            )
        ])

        # Categorical preprocessing pipeline

        categorical_transformer = Pipeline([
            ('imputer',
                SimpleImputer(
                    strategy='most_frequent'
                )
            ),

            ('onehot',
                OneHotEncoder(
                    handle_unknown='ignore',
                    sparse_output=False
                )
            )
        ])

        # Combine preprocessing

        preprocessor = ColumnTransformer([
            (
                'num',
                numeric_transformer,
                numeric_features
            ),

            (
                'cat',
                categorical_transformer,
                categorical_features
            )
        ])

        print('Numeric features:', numeric_features)

        print('Categorical features:', categorical_features)
        `}

        explanation={`Data preprocessing was performed to prepare the dataset for machine learning model training.

        The preprocessing stage included:
        - feature selection
        - missing value handling
        - feature scaling
        - categorical encoding

        The target variable was defined as churn, while customer_id was removed because it does not contribute meaningful predictive information.

        Features were divided into:
        - numerical features
        - categorical features

        For numerical data:
        - missing values were filled using the median strategy
        - StandardScaler was applied to normalize feature values

        Feature scaling is important because many machine learning algorithms perform better when numerical variables are standardized.

        For categorical data:
        - missing values were filled using the most frequent category
        - OneHotEncoder converted categorical variables into machine-readable binary vectors

        A ColumnTransformer was then used to combine both preprocessing pipelines into a single unified preprocessing workflow.

        This modular preprocessing architecture improves:
        - scalability
        - reproducibility
        - deployment consistency
        - pipeline automation`}

        insight={`Separating preprocessing pipelines for numerical and categorical features creates a cleaner and more scalable machine learning workflow.`}

        output={`Numeric features:
        ['credit_score', 'age', 'tenure', 'balance',
        'products_number', 'estimated_salary',
        'balance_per_product', 'salary_balance_ratio']

        Categorical features:
        ['country', 'gender', 'credit_card',
        'active_member', 'age_group',
        'tenure_bucket', 'high_balance']
        `}
        />

        <SectionCard
        title="Train-Test Split"

        code={`# Train-Test Split

        X = df_fe[features]

        y = df_fe[target]

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            stratify=y,
            random_state=42
        )

        print(
            'Train shape:',
            X_train.shape,

            'Test shape:',
            X_test.shape
        )

        print(
            'Train churn proportion:',
            y_train.mean(),

            'Test churn proportion:',
            y_test.mean()
        )
        `}

        explanation={`The dataset was divided into training and testing sets using train_test_split().

        The feature matrix X contains all input variables used for prediction, while y contains the target variable representing customer churn.

        The split was configured using:
        - 80% training data
        - 20% testing data

        The stratify=y parameter ensures that the churn class distribution remains consistent across both training and testing datasets.

        This is extremely important for imbalanced datasets because it prevents one split from having disproportionately more churned or retained customers.

        The random_state parameter was fixed to 42 to ensure reproducibility, meaning the same split can be recreated consistently across different runs.`}

        insight={`Maintaining similar churn proportions in both training and testing datasets helps create fair and reliable model evaluation conditions.`}

        output={`Train shape: (8000, 15)
        Test shape: (2000, 15)

        Train churn proportion: 0.20375
        Test churn proportion: 0.2035
        `}
        />

        <SectionCard
        title="Training Multiple Models using Cross-Validation"

        code={`# Train Multiple Models with a Pipeline
        # and Compare using Cross-Validation

        models = {

            'LogisticRegression':
                LogisticRegression(max_iter=500),

            'RandomForest':
                RandomForestClassifier(
                    n_estimators=200,
                    random_state=42
                ),

            'GradientBoosting':
                GradientBoostingClassifier(
                    n_estimators=200,
                    random_state=42
                ),

            'AdaBoost':
                AdaBoostClassifier(
                    n_estimators=200,
                    random_state=42
                ),

            'SVC':
                SVC(
                    probability=True,
                    random_state=42
                )
        }

        # Cross-validation strategy

        cv = StratifiedKFold(
            n_splits=5,
            shuffle=True,
            random_state=42
        )

        results = {}

        # Train and evaluate models

        for name, model in models.items():

            pipe = Pipeline(steps=[

                ('preprocessor', preprocessor),

                ('classifier', model)

            ])

            scores = cross_val_score(
                pipe,
                X_train,
                y_train,
                cv=cv,
                scoring='roc_auc',
                n_jobs=-1
            )

            results[name] = scores

            print(
                f"{name} AUC: "
                f"Mean={scores.mean():.4f} "
                f"Std={scores.std():.4f}"
            )
        `}

        explanation={`Multiple machine learning algorithms were trained and compared to identify the best-performing model for churn prediction.

        Each model was combined with the preprocessing pipeline using Scikit-learn's Pipeline architecture. This ensures that preprocessing steps such as scaling and encoding are consistently applied during training and evaluation.

        The models tested included:
        - Logistic Regression
        - Random Forest
        - Gradient Boosting
        - AdaBoost
        - Support Vector Classifier (SVC)

        StratifiedKFold cross-validation was used to evaluate model performance while preserving the churn class distribution across all folds.

        The evaluation metric used was ROC-AUC score, which is highly effective for imbalanced binary classification problems like customer churn prediction.

        Cross-validation improves model reliability because performance is measured across multiple validation splits rather than a single train-test split.`}

        insight={`Gradient Boosting achieved the highest ROC-AUC score among all tested models, indicating the strongest predictive performance for churn classification.`}

        output={`LogisticRegression AUC: Mean=0.7877 Std=0.0244

        RandomForest AUC: Mean=0.8486 Std=0.0130

        GradientBoosting AUC: Mean=0.8628 Std=0.0097

        AdaBoost AUC: Mean=0.8462 Std=0.0133

        SVC AUC: Mean=0.8351 Std=0.0104
        `}
        />

        <SectionCard
        title="Model Performance Comparison"

        code={`# Boxplot of Cross-Validation ROC-AUC Scores

        plt.figure(figsize=(8,5))

        sns.boxplot(
            data=[
                results[m]
                for m in list(results.keys())
            ]
        )

        plt.xticks(
            ticks=range(len(results)),
            labels=list(results.keys())
        )

        plt.ylabel('ROC AUC')

        plt.title(
            'Model Comparison (Cross-Validated ROC AUC)'
        )

        plt.show()
        `}

        explanation={`A boxplot was generated to visually compare the ROC-AUC scores of all trained machine learning models across cross-validation folds.

        Instead of relying only on average scores, boxplots help analyze:
        - score distribution
        - consistency
        - variability
        - model stability

        Each box represents the spread of ROC-AUC scores achieved by a model during the 5-fold cross-validation process.

        This visualization makes it easier to compare:
        - overall performance
        - score fluctuations
        - robustness across folds

        Models with:
        - higher median scores
        - smaller variance
        - tighter distributions

        are generally considered more reliable and stable for prediction tasks.`}

        insight={`Gradient Boosting achieved both high ROC-AUC performance and relatively stable cross-validation results, making it the strongest overall model candidate.`}

        output={"Cross-validated ROC-AUC comparison visualization generated successfully."}

        images={[
            {
            src: modelComparisonROC,
            size: "max-w-4xl"
            }
        ]}
        />

        <SectionCard
        title="Selecting the Best Model"

        code={`# Choose best model
        # (automatic pick by mean AUC)

        best_name = max(
            results.keys(),
            key=lambda k: results[k].mean()
        )

        best_name, results[best_name].mean()
        `}

        explanation={`After evaluating all machine learning models using cross-validation, the best-performing model was selected automatically based on the highest average ROC-AUC score.

        The max() function was used to compare the mean ROC-AUC scores stored in the results dictionary.

        This approach ensures that model selection is:
        - automated
        - objective
        - reproducible

        Instead of manually choosing a model, the algorithm dynamically identifies the model with the strongest validation performance.

        Using ROC-AUC as the selection metric is especially effective for imbalanced binary classification problems because it measures the model's ability to distinguish between churned and retained customers across different classification thresholds.`}

        insight={`Gradient Boosting achieved the highest average ROC-AUC score and was therefore selected as the final churn prediction model.`}

        output={`('GradientBoosting', 0.8628)
        `}
        />

        <SectionCard
        title="Final Model Training & Evaluation"

        code={`# Final Model Pipeline

        best_model = models[best_name]

        best_pipeline = Pipeline(steps=[

            ('preprocessor', preprocessor),

            ('classifier', best_model)

        ])

        # Train final model

        best_pipeline.fit(X_train, y_train)

        # Predictions

        y_pred = best_pipeline.predict(X_test)

        y_proba = best_pipeline.predict_proba(X_test)[:,1]

        # Evaluation Metrics

        acc = accuracy_score(y_test, y_pred)

        prec = precision_score(y_test, y_pred)

        rec = recall_score(y_test, y_pred)

        f1 = f1_score(y_test, y_pred)

        roc = roc_auc_score(y_test, y_proba)

        print(f"Test Accuracy: {acc:.4f}")

        print(f"Test Precision: {prec:.4f}")

        print(f"Test Recall: {rec:.4f}")

        print(f"Test F1-score: {f1:.4f}")

        print(f"Test ROC AUC: {roc:.4f}")

        print("\\nClassification Report:")

        print(classification_report(y_test, y_pred))

        # Confusion Matrix

        cm = confusion_matrix(y_test, y_pred)

        sns.heatmap(
            cm,
            annot=True,
            fmt='d',
            cmap='Blues'
        )

        plt.xlabel('Predicted')

        plt.ylabel('Actual')

        plt.title(
            f'Confusion Matrix - {best_name}'
        )

        plt.show()
        `}

        explanation={`The best-performing model selected during cross-validation was trained on the full training dataset and evaluated on the unseen test dataset.

        A final machine learning pipeline was created by combining:
        - preprocessing
        - feature transformations
        - the selected classifier

        The trained model generated:
        - predicted classes using predict()
        - churn probabilities using predict_proba()

        Several evaluation metrics were then calculated to measure model performance:

        - Accuracy:
        Measures overall prediction correctness.

        - Precision:
        Measures how many predicted churn customers actually churned.

        - Recall:
        Measures how many actual churn customers were successfully identified.

        - F1-score:
        Balances precision and recall into a single metric.

        - ROC-AUC:
        Measures the model's ability to distinguish between churned and retained customers across different thresholds.

        A classification report was also generated to provide detailed class-wise evaluation metrics.

        Finally, a confusion matrix heatmap was plotted to visually compare:
        - correct predictions
        - false positives
        - false negatives
        - classification performance overall.`}

        insight={`The final Gradient Boosting model achieved strong overall performance with an ROC-AUC score of 0.8692, indicating high capability in distinguishing churned customers from retained customers.`}

        output={`Test Accuracy: 0.8680

        Test Precision: 0.7804

        Test Recall: 0.4889

        Test F1-score: 0.6012

        Test ROC AUC: 0.8692

        Classification Report:

                    precision    recall  f1-score   support

                0       0.88      0.96      0.92      1593
                1       0.78      0.49      0.60       407

            accuracy                           0.87      2000
        macro avg       0.83      0.73      0.76      2000
        weighted avg       0.86      0.87      0.86      2000
        `}

        images={[
            {
            src: confusionMatrix,
            size: "max-w-4xl"
            }
        ]}
        />

        <SectionCard
        title="Feature Importance Analysis"

        code={`# Feature Importance Analysis

        if hasattr(
            best_pipeline.named_steps['classifier'],
            'feature_importances_'
        ):

            num_feats = numeric_features

            cat_feats = list(

                best_pipeline
                .named_steps['preprocessor']
                .transformers_[1][1]
                .named_steps['onehot']
                .get_feature_names_out(
                    categorical_features
                )
            )

            feature_names = (
                num_feats + cat_feats
            )

            importances = (

                best_pipeline
                .named_steps['classifier']
                .feature_importances_
            )

            fi = pd.Series(
                importances,
                index=feature_names
            ).sort_values(
                ascending=False
            )[:20]

            display(fi)

            plt.figure(figsize=(8,6))

            sns.barplot(
                x=fi.values,
                y=fi.index
            )

            plt.title(
                'Top 20 Feature Importances'
            )

            plt.show()

        else:

            print(
                'Selected model does not provide '
                'feature_importances_ attribute.'
            )
        `}

        explanation={`Feature importance analysis was performed to identify which variables contributed most strongly to churn prediction.

        Since the selected Gradient Boosting model supports feature_importances_, the importance score of each feature could be extracted directly from the trained classifier.

        The preprocessing pipeline transformed categorical variables using One-Hot Encoding, so the encoded feature names were also retrieved and combined with the numerical feature names.

        The feature importance values were then:
        - converted into a Pandas Series
        - sorted in descending order
        - filtered to display the top 20 most influential features

        Finally, a barplot was generated to visually compare the contribution of each feature.

        Feature importance analysis is extremely useful because it helps:
        - interpret model behavior
        - identify dominant predictive variables
        - understand customer churn patterns
        - improve explainability of the machine learning system.`}

        insight={`Age and products_number emerged as the two most influential features in churn prediction, indicating that customer demographics and product engagement strongly affect retention behavior.`}

        output={`age                     0.327665
        products_number         0.266459
        balance_per_product     0.063396
        balance                 0.056953
        active_member_0         0.052653
        country_Germany         0.050689
        active_member_1         0.047992
        salary_balance_ratio    0.029992
        estimated_salary        0.025547
        credit_score            0.022685
        age_group_45-54         0.020634
        age_group_55-65         0.007968
        gender_Female           0.006850
        gender_Male             0.006532
        tenure                  0.005683
        country_France          0.003164
        tenure_bucket_3-5       0.001564
        age_group_35-44         0.001415
        credit_card_1           0.000697
        country_Spain           0.000577
        dtype: float64
        `}

        images={[
            {
            src: topFeatureImportances,
            size: "max-w-4xl"
            }
        ]}
        />

        <SectionCard
        title="Saving the Trained Pipeline"

        code={`# Save the trained pipeline

        joblib.dump(
            best_pipeline,
            'best_churn_pipeline.pkl'
        )

        print(
            "Saved pipeline: best_churn_pipeline.pkl"
        )
        `}

        explanation={`After training and evaluating the final churn prediction model, the complete machine learning pipeline was saved using Joblib.

        The saved pipeline contains:
        - preprocessing steps
        - feature transformations
        - trained Gradient Boosting model
        - encoding configuration
        - scaling configuration

        Saving the entire pipeline is extremely important because it allows the exact same trained model workflow to be reused later during deployment and inference.

        Instead of rebuilding preprocessing and training steps every time, the saved .pkl file can simply be loaded and used directly for prediction.

        This improves:
        - deployment efficiency
        - reproducibility
        - consistency
        - scalability

        Joblib is commonly used for serializing Scikit-learn models because it efficiently handles large NumPy arrays and machine learning objects.`}

        insight={`Saving the complete pipeline instead of only the model ensures that preprocessing and prediction behavior remain fully consistent during deployment.`}

        output={`Saved pipeline: best_churn_pipeline.pkl
        `}
        />

        <SectionCard
        title="Predicting Churn for a New Customer"

        code={`# New customer sample

        sample = {

            'customer_id': 373292028,

            'credit_score': 650,

            'country': 'France',

            'gender': 'Male',

            'age': 40,

            'tenure': 3,

            'balance': 50000.0,

            'products_number': 2,

            'credit_card': 1,

            'active_member': 1,

            'estimated_salary': 60000.0
        }

        sample_df = pd.DataFrame([sample])

        # Apply same feature engineering

        sample_df['balance_per_product'] = (
            sample_df['balance'] /
            (
                sample_df['products_number']
                .replace(0, np.nan)
            )
        )

        sample_df['balance_per_product'].fillna(
            0,
            inplace=True
        )

        sample_df['salary_balance_ratio'] = (
            sample_df['estimated_salary'] /
            (
                sample_df['balance']
                .replace(0, np.nan)
            )
        )

        sample_df['salary_balance_ratio'].replace(
            [np.inf, -np.inf],
            np.nan,
            inplace=True
        )

        sample_df['salary_balance_ratio'].fillna(
            sample_df['salary_balance_ratio']
            .median(),
            inplace=True
        )

        # Age groups

        bins = [0,25,35,45,55,65,100]

        labels = [
            '<25',
            '25-34',
            '35-44',
            '45-54',
            '55-64',
            '65+'
        ]

        sample_df['age_group'] = pd.cut(
            sample_df['age'],
            bins=bins,
            labels=labels
        )

        # Tenure buckets

        sample_df['tenure_bucket'] = pd.cut(
            sample_df['tenure'],
            bins=[-1,0,2,5,10,100],
            labels=['0','1-2','3-5','6-10','10+']
        )

        # High balance flag

        sample_df['high_balance'] = (
            sample_df['balance'] > 50000.0
        ).astype(int)

        # Drop customer ID

        sample_df = sample_df.drop(
            columns=['customer_id']
        )

        # Predict

        pred = best_pipeline.predict(sample_df)[0]

        prob = (
            best_pipeline
            .predict_proba(sample_df)[0,1]
        )

        print(
            f'Predicted churn: {pred}, '
            f'probability of churn: {prob:.3f}'
        )
        `}

        explanation={`After training and saving the final machine learning pipeline, a prediction was performed for a completely new customer sample.

        A new customer record was manually created containing:
        - demographic information
        - banking details
        - account balance
        - product information
        - salary data

        The same feature engineering steps used during model training were applied to the new customer data to ensure consistency between training and inference.

        This included:
        - balance_per_product calculation
        - salary_balance_ratio calculation
        - age grouping
        - tenure bucketing
        - high balance flag generation

        The customer_id column was removed because it is not a predictive feature.

        The trained pipeline then generated:
        - a churn prediction class
        - a churn probability score

        Using the full pipeline ensures that preprocessing and prediction happen automatically in a single unified workflow.`}

        insight={`The model predicted that the customer would not churn, with a churn probability of only 3%, indicating a low-risk retention profile.`}

        output={`Predicted churn: 0
        Probability of churn: 0.030
        `}
        />
        

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

export default Explanation;