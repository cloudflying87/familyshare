from django.db import models
from django.urls import reverse


class Content(models.Model):
    """Model for storing React pages and Markdown content."""

    CONTENT_TYPE_CHOICES = [
        ('react', 'React Page'),
        ('markdown', 'Markdown'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
    content = models.TextField(help_text="For React: paste your React component code. For Markdown: paste markdown content.")
    slug = models.SlugField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, help_text="Inactive content won't show on dashboard")
    order = models.IntegerField(default=0, help_text="Lower numbers appear first")

    class Meta:
        ordering = ['order', 'title']
        verbose_name_plural = 'Content'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('core:content_detail', kwargs={'slug': self.slug})
