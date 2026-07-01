import re

JS_PATH = r"D:\DSOS\app.js"

# --- 1. DEFINE UPGRADED JS BLOCKS ---

# Helper Calculations Block
helpers_block = """// --- STATE MANAGEMENT ---
let state = {};

// --- UPGRADED LEARNING OS CALCULATORS ---
function calculateDomainStats(domainId) {
  const domainTasks = state.tasks.filter(t => t.domain === domainId);
  const totalTasks = domainTasks.length;
  
  let weightedProgress = 0;
  let masteryScore = 0;
  let revisionScore = 100;
  let interviewReadyCount = 0;
  let completedCount = 0;
  
  let totalWeight = 0;
  let completedWeight = 0;
  let totalXp = 0;
  
  const masteryMap = {
    "⚪ Beginner": 10,
    "🟡 Learning": 30,
    "🔵 Practicing": 50,
    "🟢 Confident": 75,
    "⭐ Interview Ready": 90,
    "👑 Master": 100
  };
  
  if (totalTasks > 0) {
    let totalMasterySum = 0;
    domainTasks.forEach(t => {
      const isCompleted = t.status === "Completed" || t.status.includes("Completed");
      const w = t.weight || 1;
      totalWeight += w;
      
      if (isCompleted) {
        completedWeight += w;
        completedCount++;
        
        let xpReward = 10; // Easy
        if (t.difficulty.includes("Hard") || t.difficulty.includes("🔴")) xpReward = 35;
        else if (t.difficulty.includes("Medium") || t.difficulty.includes("🟡")) xpReward = 20;
        totalXp += xpReward;
      }
      
      const mKey = Object.keys(masteryMap).find(k => k.includes(t.mastery) || t.mastery.includes(k)) || "⚪ Beginner";
      totalMasterySum += masteryMap[mKey];
      
      if (t.mastery.includes("Ready") || t.mastery.includes("Master") || t.mastery.includes("⭐") || t.mastery.includes("👑")) {
        interviewReadyCount++;
      }
    });
    
    weightedProgress = totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0;
    masteryScore = totalMasterySum / totalTasks;
  }
  
  // Revision Overdue Score
  const domainRevisions = state.revisions.filter(r => {
    const matchingTask = state.tasks.find(t => t.title === r.topic || t.task === r.topic);
    return matchingTask && matchingTask.domain === domainId;
  });
  
  if (domainRevisions.length > 0) {
    const todayStr = new Date().toISOString().split('T')[0];
    const overdueRevisions = domainRevisions.filter(r => new Date(r.nextDate) < new Date(todayStr));
    revisionScore = Math.max(0, 100 - (overdueRevisions.length / domainRevisions.length) * 100);
  }
  
  // Learning Score = 40% Weighted Completion + 40% Mastery + 20% Revision
  const learningScore = Math.round(0.4 * weightedProgress + 0.4 * masteryScore + 0.2 * revisionScore);
  
  // Projects completed
  const domainProjects = state.projects.filter(p => p.domain === domainId);
  const completedProjects = domainProjects.filter(p => p.status === "Completed");
  completedProjects.forEach(p => {
    totalXp += p.category.includes("Capstone") ? 300 : 100;
  });
  
  // Badges lists
  const badges = [];
  if (domainId === "sql" && completedCount >= 5) badges.push("SQL Apprentice");
  if (domainId === "python" && completedCount >= 5) badges.push("Python Professional");
  if (domainId === "python" && domainTasks.filter(t => t.module.includes("Module 1") && (t.status === "Completed" || t.status.includes("Completed"))).length >= 3) badges.push("OOP Master");
  if (domainId === "communication" && domainTasks.filter(t => t.module.includes("Module 3") && (t.status === "Completed" || t.status.includes("Completed"))).length >= 3) badges.push("Storytelling Expert");
  if (completedProjects.length >= 3) badges.push("Portfolio Builder");
  if (domainTasks.filter(t => t.learningType && t.learningType.includes("Practice") && (t.status === "Completed" || t.status.includes("Completed"))).length >= 10) badges.push("100 Interview Questions");
  if (state.streak >= 30) badges.push("30-Day Streak");
  
  return {
    learningScore,
    totalXp,
    weightedProgress: Math.round(weightedProgress),
    masteryScore: Math.round(masteryScore),
    revisionScore: Math.round(revisionScore),
    interviewReadyCount,
    totalTasksCount: totalTasks,
    completedTasksCount: completedCount,
    completedProjectsCount: completedProjects.length,
    portfolioReadyCount: completedProjects.filter(p => p.portfolioReady === true || p.portfolioReady === "true" || p.portfolio === "Yes").length,
    badges
  };
}

function generateDailyMission() {
  const activeTasks = state.tasks.filter(t => t.domain === state.activeDomain && t.status !== "Completed");
  const missions = [];
  
  const activeTask = activeTasks.find(t => t.status === "Learning" || t.status === "Practicing") || activeTasks[0];
  if (activeTask) {
    missions.push(`🎯 Practice: ${activeTask.title} (${activeTask.module})`);
  } else {
    missions.push(`🎯 Practice: Select an active topic in the Task List to begin!`);
  }
  
  const domainRevisions = state.revisions.filter(r => {
    const matchingTask = state.tasks.find(t => t.title === r.topic || t.task === r.topic);
    return matchingTask && matchingTask.domain === state.activeDomain;
  });
  const todayStr = new Date().toISOString().split('T')[0];
  const overdueRev = domainRevisions.find(r => new Date(r.nextDate) <= new Date(todayStr));
  if (overdueRev) {
    missions.push(`🔄 Revise: ${overdueRev.topic} (Overdue)`);
  } else {
    missions.push(`🔄 Revise: Revision queue is clean! Great job.`);
  }
  
  const solveTask = activeTasks.find(t => t.learningType && t.learningType.includes("Practice"));
  if (solveTask) {
    missions.push(`💻 Solve: Coding challenge - ${solveTask.title}`);
  } else {
    missions.push(`💻 Solve: No pending LeetCode challenges in this module.`);
  }
  
  const docTask = activeTasks.find(t => t.learningType && t.learningType.includes("Documentation"));
  if (docTask) {
    missions.push(`📚 Document: Complete details for ${docTask.title}`);
  } else {
    missions.push(`📚 Document: All module documentation is up to date.`);
  }
  
  return {
    missions,
    estimatedTime: "2h 30m"
  };
}

function renderModuleResourcePanel() {
  const domainRes = state.resources.filter(r => r.domain === state.activeDomain);
  
  const book = domainRes.find(r => r.category === "Book" && r.type === "Primary") || domainRes.find(r => r.category === "Book");
  const course = domainRes.find(r => r.category === "Course" && r.type === "Primary") || domainRes.find(r => r.category === "Course");
  const youtube = domainRes.find(r => r.category === "YouTube" && r.type === "Primary") || domainRes.find(r => r.category === "YouTube");
  const docs = domainRes.find(r => r.category === "Documentation");
  const platform = domainRes.find(r => r.category === "Practice");
  
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="glass-card p-4 rounded-xl border border-brand-border flex flex-col justify-between">
        <div class="text-[9px] uppercase font-bold text-gray-500 mb-1.5"><i class="fas fa-book mr-1 text-brand-blue"></i>Primary Book</div>
        <div class="text-xs font-bold text-white mb-1 truncate" title="${book ? book.title : 'None Linked'}">${book ? book.title : 'None Linked'}</div>
        <div class="text-[10px] text-gray-400 truncate">${book ? book.provider : 'N/A'}</div>
      </div>
      <div class="glass-card p-4 rounded-xl border border-brand-border flex flex-col justify-between">
        <div class="text-[9px] uppercase font-bold text-gray-500 mb-1.5"><i class="fas fa-graduation-cap mr-1 text-brand-blue"></i>Best Course</div>
        <div class="text-xs font-bold text-white mb-1 truncate" title="${course ? course.title : 'None Linked'}">${course ? course.title : 'None Linked'}</div>
        <div class="text-[10px] text-gray-400 truncate">${course ? course.provider : 'N/A'}</div>
      </div>
      <div class="glass-card p-4 rounded-xl border border-brand-border flex flex-col justify-between">
        <div class="text-[9px] uppercase font-bold text-gray-500 mb-1.5"><i class="fab fa-youtube mr-1 text-brand-blue"></i>Best YouTube</div>
        <div class="text-xs font-bold text-white mb-1 truncate" title="${youtube ? youtube.title : 'None Linked'}">${youtube ? youtube.title : 'None Linked'}</div>
        <div class="text-[10px] text-gray-400 truncate">${youtube ? youtube.provider : 'N/A'}</div>
      </div>
      <div class="glass-card p-4 rounded-xl border border-brand-border flex flex-col justify-between">
        <div class="text-[9px] uppercase font-bold text-gray-500 mb-1.5"><i class="fas fa-file-code mr-1 text-brand-blue"></i>Documentation</div>
        <div class="text-xs font-bold text-white mb-1 truncate" title="${docs ? docs.title : 'None Linked'}">${docs ? docs.title : 'None Linked'}</div>
        <div class="text-[10px] text-gray-400 truncate">${docs ? docs.provider : 'N/A'}</div>
      </div>
      <div class="glass-card p-4 rounded-xl border border-brand-border flex flex-col justify-between">
        <div class="text-[9px] uppercase font-bold text-gray-500 mb-1.5"><i class="fas fa-keyboard mr-1 text-brand-blue"></i>Practice Platform</div>
        <div class="text-xs font-bold text-white mb-1 truncate" title="${platform ? platform.title : 'None Linked'}">${platform ? platform.title : 'None Linked'}</div>
        <div class="text-[10px] text-gray-400 truncate">${platform ? platform.provider : 'N/A'}</div>
      </div>
    </div>
  `;
}

function renderMasteryChecklistSection(moduleId) {
  if (!state.modules) return "";
  const moduleObj = state.modules.find(m => m.id === moduleId || m.title.includes(moduleId));
  if (!moduleObj || !moduleObj.masteryChecklist) return "";
  
  let listItems = "";
  moduleObj.masteryChecklist.forEach((item, idx) => {
    const cacheKey = `checklist_${moduleObj.id}_${idx}`;
    const isChecked = localStorage.getItem(cacheKey) === "true" ? "checked" : "";
    listItems += `
      <div class="flex items-center space-x-2.5 py-1.5">
        <input type="checkbox" ${isChecked} onchange="toggleChecklistItem('${moduleObj.id}', ${idx}, this.checked)" class="w-4.5 h-4.5 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        <span class="text-xs text-gray-300 font-medium">${item}</span>
      </div>
    `;
  });
  
  return `
    <div class="glass-card p-5 rounded-2xl mt-8">
      <h3 class="font-extrabold text-white text-sm tracking-tight font-['Outfit'] mb-3"><i class="fas fa-clipboard-check text-brand-blue mr-2"></i>Module Capability Checklist</h3>
      <p class="text-[10px] text-gray-400 mb-4">Complete of topics does not automatically guarantee mastery. Review and check your skills:</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
        ${listItems}
      </div>
    </div>
  `;
}

function toggleChecklistItem(moduleId, index, isChecked) {
  const cacheKey = `checklist_${moduleId}_${index}`;
  localStorage.setItem(cacheKey, isChecked);
}

function renderXpAndBadgesPanel(stats) {
  const level = 1 + Math.floor(stats.totalXp / 250);
  
  let badgesHtml = "";
  stats.badges.forEach(b => {
    badgesHtml += `
      <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 mr-2 mb-2" title="Badge Achieved">
        <i class="fas fa-medal mr-1"></i>${b}
      </span>
    `;
  });
  
  return `
    <div class="glass-card p-5 rounded-2xl flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 rounded-xl bg-brand-dark flex flex-col items-center justify-center border border-brand-border text-brand-blue">
          <span class="text-[9px] uppercase font-bold text-gray-500 leading-none">LVL</span>
          <span class="text-base font-extrabold leading-none mt-1 font-['Outfit']">${level}</span>
        </div>
        <div>
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Gamified Progress</div>
          <div class="text-sm font-extrabold text-white font-['Outfit']">${stats.totalXp} XP accumulated</div>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-end max-w-md">
        ${badgesHtml || '<span class="text-[10px] text-gray-500">No achievements unlocked yet.</span>'}
      </div>
    </div>
  `;
}

function linkify(text) {
  if (!text) return "N/A";
  const str = text.trim();
  if (str.startsWith("http://") || str.startsWith("https://")) {
    return `<a href="${str}" target="_blank" class="text-brand-blue hover:underline font-bold"><i class="fas fa-external-link-alt mr-1"></i>Link</a>`;
  }
  return text;
}

function toggleTaskCompletion(taskId, isChecked) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = isChecked ? "Completed" : "Not Started";
    task.mastery = isChecked ? "🟢 Confident" : "⚪ Beginner";
    task.completedOn = isChecked ? new Date().toISOString().split('T')[0] : "";
    saveState();
    renderApp();
  }
}

function addTopicToRevision(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    const topicName = task.title || task.task;
    const exists = state.revisions.some(r => r.topic.toLowerCase() === topicName.toLowerCase());
    if (exists) {
      alert(`"${topicName}" is already in your Revision Tracker queue.`);
      return;
    }
    state.revisions.push({
      id: "rev_" + Date.now(),
      topic: topicName,
      lastDate: new Date().toISOString().split('T')[0],
      confidence: "🟡 Learning",
      nextDate: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0]
    });
    saveState();
    alert(`Successfully added "${topicName}" to your Revision Tracker queue!`);
    renderApp();
  }
}

function init() {
  const stored = localStorage.getItem("dsos_data");
  if (stored) {
    try {
      state = JSON.parse(stored);
      if (!state.modules && typeof DEFAULT_DATA !== 'undefined' && DEFAULT_DATA.modules) {
        state.modules = DEFAULT_DATA.modules;
      }
    } catch (e) {
      console.error("Error parsing localStorage data, resetting...", e);
      state = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } else {
    state = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveState();
  }
  
  if (!state.activeTab) {
    state.activeTab = "dashboard";
  }
  
  renderApp();
}

function saveState() {
  localStorage.setItem("dsos_data", JSON.stringify(state));
}

function changeDomain(domainId) {
  state.activeDomain = domainId;
  if (domainId === "launcher") {
    state.activeTab = "dashboard";
  } else if (domainId === "master") {
    state.activeTab = "home";
  } else {
    state.activeTab = "dashboard";
  }
  saveState();
  renderApp();
}

function switchTab(tabId) {
  state.activeTab = tabId;
  saveState();
  renderApp();
}
"""

