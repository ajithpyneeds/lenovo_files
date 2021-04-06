from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'many random bytes'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Ajith$hp10'
app.config['MYSQL_DB'] = 'NXMD4W'

mysql = MySQL(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/ipsettings', methods=['GET','POST'])
def ipsettings():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `IP_Address`, `Subnet`, `Gateway`, `WIFI_IP_Address`, `WiFi_Gateway`, `WiFi_PWD`, `WiFi_KeyManagement` FROM `Controller_Parameters`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('ipsettings.html', data = fetchdata)

@app.route('/insert_ipsettings', methods = ['POST'])
def insert_ipsettings():

    if request.method == "POST":
        flash("Data Inserted Successfully")
        IP_Address = request.form['IP_Address']
        Subnet = request.form['Subnet']
        Gateway = request.form['Gateway']
        WIFI_IP_Address = request.form['WIFI_IP_Address']
        WiFi_Gateway = request.form['WiFi_Gateway']
        WiFi_PWD = request.form['WiFi_PWD']
        WiFi_KeyManagement = request.form['WiFi_KeyManagement']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `Controller_Parameters` (IP_Address, Subnet, Gateway, WIFI_IP_Address, WiFi_Gateway, WiFi_PWD, WiFi_KeyManagement) VALUES (%s, %s, %s, %s, %s, %s, %s)")
        mysql.connection.commit()
        return redirect(url_for('insert_ipsettings'))

@app.route('/parameters', methods=['GET','POST'])
def parameters():
    controller = ['Controller 1', 'Controller 2', 'Controller 3']
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Controller_Name`, `Controller_ID`, `Controller_Type`, `Fire_Alarm_Time`, `Aux_Alarm_Time`, `Heartbeat_Time`, `Heartbeat_URL`, `Port_No`, `Concurrent_Conn`, `Mode`, `Interlock`  FROM `Controller_Parameters`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('parameters.html', data = fetchdata, controller=controller)

@app.route('/door1')
def door1():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, `Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door1.html', data = fetchdata)

@app.route('/door2')
def door2():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, `Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door2.html', data = fetchdata)

@app.route('/door3')
def door3():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, `Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door3.html', data = fetchdata)

@app.route('/door4')
def door4():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Name`, `Lock Release Time`, `Lock Monitoring Time`, `Alarm Time` FROM `Door Parameter`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('door4.html', data = fetchdata)

@app.route('/holiday')
def holiday():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `RecordID`, `Holiday_Date`, `Holiday_Description` FROM `Holidays`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('holiday.html', data = fetchdata)

@app.route('/insert_holiday', methods = ['POST'])
def insert_holiday():

    if request.method == "POST":
        flash("Data Inserted Successfully")
        Holiday_Date = request.form['Holiday_Date']
        Holiday_Description = request.form['Holiday_Description']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO Holidays (Holiday_Date, Holiday_Description) VALUES (%d, %s)")
        mysql.connection.commit()
        return redirect(url_for('holiday'))

@app.route('/timezone')
def timezone():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `TimeZone Name`, `Start Time`, `End Time`, `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Holiday`, `Anti Passback`, `Verification Mode`, `Validity Date` FROM `Time Zone`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('timezone.html', data = fetchdata)

@app.route('/enrollment', methods=['GET','POST'])
def enrollment():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `ID`, `Employee_ID`, `Employee_Name`, `Card_Number`, `UHF_Card_Number`, `PIN`, `Validity` FROM `Enroll_Info`")
    fetchdata = cur.fetchall()
    cur.close()

    return render_template('enrollment.html', data = fetchdata)

@app.route('/insert_enrollment', methods = ['POST'])
def insert_enrollment():

    if request.method == "POST":
        flash("Data Inserted Successfully")
        Employee_ID = request.form['Employee_ID']
        Employee_Name = request.form['Employee_Name']
        Card_Number = request.form['Card_Number']
        UHF_Card_Number = request.form['UHF_Card_Number']
        PIN = request.form['PIN']
        Validity = request.form['Validity']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `Enroll_Info` (fetchdata) VALUES (%i, %s, %i, %i, %i, %Y%m%d)",(Employee_ID,Employee_Name,Card_Number,UHF_Card_Number,PIN,Validity))
        mysql.connection.commit()
        return redirect(url_for('insert_enrollment'))

@app.route('/usertimezone')
def usertimezone():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Record ID`, `Employee Name`, `Employee ID`, `TimeZone Name` FROM `Employee TimeZone`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('usertimezone.html', data = fetchdata)

@app.route('/general')
def general():
    return render_template('general.html')

@app.route('/emergency')
def emergency():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `Door Number`, `Fire Open`, `Fire Close`, `Aux Open`, `Aux Close` FROM `Emergency`")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('emergency.html', data = fetchdata)

@app.route('/transaction')
def transaction():
    return render_template('transaction.html')

if __name__ == '__main__':
    app.run(debug=True)
