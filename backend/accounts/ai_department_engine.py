import re
from accounts.models import Department

STOP_WORDS = {
    "certificate", "issue", "delay", "problem", "complaint",
    "request", "service", "department"
}


def normalize(text):
    return re.findall(r"[a-zA-Z]+", text.lower())


def detect_departments(description):
    description_words = set(normalize(description))

    scored = []

    for dept in Department.objects.select_related("parent"):
        dept_words = set(normalize(dept.name))

        # remove generic words
        meaningful_words = dept_words - STOP_WORDS
        if not meaningful_words:
            continue

        # count meaningful word matches
        score = len(meaningful_words & description_words)

        if score > 0:
            scored.append((score, dept))

    if not scored:
        return Department.objects.none()

    # 🔥 sort by best match first
    scored.sort(key=lambda x: x[0], reverse=True)

    best_score = scored[0][0]

    # keep ONLY best-matching departments
    best_matches = [
        dept for score, dept in scored if score == best_score
    ]

    # 🔥 if sub-department exists, drop parent
    final = []
    parent_ids = {d.parent_id for d in best_matches if d.parent_id}

    for dept in best_matches:
        if dept.id not in parent_ids:
            final.append(dept)

    return final
