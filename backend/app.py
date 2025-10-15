from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.functions import db_conn

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    if request.method == "GET":
        try:
            all = db_conn.get_all()
            return jsonify(all), 200
        except Exception as e:
            print(e)

if __name__ == "__main__":
    app.run(debug=True, port=5000)