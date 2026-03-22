"""
Push users to Firebase Auth and seed courses + progress to Firestore.
Run: cd backend && ./venv/bin/python push_users_and_courses.py
"""
import os
import sys

# Ensure the app module is importable
sys.path.insert(0, os.path.dirname(__file__))

import firebase_admin
from firebase_admin import credentials, auth, firestore
from datetime import datetime, timedelta

# ── Initialize Firebase Admin ────────────────────────────────────────
CRED_PATH = os.path.join(os.path.dirname(__file__), "firebase-credentials.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(CRED_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client()

# ══════════════════════════════════════════════════════════════════════
# STEP 1: Create Firebase Auth Users
# ══════════════════════════════════════════════════════════════════════

def create_user(email, password, display_name):
    """Create or update a Firebase Auth user."""
    try:
        user = auth.get_user_by_email(email)
        print(f"  ⚡ User already exists: {email} (uid: {user.uid})")
        # Update display name if needed
        auth.update_user(user.uid, display_name=display_name)
        return user.uid
    except auth.UserNotFoundError:
        user = auth.create_user(
            email=email,
            password=password,
            display_name=display_name,
        )
        print(f"  ✅ Created user: {email} (uid: {user.uid})")
        return user.uid


print("\n📋 Creating Firebase Auth users...\n")

# User 1: Monojit Goswami
monojit_uid = create_user(
    email="monojit.goswami.0905@gmail.com",
    password="mg6969",
    display_name="Monojit Goswami",
)

# User 2: Dummy user
dummy_uid = create_user(
    email="jane.doe.demo@gmail.com",
    password="demo1234",
    display_name="Jane Doe",
)

print(f"\n  Monojit UID: {monojit_uid}")
print(f"  Jane UID:    {dummy_uid}")

# ══════════════════════════════════════════════════════════════════════
# STEP 2: Push user profiles to Firestore
# ══════════════════════════════════════════════════════════════════════

print("\n📋 Pushing user profiles to Firestore...\n")

now = datetime.utcnow()

db.collection("users").document(monojit_uid).set({
    "id": monojit_uid,
    "name": "Monojit Goswami",
    "email": "monojit.goswami.0905@gmail.com",
    "avatar_url": "https://i.pravatar.cc/150?u=monojit",
    "bio": "Full-stack developer passionate about AI, blockchain, and building things that matter.",
    "skills": ["Python", "React", "Machine Learning", "Blockchain", "TypeScript"],
    "role": "student",
    "joined_at": now - timedelta(days=120),
}, merge=True)
print("  ✅ Monojit profile pushed")

db.collection("users").document(dummy_uid).set({
    "id": dummy_uid,
    "name": "Jane Doe",
    "email": "jane.doe.demo@gmail.com",
    "avatar_url": "https://i.pravatar.cc/150?u=janedoe",
    "bio": "Aspiring data scientist exploring the intersection of statistics and machine learning.",
    "skills": ["Python", "R", "Statistics", "Data Visualization"],
    "role": "student",
    "joined_at": now - timedelta(days=60),
}, merge=True)
print("  ✅ Jane profile pushed")


# ══════════════════════════════════════════════════════════════════════
# STEP 3: Define 5 courses for Monojit
# ══════════════════════════════════════════════════════════════════════

COURSES = [
    {
        "id": "course-ai-fundamentals",
        "title": "Artificial Intelligence Fundamentals",
        "description": "Master the foundations of AI including machine learning, neural networks, and deep learning architectures.",
        "instructor_name": "Dr. Elena Rodriguez",
        "institution": "MIT OpenCourseware",
        "thumbnail_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "category": "Artificial Intelligence",
        "level": "Intermediate",
        "price": "Free",
        "rating": 4.8,
        "rating_count": "2.3k",
        "stars": [1, 1, 1, 1, 0.5],
        "badge": "Bestseller",
        "badge_color": "text-amber-600",
        "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "instructor_image": "https://i.pravatar.cc/150?u=elena",
        "modules": [
            {
                "id": "mod-ai-1", "title": "Introduction to AI", "description": "History and foundations", "order_index": 0, "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-ai-1-1", "title": "What is AI?", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-ai-1-2", "title": "History of AI", "order_index": 1, "duration": "40 MIN"},
                    {"id": "lec-ai-1-3", "title": "Types of AI Systems", "order_index": 2, "duration": "50 MIN"},
                    {"id": "lec-ai-1-4", "title": "AI Ethics & Governance", "order_index": 3, "duration": "45 MIN"},
                ],
            },
            {
                "id": "mod-ai-2", "title": "Machine Learning Basics", "description": "Supervised & unsupervised learning", "order_index": 1, "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-ai-2-1", "title": "Supervised Learning", "order_index": 0, "duration": "55 MIN"},
                    {"id": "lec-ai-2-2", "title": "Unsupervised Learning", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-ai-2-3", "title": "Reinforcement Learning", "order_index": 2, "duration": "60 MIN"},
                    {"id": "lec-ai-2-4", "title": "Model Evaluation", "order_index": 3, "duration": "45 MIN"},
                ],
            },
            {
                "id": "mod-ai-3", "title": "Neural Networks", "description": "Deep dive into neural networks", "order_index": 2, "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-ai-3-1", "title": "Perceptrons & Layers", "order_index": 0, "duration": "55 MIN"},
                    {"id": "lec-ai-3-2", "title": "Backpropagation", "order_index": 1, "duration": "60 MIN"},
                    {"id": "lec-ai-3-3", "title": "CNNs & Image Processing", "order_index": 2, "duration": "65 MIN"},
                    {"id": "lec-ai-3-4", "title": "RNNs & Sequence Models", "order_index": 3, "duration": "70 MIN"},
                ],
            },
            {
                "id": "mod-ai-4", "title": "Advanced Deep Learning", "description": "Transformers, GANs", "order_index": 3, "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-ai-4-1", "title": "Attention Mechanism", "order_index": 0, "duration": "60 MIN"},
                    {"id": "lec-ai-4-2", "title": "Transformer Architecture", "order_index": 1, "duration": "65 MIN"},
                    {"id": "lec-ai-4-3", "title": "GANs & Generative Models", "order_index": 2, "duration": "70 MIN"},
                    {"id": "lec-ai-4-4", "title": "Capstone Project", "order_index": 3, "duration": "90 MIN"},
                ],
            },
        ],
        "completion": 100,
    },
    {
        "id": "course-blockchain-dev",
        "title": "Blockchain Development with Algorand",
        "description": "Build decentralized applications on Algorand using PyTeal and smart contracts.",
        "instructor_name": "Prof. Marcus Chen",
        "institution": "Stanford Online",
        "thumbnail_url": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        "category": "Blockchain",
        "level": "Advanced",
        "price": "Free",
        "rating": 4.9,
        "rating_count": "1.8k",
        "stars": [1, 1, 1, 1, 1],
        "badge": "New",
        "badge_color": "text-green-600",
        "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        "instructor_image": "https://i.pravatar.cc/150?u=marcus",
        "modules": [
            {
                "id": "mod-bc-1", "title": "Blockchain Foundations", "description": "Core distributed ledger concepts", "order_index": 0, "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-bc-1-1", "title": "Distributed Ledger Basics", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-bc-1-2", "title": "Consensus Mechanisms", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-bc-1-3", "title": "Cryptographic Primitives", "order_index": 2, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-bc-2", "title": "Algorand Ecosystem", "description": "Understanding the Algorand protocol", "order_index": 1, "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-bc-2-1", "title": "Pure Proof of Stake", "order_index": 0, "duration": "50 MIN"},
                    {"id": "lec-bc-2-2", "title": "ASA & Atomic Transfers", "order_index": 1, "duration": "55 MIN"},
                    {"id": "lec-bc-2-3", "title": "Smart Contracts Intro", "order_index": 2, "duration": "60 MIN"},
                ],
            },
            {
                "id": "mod-bc-3", "title": "Smart Contract Development", "description": "Building with PyTeal", "order_index": 2, "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-bc-3-1", "title": "PyTeal Fundamentals", "order_index": 0, "duration": "65 MIN"},
                    {"id": "lec-bc-3-2", "title": "State Management", "order_index": 1, "duration": "60 MIN"},
                    {"id": "lec-bc-3-3", "title": "DApp Architecture", "order_index": 2, "duration": "70 MIN"},
                    {"id": "lec-bc-3-4", "title": "Final DApp Project", "order_index": 3, "duration": "90 MIN"},
                ],
            },
        ],
        "completion": 100,
    },
    {
        "id": "course-data-science",
        "title": "Data Science & Statistical Modeling",
        "description": "Comprehensive data science covering statistics, visualization, and predictive modeling with Python.",
        "instructor_name": "Dr. Sarah Kim",
        "institution": "Harvard Extension",
        "thumbnail_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        "category": "Data Science",
        "level": "Intermediate",
        "price": "Free",
        "rating": 4.7,
        "rating_count": "3.1k",
        "stars": [1, 1, 1, 1, 0.5],
        "badge": None,
        "badge_color": "",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        "instructor_image": "https://i.pravatar.cc/150?u=sarah",
        "modules": [
            {
                "id": "mod-ds-1", "title": "Statistical Foundations", "description": "Probability and hypothesis testing", "order_index": 0, "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-ds-1-1", "title": "Probability Theory", "order_index": 0, "duration": "50 MIN"},
                    {"id": "lec-ds-1-2", "title": "Statistical Distributions", "order_index": 1, "duration": "55 MIN"},
                    {"id": "lec-ds-1-3", "title": "Hypothesis Testing", "order_index": 2, "duration": "60 MIN"},
                    {"id": "lec-ds-1-4", "title": "Bayesian Statistics", "order_index": 3, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-ds-2", "title": "Data Wrangling with Pandas", "description": "Data cleaning and exploration", "order_index": 1, "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-ds-2-1", "title": "DataFrames & Series", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-ds-2-2", "title": "Data Cleaning Techniques", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-ds-2-3", "title": "Feature Engineering", "order_index": 2, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-ds-3", "title": "Predictive Modeling", "description": "Regression, classification, ensemble methods", "order_index": 2, "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-ds-3-1", "title": "Linear & Logistic Regression", "order_index": 0, "duration": "60 MIN"},
                    {"id": "lec-ds-3-2", "title": "Decision Trees & Random Forests", "order_index": 1, "duration": "55 MIN"},
                    {"id": "lec-ds-3-3", "title": "Gradient Boosting", "order_index": 2, "duration": "60 MIN"},
                ],
            },
        ],
        "completion": 72,
    },
    {
        "id": "course-cybersecurity",
        "title": "Cybersecurity & Ethical Hacking",
        "description": "Penetration testing, network security, and defensive strategies used by professionals.",
        "instructor_name": "James O'Connor",
        "institution": "Georgia Tech",
        "thumbnail_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        "category": "Cybersecurity",
        "level": "Advanced",
        "price": "Free",
        "rating": 4.6,
        "rating_count": "1.5k",
        "stars": [1, 1, 1, 1, 0.5],
        "badge": "Popular",
        "badge_color": "text-blue-600",
        "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        "instructor_image": "https://i.pravatar.cc/150?u=james",
        "modules": [
            {
                "id": "mod-cs-1", "title": "Network Security Basics", "description": "Firewalls and IDS/IPS", "order_index": 0, "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-cs-1-1", "title": "TCP/IP Security", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-cs-1-2", "title": "Firewall Architecture", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-cs-1-3", "title": "Intrusion Detection", "order_index": 2, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-cs-2", "title": "Penetration Testing", "description": "Offensive security", "order_index": 1, "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-cs-2-1", "title": "Reconnaissance", "order_index": 0, "duration": "50 MIN"},
                    {"id": "lec-cs-2-2", "title": "Exploitation Frameworks", "order_index": 1, "duration": "60 MIN"},
                    {"id": "lec-cs-2-3", "title": "Web App Vulnerabilities", "order_index": 2, "duration": "65 MIN"},
                    {"id": "lec-cs-2-4", "title": "Post-Exploitation", "order_index": 3, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-cs-3", "title": "Defensive Strategies", "description": "Incident response and SOC", "order_index": 2, "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-cs-3-1", "title": "Incident Response", "order_index": 0, "duration": "55 MIN"},
                    {"id": "lec-cs-3-2", "title": "SIEM & Log Analysis", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-cs-3-3", "title": "Threat Hunting", "order_index": 2, "duration": "60 MIN"},
                ],
            },
        ],
        "completion": 40,
    },
    {
        "id": "course-web3-design",
        "title": "Web3 UX Design Patterns",
        "description": "Design intuitive user experiences for decentralized applications and wallets.",
        "instructor_name": "Aria Nakamura",
        "institution": "Interaction Design Foundation",
        "thumbnail_url": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
        "category": "Design",
        "level": "Beginner",
        "price": "Free",
        "rating": 4.5,
        "rating_count": "980",
        "stars": [1, 1, 1, 1, 0.5],
        "badge": None,
        "badge_color": "",
        "image": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
        "instructor_image": "https://i.pravatar.cc/150?u=aria",
        "modules": [
            {
                "id": "mod-w3-1", "title": "Web3 Design Principles", "description": "Unique challenges of decentralized UX", "order_index": 0, "total_duration": "2 hrs",
                "lectures": [
                    {"id": "lec-w3-1-1", "title": "Mental Models in Web3", "order_index": 0, "duration": "40 MIN"},
                    {"id": "lec-w3-1-2", "title": "Wallet UX Patterns", "order_index": 1, "duration": "45 MIN"},
                    {"id": "lec-w3-1-3", "title": "Transaction Flow Design", "order_index": 2, "duration": "40 MIN"},
                ],
            },
            {
                "id": "mod-w3-2", "title": "Token-Gated Interfaces", "description": "Designing for DAOs", "order_index": 1, "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-w3-2-1", "title": "Access Control UX", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-w3-2-2", "title": "DAO Dashboard Design", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-w3-2-3", "title": "NFT Marketplace UX", "order_index": 2, "duration": "55 MIN"},
                ],
            },
        ],
        "completion": 15,
    },
]

