# Core/views.py

from flask import render_template, redirect, url_for, request, flash, Blueprint

core = Blueprint('core',__name__)

@core.route('/')
def dash():
    return render_template('dash.html')
