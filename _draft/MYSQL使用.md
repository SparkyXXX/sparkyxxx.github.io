## MySQL 扫盲

连接到数据库

```bash
mysql -u username -p
```

所有的 mysql 语句以分号结尾

数据库操作

```sql
table_name create database database_name; -- 创建数据库
drop database database_name; -- 删除数据库
show databases; -- 查看当前数据库
use database_name; -- 选择要操作的数据库
```

表操作

```sql
create table table_name(
	name int
	name varchar(100)
) -- 创建表，小括号中填写列名和数据类型
desc table_name; -- 查看表结构
# 以下四条语句用于修改表结构
alter table table_name modify column name varchar(200);
alter table table_name rename column name to nickname;
alter table table_name add column content text;
alter table table_name drop column content;
drop table table_name; --删除表
```

数据操作

```sql
insert into table_name (id, name) values (1, "user_name1"), (2, "user_name2"); --插入一条数据，values后面跟上多组数据可以添加多条数据
select column_name from table_name; -- 按列名查询数据，*表示所有列
update table_name set name = "new_name" where id = 1; --修改数据，where后面为条件字句，根据实际情况修改
delete from table_name where id = 2; --删除数据
```

查询可以通过 where 语句配合 AND，OR，NOT，BETWEEN…AND…，IN，IS 等关键字进行，LINK 可以进行模糊搜索，REGEXP 用于正则表达式匹配。

子查询机制，实质上就是查询的嵌套，即将一个查询的结果作为另一个查询的条件，类似于链式调用

表关联机制，通过主键约束和外键约束关联多个表的数据，实质上是笛卡尔积+过滤条件