# ══════════════════════════════════════════════════════════════════════
# STEP 4: Push courses + modules + lectures to Firestore
# ══════════════════════════════════════════════════════════════════════

print("\n📋 Pushing courses, modules, and lectures to Firestore...\n")

for course_def in COURSES:
    course_id = course_def["id"]
    modules = course_def["modules"]

    # Push course document (without modules/completion keys)
    course_data = {k: v for k, v in course_def.items() if k not in ("modules", "completion")}
    db.collection("courses").document(course_id).set(course_data, merge=True)

    # Push modules & lectures as subcollections
    for mod in modules:
        mod_id = mod["id"]
        lectures = mod.pop("lectures", [])
        mod_data = dict(mod)
        mod_data["lecture_count"] = len(lectures)

        db.collection("courses").document(course_id).collection("modules").document(mod_id).set(mod_data, merge=True)

        for lec in lectures:
            lec_id = lec["id"]
            db.collection("courses").document(course_id).collection("modules").document(mod_id).collection("lectures").document(lec_id).set(lec, merge=True)

        # Restore lectures for progress calculation
        mod["lectures"] = lectures

    print(f"  ✅ {course_def['title']} ({len(modules)} modules)")


# ══════════════════════════════════════════════════════════════════════
# STEP 5: Push user_progress for Monojit
# ══════════════════════════════════════════════════════════════════════

