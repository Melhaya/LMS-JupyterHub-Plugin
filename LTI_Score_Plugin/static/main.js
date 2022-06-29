define([
    'base/js/namespace', 'base/js/events', 'base/js/dialog', 'require'
], function (
    Jupyter, requirejs, events, dialog
) {
        var prefix = 'lti-jupyter-extension';
        var submitActionName = 'submit-assignment';
        var PythonShell = require('python-shell');

        function load_ipython_extension() {
            $('<link/>')
                .attr({
                    id: 'collapsible_headings_css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: requirejs.toUrl('./main.css')
                })
                .appendTo('head');

            var action = {
                span: 'Submit assignment to openhpi',
                help: 'Submit assignment to openhpi',
                help_index: 'zz',
                handler: score_request
            };

            Jupyter.actions.register(action, submitActionName, prefix);
            Jupyter.toolbar.add_buttons_group([{
                'action': prefix + ':' + submitActionName,
                'label': 'Submit assignment to openhpi'
            }], submitActionName)

        }

        function score_request() {
            var re = /\/notebooks(.*?)$/;
            //console.log(re, 'a7a_00')
            //console.log(window.location.pathname, 'a7a_01')
            
            var filepath = window.location.pathname.match(re)[1];
            console.log(filepath, 'a7a_0')
            
            var pyshell = new PythonShell('test_code_white.py');

            pyshell.send(JSON.stringify([1,2,3,4,5]));

            pyshell.on('message', function (message) {
                // received a message sent from the Python script (a simple "print" statement)
                console.log(message);
            });

            // end the input stream and allow the process to exit
            pyshell.end(function (err) {
                if (err){
                    throw err;
                };

                console.log('finished');
            });

            
            
            Jupyter.actions.call("jupyter-notebook:save-notebook");
            try {
                var cell = Jupyter.notebook.get_cell(-2);
                var text = cell.get_text();
                var arr = text.split("#");
                console.table(arr,'a7a_1')
                console.log(arr, 'a7a_2')
                var course = arr[2].split(":")[1].trim();
                var assignment = arr[3].split(":")[1].trim();
                var institute = arr[4].split(":")[1].trim();
            }
            catch (err) {
                alert("The first cell doesn't contain the Web-CAT assignment "
                    + "identification parameters. Make sure your first cell "
                    + "contains your assignment parameters. For example: \n\n"
                    + "# Do not edit this cell\n\n"
                    + "# course: 123\n"
                    + "# a: Assignment 1\n"
                    + "# d: VT");
                return;
            }
            var payload = {
                'filename': filepath,
                'course': course,
                'a': assignment,
                'd': institute
            };
            var settings = {
                url: '/webcat/push',
                processData: false,
                type: "PUT",
                dataType: "json",
                data: JSON.stringify(payload),
                contentType: 'application/json',
                success: function (data) {
                    var iframe_html = '<iframe src="' + data.redirectLink +
                        '" width = 650 height = 500></iframe>';
                    dialog.modal({
                        title: "Web-CAT",
                        body: iframe_html,
                        sanitize: false,
                        buttons: {
                            'Close': {}
                        }
                    });
                },
                error: function (data) {
                    alert("Error while submitting to Web-CAT");
                }
            };

            // commit and push
            $.ajax(settings);
        }

        return {
            load_ipython_extension: load_ipython_extension
        };
    });
