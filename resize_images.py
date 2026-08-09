import os
from PIL import Image, ImageOps

SOURCE_DIRS = [
    r"E:\Images\Paradise\images\Paradise Bungalow\lightroom edited",
    r"E:\Images\Paradise\images\Paradise Bungalow"
]
DEST_DIR = r"c:\Users\thili\Development\Paradise Bungalow\public\images"

os.makedirs(DEST_DIR, exist_ok=True)

processed_files = set()

for source_dir in SOURCE_DIRS:
    if not os.path.exists(source_dir):
        continue
    for fname in os.listdir(source_dir):
        if fname.startswith("._") or not fname.lower().endswith(".jpg"):
            continue
        
        cleaned_name = fname.replace(" copy", "").replace(" (1)", "")
        if cleaned_name in processed_files:
            continue

        src_path = os.path.join(source_dir, fname)
        dest_path = os.path.join(DEST_DIR, cleaned_name)

        try:
            with Image.open(src_path) as img:
                img = ImageOps.exif_transpose(img)
                # Resize keeping aspect ratio, max width/height 1920
                img.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
                
                # Convert to RGB if necessary
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                img.save(dest_path, "JPEG", quality=85, optimize=True)
                processed_files.add(cleaned_name)
                print(f"Resized: {fname} -> {dest_path}")
        except Exception as e:
            print(f"Error processing {fname}: {e}")

print(f"Total processed images: {len(processed_files)}")
