from flask import render_template, redirect, url_for, request, flash, Blueprint
from blog.models import User, BlogPost
from blog.users.picture_handler import add_profile_pic
from blog.users.forms import LoginForm, Registration, UpdateUserForm
from blog import db
from flask_login import login_user, current_user, logout_user, login_required

users = Blueprint('users',__name__)

@users.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('core.index'))

@users.route("/register",methods=['GET','POST'])
def register():
    form = RegistrationForm()
    
    if form.validate_on_submit():
        user = User(email=form.email.data,
                    username=form.username.data,
                    password=form.password.data)
        
        db.session.add(user)
        db,session.comit()
        flash('Thanks for Registration!')
        return redirect(url_for('users.login'))
    return render_template('register.html',form=form)

        