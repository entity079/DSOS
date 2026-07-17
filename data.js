const DEFAULT_DATA = {
  "streak": 5,
  "modules": [
    {
      "id": "mod_sql_0",
      "domain": "sql",
      "title": "Module 0: Revision",
      "description": "Fundamental queries revision covering filters, joins, groupings, and aggregates.",
      "estimatedHours": 15,
      "interviewWeight": 3,
      "outcomes": [
        "✓ Recall basic query filters",
        "✓ Perform aggregations with GROUP BY",
        "✓ Join multiple tables correctly"
      ],
      "prerequisites": [
        "Basic database query concepts",
        "Relational schema understanding"
      ],
      "deliverables": [
        "Preloaded core revision scripts"
      ],
      "masteryChecklist": [
        "Can explain inner vs outer joins",
        "Can aggregate data using HAVING",
        "Can use CASE conditional logic"
      ]
    },
    {
      "id": "mod_sql_1",
      "domain": "sql",
      "title": "Module 1: Advanced SQL",
      "description": "Window partitions, analytical aggregations, recursive CTEs, and gaps/islands challenges.",
      "estimatedHours": 25,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Design window partitions and frames",
        "✓ Construct recursive Common Table Expressions (CTEs)",
        "✓ Solve gaps and islands problems"
      ],
      "prerequisites": [
        "SELECT & WHERE queries",
        "Basic Joins"
      ],
      "deliverables": [
        "Advanced Analytics Query templates"
      ],
      "masteryChecklist": [
        "Can write running totals using ROWS frames",
        "Can query hierarchies via recursive CTEs",
        "Can identify sequences islands"
      ]
    },
    {
      "id": "mod_sql_2",
      "domain": "sql",
      "title": "Module 2: Query Optimization",
      "description": "Composite indexing, covering indexes, query plans traversal, and predicate pushdown.",
      "estimatedHours": 18,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Index columns using composite keys",
        "✓ Read query execution plans (EXPLAIN)",
        "✓ Optimize join predicates"
      ],
      "prerequisites": [
        "Index concepts",
        "Table size analysis"
      ],
      "deliverables": [
        "Query performance review document"
      ],
      "masteryChecklist": [
        "Can explain B-Tree index structure",
        "Can interpret EXPLAIN ANALYZE run output",
        "Can eliminate redundant subqueries"
      ]
    },
    {
      "id": "mod_sql_3",
      "domain": "sql",
      "title": "Module 3: Database Design",
      "description": "First, second, and third normalization forms, fact/dimension structures, and key mappings.",
      "estimatedHours": 12,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Design Fact and Dimension schemas",
        "✓ Apply normalization levels up to 3NF",
        "✓ Establish primary/foreign key relationships"
      ],
      "prerequisites": [
        "Relational mappings"
      ],
      "deliverables": [
        "Star Schema E-commerce model diagram"
      ],
      "masteryChecklist": [
        "Can normalize table structures to 3NF",
        "Can explain Star vs Snowflake schemas",
        "Can map composite relationships"
      ]
    },
    {
      "id": "mod_sql_4",
      "domain": "sql",
      "title": "Module 4: Production SQL",
      "description": "Virtual columns caching, transactions concurrency control, and table lock mitigations.",
      "estimatedHours": 14,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Create views and materialized views",
        "✓ Structure transactional ACID checks",
        "✓ Handle database locking constraints"
      ],
      "prerequisites": [
        "Table write scopes"
      ],
      "deliverables": [
        "Transactional schema scripts"
      ],
      "masteryChecklist": [
        "Can create materialized views with refreshes",
        "Can explain ACID transactions parameters",
        "Can handle locking scenarios"
      ]
    },
    {
      "id": "mod_sql_5",
      "domain": "sql",
      "title": "Module 5: Analytical SQL",
      "description": "Temporal cohorts, retention curves, conversion pipelines, and churn metrics logging.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Code cohort analysis reports",
        "✓ Calculate user retention and churn models",
        "✓ Design sales conversion funnel logic"
      ],
      "prerequisites": [
        "Window Functions",
        "GROUP BY aggregations"
      ],
      "deliverables": [
        "SaaS Cohort Analysis query library"
      ],
      "masteryChecklist": [
        "Can query rolling cohort percentages",
        "Can construct retention curves",
        "Can model funnel steps conversion"
      ]
    },
    {
      "id": "mod_sql_6",
      "domain": "sql",
      "title": "Module 6: Interview Prep",
      "description": "LeetCode medium and hard analytical challenges, query planning, and conceptual walkthroughs.",
      "estimatedHours": 22,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Solve Medium LeetCode database problems",
        "✓ Answer join optimization questions",
        "✓ Think aloud during technical tests"
      ],
      "prerequisites": [
        "All core SQL skills"
      ],
      "deliverables": [
        "LeetCode SQL problem log"
      ],
      "masteryChecklist": [
        "Can solve LeetCode medium questions under 25m",
        "Can explain indexing during mock tests",
        "Can handle case interviews"
      ]
    },
    {
      "id": "mod_sql_7",
      "domain": "sql",
      "title": "Module 7: Projects",
      "description": "End-to-end production database audit, eCommerce customer lifecycle dashboard, and indexing optimizations.",
      "estimatedHours": 30,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Build a production eCommerce analytics database",
        "✓ Model sales and user retention funnels",
        "✓ Optimize slow analytical queries"
      ],
      "prerequisites": [
        "eCommerce Analytics Project"
      ],
      "deliverables": [
        "eCommerce Database Portfolio Repo"
      ],
      "masteryChecklist": [
        "Can design star-schema database models",
        "Can push queries to production repos",
        "Can document index optimizations"
      ]
    },
    {
      "id": "mod_py_0",
      "domain": "python",
      "title": "Module 0: Competency Assessment",
      "description": "Standard sequences, dictionary hashing constraints, comprehensions, and search loops basics.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Apply sequences and comprehensions",
        "✓ Handle closures and functional scopes",
        "✓ Write conditional loops"
      ],
      "prerequisites": [
        "Basic coding syntax"
      ],
      "deliverables": [
        "Basic exercises answers scripts"
      ],
      "masteryChecklist": [
        "Can write nested dict/list comprehensions",
        "Can use binary search closures",
        "Can map local vs global namespaces"
      ]
    },
    {
      "id": "mod_py_1",
      "domain": "python",
      "title": "Module 1: Professional OOP",
      "description": "Constructors properties, diamond inheritance schemas, Minto composition, and dunder magic methods.",
      "estimatedHours": 25,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Design class hierarchies",
        "✓ Build reusable classes",
        "✓ Apply inheritance correctly",
        "✓ Understand composition",
        "✓ Read production OOP code"
      ],
      "prerequisites": [
        "Functions",
        "Closures",
        "Scope",
        "Higher-order functions"
      ],
      "deliverables": [
        "Student Management System",
        "Library Management System",
        "Banking System",
        "Hospital Management System"
      ],
      "masteryChecklist": [
        "Can implement C3 Linearization class super()",
        "Can overload operators via magic dunder methods",
        "Can write class properties wrappers"
      ]
    },
    {
      "id": "mod_py_2",
      "domain": "python",
      "title": "Module 2: Pythonic Programming",
      "description": "Yield generator pipelines, function closures decorators, and context managers memory streams.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Code custom decorators and closures",
        "✓ Implement yield generators for lazy streams",
        "✓ Overload magic dunder methods"
      ],
      "prerequisites": [
        "Module 1 OOP",
        "Functions Scopes"
      ],
      "deliverables": [
        "Lazy data pipeline script"
      ],
      "masteryChecklist": [
        "Can write metadata preserving decorators",
        "Can create custom __enter__/__exit__ managers",
        "Can pipeline lazy generators"
      ]
    },
    {
      "id": "mod_py_3",
      "domain": "python",
      "title": "Module 3: Professional Python",
      "description": "Package structures, local PyPI distributions, error scopes, and dynamic configuration loggers.",
      "estimatedHours": 18,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Build reusable local packages",
        "✓ Capture code errors using custom exceptions",
        "✓ Configure script loggers"
      ],
      "prerequisites": [
        "Module 0 foundations"
      ],
      "deliverables": [
        "Custom packaged library"
      ],
      "masteryChecklist": [
        "Can structure nested import packages",
        "Can raise custom inherit exceptions",
        "Can bind console/file log handlers"
      ]
    },
    {
      "id": "mod_py_4",
      "domain": "python",
      "title": "Module 4: Standard Library Mastery",
      "description": "Itertools optimization, collections counters, pathlib filesystem traverses, and slots memory locks.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Utilize collections and itertools",
        "✓ Navigate filesystems using pathlib",
        "✓ Optimize memory using __slots__"
      ],
      "prerequisites": [
        "Module 0 foundations"
      ],
      "deliverables": [
        "FileSystem Organizer script"
      ],
      "masteryChecklist": [
        "Can write complex chain itertools loops",
        "Can traverse directory subtrees dynamically",
        "Can lock variables via __slots__"
      ]
    },
    {
      "id": "mod_py_5",
      "domain": "python",
      "title": "Module 5: Testing & Code Quality",
      "description": "Pytest frameworks, testing fixtures parametrization, assertion mechanics, and mock APIs integrations.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Write pytest testing suits",
        "✓ Configure parameters and fixtures",
        "✓ Test edge cases and errors"
      ],
      "prerequisites": [
        "Classes and Functions"
      ],
      "deliverables": [
        "Pytest coverage metrics report"
      ],
      "masteryChecklist": [
        "Can isolate tests using session/module fixtures",
        "Can parameterize inputs for multiple iterations",
        "Can assert errors and mocks"
      ]
    },
    {
      "id": "mod_py_6",
      "domain": "python",
      "title": "Module 6: Data Processing",
      "description": "Vectorized numpy array slices, Pandas merges groupings, and analytics cleaning routines.",
      "estimatedHours": 22,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Vectorize mathematics using NumPy",
        "✓ Group and merge datasets in Pandas",
        "✓ Pivot and clean tables"
      ],
      "prerequisites": [
        "pathlib filesystem modules",
        "collections"
      ],
      "deliverables": [
        "Pandas Data Analytics pipeline script"
      ],
      "masteryChecklist": [
        "Can optimize Pandas loops using vectorizations",
        "Can merge dataframes using complex indexes",
        "Can pivot and shape matrices"
      ]
    },
    {
      "id": "mod_py_7",
      "domain": "python",
      "title": "Module 7: Data Science",
      "description": "Preprocessing scikit-learn transformers, models pipelines validation, and error evaluation metrics.",
      "estimatedHours": 24,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Build ColumnTransformer data structures",
        "✓ Deploy preprocessing scikit-learn models",
        "✓ Train predictive algorithms"
      ],
      "prerequisites": [
        "Pandas Data Processing"
      ],
      "deliverables": [
        "Scikit-learn model artifacts"
      ],
      "masteryChecklist": [
        "Can build complete scikit-learn ColumnTransformer",
        "Can validate model models pipelines",
        "Can plot precision-recall metrics"
      ]
    },
    {
      "id": "mod_py_8",
      "domain": "python",
      "title": "Module 8: Automation",
      "description": "Automated system organization scripting, os folder monitoring, and scheduled cron automations.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Script directory folder monitoring tasks",
        "✓ Automate system organization",
        "✓ Log filesystem events"
      ],
      "prerequisites": [
        "FileSystem Organizer Script"
      ],
      "deliverables": [
        "Automated folder organizer script"
      ],
      "masteryChecklist": [
        "Can automate directory cleanups",
        "Can trap filesystem script signals",
        "Can parse logging streams"
      ]
    },
    {
      "id": "mod_py_9",
      "domain": "python",
      "title": "Module 9: APIs",
      "description": "HTTP request keys authentication, JSON payload streams, and status rate limit codes catcher.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Request database API endpoints",
        "✓ Parse OAuth headers",
        "✓ Handle API rate limit codes"
      ],
      "prerequisites": [
        "JSON files traversal"
      ],
      "deliverables": [
        "Weather Dashboard API pipeline script"
      ],
      "masteryChecklist": [
        "Can handle requests session retries",
        "Can parse nested JSON streams",
        "Can mock API responses in testing"
      ]
    },
    {
      "id": "mod_py_10",
      "domain": "python",
      "title": "Module 10: Advanced Python",
      "description": "Asynchronous coroutines, event gather structures, and thread pools operations.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Write asynchronous coroutines",
        "✓ Handle concurrency gather events",
        "✓ Prevent database thread blocks"
      ],
      "prerequisites": [
        "Generators and Iterators"
      ],
      "deliverables": [
        "Async web crawler script"
      ],
      "masteryChecklist": [
        "Can write gather async coroutines loops",
        "Can explain GIL limitations in threads",
        "Can parse async tasks queues"
      ]
    },
    {
      "id": "mod_py_11",
      "domain": "python",
      "title": "Module 11: Reading Real Code",
      "description": "Auditing open-source library modules, trace-backs mapping, and structural patterns analysis.",
      "estimatedHours": 12,
      "interviewWeight": 4,
      "outcomes": [
        "✓ Review open-source pytest directories",
        "✓ Understand production library constructs",
        "✓ Document third-party frameworks"
      ],
      "prerequisites": [
        "Pytest testing",
        "OOP magic methods"
      ],
      "deliverables": [
        "Pytest codebase design audit"
      ],
      "masteryChecklist": [
        "Can read raw pytest source files",
        "Can map third-party plugins interfaces",
        "Can trace complex package classes MRO"
      ]
    },
    {
      "id": "mod_py_12",
      "domain": "python",
      "title": "Module 12: Portfolio",
      "description": "Repository setups, markdown profile templates, automated scripts documentation.",
      "estimatedHours": 15,
      "interviewWeight": 5,
      "outcomes": [
        "✓ Package scripts for GitHub",
        "✓ Write professional README files",
        "✓ Deploy portfolios page"
      ],
      "prerequisites": [
        "All python projects"
      ],
      "deliverables": [
        "GitHub developer portfolios profile"
      ],
      "masteryChecklist": [
        "Can deploy static portfolios pages",
        "Can format README using standard sections",
        "Can index code repositories"
      ]
    },
    {
      "id": "mod_pc_0",
      "domain": "prof_comm",
      "title": "Module 0: Speaking",
      "description": "Speaking foundations and reducing conversational filler words.",
      "estimatedHours": 10,
      "interviewWeight": 4,
      "outcomes": [
        "Reduce filler words",
        "Speak clearly",
        "Pacing"
      ],
      "prerequisites": [],
      "deliverables": [
        "Recorded audio speech"
      ],
      "masteryChecklist": [
        "No filler words",
        "Pacing control"
      ]
    },
    {
      "id": "mod_pc_1",
      "domain": "prof_comm",
      "title": "Module 1: Writing",
      "description": "Professional emails and concise async Slack communication.",
      "estimatedHours": 12,
      "interviewWeight": 3,
      "outcomes": [
        "Concise emails",
        "Slack updates"
      ],
      "prerequisites": [],
      "deliverables": [
        "Email drafts"
      ],
      "masteryChecklist": [
        "Construct professional emails",
        "Slack status reports"
      ]
    },
    {
      "id": "mod_pc_2",
      "domain": "prof_comm",
      "title": "Module 2: Presentations",
      "description": "Structuring a compelling visual narrative slide deck.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "Narrative slide decks",
        "Pyramid principle"
      ],
      "prerequisites": [],
      "deliverables": [
        "Visual slide presentation"
      ],
      "masteryChecklist": [
        "Design slide hierarchy",
        "Visual explanations"
      ]
    },
    {
      "id": "mod_pc_3",
      "domain": "prof_comm",
      "title": "Module 3: Documentation",
      "description": "Markdown documentation structure and clean repository READMEs.",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "Markdown documents",
        "Clean READMEs"
      ],
      "prerequisites": [],
      "deliverables": [
        "README.md files"
      ],
      "masteryChecklist": [
        "Create clean markdown README",
        "API response examples docs"
      ]
    },
    {
      "id": "mod_pc_4",
      "domain": "prof_comm",
      "title": "Module 4: Data Storytelling",
      "description": "Translating modeling metrics into business dollars.",
      "estimatedHours": 18,
      "interviewWeight": 5,
      "outcomes": [
        "Metric translation",
        "Storytelling with Data"
      ],
      "prerequisites": [],
      "deliverables": [
        "Executive presentation deck"
      ],
      "masteryChecklist": [
        "Translate precision/recall metrics",
        "ROI models design"
      ]
    },
    {
      "id": "mod_pc_5",
      "domain": "prof_comm",
      "title": "Module 5: Business Communication",
      "description": "Managing stakeholder alignments, conflicts, and expectations.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "Stakeholder alignments",
        "Crucial conversations"
      ],
      "prerequisites": [],
      "deliverables": [
        "Strategy document"
      ],
      "masteryChecklist": [
        "Defend data decision with evidence",
        "Resolve alignments conflicts"
      ]
    },
    {
      "id": "mod_ip_0",
      "domain": "interview_prep",
      "title": "Module 0: Interview Foundations",
      "description": "Overview of interview structures (HR, Tech, Managerial, Case Study, Systems).",
      "estimatedHours": 8,
      "interviewWeight": 3,
      "outcomes": [
        "Understand interview channels"
      ],
      "prerequisites": [],
      "deliverables": [
        "Interview funnel checklist"
      ],
      "masteryChecklist": [
        "Distinguish interviewer roles",
        "OA guidelines check"
      ]
    },
    {
      "id": "mod_ip_1",
      "domain": "interview_prep",
      "title": "Module 1: Personal Branding",
      "description": "Formulating elevator pitches, tell me about yourself hooks, and resume walks.",
      "estimatedHours": 12,
      "interviewWeight": 5,
      "outcomes": [
        "90s elevator pitch",
        "Resume walk"
      ],
      "prerequisites": [],
      "deliverables": [
        "Introduction video or speech"
      ],
      "masteryChecklist": [
        "Pitch under 90s",
        "Highlights hook points"
      ]
    },
    {
      "id": "mod_ip_2",
      "domain": "interview_prep",
      "title": "Module 2: Behavioral Interviews",
      "description": "Mastering STAR structure and building a versatile 20-story bank.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "STAR stories",
        "Behavioral questions response"
      ],
      "prerequisites": [],
      "deliverables": [
        "20 STAR Story Bank"
      ],
      "masteryChecklist": [
        "Structure STAR answers in under 2m",
        "Quantified results verification"
      ]
    },
    {
      "id": "mod_ip_3",
      "domain": "interview_prep",
      "title": "Module 3: Technical Communication",
      "description": "Explaining coding, algorithms, and math concepts to diverse stakeholders.",
      "estimatedHours": 15,
      "interviewWeight": 5,
      "outcomes": [
        "Technical communication",
        "Concept translation"
      ],
      "prerequisites": [],
      "deliverables": [
        "Stakeholder explainers document"
      ],
      "masteryChecklist": [
        "Explain indexes to child vs CEO",
        "Use analogies to describe modeling"
      ]
    },
    {
      "id": "mod_ip_4",
      "domain": "interview_prep",
      "title": "Module 4: Project Defense",
      "description": "Answering Problem, Why, Alternatives, and Trade-offs for built projects.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "Project defense",
        "Architecture tradeoffs"
      ],
      "prerequisites": [],
      "deliverables": [
        "Architecture defense slides"
      ],
      "masteryChecklist": [
        "Defend model and feature choice",
        "Define limits and improvements"
      ]
    },
    {
      "id": "mod_ip_5",
      "domain": "interview_prep",
      "title": "Module 5: Case Studies",
      "description": "Solving business case studies (Netflix, Uber, Swiggy) via structured frameworks.",
      "estimatedHours": 20,
      "interviewWeight": 5,
      "outcomes": [
        "Solve business cases",
        "Issue trees structuring"
      ],
      "prerequisites": [],
      "deliverables": [
        "Case study logs"
      ],
      "masteryChecklist": [
        "Create MECE issue tree",
        "Pick product metrics framework"
      ]
    },
    {
      "id": "mod_ip_6",
      "domain": "interview_prep",
      "title": "Module 6: Mock Interviews",
      "description": "Weekly mock interviews tracking Speed, Accuracy, Confidence, and Eye Contact.",
      "estimatedHours": 15,
      "interviewWeight": 5,
      "outcomes": [
        "Mock practice",
        "Behavioral performance audit"
      ],
      "prerequisites": [],
      "deliverables": [
        "Mock interview scorecard log"
      ],
      "masteryChecklist": [
        "Maintain mock score > 80%",
        "Eradicate pacing anomalies"
      ]
    },
    {
      "id": "mod_ip_7",
      "domain": "interview_prep",
      "title": "Module 7: Company Tracks",
      "description": "Deep dives into company formats and patterns (Google, Amex, Swiggy).",
      "estimatedHours": 15,
      "interviewWeight": 4,
      "outcomes": [
        "Company patterns maps"
      ],
      "prerequisites": [],
      "deliverables": [
        "Target playbooks profiles"
      ],
      "masteryChecklist": [
        "Outline top target focus area",
        "Complete OAs sample checks"
      ]
    },
    {
      "id": "mod_ip_8",
      "domain": "interview_prep",
      "title": "Module 8: Salary & Negotiation",
      "description": "Strategies for HR salary questions, offer comparisons, and counters.",
      "estimatedHours": 10,
      "interviewWeight": 4,
      "outcomes": [
        "HR negotiation",
        "Compensation comparisons"
      ],
      "prerequisites": [],
      "deliverables": [
        "Negotiation scripts"
      ],
      "masteryChecklist": [
        "Respond to salary expectation",
        "Evaluate offers equity components"
      ]
    },
    {
      "id": "mod_ip_9",
      "domain": "interview_prep",
      "title": "Module 9: Offer Readiness",
      "description": "Pre-placement strategy audits making sure all tracks are green.",
      "estimatedHours": 8,
      "interviewWeight": 5,
      "outcomes": [
        "Readiness audit",
        "Placement prep"
      ],
      "prerequisites": [],
      "deliverables": [
        "System readiness scorecard"
      ],
      "masteryChecklist": [
        "Resolve final weak areas",
        "Verify resume links are active"
      ]
    }
  ],
  "focusGoal": "Master Python OOP principles, standard library modules, and write pytest coverage suits.",
  "activeDomain": "launcher",
  "domains": [
    {
      "id": "sql",
      "name": "SQL Analytics",
      "icon": "fas fa-database",
      "desc": "Query optimization, CTEs, DB Design, Analytical SQL",
      "modulesCount": 8,
      "progress": 5,
      "hours": 25
    },
    {
      "id": "python",
      "name": "Python Programming",
      "icon": "fab fa-python",
      "desc": "OOP, Standard Lib, Data Science stack, Automation, APIs",
      "modulesCount": 13,
      "progress": 10,
      "hours": 45
    },
    {
      "id": "statistics",
      "name": "Statistics & Probability",
      "icon": "fas fa-chart-line",
      "desc": "Descriptive, Hypothesis Testing, A/B Testing, Regression",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "machine_learning",
      "name": "Machine Learning",
      "icon": "fas fa-brain",
      "desc": "Supervised, Unsupervised, Pipelines, Model Evaluation",
      "modulesCount": 8,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "mathematics",
      "name": "DS Mathematics",
      "icon": "fas fa-calculator",
      "desc": "Linear Algebra, Calculus, Vector math, Optimization",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "data_engineering",
      "name": "Data Engineering",
      "icon": "fas fa-server",
      "desc": "ETL pipelines, Spark, Airflow, Warehouses, Cloud",
      "modulesCount": 8,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "business_analytics",
      "name": "Business Analytics",
      "icon": "fas fa-briefcase",
      "desc": "KPI Design, SaaS/E-comm metrics, Issue Trees",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "power_bi",
      "name": "PowerBI BI Stack",
      "icon": "fas fa-chart-bar",
      "desc": "DAX formulas, Data modeling, Power Query, Reports",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "prof_comm",
      "name": "Professional Communication University",
      "icon": "fas fa-comments",
      "desc": "Focus on speaking, writing, presentations, technical documentation, data storytelling, and business communication.",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "interview_prep",
      "name": "Interview Excellence University",
      "icon": "fas fa-user-tie",
      "desc": "STAR behavior preparation, project defense frameworks, company tracks, case studies, and live mock interview simulations.",
      "modulesCount": 10,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "dsa",
      "name": "DSA Algorithms",
      "icon": "fas fa-code-branch",
      "desc": "Arrays, Pointers, Trees, Graphs, Dynamic Programming",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "cs_fundamentals",
      "name": "CS Fundamentals",
      "icon": "fas fa-laptop-code",
      "desc": "Operating Systems, networks, Docker, Git versioning",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "domain_knowledge",
      "name": "Domain Expertise",
      "icon": "fas fa-industry",
      "desc": "FinTech scoring, Healthcare analytics, E-comm forecasting",
      "modulesCount": 6,
      "progress": 0,
      "hours": 0
    },
    {
      "id": "industry_awareness",
      "name": "Industry Awareness",
      "icon": "fas fa-globe",
      "desc": "Tech newsletters, GDPR, AI ethics, Engineering blogs",
      "modulesCount": 9,
      "progress": 0,
      "hours": 85
    },
    {
      "id": "aptitude",
      "name": "Logical Aptitude",
      "icon": "fas fa-puzzle-piece",
      "desc": "Quantitative, logical, guesstimates, case solving",
      "modulesCount": 9,
      "progress": 0,
      "hours": 85
    }
  ],
  "tasks": [
    {
      "id": "t_sql_0",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "SELECT & WHERE queries",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over SELECT & WHERE queries.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement SELECT & WHERE queries correctly in production environments",
        "✓ Answer key technical interview questions regarding SELECT & WHERE queries"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "PostgreSQL Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "SELECT & WHERE queries Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of SELECT & WHERE queries in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using SELECT & WHERE queries?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied SELECT & WHERE queries to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying SELECT & WHERE queries?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-01",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_1",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "ORDER BY, GROUP BY & HAVING",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over ORDER BY, GROUP BY & HAVING.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement ORDER BY, GROUP BY & HAVING correctly in production environments",
        "✓ Answer key technical interview questions regarding ORDER BY, GROUP BY & HAVING"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Learning SQL",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "ORDER BY, GROUP BY & HAVING Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of ORDER BY, GROUP BY & HAVING in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using ORDER BY, GROUP BY & HAVING?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied ORDER BY, GROUP BY & HAVING to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying ORDER BY, GROUP BY & HAVING?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-02",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_2",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "CASE conditional logic",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over CASE conditional logic.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement CASE conditional logic correctly in production environments",
        "✓ Answer key technical interview questions regarding CASE conditional logic"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Learning SQL",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "CASE conditional logic Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of CASE conditional logic in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using CASE conditional logic?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied CASE conditional logic to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying CASE conditional logic?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-03",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_3",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "COALESCE & NULLIF handling",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over COALESCE & NULLIF handling.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement COALESCE & NULLIF handling correctly in production environments",
        "✓ Answer key technical interview questions regarding COALESCE & NULLIF handling"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "SQL Cookbook",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "COALESCE & NULLIF handling Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of COALESCE & NULLIF handling in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using COALESCE & NULLIF handling?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied COALESCE & NULLIF handling to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying COALESCE & NULLIF handling?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-04",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_4",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "CAST data type conversions",
      "learningType": "📖 Read",
      "priority": "⚪ Low",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over CAST data type conversions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement CAST data type conversions correctly in production environments",
        "✓ Answer key technical interview questions regarding CAST data type conversions"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "PostgreSQL Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "CAST data type conversions Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of CAST data type conversions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using CAST data type conversions?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied CAST data type conversions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying CAST data type conversions?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-04",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_5",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "Aggregate Functions (SUM, COUNT, etc)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Aggregate Functions (SUM, COUNT, etc).",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Aggregate Functions (SUM, COUNT, etc) correctly in production environments",
        "✓ Answer key technical interview questions regarding Aggregate Functions (SUM, COUNT, etc)"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "SQL Practice Problems",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Aggregate Functions (SUM, COUNT, etc) Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Aggregate Functions (SUM, COUNT, etc) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Aggregate Functions (SUM, COUNT, etc)?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Aggregate Functions (SUM, COUNT, etc) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Aggregate Functions (SUM, COUNT, etc)?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-05",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_6",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "Joins (INNER, LEFT, RIGHT, SELF, etc)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Joins (INNER, LEFT, RIGHT, SELF, etc).",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Joins (INNER, LEFT, RIGHT, SELF, etc) correctly in production environments",
        "✓ Answer key technical interview questions regarding Joins (INNER, LEFT, RIGHT, SELF, etc)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "SQL Practice Problems",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Joins (INNER, LEFT, RIGHT, SELF, etc) Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Joins (INNER, LEFT, RIGHT, SELF, etc) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Joins (INNER, LEFT, RIGHT, SELF, etc)?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Joins (INNER, LEFT, RIGHT, SELF, etc) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Joins (INNER, LEFT, RIGHT, SELF, etc)?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-06",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "⭐ Interview Ready"
    },
    {
      "id": "t_sql_7",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "Subqueries (Correlated / Uncorrelated)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Subqueries (Correlated / Uncorrelated).",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Subqueries (Correlated / Uncorrelated) correctly in production environments",
        "✓ Answer key technical interview questions regarding Subqueries (Correlated / Uncorrelated)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Learning SQL",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Subqueries (Correlated / Uncorrelated) Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Subqueries (Correlated / Uncorrelated) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Subqueries (Correlated / Uncorrelated)?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Subqueries (Correlated / Uncorrelated) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Subqueries (Correlated / Uncorrelated)?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-07",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_8",
      "domain": "sql",
      "module": "Module 0",
      "submodule": "Revision",
      "title": "Set Operations (UNION, INTERSECT, EXCEPT)",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Set Operations (UNION, INTERSECT, EXCEPT).",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Set Operations (UNION, INTERSECT, EXCEPT) correctly in production environments",
        "✓ Answer key technical interview questions regarding Set Operations (UNION, INTERSECT, EXCEPT)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Learning SQL",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Set Operations (UNION, INTERSECT, EXCEPT) Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Set Operations (UNION, INTERSECT, EXCEPT) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Set Operations (UNION, INTERSECT, EXCEPT)?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Set Operations (UNION, INTERSECT, EXCEPT) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Set Operations (UNION, INTERSECT, EXCEPT)?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-08",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_sql_9",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "CTEs (Common Table Expressions)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Learning",
      "learningObjective": "Develop complete theoretical and practical mastery over CTEs (Common Table Expressions).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement CTEs (Common Table Expressions) correctly in production environments",
        "✓ Answer key technical interview questions regarding CTEs (Common Table Expressions)"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Cookbook",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Employee Hierarchy Traversal",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of CTEs (Common Table Expressions) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using CTEs (Common Table Expressions)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied CTEs (Common Table Expressions) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "When is a CTE better than a Subquery or Temporary Table?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "🟡 Learning"
    },
    {
      "id": "t_sql_10",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Recursive CTEs",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Recursive CTEs.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Recursive CTEs correctly in production environments",
        "✓ Answer key technical interview questions regarding Recursive CTEs"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "T-SQL Window Functions",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Employee Hierarchy Traversal",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Recursive CTEs in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Recursive CTEs?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Recursive CTEs to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "When is a CTE better than a Subquery or Temporary Table?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_11",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Window Functions (ROW_NUMBER, RANK, DENSE_RANK)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Learning",
      "learningObjective": "Develop complete theoretical and practical mastery over Window Functions (ROW_NUMBER, RANK, DENSE_RANK).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Window Functions (ROW_NUMBER, RANK, DENSE_RANK) correctly in production environments",
        "✓ Answer key technical interview questions regarding Window Functions (ROW_NUMBER, RANK, DENSE_RANK)"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "T-SQL Window Functions",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "eCommerce Sales Leaderboard",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Window Functions (ROW_NUMBER, RANK, DENSE_RANK) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Window Functions (ROW_NUMBER, RANK, DENSE_RANK)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Window Functions (ROW_NUMBER, RANK, DENSE_RANK) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Why is RANK() different from DENSE_RANK() in database results?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "🟡 Learning"
    },
    {
      "id": "t_sql_12",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Value Window Functions (LAG, LEAD, FIRST_VALUE)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Learning",
      "learningObjective": "Develop complete theoretical and practical mastery over Value Window Functions (LAG, LEAD, FIRST_VALUE).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Value Window Functions (LAG, LEAD, FIRST_VALUE) correctly in production environments",
        "✓ Answer key technical interview questions regarding Value Window Functions (LAG, LEAD, FIRST_VALUE)"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "T-SQL Window Functions",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "eCommerce Sales Leaderboard",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Value Window Functions (LAG, LEAD, FIRST_VALUE) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Value Window Functions (LAG, LEAD, FIRST_VALUE)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Value Window Functions (LAG, LEAD, FIRST_VALUE) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Why is RANK() different from DENSE_RANK() in database results?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "🟡 Learning"
    },
    {
      "id": "t_sql_13",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Running Totals & Moving Averages",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Running Totals & Moving Averages.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Running Totals & Moving Averages correctly in production environments",
        "✓ Answer key technical interview questions regarding Running Totals & Moving Averages"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "T-SQL Window Functions",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Running Totals & Moving Averages Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Running Totals & Moving Averages in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Running Totals & Moving Averages?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Running Totals & Moving Averages to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Running Totals & Moving Averages?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_14",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Pivot & Unpivot",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Pivot & Unpivot.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Pivot & Unpivot correctly in production environments",
        "✓ Answer key technical interview questions regarding Pivot & Unpivot"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Cookbook",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Pivot & Unpivot Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Pivot & Unpivot in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Pivot & Unpivot?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Pivot & Unpivot to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Pivot & Unpivot?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_15",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Gaps and Islands Problems",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Gaps and Islands Problems.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Gaps and Islands Problems correctly in production environments",
        "✓ Answer key technical interview questions regarding Gaps and Islands Problems"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Cookbook",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Gaps and Islands Problems Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Gaps and Islands Problems in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Gaps and Islands Problems?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Gaps and Islands Problems to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Gaps and Islands Problems?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_16",
      "domain": "sql",
      "module": "Module 1",
      "submodule": "Advanced SQL",
      "title": "Time Series SQL",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Time Series SQL.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Time Series SQL correctly in production environments",
        "✓ Answer key technical interview questions regarding Time Series SQL"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "PostgreSQL Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Time Series SQL Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Time Series SQL in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Time Series SQL?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Time Series SQL to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Time Series SQL?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_17",
      "domain": "sql",
      "module": "Module 2",
      "submodule": "Query Optimization",
      "title": "Understanding Indexes (B-Tree, Hash)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Understanding Indexes (B-Tree, Hash).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Understanding Indexes (B-Tree, Hash) correctly in production environments",
        "✓ Answer key technical interview questions regarding Understanding Indexes (B-Tree, Hash)"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Performance Explained",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Slow Query Profiler",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Understanding Indexes (B-Tree, Hash) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Understanding Indexes (B-Tree, Hash)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Understanding Indexes (B-Tree, Hash) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Why can having too many indexes slow down database writes?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_18",
      "domain": "sql",
      "module": "Module 2",
      "submodule": "Query Optimization",
      "title": "Composite & Covering Indexes",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Composite & Covering Indexes.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Composite & Covering Indexes correctly in production environments",
        "✓ Answer key technical interview questions regarding Composite & Covering Indexes"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Performance Explained",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Slow Query Profiler",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Composite & Covering Indexes in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Composite & Covering Indexes?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Composite & Covering Indexes to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Why can having too many indexes slow down database writes?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_19",
      "domain": "sql",
      "module": "Module 2",
      "submodule": "Query Optimization",
      "title": "Reading Execution Plans (EXPLAIN ANALYZE)",
      "learningType": "🎤 Present",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Reading Execution Plans (EXPLAIN ANALYZE).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Reading Execution Plans (EXPLAIN ANALYZE) correctly in production environments",
        "✓ Answer key technical interview questions regarding Reading Execution Plans (EXPLAIN ANALYZE)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "PostgreSQL Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Reading Execution Plans (EXPLAIN ANALYZE) Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Reading Execution Plans (EXPLAIN ANALYZE) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Reading Execution Plans (EXPLAIN ANALYZE)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Reading Execution Plans (EXPLAIN ANALYZE) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Reading Execution Plans (EXPLAIN ANALYZE)?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_20",
      "domain": "sql",
      "module": "Module 2",
      "submodule": "Query Optimization",
      "title": "Join Optimization & Predicate Pushdown",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Join Optimization & Predicate Pushdown.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Join Optimization & Predicate Pushdown correctly in production environments",
        "✓ Answer key technical interview questions regarding Join Optimization & Predicate Pushdown"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Performance Explained",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Slow Query Profiler",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Join Optimization & Predicate Pushdown in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Join Optimization & Predicate Pushdown?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Join Optimization & Predicate Pushdown to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Join Optimization & Predicate Pushdown?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_21",
      "domain": "sql",
      "module": "Module 3",
      "submodule": "Database Design",
      "title": "Normalization (1NF, 2NF, 3NF)",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Normalization (1NF, 2NF, 3NF).",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Normalization (1NF, 2NF, 3NF) correctly in production environments",
        "✓ Answer key technical interview questions regarding Normalization (1NF, 2NF, 3NF)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Learning SQL",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Normalization (1NF, 2NF, 3NF) Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Normalization (1NF, 2NF, 3NF) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Normalization (1NF, 2NF, 3NF)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Normalization (1NF, 2NF, 3NF) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Normalization (1NF, 2NF, 3NF)?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_22",
      "domain": "sql",
      "module": "Module 3",
      "submodule": "Database Design",
      "title": "Dimensional Modeling (Fact & Dimension Tables)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Dimensional Modeling (Fact & Dimension Tables).",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Dimensional Modeling (Fact & Dimension Tables) correctly in production environments",
        "✓ Answer key technical interview questions regarding Dimensional Modeling (Fact & Dimension Tables)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "The Data Warehouse Toolkit",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Dimensional Modeling (Fact & Dimension Tables) Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Dimensional Modeling (Fact & Dimension Tables) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Dimensional Modeling (Fact & Dimension Tables)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Dimensional Modeling (Fact & Dimension Tables) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Dimensional Modeling (Fact & Dimension Tables)?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_23",
      "domain": "sql",
      "module": "Module 4",
      "submodule": "Production SQL",
      "title": "Views & Materialized Views",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Views & Materialized Views.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Views & Materialized Views correctly in production environments",
        "✓ Answer key technical interview questions regarding Views & Materialized Views"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "PostgreSQL Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Views & Materialized Views Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Views & Materialized Views in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Views & Materialized Views?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Views & Materialized Views to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Views & Materialized Views?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_24",
      "domain": "sql",
      "module": "Module 4",
      "submodule": "Production SQL",
      "title": "Transactions & ACID Properties",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Transactions & ACID Properties.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Transactions & ACID Properties correctly in production environments",
        "✓ Answer key technical interview questions regarding Transactions & ACID Properties"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "PostgreSQL Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Transactions & ACID Properties Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Transactions & ACID Properties in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Transactions & ACID Properties?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Transactions & ACID Properties to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Transactions & ACID Properties?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_25",
      "domain": "sql",
      "module": "Module 5",
      "submodule": "Analytical SQL",
      "title": "Cohort Analysis",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Cohort Analysis.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Cohort Analysis correctly in production environments",
        "✓ Answer key technical interview questions regarding Cohort Analysis"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Cookbook",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "SaaS Churn Curve Model",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Cohort Analysis in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Cohort Analysis?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Cohort Analysis to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Cohort Analysis?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_26",
      "domain": "sql",
      "module": "Module 5",
      "submodule": "Analytical SQL",
      "title": "User Retention & Churn Analysis",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over User Retention & Churn Analysis.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement User Retention & Churn Analysis correctly in production environments",
        "✓ Answer key technical interview questions regarding User Retention & Churn Analysis"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "SQL Cookbook",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "SaaS Churn Curve Model",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of User Retention & Churn Analysis in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using User Retention & Churn Analysis?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied User Retention & Churn Analysis to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying User Retention & Churn Analysis?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_27",
      "domain": "sql",
      "module": "Module 6",
      "submodule": "Interview Prep",
      "title": "LeetCode SQL - Easy Questions",
      "learningType": "💻 Practice",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over LeetCode SQL - Easy Questions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement LeetCode SQL - Easy Questions correctly in production environments",
        "✓ Answer key technical interview questions regarding LeetCode SQL - Easy Questions"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "LeetCode SQL",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "LeetCode SQL - Easy Questions Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of LeetCode SQL - Easy Questions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using LeetCode SQL - Easy Questions?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied LeetCode SQL - Easy Questions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying LeetCode SQL - Easy Questions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_28",
      "domain": "sql",
      "module": "Module 6",
      "submodule": "Interview Prep",
      "title": "DataLemur SQL - Medium Questions",
      "learningType": "💻 Practice",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over DataLemur SQL - Medium Questions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement DataLemur SQL - Medium Questions correctly in production environments",
        "✓ Answer key technical interview questions regarding DataLemur SQL - Medium Questions"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "DataLemur",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "DataLemur SQL - Medium Questions Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of DataLemur SQL - Medium Questions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using DataLemur SQL - Medium Questions?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied DataLemur SQL - Medium Questions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying DataLemur SQL - Medium Questions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_sql_29",
      "domain": "sql",
      "module": "Module 7",
      "submodule": "Projects",
      "title": "Ecommerce Analytics Project",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Ecommerce Analytics Project.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Ecommerce Analytics Project correctly in production environments",
        "✓ Answer key technical interview questions regarding Ecommerce Analytics Project"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "GitHub / Dataset",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Ecommerce Analytics Project Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Uses Window functions to analyze temporal user streaming cohorts."
        },
        {
          "company": "Airbnb",
          "application": "Uses composite indexing to optimize geographic listing searches."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Ecommerce Analytics Project in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Ecommerce Analytics Project?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Ecommerce Analytics Project to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Ecommerce Analytics Project?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_0",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "Functions & Scoping",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Functions & Scoping.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Functions & Scoping correctly in production environments",
        "✓ Answer key technical interview questions regarding Functions & Scoping"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Functions & Scoping Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Functions & Scoping in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Functions & Scoping?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Functions & Scoping to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Functions & Scoping?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-20",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_py_1",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "Strings, Lists & Tuples basics",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Strings, Lists & Tuples basics.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Strings, Lists & Tuples basics correctly in production environments",
        "✓ Answer key technical interview questions regarding Strings, Lists & Tuples basics"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Strings, Lists & Tuples basics Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Strings, Lists & Tuples basics in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Strings, Lists & Tuples basics?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Strings, Lists & Tuples basics to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Strings, Lists & Tuples basics?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-21",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_py_2",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "Dictionaries & Sets structures",
      "learningType": "📚 Documentation",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Dictionaries & Sets structures.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Dictionaries & Sets structures correctly in production environments",
        "✓ Answer key technical interview questions regarding Dictionaries & Sets structures"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Dictionaries & Sets structures Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Dictionaries & Sets structures in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Dictionaries & Sets structures?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Dictionaries & Sets structures to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Dictionaries & Sets structures?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-22",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🟢 Confident"
    },
    {
      "id": "t_py_3",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "Sorting & Searching Algorithms",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟡 Medium",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Sorting & Searching Algorithms.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Sorting & Searching Algorithms correctly in production environments",
        "✓ Answer key technical interview questions regarding Sorting & Searching Algorithms"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Practice Platforms",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Sorting & Searching Algorithms Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Sorting & Searching Algorithms in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Sorting & Searching Algorithms?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Sorting & Searching Algorithms to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Sorting & Searching Algorithms?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-23",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🔵 Practicing"
    },
    {
      "id": "t_py_4",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "Recursion Concepts",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🔴 Hard",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Recursion Concepts.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Recursion Concepts correctly in production environments",
        "✓ Answer key technical interview questions regarding Recursion Concepts"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Practice Platforms",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Recursion Concepts Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Recursion Concepts in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Recursion Concepts?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Recursion Concepts to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Recursion Concepts?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-24",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "🔵 Practicing"
    },
    {
      "id": "t_py_5",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "List & Dict Comprehensions",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over List & Dict Comprehensions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement List & Dict Comprehensions correctly in production environments",
        "✓ Answer key technical interview questions regarding List & Dict Comprehensions"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "List & Dict Comprehensions Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of List & Dict Comprehensions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using List & Dict Comprehensions?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied List & Dict Comprehensions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying List & Dict Comprehensions?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-25",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "⭐ Interview Ready"
    },
    {
      "id": "t_py_6",
      "domain": "python",
      "module": "Module 0",
      "submodule": "Competency Assessment",
      "title": "Practice: 40-50 Coding Questions",
      "learningType": "💻 Practice",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Completed",
      "learningObjective": "Develop complete theoretical and practical mastery over Practice: 40-50 Coding Questions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Practice: 40-50 Coding Questions correctly in production environments",
        "✓ Answer key technical interview questions regarding Practice: 40-50 Coding Questions"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": true,
        "watch": true,
        "practice": true,
        "project": true,
        "industry": true,
        "interview": true,
        "reflection": true,
        "revision": true
      },
      "resources": {
        "book": "Practice Platforms",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Practice: 40-50 Coding Questions Prototype App",
        "status": "Completed"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Practice: 40-50 Coding Questions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": true
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Practice: 40-50 Coding Questions?",
          "difficulty": "🟡 Medium",
          "answered": true
        },
        {
          "question": "Describe a scenario where you applied Practice: 40-50 Coding Questions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": true
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Practice: 40-50 Coding Questions?",
        "answer": "Completed reflection during initial study session."
      },
      "revision": {
        "interval": 2,
        "lastDate": "2026-06-26",
        "nextDate": "2026-07-04",
        "confidence": "🟢 Confident"
      },
      "mastery": "⭐ Interview Ready"
    },
    {
      "id": "t_py_7",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Classes, Objects & Constructors",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Learning",
      "learningObjective": "Develop complete theoretical and practical mastery over Classes, Objects & Constructors.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Classes, Objects & Constructors correctly in production environments",
        "✓ Answer key technical interview questions regarding Classes, Objects & Constructors"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "School Library Manager",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Classes, Objects & Constructors in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Classes, Objects & Constructors?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Classes, Objects & Constructors to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "When should I prefer Composition over Class Inheritance?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "🟡 Learning"
    },
    {
      "id": "t_py_8",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Class vs Instance Variables",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟡 Medium",
      "status": "Learning",
      "learningObjective": "Develop complete theoretical and practical mastery over Class vs Instance Variables.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Class vs Instance Variables correctly in production environments",
        "✓ Answer key technical interview questions regarding Class vs Instance Variables"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "School Library Manager",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Class vs Instance Variables in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Class vs Instance Variables?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Class vs Instance Variables to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "When should I prefer Composition over Class Inheritance?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "🟡 Learning"
    },
    {
      "id": "t_py_9",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Inheritance & Multiple Inheritance",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Inheritance & Multiple Inheritance.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Inheritance & Multiple Inheritance correctly in production environments",
        "✓ Answer key technical interview questions regarding Inheritance & Multiple Inheritance"
      ],
      "weight": 5,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Inheritance & Multiple Inheritance Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Inheritance & Multiple Inheritance in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Inheritance & Multiple Inheritance?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Inheritance & Multiple Inheritance to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Inheritance & Multiple Inheritance?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_10",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Method Resolution Order (MRO)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Method Resolution Order (MRO).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Method Resolution Order (MRO) correctly in production environments",
        "✓ Answer key technical interview questions regarding Method Resolution Order (MRO)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Method Resolution Order (MRO) Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Method Resolution Order (MRO) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Method Resolution Order (MRO)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Method Resolution Order (MRO) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Method Resolution Order (MRO)?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_11",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Composition & Aggregation",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Composition & Aggregation.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Composition & Aggregation correctly in production environments",
        "✓ Answer key technical interview questions regarding Composition & Aggregation"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Composition & Aggregation Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Composition & Aggregation in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Composition & Aggregation?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Composition & Aggregation to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Composition & Aggregation?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_12",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Encapsulation, Abstraction & Polymorphism",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Encapsulation, Abstraction & Polymorphism.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Encapsulation, Abstraction & Polymorphism correctly in production environments",
        "✓ Answer key technical interview questions regarding Encapsulation, Abstraction & Polymorphism"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Encapsulation, Abstraction & Polymorphism Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Encapsulation, Abstraction & Polymorphism in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Encapsulation, Abstraction & Polymorphism?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Encapsulation, Abstraction & Polymorphism to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Encapsulation, Abstraction & Polymorphism?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_13",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Magic Methods (Dunder Methods)",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Magic Methods (Dunder Methods).",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Magic Methods (Dunder Methods) correctly in production environments",
        "✓ Answer key technical interview questions regarding Magic Methods (Dunder Methods)"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Magic Methods (Dunder Methods) Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Magic Methods (Dunder Methods) in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Magic Methods (Dunder Methods)?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Magic Methods (Dunder Methods) to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Magic Methods (Dunder Methods)?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_14",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Properties & Custom Getters/Setters",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Properties & Custom Getters/Setters.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Properties & Custom Getters/Setters correctly in production environments",
        "✓ Answer key technical interview questions regarding Properties & Custom Getters/Setters"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Properties & Custom Getters/Setters Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Properties & Custom Getters/Setters in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Properties & Custom Getters/Setters?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Properties & Custom Getters/Setters to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Properties & Custom Getters/Setters?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_15",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Dataclasses",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Dataclasses.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Dataclasses correctly in production environments",
        "✓ Answer key technical interview questions regarding Dataclasses"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "School Library Manager",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Dataclasses in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Dataclasses?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Dataclasses to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "When should I prefer Composition over Class Inheritance?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_16",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Project: Student Management System",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Project: Student Management System.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Project: Student Management System correctly in production environments",
        "✓ Answer key technical interview questions regarding Project: Student Management System"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Project: Student Management System Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Project: Student Management System in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Project: Student Management System?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Project: Student Management System to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Project: Student Management System?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_17",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Project: Library Management System",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Project: Library Management System.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Project: Library Management System correctly in production environments",
        "✓ Answer key technical interview questions regarding Project: Library Management System"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Project: Library Management System Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Project: Library Management System in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Project: Library Management System?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Project: Library Management System to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Project: Library Management System?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_18",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Project: Banking System",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Project: Banking System.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Project: Banking System correctly in production environments",
        "✓ Answer key technical interview questions regarding Project: Banking System"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Project: Banking System Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Project: Banking System in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Project: Banking System?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Project: Banking System to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Project: Banking System?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_19",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Project: Hospital Management",
      "learningType": "🏗 Build",
      "priority": "🟡 Medium",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Project: Hospital Management.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Project: Hospital Management correctly in production environments",
        "✓ Answer key technical interview questions regarding Project: Hospital Management"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Project: Hospital Management Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Project: Hospital Management in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Project: Hospital Management?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Project: Hospital Management to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Project: Hospital Management?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_20",
      "domain": "python",
      "module": "Module 1",
      "submodule": "Professional OOP",
      "title": "Project: Pokémon Battle Simulator",
      "learningType": "🏗 Build",
      "priority": "🟡 Medium",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Project: Pokémon Battle Simulator.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Project: Pokémon Battle Simulator correctly in production environments",
        "✓ Answer key technical interview questions regarding Project: Pokémon Battle Simulator"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python OOP",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Project: Pokémon Battle Simulator Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Project: Pokémon Battle Simulator in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Project: Pokémon Battle Simulator?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Project: Pokémon Battle Simulator to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Project: Pokémon Battle Simulator?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_21",
      "domain": "python",
      "module": "Module 2",
      "submodule": "Pythonic Programming",
      "title": "Iterators & Custom Iterators",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Iterators & Custom Iterators.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Iterators & Custom Iterators correctly in production environments",
        "✓ Answer key technical interview questions regarding Iterators & Custom Iterators"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Iterators & Custom Iterators Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Iterators & Custom Iterators in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Iterators & Custom Iterators?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Iterators & Custom Iterators to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Iterators & Custom Iterators?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_22",
      "domain": "python",
      "module": "Module 2",
      "submodule": "Pythonic Programming",
      "title": "Generators & Generator Expressions",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Generators & Generator Expressions.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Generators & Generator Expressions correctly in production environments",
        "✓ Answer key technical interview questions regarding Generators & Generator Expressions"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Generators & Generator Expressions Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Generators & Generator Expressions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Generators & Generator Expressions?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Generators & Generator Expressions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Generators & Generator Expressions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_23",
      "domain": "python",
      "module": "Module 2",
      "submodule": "Pythonic Programming",
      "title": "Decorators & Closures",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Decorators & Closures.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Decorators & Closures correctly in production environments",
        "✓ Answer key technical interview questions regarding Decorators & Closures"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Function Execution Logger",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Decorators & Closures in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Decorators & Closures?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Decorators & Closures to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "When would you NOT use decorators in Python?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_24",
      "domain": "python",
      "module": "Module 2",
      "submodule": "Pythonic Programming",
      "title": "Lambda Functions & Functional Programming",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Lambda Functions & Functional Programming.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Lambda Functions & Functional Programming correctly in production environments",
        "✓ Answer key technical interview questions regarding Lambda Functions & Functional Programming"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Lambda Functions & Functional Programming Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Lambda Functions & Functional Programming in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Lambda Functions & Functional Programming?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Lambda Functions & Functional Programming to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Lambda Functions & Functional Programming?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_25",
      "domain": "python",
      "module": "Module 2",
      "submodule": "Pythonic Programming",
      "title": "Context Managers & with statement",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Context Managers & with statement.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Context Managers & with statement correctly in production environments",
        "✓ Answer key technical interview questions regarding Context Managers & with statement"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Context Managers & with statement Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Context Managers & with statement in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Context Managers & with statement?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Context Managers & with statement to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Context Managers & with statement?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_26",
      "domain": "python",
      "module": "Module 3",
      "submodule": "Professional Python",
      "title": "Exception Handling & Custom Exceptions",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Exception Handling & Custom Exceptions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Exception Handling & Custom Exceptions correctly in production environments",
        "✓ Answer key technical interview questions regarding Exception Handling & Custom Exceptions"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Exception Handling & Custom Exceptions Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Exception Handling & Custom Exceptions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Exception Handling & Custom Exceptions?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Exception Handling & Custom Exceptions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Exception Handling & Custom Exceptions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_27",
      "domain": "python",
      "module": "Module 3",
      "submodule": "Professional Python",
      "title": "Logging Module & Scopes",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Logging Module & Scopes.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Logging Module & Scopes correctly in production environments",
        "✓ Answer key technical interview questions regarding Logging Module & Scopes"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Logging Module & Scopes Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Logging Module & Scopes in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Logging Module & Scopes?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Logging Module & Scopes to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Logging Module & Scopes?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_28",
      "domain": "python",
      "module": "Module 3",
      "submodule": "Professional Python",
      "title": "Project: Create Reusable Python Package",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Project: Create Reusable Python Package.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Project: Create Reusable Python Package correctly in production environments",
        "✓ Answer key technical interview questions regarding Project: Create Reusable Python Package"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Effective Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Project: Create Reusable Python Package Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Project: Create Reusable Python Package in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Project: Create Reusable Python Package?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Project: Create Reusable Python Package to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Project: Create Reusable Python Package?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_29",
      "domain": "python",
      "module": "Module 4",
      "submodule": "Standard Library Mastery",
      "title": "collections & itertools",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over collections & itertools.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement collections & itertools correctly in production environments",
        "✓ Answer key technical interview questions regarding collections & itertools"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "collections & itertools Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of collections & itertools in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using collections & itertools?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied collections & itertools to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying collections & itertools?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_30",
      "domain": "python",
      "module": "Module 4",
      "submodule": "Standard Library Mastery",
      "title": "pathlib, os & shutil filesystem modules",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over pathlib, os & shutil filesystem modules.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement pathlib, os & shutil filesystem modules correctly in production environments",
        "✓ Answer key technical interview questions regarding pathlib, os & shutil filesystem modules"
      ],
      "weight": 8,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "pathlib, os & shutil filesystem modules Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of pathlib, os & shutil filesystem modules in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using pathlib, os & shutil filesystem modules?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied pathlib, os & shutil filesystem modules to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying pathlib, os & shutil filesystem modules?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_31",
      "domain": "python",
      "module": "Module 5",
      "submodule": "Testing & Code Quality",
      "title": "pytest Framework & Assertions",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over pytest Framework & Assertions.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement pytest Framework & Assertions correctly in production environments",
        "✓ Answer key technical interview questions regarding pytest Framework & Assertions"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "pytest Testing",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "pytest Framework & Assertions Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of pytest Framework & Assertions in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using pytest Framework & Assertions?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied pytest Framework & Assertions to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying pytest Framework & Assertions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_32",
      "domain": "python",
      "module": "Module 5",
      "submodule": "Testing & Code Quality",
      "title": "pytest Fixtures & Parametrization",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over pytest Fixtures & Parametrization.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement pytest Fixtures & Parametrization correctly in production environments",
        "✓ Answer key technical interview questions regarding pytest Fixtures & Parametrization"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "pytest Testing",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "pytest Fixtures & Parametrization Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of pytest Fixtures & Parametrization in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using pytest Fixtures & Parametrization?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied pytest Fixtures & Parametrization to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying pytest Fixtures & Parametrization?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_33",
      "domain": "python",
      "module": "Module 6",
      "submodule": "Data Processing",
      "title": "NumPy Arrays & Vectorization",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over NumPy Arrays & Vectorization.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement NumPy Arrays & Vectorization correctly in production environments",
        "✓ Answer key technical interview questions regarding NumPy Arrays & Vectorization"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "NumPy Arrays & Vectorization Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of NumPy Arrays & Vectorization in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using NumPy Arrays & Vectorization?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied NumPy Arrays & Vectorization to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying NumPy Arrays & Vectorization?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_34",
      "domain": "python",
      "module": "Module 6",
      "submodule": "Data Processing",
      "title": "Pandas Data Cleaning & GroupBy merges",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Pandas Data Cleaning & GroupBy merges.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement Pandas Data Cleaning & GroupBy merges correctly in production environments",
        "✓ Answer key technical interview questions regarding Pandas Data Cleaning & GroupBy merges"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Transactional Data Aggregator",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Pandas Data Cleaning & GroupBy merges in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Pandas Data Cleaning & GroupBy merges?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Pandas Data Cleaning & GroupBy merges to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Pandas Data Cleaning & GroupBy merges?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_35",
      "domain": "python",
      "module": "Module 7",
      "submodule": "Data Science",
      "title": "scikit-learn Preprocessing & Pipelines",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over scikit-learn Preprocessing & Pipelines.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement scikit-learn Preprocessing & Pipelines correctly in production environments",
        "✓ Answer key technical interview questions regarding scikit-learn Preprocessing & Pipelines"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "scikit-learn Preprocessing & Pipelines Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of scikit-learn Preprocessing & Pipelines in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using scikit-learn Preprocessing & Pipelines?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied scikit-learn Preprocessing & Pipelines to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying scikit-learn Preprocessing & Pipelines?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_36",
      "domain": "python",
      "module": "Module 8",
      "submodule": "Automation",
      "title": "File Organizer Script",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over File Organizer Script.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement File Organizer Script correctly in production environments",
        "✓ Answer key technical interview questions regarding File Organizer Script"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "File Organizer Script Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of File Organizer Script in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using File Organizer Script?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied File Organizer Script to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying File Organizer Script?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_37",
      "domain": "python",
      "module": "Module 9",
      "submodule": "APIs",
      "title": "requests library basics & Authentication",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over requests library basics & Authentication.",
      "prerequisites": [],
      "outcomes": [
        "✓ Implement requests library basics & Authentication correctly in production environments",
        "✓ Answer key technical interview questions regarding requests library basics & Authentication"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Python Docs",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "requests library basics & Authentication Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of requests library basics & Authentication in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using requests library basics & Authentication?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied requests library basics & Authentication to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying requests library basics & Authentication?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_38",
      "domain": "python",
      "module": "Module 10",
      "submodule": "Advanced Python",
      "title": "AsyncIO & Concurrency",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🔴 Hard",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over AsyncIO & Concurrency.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement AsyncIO & Concurrency correctly in production environments",
        "✓ Answer key technical interview questions regarding AsyncIO & Concurrency"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Fluent Python",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "AsyncIO & Concurrency Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of AsyncIO & Concurrency in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using AsyncIO & Concurrency?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied AsyncIO & Concurrency to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying AsyncIO & Concurrency?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_39",
      "domain": "python",
      "module": "Module 11",
      "submodule": "Reading Real Code",
      "title": "Week 1: Read pytest source",
      "learningType": "📖 Read",
      "priority": "🟡 Medium",
      "difficulty": "🟡 Medium",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Week 1: Read pytest source.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Week 1: Read pytest source correctly in production environments",
        "✓ Answer key technical interview questions regarding Week 1: Read pytest source"
      ],
      "weight": 2,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Practice Platforms",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Week 1: Read pytest source Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Week 1: Read pytest source in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Week 1: Read pytest source?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Week 1: Read pytest source to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Week 1: Read pytest source?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_py_40",
      "domain": "python",
      "module": "Module 12",
      "submodule": "Portfolio",
      "title": "Documentation & GitHub Deployment",
      "learningType": "📚 Documentation",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Documentation & GitHub Deployment.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Documentation & GitHub Deployment correctly in production environments",
        "✓ Answer key technical interview questions regarding Documentation & GitHub Deployment"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "GitHub / Local",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Documentation & GitHub Deployment Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Spotify",
          "application": "Uses decorator functions to wrap API rate limits and logs."
        },
        {
          "company": "Dropbox",
          "application": "Uses custom OOP hierarchies in sync engine microservices."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Documentation & GitHub Deployment in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Documentation & GitHub Deployment?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Documentation & GitHub Deployment to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Documentation & GitHub Deployment?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_stat_0",
      "domain": "statistics",
      "module": "Module 1",
      "submodule": "Foundations",
      "title": "Introduction to Statistics & Descriptive Stats",
      "learningType": "🎤 Present",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "status": "Not Started",
      "learningObjective": "Develop complete theoretical and practical mastery over Introduction to Statistics & Descriptive Stats.",
      "prerequisites": [
        "Module 0 Basics"
      ],
      "outcomes": [
        "✓ Implement Introduction to Statistics & Descriptive Stats correctly in production environments",
        "✓ Answer key technical interview questions regarding Introduction to Statistics & Descriptive Stats"
      ],
      "weight": 1,
      "interviewFrequency": "★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Core Textbook Reference",
        "course": "Domain Master Course Video",
        "youtube": "Curated YouTube playlist references",
        "docs": "Official Language / Tool Documentation"
      },
      "miniProjects": {
        "name": "Introduction to Statistics & Descriptive Stats Prototype App",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Google",
          "application": "Uses structural writing protocols for API documentation alignment."
        },
        {
          "company": "Uber",
          "application": "Uses elevator pitch introduces for stakeholder alignment."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the fundamental concept of Introduction to Statistics & Descriptive Stats in a business context.",
          "difficulty": "🟢 Easy",
          "answered": false
        },
        {
          "question": "How would you troubleshoot or optimize a failure/slowdown when using Introduction to Statistics & Descriptive Stats?",
          "difficulty": "🟡 Medium",
          "answered": false
        },
        {
          "question": "Describe a scenario where you applied Introduction to Statistics & Descriptive Stats to solve a complex engineering or analytical challenge.",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key scaling or performance bottleneck when applying Introduction to Statistics & Descriptive Stats?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      },
      "mastery": "⚪ Beginner"
    },
    {
      "id": "t_pc_0",
      "domain": "prof_comm",
      "module": "Module 0",
      "submodule": "Speaking",
      "title": "Speaking Foundations & Fillers Reduction",
      "learningType": "🎤 Present",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "weight": 3,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Talk Like TED",
      "practice": "Record 2 min speech without filler words",
      "notes": "Focus on pausing instead of using 'um', 'ah', 'like'.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Talk Like TED",
        "course": "Speaking Mastery Class",
        "youtube": "Reducing filler words tutorial",
        "docs": "Speech patterns guide"
      },
      "miniProjects": {
        "name": "Filler Word Count Audit",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Toastmasters",
          "application": "Filler word tracking templates"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How do you control speech pacing under high pressure?",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is your main filler word and when do you use it?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_pc_1",
      "domain": "prof_comm",
      "module": "Module 1",
      "submodule": "Writing",
      "title": "Business Email & Slack Communication",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "weight": 2,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "HBR Guide to Better Business Writing",
      "practice": "Draft a project delay notification",
      "notes": "Use direct, professional, action-oriented lines.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "HBR Guide to Better Business Writing",
        "course": "Business Writing course",
        "youtube": "Slack communication etiquettes",
        "docs": "Writing guides"
      },
      "miniProjects": {
        "name": "Email Template Swipe File",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Stripe",
          "application": "Internal communication writing standards"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you write a status update for a delayed project?",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the key difference between email and Slack updates?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_pc_2",
      "domain": "prof_comm",
      "module": "Module 2",
      "submodule": "Presentations",
      "title": "Structure and Visual Narrative Flow",
      "learningType": "🏗 Build",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "weight": 4,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Slideology",
      "practice": "Design a 5-slide project summary deck",
      "notes": "Structure using the Situation-Complication-Resolution framework.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Slideology",
        "course": "Visual Storytelling",
        "youtube": "Slide structures tutorial",
        "docs": "Visual narrative standards"
      },
      "miniProjects": {
        "name": "Project Summary Slide Deck",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "McKinsey",
          "application": "Pyramid Principle presentation structure"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How do you handle questions you don't know the answer to during a slide presentation?",
          "difficulty": "🟡 Medium",
          "answered": false
        }
      ],
      "reflection": {
        "question": "How do you balance details with scannability in slides?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_pc_3",
      "domain": "prof_comm",
      "module": "Module 3",
      "submodule": "Documentation",
      "title": "Markdown Documentation and Clean READMEs",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "weight": 3,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Writing Great Documentation",
      "practice": "Write a comprehensive README for a GitHub repository",
      "notes": "Include setup, API definitions, and examples.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Writing Great Documentation",
        "course": "Technical Writing Foundations",
        "youtube": "README best practices video",
        "docs": "Markdown styling references"
      },
      "miniProjects": {
        "name": "GitHub Repository Documentation Suite",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Google",
          "application": "Technical documentation guidelines"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain why code comments should describe 'why' rather than 'what'.",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What sections are critical for an open-source library README?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_pc_4",
      "domain": "prof_comm",
      "module": "Module 4",
      "submodule": "Data Storytelling",
      "title": "Translating Metrics to Business Impact",
      "learningType": "🏗 Build",
      "priority": "🔥 Critical",
      "difficulty": "🟡 Medium",
      "weight": 5,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Storytelling with Data",
      "practice": "Create an executive metrics brief",
      "notes": "Explain accuracy, precision, and recall in dollars.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Storytelling with Data",
        "course": "Executive Briefing Mastery",
        "youtube": "Data translation guidelines",
        "docs": "Business KPI models"
      },
      "miniProjects": {
        "name": "Executive Business Case Briefing",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Uber",
          "application": "Cost-benefit metrics models for product decisions"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you explain the business trade-off between precision and recall to a VP of Sales?",
          "difficulty": "🟡 Medium",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Why do business executives focus on metrics translation instead of model formulas?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_pc_5",
      "domain": "prof_comm",
      "module": "Module 5",
      "submodule": "Business Communication",
      "title": "Managing Stakeholder Expectations",
      "learningType": "🎤 Present",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "weight": 4,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Crucial Conversations",
      "practice": "Roleplay resolving a metric alignment conflict",
      "notes": "Handle disagreements constructively with factual evidence.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Crucial Conversations",
        "course": "Stakeholder Management Seminar",
        "youtube": "Managing difficult clients video",
        "docs": "Alignment templates"
      },
      "miniProjects": {
        "name": "Stakeholder Strategy Document",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Amazon",
          "application": "Six-page narratives for document reviews"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Tell me about a time you disagreed with a stakeholder. How did you align?",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is your primary method to build trust with a cross-functional partner?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_0",
      "domain": "interview_prep",
      "module": "Module 0",
      "submodule": "Interview Foundations",
      "title": "Understanding Interview Channels & Panels",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟢 Easy",
      "weight": 3,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Cracking the Coding Interview",
      "practice": "Map out the hiring funnel checklist",
      "notes": "Understand the roles of Recruiter, HR, Hiring Manager, Technical Interviewers, and Bar Raisers.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Cracking the Coding Interview",
        "course": "Interview Systems 101",
        "youtube": "Hiring managers perspectives",
        "docs": "Interview structures reference"
      },
      "miniProjects": {
        "name": "Funnel Mapping Document",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "FAANG",
          "application": "Standardized loops structures and scoring criteria"
        }
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between an online assessment and a live technical screening?",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Why is it important to know who is interviewing you at each stage?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_1",
      "domain": "interview_prep",
      "module": "Module 1",
      "submodule": "Personal Branding",
      "title": "Tell Me About Yourself & Portfolio Presentation",
      "learningType": "🎤 Present",
      "priority": "🔥 Critical",
      "difficulty": "🟢 Easy",
      "weight": 5,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Elevator Pitch Formulas",
      "practice": "Record yourself giving your 90-second pitch",
      "notes": "Highlight key accomplishments, transition lines, and career focus.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Branding for Engineers",
        "course": "Branding Bootcamp",
        "youtube": "Elevator pitch tutorials",
        "docs": "Branding template check"
      },
      "miniProjects": {
        "name": "Recorded Video Introduction",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "LinkedIn",
          "application": "Profile optimization guidelines"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Walk me through your resume in under 2 minutes.",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the hook in your introduction that recruiters remember most?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_2",
      "domain": "interview_prep",
      "module": "Module 2",
      "submodule": "Behavioral Interviews",
      "title": "Mastering the STAR Method & Building 20 Stories",
      "learningType": "🏗 Build",
      "priority": "🔥 Critical",
      "difficulty": "🟡 Medium",
      "weight": 6,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Behavioral Interview Prep Guide",
      "practice": "Write 20 behavioral STAR stories for different leadership principles",
      "notes": "Track Situation, Task, Action, and Results clearly. Quantify your achievements.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Behavioral Interview Prep Guide",
        "course": "Behavioral Interview Mastery",
        "youtube": "STAR method breakdown",
        "docs": "STAR stories template sheets"
      },
      "miniProjects": {
        "name": "20 STAR Story Bank Document",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Amazon",
          "application": "STAR method verification against 16 Leadership Principles"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Describe a time you failed and what you learned from it.",
          "difficulty": "🟡 Medium",
          "answered": false
        }
      ],
      "reflection": {
        "question": "Which of your stories is the most versatile for behavioral questions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_3",
      "domain": "interview_prep",
      "module": "Module 3",
      "submodule": "Technical Communication",
      "title": "Explaining Core Data Science to Stakeholders",
      "learningType": "🎤 Present",
      "priority": "🔥 Critical",
      "difficulty": "🟡 Medium",
      "weight": 5,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Technical Communication Handbook",
      "practice": "Explain SQL Indexes and Python Decorators to different stakeholders",
      "notes": "Can you explain it to a Child, Friend, Manager, Recruiter, CEO, and Data Scientist?",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Technical Communication Handbook",
        "course": "Communication Lab",
        "youtube": "Explain Like I'm Five series",
        "docs": "Stakeholder explainers guide"
      },
      "miniProjects": {
        "name": "Multi-level Concept Explainer Notes",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Netflix",
          "application": "Engineers explaining tech choices in public tech blog posts"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you explain what a Random Forest model is to a non-technical Recruiter?",
          "difficulty": "🟡 Medium",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What analogies work best when explaining machine learning concepts?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_4",
      "domain": "interview_prep",
      "module": "Module 4",
      "submodule": "Project Defense",
      "title": "Project Defense Framework: Problems, Trade-offs & Decisions",
      "learningType": "🏗 Build",
      "priority": "🔥 Critical",
      "difficulty": "🔴 Hard",
      "weight": 6,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Designing Data-Intensive Applications",
      "practice": "Document architectural trade-offs for 3 projects",
      "notes": "Every project defense must answer: Problem, Why, Approach, Alternatives, Trade-offs, Results, Future Improvements, and Business Value.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Designing Data-Intensive Applications",
        "course": "System Architectures Defense",
        "youtube": "System design tradeoffs",
        "docs": "Project defense checklists"
      },
      "miniProjects": {
        "name": "Project Defense Architecture Slide Deck",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Airbnb",
          "application": "Internal design reviews and architecture defenses"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Why did you choose that specific model or database index? What alternatives did you consider?",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the weakest part of your project architecture and how do you defend it?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_5",
      "domain": "interview_prep",
      "module": "Module 5",
      "submodule": "Case Studies",
      "title": "Product Sense & Case Studies: Uber, Netflix, Amazon",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🔴 Hard",
      "weight": 5,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Case In Point",
      "practice": "Solve 5 business case problems",
      "notes": "Focus on structured business thinking, metric selection, and issue trees instead of writing code.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Case In Point",
        "course": "Product Analytics and Case Studies",
        "youtube": "Mock business case interviews",
        "docs": "Case frameworks reference sheet"
      },
      "miniProjects": {
        "name": "Product Case Analysis Report",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Uber",
          "application": "Dynamic pricing algorithms case study"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you measure the success of a new recommendations feed on Netflix?",
          "difficulty": "🔴 Hard",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What frameworks help you structure vague product sense questions?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_6",
      "domain": "interview_prep",
      "module": "Module 6",
      "submodule": "Mock Interviews",
      "title": "Weekly Mock Interview Tracker & Performance Review",
      "learningType": "🎤 Present",
      "priority": "🔥 Critical",
      "difficulty": "🔴 Hard",
      "weight": 7,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Mock Interview Standard Protocols",
      "practice": "Conduct and log one mock interview weekly",
      "notes": "Track Speed, Confidence, Technical Accuracy, Eye Contact, and Vocabulary.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Mock Interview Standard Protocols",
        "course": "Self-Review Mechanics",
        "youtube": "Good vs Bad mock interview behaviors",
        "docs": "Mock interview scorecards"
      },
      "miniProjects": {
        "name": "Mock Performance Review Logs",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Pramp",
          "application": "Peer-to-peer mock interview structures"
        }
      ],
      "interviewQuestions": [
        {
          "question": "How do you rate your body language and speaking speed in high-pressure mocks?",
          "difficulty": "🟡 Medium",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is your main weakness in live mock sessions (e.g. rushing, silence)?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_7",
      "domain": "interview_prep",
      "module": "Module 7",
      "submodule": "Company Tracks",
      "title": "Deep Dive into Targeted Company Tracks: Google, Amex",
      "learningType": "📖 Read",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "weight": 4,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Company Prep Guides Collection",
      "practice": "Analyze the specific interview loops of 3 target companies",
      "notes": "Map company focus areas: Amex (Business Case, SQL), Google (Stats, Python, Googlyness), Swiggy (System Design, Speed).",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Company Prep Guides Collection",
        "course": "Company Focus Seminars",
        "youtube": "How I got offer interviews at Microsoft",
        "docs": "Company track matrices"
      },
      "miniProjects": {
        "name": "Target Company Playbook Profile",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Google",
          "application": "Focuses heavily on general cognitive ability and scaling metrics"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the core cultural principles of your top target company.",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "How does your resume align with the specific values of your target company?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_8",
      "domain": "interview_prep",
      "module": "Module 8",
      "submodule": "Salary & Negotiation",
      "title": "Salary Expectation, Counter Offers & HR Negotiation",
      "learningType": "🎤 Present",
      "priority": "🟠 High",
      "difficulty": "🟡 Medium",
      "weight": 3,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Never Split the Difference",
      "practice": "Script and roleplay salary negotiation responses",
      "notes": "Understand equity models, bonus structures, total comp, and counter-offer framing.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Never Split the Difference",
        "course": "Negotiation Bootcamp",
        "youtube": "Negotiating total compensation scripts",
        "docs": "Salary comparators tracker"
      },
      "miniProjects": {
        "name": "Salary Negotiation Swipe Script",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "Levels.fyi",
          "application": "Compensation transparency and benchmarking guides"
        }
      ],
      "interviewQuestions": [
        {
          "question": "What are your salary expectations? (Explain how you answer without locked figures)",
          "difficulty": "🟡 Medium",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is your walk-away number and how do you determine it?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    },
    {
      "id": "t_ip_9",
      "domain": "interview_prep",
      "module": "Module 9",
      "submodule": "Offer Readiness",
      "title": "Final Offer Readiness Checklist Validation",
      "learningType": "📖 Read",
      "priority": "🔥 Critical",
      "difficulty": "🟢 Easy",
      "weight": 5,
      "status": "Not Started",
      "mastery": "⚪ Beginner",
      "resource": "Offer Readiness Handbook",
      "practice": "Complete the ultimate offer readiness checklist",
      "notes": "Verify Resume, Portfolio, LinkedIn, Mock Scores, Behavioral stories, and Technical answers are green.",
      "completedOn": "",
      "favorite": false,
      "bookmarked": false,
      "reviseLater": false,
      "interviewFrequency": "★★★★★",
      "learningStages": {
        "learn": false,
        "watch": false,
        "practice": false,
        "project": false,
        "industry": false,
        "interview": false,
        "reflection": false,
        "revision": false
      },
      "resources": {
        "book": "Offer Readiness Handbook",
        "course": "Final Polish Review",
        "youtube": "Final steps before placements week",
        "docs": "Readiness checklist sheets"
      },
      "miniProjects": {
        "name": "System Audit Scorecard",
        "status": "Not Started"
      },
      "industryExamples": [
        {
          "company": "HR",
          "application": "Final checks and background check preparation guides"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Are all components of your application strategy green and verified?",
          "difficulty": "🟢 Easy",
          "answered": false
        }
      ],
      "reflection": {
        "question": "What is the single area you need to polish right before interview day?",
        "answer": ""
      },
      "revision": {
        "interval": 2,
        "lastDate": "",
        "nextDate": "",
        "confidence": "⚪ Beginner"
      }
    }
  ],
  "resources": [
    {
      "id": "r_0",
      "domain": "sql",
      "module": "All",
      "title": "Learning SQL — Alan Beaulieu",
      "category": "Book",
      "provider": "Alan Beaulieu",
      "type": "Primary",
      "purpose": "Core SQL syntax & functions reference",
      "difficulty": "Easy",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_1",
      "domain": "sql",
      "module": "All",
      "title": "SQL Practice Problems",
      "category": "Book",
      "provider": "Sylvia Moestl Vasilik",
      "type": "Primary",
      "purpose": "Practical scenario based query writing",
      "difficulty": "Medium",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_2",
      "domain": "sql",
      "module": "All",
      "title": "SQL Cookbook — Anthony Molinaro",
      "category": "Book",
      "provider": "Anthony Molinaro",
      "type": "Primary",
      "purpose": "Advanced window functions, strings, pivot tricks",
      "difficulty": "Hard",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_3",
      "domain": "sql",
      "module": "All",
      "title": "T-SQL Window Functions — Itzik Ben-Gan",
      "category": "Book",
      "provider": "Itzik Ben-Gan",
      "type": "Primary",
      "purpose": "In-depth window partitions & frame boundaries",
      "difficulty": "Hard",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_4",
      "domain": "python",
      "module": "All",
      "title": "Fluent Python",
      "category": "Book",
      "provider": "Luciano Ramalho",
      "type": "Primary",
      "purpose": "Master idiomatic Python. Read only relevant chapters.",
      "difficulty": "Hard",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_5",
      "domain": "python",
      "module": "All",
      "title": "Python Object-Oriented Programming",
      "category": "Book",
      "provider": "Dusty Phillips",
      "type": "Primary",
      "purpose": "Master OOP through implementation.",
      "difficulty": "Medium",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_6",
      "domain": "python",
      "module": "All",
      "title": "Effective Python",
      "category": "Book",
      "provider": "Brett Slatkin",
      "type": "Primary",
      "purpose": "Professional coding practices.",
      "difficulty": "Medium",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_7",
      "domain": "python",
      "module": "All",
      "title": "Python Testing with pytest",
      "category": "Book",
      "provider": "Brian Okken",
      "type": "Primary",
      "purpose": "Testing and code quality.",
      "difficulty": "Medium",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_8",
      "domain": "python",
      "module": "All",
      "title": "Python Official Documentation",
      "category": "Documentation",
      "provider": "Python Software Foundation",
      "type": "Secondary",
      "purpose": "Language reference specification guides",
      "difficulty": "Hard",
      "priority": "Medium",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_9",
      "domain": "python",
      "module": "All",
      "title": "LeetCode",
      "category": "Practice",
      "provider": "LeetCode",
      "type": "Primary",
      "purpose": "Algorithmic practice challenges",
      "difficulty": "Medium",
      "priority": "High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_10",
      "domain": "python",
      "module": "All",
      "title": "Codewars",
      "category": "Practice",
      "provider": "Codewars",
      "type": "Secondary",
      "purpose": "Code execution katas",
      "difficulty": "Medium",
      "priority": "Medium",
      "estimatedHours": 20,
      "url": "",
      "chapters": "",
      "skip": "",
      "completed": false,
      "favorite": false,
      "notes": ""
    },
    {
      "id": "r_comm_0",
      "domain": "communication",
      "module": "All",
      "title": "Storytelling with Data — Cole Nussbaumer Knaflic",
      "category": "Book",
      "provider": "Cole Nussbaumer Knaflic",
      "type": "Primary",
      "purpose": "Learn charts, visual hierarchy, decluttering",
      "difficulty": "Medium",
      "priority": "🔥 Critical",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Chapters 1-6, 8, 9",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Industry standard for analytical presentation"
    },
    {
      "id": "r_comm_1",
      "domain": "communication",
      "module": "All",
      "title": "HBR Guide to Better Business Writing — Bryan A. Garner",
      "category": "Book",
      "provider": "Bryan A. Garner",
      "type": "Secondary",
      "purpose": "Business vocabulary, tone, clear sentence structure",
      "difficulty": "Easy",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Chapters 1-12, 15, 20",
      "skip": "Chapters 26-28",
      "completed": false,
      "favorite": false,
      "notes": "Essential guide for emails, reports, and escalations"
    },
    {
      "id": "r_comm_2",
      "domain": "communication",
      "module": "All",
      "title": "The Pyramid Principle — Barbara Minto",
      "category": "Book",
      "provider": "Barbara Minto",
      "type": "Primary",
      "purpose": "Structured thinking, Minto pyramid rules",
      "difficulty": "Hard",
      "priority": "🔥 Critical",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Chapters 1-5",
      "skip": "Chapters 6-9",
      "completed": false,
      "favorite": false,
      "notes": "Core framework for executive presentations and case study solving"
    },
    {
      "id": "r_comm_3",
      "domain": "communication",
      "module": "All",
      "title": "Talk Like TED — Carmine Gallo",
      "category": "Book",
      "provider": "Carmine Gallo",
      "type": "Secondary",
      "purpose": "Professional speaking, presentation structure",
      "difficulty": "Medium",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Chapters 1-3, 5, 8",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Practical guidelines for body language, vocal pacing, and confidence"
    },
    {
      "id": "r_comm_4",
      "domain": "communication",
      "module": "All",
      "title": "Docs for Developers",
      "category": "Book",
      "provider": "Jared Bhatti",
      "type": "Primary",
      "purpose": "Technical writing, README files, API docs",
      "difficulty": "Medium",
      "priority": "🔥 Critical",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Chapters 1-6",
      "skip": "Chapters 8, 10",
      "completed": false,
      "favorite": false,
      "notes": "Overhauling repo documentation"
    },
    {
      "id": "r_comm_5",
      "domain": "communication",
      "module": "All",
      "title": "Harvard Business Review",
      "category": "Documentation",
      "provider": "Harvard Business Publishing",
      "type": "Secondary",
      "purpose": "Business communication, feedback models",
      "difficulty": "Easy",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Articles on SBI feedback, escalation, business updates",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Review weekly updates"
    },
    {
      "id": "r_comm_6",
      "domain": "communication",
      "module": "All",
      "title": "GitHub Docs",
      "category": "Documentation",
      "provider": "GitHub",
      "type": "Secondary",
      "purpose": "Markdown formatting, repo README guidelines",
      "difficulty": "Easy",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Markdown specs, repository layout pages",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Check formatting guides"
    },
    {
      "id": "r_comm_7",
      "domain": "communication",
      "module": "All",
      "title": "Microsoft Writing Style Guide",
      "category": "Documentation",
      "provider": "Microsoft",
      "type": "Secondary",
      "purpose": "Clear, concise technical voice definition",
      "difficulty": "Medium",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Voice, tone, and grammar standards pages",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Use for technical reports alignment"
    },
    {
      "id": "r_comm_8",
      "domain": "communication",
      "module": "All",
      "title": "Google Technical Writing",
      "category": "Documentation",
      "provider": "Google",
      "type": "Primary",
      "purpose": "Writing documentation, code comments, notes",
      "difficulty": "Medium",
      "priority": "🔥 Critical",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Technical Writing One and Two short courses",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Mandatory foundation for data engineering logs"
    },
    {
      "id": "r_comm_9",
      "domain": "communication",
      "module": "All",
      "title": "Toastmasters",
      "category": "Practice",
      "provider": "Toastmasters International",
      "type": "Secondary",
      "purpose": "Speaking, reducing filler words, confidence",
      "difficulty": "Medium",
      "priority": "🟡 Medium",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Table Topics and Icebreaker speeches",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Practice pitches in local clubs"
    },
    {
      "id": "r_comm_10",
      "domain": "communication",
      "module": "All",
      "title": "LinkedIn",
      "category": "Practice",
      "provider": "Microsoft",
      "type": "Secondary",
      "purpose": "Personal brand, technical posts",
      "difficulty": "Easy",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Profiles updates, networking guidelines",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Target weekly updates postings"
    },
    {
      "id": "r_comm_11",
      "domain": "communication",
      "module": "All",
      "title": "GitHub",
      "category": "Practice",
      "provider": "Microsoft",
      "type": "Secondary",
      "purpose": "Code documentation, portfolios repository",
      "difficulty": "Easy",
      "priority": "🟠 High",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Profile README construction",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Source repositories"
    },
    {
      "id": "r_comm_12",
      "domain": "communication",
      "module": "All",
      "title": "Kaggle",
      "category": "Practice",
      "provider": "Google",
      "type": "Secondary",
      "purpose": "Publish notebook narratives, share models",
      "difficulty": "Medium",
      "priority": "🟡 Medium",
      "estimatedHours": 20,
      "url": "",
      "chapters": "Kaggle Discussions and Notebook Markdown sections",
      "skip": "None",
      "completed": false,
      "favorite": false,
      "notes": "Share markdown pipelines"
    }
  ],
  "projects": [
    {
      "id": "p_py_0",
      "domain": "python",
      "name": "Expense Tracker",
      "category": "Finance",
      "concepts": "OOP, File I/O, Error Handling",
      "libraries": "json, csv, datetime",
      "dataset": "Local JSON file",
      "github": "Completed",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Completed",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_1",
      "domain": "python",
      "name": "Student Management System",
      "category": "Education",
      "concepts": "OOP, Classes, Database Operations",
      "libraries": "sqlite3, dataclasses",
      "dataset": "Local SQLite DB",
      "github": "In Progress",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "In Progress",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_2",
      "domain": "python",
      "name": "Library Management System",
      "category": "Education",
      "concepts": "Inheritance, Magic Methods, Searching",
      "libraries": "sqlite3",
      "dataset": "Local SQLite DB",
      "github": "Pending",
      "doc": "No",
      "resumeReady": false,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_3",
      "domain": "python",
      "name": "CSV Analyzer",
      "category": "Utility",
      "concepts": "File Streams, String manipulation",
      "libraries": "csv, collections",
      "dataset": "User CSV file",
      "github": "Pending",
      "doc": "No",
      "resumeReady": false,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_4",
      "domain": "python",
      "name": "Weather Dashboard",
      "category": "Web APIs",
      "concepts": "REST API integration, JSON parsing",
      "libraries": "requests, dotenv",
      "dataset": "OpenWeather API",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_5",
      "domain": "python",
      "name": "File Organizer",
      "category": "System Utility",
      "concepts": "OS manipulation, scripting",
      "libraries": "os, shutil, pathlib",
      "dataset": "Local directories",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_6",
      "domain": "python",
      "name": "Sales Analytics Pipeline",
      "category": "E-commerce",
      "concepts": "ETL process, Vectorization, plots",
      "libraries": "pandas, numpy, matplotlib",
      "dataset": "Kaggle E-comm Sales CSV",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_7",
      "domain": "python",
      "name": "Customer Segmentation",
      "category": "Marketing",
      "concepts": "Unsupervised clustering, data cleaning",
      "libraries": "pandas, scikit-learn, seaborn",
      "dataset": "Mall Customer Clusters dataset",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_8",
      "domain": "python",
      "name": "Churn Prediction",
      "category": "Customer Success",
      "concepts": "Supervised classification, model validation",
      "libraries": "pandas, scikit-learn, joblib",
      "dataset": "Telecom Churn CSV dataset",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_py_9",
      "domain": "python",
      "name": "End-to-End Data Science Project",
      "category": "Capstone",
      "concepts": "Complete pipelines, pytest, packaging",
      "libraries": "pandas, scikit-learn, pytest, streamlit",
      "dataset": "Real-world business dataset",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": false,
      "status": "Not Started",
      "deliverables": "Working GitHub repository and visual dashboard",
      "requiredTopics": [
        "OOP",
        "File Processing",
        "Data Cleaning"
      ],
      "requiredModules": [
        "Module 1: Professional OOP",
        "Module 4: Standard Library Mastery"
      ],
      "requiredResources": [
        "Fluent Python",
        "Effective Python"
      ],
      "notes": ""
    },
    {
      "id": "p_comm_0",
      "domain": "communication",
      "name": "Professional README",
      "category": "Technical Writing",
      "concepts": "Information hierarchy, installation documentation",
      "libraries": "Markdown",
      "dataset": "Ecommerce sales data",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "README.md file containing install, setup, design assumptions, and KPI definitions.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Create an industry-grade project README explaining data engineering pipeline setup."
    },
    {
      "id": "p_comm_1",
      "domain": "communication",
      "name": "Portfolio Documentation",
      "category": "Technical Writing",
      "concepts": "Code organization, architecture summary",
      "libraries": "Markdown",
      "dataset": "Syllabus projects",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Repository hierarchy structure, markdown pages linking to SQL/Python projects.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Compile a unified GitHub repository displaying clean scripts and data architectures."
    },
    {
      "id": "p_comm_2",
      "domain": "communication",
      "name": "Technical Blog",
      "category": "Personal Brand",
      "concepts": "Technical blogging, audience interest",
      "libraries": "Markdown",
      "dataset": "Kaggle metrics",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Medium or LinkedIn article covering SQL query optimizations and results.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Write an analytics-focused article summarizing insights from a Kaggle dataset."
    },
    {
      "id": "p_comm_3",
      "domain": "communication",
      "name": "Dashboard Presentation",
      "category": "Storytelling",
      "concepts": "Visual hierarchy, executive summary",
      "libraries": "PowerPoint",
      "dataset": "Funnel metrics",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Slide deck targeting conversion, CAC, and ROI metrics with visual summaries.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Design a 5-slide deck presenting dashboard KPIs to the CEO."
    },
    {
      "id": "p_comm_4",
      "domain": "communication",
      "name": "Business Case Presentation",
      "category": "Storytelling",
      "concepts": "MECE issue trees, strategic advice",
      "libraries": "PowerPoint",
      "dataset": "Server log charts",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Slide deck utilizing Minto Pyramid principles for actionable suggestions.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Prepare a recommendation slide deck explaining root cause analyses of server crashes."
    },
    {
      "id": "p_comm_5",
      "domain": "communication",
      "name": "Machine Learning Presentation",
      "category": "Storytelling",
      "concepts": "Cost-benefit metrics, model communication",
      "libraries": "PowerPoint",
      "dataset": "Churn test results",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Presentation deck translating model precision/recall to cost avoidance figures.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Draft an executive summary deck explaining churn model savings to VPs."
    },
    {
      "id": "p_comm_6",
      "domain": "communication",
      "name": "Mock Interview Portfolio",
      "category": "Interview Lab",
      "concepts": "STAR framework, professional speaking",
      "libraries": "Video recorder",
      "dataset": "Personal profile",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Video links and transcripts addressing project difficulties and conflicts.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Record video answers to core behavioral questions using the STAR framework."
    },
    {
      "id": "p_comm_7",
      "domain": "communication",
      "name": "GitHub Profile Improvement",
      "category": "Personal Brand",
      "concepts": "Portfolio architecture, markdown headers",
      "libraries": "Markdown",
      "dataset": "Personal repos",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Profile README listing active tech stacks, project directories, and contact info.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Optimize the personal GitHub profile to showcase code contributions."
    },
    {
      "id": "p_comm_8",
      "domain": "communication",
      "name": "LinkedIn Optimization",
      "category": "Personal Brand",
      "concepts": "Resume writing, online branding",
      "libraries": "LinkedIn features",
      "dataset": "Career achievements",
      "github": "Pending",
      "doc": "Yes",
      "resumeReady": true,
      "portfolioReady": true,
      "status": "Not Started",
      "deliverables": "Updated headline, summary section, and project descriptions.",
      "requiredTopics": [
        "Storytelling",
        "STAR Answers",
        "Writing"
      ],
      "requiredModules": [
        "Module 5: Interview Communication Lab",
        "Module 8: Personal Brand"
      ],
      "requiredResources": [
        "Storytelling with Data",
        "Talk Like TED"
      ],
      "notes": "Restructure the LinkedIn profile to highlight data scientist credentials."
    }
  ],
  "mistakes": [
    {
      "id": "m_0",
      "date": "2026-06-25",
      "problem": "List Comprehension with side effects",
      "mistake": "Using list comprehension to print values rather than mutate",
      "reason": "Comprehensions should generate values; print returns None",
      "correct": "Use a standard for loop for side-effects",
      "lesson": "Separate side-effects from data translations",
      "revisionDate": "2026-06-28"
    }
  ],
  "notes": [
    {
      "id": "n_0",
      "date": "2026-06-26",
      "topic": "MRO Linearization",
      "content": "MRO follows C3 Linearization. You can check it via Class.__mro__ or Class.mro(). Multiple inheritance searches depth-first then breadth-first among shared ancestors.",
      "takeaways": "Super() invokes the next class in MRO, not necessarily the parent class.",
      "actions": "Test MRO on deep diamond class structure."
    }
  ],
  "revisions": [
    {
      "id": "r_rev_0",
      "topic": "Recursive CTEs",
      "lastDate": "2026-06-15",
      "confidence": "🟡 Learning",
      "nextDate": "2026-06-29",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_0",
      "topic": "Professional Vocabulary",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_1",
      "topic": "Project Explanation",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_2",
      "topic": "Interview Answers",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_3",
      "topic": "Storytelling",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_4",
      "topic": "Presentation Skills",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_5",
      "topic": "Documentation",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    },
    {
      "id": "rev_comm_6",
      "topic": "Business Writing",
      "lastDate": "2026-06-29",
      "confidence": "🟡 Learning",
      "nextDate": "2026-07-01",
      "status": "Scheduled"
    }
  ],
  "weeklyPlans": [
    {
      "id": "w_0",
      "week": "Week 26",
      "goals": "Complete Python Module 0 & SQL Module 0",
      "tasks": "Revision tasks, basic coding questions solve",
      "hours": 20,
      "reflection": "OOP constructors took more time than expected.",
      "achievements": "Solves 45 Python basics questions"
    }
  ],
  "applications": [
    {
      "id": "a_0",
      "company": "Google",
      "role": "Data Scientist",
      "location": "Mountain View, CA (Hybrid)",
      "date": "2026-06-10",
      "status": "Interviewing",
      "salary": "$160,000 - $190,000",
      "contact": "recruiter@google.com",
      "notes": "Completed coding screening test. Next is technical round."
    },
    {
      "id": "a_1",
      "company": "Stripe",
      "role": "Data Analyst",
      "location": "Remote",
      "date": "2026-06-15",
      "status": "Applied",
      "salary": "$120,000 - $140,000",
      "contact": "careers@stripe.com",
      "notes": "Referral submitted by engineering lead."
    }
  ],
  "interviews": [
    {
      "id": "i_0",
      "company": "Google",
      "role": "Data Scientist",
      "round": "Technical Ingestion/SQL Screen",
      "date": "2026-06-20",
      "questions": "Pivot aggregations, Gaps and Islands window queries, running totals under partitions.",
      "performance": 4,
      "weakAreas": "Optimizing window bounds using RANGE frames",
      "outcome": "Passed",
      "followUp": "Read Window Frame specifications"
    },
    {
      "id": "i_comm_1",
      "company": "Amazon",
      "role": "Data Scientist",
      "round": "Behavioral & Leadership Principles (STAR Screen)",
      "date": "2026-06-25",
      "questions": "Describe a time when you disagreed with a product lead on key metrics selection. How did you resolve it?",
      "performance": 5,
      "weakAreas": "Pacing the delivery of context to avoid losing time",
      "outcome": "Passed",
      "followUp": "Focus on concise Situation descriptions in STAR answers"
    },
    {
      "id": "i_comm_2",
      "company": "Meta",
      "role": "Data Analyst",
      "round": "Product Sense & Executive Briefing",
      "date": "2026-06-28",
      "questions": "Present dashboard metrics for user retention shift to a simulated Product Director. Highlight action recommendations.",
      "performance": 4,
      "weakAreas": "Visual slide transition linkages during high pressure questions",
      "outcome": "Passed",
      "followUp": "Review slide visual hierarchies and practice handling unexpected interjections"
    }
  ],
  "secondBrain": [
    {
      "id": "sb_0",
      "date": "2026-06-26",
      "category": "Mental Models",
      "topic": "Pareto Principle (80/20 Rule)",
      "content": "80% of execution performance improvements come from targeting 20% of code paths (usually nested loops or database queries).",
      "references": "High-Performance Python",
      "tag": "System Design"
    },
    {
      "id": "sb_1",
      "date": "2026-06-27",
      "category": "Ideas",
      "topic": "Personal SQL Parser",
      "content": "Build a python tool using regex & sqlparse to auto-document database schemas and map column-level lineage.",
      "references": "Open-source lineaged libraries",
      "tag": "Project Ideas"
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = DEFAULT_DATA;
}