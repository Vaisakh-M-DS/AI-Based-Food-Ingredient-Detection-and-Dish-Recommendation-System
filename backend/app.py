from flask import Flask, request, jsonify
from flask_cors import CORS
from yolov8_detector import detect_ingredients, suggest_dishes  # ✅ include suggest_dishes
import os
import uuid  # ✅ For unique filenames

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "✅ Flask backend is running!"

@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']

    # ✅ Give a unique name to avoid overwrite
    filename = f"{uuid.uuid4().hex}_{image.filename}"
    image_path = os.path.join("uploads", filename)
    image.save(image_path)

    ingredients = detect_ingredients(image_path)
    dishes = suggest_dishes(ingredients)  # ✅ Use real dish logic

    print("📸 Image uploaded:", image.filename)
    print("🧠 Ingredients Detected:", ingredients)
    print("🍽️ Dishes Suggested:", dishes)

    return jsonify({"ingredients": ingredients, "dishes": dishes})

if __name__ == '__main__':
    app.run(debug=True)


