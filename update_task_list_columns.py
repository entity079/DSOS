import os

JS_PATH = r"D:\DSOS\app.js"

def update_task_list():
    print("Reading app.js...")
    with open(JS_PATH, "r", encoding="utf-8") as f:
        code = f.read()

    # 1. Define helper functions
    helpers = """
// --- TASK CUSTOM HELPERS ---
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
    if (isChecked) {
      task.compDate = new Date().toISOString().split('T')[0];
      task.mastery = "🟢 Confident";
    } else {
      task.compDate = "";
      task.mastery = "⚪ Beginner";
    }
    saveState();
    renderApp();
  }
}

function addTopicToRevision(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    const exists = state.revisions.some(r => r.topic.toLowerCase() === task.task.toLowerCase());
    if (exists) {
      alert(`"${task.task}" is already in your Revision Tracker queue.`);
      return;
    }
    state.revisions.push({
      id: "rev_" + Date.now(),
      topic: task.task,
      lastDate: new Date().toISOString().split('T')[0],
      confidence: "🟡 Learning",
      nextDate: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0] // default review in 2 days
    });
    saveState();
    alert(`Successfully added "${task.task}" to your Revision Tracker queue!`);
    renderApp();
  }
}
"""
    # Insert helper code after state definition
    code = code.replace("let state = {};", "let state = {};\n" + helpers)

    # 2. Replace renderDomainTasks
    new_render_domain_tasks = """function renderDomainTasks(container) {
  const domainTasks = state.tasks.filter(t => t.domain === state.activeDomain);
  
  let rows = "";
  domainTasks.forEach(t => {
    const isCompleted = t.status === "Completed";
    const isChecked = isCompleted ? "checked" : "";
    
    rows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleTaskCompletion('${t.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
        </td>
        <td class="px-4 py-3 text-xs font-bold text-brand-blue">${t.module}</td>
        <td class="px-4 py-3 text-sm text-white font-medium max-w-xs truncate" title="${t.task}">${t.task}</td>
        <td class="px-4 py-3 text-xs text-gray-300 max-w-xs truncate" title="${t.resource || ''}">${linkify(t.resource)}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-semibold max-w-xs truncate" title="${t.question || ''}">${linkify(t.question)}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded font-bold ${t.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-gray-700/30 text-gray-400'}">${t.priority}</span></td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${t.difficulty}</td>
        <td class="px-4 py-3 text-xs font-mono text-gray-400">${t.estHours}h</td>
        <td class="px-4 py-3">
          <input type="number" step="0.5" value="${t.actHours || 0}" onchange="updateTaskHours('${t.id}', this.value)" class="w-14 bg-brand-navy/60 border border-brand-border/80 text-white rounded text-center text-xs py-0.5">
        </td>
        <td class="px-4 py-3 text-center">
          <button onclick="addTopicToRevision('${t.id}')" class="bg-brand-navy border border-brand-border hover:border-brand-blue/50 text-gray-400 hover:text-brand-blue text-[10px] font-bold px-2.5 py-1 rounded transition" title="Schedule revision for this topic">
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
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Study Resources</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase">Question to Practice</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-16">Priority</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-16">Diff</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-16">Est</th>
                <th class="px-4 py-3 text-xs text-gray-400 font-bold uppercase w-20">Act</th>
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
    </div>
  `;
}"""

    # We find start of renderDomainTasks
    start_str = "function renderDomainTasks(container) {"
    # We find where it ends by looking for the next function, which is updateTaskStatus
    end_str = "function updateTaskStatus(taskId, value) {"
    
    start_idx = code.find(start_str)
    end_idx = code.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        code = code[:start_idx] + new_render_domain_tasks + "\n\n" + code[end_idx:]
        print("[+] renderDomainTasks successfully replaced in memory.")
    else:
        print("[-] Error locating renderDomainTasks boundaries.")

    # 3. Update editTaskModal and saveTask references to question instead of deps
    code = code.replace('document.getElementById("task-deps").value = task.deps || "";', 'document.getElementById("task-question").value = task.question || "";')
    code = code.replace('deps: document.getElementById("task-deps").value', 'question: document.getElementById("task-question").value')
    print("[+] Form parameters updated to link 'question' input instead of 'deps'.")

    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write(code)
    print("[+] app.js successfully saved.")

if __name__ == "__main__":
    update_task_list()
