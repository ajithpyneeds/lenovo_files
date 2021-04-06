from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
from flask_mysqldb import MySQL

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

class Database:
    def __init__(self):
        host = "localhost"
        user = "root"
        password = "Ajith$hp10"
        db = "NXMD4W"
        self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.DictCursor)
        self.cur = self.con.cursor()
    def list_ipsettings(self):
        # self.cur.execute("SELECT Controller_Parameters.IP_Address, Controller_Parameters.Subnet, Controller_Parameters.Gateway, Controller_Parameters.WiFi_IP_Address, Controller_Parameters.WiFi_Gateway, Controller_Parameters.WiFi_PWD, Controller_Parameters.WiFi_KeyManagement FROM NXMD4W")
        self.cur.execute("SELECT `IP Address`, `Subnet`, `Gateway`, `WiFi IP Address`, `WiFi Gateway`, `WiFi PWD`, `WiFi KeyManagement` FROM `Contoller Parameters`")
        result = self.cur.fetchall()
        return result

@app.route('/ipsettings')
def ipsettings():

    def db_query():
        db = Database()
        ipset = db.list_ipsettings()

        return ipset

    ips = db_query()

    return render_template('ipsettings.html', result=ips, content_type = 'application/json')

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
    app.run(debug=True)
