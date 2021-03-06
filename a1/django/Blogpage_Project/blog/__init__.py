import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)

base_dir = os.path.abspath(os.path.dirname(__name__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+os.path.join(base_dir,'data.sqlite')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
Migrate(app,db)

#######################################

login_manager = LoginManager()

login_manager.init_app(app)
login_manager.login_view = 'users.login'



#######################################

from blog.core.views import core
from blog.error_pages.handlers import error_pages

app.register_blueprint(core)
app.register_blueprint(error_pages)



