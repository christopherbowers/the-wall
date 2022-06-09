# The Wall App

## By Christopher Bowers

Requirements:

- Python 3.0+
- pipenv
- postgreSQL
- node 16+

### Django Back End

``` shell
cd api
pipenv shell
pipenv install
psql -f settings.sql
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Next JS Front End

``` shell
cd client
yarn && yarn dev
```
