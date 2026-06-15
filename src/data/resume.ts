export const profile = {
  name: 'Sai Tejaswar Reddy Dalli',
  firstName: 'Sai Tejaswar',
  role: 'AI/ML Engineer',
  // Short rotating descriptors shown in the hero
  roles: [
    'AI/ML Engineer',
    'Generative AI & RAG',
    'MLOps & LLMOps',
    'Fraud Detection Systems',
  ],
  tagline:
    'I build scalable machine learning, generative AI, and data-driven systems — from RAG and multi-agent platforms to fraud detection and production MLOps.',
  summary:
    'AI/ML Engineer with around 5 years of experience building scalable machine learning, generative AI, and data-driven solutions across financial services and enterprise domains. I work end-to-end — from fine-tuning LLMs and designing RAG pipelines to shipping governed, monitored models in production with CI/CD.',
  location: 'California, USA',
  relocation: 'Open to relocation',
  email: 'tejaswar8484@gmail.com',
  phone: '+1 (562) 569-3720',
  // Update this with your real LinkedIn URL
  linkedin: 'https://www.linkedin.com/',
  github: '',
};

export const stats = [
  { value: '~5', label: 'Years in AI/ML', suffix: ' yrs' },
  { value: '20M+', label: 'Records processed daily' },
  { value: '45%', label: 'Faster knowledge retrieval' },
  { value: '40%', label: 'Faster deployment cycles' },
];

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    company: 'American Express',
    location: 'USA',
    role: 'AI Engineer',
    period: 'Aug 2025 – Present',
    current: true,
    highlights: [
      'Built enterprise-grade AI solutions using GPT-4, LangChain, and RAG with Pinecone and ChromaDB, enabling real-time retrieval across 15M+ customer interaction records and cutting analyst research time by 45%.',
      'Engineered fine-tuned transformer models with TensorFlow and LlamaIndex to automate fraud-risk classification and support workflows — improving prediction accuracy by 28% and reducing manual case handling by 35%.',
      'Developed MLOps infrastructure with MLflow and GitHub Actions CI/CD, accelerating deployment cycles by 40% while ensuring governance, reproducibility, and compliance.',
      'Implemented explainable AI with SHAP and LIME for XGBoost credit-risk and underwriting models, improving transparency for regulatory audits.',
      'Spearheaded multi-agent AI systems with LangChain orchestration and RAG, increasing operational efficiency by 30% and reducing response turnaround by 50%.',
    ],
    stack: ['GPT-4', 'LangChain', 'RAG', 'Pinecone', 'ChromaDB', 'TensorFlow', 'MLflow', 'XGBoost', 'SHAP'],
  },
  {
    company: 'Infosys',
    location: 'India',
    role: 'AI/ML Engineer',
    period: 'Feb 2020 – Jan 2023',
    highlights: [
      'Designed fraud-detection pipelines with BigQuery ML, GCP Dataflow, and PostgreSQL processing 20M+ transactional records daily — improving fraud identification accuracy by 32% and reducing false positives by 25%.',
      'Built scalable ML workflows with TensorFlow Extended (TFX), Vertex AI, Docker, and GKE, reducing release cycles by 40%.',
      'Optimized forecasting models with LightGBM, ARIMA, and Prophet, increasing forecasting accuracy by 27%.',
      'Implemented computer vision and NLP with Mask R-CNN, NER, and NLTK to automate document classification and invoice extraction, reducing manual processing by 50%.',
      'Instituted MLOps best practices and built Tableau dashboards, reducing issue-resolution time by 35%.',
    ],
    stack: ['BigQuery ML', 'GCP Dataflow', 'Vertex AI', 'TFX', 'GKE', 'LightGBM', 'Prophet', 'Mask R-CNN'],
  },
  {
    company: 'Hexaware Technologies',
    location: 'India',
    role: 'Junior Data Scientist',
    period: 'Jan 2019 – Jan 2020',
    highlights: [
      'Analyzed structured and unstructured datasets with Python, SQL, Pandas, NumPy, and EDA, improving reporting accuracy by 25%.',
      'Built predictive models (Decision Trees, Random Forests, Naive Bayes, XGBoost) improving churn prediction accuracy by 30%.',
      'Engineered clustering and dimensionality reduction (K-Means, DBSCAN, PCA) to segment customers, improving campaign conversion by 18%.',
      'Built data pipelines with PySpark, MongoDB, and AWS (SageMaker, S3, Lambda), reducing manual processing time by 40%.',
      'Created NLP analytics with NLTK and PyTorch and designed Power BI dashboards for KPI tracking.',
    ],
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'PySpark', 'MongoDB', 'AWS SageMaker', 'Power BI'],
  },
];

