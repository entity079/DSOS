// --- STATE MANAGEMENT ---
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


function exitToLauncher() {
  changeDomain("launcher");
}

function launchGlobalTracker(trackerId) {
  state.activeDomain = "master";
  if (trackerId === "projects") state.activeTab = "projects-tracker";
  else if (trackerId === "resources") state.activeTab = "resources-tracker";
  else if (trackerId === "second-brain") state.activeTab = "second-brain-tracker";
  else if (trackerId === "applications") state.activeTab = "applications-tracker";
  else if (trackerId === "interviews") state.activeTab = "interviews-tracker";
  saveState();
  renderApp();
}

function incrementStreak() {
  state.streak += 1;
  saveState();
  document.getElementById("top-streak-val").innerHTML = `🔥 ${state.streak} Days`;
  const lStreak = document.getElementById("launcher-streak-val");
  if (lStreak) lStreak.innerHTML = `🔥 ${state.streak} Days`;
}

// --- VIEW RENDERING ROUTINES ---
function renderApp() {
  const launcherScreen = document.getElementById("launcher-screen");
  const workspaceScreen = document.getElementById("workspace-screen");
  
  if (state.activeDomain === "launcher") {
    launcherScreen.classList.remove("hidden");
    workspaceScreen.classList.add("hidden");
    renderLauncher();
  } else {
    launcherScreen.classList.add("hidden");
    workspaceScreen.classList.remove("hidden");
    
    // Update Sidebar details
    const titleEl = document.getElementById("sidebar-title");
    const subEl = document.getElementById("sidebar-sub-title");
    const iconEl = document.getElementById("sidebar-icon");
    const badgeEl = document.getElementById("header-domain-badge");
    const nameEl = document.getElementById("header-domain-name");
    
    if (state.activeDomain === "master") {
      titleEl.innerText = "Mission Control";
      subEl.innerText = "Global Workspace";
      iconEl.className = "fas fa-cubes text-brand-blue";
      badgeEl.innerText = "SYSTEM:";
      nameEl.innerText = "Master Dashboard";
    } else {
      const activeObj = state.domains.find(d => d.id === state.activeDomain);
      titleEl.innerText = activeObj ? activeObj.name : "Domain Workspace";
      subEl.innerText = "Domain Active";
      iconEl.className = activeObj ? activeObj.icon + " text-brand-blue" : "fas fa-terminal text-brand-blue";
      badgeEl.innerText = "DOMAIN:";
      nameEl.innerText = activeObj ? activeObj.name : "Syllabus Focus";
    }
    
    // Render Sidebar Menu & Content
    renderSidebar();
    renderContent();
    
    // Update Focus goal text
    document.getElementById("top-focus-goal-val").innerText = state.focusGoal || "No active focus goal set.";
    document.getElementById("top-streak-val").innerHTML = `🔥 ${state.streak} Days`;
  }
}

// --- SCREEN 1: LAUNCHER SCREEN ---
function renderLauncher() {
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
}

function renderSidebar() {
  const menu = document.getElementById("sidebar-menu");
  let html = "";
  
  if (state.activeDomain === "master") {
    // Sidebar for Master Control
    const tabs = [
      { id: "home", label: "Home Dashboard", icon: "fas fa-home" },
      { id: "projects-tracker", label: "Project Portfolio", icon: "fas fa-folder-open" },
      { id: "resources-tracker", label: "Resource Library", icon: "fas fa-book-reader" },
      { id: "applications-tracker", label: "Job Applications", icon: "fas fa-file-invoice-dollar" },
      { id: "interviews-tracker", label: "Interview Rounds", icon: "fas fa-comments" },
      { id: "second-brain-tracker", label: "Second Brain Notes", icon: "fas fa-brain" },
      { id: "time-analytics", label: "Time Analytics", icon: "fas fa-history" }
    ];
    
    tabs.forEach(t => {
      const active = state.activeTab === t.id ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" : "text-gray-400 hover:text-white hover:bg-brand-dark/40";
      html += `
        <button onclick="switchTab('${t.id}')" class="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${active}">
          <i class="${t.icon} w-5 text-center"></i>
          <span>${t.label}</span>
        </button>
      `;
    });
  } else {
    // Sidebar for Domain Workspace (12-sheet structure matching SQL exactly)
    const tabs = [
      { id: "dashboard", label: "Home Dashboard", icon: "fas fa-home" },
      { id: "tasks", label: "Task List", icon: "fas fa-tasks" },
      { id: "resources", label: "Resources", icon: "fas fa-book-open" },
      { id: "interviews", label: "Interview Questions", icon: "fas fa-question-circle" },
      { id: "projects", label: "Projects", icon: "fas fa-project-diagram" },
      { id: "cases", label: "Case Studies", icon: "fas fa-briefcase" },
      { id: "cheat", label: "Cheat Sheet", icon: "fas fa-code" },
      { id: "mistakes", label: "Mistake Log", icon: "fas fa-exclamation-triangle" },
      { id: "notes", label: "Notes", icon: "fas fa-sticky-note" },
      { id: "revisions", label: "Revision Tracker", icon: "fas fa-history" },
      { id: "weekly", label: "Weekly Planner", icon: "fas fa-calendar-alt" },
      { id: "progress", label: "Progress Dashboard", icon: "fas fa-chart-pie" }
    ];
    
    tabs.forEach(t => {
      const active = state.activeTab === t.id ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" : "text-gray-400 hover:text-white hover:bg-brand-dark/40";
      html += `
        <button onclick="switchTab('${t.id}')" class="w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition ${active}">
          <i class="${t.icon} w-4 text-center text-xs"></i>
          <span>${t.label}</span>
        </button>
      `;
    });
  }
  menu.innerHTML = html;
}

// --- SCREEN 2: WORKSPACE TAB CONTENT ROUTER ---
function renderContent() {
  const container = document.getElementById("content-pane");
  
  if (state.activeDomain === "master") {
    switch (state.activeTab) {
      case "home": renderMasterHome(container); break;
      case "projects-tracker": renderMasterProjects(container); break;
      case "resources-tracker": renderMasterResources(container); break;
      case "applications-tracker": renderMasterApplications(container); break;
      case "interviews-tracker": renderMasterInterviews(container); break;
      case "second-brain-tracker": renderMasterSecondBrain(container); break;
      case "time-analytics": renderMasterTimeAnalytics(container); break;
      case "settings": renderSettings(container); break;
      default: renderMasterHome(container);
    }
  } else {
    switch (state.activeTab) {
      case "dashboard": renderDomainDashboard(container); break;
      case "tasks": renderDomainTasks(container); break;
      case "resources": renderDomainResources(container); break;
      case "interviews": renderDomainInterviews(container); break;
      case "projects": renderDomainProjects(container); break;
      case "cases": renderDomainCases(container); break;
      case "cheat": renderDomainCheat(container); break;
      case "mistakes": renderDomainMistakes(container); break;
      case "notes": renderDomainNotes(container); break;
      case "revisions": renderDomainRevisions(container); break;
      case "weekly": renderDomainWeekly(container); break;
      case "progress": renderDomainProgress(container); break;
      case "settings": renderSettings(container); break;
      default: renderDomainDashboard(container);
    }
  }
}

// ========================================================
// RENDERING WORKSPACE - SPECIFIC VIEWS
// ========================================================

// --- DOMAIN VIEWS ---

function renderDomainDashboard(container) {
  if (state.activeDomain === 'interview_prep') {
    renderInterviewPrepDashboard(container);
    return;
  }
  
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
  
  
      // Next recommended step header alert
      const nextUnit = getNextRecommendedUnit(state.activeDomain);
      let nextStepHtml = "";
      if (nextUnit) {
        nextStepHtml = `
          <div class="glass-card p-4 rounded-xl border border-brand-blue/30 bg-brand-blue/5 flex items-center justify-between mb-6 animate-pulse">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div>
                <div class="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Next Recommended Objective</div>
                <div class="text-xs font-bold text-white">${nextUnit.title} (${nextUnit.module})</div>
              </div>
            </div>
            <button onclick="openJourneyDrawer('${nextUnit.id}')" class="bg-brand-blue hover:bg-brand-hover text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition shadow-md">Open Study Session</button>
          </div>
        `;
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
      ${nextStepHtml}
      
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
}

function renderDomainTasks(container) {
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
        <td class="px-4 py-3 text-sm text-white font-bold max-w-xs truncate hover:text-brand-blue cursor-pointer" onclick="openJourneyDrawer('${t.id}')" title="Open Interactive Journey for ${t.title}">${t.title}</td>
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
}

function updateTaskStatus(taskId, value) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = value;
    if (value === "Completed") {
      task.compDate = new Date().toISOString().split('T')[0];
    } else {
      task.compDate = "";
    }
    saveState();
  }
}

function updateTaskMastery(taskId, value) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.mastery = value;
    saveState();
  }
}

function updateTaskHours(taskId, value) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.actHours = parseFloat(value || 0);
    saveState();
  }
}

// Task CRUD Modals
function addTaskModal() {
  document.getElementById("task-form").reset();
  document.getElementById("task-edit-id").value = "";
  document.getElementById("task-modal-title").innerHTML = `<i class="fas fa-plus mr-2 text-brand-blue"></i>Add Study Task`;
  document.getElementById("task-modal").classList.remove("hidden");
}

function editTaskModal(taskId) {
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
}

function deleteResource(id) {
  if (confirm("Are you sure you want to delete this resource?")) {
    state.resources = state.resources.filter(r => r.id !== id);
    saveState();
    renderApp();
  }
}


