"""
Seed data for demo user Alex Johnson (test@gmail.com / demo-user-alex).
Populates courses, modules, lectures, and user_progress with 5 enrolled courses
at different completion percentages (2 at 100%).
"""
from datetime import datetime, timedelta
from app.services.firebase import get_firestore, datetime_to_firestore


DEMO_USER_ID = "demo-user-alex"

SEED_COURSES = [
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
                "id": "mod-ai-1",
                "title": "Introduction to AI",
                "description": "History and foundations of artificial intelligence",
                "order_index": 0,
                "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-ai-1-1", "title": "What is AI?", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-ai-1-2", "title": "History of AI", "order_index": 1, "duration": "40 MIN"},
                    {"id": "lec-ai-1-3", "title": "Types of AI Systems", "order_index": 2, "duration": "50 MIN"},
                    {"id": "lec-ai-1-4", "title": "AI Ethics & Governance", "order_index": 3, "duration": "45 MIN"},
                ],
            },
            {
                "id": "mod-ai-2",
                "title": "Machine Learning Basics",
                "description": "Supervised, unsupervised, and reinforcement learning",
                "order_index": 1,
                "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-ai-2-1", "title": "Supervised Learning", "order_index": 0, "duration": "55 MIN"},
                    {"id": "lec-ai-2-2", "title": "Unsupervised Learning", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-ai-2-3", "title": "Reinforcement Learning", "order_index": 2, "duration": "60 MIN"},
                    {"id": "lec-ai-2-4", "title": "Model Evaluation", "order_index": 3, "duration": "45 MIN"},
                ],
            },
            {
                "id": "mod-ai-3",
                "title": "Neural Networks",
                "description": "Deep dive into neural network architectures",
                "order_index": 2,
                "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-ai-3-1", "title": "Perceptrons & Layers", "order_index": 0, "duration": "55 MIN"},
                    {"id": "lec-ai-3-2", "title": "Backpropagation", "order_index": 1, "duration": "60 MIN"},
                    {"id": "lec-ai-3-3", "title": "CNNs & Image Processing", "order_index": 2, "duration": "65 MIN"},
                    {"id": "lec-ai-3-4", "title": "RNNs & Sequence Models", "order_index": 3, "duration": "70 MIN"},
                ],
            },
            {
                "id": "mod-ai-4",
                "title": "Advanced Deep Learning",
                "description": "Transformers, GANs, and modern architectures",
                "order_index": 3,
                "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-ai-4-1", "title": "Attention Mechanism", "order_index": 0, "duration": "60 MIN"},
                    {"id": "lec-ai-4-2", "title": "Transformer Architecture", "order_index": 1, "duration": "65 MIN"},
                    {"id": "lec-ai-4-3", "title": "GANs & Generative Models", "order_index": 2, "duration": "70 MIN"},
                    {"id": "lec-ai-4-4", "title": "Capstone Project", "order_index": 3, "duration": "90 MIN"},
                ],
            },
        ],
        "completion": 100,  # 100% complete
    },
    {
        "id": "course-blockchain-dev",
        "title": "Blockchain Development with Algorand",
        "description": "Learn to build decentralized applications on the Algorand blockchain using PyTeal and smart contracts.",
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
                "id": "mod-bc-1",
                "title": "Blockchain Foundations",
                "description": "Core concepts of distributed ledger technology",
                "order_index": 0,
                "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-bc-1-1", "title": "Distributed Ledger Basics", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-bc-1-2", "title": "Consensus Mechanisms", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-bc-1-3", "title": "Cryptographic Primitives", "order_index": 2, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-bc-2",
                "title": "Algorand Ecosystem",
                "description": "Understanding the Algorand protocol",
                "order_index": 1,
                "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-bc-2-1", "title": "Pure Proof of Stake", "order_index": 0, "duration": "50 MIN"},
                    {"id": "lec-bc-2-2", "title": "ASA & Atomic Transfers", "order_index": 1, "duration": "55 MIN"},
                    {"id": "lec-bc-2-3", "title": "Smart Contracts Intro", "order_index": 2, "duration": "60 MIN"},
                ],
            },
            {
                "id": "mod-bc-3",
                "title": "Smart Contract Development",
                "description": "Building with PyTeal and Beaker",
                "order_index": 2,
                "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-bc-3-1", "title": "PyTeal Fundamentals", "order_index": 0, "duration": "65 MIN"},
                    {"id": "lec-bc-3-2", "title": "State Management", "order_index": 1, "duration": "60 MIN"},
                    {"id": "lec-bc-3-3", "title": "DApp Architecture", "order_index": 2, "duration": "70 MIN"},
                    {"id": "lec-bc-3-4", "title": "Final DApp Project", "order_index": 3, "duration": "90 MIN"},
                ],
            },
        ],
        "completion": 100,  # 100% complete
    },
    {
        "id": "course-data-science",
        "title": "Data Science & Statistical Modeling",
        "description": "Comprehensive data science curriculum covering statistics, visualization, and predictive modeling with Python.",
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
                "id": "mod-ds-1",
                "title": "Statistical Foundations",
                "description": "Probability, distributions, and hypothesis testing",
                "order_index": 0,
                "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-ds-1-1", "title": "Probability Theory", "order_index": 0, "duration": "50 MIN"},
                    {"id": "lec-ds-1-2", "title": "Statistical Distributions", "order_index": 1, "duration": "55 MIN"},
                    {"id": "lec-ds-1-3", "title": "Hypothesis Testing", "order_index": 2, "duration": "60 MIN"},
                    {"id": "lec-ds-1-4", "title": "Bayesian Statistics", "order_index": 3, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-ds-2",
                "title": "Data Wrangling with Pandas",
                "description": "Data cleaning, transformation, and exploration",
                "order_index": 1,
                "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-ds-2-1", "title": "DataFrames & Series", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-ds-2-2", "title": "Data Cleaning Techniques", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-ds-2-3", "title": "Feature Engineering", "order_index": 2, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-ds-3",
                "title": "Predictive Modeling",
                "description": "Regression, classification, and ensemble methods",
                "order_index": 2,
                "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-ds-3-1", "title": "Linear & Logistic Regression", "order_index": 0, "duration": "60 MIN"},
                    {"id": "lec-ds-3-2", "title": "Decision Trees & Random Forests", "order_index": 1, "duration": "55 MIN"},
                    {"id": "lec-ds-3-3", "title": "Gradient Boosting", "order_index": 2, "duration": "60 MIN"},
                ],
            },
        ],
        "completion": 72,  # ~72% complete
    },
    {
        "id": "course-cybersecurity",
        "title": "Cybersecurity & Ethical Hacking",
        "description": "Learn penetration testing, network security, and defensive strategies used by industry professionals.",
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
                "id": "mod-cs-1",
                "title": "Network Security Basics",
                "description": "Firewalls, IDS/IPS, and network monitoring",
                "order_index": 0,
                "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-cs-1-1", "title": "TCP/IP Security", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-cs-1-2", "title": "Firewall Architecture", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-cs-1-3", "title": "Intrusion Detection", "order_index": 2, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-cs-2",
                "title": "Penetration Testing",
                "description": "Offensive security techniques and tools",
                "order_index": 1,
                "total_duration": "5 hrs",
                "lectures": [
                    {"id": "lec-cs-2-1", "title": "Reconnaissance", "order_index": 0, "duration": "50 MIN"},
                    {"id": "lec-cs-2-2", "title": "Exploitation Frameworks", "order_index": 1, "duration": "60 MIN"},
                    {"id": "lec-cs-2-3", "title": "Web App Vulnerabilities", "order_index": 2, "duration": "65 MIN"},
                    {"id": "lec-cs-2-4", "title": "Post-Exploitation", "order_index": 3, "duration": "55 MIN"},
                ],
            },
            {
                "id": "mod-cs-3",
                "title": "Defensive Strategies",
                "description": "Incident response and security operations",
                "order_index": 2,
                "total_duration": "4 hrs",
                "lectures": [
                    {"id": "lec-cs-3-1", "title": "Incident Response", "order_index": 0, "duration": "55 MIN"},
                    {"id": "lec-cs-3-2", "title": "SIEM & Log Analysis", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-cs-3-3", "title": "Threat Hunting", "order_index": 2, "duration": "60 MIN"},
                ],
            },
        ],
        "completion": 40,  # 40% complete
    },
    {
        "id": "course-web3-design",
        "title": "Web3 UX Design Patterns",
        "description": "Design intuitive user experiences for decentralized applications, wallets, and token-gated interfaces.",
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
                "id": "mod-w3-1",
                "title": "Web3 Design Principles",
                "description": "Unique challenges of decentralized UX",
                "order_index": 0,
                "total_duration": "2 hrs",
                "lectures": [
                    {"id": "lec-w3-1-1", "title": "Mental Models in Web3", "order_index": 0, "duration": "40 MIN"},
                    {"id": "lec-w3-1-2", "title": "Wallet UX Patterns", "order_index": 1, "duration": "45 MIN"},
                    {"id": "lec-w3-1-3", "title": "Transaction Flow Design", "order_index": 2, "duration": "40 MIN"},
                ],
            },
            {
                "id": "mod-w3-2",
                "title": "Token-Gated Interfaces",
                "description": "Designing for token holders and DAOs",
                "order_index": 1,
                "total_duration": "3 hrs",
                "lectures": [
                    {"id": "lec-w3-2-1", "title": "Access Control UX", "order_index": 0, "duration": "45 MIN"},
                    {"id": "lec-w3-2-2", "title": "DAO Dashboard Design", "order_index": 1, "duration": "50 MIN"},
                    {"id": "lec-w3-2-3", "title": "NFT Marketplace UX", "order_index": 2, "duration": "55 MIN"},
                ],
            },
        ],
        "completion": 15,  # 15% complete (just started)
    },
]


