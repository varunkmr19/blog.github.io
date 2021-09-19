---
title: How Sessions work in Django
date: '2021-09-19'
tags: ['django', 'sessions', 'cookie']
draft: false
summary: 'In this article, we will discuss what sessions are, how they are different from cookies and how they work with Django.'
---

# Introduction

Before talking about sessions we have to understand first what cookies are. Cookies and sessions are two different things but a lot of people get confused between the two because one of the most common uses of cookies is to establish and maintain sessions.

# Multi-User/Multi-Browser (Problem)

- When a server is interacting with many different browsers at the same time, the server needs to know which browser a particular request came from.
- Request/Response initially was stateless - all browsers looked identical. This was really bad and did not last very long at all.

# Web cookies to the rescue

Technically, cookies are arbitrary pieces of data chosen by the Web server and sent to the browser. The browser returns them unchanged to the server, introducing a state (memory of previous events) into otherwise stateless HTTP transactions. Without cookies, each retrieval of a Web page or component of a Web page is an isolated event, mostly unrelated to all other views of the pages of the same site.

![cookie_walkthrough](/static/images/django_sessions/cookie.png)

# Cookies in the Browser

- Cookies are marked as to the web addresses they come from. The browser only sends back cookies that were originally set by the same web server.
- Cookies have an expiration date. Some last for years, others are short-term and go away as soon as the browser is closed.

Let’s look at an example of how we can set and get cookies using Django.

```py
def cookie(request):
	print(request.COOKIES)
	res = HttpResponse('hello, cookies!')
	res.set_cookie('test', 24) # No expired date = until browser close
	res.set_cookie('test2','hello, world!', max_age=1000) # seconds until expire
	return res
```

Now if we look at the storage tab of our browser we can see the two cookies that were set by the function above.

![set_cookie_example](/static/images/django_sessions/cookie_example.png)
All these cookies are sent back to the server inside the request header.

# In the Server - Sessions

- In most server applications, as soon as we start a session for a new (unmarked) browser we create a session.
- We set a session cookie to be stored in the browser, which indicates the session id in use - gives this browser a unique mark.
- The creation and destruction of sessions is handled by a Django middleware that we use in our applications.

# Session Identifier

- A large, random number that we place in a browser cookie the first time we encounter a browser
- This number is used to pick from the many sessions that the server has active at any one time.
- Server software stores data in the session that it wants to have from one request to another from the same browser.
- Shopping cart or login information is stored in the session on the server.

In Django, we have to enable this using the middleware in **settings.py**. But, if you have created your project through **django-admin** then, it’s already set up for you.

```py
MIDDLEWARE = [
	...
	'django.contrib.sessions.middleware.SessionMiddleware',
	...
]
```

There are different ways to store sessions Django, by default stores sessions in the Database. So, when you migrate your Django project you must have seen something like:

```bash
Applying sessions.0001_initial... OK
```

# Django Sessions

- The incoming **request** object has a **request.session** attribute that we can treat like a dictionary that persists from one request to the next request
- As long we have the session middleware enabled in **settings.py** and the database table, and the browser allows cookies, we just store and read **request.session** in our views and pretend it is magic.

Django stores the sessions inside the **django_session** table. It uses **base64** parsing library with the **secret_key** as salt to encrypt the session. If we decode the using the base64 decoder it will return a **key:value** pair. Where key is the **session_id** that we store in the browser as a cookie and the value is the actual session data.
