import re

with open('src/components/terminal/InteractiveTerminal.tsx', 'r') as f:
    content = f.read()

# exact replacements
content = content.replace('LEO ASHCRAFT', 'GHULAM HAIDER')
content = content.replace('Leo Ashcraft', 'Ghulam Haider')
content = content.replace('leo@', 'ghulam@')
content = content.replace('/home/leo', '/home/ghulam')
content = content.replace('hire-leo', 'hire-ghulam')
content = content.replace('leo-ashcraft', 'ghulam-haider')
content = content.replace('leo.txt', 'ghulam.txt')
content = content.replace('Dallas-Fort Worth, TX', 'Lahore, Pakistan')
content = content.replace('Dallas-Fort Worth', 'Lahore, Pakistan')
content = content.replace('Ashcraft-Leo-Resume.pdf', 'Ghulam-Haider-Resume.pdf')
content = content.replace('leo-portfolio', 'ghulam-portfolio')
content = content.replace('Leo-MacBook-Pro', 'Ghulam-MacBook-Pro')
content = content.replace("Leo's portfolio", "Ghulam's portfolio")
content = content.replace("Leo's Portfolio", "Ghulam's Portfolio")
content = content.replace("Leo's", "Ghulam's")

# word replacements (case-insensitive) for specific patterns
content = re.sub(r'\bleo\b', 'ghulam', content)
content = re.sub(r'\bLeo\b', 'Ghulam', content)
content = re.sub(r'\bLEO\b', 'GHULAM', content)

with open('src/components/terminal/InteractiveTerminal.tsx', 'w') as f:
    f.write(content)

print("Replacement complete.")
