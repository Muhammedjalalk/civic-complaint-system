import re
from accounts.models import Department

CRITICAL = ["death", "accident", "fire", "rape", "violence"]
HIGH = ["delay", "corruption", "harassment", "bribe"]

# 🔥 words that should NOT decide department alone
STOP_WORDS = {
    "certificate", "issue", "delay", "problem",
    "complaint", "request", "department"
}


def normalize(text):
    return set(re.findall(r"[a-zA-Z]+", text.lower()))


def detect_priority(text):
    text = text.lower()

    if any(word in text for word in CRITICAL):
        return "High"
    if any(word in text for word in HIGH):
        return "Medium"
    return "Low"


def detect_departments(description):
    desc_words = normalize(description)
    scored = []

    for dept in Department.objects.select_related("parent"):
        dept_words = normalize(dept.name)

        # remove generic words
        meaningful = dept_words - STOP_WORDS
        if not meaningful:
            continue

        # score based on meaningful word overlap
        score = len(meaningful & desc_words)

        if score > 0:
            scored.append((score, dept))

    if not scored:
        return Department.objects.none()

    # sort best match first
    scored.sort(key=lambda x: x[0], reverse=True)

    best_score = scored[0][0]

    # keep only strongest matches
    best_matches = [d for s, d in scored if s == best_score]

    # 🔥 prefer sub-departments over parents
    parent_ids = {d.parent_id for d in best_matches if d.parent_id}

    final_departments = [
        d for d in best_matches if d.id not in parent_ids
    ]

    return final_departments
