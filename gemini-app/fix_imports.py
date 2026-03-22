import os

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content.replace('from ', 'from ')
    new_content = new_content.replace('import', 'import')

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

if __name__ == '__main__':
    root_dir = '/home/mg/binary/binary_v2/gemini-app'
    for root, dirs, files in os.walk(root_dir):
        if 'venv' in root:
            continue
        for file in files:
            if file.endswith('.py'):
                filepath = os.path.join(root, file)
                fix_file(filepath)
