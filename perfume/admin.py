from django.contrib import admin
from .models import Perfume

@admin.register(Perfume)
class PerfumeAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('brand', 'brand_encoded', 'feature_longevity_men', 
                    'feature_occasion_business', 'feature_season_fall')
    # Fields to use as filters in the right sidebar
    list_filter = ('feature_longevity_men', 'feature_occasion_business', 'feature_season_fall')
    # Fields that can be searched in the admin panel
    search_fields = ('brand', 'brand_encoded')
    # Fields to display for ordering in the list view
    ordering = ('brand',)

    fieldsets = (
        ('General Information', {
            'fields': ('brand', 'brand_encoded', 'image_url')
        }),
        ('Features', {
            'fields': ('feature_longevity_men', 'feature_longevity_unisex', 
                       'feature_longevity_women', 'feature_occasion_business',
                       'feature_occasion_daily', 'feature_season_fall')
        }),
    )