import os
import subprocess
import sys

from flask import Flask, jsonify, request, send_from_directory
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

application = Flask(__name__, static_folder=STATIC_DIR, static_url_path="")
app = application


def ensure_frontend_built():
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return

    print("Building frontend for Flask...", flush=True)
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    result = subprocess.run(
        [npm_cmd, "run", "build"],
        cwd=FRONTEND_DIR,
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        raise RuntimeError(
            "Frontend build failed. Run: cd frontend && npm install && npm run build"
        )

    print("Frontend built successfully.", flush=True)


def get_form_value(*keys):
    for key in keys:
        value = request.form.get(key)
        if value is not None and value != "":
            return value
        if request.is_json and request.json:
            value = request.json.get(key)
            if value is not None and value != "":
                return value
    return None


def run_prediction():
    data = CustomData(
        gender=get_form_value("gender"),
        race_ethnicity=get_form_value("ethnicity", "race_ethnicity", "race/ethnicity"),
        parental_level_of_education=get_form_value(
            "parental_level_of_education", "parental level of education"
        ),
        lunch=get_form_value("lunch"),
        test_preparation_course=get_form_value(
            "test_preparation_course", "test preparation course"
        ),
        reading_score=get_form_value("reading_score", "reading score"),
        writing_score=get_form_value("writing_score", "writing score"),
    )
    pred_df = data.get_data_as_data_frame()
    print("Prediction Input DataFrame:\n", pred_df)

    predict_pipeline = PredictPipeline()
    results = predict_pipeline.predict(pred_df)
    return float(results[0])


def wants_json_response():
    return (
        request.accept_mimetypes.best == "application/json"
        or request.headers.get("X-Requested-With") == "XMLHttpRequest"
        or request.headers.get("Accept", "").startswith("application/json")
    )


@app.route("/")
def index():
    return send_from_directory(STATIC_DIR, "index.html")


@app.route("/predictdata", methods=["GET", "POST"])
def predict_datapoint():
    if request.method == "GET":
        return send_from_directory(STATIC_DIR, "index.html")

    try:
        score = run_prediction()
    except Exception as exc:
        if wants_json_response():
            return jsonify({"error": str(exc)}), 500
        raise

    if wants_json_response():
        return jsonify({"prediction": score, "results": score})

    return send_from_directory(STATIC_DIR, "index.html")


if __name__ == "__main__":
    ensure_frontend_built()
    app.run(host="0.0.0.0", port=5000, debug=True)
