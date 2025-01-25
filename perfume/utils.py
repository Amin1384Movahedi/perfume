import json
import os
from django.conf import settings

def read_json_file(filename):
    file_path = os.path.join(settings.BASE_DIR, filename)
    with open(file_path, 'r') as json_file:
        return json.load(json_file)