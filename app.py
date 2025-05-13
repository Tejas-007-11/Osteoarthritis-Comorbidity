from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('osteoarthritis_comorbidity_model.pkl')
label_mapping = joblib.load('label_mapping.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    features = np.array([[
        data['age'],
        data['bmi'],
        data['oa_severity'],
        data['activity'],
        data['smoking'],
        data['pain_score']
    ]])

    prediction = model.predict(features)
    result = label_mapping[int(prediction[0])]

    return jsonify({'comorbidity': result})

if __name__ == '__main__':
    app.run(debug=True)