# New renderLauncher replacement
new_render_launcher = """function renderLauncher() {
  const grid = document.getElementById("launcher-domains-grid");
  document.getElementById("launcher-streak-val").innerHTML = `🔥 ${state.streak} Days`;
  
  let html = "";
  state.domains.forEach(d => {
    const stats = calculateDomainStats(d.id);
    const barsCount = Math.round(stats.weightedProgress / 10);
    const barText = "■".repeat(barsCount) + "□".repeat(10 - barsCount);
    const level = 1 + Math.floor(stats.totalXp / 250);
    
    html += `
      <div onclick="changeDomain('${d.id}')" class="glass-card p-6 rounded-2xl border border-brand-border hover:border-brand-blue/50 hover:bg-brand-dark/40 transition cursor-pointer group flex flex-col justify-between h-52 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-24 h-24 bg-brand-blue/5 rounded-full filter blur-xl group-hover:bg-brand-blue/10 transition"></div>
        
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center border border-brand-border text-brand-blue group-hover:scale-105 transition">
              <i class="${d.icon}"></i>
            </div>
            <span class="text-xs text-amber-500 font-bold bg-brand-dark px-2.5 py-1 rounded border border-brand-border">
              LVL ${level} (${stats.totalXp} XP)
            </span>
          </div>
          <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-1 group-hover:text-brand-blue transition">${d.name}</h3>
          <p class="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-3">${d.desc}</p>
        </div>
        
        <div class="border-t border-brand-border/60 pt-3">
          <div class="flex justify-between items-center text-xs mb-1.5">
            <span class="font-mono text-brand-blue tracking-wider">${barText}</span>
            <span class="font-bold text-white">Score: ${stats.learningScore}/100</span>
          </div>
          <div class="flex justify-between items-center text-[10px] text-gray-500 font-semibold uppercase">
            <span>Weighted Progress</span>
            <span class="text-gray-400">${stats.completedTasksCount} / ${stats.totalTasksCount} tasks done</span>
          </div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}"""

