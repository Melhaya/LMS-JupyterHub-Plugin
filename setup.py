import setuptools

setuptools.setup(
    name="LTI_Score_Plugin",
    version='0.1.0',
    url="https://github.com/Melhaya/LMS-JupyterHub-Plugin",
    author="Mohamed Elhayany",
    description="Jupyter Notebook Plugin for submitting score to LMS through LTI",
    packages=setuptools.find_packages(),
    install_requires=[
        'bs4',
        'gitpython',
        'requests',
        'python-shell'

    ],
    package_data={'LTI_Score_Plugin': ['static/*']},
)
