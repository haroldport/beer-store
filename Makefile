# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend/beer-store-ui

# Backend commands
.PHONY: install-backend
install-backend:
	cd $(BACKEND_DIR) && pipenv install

.PHONY: run-backend
run-backend:
	cd $(BACKEND_DIR) && pipenv run python manage.py runserver

.PHONY: test-backend
test-backend:
	cd $(BACKEND_DIR) && pipenv run pytest

# Frontend commands
.PHONY: install-frontend
install-frontend:
	cd $(FRONTEND_DIR) && npm install

.PHONY: run-frontend
run-frontend:
	cd $(FRONTEND_DIR) && npm run dev

.PHONY: test-frontend
test-frontend:
	cd $(FRONTEND_DIR) && npm test

# Combined commands
.PHONY: install-all
install-all: install-backend install-frontend

.PHONY: run-all
run-all:
	$(MAKE) -j2 run-backend run-frontend

.PHONY: test-all
test-all: test-backend test-frontend

# Docker commands
.PHONY: docker-up
docker-up:
	docker-compose up -d

.PHONY: docker-down
docker-down:
	docker-compose down

.PHONY: docker-build
docker-build:
	docker-compose build

.PHONY: docker-test-backend
docker-test-backend:
	docker-compose run --rm backend pytest

.PHONY: docker-logs
docker-logs:
	docker-compose logs -f