# New renderDomainDashboard replacement
new_render_domain_dashboard = """function renderDomainDashboard(container) {
  const activeObj = state.domains.find(d => d.id === state.activeDomain);
  const domainTasks = state.tasks.filter(t => t.domain === state.activeDomain);
  const stats = calculateDomainStats(state.activeDomain);
  
  // Find current active module
  let activeModuleTitle = "N/A";
  const firstActive = domainTasks.find(t => t.status === "Learning" || t.status === "Practicing");
  if (firstActive) {
    activeModuleTitle = firstActive.module;
  }
  
  const mission = generateDailyMission();
  let missionRows = "";
  mission.missions.forEach(m => {
    missionRows += `
      <div class="flex items-center space-x-2.5 py-2 border-b border-brand-border/40">
        <div class="w-2.5 h-2.5 rounded-full bg-brand-blue"></div>
        <span class="text-xs text-gray-300 font-medium">${m}</span>
      </div>
    `;
  });
  
  // High Priority Sprint list
  const sprintTasks = domainTasks.filter(t => t.priority.includes("Critical") && t.status !== "Completed").slice(0, 5);
  let sprintRows = "";
  if (sprintTasks.length === 0) {
    sprintRows = `<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500 font-medium">No critical sprint tasks in progress. Perfect!</td></tr>`;
  } else {
    sprintTasks.forEach(t => {
      sprintRows += `
        <tr class="hover:bg-brand-dark/20 transition duration-150">
          <td class="px-6 py-3.5 text-xs text-brand-blue font-bold tracking-tight">${t.module}</td>
          <td class="px-6 py-3.5 text-sm text-white font-medium">${t.title}</td>
          <td class="px-6 py-3.5 text-xs"><span class="px-2 py-0.5 rounded font-bold bg-rose-500/10 text-rose-500">${t.priority}</span></td>
          <td class="px-6 py-3.5 text-xs text-gray-400 font-semibold">${t.difficulty}</td>
          <td class="px-6 py-3.5 text-xs font-semibold text-gray-300">${t.interviewFrequency}</td>
        </tr>
      `;
    });
  }
  
  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      <!-- Title header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">${activeObj ? activeObj.name : "Domain"} Learning OS</h2>
          <p class="text-gray-400 text-xs mt-1 font-medium">Domain learning metrics, active daily missions, and progress gamification details.</p>
        </div>
        <button onclick="exitToLauncher()" class="text-xs font-bold text-gray-400 hover:text-white bg-brand-dark px-3 py-1.5 rounded-lg border border-brand-border transition"><i class="fas fa-arrow-left mr-1.5"></i>Back to Launcher</button>
      </div>
      
      <!-- Level and Badges gamification panel -->
      ${renderXpAndBadgesPanel(stats)}
      
      <!-- KPI Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Learning Score</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${stats.learningScore} / 100</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-check-circle mr-1 text-brand-blue"></i>Weighted: ${stats.weightedProgress}% done</p>
        </div>
        <div class="glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Interview Readiness</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${stats.interviewReadyCount} / ${stats.totalTasksCount}</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-star mr-1 text-amber-500"></i>Tasks rated Interview Ready/Master</p>
        </div>
        <div class="glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Projects Completed</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${stats.completedProjectsCount} Done</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-folder-open mr-1 text-brand-blue"></i>Portfolio Ready: ${stats.portfolioReadyCount}</p>
        </div>
        <div class="glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Books Finished</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${state.resources.filter(r => r.domain === state.activeDomain && r.category === "Book" && r.completed === true).length} Finished</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-book mr-1 text-brand-blue"></i>Resources in progress</p>
        </div>
      </div>
      
      <!-- Daily Mission & Current Sprint -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Daily Mission Card -->
        <div class="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-1"><i class="fas fa-bullseye text-brand-blue mr-2"></i>Today's Mission</h3>
            <p class="text-[10px] text-gray-500 font-medium mb-4">Estimated completion time: ${mission.estimatedTime}</p>
            <div class="space-y-1.5">
              ${missionRows}
            </div>
          </div>
          <button onclick="switchTab('tasks')" class="w-full bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold py-2.5 rounded-lg transition mt-6 shadow-lg shadow-brand-blue/20">
            Work on Tasks
          </button>
        </div>
        
        <!-- Sprint Focus Card -->
        <div class="glass-card p-6 rounded-2xl lg:col-span-2">
          <div class="flex justify-between items-center mb-5">
            <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit']"><i class="fas fa-bolt text-brand-blue mr-2"></i>Current Mission Sprint</h3>
            <button onclick="switchTab('tasks')" class="text-xs text-brand-blue hover:text-white transition font-semibold">View Task Manager</button>
          </div>
          <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-brand-border bg-brand-navy/60">
                  <th class="px-6 py-2.5 text-xs text-gray-400 font-bold uppercase">Module</th>
                  <th class="px-6 py-2.5 text-xs text-gray-400 font-bold uppercase">Topic</th>
                  <th class="px-6 py-2.5 text-xs text-gray-400 font-bold uppercase">Priority</th>
                  <th class="px-6 py-2.5 text-xs text-gray-400 font-bold uppercase">Diff</th>
                  <th class="px-6 py-2.5 text-xs text-gray-400 font-bold uppercase">Frequency</th>
                </tr>
              </thead>
              <tbody>
                ${sprintRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Automatic Resource Reference Panel -->
      <div class="space-y-3">
        <h3 class="font-extrabold text-white text-sm tracking-tight font-['Outfit']"><i class="fas fa-bookmark text-brand-blue mr-2"></i>Module Resources Panel</h3>
        ${renderModuleResourcePanel()}
      </div>
    </div>
  `;
}"""

