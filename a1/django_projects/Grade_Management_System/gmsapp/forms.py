from django import forms
from .models import StudentsInfo, AdminInfo

class StudentForm(forms.ModelForm):
    class Meta:
        model = StudentsInfo
        fields = ['username','email','date_of_birth','phone_no','address']

class AdminForm(forms.ModelForm):
    class Meta:
        model = AdminInfo
        fields = ['username','email','date_of_birth','phone_no','address']
