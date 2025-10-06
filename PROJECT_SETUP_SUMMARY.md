# HOSTINGSITE - Project Setup Summary

**Generated on**: 2025-10-06 19:04:59

## 🎯 Project Overview

**Name**: hostingsite
**Description**: this will be used to host static react or markdown files.
**Domain**: Education
**Target Users**: family
**Python Version**: 3.13.1

## 🎨 Design & Theme

**Primary Color**: #0066cc
**Secondary Color**: #6c757d
**Accent Color**: #28a745
**Design Style**: Friendly
**Border Radius**: 8px
**Shadow Style**: Medium
**Dark Mode**: Disabled
**Mobile Navigation**: Hamburger
**Share Image**: Not provided - add later

## ⚙️ Technical Configuration

**Development Database**: SQLITE
**Features Enabled**:
- ❌ Celery (Background Tasks)
- ❌ Redis (Caching)
- ❌ REST API
- ❌ Sentry Error Tracking

**Remote Backup**: Not configured


## 🏗️ Architecture Details

**Development Workflow**:
- Local development with pyenv (no Docker)
- Hot reload with `python manage.py runserver`
- SQLITE database for development

**Production Stack**:
- Docker Compose orchestration
- PostgreSQL database
- Nginx web server with security headers
- Gunicorn WSGI server
- Automated build/deploy via build.sh

**CSS Architecture**:
- Custom component system (NO Bootstrap/Tailwind)
- Mobile-first responsive design
- CSS variables for consistent theming
- Component-based organization in static/css/components/

## 📁 Generated Project Structure

```
hostingsite/
├── CLAUDE.md                    # Project memory (IMPORTANT for AI context)
├── build.sh                     # Production deployment automation
├── Makefile                     # Development commands (make help)
├── .python-version              # Auto pyenv activation
├── .pre-commit-config.yaml      # Code quality automation
├── README.md                    # Project overview
│
├── apps/                        # Django applications
│   └── core/                   # Base functionality
├── config/                      # Django settings
│   └── settings/               # Environment-specific settings
├── static/                      # Static assets
│   ├── css/                    # Custom CSS framework
│   │   ├── base.css            # Generated theme with your colors
│   │   └── components/         # Reusable components (buttons, forms, etc.)
│   ├── img/                    # Images
│   │   └── default-share.*     # Default share image (PWA/OG)
│   ├── js/                     # JavaScript
│   │   └── service-worker.js   # PWA service worker
│   └── manifest.json           # PWA manifest
├── templates/                   # Django templates
├── docs/                       # Comprehensive documentation
│   ├── SETUP_GUIDE.md         # Complete setup instructions
│   ├── BEGINNERS_GUIDE.md     # Tutorial for new developers
│   ├── STYLE_GUIDE.md         # Custom styling guidelines
│   ├── CODING_GUIDE.md        # Development standards
│   ├── FILE_HANDLING.md       # File upload & storage guide
│   └── PWA_SETUP.md           # PWA & Open Graph configuration
│
├── requirements/               # Python dependencies
├── nginx/                      # Production nginx config
├── docker-compose.yml          # Production containers
└── Dockerfile                  # Production image
```

## 🚀 Key Commands Reference

**Development**:
```bash
make run          # Start development server
make test         # Run tests
make shell        # Django shell
make migrate      # Database migrations
make format       # Auto-format code
make lint         # Check code quality
```

**Production**:
```bash
make deploy       # Deploy with backup
make backup       # Backup database
./build.sh -r -d $(date +%Y%m%d)  # Full rebuild
```

## 🎯 Domain-Specific Context

**Industry**: Education
**Compliance Requirements**: none
**Special Features**: none

## 📋 Next Development Tasks

1. **Django Setup**:
   - Move settings.py to config/settings/ structure
   - Create base, development, and production settings
   - Add 'apps.core' to INSTALLED_APPS

2. **Model Development**:
   - Define domain models in apps/core/models.py
   - Create migrations and migrate
   - Set up admin interface

3. **Frontend**:
   - Custom CSS components are ready in static/css/
   - Mobile-first templates in templates/
   - No Bootstrap/Tailwind - use custom system

4. **Quality Setup**:
   - Pre-commit hooks configured
   - Code formatting with black/isort
   - Linting with flake8

## 🤖 AI Assistant Instructions

When helping with this project:

1. **NEVER suggest Bootstrap/Tailwind** - We have a complete custom CSS system
2. **Always think mobile-first** - Every component starts with mobile design
3. **Use the custom CSS variables** - Primary: #0066cc, etc.
4. **Follow the build.sh pattern** - Production deployment via Docker
5. **Reference CLAUDE.md** - Contains living project context
6. **Domain focus**: This is a Education application for family

## 🔧 Quick Context for Development

**Current Status**: Fresh project setup completed
**Ready for**: Django project creation and initial model development
**Architecture**: Same proven patterns as Keep-Logging project
**Styling**: Custom Friendly theme with #0066cc primary color
**Deployment**: Docker production, pyenv development

---

*This summary provides complete context for AI assistants and developers joining the project.*