# New renderDomainTasks replacement
new_render_domain_tasks = """function renderDomainTasks(container) {
  const domainTasks = state.tasks.filter(t => t.domain === state.activeDomain);
  
  // Sort completed tasks to the bottom of the list
  const sortedTasks = [...domainTasks].sort((a, b) => {
    const aComp = (a.status === "Completed" || a.status.includes("Completed")) ? 1 : 0;
    const bComp = (b.status === "Completed" || b.status.includes("Completed")) ? 1 : 0;
    return aComp - bComp;
  });
  
  let rows = "";
  sortedTasks.forEach(t => {
    const isCompleted = t.status === "Completed" || t.status.includes("Completed");
    const isChecked = isCompleted ? "checked" : "";
    
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleTaskCompletion('${t.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-xs font-bold text-brand-blue">${t.module}</td>
        <td class="px-4 py-3 text-sm text-white font-medium max-w-xs truncate" title="${t.title}">${t.title}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${t.learningType || '📖 Read'}</td>
        <td class="px-4 py-3 text-xs text-gray-300 max-w-xs truncate" title="${t.resource || ''}">${linkify(t.resource)}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-semibold max-w-xs truncate" title="${t.practice || ''}">${linkify(t.practice)}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded font-bold ${t.priority.includes('Critical') ? 'bg-rose-500/10 text-rose-500' : 'bg-gray-700/30 text-gray-400'}">${t.priority}</span></td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${t.difficulty}</td>
        <td class="px-4 py-3 text-xs font-mono text-gray-400 font-bold text-center">${t.weight || 1}</td>
        <td class="px-4 py-3 text-center">
          <button onclick="addTopicToRevision('${t.id}')" class="bg-brand-navy border border-brand-border hover:border-brand-blue/50 text-gray-400 hover:text-brand-blue text-[10px] font-bold px-2 py-1 rounded transition" title="Schedule spaced repetition revision">
            <i class="fas fa-history mr-1"></i>Revise Later
          </button>
        </td>
        <td class="px-4 py-3 text-xs text-right">
          <button onclick="editTaskModal('${t.id}')" class="text-brand-blue hover:text-white transition mr-2.5"><i class="fas fa-edit"></i></button>
          <button onclick="deleteTask('${t.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  // Find current active module to render capability checklist
  let activeModuleId = "mod_sql_0";
  const firstActive = domainTasks.find(t => t.status === "Learning" || t.status === "Practicing");
  if (firstActive) {
    activeModuleId = firstActive.module;
  }
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Syllabus Task Manager</h2>
          <p class="text-gray-400 text-xs mt-1">Check off topics as you finish them, and queue them for spaced repetition revision.</p>
        </div>
        <button onclick="addTaskModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Add Task
        </button>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-24">Module</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Topic</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Type</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Study Resources</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Practice Question</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-16">Priority</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-16">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Weight</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-28">Revise later</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="11" class="px-6 py-4 text-center text-sm text-gray-500 font-medium">No tasks found. Click Add Task to register one!</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Render Mastery Capability Checklist -->
      ${renderMasteryChecklistSection(activeModuleId)}
    </div>
  `;
}"""

