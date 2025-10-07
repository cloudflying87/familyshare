"""
Core app views.
"""
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView
from django.contrib import messages
from django.core.cache import cache
from .models import Content, Comment, Car
import markdown
import structlog
import random

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

    # Generate math CAPTCHA
    if 'captcha_answer' not in request.session:
        num1 = random.randint(1, 10)
        num2 = random.randint(1, 10)
        request.session['captcha_num1'] = num1
        request.session['captcha_num2'] = num2
        request.session['captcha_answer'] = num1 + num2

    # Handle comment submission
    if request.method == 'POST':
        author_name = request.POST.get('author_name', '').strip()
        comment_text = request.POST.get('comment_text', '').strip()
        honeypot = request.POST.get('website', '')  # Honeypot field
        captcha_response = request.POST.get('captcha', '')

        # Bot protection checks
        if honeypot:  # If honeypot filled, it's a bot
            logger.warning("honeypot_triggered", content_slug=slug)
            messages.error(request, 'Invalid submission.')
            return redirect('core:content_detail', slug=slug)

        # Validate CAPTCHA
        try:
            captcha_answer = int(captcha_response)
            expected_answer = request.session.get('captcha_answer')
            if captcha_answer != expected_answer:
                logger.warning("captcha_failed", content_slug=slug)
                messages.error(request, 'Incorrect answer. Please try again.')
                # Regenerate CAPTCHA
                del request.session['captcha_answer']
                return redirect('core:content_detail', slug=slug)
        except (ValueError, TypeError):
            messages.error(request, 'Please answer the math question.')
            return redirect('core:content_detail', slug=slug)

        # Rate limiting by IP
        ip_address = request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0] or request.META.get('REMOTE_ADDR', '')
        rate_key = f'comment_rate_{ip_address}'
        comment_count = cache.get(rate_key, 0)

        if comment_count >= 5:  # Max 5 comments per hour
            logger.warning("rate_limit_exceeded", content_slug=slug, ip=ip_address)
            messages.error(request, 'Too many comments. Please wait before commenting again.')
            return redirect('core:content_detail', slug=slug)

        if author_name and comment_text:
            Comment.objects.create(
                content=content,
                author_name=author_name,
                comment_text=comment_text
            )

            # Update rate limit
            cache.set(rate_key, comment_count + 1, 3600)  # 1 hour

            logger.info("comment_created", content_slug=slug, author=author_name)
            messages.success(request, 'Comment added successfully!')

            # Regenerate CAPTCHA after successful submission
            del request.session['captcha_answer']
            return redirect('core:content_detail', slug=slug)
        else:
            messages.error(request, 'Please fill in both name and comment.')

    # Convert markdown to HTML if content_type is markdown
    rendered_content = None
    if content.content_type == 'markdown':
        rendered_content = markdown.markdown(
            content.content,
            extensions=['extra', 'codehilite', 'toc']
        )

    # Get all comments for this content
    comments = content.comments.all()

    logger.info("content_viewed", content_slug=slug, content_type=content.content_type, comment_count=comments.count())

    context = {
        'content': content,
        'rendered_content': rendered_content,
        'comments': comments,
        'captcha_question': f"{request.session.get('captcha_num1', 0)} + {request.session.get('captcha_num2', 0)}",
    }
    return render(request, 'core/content_detail.html', context)


def car_list(request):
    """Display all cars for family to compare."""
    cars = Car.objects.all().order_by('-recommendation', '-winter_rating', '-reliability_rating')

    # Calculate stats
    total_cars = cars.count()
    excellent_count = cars.filter(recommendation='excellent').count()
    good_count = cars.filter(recommendation='good').count()

    logger.info("car_list_viewed", total_cars=total_cars)

    context = {
        'cars': cars,
        'total_cars': total_cars,
        'excellent_count': excellent_count,
        'good_count': good_count,
    }
    return render(request, 'core/car_list.html', context)


def car_detail(request, pk):
    """Display detailed information about a specific car."""
    car = get_object_or_404(Car, pk=pk)

    logger.info("car_detail_viewed", car_id=car.pk, make=car.make, model=car.model)

    context = {
        'car': car,
    }
    return render(request, 'core/car_detail.html', context)