def seed_demo_data():
    """Seed the mock Firestore with demo course and progress data."""
    db = get_firestore()

    if not db.is_mock:
        print("Skipping seed — connected to real Firebase")
        return

    print("Seeding demo data for test@gmail.com (demo-user-alex)...")

    now = datetime.utcnow()

    for course_def in SEED_COURSES:
        course_id = course_def["id"]
        modules = course_def["modules"]
        completion_pct = course_def["completion"]

        # ── Seed Course Document ─────────────────────────────────
        course_data = {k: v for k, v in course_def.items() if k not in ("modules", "completion")}
        db.collection("courses").document(course_id).set(course_data)

        # ── Seed Modules & Lectures (subcollections) ─────────────
        all_lecture_ids = []
        for mod in modules:
            mod_id = mod["id"]
            mod_data = {k: v for k, v in mod.items() if k != "lectures"}
            mod_data["lecture_count"] = len(mod["lectures"])

            db.collection("courses").document(course_id).collection("modules").document(mod_id).set(mod_data)

            for lec in mod["lectures"]:
                lec_id = lec["id"]
                all_lecture_ids.append(lec_id)
                db.collection("courses").document(course_id).collection("modules").document(mod_id).collection("lectures").document(lec_id).set(lec)

        # ── Seed User Progress ───────────────────────────────────
        total = len(all_lecture_ids)
        completed_count = int(total * (completion_pct / 100))

        # Mark first N lectures as completed
        completed_lectures = {}
        for i, lec_id in enumerate(all_lecture_ids[:completed_count]):
            completed_lectures[lec_id] = datetime_to_firestore(
                now - timedelta(days=total - i)
            )

        progress_id = f"{DEMO_USER_ID}_{course_id}"
        enrollment_date = now - timedelta(days=total + 10)

        db.collection("user_progress").document(progress_id).set({
            "user_id": DEMO_USER_ID,
            "course_id": course_id,
            "progress_percentage": completion_pct,
            "enrollment_date": datetime_to_firestore(enrollment_date),
            "completed_lectures": completed_lectures,
            "last_accessed_module_id": modules[-1]["id"] if completed_count > 0 else modules[0]["id"],
            "last_accessed_lecture_id": all_lecture_ids[max(0, completed_count - 1)],
        })

        print(f"  ✓ {course_def['title']} — {completion_pct}% ({completed_count}/{total} lectures)")

    # Seed basic user document
    db.collection("users").document(DEMO_USER_ID).set({
        "id": DEMO_USER_ID,
        "name": "Alex Johnson",
        "email": "test@gmail.com",
        "avatar_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB-s4tYwpbzLXg2tdVUn-MlZOvhACmJmBsEqb0-H6mz5DOSVnQ5f6GezjyX_0s4pzsczwR6j5IJmoL7SFlex3XzC-iqkjrelAFU5taR_tdR-q27mcpCIb9AdkzBYIKH6EYDPZ0gChHAFXd9v0juq6yFPFoHLdFOm76Wt46LhLyM-R7bb20czVPOvMWokQFfmjPFyUSapVtJCD5Zf9VflVB_ZtyQaUfglwxyLXDiEqj6_9W7WYBj6GzoH0wcBWZA7jsJE5tf9Im4pe4",
        "bio": "Passionate learner exploring AI, Blockchain, and Data Science.",
        "skills": ["Python", "Machine Learning", "Blockchain", "Data Analysis"],
        "role": "student",
        "joined_at": datetime_to_firestore(now - timedelta(days=90)),
    })

    print(f"\n✅ Seeded {len(SEED_COURSES)} courses for demo user\n"
          f"   • 2 courses at 100% (certificate-eligible)\n"
          f"   • 1 course at  72%\n"
          f"   • 1 course at  40%\n"
          f"   • 1 course at  15%\n")
