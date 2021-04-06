# Reference
from flask import Flask, render_template, redirect, url_for, session, request, logging
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Ajith$hp10'
app.config['MYSQL_DB'] = 'NXMD4W'

mysql = MySQL(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/enrollment', methods=['GET','POST'])
def enrollment():

    # if request.method=="POST":

    #     cur = mysql.connection.cursor()
    #     cur.execute("SELECT `Employee RecID`, `Employee ID`, `Employee Name`, `Card Number`, `UHF Card Number`, `PIN`, `Validity` FROM `Enroll Info`")
    #     fetchdata = cur.fetchall()
    #     cur.close()

    #     return render_template('home.html', data = fetchdata)

    # else:
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Employee_RecID`, `Employee_ID`, `Employee_Name`, `Card_Number`, `UHF_Card_Number`, `PIN`, `Validity` FROM `Enroll_Info`")
    fetchdata = cur.fetchall()
    cur.close()

    return render_template('enrollment.html', data = fetchdata)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/ipsettings', methods=['GET','POST'])
def ipsettings():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `IP Address`, `Subnet`, `Gateway`, `WIFI IP Address`, `WiFi Gateway`, `WiFi PWD`, `WiFi KeyManagement` FROM `Controller Parameters`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('ipsettings.html', data = fetchdata)

@app.route('/parameters')
def parameters():
    return render_template('parameters.html')

@app.route('/door1')
def door1():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, ` Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door1.html', data = fetchdata)

@app.route('/door2')
def door2():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, ` Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door2.html')

@app.route('/door3')
def door3():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, ` Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door3.html')

@app.route('/door4')
def door4():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, ` Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
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
    app.run(debug=True)
