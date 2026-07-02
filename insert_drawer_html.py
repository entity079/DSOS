HTML_PATH = r"D:\DSOS\index.html"

drawer_html = """  <!-- 5. Interactive Learning Journey Drawer -->
  <div id="journey-drawer" class="fixed inset-y-0 right-0 max-w-xl w-full bg-brand-navy/95 backdrop-blur-md border-l border-brand-border z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-2xl hidden">
    <!-- Header -->
    <div class="flex justify-between items-center p-6 border-b border-brand-border bg-brand-navy/55">
      <div>
        <div class="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5" id="drawer-module-label">Module / Submodule</div>
        <h3 class="text-lg font-bold text-white font-['Outfit']" id="drawer-title">Learning Unit Topic</h3>
      </div>
      <div class="flex items-center space-x-3">
        <span id="drawer-mastery-badge" class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-dark border border-brand-border text-brand-blue">⚪ Beginner</span>
        <button onclick="closeJourneyDrawer()" class="text-gray-400 hover:text-white transition"><i class="fas fa-times"></i></button>
      </div>
    </div>

    <!-- Body Scrollable Content -->
    <div class="flex-1 p-6 overflow-y-auto custom-scroll space-y-6">
      
      <!-- Learning DNA Panel -->
      <div class="glass-card p-4 rounded-xl border border-brand-border">
        <div class="text-xs font-bold text-white mb-3 tracking-tight font-['Outfit']"><i class="fas fa-dna text-brand-blue mr-1.5"></i>Learning DNA Mastery</div>
        <div class="grid grid-cols-2 gap-x-4 gap-y-3" id="drawer-dna-grid">
          <!-- Populated dynamically via JS -->
        </div>
      </div>

      <!-- Time / Timing Guides -->
      <div class="flex items-center justify-between bg-brand-dark/30 border border-brand-border/40 p-3 rounded-lg text-[10px]">
        <div class="text-gray-400 font-semibold uppercase"><i class="fas fa-hourglass-half text-brand-blue mr-1"></i>Study Session Suggestion: ~2h total</div>
        <div class="text-gray-500 font-medium">Or complete individual stages independently</div>
      </div>

      <!-- Learning Cycle 8 Stages -->
      <div class="space-y-4" id="drawer-stages-list">
        <!-- Step 1: Learn -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-book text-brand-blue mr-1.5"></i>Stage 1: 📖 Learn (20m)</span>
            <input type="checkbox" id="stage-cb-learn" onchange="toggleStage('learn', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-2" id="stage-desc-learn">Study concepts using textbook materials, official references, or articles.</p>
          <div class="text-[10px] text-brand-blue font-bold truncate" id="stage-ref-learn">Book Ref</div>
        </div>

        <!-- Step 2: Watch -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-play text-brand-blue mr-1.5"></i>Stage 2: 🎥 Watch (15m)</span>
            <input type="checkbox" id="stage-cb-watch" onchange="toggleStage('watch', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-2" id="stage-desc-watch">Follow visual walkthroughs, video lessons, or code tutorials.</p>
          <div class="text-[10px] text-brand-blue font-bold truncate" id="stage-ref-watch">Video Course Ref</div>
        </div>

        <!-- Step 3: Practice -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-keyboard text-brand-blue mr-1.5"></i>Stage 3: 💻 Practice (30m)</span>
            <input type="checkbox" id="stage-cb-practice" onchange="toggleStage('practice', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-2" id="stage-desc-practice">Immediate execution on practice platforms.</p>
          <div class="text-[10px] text-brand-blue font-bold truncate" id="stage-ref-practice">Practice Platform Ref</div>
        </div>

        <!-- Step 4: Mini Project -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-tools text-brand-blue mr-1.5"></i>Stage 4: 🏗 Mini Project (30m)</span>
            <input type="checkbox" id="stage-cb-project" onchange="toggleStage('project', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-2" id="stage-desc-project">Apply the concept in a modular build project.</p>
          <div class="text-[10px] text-white font-extrabold" id="stage-ref-project">Project Scope</div>
        </div>

        <!-- Step 5: Industry Insight -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-industry text-brand-blue mr-1.5"></i>Stage 5: 🌍 Industry Insight (10m)</span>
            <input type="checkbox" id="stage-cb-industry" onchange="toggleStage('industry', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-2" id="stage-desc-industry">Real-world production usage cases and company frameworks.</p>
          <div class="text-[10px] text-gray-300 font-medium" id="stage-ref-industry">Industry Use Cases</div>
        </div>

        <!-- Step 6: Interview Questions -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-question-circle text-brand-blue mr-1.5"></i>Stage 6: 🎯 Interview Questions (15m)</span>
            <input type="checkbox" id="stage-cb-interview" onchange="toggleStage('interview', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-3" id="stage-desc-interview">Review common questions. Expand below to prepare responses.</p>
          <div class="space-y-2" id="stage-ref-interview">
            <!-- Interview questions checklist dynamically added -->
          </div>
        </div>

        <!-- Step 7: Reflection -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-brain text-brand-blue mr-1.5"></i>Stage 7: 🧠 Reflection (5m)</span>
            <input type="checkbox" id="stage-cb-reflection" onchange="toggleStage('reflection', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-3" id="stage-desc-reflection">Reflection Question...</p>
          <textarea id="stage-reflection-input" rows="2" class="w-full glass-input rounded-lg px-2.5 py-1.5 text-[11px] mb-2" placeholder="Write your reflection response here..."></textarea>
          <button onclick="saveReflectionToJournal()" class="bg-brand-navy border border-brand-border hover:border-brand-blue/50 text-[10px] text-brand-blue font-bold px-2 py-1 rounded transition">
            <i class="fas fa-save mr-1.5"></i>Save to Second Brain Journal
          </button>
        </div>

        <!-- Step 8: Revision -->
        <div class="glass-card p-4 rounded-xl border border-brand-border/80">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-extrabold text-white"><i class="fas fa-history text-brand-blue mr-1.5"></i>Stage 8: 🔁 Revision (5m)</span>
            <input type="checkbox" id="stage-cb-revision" onchange="toggleStage('revision', this.checked)" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border cursor-pointer">
          </div>
          <p class="text-[11px] text-gray-400 mb-3" id="stage-desc-revision">Adapt spaced repetition intervals based on retention reviews.</p>
          <div class="flex space-x-2">
            <button onclick="adaptInterval('easy')" class="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 text-[9px] font-bold px-2 py-1 rounded transition">Easy (Extend days)</button>
            <button onclick="adaptInterval('hard')" class="bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 text-[9px] font-bold px-2 py-1 rounded transition">Hard (Reset tomorrow)</button>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="p-6 border-t border-brand-border bg-brand-navy/55 flex justify-between space-x-3">
      <button onclick="closeJourneyDrawer()" class="w-1/3 bg-brand-navy border border-brand-border hover:border-white text-gray-400 hover:text-white text-xs font-bold py-2.5 rounded-xl transition">
        Close
      </button>
      <button onclick="completeAllStages()" class="w-2/3 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold py-2.5 rounded-xl transition shadow-lg shadow-brand-blue/20">
        <i class="fas fa-check-double mr-1.5"></i>Complete All Stages
      </button>
    </div>
  </div>
"""

def insert():
    with open(HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    target = "  <!-- Main scripts linking -->"
    idx = html.find(target)
    if idx != -1:
        new_html = html[:idx] + drawer_html + "\n\n" + html[idx:]
        with open(HTML_PATH, "w", encoding="utf-8") as f:
            f.write(new_html)
        print("[+] Drawer HTML successfully appended to index.html.")
    else:
        print("[-] Target comment not found in index.html.")

if __name__ == "__main__":
    insert()
