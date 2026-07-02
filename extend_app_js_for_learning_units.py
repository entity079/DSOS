JS_PATH = r"D:\DSOS\app.js"

additional_js = """

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
      content: `Reflective Question: "${unit.reflection.question}"\\n\\nAnswer:\\n${textVal}`,
      references: `Module: ${unit.module}, Submodule: ${unit.submodule}`
    });
  } else {
    // Update existing
    const idx = state.secondBrain.findIndex(x => x.topic.toLowerCase() === unit.title.toLowerCase() && x.category === "Reflection");
    state.secondBrain[idx].content = `Reflective Question: "${unit.reflection.question}"\\n\\nAnswer:\\n${textVal}`;
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
"""

def update_app_js():
    with open(JS_PATH, "r", encoding="utf-8") as f:
        code = f.read()

    # 1. Append the new study session engines at the end of the file
    code = code + "\n" + additional_js

    # 2. Make task title column clickable in renderDomainTasks
    target_row = '<td class="px-4 py-3 text-sm text-white font-medium max-w-xs truncate" title="${t.title}">${t.title}</td>'
    replacement_row = '<td class="px-4 py-3 text-sm text-white font-bold max-w-xs truncate hover:text-brand-blue cursor-pointer" onclick="openJourneyDrawer(\'${t.id}\')" title="Open Interactive Journey for ${t.title}">${t.title}</td>'
    code = code.replace(target_row, replacement_row)

    # 3. Add Next Recommended Step element inside renderDomainDashboard
    # Find activeObj block in renderDomainDashboard
    dashboard_header_target = '<div>\n          <h2 class="text-2xl font-extrabold text-white tracking-tight font-[\'Outfit\']">${activeObj ? activeObj.name : "Domain"} Learning OS</h2>\n          <p class="text-gray-400 text-xs mt-1">Domain learning metrics, active daily missions, and progress gamification details.</p>\n        </div>'
    
    next_step_injector = """
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
    """
    
    # We will inject the recommendation builder and insert ${nextStepHtml} right before the KPI Grid inside renderDomainDashboard
    # Let's find: container.innerHTML = `
    dashboard_inner_html_start = 'container.innerHTML = `'
    idx = code.find(dashboard_inner_html_start)
    if idx != -1:
        # Insert calculations before container.innerHTML
        code = code[:idx] + next_step_injector + "\n  " + code[idx:]
        print("[+] Next Step injector logic added.")
        
        # Now find where to insert ${nextStepHtml} in the template literal.
        # Let's insert it right after:
        # </button>\n      </div>
        inner_header_end = '</button>\n      </div>'
        idx_inner = code.find(inner_header_end, idx)
        if idx_inner != -1:
            code = code[:idx_inner + len(inner_header_end)] + "\n      ${nextStepHtml}" + code[idx_inner + len(inner_header_end):]
            print("[+] Next Step HTML template added.")
        else:
            print("[-] Inner header end not found.")
    else:
        print("[-] container.innerHTML start not found in renderDomainDashboard.")

    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write(code)
    print("[+] app.js successfully fully updated with Interactive LOS features!")

if __name__ == "__main__":
    update_app_js()
