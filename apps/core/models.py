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
    combined_mpg = models.IntegerField(null=True, blank=True, help_text="Combined MPG (auto-calculated or manual override)")

    # Specs
    ground_clearance = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        null=True,
        blank=True,
        help_text="Ground clearance in inches (e.g., 8.7)"
    )

    # Cost of Ownership
    maintenance_cost = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Estimated annual maintenance cost (e.g., 800.00)"
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

    def save(self, *args, **kwargs):
        """Auto-calculate combined_mpg if not manually set."""
        if not self.combined_mpg and self.mpg_city and self.mpg_highway:
            self.combined_mpg = round((self.mpg_city + self.mpg_highway) / 2)
        super().save(*args, **kwargs)

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

    def calculate_tco(self, years=5, miles_per_year=12000, gas_price=3.50, sales_tax_rate=0.07):
        """
        Calculate Total Cost of Ownership.

        Args:
            years: Number of years to own the vehicle
            miles_per_year: Annual miles driven
            gas_price: Price per gallon of gas
            sales_tax_rate: Sales tax rate (e.g., 0.07 for 7%)

        Returns:
            dict with cost breakdown
        """
        # Purchase price with tax
        purchase_price = float(self.price)
        sales_tax = purchase_price * sales_tax_rate
        total_purchase = purchase_price + sales_tax

        # Annual fuel cost
        mpg = self.combined_mpg or self.get_combined_mpg() or 25  # Default to 25 if not available
        gallons_per_year = miles_per_year / mpg
        annual_fuel_cost = gallons_per_year * gas_price
        total_fuel_cost = annual_fuel_cost * years

        # Annual maintenance cost
        annual_maintenance = float(self.maintenance_cost) if self.maintenance_cost else 1000.0  # Default $1000/year
        total_maintenance_cost = annual_maintenance * years

        # Total cost of ownership
        total_cost = total_purchase + total_fuel_cost + total_maintenance_cost

        return {
            'purchase_price': purchase_price,
            'sales_tax': sales_tax,
            'total_purchase': total_purchase,
            'mpg': mpg,
            'annual_fuel_cost': annual_fuel_cost,
            'total_fuel_cost': total_fuel_cost,
            'annual_maintenance': annual_maintenance,
            'total_maintenance_cost': total_maintenance_cost,
            'total_cost': total_cost,
            'cost_per_year': total_cost / years,
            'cost_per_mile': total_cost / (miles_per_year * years),
        }
