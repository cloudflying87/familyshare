"""
Core app views.
"""
from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import Content
import markdown
import structlog

logger = structlog.get_logger(__name__)


def dashboard(request):
    """Dashboard view showing all active content."""
    contents = Content.objects.filter(is_active=True)

    logger.info("dashboard_accessed", content_count=contents.count())

    context = {
        'contents': contents,
    }
    return render(request, 'core/dashboard.html', context)


def content_detail(request, slug):
    """Display a single content item (React or Markdown)."""
    content = get_object_or_404(Content, slug=slug, is_active=True)

    # Convert markdown to HTML if content_type is markdown
    rendered_content = None
    if content.content_type == 'markdown':
        rendered_content = markdown.markdown(
            content.content,
            extensions=['extra', 'codehilite', 'toc']
        )

    logger.info("content_viewed", content_slug=slug, content_type=content.content_type)

    context = {
        'content': content,
        'rendered_content': rendered_content,
    }
    return render(request, 'core/content_detail.html', context)
