FROM python:3.12

WORKDIR /app

RUN pip install pipenv

ENV PIPENV_VENV_IN_PROJECT=1

COPY Pipfile Pipfile.lock ./

RUN pipenv install --dev --system --deploy

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]