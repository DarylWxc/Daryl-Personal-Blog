---
title: Database-Notes
date: 2024-11-03 20:30:29
tags:
 - Database
categories: Back-End
---
# Syntax of SQLQuery
 - DESC(descending order:Highest to Lowest),ASC(ascending order:Lowest to Highest)
 - between - used to match the date datatype
 - % - match string(example:"Ca%","%Ca%","%Ca")
 - like - match string, use with %
 - is null/is not null - match data is null or not
 - Distinct - match unique data column
 - Datediff - match difference of datetime datatype
 - join - join different tables together with condition
 - <> - means two data is different
 - SUM/MAX/COUNT/MIN - aggregate func for summarizing data
 - left join - return all records from left table and matching records from the right one(Outer Join)
 - right join -  returns all records from right table and matching records from the left one(Outer Join)
 - full join - return unmatched rows from both tables
 - cross join -  used to combine every row from one table with every row from another table
 - group - GROUP BY is used to aggregate rows that have the same values in specified columns into summary rows
 - Having - HAVING is used to filter grouped records. Its similar to WHERE but works on groups (aggregated data) rather than individual rows
 - Use Having to filter Group data
 - Where filter rows before group,Having is after group
 - SubQuery -  a query nested within another query,used to achieve various functions, such as filtering, calculating, or joining data
 1. use in where clause(Where column in (subquery))//return rows match the condition
 2. use in from clause(From (SubQuery)) // treated like a temporary table
 3. use in select clause(Select (SubQuery)) // used to return a single value from another query within the column list
 4. Correlated SubQuery (Where * > (SubQuery)) // refers to columns in the outer query and is evaluated for each row of the outer query
 5. use in having clause (HAVING * > (SubQuery)) // used to filter groups based on a calculated condition
 - GetData() - return datetime of now
 - update /db.name/ set column = value, where(condition)
 - delete tablename where condition
 - insert inot tablename (columnname,..) values(columnValue)
 - Top(N) // return N rows from query result by order
 - offset //skips a specified number of rows before beginning to return rows from the result set.
 - fetch // limits the number of rows returned after the OFFSET.
 - (OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY) // Skip first 10 rows,retrieves the next 10 rows after the skipped rows
 - NOT,AND,OR // Order of precedence for compound conditions
 - IN // With a condition of range

# slides
## SQL DML statements
 - Select
 - insert
 - update
 - delete
## SQL DDL statements
 - create Database
 - create table
 - create index
 - alter table
 - alter index
 - drop Database
 - drop table
 - drop index
