from LTI_Score_Plugin.handlers import setup_handlers
# Jupyter Extension points
def _jupyter_server_extension_paths():
    return [{
        'module': 'LTI_Score_Plugin',
    }]

def _jupyter_nbextension_paths():
    return [{
        "section": "notebook",
        "dest": "LTI_Score_Plugin",
        "src": "static",
        "require": "LTI_Score_Plugin/main"
    }]

def load_jupyter_server_extension(nbapp):
    setup_handlers(nbapp)
    
