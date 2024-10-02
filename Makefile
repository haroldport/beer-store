# Makefile for Beer Store Project

# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend/beer-store-ui

# Docker commands
.PHONY: docker-up
docker-up:
	docker-compose up -d

.PHONY: docker-down
docker-down:
	docker-compose down

.PHONY: docker-rebuild
docker-rebuild:
	docker-compose up -d --build

.PHONY: docker-logs
docker-logs:
	docker-compose logs -f

.PHONY: docker-test
docker-test: docker-test-backend docker-test-frontend

.PHONY: docker-test-backend
docker-test-backend:
	docker-compose run --rm backend python manage.py test

.PHONY: docker-test-frontend
docker-test-frontend:
	docker-compose run --rm frontend npm test

# Backend commands (without Docker)
.PHONY: install-backend
install-backend:
	cd $(BACKEND_DIR) && pipenv install

.PHONY: run-backend
run-backend:
	cd $(BACKEND_DIR) && pipenv run python manage.py runserver

.PHONY: test-backend
test-backend:
	cd $(BACKEND_DIR) && pipenv run python manage.py test

# Frontend commands (without Docker)
.PHONY: install-frontend
install-frontend:
	cd $(FRONTEND_DIR) && npm install

.PHONY: run-frontend
run-frontend:
	cd $(FRONTEND_DIR) && npm run dev

.PHONY: test-frontend
test-frontend:
	cd $(FRONTEND_DIR) && npm test

# Combined commands (without Docker)
.PHONY: install-all
install-all: install-backend install-frontend

.PHONY: run-all
run-all:
	$(MAKE) -j2 run-backend run-frontend

.PHONY: test-all
test-all: test-backend test-frontend