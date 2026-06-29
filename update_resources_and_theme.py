import os

# Paths
HTML_PATH = r"D:\DSOS\index.html"
JS_PATH = r"D:\DSOS\app.js"

# --- RESTYLING INDEX.HTML ---
def restyle_html():
    print("Updating index.html theme colors...")
    with open(HTML_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Modify Tailwind Config to Red Theme
    old_config = """          colors: {
            brand: {
              navy: '#0B0F19',
              dark: '#1E293B',
              slate: '#334155',
              blue: '#3A86C8',
              hover: '#2E6BA2',
              ice: '#F1F5F9',
              border: 'rgba(255,255,255,0.06)'
            }
          },"""

    new_config = """          colors: {
            brand: {
              navy: '#120404',
              dark: '#240A0A',
              slate: '#3B1212',
              blue: '#E53E3E',
              hover: '#C53030',
              ice: '#FFF5F5',
              border: 'rgba(239,68,68,0.1)'
            }
          },"""

    content = content.replace(old_config, new_config)

    # Modify Body background style
    old_body_style = """    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background-color: #0B0F19;
      color: #F1F5F9;
    }"""

    new_body_style = """    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background-color: #0B0303;
      color: #FEE2E2;
    }"""

    content = content.replace(old_body_style, new_body_style)
    
    # Replace glass card styles for red glow
    old_glass = """    .glass-card {
      background: rgba(30, 41, 59, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }"""
    
    new_glass = """    .glass-card {
      background: rgba(38, 12, 12, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(239, 68, 68, 0.08);
    }"""
    content = content.replace(old_glass, new_glass)

    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("[+] index.html successfully restyled to premium Red Theme.")

# --- UPDATING APP.JS ---
def update_js():
    print("Updating app.js resources and charts...")
    with open(JS_PATH, "r", encoding="utf-8") as f:
        js_code = f.read()

    # Change Chart.js colors to Red Theme
    js_code = js_code.replace("'rgba(58, 134, 200, 0.45)'", "'rgba(229, 62, 62, 0.45)'")
    js_code = js_code.replace("'#3A86C8'", "'#E53E3E'")
    
    # 1. Inject getResourceClassification and toggleResource helper functions at the top of the file
    helpers_code = """
// --- RESOURCES HELPERS ---
function getResourceClassification(r) {
  const nameLower = (r.name || "").toLowerCase();
  const typeLower = (r.type || "").toLowerCase();
  const platformNames = ["leetcode", "codewars", "exercism", "kaggle", "hackerrank", "datalemur", "stratascratch", "leetcode sql", "hackerrank sql"];
  
  if (typeLower === "book") {
    return "book";
  } else if (platformNames.some(p => nameLower.includes(p)) || typeLower === "platform") {
    return "platform";
  } else {
    return "website";
  }
}

function toggleResource(resId, isChecked) {
  const res = state.resources.find(r => r.id === resId);
  if (res) {
    res.progress = isChecked ? 100 : 0;
    saveState();
    renderApp();
  }
}
"""
    # Let's insert helpers right after the state definition
    js_code = js_code.replace("let state = {};", "let state = {};\n" + helpers_code)

    # 2. Replace renderDomainResources
    domain_resources_replacement = """function renderDomainResources(container) {
  const domainRes = state.resources.filter(r => r.domain === state.activeDomain);
  
  const books = domainRes.filter(r => getResourceClassification(r) === 'book');
  const websites = domainRes.filter(r => getResourceClassification(r) === 'website');
  const platforms = domainRes.filter(r => getResourceClassification(r) === 'platform');
  
  let booksRows = "";
  books.forEach(r => {
    const isChecked = r.progress === 100 ? "checked" : "";
    booksRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.author}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs"><span class="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500">${r.priority}</span></td>
        <td class="px-4 py-3 text-xs text-gray-300 font-medium">${r.recommended || "All"}</td>
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
    const isChecked = r.progress === 100 ? "checked" : "";
    webRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.author || 'N/A'}</td>
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
    const isChecked = r.progress === 100 ? "checked" : "";
    platRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.author || 'N/A'}</td>
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
}"""

    # We will search for renderDomainResources and replace it
    # Find start index of function renderDomainResources
    start_str = "function renderDomainResources(container) {"
    # We find where it ends by looking for the next function, which is updateResProgress
    end_str = "function updateResProgress(resId, value) {"
    
    start_idx = js_code.find(start_str)
    end_idx = js_code.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        js_code = js_code[:start_idx] + domain_resources_replacement + "\n\n" + js_code[end_idx:]
        print("[+] renderDomainResources successfully replaced.")
    else:
        print("[-] Error locating renderDomainResources function boundaries.")

    # 3. Replace renderMasterResources
    master_resources_replacement = """function renderMasterResources(container) {
  const books = state.resources.filter(r => getResourceClassification(r) === 'book');
  const websites = state.resources.filter(r => getResourceClassification(r) === 'website');
  const platforms = state.resources.filter(r => getResourceClassification(r) === 'platform');
  
  let booksRows = "";
  books.forEach(r => {
    const isChecked = r.progress === 100 ? "checked" : "";
    booksRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.author}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
      </tr>
    `;
  });

  let webRows = "";
  websites.forEach(r => {
    const isChecked = r.progress === 100 ? "checked" : "";
    webRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.author || 'N/A'}</td>
        <td class="px-4 py-3 text-xs font-semibold text-gray-400">${r.difficulty}</td>
        <td class="px-4 py-3 text-xs text-gray-400 max-w-xs truncate" title="${r.notes || ''}">${r.notes || 'N/A'}</td>
      </tr>
    `;
  });

  let platRows = "";
  platforms.forEach(r => {
    const isChecked = r.progress === 100 ? "checked" : "";
    platRows += `
      <tr class="hover:bg-brand-dark/20 border-b border-brand-border/60 transition">
        <td class="px-4 py-3 text-center">
          <input type="checkbox" ${isChecked} onchange="toggleResource('${r.id}', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25">
        </td>
        <td class="px-4 py-3 text-sm text-white font-bold">${r.name}</td>
        <td class="px-4 py-3 text-xs text-brand-blue font-bold uppercase">${r.domain}</td>
        <td class="px-4 py-3 text-xs text-gray-400 font-semibold">${r.author || 'N/A'}</td>
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

    # We find start index of function renderMasterResources
    start_str_m = "function renderMasterResources(container) {"
    # Ends right before renderMasterApplications or the next function
    end_str_m = "function renderMasterApplications(container) {"
    
    start_idx_m = js_code.find(start_str_m)
    end_idx_m = js_code.find(end_str_m)
    
    if start_idx_m != -1 and end_idx_m != -1:
        js_code = js_code[:start_idx_m] + master_resources_replacement + "\n\n" + js_code[end_idx_m:]
        print("[+] renderMasterResources successfully replaced.")
    else:
        print("[-] Error locating renderMasterResources function boundaries.")

    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_code)
    print("[+] app.js successfully updated with separated resource lists and checkboxes.")

if __name__ == "__main__":
    restyle_html()
    update_js()
