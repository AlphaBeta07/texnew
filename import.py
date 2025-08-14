import os
import pyttsx3
import docx

# === Folder containing Word files ===
input_folder = r"D:\\TextileGuru\\word"
output_folder = "audio_files"

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

# Loop through all .docx files
for file in os.listdir(input_folder):
    if file.lower().endswith(".docx"):
        file_path = os.path.join(input_folder, file)
        text = docx_to_text(file_path)

        if text.strip():
            audio_path = os.path.join(output_folder, f"{os.path.splitext(file)[0]}.mp3")
            engine.save_to_file(text, audio_path)
            print(f"Saved: {audio_path}")
        else:
            print(f"Skipped (empty): {file}")

# Run the engine once after all save_to_file calls
engine.runAndWait()
print("🎯 All files converted to audio.")
