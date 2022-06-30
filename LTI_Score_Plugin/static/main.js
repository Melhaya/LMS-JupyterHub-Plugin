define(['base/js/namespace', 'require', 'base/js/events', 'base/js/dialog'], 
       function (Jupyter, requirejs, events, dialog)
       {
        var prefix = 'lti-jupyter-extension';
        var submitActionName = 'submit-score';

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
                span: 'Submit score',
                help: 'Submit score',
                help_index: 'zz',
                handler: score_request
            };

            Jupyter.actions.register(action, submitActionName, prefix);
            Jupyter.toolbar.add_buttons_group([{
                'action': prefix + ':' + submitActionName,
                'label': 'Submit score'
            }], submitActionName)

        }

         function get_score(){
            $.ajax({
              url: "./unit_test.py",
             context: document.body
            }).done(function(data) {
             console.log(data)
             alert('finished python script');;
            });
        }
        function score_request() {
            var re = /\/notebooks(.*?)$/;
            //console.log(window.location.pathname, 'a7a_01')
            
            var filepath = window.location.pathname.match(re)[1];
            console.log(filepath, 'a7a_0')
               
            
            Jupyter.actions.call("jupyter-notebook:save-notebook");
            try {
               
             /*
            var PythonShell = require(pythonshell);
            var pyshell = new PythonShell('./unit_test.py');
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

            */
                get_score()
                   
                var cell = Jupyter.notebook.get_cell(-2);
                var text = cell.get_text();
                var arr = text.split("#");
                console.table(arr,'a7a_1')
                //console.log(arr, 'a7a_2')
                //var course = arr[2].split(":")[1].trim();
                //var assignment = arr[3].split(":")[1].trim();
                //var institute = arr[4].split(":")[1].trim();
                var score = "2.0/4.0";
                alert(`Your score is: ${score}`);
                //var course = arr[2].split(":")[1].trim();
            }
            catch (err) {
                alert("Currently the grading script is not deployed");
                return;
            }
            return;
               
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
