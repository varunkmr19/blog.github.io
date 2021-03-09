---
title: PostgreSQL Joins
date: '2021-05-08'
tags: ['database', 'postgresql']
draft: true
summary: 'In this tutorial, you will learn about various kinds of PostgreSQL joins including inner join, left join, right join, and full outer join.'
---

# Introduction

Joins are one of the most powerful concepts of Relational Databases. As the name suggests "Join" means "to combine". In SQL Join statement is used to combine data or rows from two or more tables based on a common field between them.

A more formal defination would be:

> Join is used to combine columns from one (self-join) or more tables based on the values of the common columns between related tables.

### Why do we need Join

Suppose you have two tables which manages customer details (Customer) and sales log (Sales).

![inner_join](/static/images/why_join.png)
