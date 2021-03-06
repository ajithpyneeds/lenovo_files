from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib.auth.models import User
from django import forms
from .models import Ipsettingsmodel, Door1model, Door2model, Door3model, Door4model

class IpsettingsmodelForm(forms.ModelForm):

    class Meta:
        model = Ipsettingsmodel
        fields = ['ipaddress', 'subnet', 'gateway', 'ippass', 'keymanagement',]

class Door1Form(forms.ModelForm):

    class Meta:
        model = Door1model
        fields = ['door1name', 'doorsensor', 'lockreleasetime', 'doormonitoringtime', 'alarrmtime']

class Door2Form(forms.ModelForm):

    class Meta:
        model = Door2model
        fields = ['door2name', 'doorsensor', 'lockreleasetime', 'doormonitoringtime', 'alarrmtime']

class Door3Form(forms.ModelForm):

    class Meta:
        model = Door3model
        fields = ['door3name', 'doorsensor', 'lockreleasetime', 'doormonitoringtime', 'alarrmtime']

class Door4Form(forms.ModelForm):

    class Meta:
        model = Door4model
        fields = ['door4name', 'doorsensor', 'lockreleasetime', 'doormonitoringtime', 'alarrmtime']

class EditProfileForm(UserChangeForm):
    password = forms.CharField(label="", widget=forms.TextInput(attrs={'type': 'hidden'}))

    class Meta:
        model = User
        fields = ('username','first_name','last_name','email', 'password',)

    def __init__(self, *args, **kwargs):
        super(EditProfileForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'Username'
        self.fields['username'].help_text = '<small class="form-text text-muted">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</small>'
        self.fields['username'].label = "Username:"

        self.fields['first_name'].widget.attrs['class'] = 'form-control'
        self.fields['first_name'].widget.attrs['placeholder'] = 'First Name'
        self.fields['first_name'].label = "First Name:"

        self.fields['last_name'].widget.attrs['class'] = 'form-control'
        self.fields['last_name'].widget.attrs['placeholder'] = 'Last Name'
        self.fields['last_name'].label = "Last Name:"

        self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['email'].widget.attrs['placeholder'] = 'Email Address'
        self.fields['email'].label = "Email Address:"

class SignUpForm(UserCreationForm):
    email = forms.EmailField(label="", widget=forms.TextInput(attrs={'class': 'form-control','placeholder':'Email Address'}))
    first_name = forms.CharField(label="", max_length=100,widget=forms.TextInput(attrs={'class': 'form-control','placeholder':'First Name'}))
    last_name = forms.CharField(label="", max_length=100,widget=forms.TextInput(attrs={'class': 'form-control','placeholder':'Last Name'}))

    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password1','password2')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'Username'
        self.fields['username'].help_text = '<small class="form-text text-muted">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</small>'
        self.fields['username'].label = ""

        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = 'Password'
        self.fields['password1'].help_text = '<ul class="form-text text-muted small"><li>Your password can\???t be too similar to your other personal information.</li><li>Your password must contain at least 8 characters.</li><li>Your password can\???t be a commonly used password.</li><li>Your password can\???t be entirely numeric.</li></ul>'
        self.fields['password1'].label=""

        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = 'Confirm Password'
        self.fields['password2'].help_text = '<small class="form-text text-muted">Enter the same password as before, for verification.</small>'
        self.fields['password2'].label=""