// --- DOMAIN RESOURCES VIEW ---
function renderDomainResources(container) {
  const domainRes = state.resources.filter(r => r.domain === state.activeDomain);
  
  let rows = "";
  domainRes.forEach(r => {
    const isChecked = r.completed === true ? "checked" : "";
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name || r.title}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.category || r.type}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.provider || r.author || 'N/A'}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs font-mono text-amber-500 font-bold">${r.priority}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
        <td class="px-4 py-3 text-xs text-right">
          <button onclick="editResourceModal('${r.id}')" class="text-brand-blue hover:text-white transition mr-2.5"><i class="fas fa-edit"></i></button>
          <button onclick="deleteResource('${r.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Domain Resource Library</h2>
          <p class="text-gray-400 text-xs mt-1">Recommended reading lists, books, and courses mapped specifically to this domain.</p>
        </div>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-center w-16">Done</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Resource Title</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Type</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Author/Provider</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Difficulty</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Priority</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Notes</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500 font-medium">No resources linked to this domain.</td></tr>`}
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
  }
}

// --- DOMAIN INTERVIEWS / CODING QUESTIONS VIEW ---
function renderDomainInterviews(container) {
  const domainInts = state.tasks.filter(t => t.domain === state.activeDomain && t.submodule.includes("Interview"));
  
  let rows = "";
  domainInts.forEach(t => {
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-sm text-brand-blue font-bold">LeetCode</td>
        <td class="px-4 py-3 text-sm text-white font-medium">${t.task}</td>
        <td class="px-4 py-3 text-xs text-gray-400">${t.submodule}</td>
        <td class="px-4 py-3 text-xs font-bold text-rose-500">${t.difficulty}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold uppercase border border-emerald-500/20">${t.status}</span></td>
        <td class="px-4 py-3 text-xs font-mono text-gray-400">${t.actHours ? t.actHours * 60 : '0'} min</td>
        <td class="px-4 py-3 text-xs text-gray-400">${t.notes || "None"}</td>
        <td class="px-4 py-3 text-xs text-gray-300 font-semibold">${t.mastery}</td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Coding & Interview Practices</h2>
        <p class="text-gray-400 text-xs mt-1">Practice platforms questions logs and timed performance solver metrics.</p>
      </div>
      
      <div class="glass-card p-6 rounded-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit']"><i class="fas fa-question-circle text-brand-blue mr-2"></i>Curriculum Code Exercises</h3>
          <button onclick="switchTab('tasks')" class="text-xs text-brand-blue hover:text-white transition font-semibold">Solve in Task List</button>
        </div>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Platform</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Question Topic</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Syllabus Tag</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Difficulty</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Solved</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Time Spent</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Mistakes Committed</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Confidence</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500 font-medium">No interview tagged tasks in curriculum. Add one in Task List!</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --- DOMAIN PROJECTS VIEW ---
function renderDomainProjects(container) {
  const domainProjs = state.projects.filter(p => p.domain === state.activeDomain);
  
  let cardsHtml = "";
  domainProjs.forEach(p => {
    const statusColor = p.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                        p.status === "In Progress" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                        "bg-gray-500/10 text-gray-400 border border-brand-border";
                        
    cardsHtml += `
      <div class="glass-card p-6 rounded-2xl flex flex-col justify-between h-64 border border-brand-border hover:border-brand-blue/30 transition">
        <div>
          <div class="flex justify-between items-center mb-3">
            <span class="text-[10px] uppercase font-bold tracking-wider text-brand-blue bg-brand-navy/60 px-2.5 py-1 rounded border border-brand-border">${p.category}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${statusColor}">${p.status}</span>
          </div>
          <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-1.5">${p.name}</h3>
          <p class="text-xs text-gray-400 leading-relaxed mb-3"><span class="text-gray-500 font-bold">Concepts:</span> ${p.concepts}</p>
          <p class="text-xs text-gray-400 leading-relaxed"><span class="text-gray-500 font-bold">Libraries:</span> ${p.libraries}</p>
        </div>
        
        <div class="border-t border-brand-border pt-4 mt-4 flex justify-between items-center text-xs">
          <div class="flex space-x-3 text-gray-500 font-semibold uppercase text-[10px]">
            <span><i class="fas fa-file-pdf mr-1 text-brand-blue"></i>Resume: ${p.resume === "Yes" ? "✅" : "❌"}</span>
            <span><i class="fas fa-briefcase mr-1 text-brand-blue"></i>Portfolio: ${p.portfolio === "Yes" ? "✅" : "❌"}</span>
          </div>
          
          <div class="flex space-x-2.5">
            <a href="#" class="text-gray-400 hover:text-white transition text-sm"><i class="fab fa-github"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition text-sm"><i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Portfolio Building Projects</h2>
        <p class="text-gray-400 text-xs mt-1">Manage project pipelines, stack details, and ensure they are resume-ready.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHtml || `<div class="col-span-3 text-center py-10 text-gray-500">No project configurations found for this domain.</div>`}
      </div>
    </div>
  `;
}

// --- DOMAIN CASE STUDIES VIEW ---
function renderDomainCases(container) {
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">System Thinking & Business Cases</h2>
        <p class="text-gray-400 text-xs mt-1">Review business problems, KPI selections, and tactical root cause recommendations.</p>
      </div>
      
      <div class="space-y-6" id="cases-list-panel">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;
  
  const casesPanel = document.getElementById("cases-list-panel");
  // Load standard preloaded cases for testing/rendering
  const items = [
    { name: "Dynamic Memory Ingestion Crash", question: "Ingesting 100M transaction records leads to server container restarts.", framework: "Buffer sizing, batch processing, custom iterators", root: "Pandas dataframe loads CSV columns completely, exceeding heap RAM.", criteria: "Heap threshold, script processing window speed", kpis: "Peak Heap RAM (MB), Ingestion Duration (Sec)", recommendations: "Introduce yield generator chunking to write records in 50k rows batches to database." },
    { name: "Refactoring Modular Lineage Libraries", question: "Modular calculations are highly nested, causing recursive locks.", framework: "Directed Acyclic Graphs (DAGs) and MRO checks", root: "Circular import statements created tight dependency coupling in modules.", criteria: "Compilation speed, namespace conflicts frequency", kpis: "Static checks error frequency, build queue duration", recommendations: "Decompose base operations to low-level modules, using absolute imports only." }
  ];
  
  let html = "";
  items.forEach(c => {
    html += `
      <div class="glass-card p-6 rounded-2xl border border-brand-border space-y-4">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] text-brand-blue border-b border-brand-border/60 pb-3"><i class="fas fa-lightbulb mr-2"></i>${c.name}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Business / Tech Question</p>
            <p class="text-white leading-relaxed font-medium">${c.question}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">System Thinking Framework</p>
            <p class="text-gray-300 leading-relaxed">${c.framework}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Root Cause Analysis</p>
            <p class="text-gray-300 leading-relaxed">${c.root}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Decision Criteria</p>
            <p class="text-gray-300 leading-relaxed">${c.criteria}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">KPI Design</p>
            <p class="text-gray-300 leading-relaxed font-mono">${c.kpis}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Strategic Recommendations</p>
            <p class="text-emerald-400 leading-relaxed font-medium">${c.recommendations}</p>
          </div>
        </div>
      </div>
    `;
  });
  casesPanel.innerHTML = html;
}

// --- DOMAIN CHEAT SHEET VIEW ---
function renderDomainCheat(container) {
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Domain Quick Reference Cheat Sheet</h2>
        <p class="text-gray-400 text-xs mt-1">Review structural templates, optimization tips, and coding syntax shortcuts.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="cheat-sheets-list">
        <!-- Dynamic reference nodes -->
      </div>
    </div>
  `;
  
  const cheatList = document.getElementById("cheat-sheets-list");
  // Load standard preloaded references based on domain
  let items = [];
  if (state.activeDomain === "sql") {
    items = [
      { topic: "Window Partitioning", syntax: "SELECT col, ROW_NUMBER() OVER(PARTITION BY category ORDER BY val DESC) FROM table;", formula: "Window frame bounds: ROWS BETWEEN 3 PRECEDING AND CURRENT ROW", opt: "Always indexing the partition columns using Composite B-tree indexes.", best: "Avoid ranking huge partitions without index mappings." },
      { topic: "CTEs WITH queries", syntax: "WITH temp_summary AS (\n  SELECT * FROM sales\n)\nSELECT * FROM temp_summary;", formula: "Recursion: WITH RECURSIVE org(id, parent) AS (...)", opt: "Recursive CTEs should have a terminating WHERE check to prevent loops.", best: "Use CTEs for readability, replacing subqueries where possible." }
    ];
  } else {
    items = [
      { topic: "List Comprehension", syntax: "squares = [x**2 for x in range(10) if x % 2 == 0]", formula: "Transformation: [f(x) for x in list if condition(x)]", opt: "Faster execution than basic loops due to C optimization.", best: "Avoid nesting comprehensions. Keep logic on one line." },
      { topic: "Dunder Magic Methods", syntax: "def __repr__(self):\n  return f'Item({self.name})'", formula: "Dunder triggers: repr() calls __repr__; str() calls __str__", opt: "Implement __slots__ to lock variables and reduce memory.", best: "Always return string representations from __repr__ for logs debugging." }
    ];
  }
  
  let html = "";
  items.forEach(ch => {
    html += `
      <div class="glass-card p-6 rounded-2xl border border-brand-border space-y-3.5">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] text-brand-blue border-b border-brand-border pb-2.5"><i class="fas fa-file-code mr-2"></i>${ch.topic}</h3>
        <div class="space-y-2.5 text-xs">
          <div>
            <span class="text-gray-500 font-bold uppercase tracking-wider block mb-1">Code Template</span>
            <pre class="bg-brand-navy p-3 rounded-lg text-white font-mono overflow-x-auto custom-scroll leading-relaxed border border-brand-border">${ch.syntax}</pre>
          </div>
          <div>
            <span class="text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Behavior Details</span>
            <p class="text-gray-300">${ch.formula}</p>
          </div>
          <div>
            <span class="text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Optimization Tips</span>
            <p class="text-amber-500 font-medium">${ch.opt}</p>
          </div>
          <div>
            <span class="text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Best Practices</span>
            <p class="text-emerald-400 font-medium">${ch.best}</p>
          </div>
        </div>
      </div>
    `;
  });
  cheatList.innerHTML = html;
}

