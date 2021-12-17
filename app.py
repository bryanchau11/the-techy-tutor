import flask
from flask.helpers import url_for

import os
import json
from flask import redirect
from dotenv import load_dotenv, find_dotenv
from flask_login import (
    login_user,
    current_user,
    LoginManager,
    UserMixin,
    login_required,
    logout_user,
)
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv(find_dotenv())


app = flask.Flask(__name__, static_folder="./build/static")
# This tells our Flask app to look at the results of `npm build` instead of the
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.

db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = b"I am a secret key!"

db = SQLAlchemy(app)


class User(UserMixin, db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    role = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(700), nullable=False)
    language = db.Column(db.String(700), nullable=False)
    skillset = db.Column(db.String(700))
    best_describe = db.Column(db.String(100))
    bio = db.Column(db.String(700))


class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    role = db.Column(db.String(80))
    language = db.Column(db.String(700))


db.create_all()

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_name):

    return User.query.get(user_name)


bp = flask.Blueprint("bp", __name__, template_folder="./build")


@bp.route("/index")
def index():

    try:
        username = current_user.username
    except:
        username = "PLEASE LOGIN"

    DATA = {"username": username}
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )


app.register_blueprint(bp)


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    try:
        logout_user()
        return redirect("/")
    except:
        return redirect("/")


@app.route("/get_username", methods=["POST"])
def get_username():
    """
    Get current username from database.
    """
    try:
        username = current_user.username
        role = current_user.role
    except:
        username = ""
        role = ""
    return flask.jsonify({"status": 200, "username": username, "role": role})


@app.route("/login", methods=["POST", "GET"])
def login():
    if current_user.is_authenticated:
        return redirect("/")
    if flask.request.method == "POST":
        email = flask.request.json.get("email")
        password = flask.request.json.get("password")
        my_user = User.query.filter_by(email=email).first()
        if email == "" or password == "":
            return flask.jsonify({"result": "no"})
        if not my_user or not check_password_hash(my_user.password, password):
            return flask.jsonify({"result": "no"})
        login_user(my_user)

        return flask.jsonify({"result": "yes"})
    return redirect("/")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    """[summary]
    Args:
        path ([type]): [description]
    Returns:
        [type]: [description]
    """
    return flask.redirect(flask.url_for("bp.index"))


@app.route("/tutorSignup", methods=["POST", "GET"])
def tutorSignup():
    if current_user.is_authenticated:
        return flask.redirect("/")
    if flask.request.method == "POST":
        email = flask.request.json.get("email")
        username = flask.request.json.get("username")
        password = flask.request.json.get("password")
        language = flask.request.json.get("language")
        languageStr = ",".join(language)
        bestDescribe = flask.request.json.get("bestDesribe")
        bio = flask.request.json.get("bio")
        try:
            new_user = User(
                email=email,
                role="tutor",
                username=username,
                password=generate_password_hash(password, method="sha256"),
                language=languageStr,
                best_describe=bestDescribe,
                bio=bio,
            )
            db.session.add(new_user)
            for i in language:
                db.session.add(Language(email=email, role="tutor", language=i))
            db.session.commit()
            return flask.jsonify({"result": "yes"})
        except:
            return flask.jsonify({"result": "no"})
    # return flask.redirect("/")


@app.route("/studentSignup", methods=["POST", "GET"])
def studentSignup():
    if current_user.is_authenticated:
        return flask.redirect("/")
    if flask.request.method == "POST":
        email = flask.request.json.get("email")
        username = flask.request.json.get("username")
        password = flask.request.json.get("password")
        language = flask.request.json.get("language")
        languageStr = ",".join(language)
        try:
            new_user = User(
                email=email,
                role="student",
                username=username,
                password=generate_password_hash(password, method="sha256"),
                language=languageStr,
            )
            db.session.add(new_user)
            for i in language:
                db.session.add(Language(email=email, role="student", language=i))
            db.session.commit()
            return flask.jsonify({"result": "yes"})
        except:
            return flask.jsonify({"result": "no"})
    # return flask.redirect("/")


@app.route("/")
def main():
    return flask.redirect(url_for("bp.index"))


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8081)),
    )
