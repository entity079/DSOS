import re
import os

DATA_PATH = r"D:\DSOS\data.js"

# --- 1. DEFINE MODULE METADATA AND SCHEMAS ---

module_definitions = [
  # SQL Modules
  {
    "id": "mod_sql_0",
    "domain": "sql",
    "title": "Module 0: Revision",
    "description": "Fundamental queries revision covering filters, joins, groupings, and aggregates.",
    "estimatedHours": 15,
    "interviewWeight": 3,
    "outcomes": ["✓ Recall basic query filters", "✓ Perform aggregations with GROUP BY", "✓ Join multiple tables correctly"],
    "prerequisites": ["Basic database query concepts", "Relational schema understanding"],
    "deliverables": ["Preloaded core revision scripts"],
    "masteryChecklist": ["Can explain inner vs outer joins", "Can aggregate data using HAVING", "Can use CASE conditional logic"]
  },
  {
    "id": "mod_sql_1",
    "domain": "sql",
    "title": "Module 1: Advanced SQL",
    "description": "Window partitions, analytical aggregations, recursive CTEs, and gaps/islands challenges.",
    "estimatedHours": 25,
    "interviewWeight": 5,
    "outcomes": ["✓ Design window partitions and frames", "✓ Construct recursive Common Table Expressions (CTEs)", "✓ Solve gaps and islands problems"],
    "prerequisites": ["SELECT & WHERE queries", "Basic Joins"],
    "deliverables": ["Advanced Analytics Query templates"],
    "masteryChecklist": ["Can write running totals using ROWS frames", "Can query hierarchies via recursive CTEs", "Can identify sequences islands"]
  },
  {
    "id": "mod_sql_2",
    "domain": "sql",
    "title": "Module 2: Query Optimization",
    "description": "Composite indexing, covering indexes, query plans traversal, and predicate pushdown.",
    "estimatedHours": 18,
    "interviewWeight": 5,
    "outcomes": ["✓ Index columns using composite keys", "✓ Read query execution plans (EXPLAIN)", "✓ Optimize join predicates"],
    "prerequisites": ["Index concepts", "Table size analysis"],
    "deliverables": ["Query performance review document"],
    "masteryChecklist": ["Can explain B-Tree index structure", "Can interpret EXPLAIN ANALYZE run output", "Can eliminate redundant subqueries"]
  },
  {
    "id": "mod_sql_3",
    "domain": "sql",
    "title": "Module 3: Database Design",
    "description": "First, second, and third normalization forms, fact/dimension structures, and key mappings.",
    "estimatedHours": 12,
    "interviewWeight": 4,
    "outcomes": ["✓ Design Fact and Dimension schemas", "✓ Apply normalization levels up to 3NF", "✓ Establish primary/foreign key relationships"],
    "prerequisites": ["Relational mappings"],
    "deliverables": ["Star Schema E-commerce model diagram"],
    "masteryChecklist": ["Can normalize table structures to 3NF", "Can explain Star vs Snowflake schemas", "Can map composite relationships"]
  },
  {
    "id": "mod_sql_4",
    "domain": "sql",
    "title": "Module 4: Production SQL",
    "description": "Virtual columns caching, transactions concurrency control, and table lock mitigations.",
    "estimatedHours": 14,
    "interviewWeight": 4,
    "outcomes": ["✓ Create views and materialized views", "✓ Structure transactional ACID checks", "✓ Handle database locking constraints"],
    "prerequisites": ["Table write scopes"],
    "deliverables": ["Transactional schema scripts"],
    "masteryChecklist": ["Can create materialized views with refreshes", "Can explain ACID transactions parameters", "Can handle locking scenarios"]
  },
  {
    "id": "mod_sql_5",
    "domain": "sql",
    "title": "Module 5: Analytical SQL",
    "description": "Temporal cohorts, retention curves, conversion pipelines, and churn metrics logging.",
    "estimatedHours": 20,
    "interviewWeight": 5,
    "outcomes": ["✓ Code cohort analysis reports", "✓ Calculate user retention and churn models", "✓ Design sales conversion funnel logic"],
    "prerequisites": ["Window Functions", "GROUP BY aggregations"],
    "deliverables": ["SaaS Cohort Analysis query library"],
    "masteryChecklist": ["Can query rolling cohort percentages", "Can construct retention curves", "Can model funnel steps conversion"]
  },
  {
    "id": "mod_sql_6",
    "domain": "sql",
    "title": "Module 6: Interview Prep",
    "description": "LeetCode medium and hard analytical challenges, query planning, and conceptual walkthroughs.",
    "estimatedHours": 22,
    "interviewWeight": 5,
    "outcomes": ["✓ Solve Medium LeetCode database problems", "✓ Answer join optimization questions", "✓ Think aloud during technical tests"],
    "prerequisites": ["All core SQL skills"],
    "deliverables": ["LeetCode SQL problem log"],
    "masteryChecklist": ["Can solve LeetCode medium questions under 25m", "Can explain indexing during mock tests", "Can handle case interviews"]
  },
  {
    "id": "mod_sql_7",
    "domain": "sql",
    "title": "Module 7: Projects",
    "description": "End-to-end production database audit, eCommerce customer lifecycle dashboard, and indexing optimizations.",
    "estimatedHours": 30,
    "interviewWeight": 5,
    "outcomes": ["✓ Build a production eCommerce analytics database", "✓ Model sales and user retention funnels", "✓ Optimize slow analytical queries"],
    "prerequisites": ["eCommerce Analytics Project"],
    "deliverables": ["eCommerce Database Portfolio Repo"],
    "masteryChecklist": ["Can design star-schema database models", "Can push queries to production repos", "Can document index optimizations"]
  },
  # Python Modules
  {
    "id": "mod_py_0",
    "domain": "python",
    "title": "Module 0: Competency Assessment",
    "description": "Standard sequences, dictionary hashing constraints, comprehensions, and search loops basics.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Apply sequences and comprehensions", "✓ Handle closures and functional scopes", "✓ Write conditional loops"],
    "prerequisites": ["Basic coding syntax"],
    "deliverables": ["Basic exercises answers scripts"],
    "masteryChecklist": ["Can write nested dict/list comprehensions", "Can use binary search closures", "Can map local vs global namespaces"]
  },
  {
    "id": "mod_py_1",
    "domain": "python",
    "title": "Module 1: Professional OOP",
    "description": "Constructors properties, diamond inheritance schemas, Minto composition, and dunder magic methods.",
    "estimatedHours": 25,
    "interviewWeight": 5,
    "outcomes": ["✓ Design class hierarchies", "✓ Build reusable classes", "✓ Apply inheritance correctly", "✓ Understand composition", "✓ Read production OOP code"],
    "prerequisites": ["Functions", "Closures", "Scope", "Higher-order functions"],
    "deliverables": ["Student Management System", "Library Management System", "Banking System", "Hospital Management System"],
    "masteryChecklist": ["Can implement C3 Linearization class super()", "Can overload operators via magic dunder methods", "Can write class properties wrappers"]
  },
  {
    "id": "mod_py_2",
    "domain": "python",
    "title": "Module 2: Pythonic Programming",
    "description": "Yield generator pipelines, function closures decorators, and context managers memory streams.",
    "estimatedHours": 20,
    "interviewWeight": 5,
    "outcomes": ["✓ Code custom decorators and closures", "✓ Implement yield generators for lazy streams", "✓ Overload magic dunder methods"],
    "prerequisites": ["Module 1 OOP", "Functions Scopes"],
    "deliverables": ["Lazy data pipeline script"],
    "masteryChecklist": ["Can write metadata preserving decorators", "Can create custom __enter__/__exit__ managers", "Can pipeline lazy generators"]
  },
  {
    "id": "mod_py_3",
    "domain": "python",
    "title": "Module 3: Professional Python",
    "description": "Package structures, local PyPI distributions, error scopes, and dynamic configuration loggers.",
    "estimatedHours": 18,
    "interviewWeight": 4,
    "outcomes": ["✓ Build reusable local packages", "✓ Capture code errors using custom exceptions", "✓ Configure script loggers"],
    "prerequisites": ["Module 0 foundations"],
    "deliverables": ["Custom packaged library"],
    "masteryChecklist": ["Can structure nested import packages", "Can raise custom inherit exceptions", "Can bind console/file log handlers"]
  },
  {
    "id": "mod_py_4",
    "domain": "python",
    "title": "Module 4: Standard Library Mastery",
    "description": "Itertools optimization, collections counters, pathlib filesystem traverses, and slots memory locks.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Utilize collections and itertools", "✓ Navigate filesystems using pathlib", "✓ Optimize memory using __slots__"],
    "prerequisites": ["Module 0 foundations"],
    "deliverables": ["FileSystem Organizer script"],
    "masteryChecklist": ["Can write complex chain itertools loops", "Can traverse directory subtrees dynamically", "Can lock variables via __slots__"]
  },
  {
    "id": "mod_py_5",
    "domain": "python",
    "title": "Module 5: Testing & Code Quality",
    "description": "Pytest frameworks, testing fixtures parametrization, assertion mechanics, and mock APIs integrations.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Write pytest testing suits", "✓ Configure parameters and fixtures", "✓ Test edge cases and errors"],
    "prerequisites": ["Classes and Functions"],
    "deliverables": ["Pytest coverage metrics report"],
    "masteryChecklist": ["Can isolate tests using session/module fixtures", "Can parameterize inputs for multiple iterations", "Can assert errors and mocks"]
  },
  {
    "id": "mod_py_6",
    "domain": "python",
    "title": "Module 6: Data Processing",
    "description": "Vectorized numpy array slices, Pandas merges groupings, and analytics cleaning routines.",
    "estimatedHours": 22,
    "interviewWeight": 5,
    "outcomes": ["✓ Vectorize mathematics using NumPy", "✓ Group and merge datasets in Pandas", "✓ Pivot and clean tables"],
    "prerequisites": ["pathlib filesystem modules", "collections"],
    "deliverables": ["Pandas Data Analytics pipeline script"],
    "masteryChecklist": ["Can optimize Pandas loops using vectorizations", "Can merge dataframes using complex indexes", "Can pivot and shape matrices"]
  },
  {
    "id": "mod_py_7",
    "domain": "python",
    "title": "Module 7: Data Science",
    "description": "Preprocessing scikit-learn transformers, models pipelines validation, and error evaluation metrics.",
    "estimatedHours": 24,
    "interviewWeight": 5,
    "outcomes": ["✓ Build ColumnTransformer data structures", "✓ Deploy preprocessing scikit-learn models", "✓ Train predictive algorithms"],
    "prerequisites": ["Pandas Data Processing"],
    "deliverables": ["Scikit-learn model artifacts"],
    "masteryChecklist": ["Can build complete scikit-learn ColumnTransformer", "Can validate model models pipelines", "Can plot precision-recall metrics"]
  },
  {
    "id": "mod_py_8",
    "domain": "python",
    "title": "Module 8: Automation",
    "description": "Automated system organization scripting, os folder monitoring, and scheduled cron automations.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Script directory folder monitoring tasks", "✓ Automate system organization", "✓ Log filesystem events"],
    "prerequisites": ["FileSystem Organizer Script"],
    "deliverables": ["Automated folder organizer script"],
    "masteryChecklist": ["Can automate directory cleanups", "Can trap filesystem script signals", "Can parse logging streams"]
  },
  {
    "id": "mod_py_9",
    "domain": "python",
    "title": "Module 9: APIs",
    "description": "HTTP request keys authentication, JSON payload streams, and status rate limit codes catcher.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Request database API endpoints", "✓ Parse OAuth headers", "✓ Handle API rate limit codes"],
    "prerequisites": ["JSON files traversal"],
    "deliverables": ["Weather Dashboard API pipeline script"],
    "masteryChecklist": ["Can handle requests session retries", "Can parse nested JSON streams", "Can mock API responses in testing"]
  },
  {
    "id": "mod_py_10",
    "domain": "python",
    "title": "Module 10: Advanced Python",
    "description": "Asynchronous coroutines, event gather structures, and thread pools operations.",
    "estimatedHours": 20,
    "interviewWeight": 5,
    "outcomes": ["✓ Write asynchronous coroutines", "✓ Handle concurrency gather events", "✓ Prevent database thread blocks"],
    "prerequisites": ["Generators and Iterators"],
    "deliverables": ["Async web crawler script"],
    "masteryChecklist": ["Can write gather async coroutines loops", "Can explain GIL limitations in threads", "Can parse async tasks queues"]
  },
  {
    "id": "mod_py_11",
    "domain": "python",
    "title": "Module 11: Reading Real Code",
    "description": "Auditing open-source library modules, trace-backs mapping, and structural patterns analysis.",
    "estimatedHours": 12,
    "interviewWeight": 4,
    "outcomes": ["✓ Review open-source pytest directories", "✓ Understand production library constructs", "✓ Document third-party frameworks"],
    "prerequisites": ["Pytest testing", "OOP magic methods"],
    "deliverables": ["Pytest codebase design audit"],
    "masteryChecklist": ["Can read raw pytest source files", "Can map third-party plugins interfaces", "Can trace complex package classes MRO"]
  },
  {
    "id": "mod_py_12",
    "domain": "python",
    "title": "Module 12: Portfolio",
    "description": "Repository setups, markdown profile templates, automated scripts documentation.",
    "estimatedHours": 15,
    "interviewWeight": 5,
    "outcomes": ["✓ Package scripts for GitHub", "✓ Write professional README files", "✓ Deploy portfolios page"],
    "prerequisites": ["All python projects"],
    "deliverables": ["GitHub developer portfolios profile"],
    "masteryChecklist": ["Can deploy static portfolios pages", "Can format README using standard sections", "Can index code repositories"]
  },
  # Communication Modules
  {
    "id": "mod_comm_0",
    "domain": "communication",
    "title": "Module 0: Professional English Foundation",
    "description": "Business communication grammar, tone adjustments, vocabulary mapping, and writing clear emails.",
    "estimatedHours": 12,
    "interviewWeight": 3,
    "outcomes": ["✓ Write clear business sentences", "✓ Apply professional tone in updates", "✓ Avoid common spelling grammar traps"],
    "prerequisites": ["English foundations"],
    "deliverables": ["Drafted vocabulary reference guide"],
    "masteryChecklist": ["Can compose brief updates", "Can avoid common run-on traps", "Can target active writing tones"]
  },
  {
    "id": "mod_comm_1",
    "domain": "communication",
    "title": "Module 1: Professional Speaking",
    "description": "Elevator pitches structures (30s/60s/2m), analogical descriptions for non-technical managers, and filler words reduction.",
    "estimatedHours": 15,
    "interviewWeight": 5,
    "outcomes": ["✓ Present elevator self-introductions (30s/60s/2m)", "✓ Explain complex algorithms to non-tech people", "✓ Eradicate filler words from pitches"],
    "prerequisites": ["General speaking basics"],
    "deliverables": ["Self introduction pitches audio transcripts"],
    "masteryChecklist": ["Can deliver 60s elevator pitch", "Can explain ML regressions simply", "Can limit filler words to <2 per minute"]
  },
  {
    "id": "mod_comm_2",
    "domain": "communication",
    "title": "Module 2: Business Communication",
    "description": "Agenda-driven updates format, async Slack summaries, and escalating blockages models.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Write professional status updates", "✓ Structure agenda and follow-up templates", "✓ Escalate blockages clearly to leads"],
    "prerequisites": ["Email writing basics"],
    "deliverables": ["SOP Communication template library"],
    "masteryChecklist": ["Can write structured status reports", "Can write constructive feedback reviews", "Can escalate blockers using mitigation options"]
  },
  {
    "id": "mod_comm_3",
    "domain": "communication",
    "title": "Module 3: Storytelling with Data",
    "description": "Dashboard slide designs, visual hierarchies, and presenting KPIs to executives.",
    "estimatedHours": 20,
    "interviewWeight": 5,
    "outcomes": ["✓ Design visual dashboard slide structures", "✓ Highlight insights using visual hierarchy", "✓ Present metric recommendations to VPs"],
    "prerequisites": ["Charts creation basics"],
    "deliverables": ["Executive slide presentation deck"],
    "masteryChecklist": ["Can layout slides minimalists structure", "Can choose optimal chart properties", "Can design dashboard explanations for CEOs"]
  },
  {
    "id": "mod_comm_4",
    "domain": "communication",
    "title": "Module 4: Technical Writing",
    "description": "Unified repository layouts, markdown files documentation, and clear python docstrings rules.",
    "estimatedHours": 18,
    "interviewWeight": 5,
    "outcomes": ["✓ Overhaul repo README files", "✓ Document API endpoints and structures", "✓ Write clear python code docstrings"],
    "prerequisites": ["Markdown basics"],
    "deliverables": ["Professional GitHub repository README.md"],
    "masteryChecklist": ["Can compose clean markdown files", "Can document API payloads formats", "Can write why-centered code comments"]
  },
  {
    "id": "mod_comm_5",
    "domain": "communication",
    "title": "Module 5: Interview Communication Lab",
    "description": "STAR behavioral method, project architecture walkthroughs, and thinking aloud during live reviews.",
    "estimatedHours": 20,
    "interviewWeight": 5,
    "outcomes": ["✓ Formulate STAR behavioral summaries", "✓ Explain SQL/Python projects clearly", "✓ Think aloud during live coding reviews"],
    "prerequisites": ["All python/SQL projects built"],
    "deliverables": ["STAR interview answers template log"],
    "masteryChecklist": ["Can structure STAR answers under 2m", "Can walk through database optimizations simply", "Can articulate coding logics out loud"]
  },
  {
    "id": "mod_comm_6",
    "domain": "communication",
    "title": "Module 6: Data Storytelling",
    "description": "Mece issue trees root cause analytics, confidence levels presentations, and business recommendations formatting.",
    "estimatedHours": 20,
    "interviewWeight": 5,
    "outcomes": ["✓ Extract insights from database queries", "✓ Present precision vs recall in cost terms", "✓ Write strategic executive recommendations"],
    "prerequisites": ["Business KPI mappings"],
    "deliverables": ["Business Case Presentation deck"],
    "masteryChecklist": ["Can design MECE root cause issue trees", "Can explain model precision cost impact", "Can draft executive summaries report"]
  },
  {
    "id": "mod_comm_7",
    "domain": "communication",
    "title": "Module 7: Presentation Skills",
    "description": "Visual slide layouts, handling stakeholder queries, and presenting capstone projects.",
    "estimatedHours": 15,
    "interviewWeight": 4,
    "outcomes": ["✓ Design slides with clear visual hierarchies", "✓ Speak confidently with presentations", "✓ Respond cleanly to unexpected queries"],
    "prerequisites": ["PowerPoint design basics"],
    "deliverables": ["Kaggle analysis presentation deck"],
    "masteryChecklist": ["Can structure presentations narrative flow", "Can keep slides presentation timing limits", "Can redirect unexpected questions cleanly"]
  },
  {
    "id": "mod_comm_8",
    "domain": "communication",
    "title": "Module 8: Personal Brand",
    "description": "LinkedIn profile sections, GitHub contributions README, and resume layouts emphasizing impact.",
    "estimatedHours": 15,
    "interviewWeight": 5,
    "outcomes": ["✓ Optimize LinkedIn bio and headers", "✓ Frame resumes highlighting money impacts", "✓ Deploy technical blogging posts"],
    "prerequisites": ["GitHub portfolio repositories list"],
    "deliverables": ["Optimized LinkedIn profile and Resume"],
    "masteryChecklist": ["Can format resume items using dollar impact metrics", "Can update LinkedIn profiles summary", "Can write technical blog updates"]
  }
]