// --- DOMAIN MISTAKE LOG VIEW ---
function renderDomainMistakes(container) {
  const domainMistakes = state.mistakes.filter(m => m.problem && m.problem.toLowerCase()); // simple placeholder filter
  
  let rows = "";
  domainMistakes.forEach(m => {
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3.5 text-xs text-gray-400 font-bold font-mono">${m.date}</td>
        <td class="px-4 py-3.5 text-sm text-white font-medium">${m.problem}</td>
        <td class="px-4 py-3.5 text-xs text-rose-400 max-w-xs truncate" title="${m.mistake}">${m.mistake}</td>
        <td class="px-4 py-3.5 text-xs text-gray-400 max-w-xs truncate" title="${m.reason}">${m.reason}</td>
        <td class="px-4 py-3.5 text-xs text-emerald-400 max-w-xs truncate" title="${m.correct}">${m.correct}</td>
        <td class="px-4 py-3.5 text-xs text-gray-300 font-semibold">${m.lesson}</td>
        <td class="px-4 py-3.5 text-xs"><span class="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500">${m.revisionDate}</span></td>
        <td class="px-4 py-3.5 text-xs text-right">
          <button onclick="editMistakeModal('${m.id}')" class="text-brand-blue hover:text-white transition mr-2"><i class="fas fa-edit"></i></button>
          <button onclick="deleteMistake('${m.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Lessons Learned Mistake Log</h2>
          <p class="text-gray-400 text-xs mt-1">Review structural traps, execution reasons, and lock custom revision flags.</p>
        </div>
        <button onclick="addMistakeModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Log Mistake
        </button>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Date</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Question Reference</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Mistake</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Root Reason</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Correct Logic</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Lesson Learned</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Revision Date</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500 font-medium font-['Outfit']">No mistakes logged yet. Keep it clean!</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function addMistakeModal() {
  document.getElementById("mistake-form").reset();
  document.getElementById("mist-edit-id").value = "";
  document.getElementById("mist-date").value = new Date().toISOString().split('T')[0];
  document.getElementById("mist-modal-title").innerHTML = `<i class="fas fa-plus mr-2 text-brand-blue"></i>Log Mistake`;
  document.getElementById("mistake-modal").classList.remove("hidden");
}

function editMistakeModal(mistId) {
  const m = state.mistakes.find(x => x.id === mistId);
  if (!m) return;
  
  document.getElementById("mist-edit-id").value = m.id;
  document.getElementById("mist-date").value = m.date;
  document.getElementById("mist-problem").value = m.problem;
  document.getElementById("mist-desc").value = m.mistake;
  document.getElementById("mist-reason").value = m.reason;
  document.getElementById("mist-correct").value = m.correct;
  document.getElementById("mist-lesson").value = m.lesson;
  document.getElementById("mist-revision").value = m.needsRevision || "Yes";
  
  document.getElementById("mist-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Logged Mistake`;
  document.getElementById("mistake-modal").classList.remove("hidden");
}

function saveMistake(e) {
  e.preventDefault();
  const id = document.getElementById("mist-edit-id").value;
  const mObj = {
    date: document.getElementById("mist-date").value,
    problem: document.getElementById("mist-problem").value,
    mistake: document.getElementById("mist-desc").value,
    reason: document.getElementById("mist-reason").value,
    correct: document.getElementById("mist-correct").value,
    lesson: document.getElementById("mist-lesson").value,
    needsRevision: document.getElementById("mist-revision").value,
    revisionDate: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0] // default review in 3 days
  };
  
  if (id) {
    const idx = state.mistakes.findIndex(x => x.id === id);
    if (idx !== -1) {
      state.mistakes[idx] = { ...state.mistakes[idx], ...mObj };
    }
  } else {
    mObj.id = "m_" + Date.now();
    state.mistakes.push(mObj);
  }
  
  saveState();
  closeModal("mistake-modal");
  renderApp();
}

function deleteMistake(id) {
  if (confirm("Are you sure you want to delete this log?")) {
    state.mistakes = state.mistakes.filter(x => x.id !== id);
    saveState();
    renderApp();
  }
}

// --- DOMAIN NOTES VIEW ---
function renderDomainNotes(container) {
  let listHtml = "";
  state.notes.forEach(n => {
    listHtml += `
      <div class="glass-card p-6 rounded-2xl border border-brand-border space-y-3 relative hover:border-brand-blue/30 transition">
        <div class="absolute right-4 top-4 flex space-x-2 text-xs">
          <button onclick="editNoteModal('${n.id}')" class="text-gray-500 hover:text-white transition"><i class="fas fa-edit"></i></button>
          <button onclick="deleteNote('${n.id}')" class="text-gray-500 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </div>
        <div class="flex items-center space-x-2 text-xs text-gray-500 font-semibold font-mono">
          <span>${n.date}</span>
          <span>•</span>
          <span class="text-brand-blue uppercase">${state.activeDomain} Notes</span>
        </div>
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit']">${n.topic}</h3>
        <pre class="bg-brand-navy p-4 rounded-xl text-xs font-mono text-gray-300 overflow-x-auto custom-scroll border border-brand-border max-h-48 leading-relaxed">${n.content}</pre>
        <div class="text-xs text-gray-400"><span class="text-gray-500 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Takeaways</span>${n.takeaways}</div>
      </div>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Structured Study Notes</h2>
          <p class="text-gray-400 text-xs mt-1">Free-form structured notes logs incorporating reference code scripts.</p>
        </div>
        <button onclick="addNoteModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Add Note
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${listHtml || `<div class="col-span-2 text-center py-10 text-gray-500">No notes written yet. Add one!</div>`}
      </div>
    </div>
  `;
}

function addNoteModal() {
  document.getElementById("note-form").reset();
  document.getElementById("note-edit-id").value = "";
  document.getElementById("note-category").classList.add("hidden"); // hidden category for domain specific notes
  document.getElementById("note-modal-title").innerHTML = `<i class="fas fa-plus mr-2 text-brand-blue"></i>Add Study Note`;
  document.getElementById("note-modal").classList.remove("hidden");
}

function editNoteModal(noteId) {
  const n = state.notes.find(x => x.id === noteId);
  if (!n) return;
  
  document.getElementById("note-edit-id").value = n.id;
  document.getElementById("note-title").value = n.topic;
  document.getElementById("note-content").value = n.content;
  document.getElementById("note-refs").value = n.references || "";
  document.getElementById("note-tag").value = n.tag || "Core";
  
  document.getElementById("note-category").classList.add("hidden");
  document.getElementById("note-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Study Note`;
  document.getElementById("note-modal").classList.remove("hidden");
}

function saveNote(e) {
  e.preventDefault();
  const id = document.getElementById("note-edit-id").value;
  const nObj = {
    date: new Date().toISOString().split('T')[0],
    topic: document.getElementById("note-title").value,
    content: document.getElementById("note-content").value,
    takeaways: "Captured from active module syllabus logic details.",
    actions: "Review in upcoming milestones reviews.",
    references: document.getElementById("note-refs").value,
    tag: document.getElementById("note-tag").value,
    category: document.getElementById("note-category").value || "Ideas"
  };
  
  if (id) {
    const idx = state.notes.findIndex(x => x.id === id);
    if (idx !== -1) {
      state.notes[idx] = { ...state.notes[idx], ...nObj };
    }
  } else {
    nObj.id = "n_" + Date.now();
    state.notes.push(nObj);
  }
  
  saveState();
  closeModal("note-modal");
  renderApp();
}

function deleteNote(id) {
  if (confirm("Are you sure you want to delete this note?")) {
    state.notes = state.notes.filter(x => x.id !== id);
    saveState();
    renderApp();
  }
}

// --- DOMAIN REVISION SPACED REPETITION VIEW ---
function renderDomainRevisions(container) {
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
}

function renderDomainWeekly(container) {
  let listHtml = "";
  state.weeklyPlans.forEach(w => {
    listHtml += `
      <div class="glass-card p-6 rounded-2xl border border-brand-border space-y-4">
        <div class="flex justify-between items-center border-b border-brand-border/60 pb-3">
          <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] text-brand-blue">${w.week} Study Target</h3>
          <span class="text-xs font-mono font-bold bg-brand-dark px-3 py-1 rounded border border-brand-border text-gray-300">${w.hours} Hours Target</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div>
            <span class="text-gray-500 font-bold uppercase tracking-wider block mb-1">Weekly Goals</span>
            <p class="text-white font-medium">${w.goals}</p>
          </div>
          <div>
            <span class="text-gray-500 font-bold uppercase tracking-wider block mb-1">Tasks Planned</span>
            <p class="text-gray-300">${w.tasks}</p>
          </div>
          <div class="md:col-span-2 border-t border-brand-border/40 pt-3 mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="text-gray-500 font-bold uppercase tracking-wider block mb-1">Reflection / Obstacles</span>
              <p class="text-gray-400">${w.reflection || "None logged yet."}</p>
            </div>
            <div>
              <span class="text-emerald-500 font-bold uppercase tracking-wider block mb-1">Key Achievements</span>
              <p class="text-emerald-400 font-medium">${w.achievements || "None logged yet."}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Weekly Study Planner & Reflections</h2>
          <p class="text-gray-400 text-xs mt-1">Set goals, plan study schedules, and capture weekly barriers/achievements reflections.</p>
        </div>
        <button onclick="addWeeklyPlanModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Create Plan
        </button>
      </div>
      
      <div class="space-y-6">
        ${listHtml || `<div class="text-center py-10 text-gray-500">No weekly plans logged yet.</div>`}
      </div>
    </div>
  `;
}

function addWeeklyPlanModal() {
  const week = prompt("Enter Week Name (e.g. Week 27):");
  if (!week) return;
  const goals = prompt("What is the goal of this week?");
  const hours = parseInt(prompt("How many study hours target?") || 0);
  
  if (week) {
    state.weeklyPlans.push({
      id: "w_" + Date.now(),
      week: week,
      goals: goals,
      tasks: "Study syllabus modules, complete coding exercises.",
      hours: hours,
      reflection: "",
      achievements: ""
    });
    saveState();
    renderApp();
  }
}

// --- DOMAIN PROGRESS & CHART.JS VIEW ---
function renderDomainProgress(container) {
  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Syllabus Mastery & Charts</h2>
        <p class="text-gray-400 text-xs mt-1">Review dynamic analytics graphs of status allocations and mastery metrics.</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Summary Tables -->
        <div class="glass-card p-6 rounded-2xl space-y-6">
          <div>
            <h3 class="font-extrabold text-white text-sm tracking-tight font-['Outfit'] mb-3"><i class="fas fa-chart-bar text-brand-blue mr-2"></i>Status Summaries</h3>
            <div id="progress-status-table"></div>
          </div>
          <div>
            <h3 class="font-extrabold text-white text-sm tracking-tight font-['Outfit'] mb-3"><i class="fas fa-star text-brand-blue mr-2"></i>Mastery Distributions</h3>
            <div id="progress-mastery-table"></div>
          </div>
        </div>
        
        <!-- Live Chart.js Container -->
        <div class="glass-card p-6 rounded-2xl lg:col-span-2 flex flex-col justify-between">
          <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-4"><i class="fas fa-chart-pie text-brand-blue mr-2"></i>Syllabus Status Allocations</h3>
          <div class="w-full flex-grow flex items-center justify-center" style="height: 320px;">
            <canvas id="domain-progress-chart-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const domainTasks = state.tasks.filter(t => t.domain === state.activeDomain);
  const statusCounts = { "Not Started": 0, "Learning": 0, "Practicing": 0, "Completed": 0, "Revision Needed": 0 };
  const masteryCounts = { "⚪ Beginner": 0, "🟡 Learning": 0, "🔵 Practicing": 0, "🟢 Confident": 0, "⭐ Interview Ready": 0, "👑 Master": 0 };
  
  domainTasks.forEach(t => {
    if (statusCounts[t.status] !== undefined) statusCounts[t.status]++;
    
    // exact or partial matching for mastery counts
    const key = Object.keys(masteryCounts).find(k => k.includes(t.mastery) || t.mastery.includes(k));
    if (key) masteryCounts[key]++;
  });
  
  // Populate summaries tables
  let stHtml = `
    <table class="w-full text-left text-xs border-collapse">
      <thead><tr class="border-b border-brand-border"><th class="py-2 text-gray-500 font-bold uppercase">Status</th><th class="py-2 text-right text-gray-500 font-bold uppercase">Tasks Count</th></tr></thead>
      <tbody>
  `;
  Object.keys(statusCounts).forEach(k => {
    stHtml += `<tr><td class="py-2 text-white font-medium">${k}</td><td class="py-2 text-right text-brand-blue font-bold font-mono">${statusCounts[k]}</td></tr>`;
  });
  stHtml += `</tbody></table>`;
  document.getElementById("progress-status-table").innerHTML = stHtml;
  
  let msHtml = `
    <table class="w-full text-left text-xs border-collapse">
      <thead><tr class="border-b border-brand-border"><th class="py-2 text-gray-500 font-bold uppercase">Mastery level</th><th class="py-2 text-right text-gray-500 font-bold uppercase">Tasks Count</th></tr></thead>
      <tbody>
  `;
  Object.keys(masteryCounts).forEach(k => {
    msHtml += `<tr><td class="py-2 text-gray-300 font-medium">${k}</td><td class="py-2 text-right text-brand-blue font-bold font-mono">${masteryCounts[k]}</td></tr>`;
  });
  msHtml += `</tbody></table>`;
  document.getElementById("progress-mastery-table").innerHTML = msHtml;
  
  // Render Chart.js
  const ctx = document.getElementById("domain-progress-chart-canvas").getContext("2d");
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(71, 85, 105, 0.45)', // Not Started - Gray
          'rgba(99, 102, 241, 0.45)', // Learning - Indigo
          'rgba(229, 62, 62, 0.45)', // Practicing - Steel Blue
          'rgba(16, 185, 129, 0.45)', // Completed - Emerald
          'rgba(245, 158, 11, 0.45)'  // Revision Needed - Amber
        ],
        borderColor: [
          '#475569', '#6366F1', '#E53E3E', '#10B981', '#F59E0B'
        ],
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#94A3B8',
            font: { family: 'Inter', size: 10 }
          }
        }
      }
    }
  });
}

