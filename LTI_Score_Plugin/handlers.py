"""This file receives a request from the front-end Jupyter extension and pushes
the grade back to the LMS"""

import os
import json
import urllib
import requests

from notebook.utils import url_path_join as ujoin
from notebook.base.handlers import IPythonHandler
from bs4 import BeautifulSoup


class UNCodePushHandler(IPythonHandler):

    @property
    def notebook_dir(self):
        return self.settings['notebook_dir']

    def error_and_return(self, dirname, reason):

        # send error
        self.send_error(500, reason=reason)

        # return to directory
        os.chdir(dirname)

    def put(self):

        # obtain filename and msg for commit
        data = json.loads(self.request.body.decode('utf-8'))
        filename = urllib.parse.unquote(data['filename'])
        course = urllib.parse.unquote(data['course'])
        assignment = urllib.parse.unquote(data['a'])
        institute = urllib.parse.unquote(data['d'])

        payload = {
            'course': course,
            'a': assignment,
            'd': institute
            }

        url = ''

        filepath = self.notebook_dir + filename

        files = {'file1': open(filepath, 'rb')}
        redirect_link = ""
        try:
            response = requests.post(url, data=payload, files=files)
            soup = BeautifulSoup(response.content, "html.parser")
            for link in soup.findAll('a'):
                redirect_link = link.get('href')
        except Exception as e:
            print(e)
            self.error_and_return(filepath, "Could send request because: "+ str(e))
            return

        # close connection
        self.write(json.dumps({'status': 200,
                               'statusText': self.notebook_dir+"/"+filename,
                               'responseText': response.content.decode("utf-8"),
                               'redirectLink': redirect_link}))


def setup_handlers(nbapp):
    webapp = nbapp.web_app
    route_pattern = ujoin(webapp.settings['base_url'], '/uncode/push')
    webapp.settings['notebook_dir'] = nbapp.notebook_dir
    webapp.add_handlers('.*', [(route_pattern, UNCodePushHandler)])
