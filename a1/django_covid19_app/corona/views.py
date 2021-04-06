import requests
import json
from django.shortcuts import render

def home(request):

    url = "https://covid-193.p.rapidapi.com/statistics"

    querystring = {"country":"India"}

    headers = {
        'x-rapidapi-host': "covid-193.p.rapidapi.com",
        'x-rapidapi-key': "007b67e2dcmsh64603150f8cdae1p12ea30jsn595a81ea684b"
        }

    response = requests.request("GET", url, headers=headers, params=querystring).json()

    data = response['response']

    d = data[0]

    print(d)

    context = {
        'all': d['cases']['total'],
        'recovered': d['cases']['recovered'],
        'deaths': d['deaths']['total'],
        'new': d['cases']['new'],
        'critical': d['cases']['critical'],
        'tests': d['tests']['total']
    }

    return render(request, 'corona/home.html', context)
