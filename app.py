import os
import pyttsx3
import docx

# === Folder containing Word files ===
input_folder = r"D:\\TextileGuru\\audio\\Textile Chemistry\\subject 2\\chapter 4"
output_folder = r"D:\\TextileGuru\\audio\\Textile Chemistry\\subject 2\\chapter 4"

# Create output folder if not exists
os.makedirs(output_folder, exist_ok=True)

# Initialize TTS engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # speaking speed
engine.setProperty('volume', 1)  # volume level

def docx_to_text(docx_path):
    """Extracts text from a Word file."""
    doc = docx.Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs if para.text.strip()])

# Get all .docx files and sort them for consistent order
docx_files = sorted([f for f in os.listdir(input_folder) if f.lower().endswith(".docx")])

# Loop through files and save as Lesson 1, Lesson 2, ...
for index, file in enumerate(docx_files, start=1):
    file_path = os.path.join(input_folder, file)
    text = docx_to_text(file_path)

    if text.strip():
        lesson_name = f"Lession {index}.mp3"
        audio_path = os.path.join(output_folder, lesson_name)
        engine.save_to_file(text, audio_path)
        print(f"✅ Saved: {lesson_name}")
    else:
        print(f"⚠️ Skipped (empty): {file}")

# Run the engine after all save_to_file calls
engine.runAndWait()
print("🎯 All Word files converted to audio with Lesson numbering.")
