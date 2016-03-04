# Schema Information

## images
## users
## rooms
## medical_schools
## bookings


## rooms
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      | not null
host_id     | integer   | not null, foreign key (references users), indexed
lat         | integer   | not null
lng         | integer   | not null
image_url   | string    | not null
price       | integer   | not null
date_from   | datetime  | not null
date_to     | datetime  | not null
home_type   | string    | not null
room_type   | string    | not null

## messages
column name | data type | details
------------|-----------|-----------------------
date_from   | date      | not null
date_to     | date      | not null
content     | text      | not null
messager_id | integer   | not null, foreign key (references users), indexed
room_id     | integer   | not null, foreign key (references rooms), indexed
read_status | boolean   | not null, defaults: false

## bookings
column name | data type | details
------------|-----------|-----------------------
date_from   | date      | not null
date_to     | date      | not null
booker_id   | integer   | not null, foreign key (references users), indexed
room_id     | integer   | not null, foreign key (references rooms), indexed
confirmation| boolean   | not null, defaults: false

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
