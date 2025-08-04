# yolov8_detector.py

from ultralytics import YOLO
import os
from recipes_db import recipes  # 🆕 Import your dish rules

# Load your trained model
model = YOLO("model/best.pt")

# Ingredient detection function
def detect_ingredients(image_path):
    results = model(image_path)[0]
    detected_ingredients = []

    for box in results.boxes:
        cls_id = int(box.cls[0])
        label = results.names[cls_id]
        if label not in detected_ingredients:
            detected_ingredients.append(label)

    return detected_ingredients

# 🆕 Add this function below detect_ingredients
def suggest_dishes(ingredients):
    ingredients_set = set(ingredients)
    suggested = []

    for dish, required_ingredients in recipes.items():
        if required_ingredients.issubset(ingredients_set):
            suggested.append(dish)

    return suggested

# Optional: manual test (can delete later)
if __name__ == "__main__":
    IMAGE_FOLDER = "TestImages"
    image_files = [
        "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"
    ]

    for image_name in image_files:
        full_path = os.path.join(IMAGE_FOLDER, image_name)
        if os.path.exists(full_path):
            ingredients = detect_ingredients(full_path)
            dishes = suggest_dishes(ingredients)
            print(f"\n📸 {full_path}")
            print(f"📝 Ingredients: {ingredients}")
            print(f"🍲 Suggested Dishes: {dishes}")
        else:
            print(f"❌ Image not found: {full_path}")
