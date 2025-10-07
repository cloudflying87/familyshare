from django.contrib import admin
from django.shortcuts import render, redirect
from django.urls import path
from django.contrib import messages
from django.forms import ModelForm, CharField, Textarea
from .models import Content, Comment, Car
import csv
import io
import json
import re
import html as html_lib
try:
    import httpx
except ImportError:
    httpx = None


@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'content_type', 'slug', 'is_active', 'order', 'created_at']
    list_filter = ['content_type', 'is_active', 'created_at']
    search_fields = ['title', 'description', 'content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_active', 'order']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'content', 'created_at']
    list_filter = ['created_at', 'content']
    search_fields = ['author_name', 'comment_text', 'content__title']
    readonly_fields = ['created_at']


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'recommendation', 'winter_rating', 'reliability_rating', 'mpg_highway', 'price']
    list_filter = ['recommendation', 'make', 'model', 'year', 'created_at']
    search_fields = ['make', 'model', 'trim', 'dealer', 'notes', 'url']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['recommendation']
    fieldsets = [
        ('Vehicle Information', {
            'fields': ['make', 'model', 'trim', 'year']
        }),
        ('Listing Details', {
            'fields': ['url', 'vin', 'stock', 'dealer', 'price', 'mileage']
        }),
        ('Performance Ratings', {
            'fields': ['winter_rating', 'reliability_rating', 'recommendation'],
            'description': 'Rate on 1-10 scale. Winter: Subarus=10, AWD=7-8, FWD=3-5. Reliability: Check year-specific issues.'
        }),
        ('Specifications', {
            'fields': ['mpg_highway', 'mpg_city', 'ground_clearance']
        }),
        ('Notes & Comparison', {
            'fields': ['notes', 'comparison_notes'],
            'classes': ['collapse']
        }),
        ('Timestamps', {
            'fields': ['created_at', 'updated_at'],
            'classes': ['collapse']
        }),
    ]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('import-csv/', self.admin_site.admin_view(self.import_csv), name='core_car_import_csv'),
            path('import-url/', self.admin_site.admin_view(self.import_url), name='core_car_import_url'),
        ]
        return custom_urls + urls

    def import_csv(self, request):
        """Handle CSV upload and import."""
        if request.method == 'POST':
            csv_file = request.FILES.get('csv_file')

            if not csv_file:
                messages.error(request, 'Please select a CSV file.')
                return redirect('..')

            if not csv_file.name.endswith('.csv'):
                messages.error(request, 'File must be a CSV.')
                return redirect('..')

            try:
                # Read CSV
                decoded_file = csv_file.read().decode('utf-8')
                io_string = io.StringIO(decoded_file)
                reader = csv.DictReader(io_string)

                cars_created = 0
                cars_updated = 0

                for row in reader:
                    # Create or update car
                    car_data = {
                        'make': row.get('make', ''),
                        'model': row.get('model', ''),
                        'trim': row.get('trim', ''),
                        'year': int(row.get('year', 0)),
                        'url': row.get('url', ''),
                        'vin': row.get('vin', ''),
                        'stock': row.get('stock', ''),
                        'dealer': row.get('dealer', ''),
                        'price': float(row.get('price', 0)),
                        'mileage': int(row.get('mileage', 0)),
                        'winter_rating': int(row.get('winter_rating', 5)),
                        'reliability_rating': int(row.get('reliability_rating', 5)),
                        'recommendation': row.get('recommendation', 'acceptable'),
                        'mpg_highway': int(row['mpg_highway']) if row.get('mpg_highway') else None,
                        'mpg_city': int(row['mpg_city']) if row.get('mpg_city') else None,
                        'ground_clearance': float(row['ground_clearance']) if row.get('ground_clearance') else None,
                        'notes': row.get('notes', ''),
                    }

                    # Use URL as unique identifier
                    car, created = Car.objects.update_or_create(
                        url=car_data['url'],
                        defaults=car_data
                    )

                    if created:
                        cars_created += 1
                    else:
                        cars_updated += 1

                messages.success(request, f'Successfully imported {cars_created} new cars and updated {cars_updated} existing cars.')
                return redirect('..')

            except Exception as e:
                messages.error(request, f'Error importing CSV: {str(e)}')
                return redirect('..')

        # GET request - show upload form
        return render(request, 'admin/car_csv_upload.html', {
            'title': 'Import Cars from CSV',
        })

    def import_url(self, request):
        """Handle URL-based car import with AI parsing."""
        # IMPORTANT: Check save_car FIRST before other conditions!
        if request.method == 'POST' and 'save_car' in request.POST:
            # Save the car from the review form
            try:
                car_data = {
                    'make': request.POST.get('make', ''),
                    'model': request.POST.get('model', ''),
                    'trim': request.POST.get('trim', ''),
                    'year': int(request.POST.get('year', 0)) if request.POST.get('year') else 0,
                    'url': request.POST.get('url', ''),
                    'vin': request.POST.get('vin', ''),
                    'stock': request.POST.get('stock', ''),
                    'dealer': request.POST.get('dealer', ''),
                    'price': float(request.POST.get('price', 0)) if request.POST.get('price') else 0,
                    'mileage': int(request.POST.get('mileage', 0)) if request.POST.get('mileage') else 0,
                    'winter_rating': int(request.POST.get('winter_rating', 5)),
                    'reliability_rating': int(request.POST.get('reliability_rating', 5)),
                    'recommendation': request.POST.get('recommendation', 'acceptable'),
                    'mpg_highway': int(request.POST.get('mpg_highway')) if request.POST.get('mpg_highway') else None,
                    'mpg_city': int(request.POST.get('mpg_city')) if request.POST.get('mpg_city') else None,
                    'ground_clearance': float(request.POST.get('ground_clearance')) if request.POST.get('ground_clearance') else None,
                    'notes': request.POST.get('notes', ''),
                }

                car = Car.objects.create(**car_data)
                messages.success(request, f'Successfully imported {car}')
                return redirect('..')

            except Exception as e:
                messages.error(request, f'Error saving car: {str(e)}')
                return redirect('..')

        elif request.method == 'POST' and 'paste_html' in request.POST:
            # User pasted HTML directly - no HTTP request needed
            url = request.POST.get('url', '').strip()
            html_content = request.POST.get('html_content', '').strip()

            if not url or not html_content:
                messages.error(request, 'Please provide both URL and HTML content.')
                return render(request, 'admin/car_url_import.html', {'title': 'Import Car from URL'})

            messages.info(request, f'Parsing {len(html_content)} characters of content...')

            try:
                extracted_data = self._extract_car_data(html_content, url)

                # Debug: Show what was extracted
                debug_fields = []
                if extracted_data.get('vin'):
                    debug_fields.append(f"VIN: {extracted_data['vin']}")
                if extracted_data.get('stock'):
                    debug_fields.append(f"Stock: {extracted_data['stock']}")
                if extracted_data.get('price'):
                    debug_fields.append(f"Price: ${extracted_data['price']}")
                if extracted_data.get('mileage'):
                    debug_fields.append(f"Mileage: {extracted_data['mileage']}")
                if extracted_data.get('mpg_city') and extracted_data.get('mpg_highway'):
                    debug_fields.append(f"MPG: {extracted_data['mpg_city']}/{extracted_data['mpg_highway']}")

                if debug_fields:
                    messages.success(request, f"Found: {', '.join(debug_fields)}")
                else:
                    messages.warning(request, "No data automatically extracted - please fill in manually")
                return render(request, 'admin/car_url_import_form.html', {
                    'title': 'Review Extracted Car Data',
                    'extracted_data': extracted_data,
                    'url': url,
                })
            except Exception as e:
                messages.error(request, f'Error parsing HTML: {str(e)}')
                return render(request, 'admin/car_url_import.html', {'title': 'Import Car from URL'})

        elif request.method == 'POST' and 'url' in request.POST:
            url = request.POST.get('url', '').strip()

            if not url:
                messages.error(request, 'Please enter a URL.')
                return render(request, 'admin/car_url_import.html', {'title': 'Import Car from URL'})

            try:
                # Fetch the page with browser-like headers to avoid 403 blocks
                if httpx:
                    headers = {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.9',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'DNT': '1',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1',
                    }
                    response = httpx.get(url, headers=headers, follow_redirects=True, timeout=10.0)

                    if response.status_code == 403:
                        messages.error(request, 'Website blocked the request (403 Forbidden). This site uses anti-bot protection. Try copying the HTML from your browser instead.')
                        return redirect('.')

                    html_content = response.text
                else:
                    messages.error(request, 'httpx library not available. Install with: pip install httpx')
                    return redirect('..')

                # Extract data using regex patterns
                extracted_data = self._extract_car_data(html_content, url)

                # Pre-fill form with extracted data
                return render(request, 'admin/car_url_import_form.html', {
                    'title': 'Review Extracted Car Data',
                    'extracted_data': extracted_data,
                    'url': url,
                })

            except Exception as e:
                messages.error(request, f'Error fetching URL: {str(e)}')
                return render(request, 'admin/car_url_import.html', {'title': 'Import Car from URL'})

        # GET request - show URL input form
        return render(request, 'admin/car_url_import.html', {'title': 'Import Car from URL'})

    def _extract_car_data(self, html, url):
        """Extract car data from HTML using regex patterns."""
        data = {
            'url': url,
            'make': '',
            'model': '',
            'trim': '',
            'year': '',
            'vin': '',
            'stock': '',
            'dealer': '',
            'price': '',
            'mileage': '',
            'mpg_highway': '',
            'mpg_city': '',
            'winter_rating': 5,
            'reliability_rating': 5,
            'recommendation': 'acceptable',
            'ground_clearance': '',
            'notes': '',
        }

        # Try to find DITagLocalization JavaScript variable (Dealer Inspire sites like Bloomington Subaru)
        ditag_match = re.search(r'var\s+DITagLocalization\s*=\s*({.*?});', html, re.DOTALL)
        if ditag_match:
            try:
                ditag_json = json.loads(ditag_match.group(1))
                vehicle_info = ditag_json.get('vehicleInfo', {})
                dealer_info = ditag_json.get('dealer', {})

                if vehicle_info:
                    data['vin'] = vehicle_info.get('vin', '')
                    data['stock'] = vehicle_info.get('stock', '')
                    data['year'] = str(vehicle_info.get('year', ''))
                    data['make'] = vehicle_info.get('make', '')
                    data['model'] = vehicle_info.get('model', '')
                    data['trim'] = vehicle_info.get('trim', '')
                    data['price'] = str(vehicle_info.get('price', '') or vehicle_info.get('our_price', ''))
                    # DITag doesn't have mileage, we'll get that from text

                if dealer_info:
                    city = dealer_info.get('city', '')
                    state = dealer_info.get('state', '')
                    data['dealer'] = f"{city} {dealer_info.get('brands', '')}" if city else ''

            except Exception as e:
                # If JSON parsing fails, fall back to other methods
                pass

        # Try to find JSON-LD structured data (overrides DITag if present and has more data)
        json_ld_match = re.search(r'<script type=["\']application/ld\+json["\']>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
        if json_ld_match:
            try:
                json_data = json.loads(json_ld_match.group(1))

                # Check if @type is 'Car' or includes 'Car' (could be array like ["Product", "Car"])
                type_field = json_data.get('@type', '')
                is_car = (type_field == 'Car' or
                         (isinstance(type_field, list) and 'Car' in type_field))

                if isinstance(json_data, dict) and is_car:
                    # Brand/Make
                    if not data['make'] and json_data.get('brand'):
                        brand = json_data['brand']
                        data['make'] = brand.get('name', '') if isinstance(brand, dict) else str(brand)

                    # Model
                    if not data['model']:
                        data['model'] = json_data.get('model', '')

                    # Year - try multiple fields
                    if not data['year']:
                        data['year'] = (json_data.get('vehicleModelDate', '') or
                                       json_data.get('modelDate', '') or
                                       json_data.get('productionDate', '')[:4] if json_data.get('productionDate') else '')

                    # Trim - extract from name if not already set
                    if not data['trim'] and json_data.get('name'):
                        # Name format: "Pre-Owned 2015 Subaru Outback 2.5i Premium"
                        # Extract trim (last part after model)
                        name = json_data['name']
                        if data['model'] and data['model'] in name:
                            trim_part = name.split(data['model'])[-1].strip()
                            data['trim'] = trim_part

                    # VIN
                    if not data['vin']:
                        data['vin'] = json_data.get('vehicleIdentificationNumber', '')

                    # Stock from SKU
                    if not data['stock']:
                        data['stock'] = json_data.get('sku', '')

                    # Price
                    if not data['price'] and json_data.get('offers'):
                        offers = json_data['offers']
                        if isinstance(offers, dict):
                            data['price'] = str(offers.get('price', ''))

                    # Mileage
                    if not data['mileage'] and json_data.get('mileageFromOdometer'):
                        mileage_obj = json_data['mileageFromOdometer']
                        if isinstance(mileage_obj, dict):
                            data['mileage'] = str(mileage_obj.get('value', ''))
                        else:
                            data['mileage'] = str(mileage_obj)

                    # Description for notes
                    if not data['notes'] and json_data.get('description'):
                        description = json_data['description']
                        # Decode HTML entities (&amp; -> &, &lt;br /&gt; -> <br />)
                        description = html_lib.unescape(description)
                        # Remove <br /> tags and replace with newlines
                        description = re.sub(r'<br\s*/?\s*>', '\n', description, flags=re.IGNORECASE)
                        # Remove any remaining HTML tags
                        description = re.sub(r'<[^>]+>', '', description)
                        # Clean up multiple newlines
                        description = re.sub(r'\n\s*\n\s*\n+', '\n\n', description)
                        # Truncate if too long (keep first 500 chars)
                        if len(description) > 500:
                            description = description[:500] + '...'
                        data['notes'] = description.strip()
            except Exception as e:
                # If JSON parsing fails, continue with regex patterns
                pass

        # Extract VIN (17 characters, alphanumeric)
        if not data['vin']:
            vin_match = re.search(r'VIN[:\s]*([A-HJ-NPR-Z0-9]{17})', html, re.IGNORECASE)
            if vin_match:
                data['vin'] = vin_match.group(1)

        # Extract Stock Number
        stock_match = re.search(r'STOCK[:\s#]*([A-Z0-9-]+)', html, re.IGNORECASE)
        if stock_match:
            data['stock'] = stock_match.group(1)

        # Extract Price (dollar amounts)
        if not data['price']:
            price_match = re.search(r'\$([0-9,]+)', html)
            if price_match:
                data['price'] = price_match.group(1).replace(',', '')

        # Extract Mileage - try multiple patterns
        if not data['mileage']:
            # Pattern 1: "Mileage: 73,065" or "Mileage:\n73,065"
            mileage_match = re.search(r'Mileage[:\s]*([0-9,]+)', html, re.IGNORECASE)
            if mileage_match:
                data['mileage'] = mileage_match.group(1).replace(',', '')
            else:
                # Pattern 2: Just numbers with comma (likely mileage if 5-6 digits)
                # Look for standalone numbers that look like mileage
                mileage_match = re.search(r'(?:miles|mi|odometer)[:\s]*([0-9,]+)', html, re.IGNORECASE)
                if mileage_match:
                    data['mileage'] = mileage_match.group(1).replace(',', '')

        # Extract MPG
        mpg_match = re.search(r'([0-9]+)\s*CITY\s*/\s*([0-9]+)\s*HWY', html, re.IGNORECASE)
        if mpg_match:
            data['mpg_city'] = mpg_match.group(1)
            data['mpg_highway'] = mpg_match.group(2)

        # Extract Year/Make/Model from title or headings
        if not data['year'] or not data['make'] or not data['model']:
            title_match = re.search(r'(20\d{2})\s+(\w+)\s+([\w\s-]+)', html)
            if title_match:
                if not data['year']:
                    data['year'] = title_match.group(1)
                if not data['make']:
                    data['make'] = title_match.group(2)
                if not data['model']:
                    data['model'] = title_match.group(3).split()[0]  # First word of model

        # Auto-fill ratings based on make/model
        if data['make'].lower() == 'subaru':
            data['winter_rating'] = 10
            if data['model'].lower() in ['outback', 'forester']:
                # Check year for reliability
                year = int(data['year']) if data['year'] and str(data['year']).isdigit() else 0
                if year >= 2015 and year <= 2018:
                    data['reliability_rating'] = 9
                    data['recommendation'] = 'good'
                elif year >= 2016:
                    data['reliability_rating'] = 8
                    data['recommendation'] = 'good'
                else:
                    data['reliability_rating'] = 7

        # Extract dealer from URL
        if 'bloomingtonsubaru' in url.lower():
            data['dealer'] = 'Bloomington Subaru'
        else:
            domain_match = re.search(r'https?://(?:www\.)?([^/]+)', url)
            if domain_match:
                data['dealer'] = domain_match.group(1).split('.')[0].title()

        return data

    def changelist_view(self, request, extra_context=None):
        """Add import CSV link to changelist."""
        extra_context = extra_context or {}
        extra_context['has_import_csv'] = True
        extra_context['has_import_url'] = True
        return super().changelist_view(request, extra_context=extra_context)
