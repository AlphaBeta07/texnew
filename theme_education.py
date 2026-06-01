import re
import os

file_path = r"d:\texnew\index.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_colors = """                        primary: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a',
                        },
                        secondary: {
                            50: '#f5f3ff',
                            100: '#ede9fe',
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            900: '#4c1d95',
                        }"""

# Academic Navy & Gold Theme
new_colors = """                        primary: {
                            50: '#f0f4f8',
                            100: '#d9e2ec',
                            200: '#bcccdc',
                            300: '#9fb3c8',
                            400: '#829ab1',
                            500: '#627d98',
                            600: '#486581',
                            700: '#334e68',
                            800: '#243b53',
                            900: '#102a43',
                            950: '#0a192f',
                        },
                        secondary: {
                            50: '#fffbea',
                            100: '#fff3c4',
                            200: '#fce588',
                            300: '#fadb5f',
                            400: '#f7c948',
                            500: '#f0b429',
                            600: '#de911d',
                            700: '#cb6e17',
                            800: '#b44d12',
                            900: '#8d2b0b',
                            950: '#5c1b04',
                        }"""

content = content.replace(old_colors, new_colors)

# Replace hardcoded colors with theme colors
# 1. Programs View (Indigo -> Primary)
content = content.replace('from-indigo-', 'from-primary-')
content = content.replace('to-indigo-', 'to-primary-')
content = content.replace('shadow-indigo-', 'shadow-primary-')
content = content.replace('text-indigo-', 'text-primary-')
content = content.replace('bg-indigo-', 'bg-primary-')

# 2. Chapters View (Blue -> Secondary)
content = content.replace('bg-blue-', 'bg-secondary-')
content = content.replace('text-blue-', 'text-secondary-')
content = content.replace('border-blue-', 'border-secondary-')
content = content.replace('shadow-blue-', 'shadow-secondary-')

# 3. Audio View
# The Spotify play button and highlights are still green. We can keep Spotify green for the audio controls, 
# since it's universally recognized, or we can theme it to Gold. Let's keep the audio player green.

# 4. Navbar Logo "TextileGuru"
content = content.replace('text-primary-600 dark:text-primary-400', 'text-secondary-600 dark:text-secondary-400')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