# New renderDomainResources replacement
new_render_domain_resources = """function renderDomainResources(container) {
  const domainRes = state.resources.filter(r => r.domain === state.activeDomain);
  
  const books = domainRes.filter(r => r.category === 'Book');
  const websites = domainRes.filter(r => r.category === 'Documentation' || r.category === 'Article' || r.category === 'Research Paper');
  const platforms = domainRes.filter(r => r.category === 'Practice' || r.category === 'Course' || r.category === 'YouTube');
  
  let booksRows = "";
  books.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    booksRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.title}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500">${r.priority}</span></td>
        <td class="px-4 py-3 text-xs text-gray-300 font-medium">${r.chapters || "All"}</td>
        <td class="px-4 py-3 text-xs text-gray-500 font-medium">${r.skip || "None"}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
        <td class="px-4 py-3 text-xs text-right">
          <button onclick="editResourceModal('${r.id}')" class="text-brand-blue hover:text-white transition mr-2"><i class="fas fa-edit"></i></button>
          <button onclick="deleteResource('${r.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });

  let webRows = "";
  websites.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    webRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.title}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider || 'N/A'}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500">${r.priority}</span></td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.purpose || ''}">${r.purpose || 'N/A'}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
        <td class="px-4 py-3 text-xs text-right">
          <button onclick="editResourceModal('${r.id}')" class="text-brand-blue hover:text-white transition mr-2"><i class="fas fa-edit"></i></button>
          <button onclick="deleteResource('${r.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });

  let platRows = "";
  platforms.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    platRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.title}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider || 'N/A'}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500">${r.priority}</span></td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.purpose || ''}">${r.purpose || 'N/A'}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
        <td class="px-4 py-3 text-xs text-right">
          <button onclick="editResourceModal('${r.id}')" class="text-brand-blue hover:text-white transition mr-2"><i class="fas fa-edit"></i></button>
          <button onclick="deleteResource('${r.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Study Resources Library</h2>
          <p class="text-gray-400 text-xs mt-1">Check off resources as read or solved. Grouped by category.</p>
        </div>
        <button onclick="addResourceModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Add Resource
        </button>
      </div>

      <!-- Section 1: RECOMMENDED BOOKS -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-book text-brand-blue mr-2"></i>Recommended Books</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Book Title</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Priority</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Read Chapters</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Skip Chapters</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${booksRows || `<tr><td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">No books registered.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 2: WEBSITES & REFERENCE DOCS -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-globe text-brand-blue mr-2"></i>Websites & Reference Docs</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Resource Name</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author/Creator</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Priority</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Purpose</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${webRows || `<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">No websites registered.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: INTERACTIVE PRACTICE PLATFORMS -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-keyboard text-brand-blue mr-2"></i>Practice Platforms</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Platform Name</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author/Creator</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Priority</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Purpose</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${platRows || `<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">No practice platforms registered.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function toggleResource(resId, isChecked) {
  const res = state.resources.find(r => r.id === resId);
  if (res) {
    res.completed = isChecked;
    res.progress = isChecked ? 100 : 0;
    saveState();
    renderApp();
  }
}
"""

