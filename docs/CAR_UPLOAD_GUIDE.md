# Car Upload Guide - Super Easy!

## Quick Start (3 Steps)

1. **Open the sample CSV**: `/docs/car_import_sample.csv`
2. **Edit in Excel/Google Sheets**: Add your cars (one per row)
3. **Upload**: Go to `/admin/core/car/` → "Import from CSV" button

That's it! 🎉

---

## CSV Columns Explained

### Required Fields
- **make**: Manufacturer (e.g., Subaru, Honda, Mazda)
- **model**: Model name (e.g., Forester, Outback, CX-5)
- **year**: Year (e.g., 2015, 2017)
- **url**: Dealer listing URL (unique identifier - don't reuse!)
- **dealer**: Dealer name (e.g., Bloomington Subaru)
- **price**: Price in dollars (no commas, e.g., 14500 not 14,500)
- **mileage**: Current mileage (no commas, e.g., 85000)

### Rating Fields (1-10 scale)
- **winter_rating**: Snow/winter capability
  - 10 = Subarus (best AWD)
  - 7-8 = AWD SUVs (Honda CR-V, Mazda CX-5)
  - 3-5 = FWD cars
  - 1-2 = RWD sedans

- **reliability_rating**: How reliable is this year/model?
  - 9-10 = Excellent (2016-2018 Forester, 2015-2018 Outback)
  - 7-8 = Good
  - 5-6 = Average
  - 3-4 = Known issues (2014 Forester oil consumption, 2019 Ascent)

- **recommendation**: Overall recommendation
  - `excellent` = 🏆 Highly recommended
  - `good` = ✅ Recommended
  - `acceptable` = ⚠️ OK with conditions
  - `avoid` = ❌ Not recommended

### Optional Fields (leave blank if unknown)
- **trim**: Trim level (e.g., 2.5i Premium, Limited)
- **mpg_highway**: Highway MPG (e.g., 28, 32)
- **mpg_city**: City MPG (e.g., 22, 26)
- **ground_clearance**: Ground clearance in inches (e.g., 8.7)
- **notes**: Any notes or warnings (e.g., "Check CVT transmission")

---

## Example Row

```csv
Subaru,Forester,2.5i Premium,2015,https://dealer.com/car123,Bob's Auto,14500,85000,10,7,acceptable,28,22,8.7,Borderline year but good price
```

Breaks down to:
- Make: Subaru
- Model: Forester
- Trim: 2.5i Premium
- Year: 2015
- URL: https://dealer.com/car123
- Dealer: Bob's Auto
- Price: $14,500
- Mileage: 85,000 miles
- Winter Rating: 10/10 (excellent AWD)
- Reliability: 7/10 (borderline year)
- Recommendation: acceptable
- Highway MPG: 28
- City MPG: 22
- Ground Clearance: 8.7"
- Notes: Borderline year but good price

---

## Quick Rating Guide

### Winter Ratings by Vehicle Type

| Vehicle Type | Winter Rating | Examples |
|-------------|---------------|----------|
| Subaru AWD | 10 | Forester, Outback, Crosstrek |
| AWD SUV | 7-8 | CX-5, CR-V, RAV4 |
| FWD SUV | 4-6 | Base CR-V, RAV4 (FWD only) |
| FWD Sedan | 2-4 | Camry, Accord |
| RWD Sedan | 1-2 | Older BMW, Mercedes |

### Reliability Ratings by Year (Subaru Forester Example)

| Years | Reliability | Why |
|-------|-------------|-----|
| 2016-2018, 2020 | 9 | Best years, most reliable |
| 2015, 2021+ | 7-8 | Good but not perfect |
| 2014 | 4-5 | Oil consumption issues - AVOID |
| 2019 | 5-6 | Windshield cracking issues |

---

## Tips for Easy Data Entry

### In Excel/Google Sheets:
1. Open `docs/car_import_sample.csv`
2. Delete the sample rows (keep the header!)
3. Add your cars one per row
4. Use copy/paste for similar cars
5. Save As → CSV format
6. Upload!

### Updates:
- Want to update a car? Just change the data and re-upload
- System uses URL to detect duplicates
- Existing cars with same URL get updated, new URLs get added

### Bulk Entry:
- Have 10 cars? Add all 10 rows and upload once
- System will import all at once
- You'll see a success message: "Imported X new cars and updated Y existing cars"

---

## Where Family Sees It

After upload, family can view at:
- Dashboard: Click "🚗 Car Shopping" card
- Direct: `/cars/` URL

Cards show:
- Car photo placeholder
- Price, mileage, dealer
- Winter & reliability ratings
- Overall score (auto-calculated)
- Color-coded by recommendation (green=excellent, yellow=acceptable, etc.)

---

## Common Mistakes to Avoid

❌ **Using commas in numbers**: `14,500` → Use `14500`
❌ **Reusing URLs**: Each car needs unique URL
❌ **Wrong recommendation values**: Use `excellent`, `good`, `acceptable`, `avoid` (lowercase)
❌ **Missing headers**: Always keep first row with column names
❌ **Saving as Excel (.xlsx)**: Must save as CSV (.csv)

✅ **Correct format**:
```csv
make,model,trim,year,url,dealer,price,mileage,winter_rating,reliability_rating,recommendation,mpg_highway,mpg_city,ground_clearance,notes
Subaru,Forester,,2015,https://dealer.com/car1,Bob's Auto,14500,85000,10,7,acceptable,28,22,8.7,Good deal
```

---

## Need Help?

1. Use the sample file as template
2. Start with just required fields
3. Add optional fields as you learn more
4. Upload and test - you can always re-upload to fix mistakes!

**Sample file location**: `/docs/car_import_sample.csv`
**Upload page**: `/admin/core/car/` → "Import from CSV" button
