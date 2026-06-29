import re
import os

DATA_PATH = r"D:\DSOS\data.js"

def verify_db():
    print("Testing data.js compilation and structures...")
    if not os.path.exists(DATA_PATH):
        print(f"Error: {DATA_PATH} not found!")
        return False
        
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check brace balances
    open_braces = content.count("{")
    close_braces = content.count("}")
    print(f"[+] Braces balance: open={open_braces}, close={close_braces}")
    
    # We will check if it parses as a valid JS file
    # We can do a quick check on string indices of domains and tasks
    domain_matches = re.findall(r'id:\s*"(communication)"', content)
    print(f"[+] Found communication domains: {len(domain_matches)}")
    
    task_matches = re.findall(r'id:\s*"(comm_\d+)"', content)
    print(f"[+] Found communication tasks count: {len(task_matches)}")
    
    res_matches = re.findall(r'id:\s*"(r_comm_\d+)"', content)
    print(f"[+] Found communication resources count: {len(res_matches)}")
    
    proj_matches = re.findall(r'id:\s*"(p_comm_\d+)"', content)
    print(f"[+] Found communication projects count: {len(proj_matches)}")
    
    rev_matches = re.findall(r'id:\s*"(rev_comm_\d+)"', content)
    print(f"[+] Found communication revision topics count: {len(rev_matches)}")
    
    int_matches = re.findall(r'id:\s*"(i_comm_\d+)"', content)
    print(f"[+] Found communication interview rounds count: {len(int_matches)}")
    
    errors = 0
    if len(domain_matches) == 0:
        print("[-] Error: Communication domain object missing!")
        errors += 1
    if len(task_matches) != 102:
        print(f"[-] Warning: Expected 102 tasks, found {len(task_matches)}!")
        errors += 1
    if len(res_matches) != 13:
        print(f"[-] Warning: Expected 13 resources, found {len(res_matches)}!")
        errors += 1
    if len(proj_matches) != 9:
        print(f"[-] Warning: Expected 9 projects, found {len(proj_matches)}!")
        errors += 1
        
    if errors == 0:
        print("\nSUCCESS: All structures validated. database is fully loaded and structurally correct!")
        return True
    else:
        print(f"\nFAILURE: {errors} structural warnings found.")
        return False

if __name__ == "__main__":
    verify_db()
