from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
#from data import Articles
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps

app = Flask(__name__)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Ajith$hp10'
app.config['MYSQL_DB'] = 'myflaskdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# init MYSQL
mysql = MySQL(app)

#Articles = Articles()

# Index
@app.route('/')
def index():
    return render_template('home.html')

@app.route('/ipsettings')
def ipsettings():
    return render_template('ipsettings.html')

@app.route('/parameters')
def parameters():
    return render_template('parameters.html')

@app.route('/door1')
def door1():
    return render_template('door1.html')

@app.route('/door2')
def door2():
    return render_template('door2.html')

@app.route('/door3')
def door3():
    return render_template('door3.html')

@app.route('/door4')
def door4():
    return render_template('door4.html')

@app.route('/cloud')
def cloud():
    return render_template('cloud.html')

@app.route('/mssql')
def mssql():
    return render_template('mssql.html')

@app.route('/mysql')
def mysql():
    return render_template('mysql.html')

@app.route('/holiday')
def holiday():
    return render_template('holiday.html')

@app.route('/timezone')
def timezone():
    return render_template('timezone.html')

@app.route('/enrollment')
def enrollment():
    return render_template('enrollment.html')

@app.route('/usertimezone')
def usertimezone():
    return render_template('usertimezone.html')

@app.route('/general')
def general():
    return render_template('general.html')

@app.route('/emergency')
def emergency():
    return render_template('emergency.html')

@app.route('/transaction')
def transaction():
    return render_template('transaction.html')

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)