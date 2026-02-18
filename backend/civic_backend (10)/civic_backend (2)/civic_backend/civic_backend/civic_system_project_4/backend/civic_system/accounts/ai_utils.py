# accounts/ai_utils.py

DEPARTMENT_KEYWORDS = {
    "electricity": ["light", "current", "power", "street light"],
    "water": ["water", "pipe", "leakage", "drain"],
    "road": ["road", "pothole", "street", "traffic"],
}

def suggest_department(text):
    if not text:
        return None

    text = text.lower()
    for dept, keywords in DEPARTMENT_KEYWORDS.items():
        for word in keywords:
            if word in text:
                return dept
    return None
