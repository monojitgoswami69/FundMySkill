#!/usr/bin/env python3
"""
Quick performance test for Firebase endpoints
"""
import time
import requests

BASE_URL = "http://localhost:8000"
TEST_USER_ID = "test-user-123"
TEST_COURSE_ID = "course_001"

def test_endpoint(name: str, method: str, url: str, **kwargs):
    """Test a single endpoint and measure response time"""
    print(f"\n{'='*60}")
    print(f"Testing: {name}")
    print(f"Endpoint: {method} {url}")

    times = []
    errors = []

    for i in range(3):
        try:
            start = time.time()
            if method == "GET":
                response = requests.get(url, timeout=30, **kwargs)
            else:
                response = requests.post(url, timeout=30, **kwargs)
            elapsed = time.time() - start
            times.append(elapsed)

            print(f"  Run {i+1}: {elapsed*1000:.0f}ms - Status: {response.status_code}")

        except Exception as e:
            errors.append(str(e))
            print(f"  Run {i+1}: ERROR - {e}")

    if times:
        avg_time = sum(times) / len(times)
        print(f"\nAverage: {avg_time*1000:.0f}ms")
        if avg_time > 1.0:
            print(f"⚠️  WARNING: SLOW ENDPOINT (>{1000}ms)")
        elif avg_time > 0.5:
            print(f"⚠️  Moderate latency (>{500}ms)")
        else:
            print(f"✓ Good performance")

    return times, errors


def main():
    print("🔥 Firebase Endpoint Performance Test")
    print("="*60)

    # Test 1: List courses (most common query)
    test_endpoint(
        "List Courses",
        "GET",
        f"{BASE_URL}/api/courses?limit=50"
    )

    # Test 2: Get single course with modules
    test_endpoint(
        "Get Course Details (with modules)",
        "GET",
        f"{BASE_URL}/api/courses/{TEST_COURSE_ID}"
    )

    # Test 3: Get course progress
    test_endpoint(
        "Get Course Progress",
        "GET",
        f"{BASE_URL}/api/progress/{TEST_COURSE_ID}?userId={TEST_USER_ID}"
    )

    # Test 4: Get enrolled courses
    test_endpoint(
        "Get Enrolled Courses",
        "GET",
        f"{BASE_URL}/api/progress/enrolled/{TEST_USER_ID}"
    )

    # Test 5: Health check (baseline)
    test_endpoint(
        "Health Check (baseline)",
        "GET",
        f"{BASE_URL}/health"
    )

    print(f"\n{'='*60}")
    print("Test Complete!")
    print("\nCommon Firebase Performance Issues:")
    print("1. N+1 queries (fetching related docs in loops)")
    print("2. No indexes for filtered queries")
    print("3. Fetching full documents when only need fields")
    print("4. Not using batch operations")
    print("5. Cold start latency (first request)")
    print("="*60)


if __name__ == "__main__":
    main()
