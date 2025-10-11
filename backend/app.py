from flask import Flask, render_template, session, redirect, flash, request, url_for
import functions as func

app = Flask(__name__)

@app.route("/")
def index():
    if request.method == "GET":
        try:
            


        return "hello"


if __name__ == "__main__":
    app.run(debug=True)