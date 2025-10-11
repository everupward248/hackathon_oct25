from flask import Flask, render_template, session, redirect, flash, request, url_for

app = Flask(__name__)

@app.route("/")
def index():
    if request.method == "GET":
        return "hello"


if __name__ == "__main__":
    app.run(debug=True)