import re

DATA_PATH = r"D:\DSOS\data.js"

# --- 1. DEFINING DATA STRUCTURES ---

# Domains update
old_comm_domain = '{ id: "communication", name: "Communication & Storytelling", icon: "fas fa-comments", desc: "Data Storytelling, presentations, resumes, portfolios", modulesCount: 5, progress: 0, hours: 0 },'
new_comm_domain = """{
      id: "communication",
      name: "Professional Communication & Business Influence",
      modulesCount: 9,
      hours: 85,
      progress: 0,
      icon: "fas fa-comments",
      desc: "Develop communication, storytelling, documentation, interview, and business presentation skills for Data Analysts and Data Scientists."
    },"""

# Tasks data
tasks_data = [
    # Module 0 - Professional English Foundation
    ("comm_001", "Module 0", "Professional English Foundation", "Professional Grammar", "🟠 High", "Easy", 2, "HBR Guide to Better Business Writing", "Sentence structures and parts of speech for clear reports"),
    ("comm_002", "Module 0", "Professional English Foundation", "Sentence Structure", "🟠 High", "Easy", 2, "HBR Guide to Better Business Writing", "Avoid run-ons, passive voice vs active voice"),
    ("comm_003", "Module 0", "Professional English Foundation", "Business Vocabulary", "🟠 High", "Easy", 2, "HBR Guide to Better Business Writing", "Action verbs for business deliverables"),
    ("comm_004", "Module 0", "Professional English Foundation", "Technical Vocabulary", "🔥 Critical", "Medium", 3, "Google Technical Writing", "Correct usage of statistical and database terms"),
    ("comm_005", "Module 0", "Professional English Foundation", "Writing Clearly", "🔥 Critical", "Medium", 4, "The Pyramid Principle", "Structured thinking, Minto pyramid for sentences"),
    ("comm_006", "Module 0", "Professional English Foundation", "Avoiding Common Grammar Mistakes", "🟠 High", "Easy", 2, "HBR Guide to Better Business Writing", "Subject-verb agreement, modifiers, punctuation"),
    ("comm_007", "Module 0", "Professional English Foundation", "Professional Tone", "🔥 Critical", "Medium", 4, "HBR Guide to Better Business Writing", "Directness, politeness, and conciseness"),
    ("comm_008", "Module 0", "Professional English Foundation", "Email Vocabulary", "🟠 High", "Easy", 2, "HBR Guide to Better Business Writing", "Standard call-to-actions, update formulations"),

    # Module 1 - Professional Speaking
    ("comm_009", "Module 1", "Professional Speaking", "Self Introduction (30 sec)", "🟠 High", "Easy", 3, "Talk Like TED", "Elevator pitch structure for brief greetings"),
    ("comm_010", "Module 1", "Professional Speaking", "Self Introduction (60 sec)", "🟠 High", "Medium", 3, "Talk Like TED", "Elevator pitch with a focus on core analytical projects"),
    ("comm_011", "Module 1", "Professional Speaking", "Self Introduction (2 min)", "🟠 High", "Medium", 3, "Talk Like TED", "Extended walkthrough of career path and achievements"),
    ("comm_012", "Module 1", "Professional Speaking", "Explaining Projects", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Structuring project overview with context, action, result"),
    ("comm_013", "Module 1", "Professional Speaking", "Speaking with Confidence", "🟠 High", "Medium", 3, "Talk Like TED", "Vocal variety, pacing, and eye contact fundamentals"),
    ("comm_014", "Module 1", "Professional Speaking", "Reducing Filler Words", "🟠 High", "Medium", 3, "Toastmasters", "Eliminating 'like', 'um', 'uh', 'you know'"),
    ("comm_015", "Module 1", "Professional Speaking", "Technical Explanation", "🔥 Critical", "Hard", 4, "Google Technical Writing", "Explaining database partitions or model weights step-by-step"),
    ("comm_016", "Module 1", "Professional Speaking", "Speaking to Non-Technical Audience", "🔥 Critical", "Hard", 5, "Storytelling with Data", "Analogy-driven descriptions, business-value focuses"),
    ("comm_017", "Module 1", "Professional Speaking", "Explaining Machine Learning Simply", "🔥 Critical", "Hard", 5, "Google Technical Writing", "Explain random forest or gradient boosting to stakeholders"),
    ("comm_018", "Module 1", "Professional Speaking", "Mock Introductions", "🟠 High", "Medium", 3, "Toastmasters", "Interactive feedback sessions on pitches"),
    ("comm_019", "Module 1", "Professional Speaking", "Weekly Recording Practice", "🟠 High", "Easy", 2, "Toastmasters", "Reviewing personal video recordings for filler words"),

    # Module 2 - Business Communication
    ("comm_020", "Module 2", "Business Communication", "Professional Emails", "🟠 High", "Easy", 2, "HBR Guide to Better Business Writing", "Formulating meeting requests, summaries, and updates"),
    ("comm_021", "Module 2", "Business Communication", "Meeting Etiquette", "🟠 High", "Easy", 2, "Harvard Business Review", "Agenda creation, active listening, notes capture"),
    ("comm_022", "Module 2", "Business Communication", "Slack / Teams Communication", "🟠 High", "Easy", 2, "Harvard Business Review", "Status summaries, tags, async check-in formats"),
    ("comm_023", "Module 2", "Business Communication", "Writing Updates", "🟠 High", "Medium", 3, "HBR Guide to Better Business Writing", "Structured status updates using bullet points"),
    ("comm_024", "Module 2", "Business Communication", "Status Reports", "🟠 High", "Medium", 3, "HBR Guide to Better Business Writing", "KPI achievements, upcoming sprint goals, blockers"),
    ("comm_025", "Module 2", "Business Communication", "Escalating Issues", "🔥 Critical", "Medium", 4, "Harvard Business Review", "Highlighting delays, suggesting potential mitigation pathways"),
    ("comm_026", "Module 2", "Business Communication", "Asking Good Questions", "🔥 Critical", "Easy", 3, "The Pyramid Principle", "Clarifying requirements, business priorities discovery"),
    ("comm_027", "Module 2", "Business Communication", "Giving Constructive Feedback", "🔥 Critical", "Medium", 4, "Harvard Business Review", "SBI model (Situation, Behavior, Impact) for reviews"),
    ("comm_028", "Module 2", "Business Communication", "Professional Chat Communication", "🟠 High", "Easy", 2, "Harvard Business Review", "Keep chats structured and query-ready"),
    ("comm_029", "Module 2", "Business Communication", "Business Writing", "🟠 High", "Medium", 3, "HBR Guide to Better Business Writing", "Minto structure for business cases"),

    # Module 3 - Storytelling with Data
    ("comm_030", "Module 3", "Storytelling with Data", "Choosing Charts", "🔥 Critical", "Medium", 4, "Storytelling with Data", "Bar vs line vs scatter plot selection matrices"),
    ("comm_031", "Module 3", "Storytelling with Data", "Highlighting Insights", "🔥 Critical", "Medium", 5, "Storytelling with Data", "Decluttering, visual hierarchy, preattentive attributes"),
    ("comm_032", "Module 3", "Storytelling with Data", "Executive Summary", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "One-pager covering problem, impact, solution"),
    ("comm_033", "Module 3", "Storytelling with Data", "Actionable Recommendations", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Minto Pyramid rule for recommendation layouts"),
    ("comm_034", "Module 3", "Storytelling with Data", "Avoiding Misleading Visuals", "🔥 Critical", "Easy", 3, "Storytelling with Data", "Correct axis scale baselines, no 3D charts"),
    ("comm_035", "Module 3", "Storytelling with Data", "Business KPIs", "🔥 Critical", "Medium", 4, "Harvard Business Review", "Conversion, retention, churn, ROI metrics definition"),
    ("comm_036", "Module 3", "Storytelling with Data", "Communicating Results", "🔥 Critical", "Medium", 5, "Storytelling with Data", "Translating data columns to financial impact"),
    ("comm_037", "Module 3", "Storytelling with Data", "Data Narrative", "🔥 Critical", "Hard", 5, "Storytelling with Data", "Structure plots into an overarching storyline"),
    ("comm_038", "Module 3", "Storytelling with Data", "Audience-Specific Communication", "🔥 Critical", "Medium", 4, "Storytelling with Data", "Tailoring presentations to technical vs business users"),
    ("comm_039", "Module 3", "Storytelling with Data", "Explain dashboard for CEO", "🔥 Critical", "Hard", 5, "Storytelling with Data", "Focus on revenue, profit, growth, and risks"),
    ("comm_040", "Module 3", "Storytelling with Data", "Explain dashboard for Marketing Manager", "🔥 Critical", "Medium", 4, "Storytelling with Data", "Focus on CAC, LTV, conversion rates, and ROI"),
    ("comm_041", "Module 3", "Storytelling with Data", "Explain dashboard for Product Manager", "🔥 Critical", "Medium", 4, "Storytelling with Data", "Focus on DAU, feature adoption, and retention curves"),
    ("comm_042", "Module 3", "Storytelling with Data", "Explain dashboard for Data Scientist", "🔥 Critical", "Medium", 4, "Storytelling with Data", "Focus on database lineage, accuracy, and latency"),

    # Module 4 - Technical Writing
    ("comm_043", "Module 4", "Technical Writing", "README Files", "🔥 Critical", "Medium", 4, "Docs for Developers", "Standard structure for open-source GitHub repos"),
    ("comm_044", "Module 4", "Technical Writing", "Project Documentation", "🔥 Critical", "Hard", 4, "Docs for Developers", "Complete API, installation, and deployment references"),
    ("comm_045", "Module 4", "Technical Writing", "Notebook Narratives", "🔥 Critical", "Medium", 3, "Google Technical Writing", "Writing markdown cells to explain notebook workflows"),
    ("comm_046", "Module 4", "Technical Writing", "API Documentation Basics", "🔥 Critical", "Hard", 4, "Docs for Developers", "Endpoints, parameters, responses, and errors"),
    ("comm_047", "Module 4", "Technical Writing", "Code Comments", "🔥 Critical", "Easy", 3, "Google Technical Writing", "Documenting 'why' not 'what' in classes/methods"),
    ("comm_048", "Module 4", "Technical Writing", "Markdown", "🔥 Critical", "Easy", 2, "GitHub Docs", "Fenced code blocks, tables, links, images, bullet trees"),
    ("comm_049", "Module 4", "Technical Writing", "Documentation Structure", "🔥 Critical", "Medium", 3, "Docs for Developers", "Information architecture, navigation, index layouts"),
    ("comm_050", "Module 4", "Technical Writing", "Writing Reports", "🔥 Critical", "Hard", 4, "Docs for Developers", "Drafting technical audit findings and analytics papers"),
    ("comm_051", "Module 4", "Technical Writing", "Writing Research Summaries", "🔥 Critical", "Hard", 4, "Google Technical Writing", "Summarizing deep learning papers clearly for teams"),
    ("comm_052", "Module 4", "Technical Writing", "Project: Rewrite existing project docs", "🔥 Critical", "Medium", 4, "Docs for Developers", "Overhaul README and docstrings for a Python/SQL script"),

    # Module 5 - Interview Communication Lab
    ("comm_053", "Module 5", "Interview Communication Lab", "Tell Me About Yourself", "🔥 Critical", "Medium", 5, "Talk Like TED", "Crafting a clean personal summary around analytics skills"),
    ("comm_054", "Module 5", "Interview Communication Lab", "Strengths", "🔥 Critical", "Easy", 4, "Talk Like TED", "Provide evidence-backed technical strengths"),
    ("comm_055", "Module 5", "Interview Communication Lab", "Weaknesses", "🔥 Critical", "Medium", 4, "Talk Like TED", "Discuss constructive technical development paths"),
    ("comm_056", "Module 5", "Interview Communication Lab", "Behavioral Questions", "🔥 Critical", "Hard", 5, "Talk Like TED", "Responding to situational scenarios clearly"),
    ("comm_057", "Module 5", "Interview Communication Lab", "STAR Method", "🔥 Critical", "Hard", 5, "Talk Like TED", "Situation, Task, Action, Result framework"),
    ("comm_058", "Module 5", "Interview Communication Lab", "Project Explanation", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Exposing architecture, business problem, and ROI"),
    ("comm_059", "Module 5", "Interview Communication Lab", "SQL Project Explanation", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Explain cohort or optimization index projects"),
    ("comm_060", "Module 5", "Interview Communication Lab", "Python Project Explanation", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Explain library packaging or automation scripts"),
    ("comm_061", "Module 5", "Interview Communication Lab", "Machine Learning Explanation", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Explain model validation, column transforms, pipelines"),
    ("comm_062", "Module 5", "Interview Communication Lab", "Failure Stories", "🔥 Critical", "Medium", 4, "Talk Like TED", "Failed database migration or model shift lessons learned"),
    ("comm_063", "Module 5", "Interview Communication Lab", "Leadership Questions", "🔥 Critical", "Medium", 4, "Talk Like TED", "Mentoring junior analysts, driving design initiatives"),
    ("comm_064", "Module 5", "Interview Communication Lab", "Conflict Resolution", "🔥 Critical", "Medium", 4, "Talk Like TED", "Resolving requirements conflicts with product teams"),
    ("comm_065", "Module 5", "Interview Communication Lab", "HR Round Practice", "🔥 Critical", "Easy", 3, "Talk Like TED", "Handling salary expectations, alignment, relocation"),
    ("comm_066", "Module 5", "Interview Communication Lab", "Technical Interview Communication", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Thinking out loud during coding/SQL test sessions"),
    ("comm_067", "Module 5", "Interview Communication Lab", "Confidence Building", "🔥 Critical", "Easy", 3, "Talk Like TED", "Body language, tone, self-assurance practices"),

    # Module 6 - Data Storytelling
    ("comm_068", "Module 6", "Data Storytelling", "Communicating Insights", "🔥 Critical", "Medium", 5, "Storytelling with Data", "Extracting insights from database queries"),
    ("comm_069", "Module 6", "Data Storytelling", "Executive Presentations", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Designing high-impact slide narratives for VPs"),
    ("comm_070", "Module 6", "Data Storytelling", "Recommendation Writing", "🔥 Critical", "Medium", 4, "The Pyramid Principle", "Minto structured recommendation summaries"),
    ("comm_071", "Module 6", "Data Storytelling", "Business Thinking", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Aligning technical solutions with company strategies"),
    ("comm_072", "Module 6", "Data Storytelling", "Root Cause Analysis", "🔥 Critical", "Hard", 4, "The Pyramid Principle", "Mece issue trees for database performance crashes"),
    ("comm_073", "Module 6", "Data Storytelling", "Decision Making", "🔥 Critical", "Medium", 4, "The Pyramid Principle", "Matrix valuations of trade-offs in cloud setups"),
    ("comm_074", "Module 6", "Data Storytelling", "Presenting KPIs", "🔥 Critical", "Easy", 4, "Storytelling with Data", "Clear visual styling of critical business metrics"),
    ("comm_075", "Module 6", "Data Storytelling", "Communicating Model Results", "🔥 Critical", "Hard", 5, "Storytelling with Data", "Explain classification precision vs recall in money terms"),
    ("comm_076", "Module 6", "Data Storytelling", "Presenting Uncertainty", "🔥 Critical", "Hard", 4, "Storytelling with Data", "Explaining confidence intervals or probability values"),
    ("comm_077", "Module 6", "Data Storytelling", "Business Recommendations", "🔥 Critical", "Medium", 4, "The Pyramid Principle", "Strategic reports recommending data tool moves"),
    ("comm_078", "Module 6", "Data Storytelling", "Mini Projects: Present analysis as Executive Summary", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Convert complex churn analysis to a 1-page summary"),
    ("comm_079", "Module 6", "Data Storytelling", "Mini Projects: Present analysis as Business Report", "🔥 Critical", "Hard", 4, "The Pyramid Principle", "Write a comprehensive report on data ingestion errors"),
    ("comm_080", "Module 6", "Data Storytelling", "Mini Projects: Present analysis as Presentation", "🔥 Critical", "Medium", 4, "Talk Like TED", "Create a 5-slide decks summary for senior leads"),
    ("comm_081", "Module 6", "Data Storytelling", "Mini Projects: Present analysis as One-minute explanation", "🔥 Critical", "Medium", 5, "Talk Like TED", "Summarize a machine learning model's business lift in 60s"),

    # Module 7 - Presentation Skills
    ("comm_082", "Module 7", "Presentation Skills", "Presentation Structure", "🟠 High", "Easy", 4, "Talk Like TED", "Structuring presentation slides: intro, problem, data, result"),
    ("comm_083", "Module 7", "Presentation Skills", "Slide Design", "🟠 High", "Easy", 3, "Storytelling with Data", "Minimalist slide layout, strong fonts, high contrast"),
    ("comm_084", "Module 7", "Presentation Skills", "Visual Hierarchy", "🟠 High", "Medium", 3, "Storytelling with Data", "Directing the viewer's eye using font weight and size"),
    ("comm_085", "Module 7", "Presentation Skills", "Speaking with Slides", "🟠 High", "Medium", 4, "Talk Like TED", "Coordinating spoken points with visual slide changes"),
    ("comm_086", "Module 7", "Presentation Skills", "Handling Questions", "🔥 Critical", "Hard", 5, "The Pyramid Principle", "Responding to unexpected queries during stakeholder sessions"),
    ("comm_087", "Module 7", "Presentation Skills", "Presentation Confidence", "🟠 High", "Medium", 3, "Talk Like TED", "Maintaining vocal pacing and posture during slide runs"),
    ("comm_088", "Module 7", "Presentation Skills", "Timing", "🟠 High", "Easy", 3, "Talk Like TED", "Keeping presentations strictly within allocated slots"),
    ("comm_089", "Module 7", "Presentation Skills", "Presentation Story Flow", "🟠 High", "Medium", 4, "Storytelling with Data", "Ensuring smooth logical connections between slides"),
    ("comm_090", "Module 7", "Presentation Skills", "Projects: Present SQL Project", "🟠 High", "Medium", 4, "Talk Like TED", "Create a 5-slide deck detailing an eCommerce database audit"),
    ("comm_091", "Module 7", "Presentation Skills", "Projects: Present Python Project", "🟠 High", "Medium", 4, "Talk Like TED", "Create a slide deck explaining a CLI automation library"),
    ("comm_092", "Module 7", "Presentation Skills", "Projects: Present Machine Learning Project", "🟠 High", "Hard", 5, "Talk Like TED", "Create a deck detailing a customer churn classifier pipeline"),
    ("comm_093", "Module 7", "Presentation Skills", "Projects: Present Kaggle Project", "🟠 High", "Medium", 4, "Talk Like TED", "Create a deck explaining exploratory data analysis on Kaggle datasets"),

    # Module 8 - Personal Brand
    ("comm_094", "Module 8", "Personal Brand", "LinkedIn Profile", "🟠 High", "Easy", 2, "LinkedIn", "Write a clear headline and summary reflecting analytics skills"),
    ("comm_095", "Module 8", "Personal Brand", "GitHub Profile", "🟠 High", "Easy", 2, "GitHub Docs", "Create a profile README listing active tech stacks and projects"),
    ("comm_096", "Module 8", "Personal Brand", "Portfolio Website", "🟡 Medium", "Medium", 3, "GitHub Docs", "Deploy a static portfolio website showing key projects"),
    ("comm_097", "Module 8", "Personal Brand", "Resume Communication", "🔥 Critical", "Medium", 5, "HBR Guide to Better Business Writing", "Writing resumes emphasizing data impact and dollar outcomes"),
    ("comm_098", "Module 8", "Personal Brand", "Networking", "🟡 Medium", "Medium", 1, "LinkedIn", "Connecting with recruiters and analytical leaders"),
    ("comm_099", "Module 8", "Personal Brand", "Writing Technical Posts", "🟡 Medium", "Medium", 3, "LinkedIn", "Drafting LinkedIn or Medium articles about code findings"),
    ("comm_100", "Module 8", "Personal Brand", "Building Authority", "🟡 Medium", "Hard", 3, "LinkedIn", "Publishing consistent, helpful comments on data forums"),
    ("comm_101", "Module 8", "Personal Brand", "Career Positioning", "🟡 Medium", "Medium", 2, "LinkedIn", "Positioning yourself as a domain-expert data scientist"),
    ("comm_102", "Module 8", "Personal Brand", "Professional Online Presence", "🟡 Medium", "Easy", 2, "LinkedIn", "Standardizing usernames, bios, and links across profiles"),
]

# Generate tasks string representation matching JS object
js_tasks_list = []
for t in tasks_data:
    js_t = f"""    {{
      id: "{t[0]}",
      domain: "communication",
      module: "{t[1]}",
      submodule: "{t[2]}",
      task: "{t[3]}",
      priority: "{t[4]}",
      difficulty: "{t[5]}",
      weight: {t[6]},
      status: "⬜ Not Started",
      mastery: "⚪ Beginner",
      resource: "{t[7]}",
      question: "",
      notes: "{t[8]}",
      completedOn: "",
      favorite: false,
      bookmarked: false,
      reviseLater: false
    }}"""
    js_tasks_list.append(js_t)
tasks_str = ",\n".join(js_tasks_list)

# Resources list
resources_data = [
  ("Storytelling with Data — Cole Nussbaumer Knaflic", "Cole Nussbaumer Knaflic", "Book", "Learn charts, visual hierarchy, decluttering", "Medium", "🔥 Critical", "Chapters 1-6, 8, 9", "None", "Industry standard for analytical presentation"),
  ("HBR Guide to Better Business Writing — Bryan A. Garner", "Bryan A. Garner", "Book", "Business vocabulary, tone, clear sentence structure", "Easy", "🟠 High", "Chapters 1-12, 15, 20", "Chapters 26-28", "Essential guide for emails, reports, and escalations"),
  ("The Pyramid Principle — Barbara Minto", "Barbara Minto", "Book", "Structured thinking, Minto pyramid rules", "Hard", "🔥 Critical", "Chapters 1-5", "Chapters 6-9", "Core framework for executive presentations and case study solving"),
  ("Talk Like TED — Carmine Gallo", "Carmine Gallo", "Book", "Professional speaking, presentation structure", "Medium", "🟠 High", "Chapters 1-3, 5, 8", "None", "Practical guidelines for body language, vocal pacing, and confidence"),
  ("Docs for Developers", "Jared Bhatti", "Book", "Technical writing, README files, API docs", "Medium", "🔥 Critical", "Chapters 1-6", "Chapters 8, 10", "Overhauling repo documentation"),
  ("Harvard Business Review", "Harvard Business Publishing", "Website", "Business communication, feedback models", "Easy", "🟠 High", "Articles on SBI feedback, escalation, business updates", "None", "Review weekly updates"),
  ("GitHub Docs", "GitHub", "Website", "Markdown formatting, repo README guidelines", "Easy", "🟠 High", "Markdown specs, repository layout pages", "None", "Check formatting guides"),
  ("Microsoft Writing Style Guide", "Microsoft", "Website", "Clear, concise technical voice definition", "Medium", "🟠 High", "Voice, tone, and grammar standards pages", "None", "Use for technical reports alignment"),
  ("Google Technical Writing", "Google", "Website", "Writing documentation, code comments, notes", "Medium", "🔥 Critical", "Technical Writing One and Two short courses", "None", "Mandatory foundation for data engineering logs"),
  ("Toastmasters", "Toastmasters International", "Platform", "Speaking, reducing filler words, confidence", "Medium", "🟡 Medium", "Table Topics and Icebreaker speeches", "None", "Practice pitches in local clubs"),
  ("LinkedIn", "Microsoft", "Platform", "Personal brand, technical posts", "Easy", "🟠 High", "Profiles updates, networking guidelines", "None", "Target weekly updates postings"),
  ("GitHub", "Microsoft", "Platform", "Code documentation, portfolios repository", "Easy", "🟠 High", "Profile README construction", "None", "Source repositories"),
  ("Kaggle", "Google", "Platform", "Publish notebook narratives, share models", "Medium", "🟡 Medium", "Kaggle Discussions and Notebook Markdown sections", "None", "Share markdown pipelines")
]

js_resources_list = []
for idx, r in enumerate(resources_data):
    js_r = f"""    {{
      id: "r_comm_{idx}",
      domain: "communication",
      name: "{r[0]}",
      author: "{r[1]}",
      type: "{r[2]}",
      purpose: "{r[3]}",
      difficulty: "{r[4]}",
      priority: "{r[5]}",
      progress: 0,
      recommended: "{r[6]}",
      skip: "{r[7]}",
      notes: "{r[8]}"
    }}"""
    js_resources_list.append(js_r)
resources_str = ",\n".join(js_resources_list)

# Projects list
projects_data = [
    ("Professional README", "Create an industry-grade project README explaining data engineering pipeline setup.", "README.md file containing install, setup, design assumptions, and KPI definitions.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Technical Writing", "Information hierarchy, installation documentation", "Markdown", "Ecommerce sales data"),
    ("Portfolio Documentation", "Compile a unified GitHub repository displaying clean scripts and data architectures.", "Repository hierarchy structure, markdown pages linking to SQL/Python projects.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Technical Writing", "Code organization, architecture summary", "Markdown", "Syllabus projects"),
    ("Technical Blog", "Write an analytics-focused article summarizing insights from a Kaggle dataset.", "Medium or LinkedIn article covering SQL query optimizations and results.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Personal Brand", "Technical blogging, audience interest", "Markdown", "Kaggle metrics"),
    ("Dashboard Presentation", "Design a 5-slide deck presenting dashboard KPIs to the CEO.", "Slide deck targeting conversion, CAC, and ROI metrics with visual summaries.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Storytelling", "Visual hierarchy, executive summary", "PowerPoint", "Funnel metrics"),
    ("Business Case Presentation", "Prepare a recommendation slide deck explaining root cause analyses of server crashes.", "Slide deck utilizing Minto Pyramid principles for actionable suggestions.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Storytelling", "MECE issue trees, strategic advice", "PowerPoint", "Server log charts"),
    ("Machine Learning Presentation", "Draft an executive summary deck explaining churn model savings to VPs.", "Presentation deck translating model precision/recall to cost avoidance figures.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Storytelling", "Cost-benefit metrics, model communication", "PowerPoint", "Churn test results"),
    ("Mock Interview Portfolio", "Record video answers to core behavioral questions using the STAR framework.", "Video links and transcripts addressing project difficulties and conflicts.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Interview Lab", "STAR framework, professional speaking", "Video recorder", "Personal profile"),
    ("GitHub Profile Improvement", "Optimize the personal GitHub profile to showcase code contributions.", "Profile README listing active tech stacks, project directories, and contact info.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Personal Brand", "Portfolio architecture, markdown headers", "Markdown", "Personal repos"),
    ("LinkedIn Optimization", "Restructure the LinkedIn profile to highlight data scientist credentials.", "Updated headline, summary section, and project descriptions.", "Pending", "Yes", "Yes", "Yes", "Not Started", "Personal Brand", "Resume writing, online branding", "LinkedIn features", "Career achievements")
]

js_projects_list = []
for idx, p in enumerate(projects_data):
    js_p = f"""    {{
      id: "p_comm_{idx}",
      domain: "communication",
      name: "{p[0]}",
      category: "{p[8]}",
      concepts: "{p[9]}",
      libraries: "{p[10]}",
      dataset: "{p[11]}",
      github: "{p[3]}",
      doc: "{p[4]}",
      resume: "{p[5]}",
      portfolio: "{p[6]}",
      status: "{p[7]}",
      notes: "{p[1]}",
      deliverables: "{p[2]}"
    }}"""
    js_projects_list.append(js_p)
projects_str = ",\n".join(js_projects_list)

# Revision Engine list
revisions_data = [
    "Professional Vocabulary",
    "Project Explanation",
    "Interview Answers",
    "Storytelling",
    "Presentation Skills",
    "Documentation",
    "Business Writing"
]

js_revisions_list = []
for idx, rev in enumerate(revisions_data):
    js_rev = f"""    {{
      id: "rev_comm_{idx}",
      topic: "{rev}",
      lastDate: "2026-06-29",
      confidence: "🟡 Learning",
      nextDate: "2026-07-01",
      status: "Scheduled"
    }}"""
    js_revisions_list.append(js_rev)
revisions_str = ",\n".join(js_revisions_list)

# Interview rounds
interviews_data = [
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
]

js_interviews_list = []
for i in interviews_data:
    js_i = f"""    {{
      id: "{i['id']}",
      company: "{i['company']}",
      role: "{i['role']}",
      round: "{i['round']}",
      date: "{i['date']}",
      questions: "{i['questions']}",
      performance: {i['performance']},
      weakAreas: "{i['weakAreas']}",
      outcome: "{i['outcome']}",
      followUp: "{i['followUp']}"
    }}"""
    js_interviews_list.append(js_i)
interviews_str = ",\n".join(js_interviews_list)

# --- 2. READING AND INTEGRATING INTO DATA.JS ---

print("Reading data.js file content...")
with open(DATA_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# A. Replace communication domain placeholder
content = content.replace(old_comm_domain, new_comm_domain)

# B. Insert tasks right after the statistics revision task (line 117 or similar)
# We find where tasks array ends or we can search for the stats task
stats_task = '{ id: "t_stat_0", domain: "statistics", module: "Module 1", submodule: "Foundations", task: "Introduction to Statistics & Descriptive Stats", priority: "High", difficulty: "Easy", estHours: 4.0, actHours: 0.0, status: "Not Started", mastery: "⚪ Beginner", resource: "Core Textbook Reference", notes: "Basic concepts, mean, median, standard deviation", deps: "", compDate: "" }'
tasks_insertion_point = stats_task

new_tasks_block = stats_task + ",\n\n    // --- PROFESSIONAL COMMUNICATION & BUSINESS INFLUENCE --- \n" + tasks_str
content = content.replace(stats_task, new_tasks_block)

# C. Insert resources right after the last python resource (r_10)
r_10_block = '{ id: "r_10", domain: "python", name: "Codewars", author: "Codewars", type: "Website", purpose: "Code execution katas", difficulty: "Medium", priority: "Medium", progress: 0 }'
new_resources_block = r_10_block + ",\n\n    // --- COMMUNICATION RESOURCES --- \n" + resources_str
content = content.replace(r_10_block, new_resources_block)

# D. Insert projects right after last python project (p_py_9)
p_9_block = '{ id: "p_py_9", domain: "python", name: "End-to-End Data Science Project", category: "Capstone", concepts: "Complete pipelines, pytest, packaging", libraries: "pandas, scikit-learn, pytest, streamlit", dataset: "Real-world business dataset", github: "Pending", doc: "Yes", resume: "Yes", status: "Not Started" }'
new_projects_block = p_9_block + ",\n\n    // --- COMMUNICATION PROJECTS --- \n" + projects_str
content = content.replace(p_9_block, new_projects_block)

# E. Insert revision topics right after the first revision topic (r_rev_0)
rev_0_block = '{ id: "r_rev_0", topic: "Recursive CTEs", lastDate: "2026-06-15", confidence: "🟡 Learning", nextDate: "2026-06-29", status: "Scheduled" }'
new_revisions_block = rev_0_block + ",\n\n    // --- COMMUNICATION REVISION TOPICS --- \n" + revisions_str
content = content.replace(rev_0_block, new_revisions_block)

# F. Insert interview logs right after first interview log (i_0)
i_0_block = '{ id: "i_0", company: "Google", role: "Data Scientist", round: "Technical Ingestion/SQL Screen", date: "2026-06-20", questions: "Pivot aggregations, Gaps and Islands window queries, running totals under partitions.", performance: 4, weakAreas: "Optimizing window bounds using RANGE frames", outcome: "Passed", followUp: "Read Window Frame specifications" }'
new_interviews_block = i_0_block + ",\n\n    // --- COMMUNICATION INTERVIEW ROUNDS --- \n" + interviews_str
content = content.replace(i_0_block, new_interviews_block)

# --- 3. WRITING COMPLETED FILE ---
print("Writing updated content to data.js...")
with open(DATA_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("[+] Integration complete. All 102 tasks, 14 resources, 9 projects, revision tracks, and interview cases successfully injected.")
