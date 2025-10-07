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


class Comment(models.Model):
    """Comments on content items."""

    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100, help_text="Your name")
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} on {self.content.title}"


class Car(models.Model):
    """Cars found for potential purchase."""

    RECOMMENDATION_CHOICES = [
        ('excellent', '🏆 Excellent - Highly Recommended'),
        ('good', '✅ Good - Recommended'),
        ('acceptable', '⚠️ Acceptable - OK with Conditions'),
        ('avoid', '❌ Avoid - Not Recommended'),
    ]

    # Basic Info
    make = models.CharField(max_length=100, default='', help_text="Manufacturer (e.g., Subaru, Honda)")
    model = models.CharField(max_length=100, default='', help_text="Model name (e.g., Forester, Outback)")
    trim = models.CharField(max_length=100, blank=True, default='', help_text="Trim level (e.g., 2.5i Premium)")
    year = models.IntegerField(help_text="Year of manufacture")

    # Listing Info
    url = models.URLField(max_length=500, help_text="Link to car listing")
    vin = models.CharField(max_length=17, blank=True, default='', help_text="Vehicle Identification Number")
    stock = models.CharField(max_length=50, blank=True, default='', help_text="Dealer stock number")
    mileage = models.IntegerField(help_text="Current mileage")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Asking price")
    dealer = models.CharField(max_length=200, help_text="Dealer or seller name")

    # Performance Ratings (1-10 scale)
    winter_rating = models.IntegerField(
        default=5,
        help_text="Winter/snow performance (1-10): Subarus=10, AWD SUVs=7-8, FWD=3-5"
    )
    reliability_rating = models.IntegerField(
        default=5,
        help_text="Reliability rating (1-10): Check year-specific issues"
    )

    # Fuel Economy
    mpg_highway = models.IntegerField(null=True, blank=True, help_text="Highway MPG")
    mpg_city = models.IntegerField(null=True, blank=True, help_text="City MPG")

    # Specs
    ground_clearance = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        null=True,
        blank=True,
        help_text="Ground clearance in inches (e.g., 8.7)"
    )

    # Recommendation
    recommendation = models.CharField(
        max_length=20,
        choices=RECOMMENDATION_CHOICES,
        default='acceptable',
        help_text="Overall recommendation based on cold-climate criteria"
    )

    # Notes
    notes = models.TextField(blank=True, help_text="Additional notes or observations")
    comparison_notes = models.TextField(
        blank=True,
        help_text="Auto-generated comparison notes (pros/cons based on criteria)"
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Cars'

    def __str__(self):
        return f"{self.year} {self.make} {self.model} - ${self.price} ({self.dealer})"

    def get_combined_mpg(self):
        """Calculate combined MPG if both city and highway are available."""
        if self.mpg_city and self.mpg_highway:
            return round((self.mpg_city + self.mpg_highway) / 2)
        return None

    def get_overall_score(self):
        """Calculate overall score out of 10."""
        # Weight: winter=40%, reliability=40%, mpg=20%
        score = (self.winter_rating * 0.4) + (self.reliability_rating * 0.4)

        if self.mpg_highway:
            # Normalize MPG: 35+ = 10, 20- = 0
            mpg_score = min(10, max(0, (self.mpg_highway - 20) / 1.5))
            score += mpg_score * 0.2

        return round(score, 1)
