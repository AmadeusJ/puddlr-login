from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie         # Generate the 'csrftoken' in cookie
def index(request):
    return render(request, 'index.html')

    