# New renderDomainRevisions replacement
new_render_domain_revisions = """function renderDomainRevisions(container) {
  let rows = "";
  // Find matching tasks in active domain
  const activeTasks = state.tasks.filter(t => t.domain === state.activeDomain);
  
  const domainRevisions = state.revisions.filter(r => {
    return activeTasks.some(t => t.title === r.topic || t.task === r.topic);
  });
  
  domainRevisions.forEach(r => {
    const diffDays = Math.ceil((new Date(r.nextDate) - new Date()) / (1000 * 60 * 60 * 24));
    let statusText = "";
    if (diffDays < 0) statusText = `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-500 border border-rose-500/20">🚨 OVERDUE (${Math.abs(diffDays)}d)</span>`;
    else if (diffDays === 0) statusText = `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20">📅 TODAY</span>`;
    else statusText = `<span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">✅ SCHEDULED (${diffDays}d)</span>`;
    
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-6 py-3.5 text-sm text-white font-bold">${r.topic}</td>
        <td class="px-6 py-3.5 text-xs text-gray-400 font-semibold font-mono">${r.lastDate}</td>
        <td class="px-6 py-3.5 text-xs text-gray-300 font-bold">${r.confidence}</td>
        <td class="px-6 py-3.5 text-xs text-gray-400 font-semibold font-mono">${r.nextDate}</td>
        <td class="px-6 py-3.5 text-xs">${statusText}</td>
        <td class="px-6 py-3.5 text-xs text-right">
          <button onclick="triggerRevision('${r.id}', 'easy')" class="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded mr-1">Easy (Move interval up)</button>
          <button onclick="triggerRevision('${r.id}', 'hard')" class="bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded mr-1">Hard (Reset interval)</button>
          <button onclick="deleteRevision('${r.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Spaced Repetition Scheduler</h2>
          <p class="text-gray-400 text-xs mt-1">Automatic repetition queues tracker adjusting next revision offsets dynamically.</p>
        </div>
        <button onclick="addRevisionModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Add Target
        </button>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Topic Name</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Last Revision</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Confidence</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Next Scheduled</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Status</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500 font-medium font-['Outfit']">No revision metrics set up yet. Add one above!</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

const SPACED_REPETITION_STAGES = [1, 2, 7, 15, 30, 60];

function triggerRevision(revId, rating) {
  const r = state.revisions.find(x => x.id === revId);
  if (r) {
    let currentInterval = r.interval || 2;
    let idx = SPACED_REPETITION_STAGES.indexOf(currentInterval);
    if (idx === -1) idx = 1; // default to 2 days
    
    if (rating === "easy") {
      idx = Math.min(idx + 1, SPACED_REPETITION_STAGES.length - 1);
    } else {
      idx = 0; // reset to 1 day
    }
    
    const nextInterval = SPACED_REPETITION_STAGES[idx];
    r.interval = nextInterval;
    r.lastDate = new Date().toISOString().split('T')[0];
    r.nextDate = new Date(Date.now() + nextInterval * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    r.confidence = rating === "easy" ? "🟢 Confident" : "🟡 Learning";
    
    saveState();
    renderApp();
  }
}"""

# New renderMasterHome replacement
new_render_master_home = """function renderMasterHome(container) {
  // Aggregate stats across all domains
  let totalTasks = 0;
  let completedTasks = 0;
  let totalXp = 0;
  let weightedProgressSum = 0;
  let domainsCount = state.domains.length;
  
  state.domains.forEach(d => {
    const stats = calculateDomainStats(d.id);
    totalTasks += stats.totalTasksCount;
    completedTasks += stats.completedTasksCount;
    totalXp += stats.totalXp;
    weightedProgressSum += stats.learningScore;
  });
  
  const avgLearningScore = domainsCount > 0 ? Math.round(weightedProgressSum / domainsCount) : 0;
  const globalLevel = 1 + Math.floor(totalXp / 250);
  
  // Render Domain Progress lists
  let domainsRows = "";
  state.domains.forEach(d => {
    const stats = calculateDomainStats(d.id);
    const barsCount = Math.round(stats.weightedProgress / 10);
    const barText = "■".repeat(barsCount) + "□".repeat(10 - barsCount);
    
    domainsRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition cursor-pointer" onclick="changeDomain('${d.id}')">
        <td class="px-6 py-3.5 text-sm font-bold text-white flex items-center space-x-2">
          <i class="${d.icon} text-brand-blue text-xs w-4"></i>
          <span>${d.name}</span>
        </td>
        <td class="px-6 py-3.5 text-xs text-brand-blue font-mono tracking-widest">${barText}</td>
        <td class="px-6 py-3.5 text-xs font-bold text-white">${stats.learningScore}/100 Score</td>
        <td class="px-6 py-3.5 text-xs font-mono text-gray-400 font-bold">${stats.totalXp} XP</td>
        <td class="px-6 py-3.5 text-xs"><span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-brand-dark border border-brand-border text-gray-400">LVL ${1 + Math.floor(stats.totalXp / 250)}</span></td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">System Mission Control</h2>
        <p class="text-gray-400 text-xs mt-1">Aggregated career planning metrics, learning progress summaries, and streaks tracker.</p>
      </div>
      
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="glass-card p-5 rounded-2xl flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Total System XP</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${totalXp} XP</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-medal mr-1 text-brand-blue"></i>Global Level: ${globalLevel}</p>
        </div>
        <div class="glass-card p-5 rounded-2xl flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">System Learning Score</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${avgLearningScore} / 100</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-tasks mr-1 text-brand-blue"></i>Tasks completed: ${completedTasks} / ${totalTasks}</p>
        </div>
        <div class="glass-card p-5 rounded-2xl flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Active Job Applications</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${state.applications.filter(a => a.status === 'Interviewing' || a.status === 'Applied').length} Active</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-file-invoice-dollar mr-1 text-brand-blue"></i>Job application pipeline stages</p>
        </div>
        <div class="glass-card p-5 rounded-2xl flex flex-col justify-between h-28">
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Portfolio Projects Built</div>
          <div class="text-3xl font-extrabold text-white font-['Outfit']">${state.projects.filter(p => p.status === 'Completed').length} Complete</div>
          <p class="text-[10px] text-gray-500 font-semibold mt-2"><i class="fas fa-folder-open mr-1 text-brand-blue"></i>Resume & portfolio ready files</p>
        </div>
      </div>
      
      <!-- Domains list -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-5"><i class="fas fa-network-wired text-brand-blue mr-2"></i>Curriculum Domains Progress</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Domain name</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Progress Bar</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Learning Score</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">XP Earned</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Level</th>
              </tr>
            </thead>
            <tbody>
              ${domainsRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}"""

