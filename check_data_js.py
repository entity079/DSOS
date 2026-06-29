with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

print("File size:", len(text), "bytes")
print("comm_001 in data.js:", "comm_001" in text)
print("comm_102 in data.js:", "comm_102" in text)
print("id: \\\"communication\\\" count:", text.count('"communication"'))
