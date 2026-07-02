const fs = require('fs');

const DATA_PATH = 'data.js';

function getMiniProjectName(title) {
  const t = title.toLowerCase();
  if (t.includes('decorator')) return 'Function Execution Logger';
  if (t.includes('oop') || t.includes('class')) return 'School Library Manager';
  if (t.includes('window')) return 'eCommerce Sales Leaderboard';
  if (t.includes('pandas') || t.includes('merge')) return 'Transactional Data Aggregator';
  if (t.includes('cte') || t.includes('recursive')) return 'Employee Hierarchy Traversal';
  if (t.includes('index') || t.includes('optimiz')) return 'Slow Query Profiler';
  if (t.includes('star')) return 'Mock Interview Pitch Builder';
  if (t.includes('storytelling')) return 'Data KPI Slide Deck';
  if (t.includes('cohort') || t.includes('retention')) return 'SaaS Churn Curve Model';
  return `${title} Prototype App`;
}

function getReflectiveQuestion(title) {
  const t = title.toLowerCase();
  if (t.includes('decorator')) return 'When would you NOT use decorators in Python?';
  if (t.includes('window')) return 'Why is RANK() different from DENSE_RANK() in database results?';
  if (t.includes('oop') || t.includes('class')) return 'When should I prefer Composition over Class Inheritance?';
  if (t.includes('index')) return 'Why can having too many indexes slow down database writes?';
  if (t.includes('cte')) return 'When is a CTE better than a Subquery or Temporary Table?';
  if (t.includes('star')) return 'How do you keep a STAR method response under 2 minutes without omitting results?';
  return `What is the key scaling or performance bottleneck when applying ${title}?`;
}

function getCompanyCases(title, domain) {
  const t = title.toLowerCase();
  if (domain === 'sql') {
    return [
      { company: 'Netflix', application: 'Uses Window functions to analyze temporal user streaming cohorts.' },
      { company: 'Airbnb', application: 'Uses composite indexing to optimize geographic listing searches.' }
    ];
  } else if (domain === 'python') {
    return [
      { company: 'Spotify', application: 'Uses decorator functions to wrap API rate limits and logs.' },
      { company: 'Dropbox', application: 'Uses custom OOP hierarchies in sync engine microservices.' }
    ];
  } else {
    return [
      { company: 'Google', application: 'Uses structural writing protocols for API documentation alignment.' },
      { company: 'Uber', application: 'Uses elevator pitch introduces for stakeholder alignment.' }
    ];
  }
}

function getInterviewQuestions(title) {
  return [
    { question: `Explain the fundamental concept of ${title} in a business context.`, difficulty: '🟢 Easy', answered: false },
    { question: `How would you troubleshoot or optimize a failure/slowdown when using ${title}?`, difficulty: '🟡 Medium', answered: false },
    { question: `Describe a scenario where you applied ${title} to solve a complex engineering or analytical challenge.`, difficulty: '🔴 Hard', answered: false }
  ];
}

function migrate() {
  console.log("Reading data.js...");
  let text = fs.readFileSync(DATA_PATH, 'utf8');

  // Convert const DEFAULT_DATA = to global.DEFAULT_DATA =
  let loadText = text.replace('const DEFAULT_DATA =', 'global.DEFAULT_DATA =');
  eval(loadText);

  const data = global.DEFAULT_DATA;
  console.log(`[+] Loaded ${data.tasks.length} tasks from data.js.`);

  // Map tasks to Learning Units
  const learningUnits = data.tasks.map(t => {
    const isComp = t.status === 'Completed' || t.status.includes('Completed');
    
    // Auto outcomes based on title
    const outcomes = [
      `✓ Implement ${t.title || t.task} correctly in production environments`,
      `✓ Answer key technical interview questions regarding ${t.title || t.task}`
    ];
    
    // Auto prerequisites based on module
    const prerequisites = [];
    if (t.module.includes('1') || t.module.includes('2')) {
      prerequisites.push('Module 0 Basics');
    }
    
    const mapped = {
      id: t.id,
      domain: t.domain,
      module: t.module,
      submodule: t.submodule,
      title: t.title || t.task,
      learningType: t.learningType || '📖 Read',
      priority: t.priority || '🟠 High',
      difficulty: t.difficulty || '🟡 Medium',
      status: isComp ? 'Completed' : (t.status || 'Not Started'),
      learningObjective: `Develop complete theoretical and practical mastery over ${t.title || t.task}.`,
      prerequisites: prerequisites,
      outcomes: outcomes,
      weight: t.weight || 1,
      interviewFrequency: t.interviewFrequency || '★★★',
      learningStages: {
        learn: isComp,
        watch: isComp,
        practice: isComp,
        project: isComp,
        industry: isComp,
        interview: isComp,
        reflection: isComp,
        revision: isComp
      },
      resources: {
        book: t.resource || 'Recommended Textbook Chapter',
        course: 'Domain Master Course Video',
        youtube: 'Curated YouTube playlist references',
        docs: 'Official Language / Tool Documentation'
      },
      miniProjects: {
        name: getMiniProjectName(t.title || t.task),
        status: isComp ? 'Completed' : 'Not Started'
      },
      industryExamples: getCompanyCases(t.title || t.task, t.domain),
      interviewQuestions: getInterviewQuestions(t.title || t.task).map(q => ({
        ...q,
        answered: isComp
      })),
      reflection: {
        question: getReflectiveQuestion(t.title || t.task),
        answer: isComp ? 'Completed reflection during initial study session.' : ''
      },
      revision: {
        interval: 2,
        lastDate: t.completedOn || '',
        nextDate: t.completedOn ? new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0] : '',
        confidence: isComp ? '🟢 Confident' : '⚪ Beginner'
      },
      mastery: t.mastery || '⚪ Beginner'
    };

    return mapped;
  });

  // Re-serialize data.js
  data.tasks = learningUnits;
  
  const outputText = `const DEFAULT_DATA = ${JSON.stringify(data, null, 2)};\n\nif (typeof module !== 'undefined') {\n  module.exports = DEFAULT_DATA;\n}`;
  fs.writeFileSync(DATA_PATH, outputText, 'utf8');
  console.log("[+] Database successfully upgraded to Learning Units!");
}

migrate();
