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
       
        function score_request() {
            var re = /\/notebooks(.*?)$/;
            console.log(window.location.pathname, 'current_notebook_location')
            var loc = window.location.pathname
            var dir = loc.substring(0, loc.lastIndexOf('/'))
            console.log(dir, 'current directory')
               
            //var filepath = window.location.pathname.match(re)[1];
          
            Jupyter.actions.call("jupyter-notebook:save-notebook");
            
            try {
                //https://jupyterhub.xopic.de/hub/
                //http://127.0.0.1:2375
                fetch("/fetch_score").then(function (response) { 
                       return response.json();
                }).then(function (text) { console.log('GET response:'); 
                                          console.log(text.score);
                                        });
                //fetch(dir+"/fetch_score").then(response => response.json()).then(function(data){
                //       alert(data['score'], 'scoreeeeee');
                //      }
                //      );
                /*   
                var cell = Jupyter.notebook.get_cell(-2);
                var text = cell.get_text();
                var arr = text.split("#");
                console.table(arr,'a7a_1')
                var course = arr[2].split(":")[1].trim();
                var assignment = arr[3].split(":")[1].trim();
                var institute = arr[4].split(":")[1].trim();
                */
                var score = "2.0/4.0";
                alert(`Your score is: ${score}`);
                
            }
            catch (err) {
                alert("Currently the grading functionality is not deployed");
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
