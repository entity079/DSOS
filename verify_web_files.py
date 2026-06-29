import os

TARGET_DIR = r"D:\DSOS"
REQUIRED_FILES = ["index.html", "data.js", "app.js"]

def verify_spa():
    print("Verifying Local SPA files in D:\\DSOS...")
    errors = 0
    
    if not os.path.exists(TARGET_DIR):
        print(f"Error: Target directory {TARGET_DIR} does not exist!")
        return False
        
    for filename in REQUIRED_FILES:
        filepath = os.path.join(TARGET_DIR, filename)
        if not os.path.exists(filepath):
            print(f"[-] Missing required file: {filename}")
            errors += 1
            continue
            
        size = os.path.getsize(filepath)
        print(f"[+] Found file: {filename} ({size} bytes)")
        
        # Read first few characters to verify structure
        with open(filepath, 'r', encoding='utf-8') as f:
            head = f.read(50)
            print(f"    Snippet: {head.strip()}...")
            
    if errors == 0:
        print("\nSUCCESS: All files verified and correctly configured. The Local SPA is ready to run!")
        return True
    else:
        print(f"\nFAILURE: {errors} missing files detected.")
        return False

if __name__ == "__main__":
    verify_spa()
