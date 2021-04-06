from flask import Flask, request, render_template,redirect

app = Flask(__name__)

@app.route('/')
def index():
    colours = ['Red', 'Blue', 'Black', 'Orange']
    return render_template('home.html', colours=colours)

if __name__ == '__main__':
    app.run(debug=True)