# New renderMasterResources replacement
new_render_master_resources = """function renderMasterResources(container) {
  const books = state.resources.filter(r => r.category === 'Book');
  const websites = state.resources.filter(r => r.category === 'Documentation' || r.category === 'Article' || r.category === 'Research Paper');
  const platforms = state.resources.filter(r => r.category === 'Practice' || r.category === 'Course' || r.category === 'YouTube');
  
  let booksRows = "";
  books.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    booksRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.title}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
      </tr>
    `;
  });

  let webRows = "";
  websites.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    webRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.title}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider || 'N/A'}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
      </tr>
    `;
  });

  let platRows = "";
  platforms.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    platRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.title}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider || 'N/A'}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Global Resource Library</h2>
        <p class="text-gray-400 text-xs mt-1">Aggregated reading lists and practice platforms across all syllabus domains.</p>
      </div>

      <!-- Section 1: BOOKS -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-book text-brand-blue mr-2"></i>Recommended Books</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Book Title</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Domain</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              ${booksRows || `<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No books registered.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 2: WEBSITES & REFERENCE DOCS -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-globe text-brand-blue mr-2"></i>Websites & Reference Docs</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Resource Name</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Domain</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author/Creator</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              ${webRows || `<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No websites registered.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: INTERACTIVE PRACTICE PLATFORMS -->
      <div class="glass-card p-6 rounded-2xl">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-keyboard text-brand-blue mr-2"></i>Practice Platforms</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Platform Name</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Domain</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author/Creator</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              ${platRows || `<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No practice platforms registered.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}"""

# New CRUD and form mappings
new_crud_and_forms = """function editTaskModal(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  document.getElementById("task-edit-id").value = task.id;
  document.getElementById("task-module").value = task.module;
  document.getElementById("task-submodule").value = task.submodule;
  document.getElementById("task-name").value = task.title || task.task;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-difficulty").value = task.difficulty;
  document.getElementById("task-weight").value = task.weight || 1;
  document.getElementById("task-learning-type").value = task.learningType || "📖 Read";
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-mastery").value = task.mastery;
  document.getElementById("task-resource").value = task.resource || "";
  document.getElementById("task-practice").value = task.practice || "";
  document.getElementById("task-notes").value = task.notes || "";
  
  document.getElementById("task-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Study Task`;
  document.getElementById("task-modal").classList.remove("hidden");
}

function saveTask(e) {
  e.preventDefault();
  const id = document.getElementById("task-edit-id").value;
  const taskObj = {
    domain: state.activeDomain,
    module: document.getElementById("task-module").value,
    submodule: document.getElementById("task-submodule").value,
    title: document.getElementById("task-name").value,
    priority: document.getElementById("task-priority").value,
    difficulty: document.getElementById("task-difficulty").value,
    weight: parseInt(document.getElementById("task-weight").value || 1),
    learningType: document.getElementById("task-learning-type").value,
    status: document.getElementById("task-status").value,
    mastery: document.getElementById("task-mastery").value,
    resource: document.getElementById("task-resource").value,
    practice: document.getElementById("task-practice").value,
    notes: document.getElementById("task-notes").value
  };
  
  if (taskObj.status === "Completed") {
    taskObj.completedOn = new Date().toISOString().split('T')[0];
  } else {
    taskObj.completedOn = "";
  }
  
  if (id) {
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      state.tasks[idx] = { ...state.tasks[idx], ...taskObj };
    }
  } else {
    taskObj.id = "t_" + Date.now();
    taskObj.favorite = false;
    taskObj.bookmarked = false;
    taskObj.reviseLater = false;
    taskObj.interviewFrequency = taskObj.weight >= 5 ? "★★★★★" : taskObj.weight >= 3 ? "★★★★" : "★★★";
    state.tasks.push(taskObj);
  }
  
  saveState();
  closeModal("task-modal");
  renderApp();
}

function editResourceModal(resId) {
  const res = state.resources.find(r => r.id === resId);
  if (!res) return;
  
  document.getElementById("res-edit-id").value = res.id;
  document.getElementById("res-name").value = res.title || res.name;
  document.getElementById("res-author").value = res.provider || res.author;
  document.getElementById("res-category").value = res.category || "Book";
  document.getElementById("res-diff").value = res.difficulty;
  document.getElementById("res-priority").value = res.priority;
  document.getElementById("res-usage-type").value = res.type || "Primary";
  document.getElementById("res-completed").checked = res.completed === true;
  document.getElementById("res-purpose").value = res.purpose || "";
  document.getElementById("res-chapters").value = res.chapters || "";
  document.getElementById("res-skip").value = res.skip || "";
  document.getElementById("res-notes").value = res.notes || "";
  
  document.getElementById("res-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Resource`;
  document.getElementById("resource-modal").classList.remove("hidden");
}

function saveResource(e) {
  e.preventDefault();
  const id = document.getElementById("res-edit-id").value;
  const isDone = document.getElementById("res-completed").checked;
  
  const resObj = {
    domain: state.activeDomain,
    title: document.getElementById("res-name").value,
    provider: document.getElementById("res-author").value,
    category: document.getElementById("res-category").value,
    difficulty: document.getElementById("res-diff").value,
    priority: document.getElementById("res-priority").value,
    type: document.getElementById("res-usage-type").value,
    completed: isDone,
    progress: isDone ? 100 : 0,
    purpose: document.getElementById("res-purpose").value,
    chapters: document.getElementById("res-chapters").value,
    skip: document.getElementById("res-skip").value,
    notes: document.getElementById("res-notes").value
  };
  
  if (id) {
    const idx = state.resources.findIndex(r => r.id === id);
    if (idx !== -1) {
      state.resources[idx] = { ...state.resources[idx], ...resObj };
    }
  } else {
    resObj.id = "r_" + Date.now();
    resObj.favorite = false;
    state.resources.push(resObj);
  }
  
  saveState();
  closeModal("resource-modal");
  renderApp();
}"""