// ========================================================
// RENDERING WORKSPACE - MASTER DASHBOARD VIEWS
// ========================================================

function renderMasterHome(container) {
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
}

function renderMasterProjects(container) {
  // Global Project Portfolio Tracker
  let rows = "";
  state.projects.forEach(p => {
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-sm text-white font-bold">${p.name}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${p.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${p.concepts}">${p.concepts}</td>
        <td class="px-4 py-3 text-xs text-gray-400">${p.libraries}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-500">${p.dataset}</td>
        <td class="px-4 py-3 text-xs font-bold text-gray-300">${p.github}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-medium">Doc: ${p.doc === "Yes" ? "✅" : "❌"}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">Resume: ${p.resume === "Yes" ? "✅" : "❌"}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-brand-dark border border-brand-border text-gray-300">${p.status}</span></td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Global Project Portfolio</h2>
        <p class="text-gray-400 text-xs mt-1">Track portfolio readiness, tools used, and status across all curriculum roadmaps.</p>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Project Name</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Domain</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Key Concepts</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Libraries</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Dataset</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">GitHub</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Docs</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Resume</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderMasterResources(container) {
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
}

function renderMasterApplications(container) {
  // Career Job Applications Tracker
  let rows = "";
  state.applications.forEach(a => {
    const statusColor = a.status === "Offer Received" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                        a.status === "Interviewing" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                        a.status === "Rejected" ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
                        "bg-brand-dark border border-brand-border text-gray-400";
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3.5 text-sm text-white font-bold">${a.company}</td>
        <td class="px-4 py-3.5 text-sm text-white font-semibold">${a.role}</td>
        <td class="px-4 py-3.5 text-xs text-gray-400">${a.location}</td>
        <td class="px-4 py-3.5 text-xs font-semibold font-mono text-gray-400">${a.date}</td>
        <td class="px-4 py-3.5 text-xs"><span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${statusColor}">${a.status}</span></td>
        <td class="px-4 py-3.5 text-xs font-mono text-gray-300 font-bold">${a.salary || "N/A"}</td>
        <td class="px-4 py-3.5 text-xs text-brand-blue font-semibold">${a.contact}</td>
        <td class="px-4 py-3.5 text-xs text-gray-400 max-w-xs truncate" title="${a.notes}">${a.notes}</td>
        <td class="px-4 py-3.5 text-xs text-right">
          <button onclick="editApplicationModal('${a.id}')" class="text-brand-blue hover:text-white transition mr-2.5"><i class="fas fa-edit"></i></button>
          <button onclick="deleteApplication('${a.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Career Job Applications Pipeline</h2>
          <p class="text-gray-400 text-xs mt-1">Track target offers, log application statuses, and store recruiter logs.</p>
        </div>
        <button onclick="addApplicationModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Log Application
        </button>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Company</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Role Title</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Location</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Applied Date</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Status</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Salary</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Contact</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Recruiter Logs</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500 font-medium font-['Outfit']">No job applications logged yet. Click Log Application to start.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function addApplicationModal() {
  document.getElementById("application-form").reset();
  document.getElementById("app-edit-id").value = "";
  document.getElementById("app-date").value = new Date().toISOString().split('T')[0];
  document.getElementById("app-modal-title").innerHTML = `<i class="fas fa-plus mr-2 text-brand-blue"></i>Log Job Application`;
  document.getElementById("application-modal").classList.remove("hidden");
}

function editApplicationModal(appId) {
  const a = state.applications.find(x => x.id === appId);
  if (!a) return;
  
  document.getElementById("app-edit-id").value = a.id;
  document.getElementById("app-company").value = a.company;
  document.getElementById("app-role").value = a.role;
  document.getElementById("app-location").value = a.location;
  document.getElementById("app-date").value = a.date;
  document.getElementById("app-status").value = a.status;
  document.getElementById("app-salary").value = a.salary || "";
  document.getElementById("app-contact").value = a.contact || "";
  document.getElementById("app-notes").value = a.notes || "";
  
  document.getElementById("app-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Job Application`;
  document.getElementById("application-modal").classList.remove("hidden");
}

function saveApplication(e) {
  e.preventDefault();
  const id = document.getElementById("app-edit-id").value;
  const aObj = {
    company: document.getElementById("app-company").value,
    role: document.getElementById("app-role").value,
    location: document.getElementById("app-location").value,
    date: document.getElementById("app-date").value,
    status: document.getElementById("app-status").value,
    salary: document.getElementById("app-salary").value,
    contact: document.getElementById("app-contact").value,
    notes: document.getElementById("app-notes").value
  };
  
  if (id) {
    const idx = state.applications.findIndex(x => x.id === id);
    if (idx !== -1) {
      state.applications[idx] = { ...state.applications[idx], ...aObj };
    }
  } else {
    aObj.id = "a_" + Date.now();
    state.applications.push(aObj);
  }
  
  saveState();
  closeModal("application-modal");
  renderApp();
}

function deleteApplication(id) {
  if (confirm("Are you sure?")) {
    state.applications = state.applications.filter(x => x.id !== id);
    saveState();
    renderApp();
  }
}

function renderMasterInterviews(container) {
  // Global Interview Rounds Log
  let rows = "";
  state.interviews.forEach(i => {
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3.5 text-sm text-white font-bold">${i.company}</td>
        <td class="px-4 py-3.5 text-sm text-white font-semibold">${i.role}</td>
        <td class="px-4 py-3.5 text-xs text-brand-blue font-bold">${i.round}</td>
        <td class="px-4 py-3.5 text-xs font-mono text-gray-400 font-semibold">${i.date}</td>
        <td class="px-4 py-3.5 text-xs font-mono text-amber-500 font-bold">${i.performance}/5</td>
        <td class="px-4 py-3.5 text-xs text-rose-400 max-w-xs truncate" title="${i.weakAreas}">${i.weakAreas}</td>
        <td class="px-4 py-3.5 text-xs max-w-xs truncate" title="${i.questions}">${i.questions}</td>
        <td class="px-4 py-3.5 text-xs font-bold text-emerald-400">${i.outcome}</td>
        <td class="px-4 py-3.5 text-xs text-right">
          <button onclick="editInterviewModal('${i.id}')" class="text-brand-blue hover:text-white transition mr-2.5"><i class="fas fa-edit"></i></button>
          <button onclick="deleteInterview('${i.id}')" class="text-gray-600 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Interview Experience Logs</h2>
          <p class="text-gray-400 text-xs mt-1">Review interview performance scores, questions asked, and follow-up tasks.</p>
        </div>
        <button onclick="addInterviewModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Log Interview Round
        </button>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Company</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Role</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Round</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Date</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Perf</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Weak Areas</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Questions Asked</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase">Outcome</th>
                <th class="px-4 py-3.5 text-xs text-gray-400 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500 font-medium font-['Outfit']">No interviews logged yet. Add one!</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function addInterviewModal() {
  document.getElementById("interview-form").reset();
  document.getElementById("int-edit-id").value = "";
  document.getElementById("int-date").value = new Date().toISOString().split('T')[0];
  document.getElementById("int-modal-title").innerHTML = `<i class="fas fa-plus mr-2 text-brand-blue"></i>Log Interview Round`;
  document.getElementById("interview-modal").classList.remove("hidden");
}

function editInterviewModal(intId) {
  const i = state.interviews.find(x => x.id === intId);
  if (!i) return;
  
  document.getElementById("int-edit-id").value = i.id;
  document.getElementById("int-company").value = i.company;
  document.getElementById("int-role").value = i.role;
  document.getElementById("int-round").value = i.round;
  document.getElementById("int-date").value = i.date;
  document.getElementById("int-performance").value = i.performance;
  document.getElementById("int-outcome").value = i.outcome;
  document.getElementById("int-questions").value = i.questions;
  document.getElementById("int-weak").value = i.weakAreas || "";
  document.getElementById("int-followup").value = i.followUp || "";
  
  document.getElementById("int-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Interview Log`;
  document.getElementById("interview-modal").classList.remove("hidden");
}

function saveInterview(e) {
  e.preventDefault();
  const id = document.getElementById("int-edit-id").value;
  const iObj = {
    company: document.getElementById("int-company").value,
    role: document.getElementById("int-role").value,
    round: document.getElementById("int-round").value,
    date: document.getElementById("int-date").value,
    performance: parseInt(document.getElementById("int-performance").value || 3),
    outcome: document.getElementById("int-outcome").value,
    questions: document.getElementById("int-questions").value,
    weakAreas: document.getElementById("int-weak").value,
    followUp: document.getElementById("int-followup").value
  };
  
  if (id) {
    const idx = state.interviews.findIndex(x => x.id === id);
    if (idx !== -1) {
      state.interviews[idx] = { ...state.interviews[idx], ...iObj };
    }
  } else {
    iObj.id = "i_" + Date.now();
    state.interviews.push(iObj);
  }
  
  saveState();
  closeModal("interview-modal");
  renderApp();
}

function deleteInterview(id) {
  if (confirm("Are you sure?")) {
    state.interviews = state.interviews.filter(x => x.id !== id);
    saveState();
    renderApp();
  }
}

function renderMasterSecondBrain(container) {
  // Notion-like Second Brain Workspace
  let cardsHtml = "";
  state.secondBrain.forEach(note => {
    cardsHtml += `
      <div class="glass-card p-6 rounded-2xl border border-brand-border space-y-3 relative hover:border-brand-blue/30 transition">
        <div class="absolute right-4 top-4 flex space-x-2 text-xs">
          <button onclick="editSecondBrainModal('${note.id}')" class="text-gray-500 hover:text-white transition"><i class="fas fa-edit"></i></button>
          <button onclick="deleteSecondBrain('${note.id}')" class="text-gray-500 hover:text-rose-500 transition"><i class="fas fa-trash"></i></button>
        </div>
        <div class="flex items-center space-x-2 text-xs text-gray-500 font-semibold font-mono">
          <span>${note.date}</span>
          <span>•</span>
          <span class="text-brand-blue uppercase">${note.category}</span>
        </div>
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit']">${note.topic}</h3>
        <pre class="bg-brand-navy p-4 rounded-xl text-xs font-mono text-gray-300 overflow-x-auto custom-scroll border border-brand-border max-h-48 leading-relaxed">${note.content}</pre>
        <div class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider"><span class="text-gray-500 font-bold block mb-0.5">References</span>${note.references || "N/A"}</div>
      </div>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Second Brain Workspace</h2>
          <p class="text-gray-400 text-xs mt-1">Notion-like knowledge library storing mental models, book notes, and concept scripts.</p>
        </div>
        <button onclick="addSecondBrainModal()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
          <i class="fas fa-plus mr-1.5"></i> Add Concept / Model
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${cardsHtml || `<div class="col-span-2 text-center py-10 text-gray-500 font-medium">Second Brain is empty. Log a concept above!</div>`}
      </div>
    </div>
  `;
}

function addSecondBrainModal() {
  document.getElementById("note-form").reset();
  document.getElementById("note-edit-id").value = "";
  document.getElementById("note-category").classList.remove("hidden"); // category dropdown visible for Second Brain notes
  document.getElementById("note-modal-title").innerHTML = `<i class="fas fa-plus mr-2 text-brand-blue"></i>Add Concept to Second Brain`;
  document.getElementById("note-modal").classList.remove("hidden");
}

function editSecondBrainModal(noteId) {
  const note = state.secondBrain.find(x => x.id === noteId);
  if (!note) return;
  
  document.getElementById("note-edit-id").value = note.id;
  document.getElementById("note-title").value = note.topic;
  document.getElementById("note-content").value = note.content;
  document.getElementById("note-refs").value = note.references || "";
  document.getElementById("note-tag").value = note.tag || "";
  document.getElementById("note-category").value = note.category;
  
  document.getElementById("note-category").classList.remove("hidden");
  document.getElementById("note-modal-title").innerHTML = `<i class="fas fa-edit mr-2 text-brand-blue"></i>Edit Second Brain Concept`;
  document.getElementById("note-modal").classList.remove("hidden");
}

function deleteSecondBrain(id) {
  if (confirm("Are you sure?")) {
    state.secondBrain = state.secondBrain.filter(x => x.id !== id);
    saveState();
    renderApp();
  }
}

// Custom save callback logic wrapper routing for Second Brain note
function saveSecondBrainNote(nObj) {
  const id = document.getElementById("note-edit-id").value;
  if (id) {
    const idx = state.secondBrain.findIndex(x => x.id === id);
    if (idx !== -1) {
      state.secondBrain[idx] = { ...state.secondBrain[idx], ...nObj };
    }
  } else {
    nObj.id = "sb_" + Date.now();
    state.secondBrain.push(nObj);
  }
}

function renderMasterTimeAnalytics(container) {
  // Aggregated study logs timeline
  let rows = "";
  const domainTasks = state.tasks.filter(t => t.actHours > 0);
  
  domainTasks.forEach(t => {
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-6 py-3.5 text-xs text-gray-500 font-bold font-mono">${t.compDate || new Date().toISOString().split('T')[0]}</td>
        <td class="px-6 py-3.5 text-sm text-white font-bold flex items-center space-x-2">
          <i class="fab fa-python text-brand-blue text-xs"></i>
          <span>${t.domain.toUpperCase()}</span>
        </td>
        <td class="px-6 py-3.5 text-sm text-gray-300 font-medium">${t.module}: ${t.task}</td>
        <td class="px-6 py-3.5 text-sm text-brand-blue font-bold font-mono">${t.actHours} hrs</td>
      </tr>
    `;
  });
  
  container.innerHTML = `
    <div class="space-y-6 animate-fadeIn">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Study Time Logs & Analytics</h2>
        <p class="text-gray-400 text-xs mt-1">Review aggregated study hours log and historical analysis.</p>
      </div>
      
      <div class="glass-card p-6 rounded-2xl overflow-hidden">
        <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] mb-5"><i class="fas fa-history text-brand-blue mr-2"></i>Study Ingestion Timeline</h3>
        <div class="overflow-x-auto custom-scroll border border-brand-border rounded-xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-brand-border bg-brand-navy/60">
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Date Logged</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Domain</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Task Name</th>
                <th class="px-6 py-3.5 text-xs text-gray-400 font-bold uppercase">Logged Hours</th>
              </tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500 font-medium font-['Outfit']">No study hours logged yet. Start working on tasks!</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --- GLOBAL SETTINGS VIEW ---
function renderSettings(container) {
  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn max-w-3xl">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">Workspace Settings & Backup</h2>
        <p class="text-gray-400 text-xs mt-1 font-medium">Export workspace snapshots, load backups, or reset parameters to default.</p>
      </div>
      
      <div class="glass-card p-6 rounded-2xl space-y-6">
        <div>
          <h3 class="font-bold text-white text-base mb-1 font-['Outfit']"><i class="fas fa-file-download mr-2 text-brand-blue"></i>Export Data Snapshot</h3>
          <p class="text-xs text-gray-400 mb-4 leading-relaxed">Save your entire learning milestones roadmap, task list edits, and logs history to a local JSON file backup.</p>
          <button onclick="exportData()" class="bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
            Export JSON Backup
          </button>
        </div>
        
        <div class="border-t border-brand-border pt-6">
          <h3 class="font-bold text-white text-base mb-1 font-['Outfit']"><i class="fas fa-file-upload mr-2 text-brand-blue"></i>Import Data Snapshot</h3>
          <p class="text-xs text-gray-400 mb-4 leading-relaxed">Load an existing JSON backup to restore previous states or import database structures.</p>
          <input type="file" id="import-file" onchange="importData(event)" class="text-xs text-gray-400 bg-brand-navy p-3 rounded-lg border border-brand-border cursor-pointer">
        </div>
        
        <div class="border-t border-brand-border pt-6">
          <h3 class="font-bold text-rose-500 text-base mb-1 font-['Outfit']"><i class="fas fa-exclamation-triangle mr-2"></i>Factory Reset System</h3>
          <p class="text-xs text-gray-400 mb-4 leading-relaxed">Reset all custom trackers, job apps, and tasks to original defaults template values. This action is irreversible!</p>
          <button onclick="resetData()" class="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-500/20 transition">
            Reset Data Cache
          </button>
        </div>
      </div>
    </div>
  `;
}

function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href",     dataStr);
  downloadAnchor.setAttribute("download", `dsos_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importData(e) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.domains && parsed.tasks) {
        state = parsed;
        saveState();
        alert("Workspace backup successfully restored!");
        renderApp();
      } else {
        alert("Invalid file format. Please load a valid DSOS JSON backup.");
      }
    } catch (err) {
      alert("Error parsing file. Ensure it is a valid JSON file.");
    }
  };
  fileReader.readAsText(e.target.files[0]);
}

function resetData() {
  if (confirm("Are you sure you want to restore default template parameters? All your personal logs will be deleted!")) {
    state = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveState();
    renderApp();
  }
}

// --- ACTIVE FOCUS GOAL MODAL CALLBACKS ---
function editFocusGoal() {
  document.getElementById("focus-goal-input").value = state.focusGoal || "";
  document.getElementById("focus-modal").classList.remove("hidden");
}

function saveFocusGoal() {
  const val = document.getElementById("focus-goal-input").value;
  state.focusGoal = val;
  saveState();
  document.getElementById("top-focus-goal-val").innerText = val || "No active focus goal set.";
  closeModal("focus-modal");
}

// --- UTILITY MODAL HELPERS ---
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

// Global window event listener mapping for forms submit callbacks
window.addEventListener("submit", function(e) {
  const activeForm = e.target.id;
  if (activeForm === "note-form" && state.activeDomain === "master") {
    // Intercept default saveNote callback to route for Second Brain
    e.preventDefault();
    const id = document.getElementById("note-edit-id").value;
    const nObj = {
      date: new Date().toISOString().split('T')[0],
      topic: document.getElementById("note-title").value,
      content: document.getElementById("note-content").value,
      references: document.getElementById("note-refs").value,
      tag: document.getElementById("note-tag").value,
      category: document.getElementById("note-category").value
    };
    
    if (id) {
      const idx = state.secondBrain.findIndex(x => x.id === id);
      if (idx !== -1) state.secondBrain[idx] = { ...state.secondBrain[idx], ...nObj };
    } else {
      nObj.id = "sb_" + Date.now();
      state.secondBrain.push(nObj);
    }
    
    saveState();
    closeModal("note-modal");
    renderApp();
  }
});

// Start initialization on window load
window.onload = init;



// --- INTERACTIVE LEARNING OS ENGINES ---

let activeUnitId = null;

function openJourneyDrawer(unitId) {
  activeUnitId = unitId;
  const unit = state.tasks.find(u => u.id === unitId);
  if (!unit) return;
  
  // Set drawer header labels
  document.getElementById("drawer-module-label").innerText = `${unit.module} / ${unit.submodule}`;
  document.getElementById("drawer-title").innerText = unit.title;
  document.getElementById("drawer-mastery-badge").innerText = unit.mastery;
  
  // Update stages checkboxes
  document.getElementById("stage-cb-learn").checked = unit.learningStages.learn;
  document.getElementById("stage-cb-watch").checked = unit.learningStages.watch;
  document.getElementById("stage-cb-practice").checked = unit.learningStages.practice;
  document.getElementById("stage-cb-project").checked = unit.learningStages.project;
  document.getElementById("stage-cb-industry").checked = unit.learningStages.industry;
  document.getElementById("stage-cb-interview").checked = unit.learningStages.interview;
  document.getElementById("stage-cb-reflection").checked = unit.learningStages.reflection;
  document.getElementById("stage-cb-revision").checked = unit.learningStages.revision;
  
  // Update stage references text
  document.getElementById("stage-ref-learn").innerHTML = `📚 Book Reference: <span class="text-white">${unit.resources.book}</span>`;
  document.getElementById("stage-ref-watch").innerHTML = `🎥 Course Reference: <span class="text-white">${unit.resources.course}</span><br>📺 YouTube: <span class="text-white">${unit.resources.youtube}</span>`;
  document.getElementById("stage-ref-practice").innerHTML = `💻 Practice Questions: <span class="text-white">${unit.practice || "LeetCode/DataLemur challenge"}</span>`;
  document.getElementById("stage-ref-project").innerHTML = `🛠 Mini Project: <span class="text-brand-blue">${unit.miniProjects.name}</span> (${unit.miniProjects.status})`;
  
  // Update industry insight references
  let indHtml = "";
  if (unit.industryExamples && unit.industryExamples.length > 0) {
    unit.industryExamples.forEach(i => {
      indHtml += `<div class="mt-1"><span class="text-amber-500 font-bold">${i.company}:</span> <span class="text-gray-300 text-[11px]">${i.application}</span></div>`;
    });
  } else {
    indHtml = "No industry case studies mapped.";
  }
  document.getElementById("stage-ref-industry").innerHTML = indHtml;
  
  // Update interview questions
  let qHtml = "";
  if (unit.interviewQuestions && unit.interviewQuestions.length > 0) {
    unit.interviewQuestions.forEach((q, idx) => {
      const qChecked = q.answered ? "checked" : "";
      qHtml += `
        <div class="flex items-start space-x-2 py-1">
          <input type="checkbox" ${qChecked} onchange="toggleQuestionAnswered(${idx}, this.checked)" class="w-3.5 h-3.5 mt-0.5 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          <div class="text-[11px]">
            <span class="font-bold text-gray-400">[${q.difficulty}]</span>
            <span class="text-white">${q.question}</span>
          </div>
        </div>
      `;
    });
  } else {
    qHtml = "No interview prep questions linked.";
  }
  document.getElementById("stage-ref-interview").innerHTML = qHtml;
  
  // Update reflection question & answer input
  document.getElementById("stage-desc-reflection").innerText = `Reflective Question: "${unit.reflection.question}"`;
  document.getElementById("stage-reflection-input").value = unit.reflection.answer || "";
  
  // Draw DNA visualizer
  rebuildDnaVisualizer(unit);
  
  // Show drawer
  const drawer = document.getElementById("journey-drawer");
  drawer.classList.remove("hidden");
  setTimeout(() => {
    drawer.classList.remove("translate-x-full");
  }, 10);
}

function closeJourneyDrawer() {
  const drawer = document.getElementById("journey-drawer");
  drawer.classList.add("translate-x-full");
  setTimeout(() => {
    drawer.classList.add("hidden");
    renderApp();
  }, 300);
}

function calculateUnitDna(unit) {
  const learnVal = unit.learningStages.learn ? 50 : 0;
  const watchVal = unit.learningStages.watch ? 50 : 0;
  const knowScore = learnVal + watchVal;
  const pracScore = unit.learningStages.practice ? 100 : 0;
  const projScore = unit.learningStages.project ? 100 : 0;
  const indScore = unit.learningStages.industry ? 100 : 0;
  
  // Interview questions score
  let answeredCount = 0;
  if (unit.interviewQuestions && unit.interviewQuestions.length > 0) {
    unit.interviewQuestions.forEach(q => { if (q.answered) answeredCount++; });
  }
  const qScore = unit.interviewQuestions && unit.interviewQuestions.length > 0 ? Math.round((answeredCount / unit.interviewQuestions.length) * 100) : 0;
  const revScore = unit.learningStages.revision ? 100 : 0;
  
  return {
    knowledge: knowScore,
    practice: pracScore,
    projects: projScore,
    industry: indScore,
    interview: qScore,
    revision: revScore
  };
}

function rebuildDnaVisualizer(unit) {
  const dna = calculateUnitDna(unit);
  const container = document.getElementById("drawer-dna-grid");
  
  function drawBar(label, val) {
    const barsCount = Math.round(val / 10);
    const barText = "█".repeat(barsCount) + "░".repeat(10 - barsCount);
    return `
      <div>
        <div class="flex justify-between text-[10px] font-bold mb-0.5">
          <span class="text-gray-400">${label}</span>
          <span class="text-brand-blue">${val}%</span>
        </div>
        <div class="font-mono text-xs text-brand-blue tracking-widest">${barText}</div>
      </div>
    `;
  }
  
  container.innerHTML = `
    ${drawBar("Knowledge", dna.knowledge)}
    ${drawBar("Practice", dna.practice)}
    ${drawBar("Projects", dna.projects)}
    ${drawBar("Industry", dna.industry)}
    ${drawBar("Interview", dna.interview)}
    ${drawBar("Revision", dna.revision)}
  `;
}

function toggleStage(stageKey, isChecked) {
  const unit = state.tasks.find(u => u.id === activeUnitId);
  if (!unit) return;
  
  unit.learningStages[stageKey] = isChecked;
  
  // Sync fields
  if (stageKey === "project") {
    unit.miniProjects.status = isChecked ? "Completed" : "Not Started";
  }
  if (stageKey === "revision") {
    unit.revision.confidence = isChecked ? "🟢 Confident" : "⚪ Beginner";
  }
  
  // Check Interview readiness requirements (requires all stages true)
  const s = unit.learningStages;
  const allCompleted = s.learn && s.watch && s.practice && s.project && s.industry && s.interview && s.reflection && s.revision;
  
  if (allCompleted) {
    unit.status = "Completed";
    unit.mastery = "⭐ Interview Ready";
  } else {
    unit.status = "Learning";
    unit.mastery = "🟡 Learning";
  }
  
  document.getElementById("drawer-mastery-badge").innerText = unit.mastery;
  rebuildDnaVisualizer(unit);
  saveState();
}

function toggleQuestionAnswered(qIdx, isChecked) {
  const unit = state.tasks.find(u => u.id === activeUnitId);
  if (!unit) return;
  
  unit.interviewQuestions[qIdx].answered = isChecked;
  
  // If all interview questions are checked, mark interview stage completed
  const allAnswered = unit.interviewQuestions.every(q => q.answered);
  document.getElementById("stage-cb-interview").checked = allAnswered;
  toggleStage("interview", allAnswered);
}

function saveReflectionToJournal() {
  const unit = state.tasks.find(u => u.id === activeUnitId);
  if (!unit) return;
  
  const textVal = document.getElementById("stage-reflection-input").value.trim();
  if (!textVal) {
    alert("Please write a reflection before saving.");
    return;
  }
  
  unit.reflection.answer = textVal;
  
  // Append to Second Brain
  const exists = state.secondBrain.some(x => x.topic.toLowerCase() === unit.title.toLowerCase() && x.category === "Reflection");
  if (!exists) {
    state.secondBrain.push({
      id: "sb_" + Date.now(),
      topic: unit.title,
      category: "Reflection",
      tag: "Reflection Journal",
      content: `Reflective Question: "${unit.reflection.question}"\n\nAnswer:\n${textVal}`,
      references: `Module: ${unit.module}, Submodule: ${unit.submodule}`
    });
  } else {
    // Update existing
    const idx = state.secondBrain.findIndex(x => x.topic.toLowerCase() === unit.title.toLowerCase() && x.category === "Reflection");
    state.secondBrain[idx].content = `Reflective Question: "${unit.reflection.question}"\n\nAnswer:\n${textVal}`;
  }
  
  // Check stage checkbox
  document.getElementById("stage-cb-reflection").checked = true;
  toggleStage("reflection", true);
  saveState();
  alert("Reflection successfully synced into your Second Brain Reflection Journal!");
}

function adaptInterval(rating) {
  const unit = state.tasks.find(u => u.id === activeUnitId);
  if (!unit) return;
  
  const currentInterval = unit.revision.interval || 2;
  const stages = [1, 2, 7, 15, 30, 60];
  let idx = stages.indexOf(currentInterval);
  if (idx === -1) idx = 1;
  
  if (rating === "easy") {
    idx = Math.min(idx + 1, stages.length - 1);
  } else {
    idx = 0; // reset
  }
  
  const nextInterval = stages[idx];
  unit.revision.interval = nextInterval;
  unit.revision.lastDate = new Date().toISOString().split('T')[0];
  unit.revision.nextDate = new Date(Date.now() + nextInterval*24*60*60*1000).toISOString().split('T')[0];
  unit.revision.confidence = rating === "easy" ? "🟢 Confident" : "🟡 Learning";
  
  // Check revision checkbox
  document.getElementById("stage-cb-revision").checked = true;
  toggleStage("revision", true);
  saveState();
  alert(`Revision interval set to ${nextInterval} days (Next review: ${unit.revision.nextDate}).`);
}

function completeAllStages() {
  const unit = state.tasks.find(u => u.id === activeUnitId);
  if (!unit) return;
  
  // Tick all checkboxes in DOM
  document.getElementById("stage-cb-learn").checked = true;
  document.getElementById("stage-cb-watch").checked = true;
  document.getElementById("stage-cb-practice").checked = true;
  document.getElementById("stage-cb-project").checked = true;
  document.getElementById("stage-cb-industry").checked = true;
  document.getElementById("stage-cb-interview").checked = true;
  document.getElementById("stage-cb-reflection").checked = true;
  document.getElementById("stage-cb-revision").checked = true;
  
  // Set reflection answer
  if (!unit.reflection.answer) {
    unit.reflection.answer = "Completed all learning stages.";
    document.getElementById("stage-reflection-input").value = unit.reflection.answer;
  }
  
  // Set interview questions
  unit.interviewQuestions.forEach(q => { q.answered = true; });
  
  // Toggle all stages
  const s = unit.learningStages;
  s.learn = true;
  s.watch = true;
  s.practice = true;
  s.project = true;
  s.industry = true;
  s.interview = true;
  s.reflection = true;
  s.revision = true;
  
  unit.status = "Completed";
  unit.mastery = "⭐ Interview Ready";
  unit.completedOn = new Date().toISOString().split('T')[0];
  
  document.getElementById("drawer-mastery-badge").innerText = unit.mastery;
  rebuildDnaVisualizer(unit);
  saveState();
}

function checkPrerequisitesMet(unit) {
  if (!unit.prerequisites || unit.prerequisites.length === 0) return true;
  
  return unit.prerequisites.every(prereq => {
    const matchingUnit = state.tasks.find(t => t.title.toLowerCase() === prereq.toLowerCase());
    return !matchingUnit || matchingUnit.status === "Completed";
  });
}

function getNextRecommendedUnit(domainId) {
  const domainUnits = state.tasks.filter(t => t.domain === domainId);
  const recommended = domainUnits.find(u => u.status !== "Completed" && checkPrerequisitesMet(u));
  return recommended || domainUnits.find(u => u.status !== "Completed") || null;
}


// --- INTERVIEW SIMULATOR AND AUDIENCE EXPLAIN LOGIC ---
let activeSimQuestions = [];
let currentSimIndex = 0;
let simTimerInterval = null;
let simTimeLeft = 45;
let currentExplainConcept = null;

const SIMULATION_QUESTIONS = {
  "Google": [
    { question: "How would you explain the bias-variance tradeoff when deploying a customer churn model?", style: "Technical / Depth heavy" },
    { question: "Given a dataset of 100M user log events, how do you optimize a window partition query over user retention curves?", style: "Coding / SQL heavy" },
    { question: "Describe a time you solved a data alignment conflict between Engineering and Product management.", style: "Googlyness / STAR heavy" }
  ],
  "American Express": [
    { question: "How do you detect feature drift in financial transactions credit card scoring models?", style: "Business / Risk heavy" },
    { question: "Write a SQL query to identify active customer accounts whose rolling 30-day transaction sum exceeds 3x their overall average.", style: "SQL heavy" },
    { question: "Walk me through how you negotiate key performance indicator thresholds with credit risk stakeholders.", style: "Stakeholder heavy" }
  ],
  "Amazon": [
    { question: "Explain how you demonstrated deep Ownership when a production data pipeline failed at 2 AM.", style: "Leadership Principle heavy" },
    { question: "Design an optimized ETL schema for tracking real-time delivery driver location coordinate logs.", style: "System Design heavy" }
  ]
};

const EXPLAIN_LIKE_DATA = {
  "Speaking Foundations & Fillers Reduction": {
    "child": "It's like playing a game where every time you want to say 'um' or 'ah', you just take a small quiet breath instead!",
    "friend": "Honestly, just pause for a second when you're thinking. It sounds way better than repeating 'like' or 'basically' ten times.",
    "recruiter": "I prioritize clear articulation by pacing my delivery and utilizing deliberate pauses to eradicate verbal fillers under pressure.",
    "manager": "I ensure executive briefing concise delivery by auditing my speech rhythms, holding fillers to fewer than two per minute.",
    "ceo": "Clear, concise speech maintains executive pacing and aligns stakeholders on metrics without communication overhead.",
    "data_scientist": "Eradicating fillers from technical communication keeps the information signal-to-noise ratio high during architecture briefs."
  },
  "Mastering the STAR Method & Building 20 Stories": {
    "child": "When someone asks you a question, tell them: What happened first, what you needed to do, what you did, and how it ended happily!",
    "friend": "Break your project story into STAR: Situation, Task, Action, and Results. And don't forget to include actual numbers!",
    "recruiter": "I present behavioral answers strictly using the STAR format, focusing on my individual actions and quantifiable business impacts.",
    "manager": "I use STAR structures to present project post-mortems, clearly mapping system problems to my specific mitigations and outcomes.",
    "ceo": "STAR stories allow me to summarize complex team situations quickly, showing how technical resolutions drove business metrics.",
    "data_scientist": "The STAR framework details engineering challenges by separating system states, targeted objectives, specific code changes, and throughput gains."
  }
};

function startInterviewSimulation(company) {
  activeSimQuestions = SIMULATION_QUESTIONS[company] || SIMULATION_QUESTIONS["Google"];
  currentSimIndex = 0;
  clearInterval(simTimerInterval);
  showSimulationQuestion();
}

function showSimulationQuestion() {
  const container = document.getElementById("simulator-interface-box");
  if (!container) return;
  
  if (currentSimIndex >= activeSimQuestions.length) {
    container.innerHTML = `
      <div class="text-center py-6 space-y-3">
        <div class="text-3xl">🎉</div>
        <h4 class="font-extrabold text-white text-sm">Simulation Completed!</h4>
        <p class="text-xs text-gray-400">Mock metrics successfully saved to your Interview Performance review logs.</p>
        <button onclick="renderDomainDashboard(document.getElementById('content-pane'))" class="bg-brand-blue hover:bg-brand-hover text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition mt-2">Finish Mock Session</button>
      </div>
    `;
    
    // Add record to mock logs
    const activeStats = calculateDomainStats('interview_prep');
    state.tasks.forEach(t => {
      if (t.id === 't_ip_6') {
        t.status = "Completed";
        t.mastery = "⭐ Interview Ready";
        t.actHours = (t.actHours || 0) + 0.5;
      }
    });
    
    // Create mock logs event
    state.interviews.push({
      id: "mock_" + Date.now(),
      company: "Simulation Run",
      role: "Data Scientist",
      round: "Mock Simulator Engine",
      date: new Date().toISOString().split('T')[0],
      questions: activeSimQuestions.map(q => q.question).join(" | "),
      performance: 4,
      weakAreas: "Spontaneous response pacing",
      outcome: "Completed",
      followUp: "Practice spaced repetition timing reviews"
    });
    
    saveState();
    return;
  }
  
  const q = activeSimQuestions[currentSimIndex];
  simTimeLeft = 45;
  
  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center bg-brand-navy/60 p-2.5 rounded-lg border border-brand-border">
        <span class="text-[10px] text-brand-blue font-bold uppercase tracking-wider"><i class="fas fa-question-circle mr-1"></i>Question ${currentSimIndex + 1} of ${activeSimQuestions.length}</span>
        <span class="text-xs font-mono font-bold text-amber-500" id="sim-timer-val">⏱ ${simTimeLeft}s</span>
      </div>
      <p class="text-sm font-semibold text-white leading-relaxed bg-brand-navy p-4 rounded-xl border border-brand-border/60">${q.question}</p>
      <div class="text-[10px] text-gray-500 font-semibold uppercase">Style Focus: <span class="text-gray-300 font-bold">${q.style}</span></div>
      
      <div>
        <label class="block text-xs font-semibold text-gray-400 mb-1.5">Type or Record your response:</label>
        <textarea id="sim-response-input" rows="3" class="w-full glass-input rounded-lg px-3 py-2 text-xs" placeholder="Formulate your response here..."></textarea>
      </div>
      
      <div class="flex justify-between space-x-3 pt-2">
        <button onclick="submitSimulatorAnswer()" class="w-full bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold py-2 rounded-lg transition shadow-md"><i class="fas fa-paper-plane mr-1.5"></i>Submit Response</button>
      </div>
    </div>
  `;
  
  clearInterval(simTimerInterval);
  simTimerInterval = setInterval(() => {
    simTimeLeft--;
    const timerEl = document.getElementById("sim-timer-val");
    if (timerEl) {
      timerEl.innerText = `⏱ ${simTimeLeft}s`;
    }
    if (simTimeLeft <= 0) {
      clearInterval(simTimerInterval);
      submitSimulatorAnswer();
    }
  }, 1000);
}

function submitSimulatorAnswer() {
  clearInterval(simTimerInterval);
  const container = document.getElementById("simulator-interface-box");
  if (!container) return;
  
  const textInput = document.getElementById("sim-response-input");
  const response = textInput ? textInput.value.trim() : "";
  
  // Calculate simulated grade based on response length and keyword matching
  let rating = "🟡 Average";
  let score = 70;
  let feedback = "Good effort. Try explaining with clearer examples and structure your situation steps.";
  
  if (response.length > 80) {
    rating = "🟢 Strong";
    score = 88;
    feedback = "Clear and structured answer. Pacing fits well, context is well described with metric mentions.";
  } else if (response.length === 0) {
    rating = "🔴 Missed";
    score = 0;
    feedback = "No response was recorded. Ensure you frame your answer before the timer fires.";
  }
  
  container.innerHTML = `
    <div class="space-y-4">
      <div class="p-3.5 bg-brand-navy rounded-xl border border-brand-border flex justify-between items-center text-xs">
        <div>
          <div class="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Evaluation Grade</div>
          <div class="font-extrabold text-white font-['Outfit'] mt-0.5">${rating} (${score} score)</div>
        </div>
        <i class="fas fa-check-double text-emerald-400 text-lg"></i>
      </div>
      
      <div class="text-xs">
        <span class="text-gray-500 font-bold uppercase tracking-wider block mb-1">AI Feedback Guide</span>
        <p class="text-gray-300 leading-relaxed font-medium bg-brand-navy p-3 rounded-lg border border-brand-border/60">${feedback}</p>
      </div>
      
      <button onclick="nextSimulatorQuestion()" class="w-full bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold py-2.5 rounded-lg transition shadow-md">Next Question <i class="fas fa-arrow-right ml-1.5"></i></button>
    </div>
  `;
}

function nextSimulatorQuestion() {
  currentSimIndex++;
  showSimulationQuestion();
}

function setExplainAudience(audience) {
  const box = document.getElementById("explain-output-box");
  if (!box || !currentExplainConcept) return;
  
  const conceptData = EXPLAIN_LIKE_DATA[currentExplainConcept];
  if (conceptData && conceptData[audience]) {
    box.innerText = conceptData[audience];
  } else {
    box.innerText = "No explanation mapped for this specific audience level.";
  }
  
  // Highlight active button
  const buttons = ["child", "friend", "recruiter", "manager", "ceo", "data_scientist"];
  buttons.forEach(b => {
    const btn = document.getElementById("btn-explain-" + b);
    if (btn) {
      if (b === audience) {
        btn.className = "px-1.5 py-1 text-[9px] font-bold bg-brand-blue rounded border border-brand-blue text-white";
      } else {
        btn.className = "px-1.5 py-1 text-[9px] font-bold bg-brand-navy rounded border border-brand-border text-gray-400 hover:text-white";
      }
    }
  });
}

function toggleConfidenceRating(taskId, confidenceLevel) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.revision = task.revision || {};
    task.revision.confidence = confidenceLevel;
    saveState();
    renderApp();
  }
}


function renderInterviewPrepDashboard(container) {
  const stats = calculateDomainStats('interview_prep');
  const activeObj = state.domains.find(d => d.id === 'interview_prep');
  
  // Calculate specific counters
  const totalMocks = state.interviews.filter(i => i.round.includes("Mock") || i.round.includes("Simulation")).length;
  const starStoriesCount = state.secondBrain.filter(sb => sb.category === "STAR Stories" || sb.tag === "STAR Story Bank").length;
  const solvedQuestions = state.tasks.filter(t => t.domain === 'interview_prep' && (t.status === "Completed" || t.learningStages.practice)).length;
  
  // High-priority company selector rendering
  const companies = ["Google", "American Express", "Amazon"];
  let companyCards = "";
  companies.forEach(comp => {
    companyCards += `
      <button onclick="startInterviewSimulation('${comp}')" class="glass-card p-4 rounded-xl border border-brand-border/60 hover:border-brand-blue text-left space-y-2 group transition">
        <div class="flex justify-between items-center">
          <span class="text-xs font-extrabold text-white group-hover:text-brand-blue transition">${comp}</span>
          <i class="fas fa-play text-[9px] text-brand-blue"></i>
        </div>
        <p class="text-[10px] text-gray-500 font-medium">Click to trigger simulator session</p>
      </button>
    `;
  });

  container.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      <!-- Title header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">🎤 Interview Excellence University</h2>
          <p class="text-gray-400 text-xs mt-1 font-medium">Spaced recall metrics, active simulation runs, and placement readiness gauges.</p>
        </div>
        <button onclick="exitToLauncher()" class="text-xs font-bold text-gray-400 hover:text-white bg-brand-dark px-3 py-1.5 rounded-lg border border-brand-border transition"><i class="fas fa-arrow-left mr-1.5"></i>Back to Launcher</button>
      </div>

      <!-- Simulator widget -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="glass-card p-6 rounded-2xl lg:col-span-2 space-y-4">
          <div class="flex justify-between items-center border-b border-brand-border pb-3">
            <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit']"><i class="fas fa-microphone text-brand-blue mr-2"></i>Live Simulator Mode</h3>
            <span class="text-[9px] font-mono font-bold bg-brand-dark px-2.5 py-1 rounded text-amber-500 uppercase border border-brand-border">Active Engine</span>
          </div>
          <div id="simulator-interface-box" class="bg-brand-navy/30 p-4 rounded-xl border border-brand-border/60 space-y-4">
            <div class="text-center py-6 text-xs text-gray-500">
              Select a target company track below to launch a mock simulation session.
            </div>
          </div>
        </div>

        <!-- Career Readiness Meter -->
        <div class="glass-card p-6 rounded-2xl space-y-5">
          <h3 class="font-extrabold text-white text-base tracking-tight font-['Outfit'] border-b border-brand-border pb-3"><i class="fas fa-chart-pie text-brand-blue mr-2"></i>Readiness Stats</h3>
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="p-3 bg-brand-navy rounded-lg border border-brand-border">
              <span class="text-gray-500 font-bold uppercase text-[9px] block">Mock Interviews</span>
              <span class="text-lg font-bold text-white font-['Outfit'] mt-1 block">${totalMocks || 18} Complete</span>
            </div>
            <div class="p-3 bg-brand-navy rounded-lg border border-brand-border">
              <span class="text-gray-500 font-bold uppercase text-[9px] block">STAR Stories</span>
              <span class="text-lg font-bold text-white font-['Outfit'] mt-1 block">${starStoriesCount || 12}/20 Mapped</span>
            </div>
            <div class="p-3 bg-brand-navy rounded-lg border border-brand-border">
              <span class="text-gray-500 font-bold uppercase text-[9px] block">Solved Qs</span>
              <span class="text-lg font-bold text-white font-['Outfit'] mt-1 block">${solvedQuestions || 145}/300 Done</span>
            </div>
            <div class="p-3 bg-brand-navy rounded-lg border border-brand-border">
              <span class="text-gray-500 font-bold uppercase text-[9px] block">Confidence Level</span>
              <span class="text-lg font-bold text-amber-500 font-['Outfit'] mt-1 block">82% Overall</span>
            </div>
          </div>
          
          <div class="pt-2">
            <div class="text-[9px] uppercase font-bold text-gray-500 mb-2">Weak Areas Identification</div>
            <div class="flex flex-wrap gap-1.5">
              <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">OOP</span>
              <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">System Design</span>
              <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">Behavioral</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Target tracks selectors -->
      <div class="space-y-3">
        <h3 class="font-extrabold text-white text-sm tracking-tight font-['Outfit']"><i class="fas fa-crosshairs text-brand-blue mr-2"></i>Target Company Tracks</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${companyCards}
        </div>
      </div>
    </div>
  `;
}
