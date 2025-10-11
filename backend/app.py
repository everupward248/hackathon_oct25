from flask import Flask, request, jsonify
from backend.functions import db_conn

app = Flask(__name__)

@app.route("/")
def index():
    if request.method == "GET":
        try:
            all = db_conn.get_all()
            return jsonify(all), 200
        except Exception as e:
            print(e)

if __name__ == "__main__":
    app.run(debug=True)