# --- 2. PYTHON MIGRATION LOGIC ---

def run_migration():
    print("Reading data.js...")
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    # Load modules code block
    modules_list_js = []
    for m in module_definitions:
        m_js = f"""    {{
      id: "{m['id']}",
      domain: "{m['domain']}",
      title: "{m['title']}",
      description: "{m['description']}",
      estimatedHours: {m['estimatedHours']},
      interviewWeight: {m['interviewWeight']},
      outcomes: {repr(m['outcomes'])},
      prerequisites: {repr(m['prerequisites'])},
      deliverables: {repr(m['deliverables'])},
      masteryChecklist: {repr(m['masteryChecklist'])}
    }}"""
        modules_list_js.append(m_js)
    
    modules_block = "  modules: [\n" + ",\n".join(modules_list_js) + "\n  ],\n"

    # Inject modules right after streak definition
    # Let's insert it as: streak: 5, \n modules: [ ... ],
    text = text.replace("streak: 5,", "streak: 5,\n" + modules_block)
    
    # Let's upgrade domains
    # Modify the domains count for Communication & SQL
    # Professional Communication has 9 modules, SQL has 8 modules
    text = text.replace('modulesCount: 5, progress: 0, hours: 0', 'modulesCount: 9, progress: 0, hours: 85')

    # Convert tasks to upgraded schema
    # We will match each tasks node using regex
    # Match: { id: "...", domain: "...", module: "...", submodule: "...", task: "...", priority: "...", difficulty: "...", estHours: ..., actHours: ..., status: "...", mastery: "...", resource: "...", notes: "...", deps: "...", compDate: "..." }
    task_regex = r'\{\s*id:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*module:\s*"([^"]+)",\s*submodule:\s*"([^"]+)",\s*task:\s*"([^"]+)",\s*priority:\s*"([^"]+)",\s*difficulty:\s*"([^"]+)",\s*estHours:\s*([\d\.]+),\s*actHours:\s*([\d\.]+),\s*status:\s*"([^"]+)",\s*mastery:\s*"([^"]+)",\s*resource:\s*"([^"]*)",\s*notes:\s*"([^"]*)",\s*deps:\s*"([^"]*)",\s*compDate:\s*"([^"]*)"\s*\}'
    
    # Custom handler for task migration
    def task_repl(match):
        tid, dom, mod, sub, task_name, pri, diff, est_h, act_h, status, mastery, resource, notes, deps, comp_d = match.groups()
        
        # 1. Determine learningType
        task_lower = task_name.lower()
        sub_lower = sub.lower()
        if "leetcode" in task_lower or "datale" in task_lower or "practice" in task_lower or "exercise" in task_lower or "solve" in task_lower or "questions" in task_lower:
            l_type = "💻 Practice"
        elif "project" in task_lower or "system" in task_lower or "simulator" in task_lower or "tracker" in task_lower:
            l_type = "🏗 Build"
        elif "present" in task_lower or "explain" in task_lower or "introduction" in task_lower or "tell me" in task_lower or "mock" in task_lower:
            l_type = "🎤 Present"
        elif "readme" in task_lower or "doc" in task_lower or "comments" in task_lower or "markdown" in task_lower or "writing" in task_lower or "vocabulary" in task_lower or "grammar" in task_lower or "structure" in task_lower or "tone" in task_lower:
            l_type = "📚 Documentation"
        elif "review" in task_lower or "revision" in task_lower or "revising" in task_lower:
            l_type = "📝 Revise"
        else:
            l_type = "📖 Read"
            
        # 2. Convert priority
        if pri == "High":
            pri_val = "🟠 High"
        elif pri == "Medium":
            pri_val = "🟡 Medium"
        elif pri == "Low":
            pri_val = "⚪ Low"
        elif "Critical" in pri:
            pri_val = "🔥 Critical"
        else:
            pri_val = pri
            
        # 3. Convert difficulty
        if diff == "Easy":
            diff_val = "🟢 Easy"
        elif diff == "Medium":
            diff_val = "🟡 Medium"
        elif diff == "Hard":
            diff_val = "🔴 Hard"
        else:
            diff_val = diff
            
        # 4. Convert weight
        if l_type == "🏗 Build" or "project" in task_lower or "system" in task_lower:
            weight = 8
        elif "oop" in task_lower or "inheritance" in task_lower or "window" in task_lower or "index" in task_lower or "recursion" in task_lower or "cte" in task_lower or "star" in task_lower:
            weight = 5
        elif "function" in task_lower or "dict" in task_lower or "collection" in task_lower or "test" in task_lower or "email" in task_lower or "slack" in task_lower:
            weight = 2
        else:
            weight = 1
            
        # 5. Convert mastery
        if mastery in ["🟢 Confident", "⭐ Interview Ready", "👑 Master", "🔵 Practicing", "🟡 Learning"]:
            mst_val = mastery
        else:
            mst_val = "⚪ Beginner"
            
        # 6. Determine interviewFrequency
        if weight >= 5:
            freq = "★★★★★"
        elif weight == 3 or weight == 4:
            freq = "★★★★"
        elif weight == 2:
            freq = "★★★"
        else:
            freq = "★★"
            
        # Output new schema
        return f"""{{
      id: "{tid}",
      domain: "{dom}",
      module: "{mod}",
      submodule: "{sub}",
      title: "{task_name}",
      learningType: "{l_type}",
      priority: "{pri_val}",
      difficulty: "{diff_val}",
      weight: {weight},
      status: "{status}",
      mastery: "{mst_val}",
      resource: "{resource}",
      practice: "{deps}",
      notes: "{notes}",
      completedOn: "{comp_d}",
      favorite: false,
      bookmarked: false,
      reviseLater: false,
      interviewFrequency: "{freq}"
    }}"""

    text = re.sub(task_regex, task_repl, text)
    
    # We also have the communication tasks, which were already written with the properties:
    # id, domain, module, submodule, task, priority, difficulty, weight, status, mastery, resource, question, notes, completedOn, favorite, bookmarked, reviseLater
    # Let's rename 'task' to 'title', 'question' to 'practice', and add 'interviewFrequency' for those too!
    comm_task_regex = r'id:\s*"(comm_\d+)",\s*domain:\s*"communication",\s*module:\s*"([^"]+)",\s*submodule:\s*"([^"]+)",\s*task:\s*"([^"]+)",\s*priority:\s*"([^"]+)",\s*difficulty:\s*"([^"]+)",\s*weight:\s*(\d+),\s*status:\s*"([^"]+)",\s*mastery:\s*"([^"]+)",\s*resource:\s*"([^"]*)",\s*question:\s*"([^"]*)",\s*notes:\s*"([^"]*)",\s*completedOn:\s*"([^"]*)",\s*favorite:\s*false,\s*bookmarked:\s*false,\s*reviseLater:\s*false'
    
    def comm_repl(match):
        tid, mod, sub, task_name, pri, diff, weight, status, mastery, resource, question, notes, comp_d = match.groups()
        
        # Determine learningType
        task_lower = task_name.lower()
        if "leetcode" in task_lower or "practice" in task_lower or "exercise" in task_lower or "solve" in task_lower:
            l_type = "💻 Practice"
        elif "project" in task_lower or "presentation" in task_lower or "resume" in task_lower or "linkedin" in task_lower:
            l_type = "🏗 Build"
        elif "intro" in task_lower or "speaking" in task_lower or "mock" in task_lower or "pitch" in task_lower:
            l_type = "🎤 Present"
        else:
            l_type = "📖 Read"
            
        freq = "★★★★★" if int(weight) >= 5 else "★★★★" if int(weight) == 3 or int(weight) == 4 else "★★★" if int(weight) == 2 else "★★"
        
        q = '"'
        return f"""id: "{tid}",
      domain: "communication",
      module: "{mod}",
      submodule: "{sub}",
      title: "{task_name}",
      learningType: "{l_type}",
      priority: "{pri}",
      difficulty: "{diff}",
      weight: {weight},
      status: "{status}",
      mastery: "{mastery}",
      resource: "{resource}",
      practice: "{question}",
      notes: "{notes}",
      completedOn: "{comp_d}",
      favorite: false,
      bookmarked: false,
      reviseLater: false,
      interviewFrequency: {q}{freq}{q}"""

    text = re.sub(comm_task_regex, comm_repl, text)

    # Let's upgrade resources
    # Match: { id: "...", domain: "...", name: "...", author: "...", type: "...", purpose: "...", difficulty: "...", priority: "...", progress: ... }
    # Upgrade to category, provider, type (Primary/Secondary), completed (boolean)
    res_regex = r'\{\s*id:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*author:\s*"([^"]+)",\s*type:\s*"([^"]+)",\s*purpose:\s*"([^"]*)",\s*difficulty:\s*"([^"]+)",\s*priority:\s*"([^"]+)",\s*progress:\s*(\d+)\s*\}'
    
    def res_repl(match):
        rid, dom, name, author, r_type, purpose, diff, pri, progress = match.groups()
        category = "Book" if r_type == "Book" else "Documentation" if r_type == "Documentation" else "Practice" if r_type == "Website" else "Article"
        prov = author
        usage_type = "Primary" if pri == "High" or pri == "🔥 Critical" else "Secondary"
        completed = "true" if int(progress) == 100 else "false"
        
        return f"""{{
      id: "{rid}",
      domain: "{dom}",
      module: "All",
      title: "{name}",
      category: "{category}",
      provider: "{prov}",
      type: "{usage_type}",
      purpose: "{purpose}",
      difficulty: "{diff}",
      priority: "{pri}",
      estimatedHours: 20,
      url: "",
      chapters: "",
      skip: "",
      completed: {completed},
      favorite: false,
      notes: ""
    }}"""

    text = re.sub(res_regex, res_repl, text)
    
    # We also do it for communication resources which have:
    # id, domain, name, author, type, purpose, difficulty, priority, progress, recommended, skip, notes
    comm_res_regex = r'\{\s*id:\s*"(r_comm_\d+)",\s*domain:\s*"communication",\s*name:\s*"([^"]+)",\s*author:\s*"([^"]+)",\s*type:\s*"([^"]+)",\s*purpose:\s*"([^"]*)",\s*difficulty:\s*"([^"]+)",\s*priority:\s*"([^"]+)",\s*progress:\s*0,\s*recommended:\s*"([^"]*)",\s*skip:\s*"([^"]*)",\s*notes:\s*"([^"]*)"\s*\}'
    
    def comm_res_repl(match):
        rid, name, author, r_type, purpose, diff, pri, rec, skip, notes = match.groups()
        category = "Book" if r_type == "Book" else "Documentation" if r_type == "Documentation" or r_type == "Website" else "Practice"
        usage_type = "Primary" if pri == "High" or pri == "🔥 Critical" else "Secondary"
        
        return f"""{{
      id: "{rid}",
      domain: "communication",
      module: "All",
      title: "{name}",
      category: "{category}",
      provider: "{author}",
      type: "{usage_type}",
      purpose: "{purpose}",
      difficulty: "{diff}",
      priority: "{pri}",
      estimatedHours: 20,
      url: "",
      chapters: "{rec}",
      skip: "{skip}",
      completed: false,
      favorite: false,
      notes: "{notes}"
    }}"""

    text = re.sub(comm_res_regex, comm_res_repl, text)

    # Let's upgrade projects
    # Match: { id: "p_py_0", domain: "python", name: "Expense Tracker", category: "Finance", concepts: "OOP, File I/O, Error Handling", libraries: "json, csv, datetime", dataset: "Local JSON file", github: "Completed", doc: "Yes", resume: "Yes", status: "Completed" }
    # Add requiredTopics, requiredModules, requiredResources, deliverables, resumeReady (boolean), portfolioReady (boolean)
    proj_regex = r'\{\s*id:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*concepts:\s*"([^"]*)",\s*libraries:\s*"([^"]*)",\s*dataset:\s*"([^"]*)",\s*github:\s*"([^"]+)",\s*doc:\s*"([^"]+)",\s*resume:\s*"([^"]+)",\s*status:\s*"([^"]+)"\s*\}'
    
    def proj_repl(match):
        pid, dom, name, cat, concepts, libs, dataset, github, doc, resume, status = match.groups()
        resume_ready = "true" if resume == "Yes" else "false"
        port_ready = "true" if github == "Completed" else "false"
        
        return f"""{{
      id: "{pid}",
      domain: "{dom}",
      name: "{name}",
      category: "{cat}",
      concepts: "{concepts}",
      libraries: "{libs}",
      dataset: "{dataset}",
      github: "{github}",
      doc: "{doc}",
      resumeReady: {resume_ready},
      portfolioReady: {port_ready},
      status: "{status}",
      deliverables: "Working GitHub repository and visual dashboard",
      requiredTopics: ["OOP", "File Processing", "Data Cleaning"],
      requiredModules: ["Module 1: Professional OOP", "Module 4: Standard Library Mastery"],
      requiredResources: ["Fluent Python", "Effective Python"],
      notes: ""
    }}"""

    text = re.sub(proj_regex, proj_repl, text)
    
    # We do it for communication projects too
    # id, domain, name, category, concepts, libraries, dataset, github, doc, resume, portfolio, status, notes, deliverables
    comm_proj_regex = r'\{\s*id:\s*"(p_comm_\d+)",\s*domain:\s*"communication",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*concepts:\s*"([^"]*)",\s*libraries:\s*"([^"]*)",\s*dataset:\s*"([^"]*)",\s*github:\s*"([^"]+)",\s*doc:\s*"([^"]+)",\s*resume:\s*"([^"]+)",\s*portfolio:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*notes:\s*"([^"]*)",\s*deliverables:\s*"([^"]*)"\s*\}'
    
    def comm_proj_repl(match):
        pid, name, cat, concepts, libs, dataset, github, doc, resume, portfolio, status, notes, deliverables = match.groups()
        resume_ready = "true" if resume == "Yes" else "false"
        port_ready = "true" if portfolio == "Yes" else "false"
        
        return f"""{{
      id: "{pid}",
      domain: "communication",
      name: "{name}",
      category: "{cat}",
      concepts: "{concepts}",
      libraries: "{libs}",
      dataset: "{dataset}",
      github: "{github}",
      doc: "{doc}",
      resumeReady: {resume_ready},
      portfolioReady: {port_ready},
      status: "{status}",
      deliverables: "{deliverables}",
      requiredTopics: ["Storytelling", "STAR Answers", "Writing"],
      requiredModules: ["Module 5: Interview Communication Lab", "Module 8: Personal Brand"],
      requiredResources: ["Storytelling with Data", "Talk Like TED"],
      notes: "{notes}"
    }}"""

    text = re.sub(comm_proj_regex, comm_proj_repl, text)

    # Let's save the upgraded database code back to data.js
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        f.write(text)

    print("[+] Database successfully migrated to Learning Operating System architecture!")

if __name__ == "__main__":
    run_migration()
