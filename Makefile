# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend/beer-store-ui

# Backend commands (without Docker)
.PHONY: install-backend
install-backend:
	cd $(BACKEND_DIR) && pipenv --venv || true
	cd $(BACKEND_DIR) && pipenv --python 3.12 install --dev

.PHONY: run-backend
run-backend:
	cd $(BACKEND_DIR) && pipenv run python manage.py runserver

.PHONY: test-backend
test-backend:
	cd $(BACKEND_DIR) && pipenv run test

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
	docker-compose down

.PHONY: docker-test-frontend
docker-test-frontend:
	docker-compose run --rm frontend npm run test

.PHONY: docker-test-all
docker-test-all: docker-test-backend docker-test-frontend

.PHONY: docker-logs
docker-logs:
	docker-compose logs -f