print(f"\n📋 Pushing progress data for Monojit (uid: {monojit_uid})...\n")

for course_def in COURSES:
    course_id = course_def["id"]
    modules = course_def["modules"]
    completion_pct = course_def["completion"]

    # Gather all lecture IDs in order
    all_lecture_ids = []
    for mod in modules:
        for lec in mod["lectures"]:
            all_lecture_ids.append(lec["id"])

    total = len(all_lecture_ids)
    completed_count = int(total * (completion_pct / 100))

    # Mark first N lectures as completed
    completed_lectures = {}
    for i, lec_id in enumerate(all_lecture_ids[:completed_count]):
        completed_lectures[lec_id] = now - timedelta(days=total - i)

    progress_id = f"{monojit_uid}_{course_id}"
    enrollment_date = now - timedelta(days=total + 10)

    db.collection("user_progress").document(progress_id).set({
        "user_id": monojit_uid,
        "course_id": course_id,
        "progress_percentage": completion_pct,
        "enrollment_date": enrollment_date,
        "completed_lectures": completed_lectures,
        "last_accessed_module_id": modules[-1]["id"] if completed_count > 0 else modules[0]["id"],
        "last_accessed_lecture_id": all_lecture_ids[max(0, completed_count - 1)],
    }, merge=True)

    print(f"  ✅ {course_def['title']} — {completion_pct}% ({completed_count}/{total} lectures)")


# ══════════════════════════════════════════════════════════════════════
# Done!
# ══════════════════════════════════════════════════════════════════════

print(f"""
{'='*60}
🎉 ALL DONE!

👤 Users created in Firebase Auth:
   • monojit.goswami.0905@gmail.com / mg69  (Monojit Goswami)
   • jane.doe.demo@gmail.com / demo1234     (Jane Doe)

📚 5 Courses pushed to Firestore:
   • AI Fundamentals          — 100% ✅
   • Blockchain Dev           — 100% ✅
   • Data Science             —  72%
   • Cybersecurity            —  40%
   • Web3 UX Design           —  15%

All progress linked to Monojit's UID: {monojit_uid}
{'='*60}
""")
