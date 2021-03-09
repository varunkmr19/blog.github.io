---
title: How to manage static files in Django
date: '2021-05-09'
tags: ['django']
draft: false
summary: 'In this article, we will discuss what static files are, how to manage them locally and at production in an Django application.'
---

# Introduction

Websites generally need to serve additional files such as images, JavaScript, or CSS. In small projects, we can work our way around by providing absolute paths to our resources or by writing inline CSS and JavaScript functions in the HTML files. This is not only against the best coding practices but it also gets tricky when we are handling bigger projects, especially with multiple applications.

> In Django, we refer to these files as “static files”.

In this article, we will see how we can deal with multiple sets of static files provided by each application to customize the look and feel of a website.

# Configuring static files

Django provides tremendous flexibility on how we can serve the static files. We will cover using the static files in local development as well as in production which is slightly more complex. First things first, let's do the basic configuration.

Django provides **django.contrib.staticfiles** to help us collect static files from each of our applications (and any other places we specify) into a single location that can easily be served in production.

In our settings.py file, our **INSTALLED_APPS** should look like this:

```py
INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.admin',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles', # To serve static files
]
```

**STATIC_ROOT** is the path that defines where our static files will be collected. We'll provide an absolute path to **STATIC_ROOT** in **settings.py**.

To do this, we'll use the **os** module's **dirname()** function to get the name of the directory we'd like to host these files in and define the path:

```py
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')
```

Then, we need to specify a **STATIC_URL** which is the URL used when referring to static files. It must end with **/** if it is set to any value except **None**. The following path means that static files will be stored in the location **http://localhost:8000/static/** or **http://127.0.0.1:8000/static/**:

```py
STATIC_URL = '/static/'
```

Django has a list of finders as **STATICFILES_FINDERS** that it uses to locate static files. One of the default finders is **AppDirectoriesFinder** that looks for a folder named static within each of our INSTALLED_APPS.

For example, if our project contains an application named **users**, we might create a directory such as **project_name/users/static/index.css** to add CSS files related to that app.

Even though this works, it is a better idea to create another subdirectory with our application name such as **project_name/users/static/users/index.css**. This is important when we have two or more static files with similar names.

To use a commonplace for all static files in our project directory, we need to configure **STATICFILES_DIRS** to inform Django about our new directory because **AppDirectoriesFinder** will look for **static** in **app** directories only. We can also define multiple locations for our static files.

```py
import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT  = os.path.join(PROJECT_ROOT, 'staticfiles')
STATIC_URL = '/static/'

# Extra lookup directories for collectstatic to find static files
STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'static'),
)
```

The static files are ready to be used in our project. We just need to load the **static** template tag by **{% load static %}** and then use the **static** template tag to build the URL for the given relative path. Let's see how we can use static files in our template file **layout.html**:

```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
  <head>
    <title>Test App</title>
  </head>
  <body>
    <h1 class="greet">hello, world!</h1>
    {% block content %} {% endblock %}
  </body>
</html>
```

The **layout.html** includes the **greet** class for **h1** is defined in the **static/app/index.css** file.

# Serving static files during Development

In addition to the above configurations, we also need to actually serve the static files. If you use **django.contrib.staticfiles** as explained above, **runserver** will do this automatically when **DEBUG** is set to **True**. However, it is not recommended for production because it is inefficient and insecure.

Django comes with a built-in command **collecstatic**. It compiles all static files into a single directory **STATIC_ROOT** which we already set. The final piece is the storage engine used when collecting static files with the **collectstatic** command. The storage engine can be configured by **STATICFILES_STORAGE**. Django has its own storage engine so the default value of **STATICFILES_STORAGE** is set to **django.contrib.staticfiles.storage.StaticFilesStorage**.

# Static Files in Production

There are two main steps to put static files in a production environment:

1. Run the **collectstatic** command whenever the static files change
2. Arrange for **STATIC_ROOT** to be moved to the static file server and served

**Note:** You should know that serving static files in every production will be different due to the difference in environments but the basic idea and steps remain the same. There are three main tactics to handle the static files in production:

## **Serve the static files and site from the same server:**

- Push code to deployment server
- run collectstatic
- Configure web server to serve static files under **STATIC_ROOT**

## **Serving static files from a dedicated server:**

- The most common choices for dedicated static files servers are [nginx](https://www.nginx.com/) and [stripped-down version of Apache](https://httpd.apache.org/).
- Run **collectstatic** locally
- push **STATIC_ROOT** to dedicated server's directory

## Serving static files from a cloud service:

- Install modules

```bash
$ pip3 install django-s3-storage
```

- Add Django-S3-Storage to the INSTALLED_APPS in settings.py

```py
INSTALLED_APPS = (
        ...,
        'django_s3_storage',
   )
```

- Configure Django-S3-Storage in settings.py

```py
AWS_ACCESS_KEY_ID = your_access_key_id
AWS_SECRET_ACCESS_KEY = your_secret_access_key
YOUR_S3_BUCKET = "myapp-static"

STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
AWS_S3_BUCKET_NAME_STATIC = YOUR_S3_BUCKET

# These next two lines will serve the static files directly
# from the s3 bucket
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % YOUR_S3_BUCKET
STATIC_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
```

- Push your static files to the cloud

```bash
$ python3 manage.py collectstatic --noinput
```

# Conclusion

Every web developer needs static files to make a beautiful and functional website. Django not only offers easy configuration of static files but also tremendous flexibility to play with their deployment.