export interface Project {
  name: string;
  blurb: string;
  highlights: string[];
  stack: string[];
}

export const projects: Project[] = [
  {
    name: 'LLM Fine-Tuning & Evaluation Pipeline',
    blurb: 'A domain-specific LLM training and evaluation workflow, documented end to end.',
    highlights: [
      'Fine-tuned a pre-trained LLaMA model for domain-specific text generation using custom training pipelines.',
      'Built a model-evaluation pipeline to assess fine-tuned performance and validate output quality.',
      'Documented the full fine-tuning and deployment workflow, including model configuration and inference setup.',
    ],
    stack: ['LLaMA', 'PEFT / LoRA', 'Hugging Face', 'PyTorch', 'Evaluation'],
  },
  {
    name: 'Ficopilot — AI Financial Agent',
    blurb: 'Natural-language financial analysis over your own spreadsheets.',
    highlights: [
      'Built an AI-powered financial analysis app in Streamlit enabling natural-language queries over uploaded Excel data.',
      'Automated analysis of revenue vs budget variance, gross margin, operating expenses, EBITDA, and cash runway.',
      'Created interactive Plotly visualizations with data validation and robust error handling.',
    ],
    stack: ['Streamlit', 'LLMs', 'Plotly', 'Pandas', 'Prompt Engineering'],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Generative AI',
    items: [
      'LangChain',
      'LangGraph',
      'LlamaIndex',
      'RAG',
      'GPT-4',
      'Claude',
      'LLaMA',
      'CrewAI',
      'Multi-Agent Systems',
      'LoRA / QLoRA / PEFT',
      'Prompt Engineering',
    ],
  },
  {
    label: 'ML & Deep Learning',
    items: [
      'TensorFlow',
      'PyTorch',
      'Keras',
      'XGBoost',
      'LightGBM',
      'Scikit-learn',
      'Random Forests',
      'PCA',
      'K-Means / DBSCAN',
      'ARIMA / Prophet',
      'Mask R-CNN',
    ],
  },
  {
    label: 'NLP',
    items: ['BERT', 'RoBERTa', 'Hugging Face Transformers', 'NER', 'NLTK', 'SHAP', 'LIME'],
  },
  {
    label: 'MLOps & DevOps',
    items: [
      'MLflow',
      'Kubeflow',
      'TFX',
      'Docker',
      'Kubernetes (GKE/EKS)',
      'Terraform',
      'CI/CD',
      'GitHub Actions',
      'Jenkins',
      'Model Monitoring',
    ],
  },
  {
    label: 'Cloud',
    items: [
      'GCP — Vertex AI',
      'BigQuery',
      'Dataflow',
      'Cloud Composer',
      'AWS — SageMaker',
      'S3 / Lambda',
      'Azure ML Studio',
      'Databricks',
    ],
  },
  {
    label: 'Data & Visualization',
    items: [
      'Python',
      'SQL',
      'R',
      'Pandas / NumPy',
      'PySpark',
      'PostgreSQL',
      'MongoDB',
      'Pinecone / FAISS / ChromaDB',
      'Tableau',
      'Power BI',
    ],
  },
];

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
}

export const education: Education[] = [
  {
    degree: 'M.S. in Computer Science',
    school: 'California State University, Dominguez Hills',
    location: 'California, USA',
    period: 'May 2025',
    gpa: '3.52',
  },
  {
    degree: 'B.Tech in Computer Science',
    school: 'Raghu Engineering College',
    location: 'Andhra Pradesh, India',
    period: 'May 2019',
    gpa: '3.0',
  },
];

export const certifications = [
  'AWS Certified AI Practitioner',
  'Generative AI with AWS — Udacity',
  'Model Context Protocol (MCP) for Beginners — Microsoft',
  'Scientific Computing with Python',
  'AWS Academy Graduate — ML through Application',
  'Infrastructure & App Modernization with Google Cloud',
];