def apply_app_changes():
    print("Modifying app.js...")
    with open(JS_PATH, "r", encoding="utf-8") as f:
        code = f.read()

    # 1. Replace the entire start segment (STATE and old helper triggers)
    # We find where STATE MANAGEMENT starts and exitToLauncher ends
    start_point = code.find("// --- STATE MANAGEMENT ---")
    end_point = code.find("function exitToLauncher()")
    
    if start_point != -1 and end_point != -1:
        code = code[:start_point] + helpers_block + "\n\n" + code[end_point:]
        print("[+] Top helpers block replaced.")

    # 2. Replace renderLauncher
    launcher_start = code.find("function renderLauncher() {")
    # Ends right before renderSidebar
    launcher_end = code.find("function renderSidebar() {")
    if launcher_start != -1 and launcher_end != -1:
        code = code[:launcher_start] + new_render_launcher + "\n\n" + code[launcher_end:]
        print("[+] renderLauncher replaced.")

    # 3. Replace renderDomainDashboard
    dashboard_start = code.find("function renderDomainDashboard(container) {")
    # Ends right before renderDomainTasks
    dashboard_end = code.find("function renderDomainTasks(container) {")
    if dashboard_start != -1 and dashboard_end != -1:
        code = code[:dashboard_start] + new_render_domain_dashboard + "\n\n" + code[dashboard_end:]
        print("[+] renderDomainDashboard replaced.")

    # 4. Replace renderDomainTasks
    tasks_start = code.find("function renderDomainTasks(container) {")
    # Ends right before updateTaskStatus or similar
    tasks_end = code.find("function updateTaskStatus(taskId, value) {")
    if tasks_start != -1 and tasks_end != -1:
        code = code[:tasks_start] + new_render_domain_tasks + "\n\n" + code[tasks_end:]
        print("[+] renderDomainTasks replaced.")

    # 5. Replace renderDomainResources
    res_start = code.find("function renderDomainResources(container) {")
    # Ends right before updateResProgress or similar
    res_end = code.find("function updateResProgress(resId, value) {")
    if res_start != -1 and res_end != -1:
        code = code[:res_start] + new_render_domain_resources + "\n\n" + code[res_end:]
        print("[+] renderDomainResources replaced.")

    # 6. Replace renderDomainRevisions
    revisions_start = code.find("function renderDomainRevisions(container) {")
    # Ends right before renderDomainWeekly
    revisions_end = code.find("function renderDomainWeekly(container) {")
    if revisions_start != -1 and revisions_end != -1:
        code = code[:revisions_start] + new_render_domain_revisions + "\n\n" + code[revisions_end:]
        print("[+] renderDomainRevisions replaced.")

    # 7. Replace renderMasterHome
    mhome_start = code.find("function renderMasterHome(container) {")
    # Ends right before renderMasterProjects
    mhome_end = code.find("function renderMasterProjects(container) {")
    if mhome_start != -1 and mhome_end != -1:
        code = code[:mhome_start] + new_render_master_home + "\n\n" + code[mhome_end:]
        print("[+] renderMasterHome replaced.")

    # 8. Replace renderMasterResources
    mres_start = code.find("function renderMasterResources(container) {")
    # Ends right before renderMasterApplications or the next function
    mres_end = code.find("function renderMasterApplications(container) {")
    if mres_start != -1 and mres_end != -1:
        code = code[:mres_start] + new_render_master_resources + "\n\n" + code[mres_end:]
        print("[+] renderMasterResources replaced.")

    # 9. Replace forms and CRUD operations
    # Find start of editTaskModal
    crud_start = code.find("function editTaskModal(taskId) {")
    # Find end of saveResource
    crud_end = code.find("function deleteResource(id) {") # keep deleteResource as it is clean
    if crud_start != -1 and crud_end != -1:
        code = code[:crud_start] + new_crud_and_forms + "\n\n" + code[crud_end:]
        print("[+] CRUD methods and Form managers replaced.")

    # Write code back
    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write(code)
    print("[+] app.js successfully fully refactored!")

if __name__ == "__main__":
    apply_app_changes()
