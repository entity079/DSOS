import re

HTML_PATH = r"D:\DSOS\index.html"

def update_html():
    print("Reading index.html...")
    with open(HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    # Define the new Task Form
    new_task_form = """      <form id="task-form" onsubmit="saveTask(event)" class="space-y-4">
        <input type="hidden" id="task-edit-id">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Module</label>
            <input type="text" id="task-module" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Module 1" required>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Submodule</label>
            <input type="text" id="task-submodule" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Professional OOP" required>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-400 mb-1">Topic Title</label>
          <input type="text" id="task-name" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="Describe the topic you are learning" required>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Priority</label>
            <select id="task-priority" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="🔥 Critical">🔥 Critical</option>
              <option value="🟠 High" selected>🟠 High</option>
              <option value="🟡 Medium">🟡 Medium</option>
              <option value="⚪ Low">⚪ Low</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Difficulty</label>
            <select id="task-difficulty" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="🟢 Easy">🟢 Easy</option>
              <option value="🟡 Medium" selected>🟡 Medium</option>
              <option value="🔴 Hard">🔴 Hard</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Weight (1 to 8)</label>
            <input type="number" min="1" max="8" id="task-weight" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. 5" required>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Learning Type</label>
            <select id="task-learning-type" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="📖 Read" selected>📖 Read</option>
              <option value="🎥 Watch">🎥 Watch</option>
              <option value="💻 Practice">💻 Practice</option>
              <option value="🏗 Build">🏗 Build</option>
              <option value="📝 Revise">📝 Revise</option>
              <option value="🎤 Present">🎤 Present</option>
              <option value="📚 Documentation">📚 Documentation</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Status</label>
            <select id="task-status" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="Not Started">Not Started</option>
              <option value="Learning">Learning</option>
              <option value="Practicing">Practicing</option>
              <option value="Completed">Completed</option>
              <option value="Revision Needed">Revision Needed</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Mastery</label>
            <select id="task-mastery" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="⚪ Beginner">⚪ Beginner</option>
              <option value="🟡 Learning">🟡 Learning</option>
              <option value="🔵 Practicing">🔵 Practicing</option>
              <option value="🟢 Confident">🟢 Confident</option>
              <option value="⭐ Interview Ready">⭐ Interview Ready</option>
              <option value="👑 Master">👑 Master</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Resource</label>
            <input type="text" id="task-resource" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Book, website link">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Question to Practice</label>
            <input type="text" id="task-practice" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. LeetCode #175, StrataScratch #9">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-400 mb-1">Notes</label>
          <textarea id="task-notes" rows="2" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="Write references or concepts log"></textarea>
        </div>
        <div class="pt-4 flex justify-end space-x-3 border-t border-brand-border">
          <button type="button" onclick="closeModal('task-modal')" class="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition">Cancel</button>
          <button type="submit" class="bg-brand-blue hover:bg-brand-hover text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg shadow-brand-blue/20">Save Task</button>
        </div>
      </form>"""

    # Define the new Resource Form
    new_res_form = """      <form id="resource-form" onsubmit="saveResource(event)" class="space-y-4">
        <input type="hidden" id="res-edit-id">
        <div>
          <label class="block text-xs font-semibold text-gray-400 mb-1">Resource Name</label>
          <input type="text" id="res-name" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Python OOP" required>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Author / Creator</label>
            <input type="text" id="res-author" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Dusty Phillips" required>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Category</label>
            <select id="res-category" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="Book">Book</option>
              <option value="Course">Course</option>
              <option value="YouTube">YouTube</option>
              <option value="Documentation">Documentation</option>
              <option value="Practice">Practice</option>
              <option value="Article">Article</option>
              <option value="Research Paper">Research Paper</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Difficulty</label>
            <select id="res-diff" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="Easy">Easy</option>
              <option value="Medium" selected>Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Priority</label>
            <select id="res-priority" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High" selected>High</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Type</label>
            <select id="res-usage-type" class="w-full glass-input rounded-lg px-3 py-2 text-sm bg-brand-navy">
              <option value="Primary" selected>Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Reference">Reference</option>
              <option value="Optional">Optional</option>
            </select>
          </div>
          <div class="flex items-center justify-center pt-5">
            <input type="checkbox" id="res-completed" class="w-4 h-4 rounded text-brand-blue bg-brand-navy border-brand-border focus:ring-brand-blue focus:ring-opacity-25 cursor-pointer">
            <label for="res-completed" class="ml-2 text-xs font-semibold text-gray-400">Done</label>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-400 mb-1">Purpose / Description</label>
          <input type="text" id="res-purpose" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="What will you master from this resource?">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Recommended Chapters</label>
            <input type="text" id="res-chapters" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Ch 1-5, 8">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-400 mb-1">Skip Chapters</label>
            <input type="text" id="res-skip" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="e.g. Ch 6-7">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-400 mb-1">Notes</label>
          <textarea id="res-notes" rows="2" class="w-full glass-input rounded-lg px-3 py-2 text-sm" placeholder="Free-form progress remarks"></textarea>
        </div>
        <div class="pt-4 flex justify-end space-x-3 border-t border-brand-border">
          <button type="button" onclick="closeModal('resource-modal')" class="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition">Cancel</button>
          <button type="submit" class="bg-brand-blue hover:bg-brand-hover text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg shadow-brand-blue/20">Save Resource</button>
        </div>
      </form>"""

    # Replace task form
    # Start target is <form id="task-form" ...
    # End target is </form>
    task_start = html.find('<form id="task-form"')
    # Find the closing </form> for this form
    task_end = html.find('</form>', task_start) + len('</form>')
    
    if task_start != -1 and task_end != -1:
        html = html[:task_start] + new_task_form + html[task_end:]
        print("[+] Task form replaced successfully.")
    else:
        print("[-] Task form boundaries not found.")

    # Replace resource form
    # Start target is <form id="resource-form" ...
    res_start = html.find('<form id="resource-form"')
    res_end = html.find('</form>', res_start) + len('</form>')
    
    if res_start != -1 and res_end != -1:
        html = html[:res_start] + new_res_form + html[res_end:]
        print("[+] Resource form replaced successfully.")
    else:
        print("[-] Resource form boundaries not found.")

    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print("[+] index.html successfully updated.")

if __name__ == "__main__":
    update_html()
